// UrbanIQ — Mock data store (in-memory)
// Os mesmos dados que ficam no frontend. Espelhados aqui pra que o backend
// possa servir sem precisar de banco. Quando quiser banco real, troque
// este módulo por queries ao Postgres (ver server.js comentários).

const NEIGHBORHOODS = [
  { id:'pinheiros',    name:'Pinheiros',    cep:'05422-970', pop:65135,  area:7.7,  lat:-23.5648, lng:-46.6925, tags:['Premium','Walkable','Hub comercial'] },
  { id:'moema',        name:'Moema',        cep:'04077-000', pop:84647,  area:8.5,  lat:-23.6063, lng:-46.6647, tags:['Premium','Residencial','Verde'] },
  { id:'vila-mariana', name:'Vila Mariana', cep:'04114-002', pop:130604, area:8.7,  lat:-23.5882, lng:-46.6326, tags:['Equilibrado','Universitário'] },
  { id:'tatuape',      name:'Tatuapé',      cep:'03304-000', pop:91672,  area:8.4,  lat:-23.5394, lng:-46.5772, tags:['Em crescimento','Hub leste'] },
  { id:'santana',      name:'Santana',      cep:'02011-000', pop:118797, area:12.9, lat:-23.4944, lng:-46.6275, tags:['Tradicional','Zona Norte'] },
  { id:'sao-mateus',   name:'São Mateus',   cep:'03970-000', pop:154850, area:13.8, lat:-23.6004, lng:-46.4831, tags:['Periferia','Em transformação'] },
  { id:'butanta',      name:'Butantã',      cep:'05502-000', pop:54196,  area:12.5, lat:-23.5764, lng:-46.7253, tags:['Universitário','Verde'] },
  { id:'morumbi',      name:'Morumbi',      cep:'05650-000', pop:49709,  area:11.4, lat:-23.6175, lng:-46.7019, tags:['Premium','Hospitalar'] }
];

const SCORES = {
  'pinheiros':    { overall:8.4, safety:7.8, climate:8.2, infrastructure:9.1, mobility:9.3, health:8.5, education:8.9, commerce:9.5, environment:7.4, trend_12m:0.4 },
  'moema':        { overall:8.7, safety:8.4, climate:8.8, infrastructure:9.0, mobility:8.4, health:9.2, education:9.0, commerce:8.7, environment:8.1, trend_12m:0.3 },
  'vila-mariana': { overall:8.1, safety:7.6, climate:8.0, infrastructure:8.7, mobility:8.9, health:8.4, education:8.6, commerce:8.3, environment:7.5, trend_12m:0.2 },
  'tatuape':      { overall:7.6, safety:6.9, climate:7.4, infrastructure:8.1, mobility:8.7, health:7.8, education:7.5, commerce:8.6, environment:6.8, trend_12m:0.5 },
  'santana':      { overall:7.3, safety:7.1, climate:6.8, infrastructure:7.6, mobility:7.9, health:7.4, education:7.2, commerce:7.8, environment:6.5, trend_12m:0.1 },
  'sao-mateus':   { overall:5.4, safety:4.2, climate:5.8, infrastructure:5.6, mobility:5.3, health:5.9, education:5.7, commerce:6.4, environment:5.5, trend_12m:0.2 },
  'butanta':      { overall:7.9, safety:7.4, climate:8.0, infrastructure:8.4, mobility:8.1, health:8.3, education:9.4, commerce:7.5, environment:7.9, trend_12m:0.4 },
  'morumbi':      { overall:7.7, safety:7.8, climate:7.4, infrastructure:8.2, mobility:6.8, health:8.6, education:8.4, commerce:6.9, environment:7.7, trend_12m:0.2 }
};

const CRIME = {
  'pinheiros':    { homicide:2.1, robbery:14.3, theft:38.2, vehicle:8.4 },
  'moema':        { homicide:0.9, robbery:8.7,  theft:24.1, vehicle:5.2 },
  'vila-mariana': { homicide:1.4, robbery:11.2, theft:31.5, vehicle:7.1 },
  'tatuape':      { homicide:3.2, robbery:18.4, theft:42.1, vehicle:11.3 },
  'santana':      { homicide:2.6, robbery:14.8, theft:35.6, vehicle:9.2 },
  'sao-mateus':   { homicide:12.4,robbery:42.6, theft:58.3, vehicle:21.8 },
  'butanta':      { homicide:1.8, robbery:12.5, theft:28.9, vehicle:6.8 },
  'morumbi':      { homicide:2.4, robbery:13.7, theft:29.4, vehicle:8.1 }
};

