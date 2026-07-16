"use client";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const AZUL = "#0C98FC";
const AZUL_CLARO = "#A9D8F5";

const depos = [
  { foto: "/images/site/victoria-souza.jpg", name: "VICTORIA SOUZA", cargo: "Analista de Branding", clube: "Botafogo", quote: "Fiz o curso de Jornalismo no Futebol, fiz a experiência prática no Bahia. Depois fui contratada pelo Botafogo, também acabei passando pela CBF e atualmente sou Analista de Branding no Botafogo. A experiência prática foi fundamental para que eu conseguisse entrar no mercado." },
  { foto: "/images/site/rafael-mantovani.jpg", name: "RAFAEL MANTOVANI", cargo: "Analista de Desempenho", clube: "Noroeste/SP", quote: "Após o curso de Análise de Desempenho e Mercado, fiz a experiência prática do curso no Ituano. Fui contratado pelo clube e atualmente estou no Noroeste/SP. Foi graças ao Futebol Interativo que entrei no mercado." },
  { foto: "/images/site/otavio-hoffmann.jpg", name: "OTAVIO HOFFMANN", cargo: "Analista de Desempenho", clube: "Anápolis/GO", quote: "Fiz o curso de Análise de Desempenho e Mercado, depois disso fiz a prática no Bahia. Foi uma experiência incrível. Depois fui contratado pelo Uberlândia/MG. Também estive no Atlético/MG e agora assumi a cadeira de Analista de Desempenho do Anapólis/GO. Foi através do Futebol Interativo que conquistei a minha primeira oportunidade." },
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

export default function Depoimentos() {
  return (
    <section style={{ background: "#04395f", padding: "clamp(56px,8vh,84px) 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div style={{ marginBottom: 36 }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: AZUL_CLARO, display: "block", marginBottom: 12 }}>
              Quem já passou pelo FI
            </span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5vw,56px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
              DA PRÁTICA À CONTRATAÇÃO
            </h2>
            <p style={{ fontFamily: M, fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 500, color: "rgba(244,244,244,0.6)", lineHeight: 1.6, maxWidth: 560 }}>
              +4.500 alunos passaram por clubes parceiros. Estes são alguns dos que foram contratados.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {depos.map((d, i) => (
            <FadeIn key={d.name} delay={i * 100}>
              <div
                className="fi-depo-card"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "22px 20px 20px",
                  borderRadius: 22,
                  border: "1px solid rgba(140,200,245,0.16)",
                  background: "linear-gradient(160deg, rgba(12,98,160,0.32), rgba(3,38,63,0.55))",
                  transition: "transform .22s ease, border-color .22s ease, box-shadow .22s ease",
                  overflow: "hidden",
                }}
              >
                {/* aspas decorativas — assinatura visual do card */}
                <span
                  style={{
                    position: "absolute", top: -6, right: 16,
                    fontFamily: F, fontSize: 84, lineHeight: 1,
                    color: "rgba(169,216,245,0.08)",
                    pointerEvents: "none",
                    userSelect: "none" as const,
                  }}
                  aria-hidden="true"
                >
                  &rdquo;
                </span>

                <p style={{
                  fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.8)", lineHeight: 1.55, flex: 1, marginBottom: 18, position: "relative",
                  display: "-webkit-box", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 5, overflow: "hidden",
                }}>
                  &ldquo;{d.quote}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.foto}
                    alt={d.name}
                    style={{
                      width: 72, height: 72, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                      border: `2px solid ${AZUL}55`,
                      boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: F, fontSize: 15, lineHeight: 1.15, color: "#F4F4F4" }}>{d.name}</div>
                    <div style={{ fontFamily: M, fontSize: 12.5, fontWeight: 600, color: AZUL_CLARO, marginTop: 5, lineHeight: 1.35 }}>{d.cargo}</div>
                    <div style={{ fontFamily: M, fontSize: 11.5, fontWeight: 500, color: "rgba(244,244,244,0.45)", marginTop: 1, lineHeight: 1.35 }}>{d.clube}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .fi-depo-card:hover {
            transform: translateY(-5px);
            border-color: rgba(12,152,252,0.45) !important;
            box-shadow: 0 24px 56px -20px rgba(0,10,30,0.6);
          }
        `,
      }} />
    </section>
  );
}