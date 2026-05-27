// Landing page (marketing) + Pricing
const { useState: useStateLP, useEffect: useEffectLP } = React;

function LandingPage({ navigate }) {
  return (
    <div className="landing-wrap">
      <nav className="landing-nav">
        <div className="row gap-3" style={{cursor:'pointer'}} onClick={() => navigate('home')}>
          <div className="brand-mark"></div>
          <div className="brand-name">Urban<b>IQ</b></div>
        </div>
        <div className="links" style={{marginLeft:30}}>
          <a onClick={() => navigate('map')} style={{cursor:'pointer'}}>Plataforma</a>
          <a onClick={() => navigate('api')} style={{cursor:'pointer'}}>API</a>
          <a onClick={() => navigate('dashboard')} style={{cursor:'pointer'}}>Para empresas</a>
          <a onClick={() => navigate('admin')} style={{cursor:'pointer'}}>Para governos</a>
          <a onClick={() => navigate('pricing')} style={{cursor:'pointer'}}>Planos</a>
        </div>
        <div className="right">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>Entrar</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('search')}>Começar grátis</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow"><span className="pulse"></span> Nova: alertas climáticos por IA · 2026</div>
            <h1 className="display">
              Inteligência urbana <span className="grad">em tempo real</span> para o Brasil.
            </h1>
            <p className="lede">
              UrbanIQ unifica dados de segurança, clima, infraestrutura, mobilidade
              e mercado imobiliário em um único score territorial — para usuários,
              imobiliárias, seguradoras e governos.
            </p>
            <div className="cta-row">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('search')}>
                Buscar por CEP <Icon name="arrow-right" size={14} />
              </button>
              <button className="btn btn-lg" onClick={() => navigate('api')}>
                <Icon name="code" size={14} /> Ver API
              </button>
            </div>
            <div className="trust">
              <span>Confiado por</span>
              <span>Loft</span>
              <span>Itaú Seguros</span>
              <span>SP Urbanismo</span>
              <span>QuintoAndar</span>
            </div>
          </div>

          {/* Hero visual: score card mockup */}
          <HeroVisual />
        </div>
      </section>

      <SectionMetrics />
      <SectionFeatures navigate={navigate} />
      <SectionScore />
      <SectionPersonas navigate={navigate} />
      <SectionApiPreview navigate={navigate} />
      <SectionCTA navigate={navigate} />

      <footer style={{borderTop:'1px solid var(--hairline)', padding:'40px', textAlign:'center', color:'var(--text-dim)', fontSize:12}}>
        <div className="row gap-3" style={{justifyContent:'center', marginBottom:14}}>
          <div className="brand-mark" style={{width:22, height:22}}></div>
          <div className="brand-name" style={{fontSize:13}}>Urban<b>IQ</b></div>
        </div>
        © 2026 UrbanIQ · Plataforma brasileira de inteligência urbana. CNPJ 00.000.000/0001-00
      </footer>
    </div>
  );
}

