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
    <section className="relative overflow-hidden" style={{ background: "#03263F", minHeight: "100vh" }}>

      {/* Imagem desktop */}
      <div className="absolute top-0 right-0 bottom-0 hidden md:block pointer-events-none" style={{ width: "55%", zIndex: 1 }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://tonojogo.futebolinterativo.com/futebolinterativo/mentores-corretos.-desktop.webp')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "bottom right" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#03263F 0%,#03263F 15%,rgba(3,38,63,0.7) 35%,rgba(3,38,63,0.1) 60%,transparent 75%)" }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: 100, background: "linear-gradient(to top,#03263F,transparent)" }} />
      </div>

      {/* Imagem mobile */}
      <div className="md:hidden w-full" style={{ paddingTop: 64 }}>
        <div className="relative overflow-hidden" style={{ height: "64vw", minHeight: 220, maxHeight: 380 }}>
          <Image src="https://tonojogo.futebolinterativo.com/futebolinterativo/mentores-corretos.-desktop.webp" alt="Mentores" fill className="object-cover object-top" priority />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "55%", background: "linear-gradient(to top,#03263F 25%,transparent)" }} />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative w-full max-w-6xl mx-auto px-6 flex items-center" style={{ zIndex: 10, minHeight: "100vh" }}>
        <div className="w-full md:w-[48%]" style={{ paddingTop: 140, paddingBottom: 80 }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border: "1px solid rgba(12,152,252,0.3)", background: "rgba(12,152,252,0.08)", marginBottom: 24 }}>
            <span className="flex-shrink-0" style={{ width: 8, height: 8, borderRadius: "50%", background: "#0C98FC" }} />
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, color: "#A9D8F5", letterSpacing: "0.12em" }}>
              MATRÍCULAS ABERTAS — TURMAS 2026
            </span>
          </div>

          {/* Título */}
          <h1 style={{ fontFamily: F, fontSize: "clamp(38px,4.4vw,68px)", lineHeight: 0.93, letterSpacing: "0.01em", color: "#F4F4F4", marginBottom: 20 }}>
            TRANSFORME SUA<br />
            PAIXÃO PELO FUTEBOL<br />
            EM <span style={{ color: "#0C98FC" }}>CARREIRA.</span>
          </h1>

          {/* Sub */}
          <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.75)", marginBottom: 28, maxWidth: 440 }}>
            Escola de formação com cursos em todas as áreas do futebol.
            Você aprende online e conclui dentro de um dos nossos{" "}
            <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>+130 clubes parceiros</strong>{" "}
            espalhados pelo Brasil.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
            <Link href="#areas" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none" }}>
              Explorar formações
              <span style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(3,38,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
            <a href="https://eventos.futebolinterativo.com/experiencia-pratica/" target="_blank" rel="noreferrer" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.65)", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
              Como funciona
            </a>
          </div>

          {/* Stats — grid fixo 4 colunas, sem overflow */}
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
    </section>
  );
}
