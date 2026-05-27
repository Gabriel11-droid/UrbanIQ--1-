# <img src="https://img.shields.io/badge/UrbanIQ-Plataforma_Inteligente_de_Análise_Urbana-4f8cf7?style=for-the-badge" alt="UrbanIQ"/>

> Plataforma SaaS brasileira de **inteligência urbana, análise territorial e dados regionais** — para usuários, imobiliárias, seguradoras, bancos e governos.

UrbanIQ unifica em um único score 0–10 dados de **segurança, clima, infraestrutura, mobilidade, saúde, educação, comércio e meio ambiente** de qualquer região do Brasil.

> ⚙️ **Modo simulado:** o backend usa dados em memória (sem banco). Quando você quiser banco real, é trocar 1 módulo — frontend não precisa mudar nada.

---

## 🚀 Quickstart

### Passo 1 — Subir o backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API disponível em `http://localhost:3001/health` ✅

### Passo 2 — Abrir o frontend

Em **outro terminal:**

```bash
cd frontend
npx serve .
```

Abre o link que aparece (normalmente `http://localhost:3000`).

**Pronto.** Frontend + API rodando sem banco, sem Docker, sem complicação.

---

## 📁 Estrutura

```
urbaniq/
├── frontend/              ← SPA (React via CDN, sem build, responsiva)
│   ├── index.html         ← entry point + config (Google Maps + API base)
│   ├── styles.css
│   └── src/               ← components, views, data, icons
│
├── backend/               ← API REST (Express, dados em memória)
│   ├── server.js          ← 13 endpoints
│   ├── data.js            ← 8 bairros de SP
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml     ← opcional, sobe backend + nginx do frontend
└── README.md              ← este arquivo
```

---

## 🐳 Rodar com Docker (opcional)

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- API: http://localhost:3001/health

---

## 🔑 Configurando o Google Maps

Edite `frontend/index.html`, encontre `window.__UIQ_CONFIG`:

```js
window.__UIQ_CONFIG = {
  GOOGLE_MAPS_API_KEY: 'AIza...sua_chave_aqui',
  API_BASE: 'http://localhost:3001/v1'
};
```

Gere uma chave em → [console.cloud.google.com/google/maps-apis](https://console.cloud.google.com/google/maps-apis).
Ative **Maps JavaScript API** e restrinja por HTTP referrer.

Sem chave configurada, o mapa cai num fallback SVG estilizado — a app continua 100% funcional.

---

## 🎯 Funcionalidades

### Frontend (10 telas)

| Tela | Descrição |
|---|---|
| **Landing** | Marketing comercial |
| **Buscar** | Busca por CEP, endereço ou bairro |
| **Detalhe** | Score completo + 5 sub-abas |
| **Mapa** | Google Maps interativo com 5 camadas |
| **Comparar** | Radar chart de até 4 bairros |
| **Dashboard B2B** | Para imobiliárias/seguradoras |
| **Alertas** | Notificações em tempo real |
| **API Playground** | Teste endpoints ao vivo |
| **Painel Gov** | Para prefeituras + simulador IA |
| **Planos** | Pricing Starter/Business/Enterprise |

### Backend (13 endpoints REST)

Lista completa em [`backend/README.md`](./backend/README.md).

---

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| Frontend | React 18 (CDN) · Babel standalone · Geist Sans/Mono · Google Maps JS API |
| Backend  | Node.js 18+ · Express 4 · Helmet · CORS · rate-limit |
| Dados    | Em memória (modo simulado) — pronto pra migrar pra Postgres/MySQL/Mongo |
| Deploy   | Docker compose pronto, ou estático+Node em qualquer cloud |

---

## 🌎 Deploy em produção

### Frontend (estático)
- **Vercel · Netlify · Cloudflare Pages · S3+CloudFront** — funciona em qualquer um

### Backend
- **Railway · Render · Fly.io** — detectam Node automaticamente
- **Docker:** use o `backend/Dockerfile` em qualquer VPS

Lembre-se de:
1. Ajustar `API_BASE` no `frontend/index.html` pra URL do backend em produção
2. Configurar `CORS_ORIGINS` no `.env` do backend pro domínio do frontend
3. Restringir a Google Maps API key pelo HTTP referrer do seu domínio
4. Setar `NODE_ENV=production` no backend pra ativar autenticação por Bearer token

---

## 📋 Roadmap

- [ ] **Banco de dados real** (Postgres recomendado, MySQL/Mongo viáveis)
- [ ] **Ingestão real** de dados IBGE, SSP, INMET, ANATEL
- [ ] **Geocoding** por CEP (ViaCEP + Nominatim)
- [ ] **Modelos preditivos** (Python: scikit-learn / Prophet)
- [ ] **Webhooks** de alertas (Twilio, Slack, push)
- [ ] **Cache** Redis para endpoints quentes
- [ ] **Testes** Jest + supertest + Playwright
- [ ] **CI/CD** GitHub Actions
- [ ] **Cobertura nacional** — expandir além de São Paulo

---

## 📜 Licença

Proprietária — © 2026 UrbanIQ.
