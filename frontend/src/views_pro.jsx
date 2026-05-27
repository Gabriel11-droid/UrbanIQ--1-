// Pro views: B2B Dashboard, Alerts, API Playground, Government Admin
const { useState: useStateP, useMemo: useMemoP, useEffect: useEffectP } = React;

// =============== B2B DASHBOARD ===============

function DashboardView({ navigate, setSelected }) {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="muted" style={{fontSize:13, marginBottom:4}}>Imobi.SP Holdings · Plano Business</div>
          <h1>Dashboard corporativo</h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="filter" size={13}/> Filtrar</button>
          <button className="btn"><Icon name="download" size={13}/> Exportar</button>
          <button className="btn btn-primary"><Icon name="plus" size={13}/> Novo relatório</button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-4" style={{gap:14, marginBottom:16}}>
        <div className="stat">
          <div className="row" style={{justifyContent:'space-between'}}>
            <div className="stat-label">Regiões monitoradas</div>
            <Icon name="pin" size={13} style={{color:'var(--text-dim)'}}/>
          </div>
          <div className="stat-value">147</div>
          <div className="stat-trend"><span className="up">▲</span> 12 novas este mês</div>
        </div>
        <div className="stat">
          <div className="row" style={{justifyContent:'space-between'}}>
            <div className="stat-label">Listagens ativas</div>
            <Icon name="building" size={13} style={{color:'var(--text-dim)'}}/>
          </div>
          <div className="stat-value">3.482</div>
          <div className="stat-trend"><span className="up">▲ 8.4%</span> vs. mês anterior</div>
        </div>
        <div className="stat">
          <div className="row" style={{justifyContent:'space-between'}}>
            <div className="stat-label">API requests · mês</div>
            <Icon name="lightning" size={13} style={{color:'var(--text-dim)'}}/>
          </div>
          <div className="stat-value">28.4<span className="unit">k</span></div>
          <div className="stat-trend muted">57% da cota Business</div>
        </div>
        <div className="stat">
          <div className="row" style={{justifyContent:'space-between'}}>
            <div className="stat-label">Score médio portfólio</div>
            <Icon name="sparkles" size={13} style={{color:'var(--text-dim)'}}/>
          </div>
          <div className="stat-value" style={{color:'var(--green)'}}>7.8<span className="unit">/10</span></div>
          <div className="stat-trend"><span className="up">▲ 0.2</span> nas últimas 4 semanas</div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:14, marginBottom:16}}>
        {/* Portfolio map */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Distribuição do portfólio · São Paulo</div>
              <div className="card-sub">147 regiões monitoradas, 3.482 imóveis</div>
            </div>
            <div style={{marginLeft:'auto'}} className="row gap-2">
              <button className="btn btn-sm btn-ghost" onClick={() => navigate('map')}>Abrir mapa <Icon name="arrow-up-right" size={12}/></button>
            </div>
          </div>
          <div style={{padding:18}}>
            <PortfolioMap setSelected={setSelected} navigate={navigate}/>
          </div>
        </div>

        {/* AI insights panel */}
        <div className="card">
          <div className="card-header">
            <div className="row gap-2">
              <Icon name="sparkles" size={14} style={{color:'var(--violet)'}}/>
              <div className="card-title">Insights da IA</div>
            </div>
            <span className="tag" style={{marginLeft:'auto'}}>4 novos</span>
          </div>
          <div style={{padding:18}}>
            <div className="col gap-3">
              {[
                { color: 'var(--green)', icon: 'trend-up',  title: 'Tatuapé entrou na lista de "alta valorização"', body: '+11.2% em 12m. 18 imóveis seus na região podem ser repreçados.' },
                { color: 'var(--amber)', icon: 'flag',       title: '6 imóveis em zona de alerta climático', body: 'Modelo identificou risco crescente de alagamento em Santana.' },
                { color: 'var(--blue)',  icon: 'sparkles',   title: 'Recomendação: explorar Butantã', body: 'Perfil similar ao seu portfólio premium, com 32% menor entrada.' },
                { color: 'var(--violet)', icon: 'lightning', title: 'Pico de leads em Pinheiros', body: '+47% de consultas via API esta semana — preparar campanha?' }
              ].map((ins, i) => (
                <div key={i} style={{display:'flex', gap:12, padding:12, background:'var(--surface-2)', borderRadius:8, borderLeft:`2px solid ${ins.color}`}}>
                  <div style={{width:28, height:28, borderRadius:6, background:`color-mix(in oklab, ${ins.color} 18%, transparent)`, color:ins.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <Icon name={ins.icon} size={14}/>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:500, marginBottom:3}}>{ins.title}</div>
                    <div className="muted" style={{fontSize:11.5, lineHeight:1.5}}>{ins.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:14, marginBottom:16}}>
        {/* Portfolio table */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top regiões do portfólio</div>
            <div className="row gap-2" style={{marginLeft:'auto'}}>
              <button className="btn btn-sm btn-ghost">Filtros</button>
              <button className="btn btn-sm btn-ghost"><Icon name="dots" size={12}/></button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Região</th>
                <th>Imóveis</th>
                <th>Score</th>
                <th>Preço médio</th>
                <th>Variação</th>
                <th>Alertas</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {NEIGHBORHOODS.slice(0, 6).map((n, i) => (
                <tr key={n.id} style={{cursor:'pointer'}} onClick={() => { setSelected(n.id); navigate('detail'); }}>
                  <td>
                    <div className="row gap-2">
                      <span style={{width:6, height:6, borderRadius:'50%', background:scoreColor(n.score)}}></span>
                      <span style={{fontWeight:500}}>{n.name}</span>
                    </div>
                  </td>
                  <td className="mono">{Math.floor(Math.random()*300 + 80)}</td>
                  <td><span className="mono" style={{color:scoreColor(n.score), fontWeight:500}}>{n.score.toFixed(1)}</span></td>
                  <td className="mono">R$ {(n.realEstate.sqmPrice/1000).toFixed(1)}k/m²</td>
                  <td><span style={{color: n.realEstate.appreciation12m > 0 ? 'var(--green)' : 'var(--red)', fontSize:12.5}}>
                    {n.realEstate.appreciation12m > 0 ? '▲' : '▼'} {Math.abs(n.realEstate.appreciation12m)}%
                  </span></td>
                  <td>{i % 2 === 0 ? <span className="chip amber" style={{fontSize:10}}><span className="dot"></span>{i+1}</span> : <span className="dim">—</span>}</td>
                  <td><Icon name="arrow-right" size={13} style={{color:'var(--text-dim)'}}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* API usage */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Consumo da API · últimos 30 dias</div>
          </div>
          <div style={{padding:18}}>
            <div className="row" style={{justifyContent:'space-between', marginBottom:6}}>
              <div>
                <div className="stat-value" style={{fontSize:24}}>28.4k</div>
                <div className="dim" style={{fontSize:11}}>de 50k inclusos</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:14, fontWeight:500, color:'var(--green)'}}>57%</div>
                <div className="dim" style={{fontSize:11}}>da cota</div>
              </div>
            </div>
            <div className="bar" style={{height:8, marginBottom:18}}>
              <div className="bar-fill" style={{width:'57%', background:'linear-gradient(90deg, #4f8cf7, #a78bfa)'}}></div>
            </div>
            <DailyApiBars/>
            <div style={{borderTop:'1px solid var(--hairline)', marginTop:14, paddingTop:14}}>
              <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8}}>Endpoints mais usados</div>
              <div className="col gap-2" style={{fontSize:12}}>
                {[
                  ['/v1/score', '12.4k', 0.62],
                  ['/v1/risk/flood', '8.1k', 0.41],
                  ['/v1/realestate', '5.2k', 0.26],
                  ['/v1/compare', '2.7k', 0.14]
                ].map(([e, n, p]) => (
                  <div key={e} className="row gap-3">
                    <span className="mono flex-1" style={{minWidth:0}}>{e}</span>
                    <div className="bar" style={{flex:1, height:6}}><div className="bar-fill" style={{width:`${p*100}%`, background:'var(--blue)'}}></div></div>
                    <span className="mono dim" style={{minWidth:40, textAlign:'right'}}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Atividade recente do time</div>
          <button className="btn btn-sm btn-ghost" style={{marginLeft:'auto'}}>Ver tudo</button>
        </div>
        <div style={{padding:'4px 0'}}>
          {[
            ['MS', 'Mariana Silva', 'gerou relatório de Moema', '12 min'],
            ['JP', 'João Pereira', 'adicionou 8 imóveis em Pinheiros', '34 min'],
            ['AC', 'Ana Costa', 'configurou alerta para São Mateus', '1h'],
            ['RC', 'Renato Costa', 'exportou comparativo Tatuapé/Vila Mariana', '2h'],
            ['LM', 'Lucas Mendes', 'consultou API · /v1/risk/flood/03970-000', '3h']
          ].map(([init, name, action, time], i) => (
            <div key={i} className="row gap-3" style={{padding:'12px 18px', borderBottom:'1px solid var(--hairline)', fontSize:13}}>
              <div className="avatar" style={{width:28, height:28, fontSize:11}}>{init}</div>
              <div className="flex-1">
                <span style={{fontWeight:500}}>{name}</span> <span className="muted">{action}</span>
              </div>
              <span className="dim" style={{fontSize:11.5}}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PortfolioMap = ({ setSelected, navigate }) => {
  return (
    <svg viewBox="0 0 600 320" style={{width:'100%', height:'auto'}}>
      <defs>
        <pattern id="dashGrid2" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgba(79,140,247,0.06)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#dashGrid2)"/>
      <path d="M0,100 Q200,80 400,120 T600,80" stroke="rgba(79,140,247,0.2)" strokeWidth="8" fill="none"/>

      {NEIGHBORHOODS.map((n, i) => {
        // Scale polygons down for embed
        const points = n.polygon.replace(/([ML])\s*(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, cmd, x, y) =>
          `${cmd}${parseFloat(x) * 0.65},${parseFloat(y) * 0.5 + 20}`
        );
        const c = scoreColor(n.score);
        return (
          <g key={n.id} onClick={() => { setSelected(n.id); navigate('detail'); }} style={{cursor:'pointer'}}>
            <path d={points} fill={`color-mix(in oklab, ${c} 32%, transparent)`} stroke={c} strokeWidth="1"/>
            <circle cx={n.coords.x * 0.65} cy={n.coords.y * 0.5 + 20} r="3" fill={c}/>
          </g>
        );
      })}
    </svg>
  );
};

const DailyApiBars = () => {
  const data = useMemoP(() => Array.from({length: 30}, () => 0.3 + Math.random() * 0.7), []);
  return (
    <div className="row" style={{alignItems:'flex-end', gap:3, height:60}}>
      {data.map((v, i) => (
        <div key={i} style={{flex:1, height:`${v*100}%`, background:i === 28 ? 'var(--violet)' : 'var(--blue)', borderRadius:'2px 2px 0 0', opacity: 0.6 + v*0.4}}></div>
      ))}
    </div>
  );
};

// =============== ALERTS ===============

function AlertsView({ navigate }) {
  const [filter, setFilter] = useStateP('all');
  const filtered = filter === 'all' ? ALERTS : ALERTS.filter(a => a.severity === filter);

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Alertas & monitoramento</h1>
          <p className="desc">Notificações em tempo real geradas pelos modelos preditivos UrbanIQ.</p>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="settings" size={13}/> Configurar</button>
          <button className="btn btn-primary"><Icon name="plus" size={13}/> Novo alerta</button>
        </div>
      </div>

      <div className="grid grid-4" style={{gap:14, marginBottom:18}}>
        <KpiAlert label="Alertas ativos" value="12" color="var(--blue)"/>
        <KpiAlert label="Críticos (24h)" value="3" color="var(--red)" trend="▲ 1"/>
        <KpiAlert label="Resolvidos hoje" value="8" color="var(--green)"/>
        <KpiAlert label="Cobertura geográfica" value="147" color="var(--violet)" sub="regiões monitoradas"/>
      </div>

      <div className="row gap-2" style={{marginBottom:16, flexWrap:'wrap'}}>
        {[
          ['all', 'Todos', null],
          ['red', 'Críticos', 'var(--red)'],
          ['amber', 'Atenção', 'var(--amber)'],
          ['blue', 'Informativos', 'var(--blue)'],
          ['green', 'Resolvidos', 'var(--green)']
        ].map(([k, l, c]) => (
          <button key={k}
                  onClick={() => setFilter(k)}
                  className={`btn btn-sm ${filter === k ? 'btn-primary' : ''}`}>
            {c && <span style={{width:6, height:6, borderRadius:'50%', background:c, marginRight:6, display:'inline-block'}}></span>}
            {l}
          </button>
        ))}
      </div>

      <div className="grid" style={{gridTemplateColumns:'1.6fr 1fr', gap:16}}>
        <div className="col gap-3">
          {filtered.map(a => (
            <div key={a.id} className={`alert-item ${a.severity}`}>
              <div className="ico-box"><Icon name={a.icon} size={18}/></div>
              <div className="flex-1">
                <div className="row" style={{justifyContent:'space-between', marginBottom:4}}>
                  <div style={{fontSize:14, fontWeight:500}}>{a.title}</div>
                  <span className="dim" style={{fontSize:11.5}}>{a.time}</span>
                </div>
                <div className="muted" style={{fontSize:12.5, marginBottom:10}}>{a.desc}</div>
                <div className="row gap-2" style={{fontSize:11.5}}>
                  <span className="chip"><Icon name="pin" size={10}/>{a.area}</span>
                  <span className="chip"><span className={`dot`} style={{background: a.severity === 'red' ? 'var(--red)' : a.severity === 'amber' ? 'var(--amber)' : a.severity === 'blue' ? 'var(--blue)' : 'var(--green)'}}></span>
                    {a.severity === 'red' ? 'Crítico' : a.severity === 'amber' ? 'Atenção' : a.severity === 'blue' ? 'Info' : 'Resolvido'}
                  </span>
                </div>
              </div>
              <div className="col gap-2">
                <button className="btn btn-sm btn-ghost"><Icon name="check" size={12}/></button>
                <button className="btn btn-sm btn-ghost"><Icon name="x" size={12}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="col gap-3">
          <div className="card">
            <div className="card-header"><div className="card-title">Mapa de alertas</div></div>
            <div style={{padding:14}}>
              <svg viewBox="0 0 360 220" style={{width:'100%'}}>
                <rect width="360" height="220" fill="rgba(79,140,247,0.04)"/>
                <path d="M0,80 Q180,60 360,90" stroke="rgba(79,140,247,0.2)" strokeWidth="6" fill="none"/>
                {[
                  { x: 120, y: 80, sev: 'red' },
                  { x: 220, y: 110, sev: 'amber' },
                  { x: 280, y: 160, sev: 'red' },
                  { x: 90, y: 150, sev: 'blue' },
                  { x: 180, y: 170, sev: 'amber' },
                  { x: 250, y: 60, sev: 'green' }
                ].map((p, i) => {
                  const c = p.sev === 'red' ? '#ef4444' : p.sev === 'amber' ? '#f59e0b' : p.sev === 'blue' ? '#4f8cf7' : '#10b981';
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="5" fill={c}/>
                      <circle cx={p.x} cy={p.y} r="5" fill={c} opacity="0.4">
                        <animate attributeName="r" from="5" to="18" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Canais de notificação</div></div>
            <div style={{padding:18}}>
              {[
                ['E-mail', 'renato@imobi.sp', true],
                ['SMS', '+55 11 98765-4321', true],
                ['Push (app)', '3 dispositivos', true],
                ['Webhook', 'POST hooks.imobi.sp/uiq', true],
                ['Slack', '#alertas-uiq', false]
              ].map(([l, v, on], i) => (
                <div key={i} className="row" style={{padding:'10px 0', borderBottom: i < 4 ? '1px solid var(--hairline)' : 'none'}}>
                  <div className="flex-1">
                    <div style={{fontSize:13, fontWeight:500}}>{l}</div>
                    <div className="dim" style={{fontSize:11.5}}>{v}</div>
                  </div>
                  <div className={`toggle ${on ? 'on' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const KpiAlert = ({ label, value, color, sub, trend }) => (
  <div className="stat" style={{borderLeft: `3px solid ${color}`}}>
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={{color}}>{value}</div>
    <div className="stat-trend muted">{trend} {sub}</div>
  </div>
);

// =============== API PLAYGROUND ===============

function ApiView({ navigate }) {
  const endpoints = [
    { method: 'GET', path: '/v1/score/{cep}', label: 'Score consolidado', icon: 'sparkles' },
    { method: 'GET', path: '/v1/breakdown/{cep}', label: 'Indicadores detalhados', icon: 'chart' },
    { method: 'GET', path: '/v1/risk/flood/{cep}', label: 'Risco de enchente', icon: 'cloud' },
    { method: 'GET', path: '/v1/risk/crime/{cep}', label: 'Análise de criminalidade', icon: 'shield' },
    { method: 'GET', path: '/v1/realestate/{cep}', label: 'Mercado imobiliário', icon: 'building' },
    { method: 'GET', path: '/v1/mobility/{cep}', label: 'Análise de mobilidade', icon: 'car' },
    { method: 'POST', path: '/v1/compare', label: 'Comparar até 10 regiões', icon: 'compare' },
    { method: 'POST', path: '/v1/forecast', label: 'Forecast 12m (IA)', icon: 'trend-up' }
  ];

  const [active, setActive] = useStateP(0);
  const [cep, setCep] = useStateP('05422-970');
  const [resp, setResp] = useStateP(null);
  const [loading, setLoading] = useStateP(false);

  const send = () => {
    setLoading(true);
    setResp(null);
    setTimeout(() => {
      const n = NEIGHBORHOODS.find(x => x.cep.replace('-','') === cep.replace('-','')) || NEIGHBORHOODS[0];
      const payload = {
        cep: n.cep,
        neighborhood: n.name,
        city: n.city,
        state: n.state,
        score: n.score,
        score_label: scoreLabel(n.score),
        breakdown: {
          safety: n.metrics.safety.score,
          climate: n.metrics.climate.score,
          infrastructure: n.metrics.infrastructure.score,
          mobility: n.metrics.mobility.score,
          health: n.metrics.health.score,
          education: n.metrics.education.score,
          commerce: n.metrics.commerce.score,
          environment: n.metrics.environment.score
        },
        risk_forecast: {
          flood_24h: 0.08,
          flood_7d: 0.14,
          trend_12m: 'upward'
        },
        updated_at: '2026-05-25T14:32:11Z'
      };
      setResp(payload);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>API Playground</h1>
          <p className="desc">Teste os endpoints UrbanIQ ao vivo. Documentação completa em <span className="mono" style={{color:'var(--blue)'}}>docs.urbaniq.com.br</span>.</p>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="download" size={13}/> SDK Python</button>
          <button className="btn"><Icon name="download" size={13}/> SDK Node</button>
          <button className="btn btn-primary"><Icon name="code" size={13}/> Gerar API key</button>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'280px 1fr', gap:16, alignItems:'flex-start'}}>
        {/* Endpoints sidebar */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Endpoints</div>
            <span className="tag" style={{marginLeft:'auto'}}>v1</span>
          </div>
          <div style={{padding:'8px 0'}}>
            {endpoints.map((e, i) => (
              <div key={i} onClick={() => { setActive(i); setResp(null); }}
                   style={{
                     padding:'10px 14px', borderLeft:`3px solid ${active === i ? 'var(--blue)' : 'transparent'}`,
                     background: active === i ? 'rgba(79,140,247,0.06)' : 'transparent',
                     cursor:'pointer'
                   }}>
                <div className="row gap-2">
                  <span className="mono" style={{fontSize:10, fontWeight:600, color: e.method === 'GET' ? 'var(--green)' : 'var(--amber)', minWidth:32}}>{e.method}</span>
                  <span style={{fontSize:12.5, fontWeight:500}}>{e.label}</span>
                </div>
                <div className="mono dim" style={{fontSize:11, marginTop:2, marginLeft:40}}>{e.path}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col gap-3">
          {/* Request builder */}
          <div className="card">
            <div className="card-header">
              <div className="row gap-3">
                <span className="mono" style={{fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:4, background:'var(--green-soft)', color:'var(--green)'}}>{endpoints[active].method}</span>
                <span className="mono" style={{fontSize:13.5}}>https://api.urbaniq.com.br{endpoints[active].path}</span>
              </div>
              <button className="btn btn-primary btn-sm" style={{marginLeft:'auto'}} onClick={send}>
                {loading ? <span style={{display:'flex',alignItems:'center',gap:6}}><span className="skeleton" style={{width:10,height:10,borderRadius:'50%'}}></span> Enviando</span> : <><Icon name="play" size={11}/> Enviar</>}
              </button>
            </div>
            <div style={{padding:18}}>
              <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8}}>Parâmetros</div>
              <div className="grid" style={{gridTemplateColumns:'140px 1fr', gap:10, marginBottom:14}}>
                <div className="mono" style={{padding:'8px 12px', background:'var(--surface-2)', borderRadius:6, fontSize:12.5}}>cep</div>
                <input className="input" value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000"/>
              </div>
              <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8}}>Headers</div>
              <div className="grid" style={{gridTemplateColumns:'140px 1fr', gap:10}}>
                <div className="mono" style={{padding:'8px 12px', background:'var(--surface-2)', borderRadius:6, fontSize:12.5}}>Authorization</div>
                <div className="mono" style={{padding:'8px 12px', background:'var(--surface-2)', borderRadius:6, fontSize:12.5, color:'var(--text-muted)'}}>Bearer sk_live_••••••••••••5f3a</div>
              </div>
            </div>
          </div>

          {/* Response */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Resposta</div>
              {resp && <>
                <span className="chip green" style={{marginLeft:8}}><span className="dot"></span>200 OK</span>
                <span className="dim mono" style={{fontSize:11, marginLeft:8}}>72ms · 0.4KB</span>
              </>}
              <button className="btn btn-sm btn-ghost" style={{marginLeft:'auto'}}><Icon name="download" size={12}/> Copiar</button>
            </div>
            <div style={{padding:0}}>
              {loading && (
                <div style={{padding:30, textAlign:'center'}} className="muted">Processando...</div>
              )}
              {!loading && resp && (
                <pre className="code-block" style={{margin:0, border:0, borderRadius:0, maxHeight:340, overflow:'auto'}}>{formatJson(resp)}</pre>
              )}
              {!loading && !resp && (
                <div style={{padding:40, textAlign:'center'}} className="muted">
                  <Icon name="play" size={28} style={{color:'var(--text-dim)', marginBottom:10}}/>
                  <div>Clique em <b>Enviar</b> para testar o endpoint</div>
                </div>
              )}
            </div>
          </div>

          {/* Code snippets */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Exemplo · Python SDK</div>
              <span className="tag" style={{marginLeft:'auto'}}>pip install urbaniq</span>
            </div>
            <pre className="code-block" style={{margin:0, border:0, borderRadius:0}}>
{`from urbaniq import `}<span className="p">Client</span>{`

client = `}<span className="p">Client</span>{`(api_key=`}<span className="s">"sk_live_..."</span>{`)
response = client.score.`}<span className="p">get</span>{`(cep=`}<span className="s">"${cep}"</span>{`)

`}<span className="c">{`# Acesse métricas individualmente`}</span>{`
`}<span className="k">print</span>{`(response.score)              `}<span className="c">{`# 8.4`}</span>{`
`}<span className="k">print</span>{`(response.breakdown.safety)   `}<span className="c">{`# 7.8`}</span>{`
`}<span className="k">print</span>{`(response.risk_forecast.flood_24h)  `}<span className="c">{`# 0.08`}</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatJson(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  if (obj === null) return <span className="dim">null</span>;
  if (typeof obj === 'string') return <span style={{color:'#34d8a8'}}>"{obj}"</span>;
  if (typeof obj === 'number') return <span style={{color:'#fbbf24'}}>{obj}</span>;
  if (typeof obj === 'boolean') return <span style={{color:'#c084fc'}}>{String(obj)}</span>;
  if (Array.isArray(obj)) {
    return <>[
      {obj.map((v, i) => <div key={i} style={{marginLeft:14}}>{formatJson(v, indent+1)}{i < obj.length-1 ? ',' : ''}</div>)}
      {pad}]</>;
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    return <>{`{`}
      {keys.map((k, i) => (
        <div key={k} style={{marginLeft:14}}>
          <span style={{color:'#93b6f8'}}>"{k}"</span>: {formatJson(obj[k], indent+1)}{i < keys.length-1 ? ',' : ''}
        </div>
      ))}
      {pad}{`}`}</>;
  }
  return String(obj);
}

// =============== GOVERNMENT ADMIN ===============

function AdminView({ navigate }) {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="muted" style={{fontSize:13, marginBottom:4}}>Prefeitura de São Paulo · SP Urbanismo</div>
          <h1>Painel de Gestão Urbana</h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="filter" size={13}/> Filtrar período</button>
          <button className="btn"><Icon name="download" size={13}/> Exportar dossiê</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-4" style={{gap:14, marginBottom:18}}>
        <div className="stat">
          <div className="stat-label">População atendida</div>
          <div className="stat-value">12.4<span className="unit">M</span></div>
          <div className="stat-trend muted">96 distritos monitorados</div>
        </div>
        <div className="stat">
          <div className="stat-label">Score médio cidade</div>
          <div className="stat-value" style={{color:'var(--blue)'}}>7.2</div>
          <div className="stat-trend"><span className="up">▲ 0.1</span> vs. trimestre anterior</div>
        </div>
        <div className="stat">
          <div className="stat-label">Distritos em alerta</div>
          <div className="stat-value" style={{color:'var(--amber)'}}>14</div>
          <div className="stat-trend muted">de 96</div>
        </div>
        <div className="stat">
          <div className="stat-label">Investimentos sugeridos</div>
          <div className="stat-value">R$ 248<span className="unit">M</span></div>
          <div className="stat-trend muted">2026 — análise IA</div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1.4fr 1fr', gap:16, marginBottom:16}}>
        {/* Choropleth-style summary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Desigualdade territorial · score por distrito</div>
            <div className="card-sub" style={{marginLeft:'auto'}}>96 distritos · São Paulo</div>
          </div>
          <div style={{padding:18}}>
            <ChoroplethBars/>
            <div className="row gap-4" style={{marginTop:20, paddingTop:14, borderTop:'1px solid var(--hairline)', justifyContent:'space-around', textAlign:'center'}}>
              <div><div style={{fontSize:20, fontWeight:600, color:'var(--green)'}}>22</div><div className="dim" style={{fontSize:11, marginTop:2}}>Excelente (8+)</div></div>
              <div><div style={{fontSize:20, fontWeight:600, color:'var(--blue)'}}>38</div><div className="dim" style={{fontSize:11, marginTop:2}}>Bom (6.5–8)</div></div>
              <div><div style={{fontSize:20, fontWeight:600, color:'var(--amber)'}}>26</div><div className="dim" style={{fontSize:11, marginTop:2}}>Regular (5–6.5)</div></div>
              <div><div style={{fontSize:20, fontWeight:600, color:'var(--red)'}}>10</div><div className="dim" style={{fontSize:11, marginTop:2}}>Crítico (&lt;5)</div></div>
            </div>
          </div>
        </div>

        {/* Priorities */}
        <div className="card">
          <div className="card-header">
            <div className="row gap-2">
              <Icon name="flag" size={14} style={{color:'var(--amber)'}}/>
              <div className="card-title">Distritos prioritários · IA</div>
            </div>
          </div>
          <div style={{padding:14}}>
            <div className="col gap-3">
              {[
                { name: 'Brasilândia', issue: 'Saúde + Mobilidade', score: 4.8, suggested: 'R$ 42M' },
                { name: 'São Mateus', issue: 'Segurança', score: 5.4, suggested: 'R$ 38M' },
                { name: 'Cidade Tiradentes', issue: 'Educação + Saneamento', score: 4.6, suggested: 'R$ 56M' },
                { name: 'Grajaú', issue: 'Risco climático', score: 5.1, suggested: 'R$ 28M' },
                { name: 'Capão Redondo', issue: 'Segurança + Infra', score: 5.0, suggested: 'R$ 34M' }
              ].map((d, i) => (
                <div key={i} className="row gap-3" style={{padding:12, background:'var(--surface-2)', borderRadius:8}}>
                  <div style={{width:30, height:30, borderRadius:6, background:'color-mix(in oklab, var(--amber) 18%, transparent)', color:'var(--amber)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:12, fontWeight:600}}>
                    #{i+1}
                  </div>
                  <div className="flex-1" style={{minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:500}}>{d.name}</div>
                    <div className="dim" style={{fontSize:11.5}}>{d.issue}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="mono" style={{fontSize:13, color:scoreColor(d.score), fontWeight:500}}>{d.score.toFixed(1)}</div>
                    <div className="dim" style={{fontSize:11}}>{d.suggested}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:16}}>
        <SectorCard title="Segurança" value="6.4" trend="+0.1" desc="Reduções em furtos (-8%) e roubos (-12%) YoY" icon="shield" color="var(--blue)"/>
        <SectorCard title="Saúde" value="6.8" trend="+0.3" desc="Cobertura ESF chegou a 78% (+3pp em 12m)" icon="cross" color="var(--green)"/>
        <SectorCard title="Educação" value="7.1" trend="0.0" desc="IDEB estável; vagas em creche +14%" icon="school" color="var(--violet)"/>
        <SectorCard title="Mobilidade" value="7.4" trend="+0.4" desc="Tempo médio de deslocamento -7min" icon="car" color="var(--blue)"/>
        <SectorCard title="Clima & Risco" value="6.2" trend="-0.2" desc="2 enchentes recordes em fev/2026" icon="cloud" color="var(--amber)"/>
        <SectorCard title="Habitação" value="5.9" trend="+0.1" desc="Déficit habitacional: 358k unidades" icon="building" color="var(--amber)"/>
      </div>

      {/* Investment simulator */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Simulador de impacto · IA preditiva</div>
            <div className="card-sub">Estimativa do impacto agregado por investimento setorial</div>
          </div>
        </div>
        <div style={{padding:24}}>
          <div className="grid" style={{gridTemplateColumns:'1fr 2fr', gap:30}}>
            <div className="col gap-3">
              {[
                ['Segurança', 35, 'var(--blue)'],
                ['Mobilidade', 25, 'var(--violet)'],
                ['Saúde', 20, 'var(--green)'],
                ['Educação', 15, 'var(--amber)'],
                ['Saneamento', 5, 'var(--red)']
              ].map(([l, v, c]) => (
                <div key={l}>
                  <div className="row" style={{justifyContent:'space-between', marginBottom:6, fontSize:12.5}}>
                    <span>{l}</span>
                    <span className="mono">{v}% · R$ {(v * 2.48).toFixed(0)}M</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue={v} style={{width:'100%', accentColor: c}}/>
                </div>
              ))}
              <div style={{borderTop:'1px solid var(--hairline)', paddingTop:14, marginTop:6}}>
                <div className="row" style={{justifyContent:'space-between'}}>
                  <span className="muted" style={{fontSize:13}}>Total alocado</span>
                  <span className="mono" style={{fontSize:16, fontWeight:600}}>R$ 248M</span>
                </div>
              </div>
            </div>

            <div className="col gap-3">
              <div className="row gap-3">
                <div className="stat flex-1" style={{padding:14}}>
                  <div className="stat-label">Score projetado (24m)</div>
                  <div className="stat-value" style={{fontSize:32, color:'var(--green)'}}>7.5 <span className="unit" style={{fontSize:14}}>+0.3</span></div>
                </div>
                <div className="stat flex-1" style={{padding:14}}>
                  <div className="stat-label">Distritos críticos</div>
                  <div className="stat-value" style={{fontSize:32}}>10 → 6</div>
                </div>
                <div className="stat flex-1" style={{padding:14}}>
                  <div className="stat-label">ROI social estimado</div>
                  <div className="stat-value" style={{fontSize:32, color:'var(--blue)'}}>4.2<span className="unit">x</span></div>
                </div>
              </div>
              <div className="card" style={{background:'var(--surface-2)', padding:18}}>
                <div className="row gap-3" style={{alignItems:'flex-start'}}>
                  <Icon name="sparkles" size={16} style={{color:'var(--violet)', marginTop:2}}/>
                  <div>
                    <div style={{fontSize:13, fontWeight:500, marginBottom:4}}>Recomendação da IA</div>
                    <div className="muted" style={{fontSize:12.5, lineHeight:1.55}}>
                      Manter alocação ≥35% em segurança nos primeiros 18 meses tem maior impacto agregado: reduz crítica em 4 distritos da zona Leste. Considere reforço sazonal de saneamento (Nov–Mar) para mitigação climática.
                    </div>
                  </div>
                </div>
              </div>
              <ChartTrendSimple/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SectorCard = ({ title, value, trend, desc, icon, color }) => (
  <div className="card" style={{padding:18}}>
    <div className="row gap-3" style={{marginBottom:12}}>
      <div style={{width:34, height:34, borderRadius:8, background:`color-mix(in oklab, ${color} 18%, transparent)`, color, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Icon name={icon} size={16}/>
      </div>
      <div className="flex-1">
        <div style={{fontSize:13, fontWeight:500}}>{title}</div>
        <div className="dim" style={{fontSize:11}}>São Paulo · agregado</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div className="mono" style={{fontSize:18, fontWeight:600, color}}>{value}</div>
        <div style={{fontSize:11, color: trend.startsWith('+') ? 'var(--green)' : trend.startsWith('-') ? 'var(--red)' : 'var(--text-dim)'}}>{trend}</div>
      </div>
    </div>
    <div className="muted" style={{fontSize:12, lineHeight:1.5}}>{desc}</div>
  </div>
);

const ChoroplethBars = () => {
  // 96 mini bars representing districts, color by score
  const districts = useMemoP(() => Array.from({length: 96}, (_, i) => 3 + Math.random() * 7), []);
  const sorted = [...districts].sort((a, b) => b - a);
  return (
    <div>
      <div className="row" style={{alignItems:'flex-end', gap:2, height:140}}>
        {sorted.map((v, i) => (
          <div key={i} style={{flex:1, height:`${(v/10)*100}%`, background:scoreColor(v), borderRadius:'1px 1px 0 0', minHeight:4}} title={`Distrito ${i+1}: ${v.toFixed(1)}`}></div>
        ))}
      </div>
      <div className="row" style={{justifyContent:'space-between', marginTop:8, fontSize:11}}>
        <span className="dim">Distritos melhor avaliados</span>
        <span className="dim">Distritos mais vulneráveis</span>
      </div>
    </div>
  );
};

const ChartTrendSimple = () => {
  const past = Array.from({length: 12}, (_, i) => 7.0 + (Math.random() - 0.5) * 0.3);
  const future = Array.from({length: 12}, (_, i) => 7.2 + i * 0.025 + (Math.random() - 0.5) * 0.1);
  const all = [...past, ...future];
  const W = 480, H = 130, PAD = 24;
  const xs = (i) => PAD + (i / (all.length - 1)) * (W - PAD * 2);
  const ys = (v) => H - PAD - ((v - 5) / 4) * (H - PAD * 2);
  const pastPath = past.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(v)}`).join(' ');
  const futurePath = future.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs(11 + i)},${ys(v)}`).join(' ');
  return (
    <div className="card" style={{padding:14, background:'var(--surface-2)'}}>
      <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
        <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em'}}>Projeção do score (24m)</div>
        <span className="chip green" style={{fontSize:10}}>+0.3</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:130}}>
        <line x1={xs(11)} x2={xs(11)} y1={PAD} y2={H-PAD} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
        <text x={xs(11)} y={H-6} fontSize="10" fill="var(--text-dim)" textAnchor="middle">Hoje</text>
        <path d={pastPath} stroke="var(--text-muted)" strokeWidth="1.8" fill="none"/>
        <path d={futurePath} stroke="var(--green)" strokeWidth="2" fill="none" strokeDasharray="0"/>
        <circle cx={xs(all.length-1)} cy={ys(all[all.length-1])} r="3" fill="var(--green)"/>
      </svg>
    </div>
  );
};

window.DashboardView = DashboardView;
window.AlertsView = AlertsView;
window.ApiView = ApiView;
window.AdminView = AdminView;
