"use client";
import Link from "next/link";
import Image from "next/image";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Alterações aplicadas (doc "Alterações site"):
  - Texto de apoio trocado
  - Stats reordenados: prática garantida primeiro; "+4.500" trocado de
    "alunos formados" pra "em clubes parceiros" (consistente com o resto do site)
  - Fonte do label "Clubes parceiros" aumentada
  - Botão "Como funciona" removido (mobile + desktop)
  - "Explorar formações" → "Conhecer formações"
*/
const stats = [
  { num: "100%",   label: "Prática garantida" },
  { num: "+130",   label: "Clubes parceiros", big: true },
  { num: "+4.500", label: "Alunos em clubes parceiros" },
  { num: "34",     label: "Formações" },
];

export default function Hero() {
  return (
    <section style={{ background: "#03263F", position: "relative", overflow: "hidden" }}>

      {/* ── MOBILE ───────────────────────────────────────────── */}
      <div className="md:hidden">
        <div style={{ position: "relative", width: "100%", paddingTop: 64 }}>
          <Image
            src="/images/site/mentores-corretos.-desktop.webp"
            alt="Mentores Futebol Interativo"
            width={800}
            height={600}
            priority
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "top center" }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #03263F, transparent)" }} />
        </div>

        <div style={{ padding: "0 20px 60px", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontFamily: F, fontSize: "clamp(36px,10vw,52px)", lineHeight: 1.02, letterSpacing: "0.01em", color: "#F4F4F4", marginBottom: 16 }}>
            TRANSFORME SUA<br />PAIXÃO PELO FUTEBOL<br />EM <span style={{ color: "#0C98FC" }}>CARREIRA.</span>
          </h1>

          <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.75)", marginBottom: 24 }}>
            Você aprende com quem trabalha no futebol hoje e termina a formação dentro de um clube de verdade.{" "}
            <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>É assim que se entra no mercado.</strong>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none" }}>
              Conhecer formações
              <span style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(3,38,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 0" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center" as const,
                paddingRight: i % 2 === 0 ? 16 : 0,
                paddingLeft:  i % 2 === 1 ? 16 : 0,
                borderRight:  i % 2 === 0 ? "1px solid rgba(169,216,245,0.2)" : "none",
                borderTop:    i >= 2      ? "1px solid rgba(169,216,245,0.2)" : "none",
                paddingTop:   i >= 2      ? 16 : 0,
              }}>
                <div style={{ fontFamily: F, fontSize: "clamp(22px,6vw,28px)", lineHeight: 1, color: "#F4F4F4" }}>{s.num}</div>
                <div style={{ fontFamily: M, fontSize: s.big ? 12 : 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────────── */}
      <div className="hidden md:flex" style={{ position: "relative", minHeight: "100vh", flexDirection: "column" as const }}>
        <div style={{
          position: "absolute", top: "10%", right: "2%", width: "48%", height: "85%",
          background: "radial-gradient(ellipse 60% 55% at 60% 45%, rgba(12,152,252,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Bloco texto + imagem — posição fixa perto do topo (não centraliza verticalmente) ── */}
        <div
          style={{
            width: "100%",
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(106px,12vh,142px) clamp(32px,5vw,72px) 0",
            display: "grid",
            gridTemplateColumns: "minmax(380px, 540px) minmax(320px, 560px)",
            gap: "clamp(24px,4vw,56px)",
            alignItems: "start",
            justifyContent: "space-between",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* ── Coluna de texto ──────────────────────────────────── */}
          <div>
            <h1 style={{ fontFamily: F, fontSize: "clamp(32px,3.6vw,58px)", lineHeight: 1.04, letterSpacing: "0.01em", color: "#F4F4F4", marginBottom: 18 }}>
              TRANSFORME SUA<br />PAIXÃO PELO FUTEBOL<br />EM <span style={{ color: "#0C98FC" }}>CARREIRA.</span>
            </h1>

            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.6, color: "rgba(244,244,244,0.75)", marginBottom: 26, maxWidth: 460 }}>
              Você aprende com quem trabalha no futebol hoje e termina a formação dentro de um clube de verdade.{" "}
              <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>É assim que se entra no mercado.</strong>
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none" }}>
                Conhecer formações
                <span style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(3,38,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            </div>
          </div>

          {/* ── Coluna de imagem — fade orgânico na base, sem linha reta ── */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3.3", alignSelf: "end" }}>
            <Image
              src="/images/site/mentores-corretos.-desktop.webp"
              alt="Mentores Futebol Interativo"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
            />
            {/* Fade orgânico que dissolve a base da imagem no fundo da seção — sem corte reto */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "22%",
              background: "linear-gradient(to top, #03263F 0%, rgba(3,38,63,0.7) 35%, transparent 100%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* ── Espaçador flexível — absorve o espaço sobrando e empurra os stats pra base da tela ── */}
        <div style={{ flex: 1, minHeight: 4 }} />

        {/* ── Stats — grid de 4 colunas iguais, texto centralizado em cada uma ── */}
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 clamp(32px,5vw,72px) clamp(8px,1.2vh,14px)", flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px 24px", borderTop: "1px solid rgba(169,216,245,0.2)", paddingTop: 8 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" as const }}>
                <div style={{ fontFamily: F, fontSize: "clamp(18px,2.2vw,28px)", lineHeight: 1, color: "#F4F4F4" }}>{s.num}</div>
                <div style={{ fontFamily: M, fontSize: s.big ? 11 : 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}