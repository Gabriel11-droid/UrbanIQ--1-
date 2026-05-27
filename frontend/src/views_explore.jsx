// Explore views: Search, Region Detail, Map, Compare
const { useState: useStateE, useMemo: useMemoE, useEffect: useEffectE } = React;

// =============== SEARCH ===============

function SearchView({ navigate, setSelected }) {
  const [q, setQ] = useStateE('');
  const recent = ['Pinheiros', 'Moema', '05422-970', 'Vila Mariana'];
  const popular = NEIGHBORHOODS.slice(0, 4);

  const results = useMemoE(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return NEIGHBORHOODS.filter(n =>
      n.name.toLowerCase().includes(lower) ||
      n.cep.includes(q) ||
      n.city.toLowerCase().includes(lower)
    );
  }, [q]);

  const goDetail = (id) => { setSelected(id); navigate('detail'); };

  return (
    <div className="content" style={{maxWidth:920, margin:'0 auto', paddingTop:60}}>
      <div style={{textAlign:'center', marginBottom:32}}>
        <h1 style={{fontSize:32, marginBottom:8}}>Conheça qualquer região do Brasil</h1>
        <p className="muted" style={{fontSize:14}}>Digite um CEP, endereço ou nome de bairro</p>
      </div>

      <div style={{position:'relative'}}>
        <div className="row gap-3" style={{
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:14, padding:'14px 18px', boxShadow:'var(--shadow-md)'
        }}>
          <Icon name="search" size={18} style={{color:'var(--text-muted)'}}/>
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Ex: 05422-970, Pinheiros, Av. Paulista..."
            style={{background:'transparent', border:0, outline:0, color:'var(--text)', fontSize:15, flex:1}}
          />
          {q && <button className="btn btn-ghost btn-sm" onClick={() => setQ('')}><Icon name="x" size={12}/></button>}
          <button className="btn btn-primary btn-sm" onClick={() => results[0] && goDetail(results[0].id)}>Buscar</button>
        </div>

        {q && results.length > 0 && (
          <div style={{
            marginTop:8, background:'var(--surface)',
            border:'1px solid var(--border)', borderRadius:12,
            overflow:'hidden', boxShadow:'var(--shadow-md)'
          }}>
            {results.map(r => (
              <div key={r.id}
                   onClick={() => goDetail(r.id)}
                   style={{padding:'12px 16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer', borderBottom:'1px solid var(--hairline)'}}>
                <Icon name="pin" size={16} style={{color:'var(--text-muted)'}}/>
                <div className="flex-1">
                  <div style={{fontSize:14, fontWeight:500}}>{r.name}</div>
                  <div className="muted" style={{fontSize:12}}>{r.city}, {r.state} · CEP {r.cep}</div>
                </div>
                <span className="chip" style={{background:`color-mix(in oklab, ${scoreColor(r.score)} 18%, transparent)`, color: scoreColor(r.score), borderColor:'transparent'}}>
                  <span className="mono">{r.score.toFixed(1)}</span>
                </span>
                <Icon name="arrow-right" size={14} style={{color:'var(--text-dim)'}}/>
              </div>
            ))}
          </div>
        )}

        {q && results.length === 0 && (
          <div className="card" style={{marginTop:8, padding:20, textAlign:'center'}}>
            <div className="muted">Nenhum resultado. Tente "Pinheiros" ou um CEP de SP.</div>
          </div>
        )}
      </div>

      {!q && (
        <div className="grid grid-2" style={{marginTop:40}}>
          <div className="card" style={{padding:22}}>
            <div className="row gap-3" style={{marginBottom:14}}>
              <Icon name="search" size={14} style={{color:'var(--text-muted)'}}/>
              <div style={{fontSize:13, fontWeight:500}}>Buscas recentes</div>
            </div>
            <div className="col gap-2">
              {recent.map((r, i) => (
                <div key={i} onClick={() => setQ(r)} style={{padding:'8px 10px', borderRadius:6, cursor:'pointer', fontSize:13, color:'var(--text-muted)'}} className="search-recent">{r}</div>
              ))}
            </div>
          </div>
          <div className="card" style={{padding:22}}>
            <div className="row gap-3" style={{marginBottom:14}}>
              <Icon name="trend-up" size={14} style={{color:'var(--text-muted)'}}/>
              <div style={{fontSize:13, fontWeight:500}}>Mais consultados em SP</div>
            </div>
            <div className="col gap-2">
              {popular.map(p => (
                <div key={p.id} onClick={() => goDetail(p.id)} className="row gap-3" style={{padding:'8px 10px', borderRadius:6, cursor:'pointer'}}>
                  <Icon name="pin" size={14} style={{color:'var(--text-dim)'}}/>
                  <div className="flex-1" style={{fontSize:13}}>{p.name}</div>
                  <span className="mono" style={{fontSize:12, color: scoreColor(p.score)}}>{p.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="row gap-3" style={{justifyContent:'center', marginTop:40, color:'var(--text-dim)', fontSize:12}}>
        <span>Pressione</span>
        <kbd style={{fontFamily:'Geist Mono', fontSize:11, background:'var(--surface)', border:'1px solid var(--border)', padding:'2px 6px', borderRadius:4}}>Enter</kbd>
        <span>para abrir o primeiro resultado, ou</span>
        <kbd style={{fontFamily:'Geist Mono', fontSize:11, background:'var(--surface)', border:'1px solid var(--border)', padding:'2px 6px', borderRadius:4}}>Esc</kbd>
        <span>para limpar</span>
      </div>
    </div>
  );
}

// =============== REGION DETAIL ===============

function DetailView({ navigate, selected, setSelected }) {
  const n = byId(selected) || NEIGHBORHOODS[0];
  const [tab, setTab] = useStateE('overview');
  const others = NEIGHBORHOODS.filter(x => x.id !== n.id).slice(0, 4);

  return (
    <div className="content">
      {/* Header */}
      <div className="row gap-3" style={{marginBottom:20}}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('search')}>
          <Icon name="arrow-left" size={14}/> Voltar
        </button>
      </div>

      <div className="page-head">
        <div>
          <div className="row gap-3" style={{marginBottom:6}}>
            <Icon name="pin" size={16} style={{color:'var(--blue)'}}/>
            <div className="muted" style={{fontSize:13}}>{n.city}, {n.state} · CEP {n.cep}</div>
          </div>
          <h1>{n.name}</h1>
          <div className="row gap-2" style={{marginTop:10}}>
            {n.tags.map(t => <span key={t} className="chip"><span className="dot" style={{background:'var(--text-dim)'}}></span>{t}</span>)}
          </div>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="download" size={13}/> Relatório PDF</button>
          <button className="btn" onClick={() => navigate('compare')}><Icon name="compare" size={13}/> Comparar</button>
          <button className="btn btn-primary">Acompanhar</button>
        </div>
      </div>

      {/* Top score + key stats */}
      <div className="grid" style={{gridTemplateColumns:'380px 1fr', gap:16, marginBottom:16}}>
        <div className="card" style={{padding:24}}>
          <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
            <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em'}}>Score UrbanIQ</div>
            <span className="chip green"><span className="dot"></span>{scoreLabel(n.score)}</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:24, marginTop:10}}>
            <div className="score-ring" style={{'--pct': n.score/10, '--color': scoreColor(n.score)}}>
              <div className="inner">
                <div className="num">{n.score.toFixed(1)}<small>/10</small></div>
                <div className="lbl">Geral</div>
              </div>
            </div>
            <div className="col gap-3" style={{fontSize:12}}>
              <div><div className="dim">Posição em SP</div><div style={{fontSize:18, fontWeight:600, marginTop:2}}>#12 <span className="muted" style={{fontSize:12}}>de 96</span></div></div>
              <div><div className="dim">Tendência 12m</div><div style={{fontSize:16, fontWeight:500, marginTop:2, color:'var(--green)'}}>+0.4 ▲</div></div>
            </div>
          </div>
          <div style={{borderTop:'1px solid var(--hairline)', marginTop:20, paddingTop:16}}>
            <div className="dim" style={{fontSize:11, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.08em'}}>Insights IA</div>
            <div className="col gap-2">
              {n.aiInsights.map((ins, i) => (
                <div key={i} className="row gap-2" style={{alignItems:'flex-start', fontSize:12.5}}>
                  <span style={{
                    width:18, height:18, borderRadius:4, flexShrink:0, marginTop:1,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: ins.type === 'positive' ? 'var(--green-soft)' : ins.type === 'warning' ? 'var(--amber-soft)' : 'var(--surface-2)',
                    color: ins.type === 'positive' ? 'var(--green)' : ins.type === 'warning' ? 'var(--amber)' : 'var(--text-muted)'
                  }}>
                    <Icon name={ins.type === 'positive' ? 'trend-up' : ins.type === 'warning' ? 'flag' : 'eye'} size={11}/>
                  </span>
                  <span style={{color:'var(--text)'}}>{ins.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col gap-3">
          <div className="grid grid-4" style={{gap:12}}>
            <KeyStat label="População" value={n.population.toLocaleString('pt-BR')} sub={`${n.area} km²`} icon="user"/>
            <KeyStat label="Renda mediana" value={`R$ ${n.demographics.medianIncome.toLocaleString('pt-BR')}`} sub="domiciliar" icon="card"/>
            <KeyStat label="Preço médio m²" value={`R$ ${n.realEstate.sqmPrice.toLocaleString('pt-BR')}`} sub={`+${n.realEstate.appreciation12m}% em 12m`} trend="up" icon="building"/>
            <KeyStat label="Risco enchente" value={n.flood.riskLevel} sub={`${n.flood.events5y} eventos em 5 anos`} icon="cloud"/>
          </div>

          {/* Metric grid */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Indicadores territoriais</div>
                <div className="card-sub">8 dimensões · atualizado há 2 dias</div>
              </div>
              <div style={{marginLeft:'auto'}} className="row gap-2">
                <button className="btn btn-sm btn-ghost"><Icon name="filter" size={12}/> Filtrar</button>
                <button className="btn btn-sm btn-ghost"><Icon name="dots" size={12}/></button>
              </div>
            </div>
            <div style={{padding:18}}>
              <div className="grid grid-2" style={{gap:14}}>
                {Object.entries(n.metrics).map(([k, m]) => (
                  <MetricRow key={k} m={m}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="tabs" style={{marginTop:24}}>
        <div className={`tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Visão geral</div>
        <div className={`tab ${tab === 'crime' ? 'active' : ''}`} onClick={() => setTab('crime')}>Segurança</div>
        <div className={`tab ${tab === 'climate' ? 'active' : ''}`} onClick={() => setTab('climate')}>Clima & Risco</div>
        <div className={`tab ${tab === 'real-estate' ? 'active' : ''}`} onClick={() => setTab('real-estate')}>Mercado imobiliário</div>
        <div className={`tab ${tab === 'similar' ? 'active' : ''}`} onClick={() => setTab('similar')}>Bairros similares</div>
      </div>

      {tab === 'overview' && <TabOverview n={n}/>}
      {tab === 'crime' && <TabCrime n={n}/>}
      {tab === 'climate' && <TabClimate n={n}/>}
      {tab === 'real-estate' && <TabRealEstate n={n}/>}
      {tab === 'similar' && <TabSimilar others={others} goDetail={(id) => { setSelected(id); }}/>}
    </div>
  );
}

const KeyStat = ({ label, value, sub, trend, icon }) => (
  <div className="stat">
    <div className="row" style={{justifyContent:'space-between'}}>
      <div className="stat-label">{label}</div>
      {icon && <Icon name={icon} size={13} style={{color:'var(--text-dim)'}}/>}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-trend">
      {trend === 'up' && <span className="up">▲</span>}
      {trend === 'down' && <span className="down">▼</span>}
      <span>{sub}</span>
    </div>
  </div>
);

const MetricRow = ({ m }) => {
  const c = scoreColor(m.score);
  return (
    <div className="row gap-3" style={{padding:'8px 0'}}>
      <div style={{width:42, height:42, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:`color-mix(in oklab, ${c} 15%, transparent)`, color:c, flexShrink:0, fontFamily:'Geist Mono', fontSize:14, fontWeight:600}}>
        {m.score.toFixed(1)}
      </div>
      <div className="flex-1" style={{minWidth:0}}>
        <div className="row" style={{justifyContent:'space-between', marginBottom:5}}>
          <div style={{fontSize:13, fontWeight:500}}>{m.label}</div>
          <span style={{fontSize:11.5, color: m.trend.startsWith('+') ? 'var(--green)' : m.trend.startsWith('-') ? 'var(--red)' : 'var(--text-dim)'}}>{m.trend}</span>
        </div>
        <div className="bar"><div className="bar-fill" style={{width:`${m.score*10}%`, background:c}}></div></div>
      </div>
    </div>
  );
};

// ----- Tab: Overview = sparkline trend
function TabOverview({ n }) {
  return (
    <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:16}}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Evolução do score UrbanIQ — 24 meses</div>
            <div className="card-sub">Score consolidado com bandas de confiança</div>
          </div>
          <div style={{marginLeft:'auto'}} className="row gap-2">
            <span className="chip"><span className="dot" style={{background:'var(--blue)'}}></span>Score</span>
            <span className="chip"><span className="dot" style={{background:'var(--text-dim)'}}></span>Média SP</span>
          </div>
        </div>
        <div style={{padding:18}}>
          <ChartTrend baseline={n.score}/>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Demografia</div>
            <div className="card-sub">Censo IBGE 2022 + projeções</div>
          </div>
        </div>
        <div style={{padding:18}}>
          <div className="col gap-3" style={{fontSize:13}}>
            <DemoLine l="Densidade" v={`${n.demographics.density.toLocaleString('pt-BR')} hab/km²`}/>
            <DemoLine l="Idade mediana" v={`${n.demographics.medianAge} anos`}/>
            <DemoLine l="Domicílios" v={`${Math.round(n.population / 2.4).toLocaleString('pt-BR')}`}/>
            <DemoLine l="Renda mediana" v={`R$ ${n.demographics.medianIncome.toLocaleString('pt-BR')}`}/>
            <DemoLine l="Área verde" v="18.4%"/>
            <DemoLine l="Cobertura Wi-Fi" v="94%"/>
          </div>
          <div style={{borderTop:'1px solid var(--hairline)', marginTop:18, paddingTop:14}}>
            <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Composição etária</div>
            <AgeDistribution/>
          </div>
        </div>
      </div>
    </div>
  );
}

const DemoLine = ({ l, v }) => (
  <div className="row" style={{justifyContent:'space-between'}}>
    <span className="muted">{l}</span>
    <span className="mono" style={{color:'var(--text)'}}>{v}</span>
  </div>
);

const AgeDistribution = () => {
  const groups = [
    ['0–14', 0.18, '#4f8cf7'],
    ['15–29', 0.24, '#10b981'],
    ['30–49', 0.34, '#a78bfa'],
    ['50–64', 0.16, '#f59e0b'],
    ['65+', 0.08, '#ef4444']
  ];
  return (
    <div className="col gap-2">
      <div style={{display:'flex', height:8, borderRadius:4, overflow:'hidden'}}>
        {groups.map(([l, pct, c], i) => <div key={i} style={{width:`${pct*100}%`, background:c}}></div>)}
      </div>
      <div className="row gap-3" style={{flexWrap:'wrap', marginTop:8}}>
        {groups.map(([l, pct, c]) => (
          <div key={l} className="row gap-2" style={{fontSize:11}}>
            <span style={{width:8, height:8, borderRadius:2, background:c}}></span>
            <span className="muted">{l}</span>
            <span className="mono dim">{(pct*100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartTrend = ({ baseline }) => {
  // Generate 24 monthly points around baseline
  const months = 24;
  const points = useMemoE(() => {
    let v = baseline - 0.5;
    return Array.from({length: months}, (_, i) => {
      v += (Math.random() - 0.4) * 0.18;
      v = Math.max(2, Math.min(9.5, v));
      return v;
    }).map((v, i) => ({ x: i, y: v }));
  }, [baseline]);
  const mean = points.reduce((s, p) => s + p.y, 0) / points.length;
  const avgLine = Array.from({length: months}, () => mean - 0.6);

  const W = 720, H = 260, PAD = 30;
  const xs = (i) => PAD + (i / (months - 1)) * (W - PAD * 2);
  const ys = (v) => H - PAD - (v / 10) * (H - PAD * 2);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(p.x)},${ys(p.y)}`).join(' ');
  const fillPath = `${path} L${xs(months-1)},${H-PAD} L${xs(0)},${H-PAD} Z`;
  const avgPath = avgLine.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(v)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:260}}>
      <defs>
        <linearGradient id="trendGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4f8cf7" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#4f8cf7" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Gridlines */}
      {[2,4,6,8,10].map(v => (
        <g key={v}>
          <line x1={PAD} x2={W-PAD} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,0.04)"/>
          <text x={PAD-6} y={ys(v)+4} fontSize="10" fill="var(--text-dim)" textAnchor="end" fontFamily="Geist Mono">{v}</text>
        </g>
      ))}
      {/* Avg */}
      <path d={avgPath} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
      {/* Fill */}
      <path d={fillPath} fill="url(#trendGrad)"/>
      {/* Line */}
      <path d={path} stroke="#4f8cf7" strokeWidth="2" fill="none"/>
      {/* Last dot */}
      <circle cx={xs(months-1)} cy={ys(points[months-1].y)} r="4" fill="#4f8cf7"/>
      <circle cx={xs(months-1)} cy={ys(points[months-1].y)} r="8" fill="#4f8cf7" opacity="0.2"/>
      {/* X labels */}
      {[0, 6, 12, 18, 23].map(i => (
        <text key={i} x={xs(i)} y={H-8} fontSize="10" fill="var(--text-dim)" textAnchor="middle" fontFamily="Geist Mono">
          {['Jul/24', 'Jan/25', 'Jul/25', 'Jan/26', 'Mai/26'][[0,6,12,18,23].indexOf(i)]}
        </text>
      ))}
    </svg>
  );
};

// ----- Tab: Crime
function TabCrime({ n }) {
  const c = n.crime;
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Crimes por tipo · taxa por 10k habitantes/ano</div>
          <div className="card-sub" style={{marginLeft:'auto'}}>Fonte: SSP-SP</div>
        </div>
        <div style={{padding:18}}>
          <div className="col gap-4">
            <CrimeBar l="Homicídios" v={c.homicide} max={15} unit=""/>
            <CrimeBar l="Roubos"     v={c.robbery}  max={50} unit=""/>
            <CrimeBar l="Furtos"     v={c.theft}    max={70} unit=""/>
            <CrimeBar l="Veículos"   v={c.vehicle}  max={25} unit=""/>
          </div>
          <div style={{marginTop:24, borderTop:'1px solid var(--hairline)', paddingTop:18}}>
            <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Comparado à média municipal</div>
            <div className="grid grid-2" style={{gap:10}}>
              {[
                ['Homicídios', c.homicide, 6.4],
                ['Roubos', c.robbery, 22.1],
                ['Furtos', c.theft, 41.2],
                ['Veículos', c.vehicle, 12.8]
              ].map(([l, v, avg]) => {
                const diff = ((v - avg) / avg * 100);
                const good = diff < 0;
                return (
                  <div key={l} className="row" style={{justifyContent:'space-between', padding:'6px 0'}}>
                    <span className="muted" style={{fontSize:12.5}}>{l}</span>
                    <span style={{fontSize:12.5, fontWeight:500, color: good ? 'var(--green)' : 'var(--red)'}}>
                      {good ? '▼' : '▲'} {Math.abs(diff).toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Mapa de calor · ocorrências últimos 90 dias</div>
        </div>
        <div style={{padding:18}}>
          <HeatmapCalendar/>
          <div className="row gap-2" style={{justifyContent:'space-between', marginTop:14, fontSize:11}}>
            <span className="dim">Menor</span>
            <div className="row gap-2">
              {[0.05, 0.15, 0.3, 0.5, 0.8].map((o, i) => (
                <span key={i} style={{width:14, height:14, borderRadius:2, background:`rgba(239,68,68,${o})`}}></span>
              ))}
            </div>
            <span className="dim">Maior</span>
          </div>
          <div style={{marginTop:18, borderTop:'1px solid var(--hairline)', paddingTop:14}}>
            <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Hotspots identificados</div>
            <div className="col gap-2">
              {[
                ['R. Teodoro Sampaio · esquina c/ R. Cardeal Arcoverde', 12],
                ['Estação Faria Lima · entorno', 8],
                ['Praça do Pôr do Sol · noite', 5]
              ].map(([loc, n], i) => (
                <div key={i} className="row gap-3" style={{padding:'6px 0', fontSize:12.5}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:'var(--red)'}}></span>
                  <span className="flex-1">{loc}</span>
                  <span className="mono dim">{n} ocorr.</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CrimeBar = ({ l, v, max, unit }) => {
  const pct = Math.min(100, (v / max) * 100);
  const color = pct < 30 ? '#10b981' : pct < 60 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', marginBottom:6, fontSize:13}}>
        <span>{l}</span>
        <span className="mono" style={{fontWeight:500}}>{v.toFixed(1)}{unit}</span>
      </div>
      <div className="bar" style={{height:8}}><div className="bar-fill" style={{width:`${pct}%`, background:color, height:'100%'}}></div></div>
    </div>
  );
};

const HeatmapCalendar = () => {
  const cells = useMemoE(() => Array.from({length: 24 * 5}, () => Math.random()), []);
  return (
    <div className="heat-grid">
      {cells.map((v, i) => (
        <div key={i} className="heat-cell" style={{background: v > 0.2 ? `rgba(239,68,68,${v * 0.85})` : 'rgba(255,255,255,0.04)'}}></div>
      ))}
    </div>
  );
};

// ----- Tab: Climate
function TabClimate({ n }) {
  return (
    <div className="grid grid-2" style={{gap:16}}>
      <div className="card">
        <div className="card-header"><div className="card-title">Histórico de enchentes · 5 anos</div></div>
        <div style={{padding:18}}>
          <div className="row gap-4">
            <div>
              <div className="stat-value" style={{fontSize:40, color: n.flood.events5y > 3 ? 'var(--amber)' : 'var(--green)'}}>{n.flood.events5y}</div>
              <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em'}}>Eventos registrados</div>
            </div>
            <div style={{borderLeft:'1px solid var(--hairline)', paddingLeft:20}}>
              <div className="muted" style={{fontSize:13}}>Último evento</div>
              <div style={{fontSize:14, fontWeight:500}}>{n.flood.lastEvent}</div>
              <div className="dim" style={{fontSize:12, marginTop:8}}>Risco atual</div>
              <span className={`chip ${n.flood.events5y > 4 ? 'red' : n.flood.events5y > 2 ? 'amber' : 'green'}`} style={{marginTop:4}}><span className="dot"></span>{n.flood.riskLevel}</span>
            </div>
          </div>
          <div style={{marginTop:24}}>
            <ChartBars data={[2,1,3,4,2]} labels={['2021','2022','2023','2024','2025']} color="#4f8cf7"/>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Previsão climática 72h</div></div>
        <div style={{padding:18}}>
          <div className="grid" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
            {[
              ['Hoje', 28, 19, 'Chuva forte', 'cloud', 80],
              ['Amanhã', 24, 17, 'Pancadas', 'cloud', 60],
              ['Sex', 26, 18, 'Parcialmente nublado', 'sun', 30]
            ].map(([d, max, min, cond, ico, prob], i) => (
              <div key={i} style={{padding:14, background:'var(--surface-2)', borderRadius:10, textAlign:'center'}}>
                <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em'}}>{d}</div>
                <div style={{display:'flex', justifyContent:'center', margin:'10px 0'}}>
                  <Icon name={ico} size={28} style={{color: ico === 'sun' ? '#f59e0b' : '#93b6f8'}}/>
                </div>
                <div style={{fontSize:18, fontWeight:600}}>{max}° <span className="dim" style={{fontWeight:400, fontSize:14}}>/ {min}°</span></div>
                <div className="muted" style={{fontSize:11, marginTop:4}}>{cond}</div>
                <div className="mono" style={{fontSize:11, marginTop:8, color: prob > 50 ? '#fbbf24' : 'var(--text-muted)'}}>{prob}% chuva</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:18, borderTop:'1px solid var(--hairline)', paddingTop:14}}>
            <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Outros riscos modelados</div>
            <div className="col gap-2">
              {[
                ['Deslizamento', 'Muito baixo', '#10b981'],
                ['Onda de calor', 'Moderado', '#f59e0b'],
                ['Estiagem', 'Baixo', '#10b981'],
                ['Qualidade do ar', 'Regular (AQI 78)', '#f59e0b']
              ].map(([l, v, c], i) => (
                <div key={i} className="row" style={{justifyContent:'space-between', fontSize:12.5}}>
                  <span className="muted">{l}</span>
                  <span style={{color:c, fontWeight:500}}>● {v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChartBars = ({ data, labels, color }) => {
  const max = Math.max(...data, 1);
  return (
    <div>
      <div className="row" style={{alignItems:'flex-end', gap:14, height:120, padding:'0 4px'}}>
        {data.map((v, i) => (
          <div key={i} className="col" style={{alignItems:'center', flex:1, gap:6}}>
            <div className="mono dim" style={{fontSize:11}}>{v}</div>
            <div style={{width:'100%', maxWidth:40, height:`${(v/max)*100}%`, background:color, borderRadius:'4px 4px 0 0', minHeight:4}}></div>
          </div>
        ))}
      </div>
      <div className="row" style={{gap:14, marginTop:8}}>
        {labels.map(l => <div key={l} className="dim" style={{flex:1, textAlign:'center', fontSize:11}}>{l}</div>)}
      </div>
    </div>
  );
};

// ----- Tab: Real Estate
function TabRealEstate({ n }) {
  return (
    <div className="grid" style={{gridTemplateColumns:'1.3fr 1fr', gap:16}}>
      <div className="card">
        <div className="card-header"><div className="card-title">Mercado imobiliário</div><div className="card-sub" style={{marginLeft:'auto'}}>Fonte: FipeZap + UrbanIQ</div></div>
        <div style={{padding:18}}>
          <div className="grid grid-4" style={{gap:12, marginBottom:24}}>
            <MiniStat l="Preço m²" v={`R$ ${(n.realEstate.sqmPrice/1000).toFixed(1)}k`} sub="venda"/>
            <MiniStat l="Valorização" v={`+${n.realEstate.appreciation12m}%`} sub="12 meses" color="var(--green)"/>
            <MiniStat l="Yield aluguel" v={`${n.realEstate.rentalYield}%`} sub="anual bruto"/>
            <MiniStat l="Vacância" v={`${n.realEstate.vacancy}%`} sub="estoque ativo"/>
          </div>
          <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12}}>Evolução do preço médio do m² (24 meses)</div>
          <ChartTrend baseline={6}/>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Comparativo de tipos</div></div>
        <div style={{padding:18}}>
          <table className="table" style={{width:'100%'}}>
            <thead>
              <tr><th>Tipo</th><th style={{textAlign:'right'}}>m² médio</th><th style={{textAlign:'right'}}>Aluguel</th></tr>
            </thead>
            <tbody>
              {[
                ['Studio (35m²)', '450k', '2.6k'],
                ['1 dorm (50m²)', '680k', '3.4k'],
                ['2 dorms (75m²)', '1.05M', '5.1k'],
                ['3 dorms (110m²)', '1.6M', '7.8k'],
                ['Cobertura (180m²)', '3.2M', '14k']
              ].map(([t, p, r]) => (
                <tr key={t}>
                  <td>{t}</td>
                  <td className="mono" style={{textAlign:'right'}}>R$ {p}</td>
                  <td className="mono" style={{textAlign:'right'}}>R$ {r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MiniStat = ({ l, v, sub, color }) => (
  <div>
    <div className="dim" style={{fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em'}}>{l}</div>
    <div style={{fontSize:22, fontWeight:600, letterSpacing:'-0.02em', marginTop:4, color: color || 'var(--text)'}}>{v}</div>
    <div className="muted" style={{fontSize:11}}>{sub}</div>
  </div>
);

// ----- Tab: Similar
function TabSimilar({ others, goDetail }) {
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Bairros com perfil similar</div><div className="card-sub" style={{marginLeft:'auto'}}>Algoritmo: k-NN sobre 12 dimensões normalizadas</div></div>
      <table className="table">
        <thead>
          <tr>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Score</th>
            <th>Preço m²</th>
            <th>Segurança</th>
            <th>Clima</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {others.map(o => (
            <tr key={o.id} style={{cursor:'pointer'}} onClick={() => goDetail(o.id)}>
              <td style={{fontWeight:500}}>{o.name}</td>
              <td className="muted">{o.city}</td>
              <td><span className="mono" style={{color: scoreColor(o.score), fontWeight:500}}>{o.score.toFixed(1)}</span></td>
              <td className="mono">R$ {(o.realEstate.sqmPrice/1000).toFixed(1)}k</td>
              <td><span className="mono">{o.metrics.safety.score.toFixed(1)}</span></td>
              <td><span className="mono">{o.metrics.climate.score.toFixed(1)}</span></td>
              <td><Icon name="arrow-right" size={14} style={{color:'var(--text-dim)'}}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// =============== MAP VIEW (Google Maps + SVG fallback) ===============

function MapView({ navigate, setSelected }) {
  const [layer, setLayer] = useStateE('score');
  const [hovered, setHovered] = useStateE(null);
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const markersRef = React.useRef([]);
  const [mapsReady, setMapsReady] = useStateE(false);
  const [mapsError, setMapsError] = useStateE(null);

  const valFor = (n) => {
    if (layer === 'score') return n.score;
    if (layer === 'safety') return n.metrics.safety.score;
    if (layer === 'climate') return n.metrics.climate.score;
    if (layer === 'mobility') return n.metrics.mobility.score;
    if (layer === 'commerce') return n.metrics.commerce.score;
    return n.score;
  };
  const colorFor = (n) => scoreColor(valFor(n));

  // Init Google Map
  useEffectE(() => {
    const tryInit = () => {
      if (!mapRef.current) return false;
      const gm = window.google && window.google.maps;
      if (!gm) return false;

      try {
        mapInstance.current = new gm.Map(mapRef.current, {
          center: { lat: -23.57, lng: -46.64 },
          zoom: 11,
          disableDefaultUI: true,
          zoomControl: true,
          backgroundColor: '#050b16',
          styles: DARK_MAP_STYLE
        });
        setMapsReady(true);
        return true;
      } catch (e) {
        setMapsError(String(e));
        return false;
      }
    };

    if (tryInit()) return;
    const onLoad = () => tryInit();
    const onErr = () => setMapsError('Google Maps não carregou (verifique a API key)');
    window.addEventListener('uiq:maps-ready', onLoad);
    window.addEventListener('uiq:maps-error', onErr);
    // Poll a few times
    let tries = 0;
    const t = setInterval(() => {
      if (tryInit() || ++tries > 10) clearInterval(t);
    }, 500);
    return () => {
      window.removeEventListener('uiq:maps-ready', onLoad);
      window.removeEventListener('uiq:maps-error', onErr);
      clearInterval(t);
    };
  }, []);

  // Update markers when layer changes or map is ready
  useEffectE(() => {
    if (!mapsReady || !mapInstance.current) return;
    const gm = window.google.maps;
    // Clear existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    NEIGHBORHOODS.forEach(n => {
      const v = valFor(n);
      const c = scoreColor(v);
      const marker = new gm.Marker({
        position: n.latlng,
        map: mapInstance.current,
        title: `${n.name} · ${v.toFixed(1)}`,
        icon: {
          path: gm.SymbolPath.CIRCLE,
          fillColor: c,
          fillOpacity: 0.85,
          strokeColor: '#fff',
          strokeWeight: 1.5,
          scale: 14 + v
        },
        label: { text: v.toFixed(1), color: '#fff', fontSize: '11px', fontWeight: '600' }
      });
      marker.addListener('click', () => {
        setSelected(n.id);
        navigate('detail');
      });
      marker.addListener('mouseover', () => setHovered(n.id));
      marker.addListener('mouseout', () => setHovered(null));
      markersRef.current.push(marker);
    });
  }, [mapsReady, layer]);

  return (
    <div className="content no-pad">
      <div className="map-shell">
        {/* Side panel */}
        <div className="map-side">
          <div style={{marginBottom:16}}>
            <h2 style={{fontSize:18}}>Mapa interativo</h2>
            <div className="muted" style={{fontSize:12.5, marginTop:4}}>
              São Paulo · 8 bairros {mapsReady && '· Google Maps'}
            </div>
          </div>
          <div className="input" style={{marginBottom:14, padding:'9px 12px'}}>
            <div className="row gap-2">
              <Icon name="search" size={14} style={{color:'var(--text-muted)'}}/>
              <input placeholder="Filtrar bairros..." style={{background:'transparent', border:0, outline:0, color:'var(--text)', width:'100%', fontSize:13}}/>
            </div>
          </div>

          <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Camada ativa</div>
          <div className="col gap-2" style={{marginBottom:18}}>
            {[
              ['score','Score UrbanIQ', 'sparkles'],
              ['safety','Segurança','shield'],
              ['climate','Risco climático','cloud'],
              ['mobility','Mobilidade','car'],
              ['commerce','Comércio','cart']
            ].map(([k, l, ic]) => (
              <div key={k} onClick={() => setLayer(k)}
                   className={`nav-item ${layer === k ? 'active' : ''}`}
                   style={{margin:0}}>
                <span className="ico"><Icon name={ic} size={14}/></span>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Bairros</div>
          <div className="col gap-2">
            {[...NEIGHBORHOODS].sort((a, b) => valFor(b) - valFor(a)).map(n => (
              <div key={n.id}
                   onMouseEnter={() => setHovered(n.id)}
                   onMouseLeave={() => setHovered(null)}
                   onClick={() => {
                     if (mapInstance.current) mapInstance.current.panTo(n.latlng);
                     setSelected(n.id); navigate('detail');
                   }}
                   style={{
                     display:'flex', gap:10, alignItems:'center',
                     padding:'8px 10px', borderRadius:7, cursor:'pointer',
                     background: hovered === n.id ? 'rgba(255,255,255,0.04)' : 'transparent'
                   }}>
                <span style={{width:6, height:6, borderRadius:'50%', background:colorFor(n), flexShrink:0}}></span>
                <div className="flex-1" style={{minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500}}>{n.name}</div>
                  <div className="dim" style={{fontSize:11}}>CEP {n.cep}</div>
                </div>
                <span className="mono" style={{fontSize:12, color: colorFor(n), fontWeight:500}}>{valFor(n).toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map canvas */}
        <div className="map-canvas">
          <div ref={mapRef} style={{position:'absolute', inset:0}}></div>

          {/* SVG fallback */}
          {!mapsReady && (
            <SvgMapFallback layer={layer} valFor={valFor} colorFor={colorFor} hovered={hovered} setHovered={setHovered} navigate={navigate} setSelected={setSelected}/>
          )}

          {/* Layer pills */}
          <div className="layer-pills">
            {[['score','Geral'],['safety','Segurança'],['climate','Clima'],['mobility','Mobilidade'],['commerce','Comércio']].map(([k, l]) => (
              <div key={k} className={`layer-pill ${layer === k ? 'active' : ''}`} onClick={() => setLayer(k)}>{l}</div>
            ))}
          </div>

          {/* Legend */}
          <div className="legend">
            <div style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-dim)', marginBottom:8}}>Legenda</div>
            <div className="col gap-2">
              {[['Excelente (8.0+)', '#10b981'], ['Bom (6.5–7.9)', '#4f8cf7'], ['Regular (5.0–6.4)', '#f59e0b'], ['Crítico (< 5)', '#ef4444']].map(([l, c]) => (
                <div key={l} className="row gap-2" style={{fontSize:11.5}}>
                  <span style={{width:12, height:12, borderRadius:3, background:`color-mix(in oklab, ${c} 35%, transparent)`, border:`1px solid ${c}`}}></span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            {mapsError && (
              <div style={{borderTop:'1px solid var(--hairline)', marginTop:10, paddingTop:8, fontSize:10.5, color:'var(--amber)'}}>
                ⚠ {mapsError}
              </div>
            )}
            {!mapsReady && !mapsError && (
              <div style={{borderTop:'1px solid var(--hairline)', marginTop:10, paddingTop:8, fontSize:10.5}} className="dim">
                Carregando Google Maps... <br/>(visualização estilizada enquanto isso)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG fallback when Google Maps isn't loaded
function SvgMapFallback({ layer, valFor, colorFor, hovered, setHovered, navigate, setSelected }) {
  return (
    <svg viewBox="0 0 900 600" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <defs>
        <pattern id="mapGrid2" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="rgba(79,140,247,0.06)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapGrid2)"/>
      <path d="M0,180 Q200,160 400,200 T800,150 L900,140" fill="none" stroke="rgba(79,140,247,0.15)" strokeWidth="14"/>
      <path d="M0,180 Q200,160 400,200 T800,150 L900,140" fill="none" stroke="rgba(79,140,247,0.4)" strokeWidth="1.5" strokeDasharray="2 4"/>

      {NEIGHBORHOODS.map(n => {
        const c = colorFor(n);
        const isHov = hovered === n.id;
        return (
          <g key={n.id}
             onMouseEnter={() => setHovered(n.id)}
             onMouseLeave={() => setHovered(null)}
             onClick={() => { setSelected(n.id); navigate('detail'); }}
             style={{cursor:'pointer'}}>
            <path d={n.polygon}
                  fill={`color-mix(in oklab, ${c} ${isHov ? '50%' : '32%'}, transparent)`}
                  stroke={c}
                  strokeWidth={isHov ? 2 : 1.2}/>
            <text x={n.coords.x} y={n.coords.y - 2} fill="white" fontSize="13" fontWeight="600" textAnchor="middle" pointerEvents="none">
              {n.name}
            </text>
            <text x={n.coords.x} y={n.coords.y + 14} fill={c} fontSize="14" fontWeight="700" textAnchor="middle" pointerEvents="none" fontFamily="Geist Mono">
              {valFor(n).toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Dark style for Google Maps (matches fintech aesthetic)
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0b1a30' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1a30' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ea3c2' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#e6edf7' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#13294a' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0b1a30' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#5a7095' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#1d3a63' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#8ea3c2' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#06101f' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4f8cf7' }] }
];

// =============== COMPARE ===============

function CompareView({ navigate, setSelected }) {
  const [picked, setPicked] = useStateE(['pinheiros', 'moema', 'tatuape', 'sao-mateus']);
  const items = picked.map(id => byId(id)).filter(Boolean);
  const available = NEIGHBORHOODS.filter(n => !picked.includes(n.id));

  const remove = (id) => setPicked(picked.filter(p => p !== id));
  const add = (id) => picked.length < 4 && setPicked([...picked, id]);

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Comparar bairros</h1>
          <p className="desc">Compare até 4 regiões lado a lado em todas as dimensões do score UrbanIQ.</p>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="download" size={13}/> Exportar relatório</button>
          <button className="btn btn-primary">Salvar comparação</button>
        </div>
      </div>

      {/* Picker */}
      <div className="card" style={{marginBottom:18}}>
        <div className="row gap-3" style={{padding:16, flexWrap:'wrap'}}>
          {items.map(n => (
            <div key={n.id} className="row gap-2" style={{padding:'8px 12px', background:'var(--surface-2)', border:`1px solid ${scoreColor(n.score)}55`, borderRadius:8, fontSize:13}}>
              <span style={{width:8, height:8, borderRadius:'50%', background:scoreColor(n.score)}}></span>
              <span>{n.name}</span>
              <span className="mono dim">{n.score.toFixed(1)}</span>
              {items.length > 1 && <button onClick={() => remove(n.id)} className="btn-ghost" style={{background:'none', border:0, color:'var(--text-dim)', cursor:'pointer', padding:'0 0 0 4px'}}><Icon name="x" size={12}/></button>}
            </div>
          ))}
          {picked.length < 4 && (
            <div style={{position:'relative'}}>
              <select onChange={e => { if (e.target.value) add(e.target.value); e.target.value=''; }}
                      className="btn"
                      style={{paddingRight:30, appearance:'none', cursor:'pointer'}}>
                <option value="">+ Adicionar bairro</option>
                {available.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-side score cards */}
      <div className="grid" style={{gridTemplateColumns:`repeat(${items.length}, 1fr)`, gap:14, marginBottom:18}}>
        {items.map(n => (
          <div key={n.id} className="card" style={{padding:18}}>
            <div className="row" style={{justifyContent:'space-between', marginBottom:14}}>
              <div>
                <div style={{fontSize:15, fontWeight:600}}>{n.name}</div>
                <div className="muted" style={{fontSize:11.5}}>{n.city} · CEP {n.cep}</div>
              </div>
              <span className="chip" style={{background:`color-mix(in oklab, ${scoreColor(n.score)} 18%, transparent)`, color:scoreColor(n.score), borderColor:'transparent'}}>{scoreLabel(n.score)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'8px 0 14px'}}>
              <div className="score-ring" style={{'--pct':n.score/10, '--color':scoreColor(n.score), width:104, height:104}}>
                <div className="inner">
                  <div className="num" style={{fontSize:28}}>{n.score.toFixed(1)}<small style={{fontSize:13}}>/10</small></div>
                </div>
              </div>
            </div>
            <div className="col gap-2" style={{fontSize:12}}>
              <div className="row" style={{justifyContent:'space-between'}}><span className="muted">Preço m²</span><span className="mono">R$ {(n.realEstate.sqmPrice/1000).toFixed(1)}k</span></div>
              <div className="row" style={{justifyContent:'space-between'}}><span className="muted">Renda mediana</span><span className="mono">R$ {(n.demographics.medianIncome/1000).toFixed(1)}k</span></div>
              <div className="row" style={{justifyContent:'space-between'}}><span className="muted">População</span><span className="mono">{(n.population/1000).toFixed(0)}k</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison radar / bar chart */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header">
          <div className="card-title">Comparativo por dimensão</div>
          <div className="card-sub" style={{marginLeft:'auto'}}>Score 0–10 · maior é melhor</div>
        </div>
        <div style={{padding:24}}>
          <CompareRadar items={items}/>
        </div>
      </div>

      {/* Detailed comparison table */}
      <div className="card">
        <div className="card-header"><div className="card-title">Tabela comparativa detalhada</div></div>
        <table className="table">
          <thead>
            <tr>
              <th>Indicador</th>
              {items.map(n => <th key={n.id} style={{textAlign:'right'}}>{n.name}</th>)}
              <th style={{textAlign:'right', color:'var(--text-dim)'}}>Vencedor</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'score', label: 'Score geral', get: n => n.score, higher: true },
              { key: 'safety', label: 'Segurança', get: n => n.metrics.safety.score, higher: true },
              { key: 'climate', label: 'Clima', get: n => n.metrics.climate.score, higher: true },
              { key: 'mobility', label: 'Mobilidade', get: n => n.metrics.mobility.score, higher: true },
              { key: 'infra', label: 'Infraestrutura', get: n => n.metrics.infrastructure.score, higher: true },
              { key: 'health', label: 'Saúde', get: n => n.metrics.health.score, higher: true },
              { key: 'edu', label: 'Educação', get: n => n.metrics.education.score, higher: true },
              { key: 'commerce', label: 'Comércio', get: n => n.metrics.commerce.score, higher: true },
              { key: 'price', label: 'Preço m² (R$)', get: n => n.realEstate.sqmPrice, higher: false, format: v => v.toLocaleString('pt-BR') },
              { key: 'yield', label: 'Yield aluguel', get: n => n.realEstate.rentalYield, higher: true, format: v => v.toFixed(1) + '%' },
              { key: 'flood', label: 'Eventos enchente 5a', get: n => n.flood.events5y, higher: false, format: v => v }
            ].map(row => {
              const vals = items.map(row.get);
              const best = row.higher ? Math.max(...vals) : Math.min(...vals);
              const bestIdx = vals.indexOf(best);
              return (
                <tr key={row.key}>
                  <td style={{fontWeight:500}}>{row.label}</td>
                  {items.map((n, i) => (
                    <td key={n.id} className="mono" style={{textAlign:'right', color: i === bestIdx ? 'var(--green)' : 'var(--text)', fontWeight: i === bestIdx ? 600 : 400}}>
                      {row.format ? row.format(vals[i]) : (typeof vals[i] === 'number' ? vals[i].toFixed(1) : vals[i])}
                    </td>
                  ))}
                  <td style={{textAlign:'right', fontSize:12}} className="muted">{items[bestIdx].name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CompareRadar = ({ items }) => {
  const dimensions = [
    { key: 'safety', label: 'Segurança' },
    { key: 'climate', label: 'Clima' },
    { key: 'mobility', label: 'Mobilidade' },
    { key: 'health', label: 'Saúde' },
    { key: 'education', label: 'Educação' },
    { key: 'commerce', label: 'Comércio' },
    { key: 'environment', label: 'Ambiente' },
    { key: 'infrastructure', label: 'Infra' }
  ];
  const colors = ['#4f8cf7', '#10b981', '#a78bfa', '#f59e0b'];
  const R = 140, CX = 200, CY = 200;
  const n = dimensions.length;

  const point = (i, v) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = (v / 10) * R;
    return [CX + Math.cos(angle) * r, CY + Math.sin(angle) * r];
  };

  return (
    <div className="row" style={{gap:30, alignItems:'center'}}>
      <svg viewBox="0 0 400 400" style={{width:400, height:400, flexShrink:0}}>
        {/* Grid rings */}
        {[2,4,6,8,10].map(v => (
          <polygon key={v}
            points={dimensions.map((_, i) => point(i, v).join(',')).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        ))}
        {/* Axes */}
        {dimensions.map((d, i) => {
          const [x, y] = point(i, 10);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>;
        })}
        {/* Labels */}
        {dimensions.map((d, i) => {
          const [x, y] = point(i, 11.6);
          return (
            <text key={i} x={x} y={y} fontSize="11" fill="var(--text-muted)" textAnchor="middle" dominantBaseline="middle">{d.label}</text>
          );
        })}
        {/* Polygons */}
        {items.map((nb, idx) => {
          const c = colors[idx];
          const points = dimensions.map((d, i) => point(i, nb.metrics[d.key].score).join(',')).join(' ');
          return (
            <g key={nb.id}>
              <polygon points={points} fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2"/>
              {dimensions.map((d, i) => {
                const [x, y] = point(i, nb.metrics[d.key].score);
                return <circle key={i} cx={x} cy={y} r="3" fill={c}/>;
              })}
            </g>
          );
        })}
      </svg>

      <div className="col gap-3" style={{flex:1}}>
        {items.map((nb, idx) => (
          <div key={nb.id} className="row gap-3" style={{padding:'10px 14px', background:'var(--surface-2)', borderRadius:8}}>
            <span style={{width:14, height:14, borderRadius:3, background:colors[idx]}}></span>
            <div className="flex-1" style={{fontSize:13, fontWeight:500}}>{nb.name}</div>
            <span className="mono" style={{color:colors[idx], fontWeight:600}}>{nb.score.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.SearchView = SearchView;
window.DetailView = DetailView;
window.MapView = MapView;
window.CompareView = CompareView;
