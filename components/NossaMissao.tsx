"use client";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const ATUAL = 2100; // manter sincronizado com o número usado no resto do site

/* ── FadeIn ──────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 18 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    Object.assign(el.style, { opacity: "0", transform: `translateY(${y}px)`, transition: `opacity .7s ${delay}ms cubic-bezier(.22,.61,.36,1), transform .7s ${delay}ms cubic-bezier(.22,.61,.36,1)` });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y]);
  return <div ref={ref}>{children}</div>;
}

/* ── Counter ─────────────────────────────────────────────────────── */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const run = (now: number) => {
        const t = Math.min((now - t0) / 1400, 1);
        const ev = 1 - Math.pow(1 - t, 3);
        el.textContent = "+" + Math.round(ev * value).toLocaleString("pt-BR");
        if (t < 1) requestAnimationFrame(run);
        else el.textContent = "+" + value.toLocaleString("pt-BR");
      };
      requestAnimationFrame(run);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>+0</span>;
}

/* ── Padrão de campo (linhas de futebol) ─────────────────────────── */
function PitchPattern() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <line x1="0" y1="300" x2="1000" y2="300" stroke="rgba(169,216,245,0.14)" strokeWidth="1.5" />
      <circle cx="500" cy="300" r="150" stroke="rgba(169,216,245,0.14)" strokeWidth="1.5" fill="none" />
      <circle cx="500" cy="300" r="3.5" fill="rgba(169,216,245,0.22)" />
      <path d="M -60 140 A 150 150 0 0 1 -60 460" stroke="rgba(169,216,245,0.1)" strokeWidth="1.5" fill="none" />
      <path d="M 1060 140 A 150 150 0 0 0 1060 460" stroke="rgba(169,216,245,0.1)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ── Seção ───────────────────────────────────────────────────────── */
export default function NossaMissao() {
  return (
    <section style={{ background: "linear-gradient(180deg,#010E1B 0%,#03263F 55%,#010E1B 100%)", padding: "clamp(80px,11vh,120px) 0", position: "relative", overflow: "hidden" }}>

      <PitchPattern />
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "60%", background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(12,152,252,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.25),transparent)" }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", textAlign: "center" as const, position: "relative" }}>

        <FadeIn>
          {/* eyebrow */}
          <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", marginBottom: 18 }}>
            Nossa missão
          </p>

          {/* headline em destaque — antes era um texto pequeno de apoio; agora é o centro da seção */}
          <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5.5vw,58px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 22 }}>
            TORNAR O FUTEBOL BRASILEIRO,<br />NOVAMENTE, O MELHOR DO MUNDO.
          </h2>

          <p style={{ fontFamily: M, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 500, color: "rgba(244,244,244,0.68)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 44px" }}>
            E isso começa por quem trabalha nele: a nova geração de profissionais que estamos formando.
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, marginBottom: 44 }}>
            <span style={{ fontFamily: F, fontSize: "clamp(56px,11vw,120px)", lineHeight: 0.85, color: "#0C98FC", letterSpacing: "-0.02em" }}>
              <Counter value={ATUAL} />
            </span>
            <span style={{ fontFamily: M, fontSize: "clamp(14px,1.8vw,18px)", fontWeight: 600, color: "rgba(244,244,244,0.5)", paddingBottom: "clamp(10px,2vw,18px)" }}>
              alunos já contratados
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <a
            href="#areas"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "15px 30px", borderRadius: 14,
              background: "linear-gradient(135deg,#08C27A,#059669)",
              border: "1.5px solid rgba(8,194,122,0.75)",
              boxShadow: "0 0 40px rgba(8,194,122,0.4)",
              fontFamily: M, fontWeight: 700, fontSize: 14.5, color: "#fff",
              textDecoration: "none",
            }}
          >
            Quero ser um dos 10.000
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </FadeIn>

      </div>
    </section>
  );
}