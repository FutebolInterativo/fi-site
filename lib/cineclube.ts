// lib/cineclube.ts
//
// Dados de cada sessão do Cine Clube Futebol Interativo (/cineclube/[slug]).
// Pensado pra ser clonado rápido toda semana: cada sessão nova é só um
// objeto novo aqui, trocando data/tema/formato/local — sem tocar em código.

export type CineClubeConvidado = {
  nome: string;
  cargo: string;
  /** Se ausente, mostra um avatar com a inicial do nome em vez de foto. */
  foto?: string;
};

export type CineClubeSessao = {
  slug: string; // ex: "sessao01" -> /cineclube/sessao01

  /** Ex: "01", "02" — usado só como rótulo (SESSÃO 01) */
  numero: string;

  /** "Presencial" ou "Online" — muda o que aparece no bloco de local */
  formato: "Presencial" | "Online";

  /** Como a sessão funciona nessa edição, ex: "Exibição + roda de conversa"
   *  ou "Live com convidado" */
  tipoSessao: string;

  /** Tema da sessão — pode usar **trecho** pra virar destaque em azul */
  tema: string;
  descricaoCurta: string;

  /** Texto de exibição, ex: "24 de julho de 2026, 17h" */
  dataHoraLabel: string;
  /** ISO com timezone — usado pra contagem regressiva e pro slug de fi_campanha */
  dataHoraISO: string;

  /** Endereço completo — só usado quando formato === "Presencial" */
  local?: string;
  /** Capacidade do espaço — exibido como informação fixa, nunca como
   *  contador ao vivo de vagas restantes (não temos como saber isso) */
  vagas?: number;

  /** Só preenchido em edições "live com convidado" */
  convidado?: CineClubeConvidado;

  whatsappGroupUrl?: string;
};

// ─── geração do valor de fi_campanha ──────────────────────────────────────
// Mesmo padrão usado em lib/eventos.ts (getFiCampanha), só que com o
// prefixo "cineclube-" em vez de "evento-" — assim dá pra distinguir as duas
// séries nos relatórios do HubSpot sem misturar uma com a outra.

function slugify(text: string): string {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[/.]/g, "-")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function ensureEventoSlug(s: string): string {
  if (!s) return s;
  if (s === "evento" || s.startsWith("evento-")) return s;
  return `evento-${s}`;
}

function dataCurtaDoISO(iso: string): string {
  const [yyyy, mm, dd] = iso.slice(0, 10).split("-");
  return `${dd}-${mm}-${yyyy.slice(-2)}`;
}

/** Ex: "evento-cineclube-sessao01-24-07-26" — prefixo "evento-" de propósito,
 *  igual ao de lib/eventos.ts, pra cair na mesma regra de roteamento do
 *  HubSpot (fi_campanha começa com "evento-"). "cineclube-sessaoNN" continua
 *  dentro do valor, então os relatórios ainda distinguem uma sessão da outra. */
export function getFiCampanha(sessao: CineClubeSessao): string {
  const base = slugify(`cineclube sessao${sessao.numero} ${dataCurtaDoISO(sessao.dataHoraISO)}`);
  return ensureEventoSlug(base);
}

/** Link do Google Maps a partir do endereço completo */
export function getMapsUrl(endereco: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}

/** URL de embed (iframe) do Google Maps a partir do endereço completo —
 *  não precisa de chave de API, funciona com uma busca simples por texto */
export function getMapsEmbedUrl(endereco: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&z=16&output=embed`;
}

export const sessoes: CineClubeSessao[] = [
  {
    slug: "sessao01",
    numero: "01",
    formato: "Presencial",
    tipoSessao: "Exibição + roda de conversa",

    tema: "Como a política e o dinheiro **afundaram a Seleção Brasileira**",
    descricaoCurta:
      "Exibição de um levantamento sobre a crise institucional da CBF: indicação política, dinheiro público e proteção jurídica. Depois, roda de conversa aberta com todo mundo que estiver na sala.",

    dataHoraLabel: "24 de julho de 2026, 17h",
    dataHoraISO: "2026-07-24T17:00:00-03:00",

    local: "Edifício São Miguel, Avenida Paulista 967, 12º andar, Bela Vista, São Paulo, SP, 01311100",
    vagas: 70,
    whatsappGroupUrl: "https://chat.whatsapp.com/Ck8GuFn8O08Bn4BTgn2SsW?s=cl&p=a&ilr=4",
  },
];

export function getSessaoBySlug(slug: string): CineClubeSessao | undefined {
  return sessoes.find((s) => s.slug === slug);
}

export function getAllSessaoSlugs(): string[] {
  return sessoes.map((s) => s.slug);
}