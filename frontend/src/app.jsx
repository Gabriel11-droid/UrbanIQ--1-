// Root App: handles routing + global shell
const { useState: useStateApp, useEffect: useEffectApp } = React;

const CRUMBS = {
  home:      ['UrbanIQ', 'Início'],
  search:    ['UrbanIQ', 'Buscar'],
  detail:    ['UrbanIQ', 'Buscar', 'Região'],
  map:       ['UrbanIQ', 'Mapa interativo'],
  compare:   ['UrbanIQ', 'Comparar bairros'],
  dashboard: ['UrbanIQ', 'Dashboard B2B'],
  alerts:    ['UrbanIQ', 'Alertas'],
  api:       ['UrbanIQ', 'API Playground'],
  admin:     ['UrbanIQ', 'Painel governamental'],
  pricing:   ['UrbanIQ', 'Planos & preços']
};

function App() {
  const [view, setView] = useStateApp('home');
  const [selected, setSelected] = useStateApp('pinheiros');
  const [menuOpen, setMenuOpen] = useStateApp(false);

  const navigate = (v) => {
    setView(v);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // expose for offline capture
  useEffectApp(() => {
    window.__uiq = { navigate, setSelected, getView: () => view };
  });

  // Cmd-K opens search
  useEffectApp(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('search');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Landing has no sidebar/topbar
  if (view === 'home') {
    return (
      <div data-screen-label={`Home · Landing`}>
        <LandingPage navigate={navigate}/>
      </div>
    );
  }

  return (
    <div className="app" data-screen-label={CRUMBS[view] ? CRUMBS[view].join(' · ') : view}>
      <Sidebar view={view} navigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)}/>
      <div className="main">
        <Topbar crumbs={CRUMBS[view]} onSearchClick={() => navigate('search')} onMenuClick={() => setMenuOpen(true)}/>
        <div className="fade-up" key={view}>
          {view === 'search'    && <SearchView navigate={navigate} setSelected={setSelected}/>}
          {view === 'detail'    && <DetailView navigate={navigate} selected={selected} setSelected={setSelected}/>}
          {view === 'map'       && <MapView navigate={navigate} setSelected={setSelected}/>}
          {view === 'compare'   && <CompareView navigate={navigate} setSelected={setSelected}/>}
          {view === 'dashboard' && <DashboardView navigate={navigate} setSelected={setSelected}/>}
          {view === 'alerts'    && <AlertsView navigate={navigate}/>}
          {view === 'api'       && <ApiView navigate={navigate}/>}
          {view === 'admin'     && <AdminView navigate={navigate}/>}
          {view === 'pricing'   && <PricingView navigate={navigate}/>}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