function HeroVisual() {
  return (
    <div style={{position:'relative', minHeight:480}}>
      {/* Background grid map */}
      <svg viewBox="0 0 480 480" style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.4}}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(79,140,247,0.12)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        {/* Stylized SP polygons */}
        <path d="M80,140 L180,130 L240,180 L230,260 L160,290 L90,250 Z" fill="rgba(79,140,247,0.10)" stroke="rgba(79,140,247,0.6)" strokeWidth="1"/>
        <path d="M240,180 L350,170 L390,240 L370,310 L250,310 L230,260 Z" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.6)" strokeWidth="1"/>
        <path d="M350,170 L440,210 L450,290 L390,340 L370,310 L390,240 Z" fill="rgba(245,158,11,0.10)" stroke="rgba(245,158,11,0.55)" strokeWidth="1"/>
        <path d="M160,290 L250,310 L240,380 L150,400 L90,360 L90,250 Z" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.5)" strokeWidth="1"/>
        <circle cx="160" cy="220" r="4" fill="#4f8cf7"/>
        <circle cx="290" cy="240" r="4" fill="#10b981"/>
        <circle cx="400" cy="280" r="4" fill="#f59e0b"/>
      </svg>

      {/* Floating score card */}
      <div style={{
        position:'absolute', top:40, right:0,
        width: 280, padding: 18, borderRadius: 14,
        background: 'rgba(15,34,62,0.85)', backdropFilter:'blur(12px)',
        border: '1px solid var(--border)', boxShadow:'var(--shadow-lg)'
      }}>
        <div className="row" style={{justifyContent:'space-between', marginBottom:14}}>
          <div>
            <div className="dim" style={{fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em'}}>Bairro</div>
            <div style={{fontSize:16, fontWeight:600}}>Pinheiros, SP</div>
          </div>
          <span className="chip green"><span className="dot"></span>Excelente</span>
        </div>
        <div className="row gap-4">
          <div className="score-ring" style={{'--pct':0.84, '--color':'#10b981', width:90, height:90}}>
            <div className="inner">
              <div className="num" style={{fontSize:24}}>8.4<small>/10</small></div>
            </div>
          </div>
          <div className="col gap-2 flex-1">
            <MicroBar label="Mobilidade" val={9.3} color="#10b981" />
            <MicroBar label="Comércio"  val={9.5} color="#10b981" />
            <MicroBar label="Segurança" val={7.8} color="#4f8cf7" />
            <MicroBar label="Clima"     val={8.2} color="#10b981" />
          </div>
        </div>
      </div>

      {/* Floating alert card */}
      <div style={{
        position:'absolute', bottom: 30, left: 20,
        width: 280, padding: 14, borderRadius: 12,
        background: 'rgba(15,34,62,0.92)', backdropFilter:'blur(12px)',
        border: '1px solid rgba(239,68,68,0.4)', boxShadow:'var(--shadow-lg)'
      }}>
        <div className="row gap-3">
          <div style={{width:32, height:32, borderRadius:8, background:'var(--red-soft)', color:'var(--red)', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon name="cloud" size={16} />
          </div>
          <div className="flex-1">
            <div style={{fontSize:12.5, fontWeight:500}}>Alerta de enchente</div>
            <div className="dim" style={{fontSize:11}}>São Mateus · próximas 24h · 72%</div>
          </div>
        </div>
      </div>

      {/* API call card */}
      <div style={{
        position:'absolute', bottom: 30, right: 30,
        padding: '10px 14px', borderRadius: 10,
        background: '#030915', border: '1px solid var(--border)',
        fontFamily:'Geist Mono, monospace', fontSize:11, color:'#93b6f8'
      }}>
        <span className="dim">GET</span> /v1/score/<span style={{color:'#34d8a8'}}>05422-970</span>
        <span className="chip green" style={{marginLeft:10, fontSize:10}}><span className="dot"></span>200</span>
      </div>
    </div>
  );
}

const MicroBar = ({ label, val, color }) => (
  <div className="row gap-3" style={{alignItems:'center'}}>
    <div style={{flex:1, minWidth:0}}>
      <div style={{fontSize:11, color:'var(--text-muted)', marginBottom:2}}>{label}</div>
      <div className="bar"><div className="bar-fill" style={{width:`${val*10}%`, background:color}}></div></div>
    </div>
    <div className="mono" style={{fontSize:11, color:'var(--text)', minWidth:28, textAlign:'right'}}>{val.toFixed(1)}</div>
  </div>
);

function SectionMetrics() {
  const stats = [
    { v: '12.4M', l: 'CEPs cobertos no Brasil' },
    { v: '847', l: 'Indicadores por região' },
    { v: '4.2B', l: 'Requests/mês na API' },
    { v: '< 80ms', l: 'Latência mediana' }
  ];
  return (
    <section style={{borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', background:'var(--bg-elev)'}}>
      <div style={{maxWidth:1280, margin:'0 auto', padding:'30px 40px'}}>
        <div className="grid grid-4">
          {stats.map((s, i) => (
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontSize:30, fontWeight:600, letterSpacing:'-0.025em'}}>{s.v}</div>
              <div className="dim" style={{fontSize:11.5, textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionFeatures({ navigate }) {
  const features = [
    { icon: 'shield',   title: 'Segurança',     desc: 'Crimes por tipo, séries históricas, modelos preditivos por quadra.' },
    { icon: 'cloud',    title: 'Clima & Risco', desc: 'Histórico de enchentes, deslizamentos, ondas de calor e alertas.' },
    { icon: 'car',      title: 'Mobilidade',    desc: 'Acesso a transporte, congestionamento, walkability score.' },
    { icon: 'building', title: 'Infraestrutura',desc: 'Pavimentação, iluminação, saneamento e cobertura de fibra.' },
    { icon: 'cross',    title: 'Saúde',         desc: 'Densidade de leitos, distância de prontos-socorros, IDH-Saúde.' },
    { icon: 'school',   title: 'Educação',      desc: 'Cobertura escolar, IDEB, instituições privadas e públicas.' },
    { icon: 'cart',     title: 'Comércio',      desc: 'Densidade comercial, fluxo, mix setorial e perfil de consumo.' },
    { icon: 'sparkles', title: 'IA Preditiva',  desc: 'Forecast de valorização, risco e tendências por território.' }
  ];
  return (
    <section className="block">
      <div className="section-title">Cobertura completa</div>
      <h2 className="section-h2">Tudo o que define uma região, em um índice.</h2>
      <p className="section-sub">847 indicadores territoriais consolidados em um score 0–10 — comparável entre bairros, cidades e estados.</p>
      <div className="grid grid-4" style={{gap:14}}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{padding:24, transition:'border-color .15s'}}>
            <div style={{width:38, height:38, borderRadius:10, background:'var(--blue-soft)', color:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
              <Icon name={f.icon} size={18} />
            </div>
            <div style={{fontSize:15, fontWeight:500, marginBottom:6}}>{f.title}</div>
            <div className="muted" style={{fontSize:13, lineHeight:1.55}}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionScore() {
  return (
    <section className="block" style={{borderTop:'1px solid var(--hairline)'}}>
      <div className="grid grid-2" style={{gap:60, alignItems:'center'}}>
        <div>
          <div className="section-title">Score UrbanIQ</div>
          <h2 className="section-h2">Um número que resume centenas de variáveis.</h2>
          <p className="section-sub">
            Combinamos modelos estatísticos auditados, dados públicos oficiais
            (IBGE, SSP, INMET) e sensores próprios. Atualizado semanalmente.
          </p>
          <div className="col gap-4" style={{maxWidth:480}}>
            <ScoreRange v="8.0–10" label="Excelente" color="#10b981" desc="Áreas premium, baixo risco, mobilidade alta" />
            <ScoreRange v="6.5–7.9" label="Bom" color="#4f8cf7" desc="Equilíbrio entre indicadores positivos e oportunidades" />
            <ScoreRange v="5.0–6.4" label="Regular" color="#f59e0b" desc="Atenção a aspectos específicos (segurança/clima)" />
            <ScoreRange v="0–4.9"  label="Crítico" color="#ef4444" desc="Riscos elevados em múltiplas dimensões" />
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="card" style={{padding:30, width:'100%', maxWidth:420}}>
            <div className="row gap-3" style={{justifyContent:'space-between', marginBottom:20}}>
              <div>
                <div className="dim" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em'}}>Análise</div>
                <div style={{fontSize:18, fontWeight:600, marginTop:2}}>Moema · SP</div>
              </div>
              <span className="chip green"><span className="dot"></span>+0.3 mês</span>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'10px 0 20px'}}>
              <div className="score-ring" style={{'--pct':0.87, '--color':'#10b981'}}>
                <div className="inner">
                  <div className="num">8.7<small>/10</small></div>
                  <div className="lbl">Excelente</div>
                </div>
              </div>
            </div>
            <div className="col gap-2">
              {[
                ['Segurança', 8.4, '#4f8cf7'],
                ['Mobilidade', 8.4, '#4f8cf7'],
                ['Infraestrutura', 9.0, '#10b981'],
                ['Saúde', 9.2, '#10b981'],
                ['Educação', 9.0, '#10b981'],
                ['Comércio', 8.7, '#10b981']
              ].map(([l, v, c]) => (
                <div key={l} className="bar-row">
                  <div className="lbl">{l}</div>
                  <div className="bar"><div className="bar-fill" style={{width:`${v*10}%`, background:c}}></div></div>
                  <div className="val mono">{v.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ScoreRange = ({ v, label, color, desc }) => (
  <div className="row gap-4">
    <div style={{width:80, padding:'8px 12px', borderRadius:8, background:`color-mix(in oklab, ${color} 18%, transparent)`, color, fontSize:12, fontWeight:600, textAlign:'center', fontFamily:'Geist Mono, monospace'}}>{v}</div>
    <div className="flex-1">
      <div style={{fontSize:14, fontWeight:500, color}}>{label}</div>
      <div className="muted" style={{fontSize:12.5}}>{desc}</div>
    </div>
  </div>
);

function SectionPersonas({ navigate }) {
  const personas = [
    { icon: 'user',      title: 'Pessoas', desc: 'Avalie o bairro antes de alugar ou comprar.', cta: 'Buscar agora', target: 'search' },
    { icon: 'building',  title: 'Imobiliárias & Corretores', desc: 'Argumentos baseados em dados para cada listagem.', cta: 'Ver Dashboard', target: 'dashboard' },
    { icon: 'shield',    title: 'Seguradoras & Bancos', desc: 'Precificação de risco por território com modelos auditáveis.', cta: 'Explorar API', target: 'api' },
    { icon: 'gov',       title: 'Governos & Prefeituras', desc: 'Painéis de gestão pública e tomada de decisão.', cta: 'Painel Gov.', target: 'admin' }
  ];
  return (
    <section className="block" style={{borderTop:'1px solid var(--hairline)'}}>
      <div className="section-title">Para cada caso de uso</div>
      <h2 className="section-h2">Uma plataforma. Quatro mundos.</h2>
      <div className="grid grid-4" style={{gap:14, marginTop:40}}>
        {personas.map((p, i) => (
          <div key={i} className="card" style={{padding:26, display:'flex', flexDirection:'column', minHeight:240}}>
            <div style={{width:38, height:38, borderRadius:10, background:'var(--surface-2)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
              <Icon name={p.icon} size={18} />
            </div>
            <div style={{fontSize:15, fontWeight:500, marginBottom:8}}>{p.title}</div>
            <div className="muted" style={{fontSize:13, lineHeight:1.55, flex:1}}>{p.desc}</div>
            <button className="btn btn-sm" style={{alignSelf:'flex-start', marginTop:16}} onClick={() => navigate(p.target)}>
              {p.cta} <Icon name="arrow-right" size={12} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionApiPreview({ navigate }) {
  return (
    <section className="block" style={{borderTop:'1px solid var(--hairline)'}}>
      <div className="grid grid-2" style={{gap:60, alignItems:'center'}}>
        <div>
          <div className="section-title">API UrbanIQ</div>
          <h2 className="section-h2">Integre inteligência urbana em qualquer aplicação.</h2>
          <p className="section-sub">
            REST endpoints documentados, SDKs em Node, Python e Go.
            SLA de 99.95% e bilhões de requests processados todo mês.
          </p>
          <div className="row gap-3">
            <button className="btn btn-primary" onClick={() => navigate('api')}>
              <Icon name="code" size={14}/> Abrir Playground
            </button>
            <button className="btn"><Icon name="download" size={14}/> Documentação</button>
          </div>
        </div>
        <pre className="code-block" style={{margin:0}}>
{`> `}<span className="c">{`# Score consolidado por CEP`}</span>{`
`}<span className="p">{`curl`}</span>{` -X GET `}<span className="s">{`"https://api.urbaniq.com.br/v1/score/05422-970"`}</span>{`
     -H `}<span className="s">{`"Authorization: Bearer $URBANIQ_KEY"`}</span>{`

{
  `}<span className="p">{`"cep"`}</span>{`: `}<span className="s">{`"05422-970"`}</span>{`,
  `}<span className="p">{`"neighborhood"`}</span>{`: `}<span className="s">{`"Pinheiros"`}</span>{`,
  `}<span className="p">{`"city"`}</span>{`: `}<span className="s">{`"São Paulo"`}</span>{`,
  `}<span className="p">{`"score"`}</span>{`: `}<span className="n">{`8.4`}</span>{`,
  `}<span className="p">{`"breakdown"`}</span>{`: {
    `}<span className="p">{`"safety"`}</span>{`: `}<span className="n">{`7.8`}</span>{`,
    `}<span className="p">{`"climate"`}</span>{`: `}<span className="n">{`8.2`}</span>{`,
    `}<span className="p">{`"infrastructure"`}</span>{`: `}<span className="n">{`9.1`}</span>{`,
    `}<span className="p">{`"mobility"`}</span>{`: `}<span className="n">{`9.3`}</span>{`,
    `}<span className="p">{`"health"`}</span>{`: `}<span className="n">{`8.5`}</span>{`,
    `}<span className="p">{`"commerce"`}</span>{`: `}<span className="n">{`9.5`}</span>
{`
  },
  `}<span className="p">{`"risk_forecast"`}</span>{`: {
    `}<span className="p">{`"flood_24h"`}</span>{`: `}<span className="n">{`0.08`}</span>{`,
    `}<span className="p">{`"trend_12m"`}</span>{`: `}<span className="s">{`"upward"`}</span>
{`
  }
}`}</pre>
      </div>
    </section>
  );
}

function SectionCTA({ navigate }) {
  return (
    <section style={{padding:'80px 40px'}}>
      <div className="card" style={{
        maxWidth:1100, margin:'0 auto', padding:'56px 50px',
        background: 'radial-gradient(ellipse at top right, rgba(79,140,247,0.15), transparent 60%), linear-gradient(180deg, rgba(167,139,250,0.06), transparent), var(--surface)',
        borderColor: 'var(--border-strong)'
      }}>
        <div className="grid grid-2" style={{alignItems:'center', gap:40}}>
          <div>
            <h2 style={{fontSize:36, letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:14}}>
              Pronto para conhecer o Brasil em camadas?
            </h2>
            <p className="muted" style={{fontSize:15}}>
              14 dias grátis no plano Business. Sem cartão de crédito.
            </p>
          </div>
          <div className="row gap-3" style={{justifyContent:'flex-end'}}>
            <button className="btn btn-lg" onClick={() => navigate('pricing')}>Ver planos</button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('search')}>Começar grátis <Icon name="arrow-right" size={14}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== PRICING ===============

function PricingView({ navigate }) {
  const plans = [
    {
      name: 'Starter',
      price: '199',
      period: '/mês',
      sub: 'Para profissionais autônomos e pequenos times',
      features: [
        '1.000 consultas/mês na API',
        'Score consolidado por CEP',
        'Dashboard web completo',
        'Comparação entre até 5 bairros',
        'Alertas básicos por e-mail',
        'Suporte por e-mail'
      ],
      cta: 'Começar agora',
      featured: false
    },
    {
      name: 'Business',
      price: '1.999',
      period: '/mês',
      sub: 'Para imobiliárias, seguradoras e bancos',
      features: [
        '50.000 consultas/mês na API',
        'Todos os endpoints (score, risco, forecast)',
        'Dashboards corporativos personalizáveis',
        'Comparação ilimitada de regiões',
        'Alertas em tempo real (push, SMS, webhook)',
        'Acesso à série histórica completa',
        'Exportação em CSV/PDF/PowerBI',
        'Suporte prioritário'
      ],
      cta: 'Iniciar trial de 14 dias',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'sob consulta',
      period: '',
      sub: 'Para governos, grandes corporações e marketplaces',
      features: [
        'Consultas ilimitadas',
        'SLA dedicado de 99.95%',
        'Modelos preditivos customizados',
        'Integração on-premise / VPC',
        'Account manager dedicado',
        'Dashboards white-label',
        'Conformidade LGPD certificada',
        'Treinamento e onboarding'
      ],
      cta: 'Falar com vendas',
      featured: false
    }
  ];

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Planos & preços</h1>
          <p className="desc">Escolha o plano que escala com seu negócio. Migre, faça downgrade ou cancele a qualquer momento.</p>
        </div>
        <div className="row gap-2 chip" style={{padding:'4px'}}>
          <button className="btn-sm" style={{background:'var(--blue)', color:'white', border:0, padding:'4px 12px', borderRadius:999, fontSize:12}}>Mensal</button>
          <button className="btn-sm" style={{background:'transparent', color:'var(--text-muted)', border:0, padding:'4px 12px', borderRadius:999, fontSize:12}}>Anual <span className="dim">-20%</span></button>
        </div>
      </div>

      <div className="grid grid-3" style={{gap:18, maxWidth:1200}}>
        {plans.map((p, i) => (
          <div key={i} className={`price-card ${p.featured ? 'featured' : ''}`}>
            {p.featured && <span className="chip blue" style={{alignSelf:'flex-start', marginBottom:14}}><span className="dot"></span>Mais popular</span>}
            <div style={{fontSize:18, fontWeight:600, marginBottom:6}}>{p.name}</div>
            <div className="muted" style={{fontSize:13, marginBottom:22, minHeight:38}}>{p.sub}</div>
            <div className="price">
              {p.price === 'sob consulta' ? <span style={{fontSize:24}}>Sob consulta</span> : <>
                <span className="cur">R$</span>{p.price}<span className="per">{p.period}</span>
              </>}
            </div>
            <ul>
              {p.features.map((f, j) => (
                <li key={j}><span className="ck"><Icon name="check" size={14} /></span>{f}</li>
              ))}
            </ul>
            <button className={`btn btn-lg ${p.featured ? 'btn-primary' : ''}`} onClick={() => navigate(i === 2 ? 'dashboard' : 'search')}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:36, maxWidth:1200, padding:24}}>
        <div className="row gap-3" style={{justifyContent:'space-between'}}>
          <div className="row gap-3">
            <div style={{width:38, height:38, borderRadius:10, background:'var(--blue-soft)', color:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Icon name="briefcase" size={18}/>
            </div>
            <div>
              <div style={{fontSize:14, fontWeight:500}}>Precisa de algo personalizado?</div>
              <div className="muted" style={{fontSize:12.5}}>Volumes acima de 1M req/mês, dados off-platform, parceria estratégica.</div>
            </div>
          </div>
          <button className="btn">Agendar conversa <Icon name="arrow-right" size={12}/></button>
        </div>
      </div>

      <div style={{marginTop:36, maxWidth:1200}}>
        <h3 style={{marginBottom:14}}>Perguntas frequentes</h3>
        <div className="grid grid-2">
          {[
            ['Como funciona o trial de 14 dias?', 'Você tem acesso completo ao plano Business sem cartão. Ao final, pode escolher continuar ou voltar ao Starter.'],
            ['Posso trocar de plano?', 'Sim — upgrade é imediato. Downgrade aplica no próximo ciclo de cobrança.'],
            ['Os dados são oficiais?', 'Combinamos fontes oficiais (IBGE, SSP, INMET, ANATEL) e sensores próprios auditáveis.'],
            ['Vocês são LGPD-compliant?', 'Sim — operamos com DPO designado, contrato de tratamento e residência de dados no Brasil.']
          ].map(([q, a], i) => (
            <div key={i} className="card" style={{padding:18}}>
              <div style={{fontSize:13.5, fontWeight:500, marginBottom:6}}>{q}</div>
              <div className="muted" style={{fontSize:12.5, lineHeight:1.55}}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.LandingPage = LandingPage;
window.PricingView = PricingView;
