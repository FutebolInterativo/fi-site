export type Mentor = {
  nome: string;
  bio: string;
  foto: string;
};

export type Depoimento = {
  nome: string;
  texto: string;
  papel?: string;
  videoUrl?: string; // YouTube (watch?v=... ou youtu.be/...)
};

export type EmentaItem = { titulo: string; descricao?: string };
export type FaqItem = { q: string; a: string };
export type Stat = { valor: string; label: string };

export type Curso = {
  id: string;
  slug: string;
  title: string;
  type: string;
  area: string;
  shortDescription: string;
  externalUrl: string;
  featured: boolean;

  // ---- conteúdo rico (todos opcionais) ----
  capa?: string;
  headline?: string;
  subheadline?: string;
  cargaHoraria?: string;
  numAulas?: string;
  formato?: string;
  paraQuem?: string[];
  ementa?: EmentaItem[];
  aprendizado?: string[];
  mentores?: Mentor[];
  experienciaPratica?: string[];
  depoimentos?: Depoimento[];
  diferenciais?: string[];
  stats?: Stat[];
  preco?: string;
  precoAvista?: string;
  garantiaTexto?: string;
  faq?: FaqItem[];

  // ---- conversão ----
  checkoutUrl?: string; // se ausente, usa externalUrl
  hubspotPortalId?: string;
  hubspotFormId?: string;
};

export type Area = {
  id: string;
  label: string;
  color: string;
};

export const areas: Area[] = [
  { id: "todas",                 label: "Todas",             color: "#0C98FC" },
  { id: "tecnica-e-tatica",      label: "Técnica e Tática",  color: "#4096F2" },
  { id: "comunicacao-marketing", label: "Comunicação",       color: "#818CF8" },
  { id: "saude",                 label: "Saúde",             color: "#2DD4BF" },
  { id: "gestao-e-operacao",     label: "Gestão e Operação", color: "#F59E0B" },
];

