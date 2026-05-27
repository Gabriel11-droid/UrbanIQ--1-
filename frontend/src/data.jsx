// Mock data — São Paulo neighborhoods with full UrbanIQ metrics
// Scores are 0–10. All numbers are illustrative.

const NEIGHBORHOODS = [
  {
    id: 'pinheiros',
    name: 'Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    cep: '05422-970',
    population: 65135,
    area: 7.7,
    score: 8.4,
    coords: { x: 240, y: 280 },
    latlng: { lat: -23.5648, lng: -46.6925 },
    polygon: 'M180,240 L260,235 L300,275 L295,330 L240,345 L195,310 Z',
    metrics: {
      safety:        { score: 7.8, trend: '+0.4', label: 'Segurança' },
      climate:       { score: 8.2, trend: '+0.1', label: 'Risco climático' },
      infrastructure:{ score: 9.1, trend: '+0.2', label: 'Infraestrutura' },
      mobility:      { score: 9.3, trend: '+0.5', label: 'Mobilidade' },
      health:        { score: 8.5, trend: '0.0',  label: 'Saúde' },
      education:     { score: 8.9, trend: '+0.3', label: 'Educação' },
      commerce:      { score: 9.5, trend: '+0.6', label: 'Comércio & Serviços' },
      environment:   { score: 7.4, trend: '-0.2', label: 'Meio ambiente' }
    },
    crime: { homicide: 2.1, robbery: 14.3, theft: 38.2, vehicle: 8.4 },
    flood: { events5y: 2, lastEvent: '2024-02-18', riskLevel: 'Baixo' },
    realEstate: { sqmPrice: 12840, rentalYield: 5.8, appreciation12m: 9.2, vacancy: 4.1 },
    demographics: { medianIncome: 9420, medianAge: 35, density: 8458 },
    aiInsights: [
      { type: 'positive', text: 'Densidade comercial 38% acima da média municipal' },
      { type: 'positive', text: 'Acesso a 4 estações de metrô em raio de 1km' },
      { type: 'warning',  text: 'Tráfego intenso em horários de pico' }
    ],
    tags: ['Premium', 'Walkable', 'Hub comercial']
  },
  {
    id: 'moema',
    name: 'Moema',
    city: 'São Paulo',
    state: 'SP',
    cep: '04077-000',
    population: 84647,
    area: 8.5,
    score: 8.7,
    coords: { x: 340, y: 380 },
    latlng: { lat: -23.6063, lng: -46.6647 },
    polygon: 'M280,355 L370,340 L410,385 L395,440 L320,455 L270,415 Z',
    metrics: {
      safety:        { score: 8.4, trend: '+0.2', label: 'Segurança' },
      climate:       { score: 8.8, trend: '+0.1', label: 'Risco climático' },
      infrastructure:{ score: 9.0, trend: '+0.1', label: 'Infraestrutura' },
      mobility:      { score: 8.4, trend: '+0.3', label: 'Mobilidade' },
      health:        { score: 9.2, trend: '+0.4', label: 'Saúde' },
      education:     { score: 9.0, trend: '+0.2', label: 'Educação' },
      commerce:      { score: 8.7, trend: '+0.5', label: 'Comércio & Serviços' },
      environment:   { score: 8.1, trend: '+0.3', label: 'Meio ambiente' }
    },
    crime: { homicide: 0.9, robbery: 8.7, theft: 24.1, vehicle: 5.2 },
    flood: { events5y: 1, lastEvent: '2023-11-04', riskLevel: 'Muito baixo' },
    realEstate: { sqmPrice: 14200, rentalYield: 5.2, appreciation12m: 7.8, vacancy: 3.2 },
    demographics: { medianIncome: 11340, medianAge: 41, density: 9958 },
    aiInsights: [
      { type: 'positive', text: 'Bairro residencial com menor índice de roubos da zona Sul' },
      { type: 'positive', text: 'Proximidade ao Parque Ibirapuera valoriza imóveis' },
      { type: 'neutral',  text: 'Maturidade do mercado limita potencial de valorização' }
    ],
    tags: ['Premium', 'Residencial', 'Verde']
  },
  {
    id: 'vila-mariana',
    name: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    cep: '04114-002',
    population: 130604,
    area: 8.7,
    score: 8.1,
    coords: { x: 400, y: 320 },
    latlng: { lat: -23.5882, lng: -46.6326 },
    polygon: 'M350,295 L440,285 L475,330 L465,385 L390,395 L345,355 Z',
    metrics: {
      safety:        { score: 7.6, trend: '+0.1', label: 'Segurança' },
      climate:       { score: 8.0, trend: '0.0',  label: 'Risco climático' },
      infrastructure:{ score: 8.7, trend: '+0.2', label: 'Infraestrutura' },
      mobility:      { score: 8.9, trend: '+0.4', label: 'Mobilidade' },
      health:        { score: 8.4, trend: '+0.1', label: 'Saúde' },
      education:     { score: 8.6, trend: '+0.2', label: 'Educação' },
      commerce:      { score: 8.3, trend: '+0.3', label: 'Comércio & Serviços' },
      environment:   { score: 7.5, trend: '-0.1', label: 'Meio ambiente' }
    },
    crime: { homicide: 1.4, robbery: 11.2, theft: 31.5, vehicle: 7.1 },
    flood: { events5y: 3, lastEvent: '2024-03-12', riskLevel: 'Moderado' },
    realEstate: { sqmPrice: 10980, rentalYield: 6.1, appreciation12m: 8.4, vacancy: 4.8 },
    demographics: { medianIncome: 7820, medianAge: 38, density: 15012 },
    aiInsights: [
      { type: 'positive', text: 'Mobilidade beneficiada pela Linha 5-Lilás do metrô' },
      { type: 'warning',  text: '3 eventos de alagamento nos últimos 5 anos' },
      { type: 'positive', text: 'Alta densidade de instituições de ensino' }
    ],
    tags: ['Equilibrado', 'Universitário']
  },
  {
    id: 'tatuape',
    name: 'Tatuapé',
    city: 'São Paulo',
    state: 'SP',
    cep: '03304-000',
    population: 91672,
    area: 8.4,
    score: 7.6,
    coords: { x: 540, y: 250 },
    latlng: { lat: -23.5394, lng: -46.5772 },
    polygon: 'M490,220 L590,215 L620,265 L605,315 L530,325 L485,285 Z',
    metrics: {
      safety:        { score: 6.9, trend: '-0.2', label: 'Segurança' },
      climate:       { score: 7.4, trend: '0.0',  label: 'Risco climático' },
      infrastructure:{ score: 8.1, trend: '+0.3', label: 'Infraestrutura' },
      mobility:      { score: 8.7, trend: '+0.5', label: 'Mobilidade' },
      health:        { score: 7.8, trend: '+0.1', label: 'Saúde' },
      education:     { score: 7.5, trend: '+0.2', label: 'Educação' },
      commerce:      { score: 8.6, trend: '+0.7', label: 'Comércio & Serviços' },
      environment:   { score: 6.8, trend: '-0.3', label: 'Meio ambiente' }
    },
    crime: { homicide: 3.2, robbery: 18.4, theft: 42.1, vehicle: 11.3 },
    flood: { events5y: 4, lastEvent: '2024-01-22', riskLevel: 'Moderado' },
    realEstate: { sqmPrice: 8420, rentalYield: 6.4, appreciation12m: 11.2, vacancy: 5.6 },
    demographics: { medianIncome: 6210, medianAge: 36, density: 10913 },
    aiInsights: [
      { type: 'positive', text: 'Mercado imobiliário em expansão (+11.2% em 12m)' },
      { type: 'warning',  text: 'Roubos crescendo 8% YoY em vias comerciais' },
      { type: 'positive', text: 'Hub de transporte: 3 estações de metrô + CPTM' }
    ],
    tags: ['Em crescimento', 'Hub leste']
  },
  {
    id: 'santana',
    name: 'Santana',
    city: 'São Paulo',
    state: 'SP',
    cep: '02011-000',
    population: 118797,
    area: 12.9,
    score: 7.3,
    coords: { x: 420, y: 140 },
    latlng: { lat: -23.4944, lng: -46.6275 },
    polygon: 'M360,100 L470,95 L510,150 L490,210 L395,215 L355,160 Z',
    metrics: {
      safety:        { score: 7.1, trend: '+0.1', label: 'Segurança' },
      climate:       { score: 6.8, trend: '-0.4', label: 'Risco climático' },
      infrastructure:{ score: 7.6, trend: '+0.2', label: 'Infraestrutura' },
      mobility:      { score: 7.9, trend: '+0.1', label: 'Mobilidade' },
      health:        { score: 7.4, trend: '0.0',  label: 'Saúde' },
      education:     { score: 7.2, trend: '+0.1', label: 'Educação' },
      commerce:      { score: 7.8, trend: '+0.3', label: 'Comércio & Serviços' },
      environment:   { score: 6.5, trend: '-0.5', label: 'Meio ambiente' }
    },
    crime: { homicide: 2.6, robbery: 14.8, theft: 35.6, vehicle: 9.2 },
    flood: { events5y: 6, lastEvent: '2024-02-09', riskLevel: 'Alto' },
    realEstate: { sqmPrice: 7240, rentalYield: 6.8, appreciation12m: 6.4, vacancy: 6.1 },
    demographics: { medianIncome: 5630, medianAge: 39, density: 9209 },
    aiInsights: [
      { type: 'warning',  text: 'Risco de enchente alto: Rio Tietê próximo' },
      { type: 'positive', text: 'Valorização potencial com novas obras viárias' },
      { type: 'neutral',  text: 'Mix demográfico amplo' }
    ],
    tags: ['Tradicional', 'Zona Norte']
  },
  {
    id: 'sao-mateus',
    name: 'São Mateus',
    city: 'São Paulo',
    state: 'SP',
    cep: '03970-000',
    population: 154850,
    area: 13.8,
    score: 5.4,
    coords: { x: 720, y: 380 },
    latlng: { lat: -23.6004, lng: -46.4831 },
    polygon: 'M660,340 L790,335 L820,390 L800,455 L700,465 L645,410 Z',
    metrics: {
      safety:        { score: 4.2, trend: '-0.3', label: 'Segurança' },
      climate:       { score: 5.8, trend: '-0.2', label: 'Risco climático' },
      infrastructure:{ score: 5.6, trend: '+0.1', label: 'Infraestrutura' },
      mobility:      { score: 5.3, trend: '+0.4', label: 'Mobilidade' },
      health:        { score: 5.9, trend: '+0.2', label: 'Saúde' },
      education:     { score: 5.7, trend: '+0.3', label: 'Educação' },
      commerce:      { score: 6.4, trend: '+0.2', label: 'Comércio & Serviços' },
      environment:   { score: 5.5, trend: '-0.1', label: 'Meio ambiente' }
    },
    crime: { homicide: 12.4, robbery: 42.6, theft: 58.3, vehicle: 21.8 },
    flood: { events5y: 5, lastEvent: '2024-03-04', riskLevel: 'Alto' },
    realEstate: { sqmPrice: 3940, rentalYield: 7.2, appreciation12m: 4.1, vacancy: 9.4 },
    demographics: { medianIncome: 2340, medianAge: 32, density: 11221 },
    aiInsights: [
      { type: 'warning',  text: 'Índice de homicídios 4.2x acima da média municipal' },
      { type: 'positive', text: 'Expansão da Linha 15-Prata pode revalorizar a região' },
      { type: 'warning',  text: 'Cobertura de saúde abaixo do recomendado pela OMS' }
    ],
    tags: ['Periferia', 'Em transformação']
  },
  {
    id: 'butanta',
    name: 'Butantã',
    city: 'São Paulo',
    state: 'SP',
    cep: '05502-000',
    population: 54196,
    area: 12.5,
    score: 7.9,
    coords: { x: 140, y: 350 },
    latlng: { lat: -23.5764, lng: -46.7253 },
    polygon: 'M80,310 L180,305 L210,365 L185,420 L100,415 L60,375 Z',
    metrics: {
      safety:        { score: 7.4, trend: '+0.3', label: 'Segurança' },
      climate:       { score: 8.0, trend: '+0.2', label: 'Risco climático' },
      infrastructure:{ score: 8.4, trend: '+0.4', label: 'Infraestrutura' },
      mobility:      { score: 8.1, trend: '+0.6', label: 'Mobilidade' },
      health:        { score: 8.3, trend: '+0.2', label: 'Saúde' },
      education:     { score: 9.4, trend: '+0.5', label: 'Educação' },
      commerce:      { score: 7.5, trend: '+0.4', label: 'Comércio & Serviços' },
      environment:   { score: 7.9, trend: '+0.3', label: 'Meio ambiente' }
    },
    crime: { homicide: 1.8, robbery: 12.5, theft: 28.9, vehicle: 6.8 },
    flood: { events5y: 2, lastEvent: '2024-02-15', riskLevel: 'Baixo' },
    realEstate: { sqmPrice: 9120, rentalYield: 5.9, appreciation12m: 8.7, vacancy: 4.4 },
    demographics: { medianIncome: 6840, medianAge: 34, density: 4336 },
    aiInsights: [
      { type: 'positive', text: 'Cinturão universitário (USP) com alta demanda de aluguel' },
      { type: 'positive', text: 'Áreas verdes representam 18% do território' },
      { type: 'neutral',  text: 'Acesso ao centro depende da Marginal Pinheiros' }
    ],
    tags: ['Universitário', 'Verde']
  },
  {
    id: 'morumbi',
    name: 'Morumbi',
    city: 'São Paulo',
    state: 'SP',
    cep: '05650-000',
    population: 49709,
    area: 11.4,
    score: 7.7,
    coords: { x: 220, y: 460 },
    latlng: { lat: -23.6175, lng: -46.7019 },
    polygon: 'M160,430 L270,420 L300,470 L280,525 L195,535 L150,485 Z',
    metrics: {
      safety:        { score: 7.8, trend: '+0.2', label: 'Segurança' },
      climate:       { score: 7.4, trend: '-0.1', label: 'Risco climático' },
      infrastructure:{ score: 8.2, trend: '+0.1', label: 'Infraestrutura' },
      mobility:      { score: 6.8, trend: '+0.3', label: 'Mobilidade' },
      health:        { score: 8.6, trend: '+0.2', label: 'Saúde' },
      education:     { score: 8.4, trend: '+0.1', label: 'Educação' },
      commerce:      { score: 6.9, trend: '+0.2', label: 'Comércio & Serviços' },
      environment:   { score: 7.7, trend: '+0.1', label: 'Meio ambiente' }
    },
    crime: { homicide: 2.4, robbery: 13.7, theft: 29.4, vehicle: 8.1 },
    flood: { events5y: 2, lastEvent: '2024-01-30', riskLevel: 'Baixo' },
    realEstate: { sqmPrice: 11680, rentalYield: 4.9, appreciation12m: 6.1, vacancy: 5.2 },
    demographics: { medianIncome: 9850, medianAge: 42, density: 4359 },
    aiInsights: [
      { type: 'positive', text: 'Concentração de hospitais de referência' },
      { type: 'warning',  text: 'Contraste socioeconômico afeta índice agregado' },
      { type: 'neutral',  text: 'Mobilidade limitada — sem metrô direto' }
    ],
    tags: ['Premium', 'Hospitalar']
  }
];

