"use client";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const AZUL = "#0C98FC";
const AZUL_CLARO = "#A9D8F5";
const NAVY = "#03263F";

const passos = [
  {
    num: "01",
    titulo: "APRENDA COM QUEM ESTÁ NO MERCADO",
    desc: "Aulas ao vivo com profissionais que trabalham hoje em clubes e instituições do futebol. Você aprende o que o mercado exige — direto de quem contrata e entrega.",
  },
  {
    num: "02",
    titulo: "VIVA O DIA A DIA DE UM CLUBE",
    desc: "Prática garantida em um dos +130 clubes parceiros. Não é estágio simbólico: é você dentro da operação, resolvendo problemas reais e construindo relacionamento com quem já está lá dentro.",
  },
  {
    num: "03",
    titulo: "ENTRE NO MERCADO COM HISTÓRIA PRA CONTAR",
    desc: "Você sai com repertório técnico, vivência de clube no currículo e uma rede de contatos que abre portas. Preparado não só para a primeira oportunidade, mas para crescer nela.",
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

export default function Metodologia() {
  return (
    <section style={{ background: NAVY, padding: "clamp(56px,8vh,84px) 0", position: "relative", overflow: "hidden" }}>
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
          <div style={{ marginBottom: "clamp(20px,3.5vh,32px)", maxWidth: 620 }}>
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

        {/* ── Cards em 3 colunas — número fantasma embutido, sem trilha/círculos externos ── */}
        <div className="grid md:grid-cols-3 gap-3">
          {passos.map((p, i) => {
            return (
              <FadeIn key={p.num} delay={i * 110}>
                <div
                  className="fi-passo-card"
                  style={{
                    position: "relative",
                    height: "100%",
                    padding: "22px 22px 24px",
                    borderRadius: 18,
                    border: `1px solid rgba(12,152,252,0.35)`,
                    background: "linear-gradient(145deg, rgba(12,152,252,0.14), rgba(3,38,63,0.4))",
                    transition: "transform .22s ease, border-color .22s ease, box-shadow .22s ease",
                  }}
                >
                  <span
                    className="fi-passo-num"
                    style={{
                      display: "block",
                      fontFamily: F,
                      fontSize: 34,
                      lineHeight: 1,
                      color: AZUL,
                      marginBottom: 12,
                      transition: "transform .22s ease",
                    }}
                  >
                    {p.num}
                  </span>
                  <div style={{ fontFamily: F, fontSize: "clamp(16px,1.9vw,19px)", lineHeight: 1.15, color: "#F4F4F4", marginBottom: 10, minHeight: "2.35em" }}>
                    {p.titulo}
                  </div>
                  <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .fi-passo-card:hover {
            transform: translateY(-4px);
            border-color: ${AZUL}70 !important;
            box-shadow: 0 20px 48px -16px rgba(12,152,252,0.28);
          }
          .fi-passo-card:hover .fi-passo-num {
            transform: translateX(3px);
          }
        `,
      }} />
    </section>
  );
}