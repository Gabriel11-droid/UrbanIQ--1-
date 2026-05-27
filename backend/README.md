# UrbanIQ — Backend API

API REST de inteligência urbana — **Node.js + Express, em modo simulado** (dados em memória, sem banco).

Quando você quiser migrar pra um banco real (Postgres, MySQL, MongoDB, etc), basta substituir as chamadas a `store.findById()` / `store.findByCep()` em `server.js` por queries SQL/ORM. O contrato dos endpoints permanece igual.

---

## 🚀 Rodar

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API sobe em `http://localhost:3001`. Não precisa de banco, Docker, nem nada.

## Testar

```bash
curl http://localhost:3001/health
curl http://localhost:3001/v1/neighborhoods
curl http://localhost:3001/v1/score/05422-970
```

## Endpoints

| Método | Rota                                | Descrição                                    |
| ------ | ----------------------------------- | -------------------------------------------- |
| GET    | `/health`                           | Health check                                 |
| GET    | `/v1/neighborhoods`                 | Lista todos os bairros com score             |
| GET    | `/v1/neighborhoods/:id`             | Detalhe completo (todas as dimensões)        |
| GET    | `/v1/score/:cep`                    | Score consolidado por CEP                    |
| GET    | `/v1/risk/flood/:cep`               | Risco de enchente (24h e 7d)                 |
| GET    | `/v1/risk/crime/:cep`               | Análise de criminalidade                     |
| GET    | `/v1/realestate/:cep`               | Mercado imobiliário                          |
| GET    | `/v1/mobility/:cep`                 | Mobilidade e walkability                     |
| POST   | `/v1/compare`                       | Compara até 10 bairros (body: `{ids:[]}`)    |
| POST   | `/v1/forecast`                      | Forecast 12m (body: `{neighborhood_id:''}`)  |
| GET    | `/v1/score-history/:id`             | Série temporal do score (24 pontos)          |
| GET    | `/v1/alerts`                        | Alertas ativos                               |
| GET    | `/v1/aggregates/sp`                 | KPIs agregados da cidade (painel governo)    |

## Estrutura

```
backend/
├── server.js        ← Express + 13 endpoints
├── data.js          ← dados em memória (8 bairros de SP)
├── package.json
├── .env.example
├── Dockerfile
└── README.md
```

## Autenticação

Em produção (`NODE_ENV=production`), todos os endpoints `/v1/*` exigem:
```
Authorization: Bearer <chave>
```
A chave é validada contra `URBANIQ_API_KEY` no `.env`.

Em desenvolvimento, autenticação fica desligada.

## Rate limiting

Padrão: 240 requests/minuto por IP. Ajuste em `.env`.

## Migrar pra banco real (quando quiser)

Quando precisar de persistência real:

1. Instale o driver (`pg` para PostgreSQL, `mysql2` para MySQL, etc)
2. Crie um arquivo `db.js` com a connection pool
3. Em `server.js`, troque cada `store.findById(id)` por uma query equivalente
4. Mantenha a estrutura da resposta JSON (o frontend não precisa mudar)

Exemplo com Postgres:
```js
// Antes:
const n = store.findById(req.params.id);

// Depois:
const { rows } = await pool.query('SELECT * FROM neighborhoods WHERE id = $1', [req.params.id]);
const n = rows[0];
```

## Deploy

- **Railway / Render / Fly.io:** apontam pra `backend/`, detectam Node automaticamente
- **Vercel:** adapte exportando `app` em vez de `app.listen`
- **Docker:** `docker build -t urbaniq-api .` então `docker run -p 3001:3001 urbaniq-api`