const ALERTS = [
  { id: 1, severity: 'red',   icon: 'cloud',     title: 'Alerta de chuva forte — Zona Norte', area: 'Santana, Tucuruvi', time: '12 min atrás', desc: 'Previsão de 60mm/h nas próximas 3h. Risco de alagamento em pontos críticos.' },
  { id: 2, severity: 'amber', icon: 'shield',    title: 'Aumento de furtos detectado',         area: 'Tatuapé',           time: '45 min atrás', desc: 'Modelo detectou pico de 38% em furtos de celulares em vias comerciais.' },
  { id: 3, severity: 'blue',  icon: 'car',       title: 'Bloqueio viário programado',          area: 'Av. Faria Lima',    time: '2h atrás',     desc: 'Obras de manutenção das 22h às 5h, dia 28/05.' },
  { id: 4, severity: 'green', icon: 'check',     title: 'Score de Pinheiros subiu para 8.4',   area: 'Pinheiros',         time: '5h atrás',     desc: 'Novos dados de mobilidade elevaram o índice agregado.' },
  { id: 5, severity: 'amber', icon: 'flame',     title: 'Qualidade do ar reduzida',            area: 'Marginal Tietê',    time: '8h atrás',     desc: 'PM2.5 acima de 35µg/m³ desde 06h00.' },
  { id: 6, severity: 'red',   icon: 'flag',      title: 'Risco de enchente — São Mateus',      area: 'São Mateus',        time: '11h atrás',    desc: 'Modelo hidrológico indica probabilidade de 72% nas próximas 24h.' }
];

