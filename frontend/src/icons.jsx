// Inline minimal icon set — 16px stroke icons. Keep simple, geometric.
const Icon = ({ name, size = 16, stroke = 1.6, style }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
    style
  };
  switch (name) {
    case 'home': return <svg {...props}><path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case 'map': return <svg {...props}><path d="M9 4l6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v16M15 6v16"/></svg>;
    case 'pin': return <svg {...props}><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'layers': return <svg {...props}><path d="M12 2l10 6-10 6L2 8z"/><path d="M2 14l10 6 10-6"/></svg>;
    case 'chart': return <svg {...props}><path d="M3 20h18"/><path d="M6 16V8M11 16V4M16 16v-6M21 16v-2"/></svg>;
    case 'compare': return <svg {...props}><path d="M9 3v18M15 3v18"/><path d="M3 8h6M3 16h6M15 8h6M15 16h6"/></svg>;
    case 'shield': return <svg {...props}><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg>;
    case 'cloud': return <svg {...props}><path d="M7 18a5 5 0 010-10 6 6 0 0111.6 1.5A4.5 4.5 0 0118 18z"/></svg>;
    case 'building': return <svg {...props}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h2M9 12h2M9 16h2M13 8h2M13 12h2M13 16h2"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></svg>;
    case 'code': return <svg {...props}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>;
    case 'card': return <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left': return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'arrow-up-right': return <svg {...props}><path d="M7 17L17 7M7 7h10v10"/></svg>;
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus': return <svg {...props}><path d="M5 12h14"/></svg>;
    case 'x': return <svg {...props}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case 'check': return <svg {...props}><path d="M4 12l5 5L20 6"/></svg>;
    case 'download': return <svg {...props}><path d="M12 3v12M6 11l6 6 6-6M4 21h16"/></svg>;
    case 'filter': return <svg {...props}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>;
    case 'flag': return <svg {...props}><path d="M4 22V4l8 2 8-2v12l-8 2-8-2"/></svg>;
    case 'play': return <svg {...props}><path d="M6 4l14 8-14 8z"/></svg>;
    case 'lightning': return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>;
    case 'car': return <svg {...props}><path d="M3 12l2-5h14l2 5M3 12v6h2M21 12v6h-2M5 18h14"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg>;
    case 'school': return <svg {...props}><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v6c0 1 2 2 5 2s5-1 5-2v-6"/></svg>;
    case 'cross': return <svg {...props}><path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"/></svg>;
    case 'cart': return <svg {...props}><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 4h3l3 12h11l2-8H6"/></svg>;
    case 'tree': return <svg {...props}><path d="M12 2l5 6h-3l4 6h-3l3 4H6l3-4H6l4-6H7z"/><path d="M12 18v4"/></svg>;
    case 'eye': return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'cog': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
    case 'flame': return <svg {...props}><path d="M12 2c2 4 5 6 5 11a5 5 0 11-10 0c0-3 2-5 2-8 0 1 1 2 3 2z"/></svg>;
    case 'globe': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'briefcase': return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/></svg>;
    case 'dots': return <svg {...props}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>;
    case 'trend-up': return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case 'trend-down': return <svg {...props}><path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/></svg>;
    case 'logout': return <svg {...props}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'database': return <svg {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case 'gov': return <svg {...props}><path d="M3 21h18M5 21V10M19 21V10M3 10h18L12 3z"/><path d="M9 21V14M15 21V14"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
};
window.Icon = Icon;
