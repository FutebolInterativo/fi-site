"use client";
import Link from "next/link";
import Image from "next/image";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const stats = [
  { num: "+25 mil", label: "Alunos formados" },
  { num: "+130",    label: "Clubes parceiros" },
  { num: "34",      label: "Formações" },
  { num: "100%",    label: "Prática garantida" },
];

export default function Hero() {
  return (
    <section style={{ background: "#03263F", position: "relative", overflow: "hidden" }}>

      {/* ── MOBILE: imagem no topo, texto embaixo ─────────────── */}
      <div className="md:hidden">
        {/* Imagem ocupa topo — sem sobreposição de texto */}
        <div style={{ position: "relative", width: "100%", paddingTop: 64 }}>
          <Image
            src="/images/site/mentores-corretos.-desktop.webp"
            alt="Mentores Futebol Interativo"
            width={800}
            height={600}
            priority
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "top center" }}
          />
          {/* Fade embaixo da imagem para fundir com o fundo */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #03263F, transparent)" }} />
        </div>

        {/* Conteúdo mobile — abaixo da imagem */}
        <div style={{ padding: "0 20px 60px", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontFamily: F, fontSize: "clamp(36px,10vw,52px)", lineHeight: 0.93, letterSpacing: "0.01em", color: "#F4F4F4", marginBottom: 16 }}>
            TRANSFORME SUA<br />PAIXÃO PELO FUTEBOL<br />EM <span style={{ color: "#0C98FC" }}>CARREIRA.</span>
          </h1>

          <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.75)", marginBottom: 24 }}>
            Escola de formação com cursos em todas as áreas do futebol. Aprenda online e conclui dentro de um dos nossos{" "}
            <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>+130 clubes parceiros</strong>.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <Link href="#areas" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none" }}>
              Explorar formações
              <span style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(3,38,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
            <Link href="/experiencia-pratica" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
              Como funciona
            </Link>
          </div>

          {/* Stats — 2×2 no mobile */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 0" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                paddingRight: i % 2 === 0 ? 16 : 0,
                paddingLeft:  i % 2 === 1 ? 16 : 0,
                borderRight:  i % 2 === 0 ? "1px solid rgba(169,216,245,0.2)" : "none",
                borderTop:    i >= 2      ? "1px solid rgba(169,216,245,0.2)" : "none",
                paddingTop:   i >= 2      ? 16 : 0,
              }}>
                <div style={{ fontFamily: F, fontSize: "clamp(22px,6vw,28px)", lineHeight: 1, color: "#F4F4F4" }}>{s.num}</div>
                <div style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: layout original com imagem à direita ─────── */}
      <div className="hidden md:block" style={{ minHeight: "100vh", position: "relative" }}>
        {/* Imagem desktop */}
        <div className="absolute top-0 right-0 bottom-0 pointer-events-none" style={{ width: "55%", zIndex: 1 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/images/site/mentores-corretos.-desktop.webp')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "bottom right" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#03263F 0%,#03263F 15%,rgba(3,38,63,0.7) 35%,rgba(3,38,63,0.1) 60%,transparent 75%)" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 100, background: "linear-gradient(to top,#03263F,transparent)" }} />
        </div>

        {/* Conteúdo desktop */}
        <div className="relative w-full max-w-6xl mx-auto px-6 flex items-center" style={{ zIndex: 10, minHeight: "100vh" }}>
          <div style={{ width: "48%", paddingTop: 140, paddingBottom: 80 }}>
            <h1 style={{ fontFamily: F, fontSize: "clamp(38px,4.4vw,68px)", lineHeight: 0.93, letterSpacing: "0.01em", color: "#F4F4F4", marginBottom: 20 }}>
              TRANSFORME SUA<br />PAIXÃO PELO FUTEBOL<br />EM <span style={{ color: "#0C98FC" }}>CARREIRA.</span>
            </h1>

            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.75)", marginBottom: 28, maxWidth: 440 }}>
              Escola de formação com cursos em todas as áreas do futebol. Você aprende online e conclui dentro de um dos nossos{" "}
              <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>+130 clubes parceiros</strong>{" "}espalhados pelo Brasil.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
              <Link href="#areas" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none" }}>
                Explorar formações
                <span style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(3,38,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
              <Link href="/experiencia-pratica" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.65)", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
                Como funciona
              </Link>
            </div>

            {/* Stats — 4 colunas no desktop */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ paddingRight: 12, borderRight: i < 3 ? "1px solid rgba(169,216,245,0.2)" : "none", paddingLeft: i > 0 ? 12 : 0 }}>
                  <div style={{ fontFamily: F, fontSize: "clamp(16px,1.8vw,24px)", lineHeight: 1, color: "#F4F4F4" }}>{s.num}</div>
                  <div style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}