// lib/eventos.ts
//
// Dados de todas as páginas de evento (/evento/[slug]). Pensado pra servir
// vários eventos diferentes (aulas ao vivo, workshops, webinars) sem tocar
// no componente visual — só adiciona um novo objeto aqui.
//
// Dica de conteúdo: no `title`, envolva o trecho que deve aparecer em azul
// de destaque com **dois asteriscos**, ex: "Como se constrói **carreira e
// negócio** no futebol". O resto do título sai em branco.

export type EventoPalestrante = {
  nome: string;
  cargo: string;
  /** Se ausente, mostra um avatar com a inicial do nome em vez de foto. */
  foto?: string;
};

export type Evento = {
  slug: string;

  /** Ex: "Aula ao vivo", "Workshop", "Webinar" */
  tipo: string;
  gratuito: boolean;
  /** Só usado quando gratuito=false */
  preco?: string;

  /** Texto de exibição, ex: "28 de julho, 19h" */
  dataHoraLabel: string;
  /** ISO com timezone — usado pra contagem regressiva E pra gerar a data
   *  dentro do valor de fi_campanha (formato dd-mm-aa) */
  dataHoraISO: string;

  /** Pode usar **trecho** pra virar destaque em azul */
  title: string;
  subheadline: string;

  /**
   * Nome curto e "limpo" do evento, sem formatação de destaque — usado só
   * pra gerar o valor de `fi_campanha` enviado ao HubSpot (não aparece na
   * página). Se ausente, usa o `title` sem os marcadores de destaque.
   * Ex: "Supervisão no Futebol"
   */
  nomeEvento?: string;

  /** 3 costuma ser o ideal — nem lista curta demais, nem cansativa */
  bullets: string[];

  palestrantes: EventoPalestrante[];

  ctaText?: string;
  /** Texto pequeno abaixo do botão do formulário */
  microcopy?: string;

  whatsappGroupUrl?: string;
};

// ─── geração do valor de fi_campanha ──────────────────────────────────────
//
// Mesma lógica do gerador de UTM interno (lib/utm.ts naquele projeto):
// slugify() normaliza texto e data, ensureEventCampaignSlug() garante o
// prefixo "evento-" sem duplicar. Gerado automaticamente a partir de
// nomeEvento + dataHoraISO — nunca digitado à mão — pra garantir que o
// MESMO evento sempre produza o MESMO valor de fi_campanha, com ou sem UTM
// de campanha na URL.

function slugify(text: string): string {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[/.]/g, "-")                             // "/" e "." -> "-"
    .replace(/[^a-zA-Z0-9\s-]/g, "")                    // só letra/número/espaço/hífen
    .trim()
    .replace(/\s+/g, "-")                               // espaço -> hífen
    .replace(/-+/g, "-")                                // colapsa hífens repetidos
    .toLowerCase();
}

function ensureEventCampaignSlug(campaignSlug: string): string {
  if (!campaignSlug) return campaignSlug;
  if (campaignSlug === "evento" || campaignSlug.startsWith("evento-")) return campaignSlug;
  return `evento-${campaignSlug}`;
}

/** "2026-07-29T19:00:00-03:00" -> "29-07-26" (dd-mm-aa, direto da string,
 *  sem passar por Date/timezone do navegador de quem está preenchendo) */
function dataCurtaDoISO(iso: string): string {
  const [yyyy, mm, dd] = iso.slice(0, 10).split("-");
  return `${dd}-${mm}-${yyyy.slice(-2)}`;
}

/** Valor final enviado como `fi_campanha` — ex: "evento-supervisao-no-futebol-29-07-26" */
export function getFiCampanha(evento: Evento): string {
  const nome = evento.nomeEvento ?? evento.title.replace(/\*\*/g, "");
  const base = slugify(`${nome} ${dataCurtaDoISO(evento.dataHoraISO)}`);
  return ensureEventCampaignSlug(base);
}

export const eventos: Evento[] = [
  {
    slug: "supervisao-no-futebol",
    tipo: "Aula ao vivo",
    gratuito: true,
    dataHoraLabel: "29 de julho, 19h às 21h",
    dataHoraISO: "2026-07-29T19:00:00-03:00",

    title: "Supervisão no futebol: a ponte entre **comissão técnica, diretoria e atletas**",
    nomeEvento: "Supervisão no Futebol",
    subheadline:
      "O que faz, na prática, quem ocupa essa posição dentro de um clube profissional. Entenda também os caminhos reais pra se especializar em gestão esportiva.",

    // Rascunho baseado no tema do evento — o flyer não trouxe os tópicos
    // específicos da aula, então ajuste esses 3 pontos antes de publicar.
    bullets: [
      "O que faz, na prática, o supervisor de futebol dentro de um clube profissional",
      "Como a supervisão conecta comissão técnica, diretoria e atletas no dia a dia",
      "Os caminhos reais pra crescer e se especializar em gestão esportiva",
    ],

    palestrantes: [
      {
        nome: "Homero Neto",
        cargo: "Supervisor de Futebol do Ceará SC",
        foto: "/images/eventos/homero-neto.webp",
      },
    ],

    microcopy: "Evento 100% online e gratuito · Vagas limitadas",
    whatsappGroupUrl: "https://chat.whatsapp.com/L1y7usYxkbcB9lIuqfbCmY",
  },
  {
    slug: "dentro-da-laliga",
    tipo: "Aula ao vivo",
    gratuito: true,
    dataHoraLabel: "28 de julho, 19h",
    dataHoraISO: "2026-07-28T19:00:00-03:00",

    title: "Dentro da LaLiga: como se constrói **carreira e negócio** no futebol internacional",
    nomeEvento: "Dentro da LaLiga",
    subheadline:
      "Os bastidores de quem levou o futebol espanhol pro mundo, e os caminhos reais pra você trabalhar nele.",

    bullets: [
      "Como a LaLiga opera fora da Espanha, e onde profissionais brasileiros entram nessa estrutura",
      "Os caminhos pra trabalhar com futebol internacional sem depender de indicação",
      "O que ligas e clubes procuram em estratégia e negócios, e como se preparar",
    ],

    palestrantes: [
      {
        nome: "Daniel Alonso Duarte",
        cargo: "Ex-Head de Estratégia · LaLiga Brasil e Portugal",
        foto: "/images/eventos/daniel-alonso-duarte.jpg",
      },
      {
        nome: "Leonardo Ferreira",
        cargo: "Strategy Manager · 365scores · Ex-LaLiga Brasil",
        foto: "/images/eventos/leonardo-ferreira.jpg",
      },
    ],

    ctaText: "Garantir minha vaga gratuita",
    microcopy: "Acesso, materiais e lembrete pelo grupo VIP do WhatsApp · Certificado incluso",
  },
];

export function getEventoBySlug(slug: string): Evento | undefined {
  return eventos.find((e) => e.slug === slug);
}

export function getAllEventoSlugs(): string[] {
  return eventos.map((e) => e.slug);
}