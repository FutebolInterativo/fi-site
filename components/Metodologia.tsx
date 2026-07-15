"use client";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const AZUL = "#0C98FC";
const AZUL_CLARO = "#A9D8F5";
const NAVY = "#03263F";
const MARCADOR_BG = "#0A3757"; // opaco — evita que a trilha "vaze" através do card, como antes

const passos = [
  {
    num: "01",
    titulo: "APRENDA COM QUEM ESTÁ NO MERCADO",
    desc: "Aulas ao vivo com profissionais que trabalham hoje em clubes e instituições do futebol. Você aprende o que o mercado exige — direto de quem contrata e entrega.",
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5V6a2 2 0 012-2h13a1 1 0 011 1v13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 22a2 2 0 01-2-2v-.5a1 1 0 011-1h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7.5h7M9 11h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    titulo: "VIVA O DIA A DIA DE UM CLUBE",
    desc: "Prática garantida em um dos +130 clubes parceiros. Não é estágio simbólico: é você dentro da operação, resolvendo problemas reais e construindo relacionamento com quem já está lá dentro.",
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <path d="M4 21V9.5L12 3l8 6.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 21v-6a2.5 2.5 0 015 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    titulo: "ENTRE NO MERCADO COM HISTÓRIA PRA CONTAR",
    desc: "Você sai com repertório técnico, vivência de clube no currículo e uma rede de contatos que abre portas. Preparado não só para a primeira oportunidade, mas para crescer nela.",
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* fade-in ao entrar na viewport, consistente com o resto do site */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Object.assign(el.style, {
      opacity: "0",
      transform: "translateY(20px)",
      transition: `opacity .65s ${delay}ms cubic-bezier(.22,.61,.36,1), transform .65s ${delay}ms cubic-bezier(.22,.61,.36,1)`,
    });
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

/* marcador da trilha — círculo opaco (evita transparência atravessando a linha) */
function Marcador({ destaque, icon }: { destaque: boolean; icon: React.ReactNode }) {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
        background: destaque ? AZUL : MARCADOR_BG,
        border: destaque ? `1.5px solid ${AZUL}` : "1.5px solid rgba(169,216,245,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: destaque ? "#03263F" : AZUL_CLARO,
        position: "relative", zIndex: 2,
        boxShadow: destaque ? "0 0 0 6px rgba(12,152,252,0.14)" : "none",
      }}
    >
      {icon}
    </div>
  );
}

/* card de conteúdo — mesmo gradiente/borda usado em Depoimentos.tsx, para harmonizar com o resto do site */
function CardPasso({ destaque, titulo, desc }: { destaque: boolean; titulo: string; desc: string }) {
  return (
    <div
      className="fi-metodologia-card"
      style={{
        padding: "20px 22px",
        borderRadius: 16,
        height: "100%",
        border: destaque ? `1px solid rgba(12,152,252,0.35)` : "1px solid rgba(140,200,245,0.14)",
        background: destaque
          ? "linear-gradient(145deg, rgba(12,152,252,0.16), rgba(3,38,63,0.4))"
          : "linear-gradient(145deg, rgba(12,90,150,0.25), rgba(3,38,63,0.4))",
        transition: "transform .22s ease, border-color .22s ease, box-shadow .22s ease",
      }}
    >
      <div style={{ fontFamily: F, fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.1, color: "#F4F4F4", marginBottom: 10 }}>
        {titulo}
      </div>
      <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.6)", lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

export default function Metodologia() {
  return (
    <section style={{ background: NAVY, padding: "clamp(72px,10vh,108px) 0", position: "relative", overflow: "hidden" }}>
      {/* glow ambiente sutil, mesmo padrão usado no Hero */}
      <div
        style={{
          position: "absolute", top: "-10%", right: "-6%", width: "50%", height: "70%",
          background: "radial-gradient(ellipse 60% 55% at 60% 40%, rgba(12,152,252,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative" }}>
        <FadeIn>
          <div style={{ marginBottom: 56, maxWidth: 620 }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: AZUL_CLARO, display: "block", marginBottom: 12 }}>
              Metodologia
            </span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5vw,56px)", lineHeight: 0.98, color: "#F4F4F4", marginBottom: 18 }}>
              APRENDA. APLIQUE.<br />ENTRE EM CAMPO.
            </h2>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.65 }}>
              Uma metodologia desenhada para encurtar a distância entre você e o mercado do futebol.
            </p>
          </div>
        </FadeIn>

        {/* ── TRILHA DESKTOP — linha tracejada conectando os 3 marcadores ── */}
        <div className="hidden md:block" style={{ position: "relative", marginBottom: 20 }}>
          <div
            style={{
              position: "absolute", top: 26, left: "16.5%", right: "16.5%", height: 2,
              backgroundImage: `repeating-linear-gradient(90deg, ${AZUL_CLARO}55 0 7px, transparent 7px 15px)`,
              zIndex: 1,
            }}
          />
          <div className="grid grid-cols-3">
            {passos.map((p, i) => (
              <div key={p.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <Marcador destaque={i === passos.length - 1} icon={p.icon} />
                <span style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)" }}>
                  Passo {p.num}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CARDS DESKTOP ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          {passos.map((p, i) => (
            <FadeIn key={p.num} delay={i * 110}>
              <CardPasso destaque={i === passos.length - 1} titulo={p.titulo} desc={p.desc} />
            </FadeIn>
          ))}
        </div>

        {/* ── MOBILE — trilha vertical: linha contínua + marcador e card lado a lado ── */}
        <div className="md:hidden" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute", left: 25, top: 26, bottom: 26, width: 2,
              backgroundImage: `repeating-linear-gradient(180deg, ${AZUL_CLARO}55 0 7px, transparent 7px 15px)`,
              zIndex: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {passos.map((p, i) => {
              const destaque = i === passos.length - 1;
              return (
                <FadeIn key={p.num} delay={i * 90}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <Marcador destaque={destaque} icon={p.icon} />
                    <div style={{ flex: 1, paddingTop: 2 }}>
                      <span style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", display: "block", marginBottom: 8 }}>
                        Passo {p.num}
                      </span>
                      <CardPasso destaque={destaque} titulo={p.titulo} desc={p.desc} />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .fi-metodologia-card:hover {
            transform: translateY(-4px);
            border-color: ${AZUL}70 !important;
            box-shadow: 0 20px 48px -16px rgba(12,152,252,0.28);
          }
        `,
      }} />
    </section>
  );
}