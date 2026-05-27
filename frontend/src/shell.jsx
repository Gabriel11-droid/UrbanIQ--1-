// Shell: Sidebar + Topbar + content slot
const { useState, useEffect, useMemo, useRef } = React;

const NAV_PRIMARY = [
  { id: 'home',      label: 'Início',      icon: 'home' },
  { id: 'search',    label: 'Buscar',      icon: 'search' },
  { id: 'map',       label: 'Mapa',        icon: 'map' },
  { id: 'compare',   label: 'Comparar',    icon: 'compare' },
  { id: 'alerts',    label: 'Alertas',     icon: 'bell', badge: 3 }
];
const NAV_PRO = [
  { id: 'dashboard', label: 'Dashboard B2B', icon: 'briefcase' },
  { id: 'admin',     label: 'Painel Gov.',    icon: 'gov' },
  { id: 'api',       label: 'API',            icon: 'code' },
  { id: 'pricing',   label: 'Planos',         icon: 'card' }
];

const Sidebar = ({ view, navigate, open, onClose }) => (
  <>
    {onClose && <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose}></div>}
  <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="brand" onClick={() => { navigate('home'); onClose && onClose(); }} style={{cursor:'pointer'}}>
      <div className="brand-mark"></div>
      <div className="col" style={{lineHeight:1.1}}>
        <div className="brand-name">Urban<b>IQ</b></div>
        <div className="dim" style={{fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase'}}>Plataforma</div>
      </div>
    </div>

    <div className="nav-section-label">Explorar</div>
    {NAV_PRIMARY.map(item => (
      <div key={item.id}
           className={`nav-item ${view === item.id ? 'active' : ''}`}
           onClick={() => { navigate(item.id); onClose && onClose(); }}>
        <span className="ico"><Icon name={item.icon} /></span>
        <span>{item.label}</span>
        {item.badge && <span className="badge">{item.badge}</span>}
      </div>
    ))}

    <div className="nav-section-label">Profissional</div>
    {NAV_PRO.map(item => (
      <div key={item.id}
           className={`nav-item ${view === item.id ? 'active' : ''}`}
           onClick={() => { navigate(item.id); onClose && onClose(); }}>
        <span className="ico"><Icon name={item.icon} /></span>
        <span>{item.label}</span>
      </div>
    ))}

    <div className="user">
      <div className="avatar">RC</div>
      <div className="col flex-1" style={{lineHeight:1.2}}>
        <div style={{fontSize:12.5, fontWeight:500}}>Renato Costa</div>
        <div className="dim" style={{fontSize:11}}>Business · Imobi.SP</div>
      </div>
      <Icon name="settings" />
    </div>
  </aside>
  </>
);

const Topbar = ({ crumbs = [], onSearchClick, onMenuClick }) => (
  <header className="topbar">
    {onMenuClick && (
      <button className="menu-trigger" onClick={onMenuClick} aria-label="Abrir menu">
        <Icon name="layers" size={16}/>
      </button>
    )}
    <div className="crumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="dim" style={{margin:'0 8px'}}>/</span>}
          {i === crumbs.length - 1 ? <b>{c}</b> : <span>{c}</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="search-mini" onClick={onSearchClick} style={{cursor:'pointer'}}>
      <Icon name="search" size={14} />
      <input placeholder="Buscar CEP, bairro ou endereço..." readOnly />
      <kbd>⌘K</kbd>
    </div>
    <button className="topbar-btn"><Icon name="download" size={13}/> Exportar</button>
    <button className="topbar-btn"><Icon name="bell" size={13}/></button>
  </header>
);

window.Sidebar = Sidebar;
window.Topbar = Topbar;
