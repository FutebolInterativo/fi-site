export type Curso = {
  id: string;
  title: string;
  type: string;
  area: string;
  shortDescription: string;
  externalUrl: string;
  featured: boolean;
};

export type Area = {
  id: string;
  label: string;
  color: string;
};

export const areas: Area[] = [
  { id: "todas",                label: "Todas",               color: "#0C98FC" },
  { id: "tecnica-e-tatica",     label: "Técnica e Tática",    color: "#4096F2" },
  { id: "comunicacao-marketing",label: "Comunicação",         color: "#818CF8" },
  { id: "saude",                label: "Saúde",               color: "#2DD4BF" },
  { id: "gestao-e-operacao",    label: "Gestão e Operação",   color: "#F59E0B" },
];

export const cursos: Curso[] = [
  { id:"esp-analise-desempenho-mercado", title:"Especialização em Análise de Desempenho e Mercado", type:"Especialização", area:"tecnica-e-tatica", shortDescription:"Aprenda com analistas renomados de grandes clubes.", externalUrl:"https://eventos.futebolinterativo.com/especializacao-analise-de-desempenho-e-mercado/", featured:true },
  { id:"curso-correspondente-internacional-no-futebol", title:"Curso de Correspondente Internacional no Futebol", type:"Curso", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-de-correspondente-internacional-no-futebol/", featured:true },
  { id:"curso-softwares-analise-desempenho-mercado", title:"Curso Prático de Softwares de Análise de Desempenho e Mercado no Futebol", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-pratico-de-softwares-de-analise-de-desempenho-e-mercado-no-futebol/", featured:true },
  { id:"curso-patrocinio-licenciamento", title:"Curso de Patrocínio e Licenciamento no Futebol", type:"Curso", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-de-patrocinio-e-licenciamento-no-futebol/", featured:true },
  { id:"curso-inteligencia-artificial-no-futebol", title:"Curso de Inteligência Artificial no Futebol", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-inteligencia-artificial/", featured:true },
  { id:"curso-setorista-no-futebol", title:"Curso de Setorista no Futebol", type:"Curso", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-setorista-no-futebol/", featured:true },
  { id:"esp-ciencia-de-dados-no-futebol", title:"Especialização em Ciência de Dados no Futebol", type:"Especialização", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-ciencia-de-dados/", featured:true },
  { id:"esp-nutricao-no-futebol", title:"Especialização em Nutrição no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-nutricao-no-futebol/", featured:true },
  { id:"esp-marketing-no-futebol", title:"Especialização em Marketing no Futebol", type:"Especialização", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/comunicacao-e-marketing/", featured:true },
  { id:"esp-fisioterapia-no-futebol", title:"Especialização em Fisioterapia no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-fisioterapia-no-futebol/", featured:true },
  { id:"esp-direito-no-futebol", title:"Especialização em Direito no Futebol", type:"Especialização", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-direito-no-futebol/", featured:true },
  { id:"esp-gestao-no-futebol", title:"Especialização em Gestão no Futebol", type:"Especialização", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-gestao-no-futebol/", featured:true },
  { id:"esp-preparacao-fisica-recovery", title:"Especialização em Preparação Física e Recovery", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/preparacao-fisica-e-recovery/", featured:true },
  { id:"esp-psicologia-no-futebol", title:"Especialização em Psicologia no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-psicologia-no-futebol/", featured:true },
  { id:"curso-treinador-auxiliar", title:"Curso Treinador Auxiliar", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/treinador-auxiliar/", featured:true },
  { id:"esp-treinadores-na-pratica", title:"Especialização em Treinadores na Prática", type:"Especialização", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/treinadores-na-pratica/", featured:true },
  { id:"esp-jornalismo-no-futebol", title:"Especialização em Jornalismo no Futebol", type:"Especialização", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-jornalismo-no-futebol/", featured:true },
  { id:"esp-supervisor-de-futebol", title:"Especialização em Supervisor de Futebol", type:"Especialização", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-supervisor-de-futebol/", featured:true },
  { id:"curso-massagista-no-futebol", title:"Curso Massagista no Futebol", type:"Curso", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-massagista-no-futebol/", featured:true },
  { id:"curso-agente-fifa", title:"Preparatório Agente FIFA", type:"Curso", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-agente-fifa/", featured:true },
  { id:"curso-bolas-paradas", title:"Curso Bolas Paradas", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-bolas-paradas/", featured:true },
  { id:"curso-fotografia-no-futebol", title:"Curso Fotografia no Futebol", type:"Curso", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/fotografia-no-futebol/", featured:true },
  { id:"esp-comentarista-de-futebol", title:"Especialização em Comentarista de Futebol", type:"Especialização", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/comentarista-de-futebol/", featured:true },
  { id:"esp-lpf-pro-comissao-tecnica-futsal", title:"Especialização LPF PRO - Comissão Técnica no Futsal", type:"Especialização", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/lpf-pro-comissao-tecnica-de-futsal/", featured:true },
  { id:"esp-narracao-no-futebol", title:"Especialização em Narração no Futebol", type:"Especialização", area:"comunicacao-marketing", shortDescription:"", externalUrl:"https://futebolinterativo.com/cursos/narracao-no-futebol/index.html", featured:true },
  { id:"esp-gestao-de-clubes-empresa", title:"Especialização em Gestão de Clubes Empresa", type:"Especialização", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/gestao-clube-empresa/", featured:true },
  { id:"esp-financas-no-futebol", title:"Especialização em Finanças no Futebol", type:"Especialização", area:"gestao-e-operacao", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-financas-no-futebol/", featured:true },
  { id:"esp-medicina-no-futebol", title:"Especialização em Medicina no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/especializacao-medicina-no-futebol/", featured:true },
  { id:"curso-tatica-individual-e-coletiva", title:"Tática Individual e Coletiva", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/tatica-individual-e-coletiva/", featured:true },
  { id:"esp-big-data-analytics-mercado", title:"Especialização em Big Data, Analytics e Mercado", type:"Especialização", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/big-data-analytics-e-mercado/", featured:true },
  { id:"curso-tatica-campo-estrutura-de-jogo", title:"Curso Tática, Campo e Estrutura de Jogo", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/tatica-campo-e-estrutura-de-jogo/", featured:true },
  { id:"esp-coordenacao-cientifica-no-futebol", title:"Especialização em Coordenação Científica no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/coordenacao-cientifica-no-futebol/", featured:true },
  { id:"curso-treinamento-de-goleiros-avancado", title:"Curso Treinamento de Goleiros Avançado", type:"Curso", area:"tecnica-e-tatica", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/treinamento-de-goleiros-avancado/", featured:true },
  { id:"esp-odontologia-no-futebol", title:"Especialização em Odontologia no Futebol", type:"Especialização", area:"saude", shortDescription:"", externalUrl:"https://eventos.futebolinterativo.com/curso-odontologia-no-futebol/", featured:true },
];
