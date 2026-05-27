// UrbanIQ API — servidor Express (modo simulado, sem banco)
// Todos os dados vêm de ./data.js (em memória). Para migrar para banco real
// no futuro, substitua as chamadas a findByCep/findById/etc por queries SQL.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const store = require('./data');

const PORT = process.env.PORT || 3001;
const app = express();

// ============== Middleware ==============
app.use(helmet());
app.use(express.json({ limit: '256kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const corsOrigins = (process.env.CORS_ORIGINS || '*').split(',').map(s => s.trim());
app.use(cors({
  origin: corsOrigins.includes('*') ? true : corsOrigins,
  credentials: false
}));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_PER_MIN || '240', 10),
  standardHeaders: true,
  legacyHeaders: false
}));

// Bearer token (opcional — só ativa em produção)
app.use('/v1', (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') return next();
  const key = (req.header('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!key || key !== process.env.URBANIQ_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
});

const handle = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch(err => {
  console.error(err);
  res.status(500).json({ error: 'internal', message: err.message });
});

// ============== Health ==============
app.get('/health', (_req, res) => res.json({ ok: true, mode: 'simulated', time: new Date().toISOString() }));

// ============== Listar bairros ==============
app.get('/v1/neighborhoods', handle((_req, res) => {
  const list = store.NEIGHBORHOODS.map(n => ({
    id: n.id, name: n.name, city: 'São Paulo', state: 'SP', cep: n.cep,
    population: n.pop, area: n.area,
    latlng: { lat: n.lat, lng: n.lng },
    tags: n.tags,
    score: store.SCORES[n.id].overall
  })).sort((a, b) => b.score - a.score);
  res.json(list);
}));

// ============== Detalhe completo do bairro ==============
app.get('/v1/neighborhoods/:id', handle((req, res) => {
  const n = store.findById(req.params.id);
  if (!n) return res.status(404).json({ error: 'not_found' });
  res.json(store.fullDetail(n));
}));

// ============== Score por CEP ==============
app.get('/v1/score/:cep', handle((req, res) => {
  const n = store.findByCep(req.params.cep);
  if (!n) return res.status(404).json({ error: 'not_found', cep: req.params.cep });
  const s = store.SCORES[n.id];
  res.json({
    cep: n.cep,
    neighborhood: n.name,
    city: 'São Paulo',
    state: 'SP',
    score: s.overall,
    breakdown: {
      safety: s.safety, climate: s.climate, infrastructure: s.infrastructure,
      mobility: s.mobility, health: s.health, education: s.education,
      commerce: s.commerce, environment: s.environment
    },
    risk_forecast: {
      flood_24h: store.FLOOD[n.id].flood_24h,
      trend_12m: s.trend_12m > 0 ? 'upward' : 'downward'
    },
    updated_at: new Date().toISOString()
  });
}));

// ============== Risco de enchente por CEP ==============
app.get('/v1/risk/flood/:cep', handle((req, res) => {
  const n = store.findByCep(req.params.cep);
  if (!n) return res.status(404).json({ error: 'not_found' });
  const f = store.FLOOD[n.id];
  res.json({
    cep: n.cep, neighborhood: n.name,
    risk_level: f.risk_level,
    events_5y: f.events_5y,
    last_event: f.last_event,
    flood_24h_probability: f.flood_24h,
    flood_7d_probability: f.flood_7d
  });
}));

// ============== Risco de criminalidade por CEP ==============
app.get('/v1/risk/crime/:cep', handle((req, res) => {
  const n = store.findByCep(req.params.cep);
  if (!n) return res.status(404).json({ error: 'not_found' });
  const c = store.CRIME[n.id];
  const s = store.SCORES[n.id];
  res.json({
    cep: n.cep, neighborhood: n.name,
    safety_score: s.safety,
    rates_per_10k_yearly: c,
    period: { start: '2025-01-01', end: '2025-12-31' },
    source: 'SSP-SP'
  });
}));

// ============== Mercado imobiliário ==============
app.get('/v1/realestate/:cep', handle((req, res) => {
  const n = store.findByCep(req.params.cep);
  if (!n) return res.status(404).json({ error: 'not_found' });
  const r = store.REAL_ESTATE[n.id];
  res.json({
    cep: n.cep, neighborhood: n.name,
    sqm_price_brl: r.sqmPrice,
    rental_yield_annual: r.rentalYield,
    appreciation_12m: r.appreciation12m,
    vacancy_rate: r.vacancy
  });
}));

// ============== Mobilidade ==============
app.get('/v1/mobility/:cep', handle((req, res) => {
  const n = store.findByCep(req.params.cep);
  if (!n) return res.status(404).json({ error: 'not_found' });
  const s = store.SCORES[n.id];
  res.json({
    cep: n.cep, neighborhood: n.name,
    mobility_score: s.mobility,
    walkability_index: Math.min(10, s.mobility + 0.4).toFixed(1),
    transit_coverage_pct: Math.round(s.mobility * 9.5),
    avg_commute_min: Math.round(50 - s.mobility * 3.5)
  });
}));

// ============== Comparar até 10 bairros ==============
app.post('/v1/compare', handle((req, res) => {
  const ids = Array.isArray(req.body && req.body.ids) ? req.body.ids.slice(0, 10) : [];
  if (!ids.length) return res.status(400).json({ error: 'bad_request' });
  const items = ids
    .map(x => store.findById(x) || store.findByCep(x))
    .filter(Boolean)
    .map(n => ({
      id: n.id, name: n.name, cep: n.cep, city: 'São Paulo',
      score: store.SCORES[n.id].overall,
      breakdown: store.SCORES[n.id]
    }));
  res.json({ items });
}));

// ============== Forecast 12m ==============
app.post('/v1/forecast', handle((req, res) => {
  const id = (req.body && (req.body.neighborhood_id || req.body.id));
  if (!id) return res.status(400).json({ error: 'bad_request' });
  const s = store.SCORES[id];
  if (!s) return res.status(404).json({ error: 'not_found' });

  const months = Array.from({ length: 12 }, (_, i) => ({
    t_plus: i + 1,
    projected_score: +(s.overall + (s.trend_12m / 12) * (i + 1) + (Math.random() - 0.5) * 0.1).toFixed(2)
  }));
  res.json({ neighborhood_id: id, current_score: s.overall, trend_12m: s.trend_12m, forecast: months });
}));

// ============== Histórico de score (24 pontos sintéticos) ==============
app.get('/v1/score-history/:id', handle((req, res) => {
  const s = store.SCORES[req.params.id];
  if (!s) return res.status(404).json({ error: 'not_found' });
  const now = Date.now();
  const points = Array.from({ length: 24 }, (_, i) => {
    const monthsAgo = 23 - i;
    const date = new Date(now - monthsAgo * 30 * 24 * 3600 * 1000);
    const value = +(Math.max(2, Math.min(10, s.overall - 0.5 + Math.random() * 0.9))).toFixed(1);
    return { date: date.toISOString(), value };
  });
  res.json(points);
}));

// ============== Alertas ativos ==============
app.get('/v1/alerts', handle((_req, res) => {
  const now = Date.now();
  res.json(store.ALERTS.map(a => ({
    id: a.id, severity: a.severity, icon: a.icon, title: a.title,
    area: a.area, desc: a.desc,
    time: new Date(now - a.minutes_ago * 60 * 1000).toISOString()
  })));
}));

// ============== KPIs agregados (admin/gov) ==============
app.get('/v1/aggregates/sp', handle((_req, res) => {
  const overalls = Object.values(store.SCORES);
  const avg = (key) => +(overalls.reduce((s, x) => s + x[key], 0) / overalls.length).toFixed(2);
  res.json({
    districts: overalls.length,
    avg_score:    avg('overall'),
    avg_safety:   avg('safety'),
    avg_climate:  avg('climate'),
    avg_mobility: avg('mobility'),
    critical_districts:  overalls.filter(x => x.overall < 5).length,
    excellent_districts: overalls.filter(x => x.overall >= 8).length
  });
}));

// ============== 404 + start ==============
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

app.listen(PORT, () => {
  console.log(`🌎  UrbanIQ API rodando em http://localhost:${PORT}  (modo simulado)`);
  console.log(`    GET  /health`);
  console.log(`    GET  /v1/neighborhoods`);
  console.log(`    GET  /v1/score/05422-970`);
  console.log(`    GET  /v1/alerts`);
});