const FLOOD = {
  'pinheiros':    { events_5y:2, last_event:'2024-02-18', risk_level:'Baixo',     flood_24h:0.08, flood_7d:0.14 },
  'moema':        { events_5y:1, last_event:'2023-11-04', risk_level:'Muito baixo',flood_24h:0.04, flood_7d:0.09 },
  'vila-mariana': { events_5y:3, last_event:'2024-03-12', risk_level:'Moderado',  flood_24h:0.18, flood_7d:0.32 },
  'tatuape':      { events_5y:4, last_event:'2024-01-22', risk_level:'Moderado',  flood_24h:0.22, flood_7d:0.38 },
  'santana':      { events_5y:6, last_event:'2024-02-09', risk_level:'Alto',      flood_24h:0.34, flood_7d:0.51 },
  'sao-mateus':   { events_5y:5, last_event:'2024-03-04', risk_level:'Alto',      flood_24h:0.72, flood_7d:0.84 },
  'butanta':      { events_5y:2, last_event:'2024-02-15', risk_level:'Baixo',     flood_24h:0.10, flood_7d:0.18 },
  'morumbi':      { events_5y:2, last_event:'2024-01-30', risk_level:'Baixo',     flood_24h:0.09, flood_7d:0.16 }
};

const REAL_ESTATE = {
  'pinheiros':    { sqmPrice:12840, rentalYield:5.8, appreciation12m:9.2,  vacancy:4.1 },
  'moema':        { sqmPrice:14200, rentalYield:5.2, appreciation12m:7.8,  vacancy:3.2 },
  'vila-mariana': { sqmPrice:10980, rentalYield:6.1, appreciation12m:8.4,  vacancy:4.8 },
  'tatuape':      { sqmPrice:8420,  rentalYield:6.4, appreciation12m:11.2, vacancy:5.6 },
  'santana':      { sqmPrice:7240,  rentalYield:6.8, appreciation12m:6.4,  vacancy:6.1 },
  'sao-mateus':   { sqmPrice:3940,  rentalYield:7.2, appreciation12m:4.1,  vacancy:9.4 },
  'butanta':      { sqmPrice:9120,  rentalYield:5.9, appreciation12m:8.7,  vacancy:4.4 },
  'morumbi':      { sqmPrice:11680, rentalYield:4.9, appreciation12m:6.1,  vacancy:5.2 }
};

const DEMO = {
  'pinheiros':    { medianIncome:9420,  medianAge:35, density:8458 },
  'moema':        { medianIncome:11340, medianAge:41, density:9958 },
  'vila-mariana': { medianIncome:7820,  medianAge:38, density:15012 },
  'tatuape':      { medianIncome:6210,  medianAge:36, density:10913 },
  'santana':      { medianIncome:5630,  medianAge:39, density:9209 },
  'sao-mateus':   { medianIncome:2340,  medianAge:32, density:11221 },
  'butanta':      { medianIncome:6840,  medianAge:34, density:4336 },
  'morumbi':      { medianIncome:9850,  medianAge:42, density:4359 }
};

