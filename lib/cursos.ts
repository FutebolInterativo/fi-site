// lib/cursos.ts

export type Mentor = {
  nome: string;
  bio: string;
  foto: string;
  clube?: string;      // label curto pro badge (ex: "Atlético-MG")
  clubeTag?: string;   // sigla pro selo redondo (ex: "CAM")
  ancora?: boolean;    // mentor em destaque (card grande) na seção
  quote?: string;      // frase em 1ª pessoa, só usada quando ancora=true
};

export type Depoimento = {
  nome: string;
  texto: string;
  papel?: string;
  videoUrl?: string;
};

export type EmentaItem = {
  titulo: string;
  descricao?: string;
  grupo?: "desempenho" | "mercado" | "entrada"; // agrupamento visual da ementa
};
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
  capaSemTexto?: string;  // versão sem texto/logo, usada em cards e locais onde o nome já aparece como texto próprio (ex: listagem /cursos). Se ausente, cai no fallback de `capa`.
  headline?: string;
  heroTitle?: string;      // título só do H1 do hero — se ausente, usa `title`
  subheadline?: string;
  cargaHoraria?: string;
  numAulas?: string;
  formato?: string;
  heroStats?: Stat[];      // se presente, substitui a barra derivada de cargaHoraria/numAulas/formato
  paraQuem?: string[];
  naoEPara?: string[];     // bloco espelho "Não é pra você se..."
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
  checkoutUrl?: string;
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
  { id: "tecnica-e-tatica",      label: "Técnico / Tático",       color: "#4096F2" },
  { id: "comunicacao-marketing", label: "Comunicação e Marketing", color: "#818CF8" },
  { id: "saude",                 label: "Saúde e Performance",    color: "#2DD4BF" },
  { id: "gestao-e-operacao",     label: "Gestão e Operação",      color: "#F59E0B" },
];