window.NEIGHBORHOODS = NEIGHBORHOODS;
window.ALERTS = ALERTS;
window.byId = (id) => NEIGHBORHOODS.find(n => n.id === id);

// Color helpers
window.scoreColor = (v) => {
  if (v >= 8) return '#10b981';
  if (v >= 6.5) return '#4f8cf7';
  if (v >= 5) return '#f59e0b';
  return '#ef4444';
};
window.scoreLabel = (v) => {
  if (v >= 8) return 'Excelente';
  if (v >= 6.5) return 'Bom';
  if (v >= 5) return 'Regular';
  return 'Crítico';
};

// ============== API CLIENT (with mock fallback) ==============
// Tenta o backend em window.__UIQ_CONFIG.API_BASE; se indisponível, usa os mocks.

const _apiCache = {};
const _apiBase = (window.__UIQ_CONFIG && window.__UIQ_CONFIG.API_BASE) || '';

async function apiGet(path) {
  if (_apiCache[path]) return _apiCache[path];
  if (!_apiBase) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(_apiBase + path, { signal: ctrl.signal, headers: { 'Accept': 'application/json' } });
    clearTimeout(t);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    _apiCache[path] = data;
    return data;
  } catch (e) {
    // Silent fallback to mock
    return null;
  }
}

window.UrbanIQApi = {
  async listNeighborhoods() {
    const remote = await apiGet('/neighborhoods');
    return remote || NEIGHBORHOODS;
  },
  async getNeighborhood(id) {
    const remote = await apiGet('/neighborhoods/' + id);
    return remote || byId(id);
  },
  async getScoreByCep(cep) {
    const remote = await apiGet('/score/' + cep);
    if (remote) return remote;
    const n = NEIGHBORHOODS.find(x => x.cep.replace('-','') === String(cep).replace('-','')) || NEIGHBORHOODS[0];
    return {
      cep: n.cep, neighborhood: n.name, city: n.city, state: n.state,
      score: n.score, breakdown: Object.fromEntries(Object.entries(n.metrics).map(([k, m]) => [k, m.score]))
    };
  },
  async getAlerts() {
    const remote = await apiGet('/alerts');
    return remote || ALERTS;
  },
  isOnline: () => !!_apiBase
};