const INSIGHTS = {
  'pinheiros': [
    { type:'positive', text:'Densidade comercial 38% acima da média municipal' },
    { type:'positive', text:'Acesso a 4 estações de metrô em raio de 1km' },
    { type:'warning',  text:'Tráfego intenso em horários de pico' }
  ],
  'moema': [
    { type:'positive', text:'Bairro residencial com menor índice de roubos da zona Sul' },
    { type:'positive', text:'Proximidade ao Parque Ibirapuera valoriza imóveis' },
    { type:'neutral',  text:'Maturidade do mercado limita potencial de valorização' }
  ],
  'vila-mariana': [
    { type:'positive', text:'Mobilidade beneficiada pela Linha 5-Lilás do metrô' },
    { type:'warning',  text:'3 eventos de alagamento nos últimos 5 anos' },
    { type:'positive', text:'Alta densidade de instituições de ensino' }
  ],
  'tatuape': [
    { type:'positive', text:'Mercado imobiliário em expansão (+11.2% em 12m)' },
    { type:'warning',  text:'Roubos crescendo 8% YoY em vias comerciais' },
    { type:'positive', text:'Hub de transporte: 3 estações de metrô + CPTM' }
  ],
  'santana': [
    { type:'warning',  text:'Risco de enchente alto: Rio Tietê próximo' },
    { type:'positive', text:'Valorização potencial com novas obras viárias' },
    { type:'neutral',  text:'Mix demográfico amplo' }
  ],
  'sao-mateus': [
    { type:'warning',  text:'Índice de homicídios 4.2x acima da média municipal' },
    { type:'positive', text:'Expansão da Linha 15-Prata pode revalorizar a região' },
    { type:'warning',  text:'Cobertura de saúde abaixo do recomendado pela OMS' }
  ],
  'butanta': [
    { type:'positive', text:'Cinturão universitário (USP) com alta demanda de aluguel' },
    { type:'positive', text:'Áreas verdes representam 18% do território' },
    { type:'neutral',  text:'Acesso ao centro depende da Marginal Pinheiros' }
  ],
  'morumbi': [
    { type:'positive', text:'Concentração de hospitais de referência' },
    { type:'warning',  text:'Contraste socioeconômico afeta índice agregado' },
    { type:'neutral',  text:'Mobilidade limitada — sem metrô direto' }
  ]
};

const ALERTS = [
  { id:1, severity:'red',   icon:'cloud',  title:'Alerta de chuva forte — Zona Norte', area:'Santana, Tucuruvi', desc:'Previsão de 60mm/h nas próximas 3h. Risco de alagamento em pontos críticos.', minutes_ago:12 },
  { id:2, severity:'amber', icon:'shield', title:'Aumento de furtos detectado',         area:'Tatuapé',           desc:'Modelo detectou pico de 38% em furtos de celulares em vias comerciais.',     minutes_ago:45 },
  { id:3, severity:'blue',  icon:'car',    title:'Bloqueio viário programado',          area:'Av. Faria Lima',    desc:'Obras de manutenção das 22h às 5h, dia 28/05.',                              minutes_ago:120 },
  { id:4, severity:'green', icon:'check',  title:'Score de Pinheiros subiu para 8.4',   area:'Pinheiros',         desc:'Novos dados de mobilidade elevaram o índice agregado.',                      minutes_ago:300 },
  { id:5, severity:'amber', icon:'flame',  title:'Qualidade do ar reduzida',            area:'Marginal Tietê',    desc:'PM2.5 acima de 35µg/m³ desde 06h00.',                                        minutes_ago:480 },
  { id:6, severity:'red',   icon:'flag',   title:'Risco de enchente — São Mateus',      area:'São Mateus',        desc:'Modelo hidrológico indica probabilidade de 72% nas próximas 24h.',           minutes_ago:660 }
];

// ============== Helpers ==============
function findByCep(cep) {
  const normalized = String(cep).replace(/\D/g, '');
  return NEIGHBORHOODS.find(n => n.cep.replace(/\D/g, '') === normalized);
}

function findById(id) {
  return NEIGHBORHOODS.find(n => n.id === id);
}

function fullDetail(n) {
  if (!n) return null;
  const s = SCORES[n.id];
  return {
    id: n.id,
    name: n.name,
    city: 'São Paulo',
    state: 'SP',
    cep: n.cep,
    population: n.pop,
    area: n.area,
    latlng: { lat: n.lat, lng: n.lng },
    tags: n.tags,
    score: s.overall,
    metrics: {
      safety:         { score: s.safety,         label: 'Segurança' },
      climate:        { score: s.climate,        label: 'Risco climático' },
      infrastructure: { score: s.infrastructure, label: 'Infraestrutura' },
      mobility:       { score: s.mobility,       label: 'Mobilidade' },
      health:         { score: s.health,         label: 'Saúde' },
      education:      { score: s.education,      label: 'Educação' },
      commerce:       { score: s.commerce,       label: 'Comércio & Serviços' },
      environment:    { score: s.environment,    label: 'Meio ambiente' }
    },
    crime: CRIME[n.id],
    flood: FLOOD[n.id],
    realEstate: REAL_ESTATE[n.id],
    demographics: DEMO[n.id],
    aiInsights: INSIGHTS[n.id] || []
  };
}

module.exports = {
  NEIGHBORHOODS, SCORES, CRIME, FLOOD, REAL_ESTATE, DEMO, INSIGHTS, ALERTS,
  findByCep, findById, fullDetail
};