export const cursos: Curso[] = [
  {
    // ── campos obrigatórios ──────────────────────────────────────────────
    id:               "esp-analise-desempenho-mercado",
    slug:             "esp-analise-desempenho-mercado",
    title:            "Especialização em Análise de Desempenho e Mercado",
    type:             "Especialização",
    area:             "tecnica-e-tatica",
    shortDescription: "Forme-se analista de desempenho e mercado com mentores que trabalham nos maiores clubes do Brasil e do mundo.",
    externalUrl:      "https://eventos.futebolinterativo.com/especializacao-analise-de-desempenho-e-mercado/",
    featured:         true,
    capa:             "/images/cursos/analise-de-desempenho-e-mercado.webp",
    capaSemTexto:     "/images/cursos/analise-de-desempenho-e-mercado-sem-texto.webp",

    // ── campos ricos ─────────────────────────────────────────────────────
    cargaHoraria: "150h",
    numAulas:     "15",
    formato:      "100% Online",
    heroTitle:    "TORNE-SE O ANALISTA QUE OS CLUBES DISPUTAM",
    subheadline:  "15 aulas ao vivo com analistas que trabalham nos maiores clubes do Brasil e do mundo, e experiência prática garantida dentro de um clube parceiro.",
    heroStats: [
      { valor: "150h",  label: "Carga horária" },
      { valor: "15",    label: "Aulas ao vivo" },
      { valor: "✓",     label: "Prática em clube garantida" },
      { valor: "✓",     label: "Certificado" },
    ],

    paraQuem: [
      "Quer trabalhar na análise de desempenho ou de mercado de um clube profissional",
      "É estudante de Educação Física, Jornalismo, Estatística ou áreas afins",
      "Já trabalha no futebol mas quer se especializar em análise",
      "Precisa de experiência prática para entrar no mercado",
      "Quer aprender a usar os softwares mais usados pelos clubes",
    ],

    naoEPara: [
      "Procura renda rápida ou \"trabalhar com futebol\" sem estudar de verdade",
      "Quer só assistir aulas: aqui você vai praticar dentro de um clube",
      "Acredita que paixão basta. O mercado exige método",
    ],

    ementa: [
      { grupo: "desempenho", titulo: "Por Dentro do Departamento de Análise", descricao: "Visão geral do funcionamento de um departamento de análise em um clube, suas funções, processos e integração com comissão técnica e diretoria." },
      { grupo: "desempenho", titulo: "Modelos Estatísticos para Análise de Jogo", descricao: "Principais métricas e estatísticas usadas para avaliar o desempenho de jogadores e equipes, interpretando dados quantitativos no futebol." },
      { grupo: "desempenho", titulo: "Análise de Treinos e Jogos da Própria Equipe", descricao: "Métodos para análise tática e técnica do próprio time, utilizando filmagens, relatórios e indicadores de desempenho." },
      { grupo: "desempenho", titulo: "Utilização de Softwares de Análise", descricao: "Ferramentas mais usadas no mercado (como Wyscout e Once Sports) e como auxiliam na coleta, tratamento e apresentação de dados." },
      { grupo: "desempenho", titulo: "Protocolos de Análise", descricao: "Criação de padrões para observação e avaliação de jogos, garantindo eficiência e consistência na coleta de informações." },
      { grupo: "desempenho", titulo: "Relatórios e Visualização de Dados", descricao: "Estruturação de relatórios e visualizações claras a partir dos dados, com foco na comunicação com comissão técnica e diretoria." },
      { grupo: "mercado", titulo: "O Departamento de Análise de Mercado", descricao: "Como funciona o departamento de análise de mercado dentro do clube, suas responsabilidades e fluxos de trabalho." },
      { grupo: "mercado", titulo: "Ferramentas e Tecnologias para Análise de Mercado", descricao: "As principais ferramentas e tecnologias aplicadas à análise de mercado no futebol." },
      { grupo: "mercado", titulo: "Identificação de Talentos", descricao: "Critérios e processos para identificação de talentos utilizados pelos melhores departamentos de scout do mundo." },
      { grupo: "mercado", titulo: "Análise de Mercado na Prática", descricao: "Da definição de necessidades do clube à apresentação de alvos, com simulações e estudos de caso reais." },
      { grupo: "mercado", titulo: "Valuation de Atletas e Transfermarkt", descricao: "Métodos para estimar o valor de mercado de um jogador e o uso estratégico de plataformas como o Transfermarkt." },
      { grupo: "mercado", titulo: "Montagem de um Elenco Profissional", descricao: "Equilíbrio entre posições, perfis táticos, idade, liderança e orçamento na construção de um elenco." },
      { grupo: "entrada", titulo: "Soft-skills para a Análise no Futebol", descricao: "Quais competências comportamentais um profissional precisa ter para ingressar e crescer na análise no futebol." },
      { grupo: "entrada", titulo: "Remuneração e Carreira na Análise", descricao: "Possibilidades de atuação e remuneração na área de análise no futebol." },
      { grupo: "entrada", titulo: "Primeiros Passos Após a Experiência Prática", descricao: "Como aproveitar a experiência prática para dar o salto definitivo para o mercado profissional." },
    ],

    mentores: [
      { nome: "Matheus Alvarez", bio: "Coord. do Centro de Inteligência da Base do Santos",                                 foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/11/Matheus-Alvarez.png", clube: "Santos FC", clubeTag: "SFC", ancora: true, quote: "Você vai aprender o processo que eu uso pra analisar a base do Santos — do vídeo bruto ao relatório na mesa da comissão." },
      { nome: "André Velloso",   bio: "Head Scout do Atlético/MG",                                                         foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/11/Andre-Velloso.png", clube: "Atlético-MG", clubeTag: "CAM" },
      { nome: "Gabriel Gomes",   bio: "Scout do Bayer Leverkusen",                                                          foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/04/Gabriel-Gomes-Scout-do-Bayer-Leverkusen.png", clube: "Bayer Leverkusen", clubeTag: "B04" },
      { nome: "Caio Freitas",    bio: "Analista de Desempenho do Boavista S.C.",                                            foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2025/04/Caio-Freitas-1.png", clube: "Boavista S.C.", clubeTag: "BOA" },
      { nome: "Leonardo Maciel", bio: "Analista de Desempenho do Sub-20 da Seleção dos Emirados Árabes Unidos",             foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/01/Leonardo-Maciel-analista-de-desempenho-da-selecao-dos-Emirados-Arabes-U20.png", clube: "Seleção EAU", clubeTag: "UAE" },
      { nome: "Otávio Hoffmann", bio: "Analista de Desempenho do Anápolis",                                                 foto: "https://eventos.futebolinterativo.com/wp-content/uploads/2026/01/Otavio-Hoffmann-Analista-de-Desempenho-do-Anapolis.png", clube: "Anápolis/GO", clubeTag: "ANA" },
    ],

    diferenciais: [
      "Você termina dentro de um clube.|Experiência prática garantida em um dos +130 clubes parceiros. Não é promessa: é parte da formação.",
      "Seus mentores estão no mercado agora.|Analistas que trabalham hoje em clubes da Série A e do futebol europeu, te ensinando o que usaram no último jogo.",
      "Metodologia validada por quem contrata.|Construída com profissionais de Atlético-MG, Santos e Bayer Leverkusen.",
      "Vagas reais, todos os dias.|Comunidade com oportunidades de mercado publicadas diariamente. Formação que não termina no certificado.",
    ],

    experienciaPratica: [
      "Analisar jogos de ponta a ponta: antes, durante e depois das partidas",
      "Gravar e recortar treinos e jogos com drones, câmeras e softwares profissionais",
      "Estudar adversários: padrões táticos, bolas paradas, atletas-chave",
      "Produzir estatísticas ao vivo e gerar relatórios para a comissão",
      "Apresentar análises para atletas e comissão técnica",
      "Montar um dossiê de atleta completo para transferência",
      "Trabalhar com acesso ao sistema de dados real do clube",
      "Receber mentoria individual com um analista sênior do clube",
    ],

    depoimentos: [
      { nome: "Rafael Mantovani", papel: "Contratado pelo Ituano após a Experiência Prática",           videoUrl: "https://www.youtube.com/watch?v=KEZ8JXbGvl4",  texto: "Depoimento sobre a jornada até a contratação no Ituano." },
      { nome: "Otávio Hoffmann",  papel: "Experiência Prática no Bahia · hoje Analista do Atlético/MG", videoUrl: "https://www.youtube.com/watch?v=OYYnYM1fhVg",   texto: "Da experiência prática no Bahia ao cargo de analista de desempenho." },
      { nome: "Ralff Frederico",  papel: "Experiência Prática no América/RJ",                           videoUrl: "https://www.youtube.com/watch?v=xlayC4Pn0RM",   texto: "Experiência prática no departamento de análise de desempenho do América/RJ." },
    ],

    stats: [
      { valor: "+4.500", label: "Alunos formados"  },
      { valor: "120+",   label: "Clubes parceiros" },
      { valor: "150h",   label: "De conteúdo"      },
      { valor: "15",     label: "Aulas ao vivo"    },
    ],

    preco:           "12x R$ 533,99",
    precoAvista:     "R$ 5.997,00",
    checkoutUrl:     "https://alunos.futebolinterativo.com/pay/4027-2-especializacao-analise-de-desempenho-e-mercado-turma-11",
    hubspotPortalId: "46152446",
    hubspotFormId:   "612e2e5f-7d2f-4535-8d74-10195b0df33e",
    garantiaTexto:   "Entre, assista às primeiras aulas e, se não for pra você, devolvemos 100% do valor em até 7 dias. Sem letra miúda.",
  },

  // ── demais cursos (somente campos básicos) ────────────────────────────
  { id: "curso-correspondente-internacional-no-futebol", slug: "curso-correspondente-internacional-no-futebol", title: "Curso de Correspondente Internacional no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-de-correspondente-internacional-no-futebol/", featured: true, capa: "/images/cursos/correspondente-internacional-no-futebol.webp" },
  { id: "curso-softwares-analise-desempenho-mercado", slug: "curso-softwares-analise-desempenho-mercado", title: "Curso Prático de Softwares de Análise de Desempenho e Mercado no Futebol", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-pratico-de-softwares-de-analise-de-desempenho-e-mercado-no-futebol/", featured: true, capa: "/images/cursos/softwares-de-analise.webp" },
  { id: "curso-patrocinio-licenciamento", slug: "curso-patrocinio-licenciamento", title: "Curso de Patrocínio e Licenciamento no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-de-patrocinio-e-licenciamento-no-futebol/", featured: true, capa: "/images/cursos/patrocinio-e-licenciamento-no-futebol.webp" },
  { id: "curso-inteligencia-artificial-no-futebol", slug: "curso-inteligencia-artificial-no-futebol", title: "Curso de Inteligência Artificial no Futebol", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-inteligencia-artificial/", featured: true, capa: "/images/cursos/inteligencia-artificial-no-futebol.webp" },
  { id: "curso-setorista-no-futebol", slug: "curso-setorista-no-futebol", title: "Curso de Setorista no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-setorista-no-futebol/", featured: true, capa: "/images/cursos/setorista-no-futebol.webp" },
  { id: "esp-ciencia-de-dados-no-futebol", slug: "esp-ciencia-de-dados-no-futebol", title: "Especialização em Ciência de Dados no Futebol", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-ciencia-de-dados/", featured: true, capa: "/images/cursos/ciencia-de-dados.webp", capaSemTexto: "/images/cursos/ciencia-de-dados-sem-texto.webp" },
  { id: "esp-nutricao-no-futebol", slug: "esp-nutricao-no-futebol", title: "Especialização em Nutrição no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-nutricao-no-futebol/", featured: true, capa: "/images/cursos/nutricao-no-futebol.webp", capaSemTexto: "/images/cursos/nutricao-no-futebol-sem-texto.webp" },
  { id: "esp-marketing-no-futebol", slug: "esp-marketing-no-futebol", title: "Especialização em Marketing no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/comunicacao-e-marketing/", featured: true, capa: "/images/cursos/marketing-no-futebol.webp", capaSemTexto: "/images/cursos/marketing-no-futebol-sem-texto.webp" },
  { id: "esp-fisioterapia-no-futebol", slug: "esp-fisioterapia-no-futebol", title: "Especialização em Fisioterapia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-fisioterapia-no-futebol/", featured: true, capa: "/images/cursos/fisioterapia-no-futebol.webp", capaSemTexto: "/images/cursos/fisioterapia-no-futebol-sem-texto.webp" },
  { id: "esp-direito-no-futebol", slug: "esp-direito-no-futebol", title: "Especialização em Direito no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-direito-no-futebol/", featured: true, capa: "/images/cursos/direito-no-futebol.webp", capaSemTexto: "/images/cursos/direito-no-futebol-sem-texto.webp" },
  { id: "esp-gestao-no-futebol", slug: "esp-gestao-no-futebol", title: "Especialização em Gestão no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-gestao-no-futebol/", featured: true, capa: "/images/cursos/gestao-executiva.webp", capaSemTexto: "/images/cursos/gestao-executiva-sem-texto.webp" },
  { id: "esp-preparacao-fisica-recovery", slug: "esp-preparacao-fisica-recovery", title: "Especialização em Preparação Física e Recovery", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/preparacao-fisica-e-recovery/", featured: true, capa: "/images/cursos/preparacao-fisica-e-recovery.webp", capaSemTexto: "/images/cursos/preparacao-fisica-e-recovery-sem-texto.webp" },
  { id: "esp-psicologia-no-futebol", slug: "esp-psicologia-no-futebol", title: "Especialização em Psicologia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-psicologia-no-futebol/", featured: true, capa: "/images/cursos/psicologia-no-futebol.webp", capaSemTexto: "/images/cursos/psicologia-no-futebol-sem-texto.webp" },
  { id: "curso-treinador-auxiliar", slug: "curso-treinador-auxiliar", title: "Curso Treinador Auxiliar", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinador-auxiliar/", featured: true, capa: "/images/cursos/treinador-auxiliar.webp" },
  { id: "esp-treinadores-na-pratica", slug: "esp-treinadores-na-pratica", title: "Especialização em Treinadores na Prática", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinadores-na-pratica/", featured: true, capa: "/images/cursos/treinadores-na-pratica.webp" },
  { id: "esp-jornalismo-no-futebol", slug: "esp-jornalismo-no-futebol", title: "Especialização em Jornalismo no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-jornalismo-no-futebol/", featured: true, capa: "/images/cursos/jornalismo-no-futebol.webp", capaSemTexto: "/images/cursos/jornalismo-no-futebol-sem-texto.webp" },
  { id: "esp-supervisor-de-futebol", slug: "esp-supervisor-de-futebol", title: "Especialização em Supervisor de Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-supervisor-de-futebol/", featured: true, capa: "/images/cursos/supervisor-no-futebol.webp" },
  { id: "curso-massagista-no-futebol", slug: "curso-massagista-no-futebol", title: "Curso Massagista no Futebol", type: "Curso", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-massagista-no-futebol/", featured: true, capa: "/images/cursos/massagista-no-futebol.webp" },
  { id: "curso-agente-fifa", slug: "curso-agente-fifa", title: "Preparatório Agente FIFA", type: "Curso", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-agente-fifa/", featured: true, capa: "/images/cursos/preparatorio-agente-fifa.webp" },
  { id: "curso-bolas-paradas", slug: "curso-bolas-paradas", title: "Curso Bolas Paradas", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-bolas-paradas/", featured: true, capa: "/images/cursos/bolas-paradas.webp" },
  { id: "curso-fotografia-no-futebol", slug: "curso-fotografia-no-futebol", title: "Curso Fotografia no Futebol", type: "Curso", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/fotografia-no-futebol/", featured: true, capa: "/images/cursos/fotografia-no-futebol.webp" },
  { id: "esp-comentarista-de-futebol", slug: "esp-comentarista-de-futebol", title: "Especialização em Comentarista de Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/comentarista-de-futebol/", featured: true, capa: "/images/cursos/narracao-no-futebol.webp" },
  { id: "esp-lpf-pro-comissao-tecnica-futsal", slug: "esp-lpf-pro-comissao-tecnica-futsal", title: "Especialização LPF PRO - Comissão Técnica no Futsal", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/lpf-pro-comissao-tecnica-de-futsal/", featured: true, capa: "/images/cursos/lfp-pro-comissao-tecnica-no-futsal.webp" },
  { id: "esp-narracao-no-futebol", slug: "esp-narracao-no-futebol", title: "Especialização em Narração no Futebol", type: "Especialização", area: "comunicacao-marketing", shortDescription: "", externalUrl: "https://futebolinterativo.com/cursos/narracao-no-futebol/index.html", featured: true, capa: "/images/cursos/narracao-no-futebol.webp" },
  { id: "esp-gestao-de-clubes-empresa", slug: "esp-gestao-de-clubes-empresa", title: "Especialização em Gestão de Clubes Empresa", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/gestao-clube-empresa/", featured: true, capa: "/images/cursos/gestao-executiva.webp", capaSemTexto: "/images/cursos/gestao-executiva-sem-texto.webp" },
  { id: "esp-financas-no-futebol", slug: "esp-financas-no-futebol", title: "Especialização em Finanças no Futebol", type: "Especialização", area: "gestao-e-operacao", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-financas-no-futebol/", featured: true, capa: "/images/cursos/financas-no-futebol.webp" },
  { id: "esp-medicina-no-futebol", slug: "esp-medicina-no-futebol", title: "Especialização em Medicina no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/especializacao-medicina-no-futebol/", featured: true, capa: "/images/cursos/medicina-no-futebol.webp" },
  { id: "curso-tatica-individual-e-coletiva", slug: "curso-tatica-individual-e-coletiva", title: "Tática Individual e Coletiva", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/tatica-individual-e-coletiva/", featured: true, capa: "/images/cursos/tatica-individual-e-coletiva.webp" },
  { id: "esp-big-data-analytics-mercado", slug: "esp-big-data-analytics-mercado", title: "Especialização em Big Data, Analytics e Mercado", type: "Especialização", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/big-data-analytics-e-mercado/", featured: true, capa: "/images/cursos/ciencia-de-dados.webp", capaSemTexto: "/images/cursos/ciencia-de-dados-sem-texto.webp" },
  { id: "curso-tatica-campo-estrutura-de-jogo", slug: "curso-tatica-campo-estrutura-de-jogo", title: "Curso Tática, Campo e Estrutura de Jogo", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/tatica-campo-e-estrutura-de-jogo/", featured: true, capa: "/images/cursos/tatica-campo-e-estrutura-de-jogo.webp" },
  { id: "esp-coordenacao-cientifica-no-futebol", slug: "esp-coordenacao-cientifica-no-futebol", title: "Especialização em Coordenação Científica no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/coordenacao-cientifica-no-futebol/", featured: true, capa: "/images/cursos/preparacao-fisica-e-recovery.webp", capaSemTexto: "/images/cursos/preparacao-fisica-e-recovery-sem-texto.webp" },
  { id: "curso-treinamento-de-goleiros-avancado", slug: "curso-treinamento-de-goleiros-avancado", title: "Curso Treinamento de Goleiros Avançado", type: "Curso", area: "tecnica-e-tatica", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/treinamento-de-goleiros-avancado/", featured: true, capa: "/images/cursos/treinamento-de-goleiros-avancado.webp" },
  { id: "esp-odontologia-no-futebol", slug: "esp-odontologia-no-futebol", title: "Especialização em Odontologia no Futebol", type: "Especialização", area: "saude", shortDescription: "", externalUrl: "https://eventos.futebolinterativo.com/curso-odontologia-no-futebol/", featured: true, capa: "/images/cursos/medicina-no-futebol.webp" },
];

export function getCursoBySlug(slug: string): Curso | undefined {
  return cursos.find((c) => c.id === slug);
}

export function getAllSlugs(): string[] {
  return cursos.map((c) => c.id);
}