export const cursos: Curso[] = [
  {
    id: "esp-analise-desempenho-mercado",
    slug: "esp-analise-desempenho-mercado",
    title: "Especialização em Análise de Desempenho e Mercado",
    type: "Especialização",
    area: "tecnica-e-tatica",
    shortDescription: "Aprenda com analistas renomados de grandes clubes.",
    externalUrl: "https://eventos.futebolinterativo.com/especializacao-analise-de-desempenho-e-mercado/",
    featured: true,
    capa: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/05/PROFESSORES-33-1-1024x816.png",
    headline: "ESPECIALIZAÇÃO EM ANÁLISE DE DESEMPENHO E MERCADO",
    subheadline: "Aprenda com analistas renomados de grandes clubes e tenha, de forma garantida, uma experiência prática dentro do departamento de análise de desempenho e mercado de um clube profissional.",
    cargaHoraria: "150h",
    numAulas: "15 aulas",
    formato: "100% online",
    paraQuem: [
      "Estudante ou formado em Educação Física, Jornalismo, Tecnologia, entre outras áreas, que deseja trabalhar dentro de um departamento de análise de um clube.",
      "Profissional do futebol que deseja conhecer mais sobre Análise de Desempenho e Mercado no Futebol.",
    ],
    ementa: [
      { titulo: "Por Dentro do Departamento de Análise", descricao: "Visão geral do funcionamento de um departamento de análise em um clube, suas funções, processos e integração com comissão técnica e diretoria." },
      { titulo: "Modelos Estatísticos para Análise de Jogo", descricao: "Principais métricas e estatísticas usadas para avaliar o desempenho de jogadores e equipes, interpretando dados quantitativos no futebol." },
      { titulo: "Análise de Treinos e Jogos da Própria Equipe", descricao: "Métodos para análise tática e técnica do próprio time, utilizando filmagens, relatórios e indicadores de desempenho." },
      { titulo: "Utilização de Softwares de Análise", descricao: "Ferramentas mais usadas no mercado (como Wyscout e Once Sports) e como auxiliam na coleta, tratamento e apresentação de dados." },
      { titulo: "Trilha de Carreira FI: Soft-skills", descricao: "Quais soft-skills um profissional precisa ter para ingressar na análise no futebol." },
      { titulo: "Protocolos de Análise", descricao: "Criação de padrões para observação e avaliação de jogos, garantindo eficiência e consistência na coleta de informações." },
      { titulo: "Apresentação de Dados: Relatórios e Visualização", descricao: "Estruturação de relatórios e visualizações claras a partir dos dados, com foco na comunicação com comissão técnica e diretoria." },
      { titulo: "O Departamento de Análise de Mercado", descricao: "Como funciona o departamento de análise de mercado dentro do clube." },
      { titulo: "Ferramentas e Tecnologias para a Análise de Mercado", descricao: "As principais ferramentas e tecnologias aplicadas à análise de mercado." },
      { titulo: "Trilha de Carreira FI: Remuneração", descricao: "Possibilidades de atuação e remuneração na área de análise no futebol." },
      { titulo: "Identificação de Talentos", descricao: "Critérios e processos para identificação de talentos." },
      { titulo: "Análise de Mercado na Prática", descricao: "Da definição de necessidades do clube à apresentação de alvos, com simulações e estudos de caso reais." },
      { titulo: "Valuation de Atletas e Transfermarkt", descricao: "Métodos para estimar o valor de mercado de um jogador e o uso estratégico de plataformas como o Transfermarkt." },
      { titulo: "Montagem de um Elenco Profissional", descricao: "Equilíbrio entre posições, perfis táticos, idade, liderança e orçamento na construção de um elenco." },
      { titulo: "Trilha de Carreira FI: Experiência Prática", descricao: "Quais os primeiros passos após a experiência prática." },
    ],
    mentores: [
      { nome: "André Velloso", bio: "Head Scout do Atlético/MG", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/11/Andre-Velloso.png" },
      { nome: "Matheus Alvarez", bio: "Coord. do Centro de Inteligência da Base do Santos", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/11/Matheus-Alvarez.png" },
      { nome: "Gabriel Gomes", bio: "Scout do Bayer Leverkusen", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/04/Gabriel-Gomes-Scout-do-Bayer-Leverkusen.png" },
      { nome: "Caio Freitas", bio: "Analista de Desempenho do Boavista S.C.", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/04/Caio-Freitas-1.png" },
      { nome: "Leonardo Maciel", bio: "Analista de Desempenho do Sub-20 da Seleção dos Emirados Árabes Unidos", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/01/Leonardo-Maciel-analista-de-desempenho-da-selecao-dos-Emirados-Arabes-U20.png" },
      { nome: "Otávio Hoffmann", bio: "Analista de Desempenho do Anápolis", foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/01/Otavio-Hoffmann-Analista-de-Desempenho-do-Anapolis.png" },
    ],
    experienciaPratica: [
      "Analisar jogos de ponta a ponta: antes, durante e depois das partidas",
      "Gravar e recortar treinos e jogos com drones, câmeras e softwares profissionais",
      "Estudar adversários: padrões táticos, bolas paradas, atletas-chave",
      "Produzir estatísticas ao vivo e gerar relatórios para a comissão",
      "Apresentar análises para atletas e comissão técnica",
      "Participar de treinos técnicos e táticos, inclusive com as categorias de base",
      "Acompanhar os feedbacks da equipe técnica",
      "Evoluir de tarefas operacionais para decisões estratégicas",
    ],
    depoimentos: [
      { nome: "Rafael Mantovani", papel: "Contratado pelo Ituano após a Experiência Prática", texto: "Depoimento sobre a jornada até a contratação no Ituano.", videoUrl: "https://www.youtube.com/watch?v=KEZ8JXbGvl4" },
      { nome: "Otávio Hoffmann", papel: "Experiência Prática no Bahia; hoje Analista do Atlético/MG", texto: "Da experiência prática no Bahia ao cargo de analista de desempenho.", videoUrl: "https://www.youtube.com/watch?v=OYYnYM1fhVg" },
      { nome: "Ralff Frederico", papel: "Experiência Prática no América/RJ", texto: "Experiência prática no departamento de análise de desempenho do América/RJ.", videoUrl: "https://www.youtube.com/watch?v=xlayC4Pn0RM" },
    ],
    diferenciais: [
      "15 aulas gravadas",
      "Laboratório de encerramento",
      "Material didático",
      "Suporte da equipe FI",
      "Grupo exclusivo de networking",
      "Certificado de 150h",
      "Portfólio profissional",
      "Grupo exclusivo de vagas de emprego",
    ],
    stats: [
      { valor: "+25.000", label: "Alunos matriculados" },
      { valor: "+300", label: "Turmas realizadas" },
      { valor: "+4.500", label: "Alunos em experiência prática" },
      { valor: "+120", label: "Clubes parceiros" },
    ],
    preco: "12x R$ 533,99",
    precoAvista: "Ou R$ 5.497,00 à vista",
    garantiaTexto: "Garantia de 7 dias",
    checkoutUrl: "https://alunos.futebolinterativo.com/pay/4027-2-especializacao-analise-de-desempenho-e-mercado-turma-11",
    hubspotPortalId: "46152446",
    hubspotFormId: "de45179e-abf4-402c-8472-75f446c2aa96",
  },
  { id: "curso-correspondente-internacional-no-futebol", slug: "curso-correspondente-internacional-no-futebol", title: "Curso de Correspondente Internacional no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-de-correspondente-internacional-no-futebol/", featured: true },
  { id: "curso-softwares-analise-desempenho-mercado", slug: "curso-softwares-analise-desempenho-mercado", title: "Curso Prático de Softwares de Análise de Desempenho e Mercado no Futebol", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-pratico-de-softwares-de-analise-de-desempenho-e-mercado-no-futebol/", featured: true },
  { id: "curso-patrocinio-licenciamento", slug: "curso-patrocinio-licenciamento", title: "Curso de Patrocínio e Licenciamento no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-de-patrocinio-e-licenciamento-no-futebol/", featured: true },
  { id: "curso-inteligencia-artificial-no-futebol", slug: "curso-inteligencia-artificial-no-futebol", title: "Curso de Inteligência Artificial no Futebol", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-inteligencia-artificial/", featured: true },
  { id: "curso-setorista-no-futebol", slug: "curso-setorista-no-futebol", title: "Curso de Setorista no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-setorista-no-futebol/", featured: true },
  { id: "esp-ciencia-de-dados-no-futebol", slug: "esp-ciencia-de-dados-no-futebol", title: "Especialização em Ciência de Dados no Futebol", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-ciencia-de-dados/", featured: true },
  { id: "esp-nutricao-no-futebol", slug: "esp-nutricao-no-futebol", title: "Especialização em Nutrição no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-nutricao-no-futebol/", featured: true },
  { id: "esp-marketing-no-futebol", slug: "esp-marketing-no-futebol", title: "Especialização em Marketing no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/comunicacao-e-marketing/", featured: true },
  { id: "esp-fisioterapia-no-futebol", slug: "esp-fisioterapia-no-futebol", title: "Especialização em Fisioterapia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-fisioterapia-no-futebol/", featured: true },
  { id: "esp-direito-no-futebol", slug: "esp-direito-no-futebol", title: "Especialização em Direito no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-direito-no-futebol/", featured: true },
  { id: "esp-gestao-no-futebol", slug: "esp-gestao-no-futebol", title: "Especialização em Gestão no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-gestao-no-futebol/", featured: true },
  { id: "esp-preparacao-fisica-recovery", slug: "esp-preparacao-fisica-recovery", title: "Especialização em Preparação Física e Recovery", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/preparacao-fisica-e-recovery/", featured: true },
  { id: "esp-psicologia-no-futebol", slug: "esp-psicologia-no-futebol", title: "Especialização em Psicologia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-psicologia-no-futebol/", featured: true },
  { id: "curso-treinador-auxiliar", slug: "curso-treinador-auxiliar", title: "Curso Treinador Auxiliar", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinador-auxiliar/", featured: true },
  { id: "esp-treinadores-na-pratica", slug: "esp-treinadores-na-pratica", title: "Especialização em Treinadores na Prática", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinadores-na-pratica/", featured: true },
  { id: "esp-jornalismo-no-futebol", slug: "esp-jornalismo-no-futebol", title: "Especialização em Jornalismo no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-jornalismo-no-futebol/", featured: true },
  { id: "esp-supervisor-de-futebol", slug: "esp-supervisor-de-futebol", title: "Especialização em Supervisor de Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-supervisor-de-futebol/", featured: true },
  { id: "curso-massagista-no-futebol", slug: "curso-massagista-no-futebol", title: "Curso Massagista no Futebol", type: "Curso", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-massagista-no-futebol/", featured: true },
  { id: "curso-agente-fifa", slug: "curso-agente-fifa", title: "Preparatório Agente FIFA", type: "Curso", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-agente-fifa/", featured: true },
  { id: "curso-bolas-paradas", slug: "curso-bolas-paradas", title: "Curso Bolas Paradas", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-bolas-paradas/", featured: true },
  { id: "curso-fotografia-no-futebol", slug: "curso-fotografia-no-futebol", title: "Curso Fotografia no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/fotografia-no-futebol/", featured: true },
  { id: "esp-comentarista-de-futebol", slug: "esp-comentarista-de-futebol", title: "Especialização em Comentarista de Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/comentarista-de-futebol/", featured: true },
  { id: "esp-lpf-pro-comissao-tecnica-futsal", slug: "esp-lpf-pro-comissao-tecnica-futsal", title: "Especialização LPF PRO - Comissão Técnica no Futsal", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/lpf-pro-comissao-tecnica-de-futsal/", featured: true },
  { id: "esp-narracao-no-futebol", slug: "esp-narracao-no-futebol", title: "Especialização em Narração no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://futebolinterativo.com/cursos/narracao-no-futebol/index.html", featured: true },
  { id: "esp-gestao-de-clubes-empresa", slug: "esp-gestao-de-clubes-empresa", title: "Especialização em Gestão de Clubes Empresa", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/gestao-clube-empresa/", featured: true },
  { id: "esp-financas-no-futebol", slug: "esp-financas-no-futebol", title: "Especialização em Finanças no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-financas-no-futebol/", featured: true },
  { id: "esp-medicina-no-futebol", slug: "esp-medicina-no-futebol", title: "Especialização em Medicina no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-medicina-no-futebol/", featured: true },
  { id: "curso-tatica-individual-e-coletiva", slug: "curso-tatica-individual-e-coletiva", title: "Tática Individual e Coletiva", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/tatica-individual-e-coletiva/", featured: true },
  { id: "esp-big-data-analytics-mercado", slug: "esp-big-data-analytics-mercado", title: "Especialização em Big Data, Analytics e Mercado", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/big-data-analytics-e-mercado/", featured: true },
  { id: "curso-tatica-campo-estrutura-de-jogo", slug: "curso-tatica-campo-estrutura-de-jogo", title: "Curso Tática, Campo e Estrutura de Jogo", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/tatica-campo-e-estrutura-de-jogo/", featured: true },
  { id: "esp-coordenacao-cientifica-no-futebol", slug: "esp-coordenacao-cientifica-no-futebol", title: "Especialização em Coordenação Científica no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/coordenacao-cientifica-no-futebol/", featured: true },
  { id: "curso-treinamento-de-goleiros-avancado", slug: "curso-treinamento-de-goleiros-avancado", title: "Curso Treinamento de Goleiros Avançado", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinamento-de-goleiros-avancado/", featured: true },
  { id: "esp-odontologia-no-futebol", slug: "esp-odontologia-no-futebol", title: "Especialização em Odontologia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-odontologia-no-futebol/", featured: true },
];

export function getCursoBySlug(slug: string): Curso | undefined {
  return cursos.find((c) => c.id === slug);
}

export function getAllSlugs(): string[] {
  return cursos.map((c) => c.id);
}