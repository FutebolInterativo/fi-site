"use client";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const AZUL = "#0C98FC";

/* ── Dados extraídos da LP oficial do PPI ────────────────────────────
   fonte: tonojogo.futebolinterativo.com/aniversario-fi-oportunidade-internacional
   Imagens: coloque os dois arquivos em public/images/ppi/
   Cores reaproveitadas do sistema de áreas já usado em cursos.ts/CursoDetalhe,
   só pra diferenciar os dois programas visualmente. */
const PROGRAMAS = [
  {
    pais: "Portugal",
    clube: "SC Braga",
    titulo: "A casa dos grandes",
    duracao: "21 dias",
    desc: "Imersão profissional dentro do SC Braga: rotina real de um clube europeu de elite, do treino ao dia de jogo.",
    img: "/images/ppi/braga-bastidores.jpg",
    pos: "center 30%",
    url: "https://praticainternacionalbraga.futebolinterativo.com",
    cor: "#4096F2",
  },
  {
    pais: "Espanha",
    clube: "Girona FC",
    titulo: "O modelo vencedor da Europa",
    duracao: "10 dias",
    desc: "Nova imersão em um dos clubes mais admirados do futebol espanhol atual.",
    img: "/images/ppi/girona-torcida.webp",
    pos: "center 35%",
    url: "https://legironafc.futebolinterativo.com",
    cor: "#818CF8",
  },
];

function Bandeira({ pais }: { pais: string }) {
  if (pais === "Portugal") {
    return (
      <svg width={18} height={13} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
        <rect width="20" height="14" fill="#C8102E" />
        <rect width="7.5" height="14" fill="#046A38" />
        <circle cx="7.5" cy="7" r="2.6" fill="#F4C300" stroke="#C8102E" strokeWidth="0.6" />
      </svg>
    );
  }
  return (
    <svg width={18} height={13} viewBox="0 0 20 14" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </svg>
  );
}

function CardPrograma({ p }: { p: typeof PROGRAMAS[number] }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block", borderRadius: 18, overflow: "hidden",
        border: `1px solid ${p.cor}30`,
        background: `linear-gradient(155deg,#0A1E35,${p.cor}1C)`,
        textDecoration: "none", transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 24px 48px -16px ${p.cor}55`;
        el.style.borderColor = `${p.cor}60`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = `${p.cor}30`;
      }}
    >
      {/* imagem — limpa, sem texto sobreposto, só o badge de duração */}
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={`${p.clube} — ${p.titulo}`} loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 -40px 40px -20px rgba(1,14,27,0.55)" }} />

        <div style={{
          position: "absolute", top: 12, right: 12,
          padding: "5px 12px", borderRadius: 99,
          background: "rgba(1,14,27,0.85)", border: `1px solid ${p.cor}70`,
        }}>
          <span style={{ fontFamily: F, fontSize: 13, color: "#F4F4F4", lineHeight: 1 }}>{p.duracao}</span>
        </div>
      </div>

      {/* legenda — barra de destaque → título → linha de país/clube, igual ao VideoCard */}
      <div style={{ padding: "20px 22px 24px" }}>
        <div style={{ width: 30, height: 3, borderRadius: 2, background: p.cor, marginBottom: 14 }} />

        <h3 style={{ fontFamily: F, fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.1, color: "#F4F4F4", marginBottom: 9 }}>
          {p.titulo}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Bandeira pais={p.pais} />
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: p.cor }}>
            {p.pais} · {p.clube}
          </span>
        </div>

        <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.5)", lineHeight: 1.6, marginBottom: 18 }}>
          {p.desc}
        </p>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: M, fontWeight: 700, fontSize: 13, color: "#F4F4F4" }}>
          Conhecer o programa
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#F4F4F4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function PraticaInternacional() {
  return (
    <section style={{ background: "#010E1B", padding: "clamp(72px,10vh,108px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 12% 10%,rgba(12,152,252,0.09),transparent 60%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative" }}>

        {/* header */}
        <div style={{ maxWidth: 620, marginBottom: 28 }}>
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 14 }}>
            Programa de Prática Internacional
          </span>
          <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5vw,52px)", lineHeight: 0.98, color: "#F4F4F4", marginBottom: 18 }}>
            SUA EXPERIÊNCIA PRÁTICA<br />DENTRO DE UM CLUBE EUROPEU
          </h2>
          <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.5)", lineHeight: 1.75 }}>
            A melhor oportunidade de conectar o profissional brasileiro ao futebol europeu: um intercâmbio cultural com
            imersão intensiva dentro de um clube português ou espanhol.
          </p>
        </div>

        {/* selo compacto */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "7px 8px 7px 16px", borderRadius: 99, marginBottom: 44,
          border: "1px solid rgba(169,216,245,0.18)", background: "rgba(255,255,255,0.03)",
        }}>
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(169,216,245,0.6)" }}>BRASIL</span>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: `${AZUL}1E`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(45deg)" }}>
              <path d="M21 3L3 10.5l7.5 3L14 21l7-18Z" fill={AZUL} />
            </svg>
          </span>
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(169,216,245,0.6)" }}>EUROPA</span>
        </div>

        {/* cards dos dois programas */}
        <div className="grid md:grid-cols-2 gap-5">
          {PROGRAMAS.map((p) => (
            <CardPrograma key={p.clube} p={p} />
          ))}
        </div>

      </div>
    </section>
  );
}