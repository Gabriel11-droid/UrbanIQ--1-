# UrbanIQ — Frontend

SPA em React (via CDN, sem build step) com design system fintech-dark.

## Rodar localmente

```bash
# qualquer servidor estático funciona
npx serve .
# ou
python3 -m http.server 8080
```

Acesse `http://localhost:3000` (ou a porta indicada).

> ⚠️ Não abra `index.html` direto (`file://`) — sirva via HTTP.

## Estrutura

```
frontend/
├── index.html             ← entry point + config (Google Maps key, API base)
├── styles.css             ← design system completo + responsividade
└── src/
    ├── icons.jsx          ← icon set inline SVG (40+ ícones)
    ├── data.jsx           ← dados mock + cliente da API com fallback
    ├── shell.jsx          ← sidebar + topbar (mobile drawer)
    ├── views_landing.jsx  ← landing comercial + pricing
    ├── views_explore.jsx  ← search, detail, map (Google Maps), compare
    ├── views_pro.jsx      ← dashboard B2B, alerts, API, admin gov
    └── app.jsx            ← router + state global
```

## Configuração

Edite `index.html` (bloco `window.__UIQ_CONFIG`):

```js
window.__UIQ_CONFIG = {
  GOOGLE_MAPS_API_KEY: 'AIza...',
  API_BASE: 'http://localhost:3001/v1'
};
```

- **Sem Google Maps key:** mapa cai em fallback SVG estilizado
- **Sem backend:** dados mock embarcados em `data.jsx` são usados automaticamente

## Build de produção

Não há build step — todos os arquivos podem ser servidos diretamente como estáticos via Vercel, Netlify, Cloudflare Pages, Nginx, S3+CloudFront, etc.

Para produção real recomenda-se:
1. Pré-compilar o JSX (substituir Babel-in-browser por Vite/esbuild)
2. Adicionar Service Worker pra cache offline
3. Substituir CDNs por self-hosted

## Responsividade

Breakpoints:
- `> 1199px` — desktop completo
- `1024–1199px` — tablet (grid 4 → 2)
- `768–1023px` — mobile-tablet (sidebar vira drawer + hamburger)
- `< 768px` — mobile pleno (1 coluna)
