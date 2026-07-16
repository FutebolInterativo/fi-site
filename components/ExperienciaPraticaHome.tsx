"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const DARK = "#010E1B";
const VERDE = "#08C27A";

const stats = [
  { raw: "+130", label: "Clubes parceiros" },
  { raw: "+4.500", label: "Alunos enviados" },
  { raw: "15", label: "Dias de imersão" },
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

/* contador animado, mesmo padrão usado em NossaMissao / experiencia-pratica */
function Counter({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el || done.current) return;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    const pre = raw.match(/^[^0-9]*/)?.[0] ?? "";
    const suf = raw.match(/[^0-9.,]+$/)?.[0] ?? "";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const run = (now: number) => {
        const t = Math.min((now - t0) / 1200, 1);
        const v = 1 - Math.pow(1 - t, 3);
        const rounded = Math.round(v * num);
        el.textContent = pre + rounded.toLocaleString("pt-BR") + suf;
        if (t < 1) requestAnimationFrame(run);
        else el.textContent = raw;
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [raw]);
  return <span ref={ref}>{raw}</span>;
}

export default function ExperienciaPraticaHome() {
  return (
    <section style={{ background: DARK, padding: "clamp(88px,12vh,124px) 0 clamp(72px,10vh,108px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "45%", height: "70%", background: "radial-gradient(ellipse 60% 55% at 60% 40%, rgba(12,152,252,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative" }}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* ── Coluna de texto ── */}
          <FadeIn>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 20px 10px 14px", borderRadius: 99, background: "linear-gradient(135deg,#0C98FC,#0B72D9)", boxShadow: "0 8px 24px rgba(12,152,252,0.4)", marginBottom: 26 }}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" /><path d="M9.5 12l1.8 1.8L15 9.5" stroke="#fff" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontFamily: M, fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#fff" }}>
                  Exclusivo Futebol Interativo
                </span>
              </div>

              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.5vw,46px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 18 }}>
                VOCÊ TERMINA DENTRO DE<br />UM CLUBE PROFISSIONAL
              </h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.75, maxWidth: 440, marginBottom: 32 }}>
                Nenhuma outra escola de futebol no Brasil oferece isso. Ao concluir a parte teórica, você vive até 15 dias dentro do departamento da sua área, em um dos nossos{" "}
                <strong style={{ color: "rgba(244,244,244,0.88)", fontWeight: 700 }}>+130 clubes parceiros</strong>.
              </p>

              <div className="grid grid-cols-3" style={{ gap: 0, marginBottom: 32 }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{ paddingRight: i < 2 ? 16 : 0, paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <div style={{ fontFamily: F, fontSize: "clamp(19px,2.6vw,26px)", lineHeight: 1, color: "#F4F4F4" }}>
                      <Counter raw={s.raw} />
                    </div>
                    <div style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", marginTop: 7 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/experiencia-pratica"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 14, background: `linear-gradient(135deg,#2fe08a,${VERDE})`, boxShadow: "0 0 36px rgba(8,194,122,0.4)", fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", textDecoration: "none", transition: "transform .18s ease, box-shadow .18s ease" }}
                onMouseEnter={(e) => { const l = e.currentTarget; l.style.transform = "translateY(-2px)"; l.style.boxShadow = "0 0 44px rgba(8,194,122,0.55)"; }}
                onMouseLeave={(e) => { const l = e.currentTarget; l.style.transform = "translateY(0)"; l.style.boxShadow = "0 0 36px rgba(8,194,122,0.4)"; }}
              >
                Conhecer a experiência prática
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </FadeIn>

          {/* ── Coluna de imagem ── */}
          <FadeIn delay={120}>
            <div style={{ position: "relative", maxWidth: 380, margin: "0 auto", marginTop: 4 }}>
              <Image
                src="/images/cursos/experiencia-pratica---mobile.png"
                alt="Alunos do Futebol Interativo em experiência prática dentro de clubes parceiros"
                width={602}
                height={684}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeIn>

        </div>
      </div>

    </section>
  );
}