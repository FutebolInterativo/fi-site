"use client";
import { useEffect, useRef, useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const META = 10000;
const ATUAL = 2100; // manter sincronizado com o número usado no resto do site
const PROGRESSO = Math.round((ATUAL / META) * 100);

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

/* ── ProgressBar ─────────────────────────────────────────────────── */
function ProgressBar({ pct }: { pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setWidth(pct); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, borderRadius: 99, background: "linear-gradient(90deg,#0C98FC,#4EB8FF)", transition: "width 1.3s cubic-bezier(.22,.61,.36,1)" }} />
      </div>
      <p style={{ fontFamily: M, fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.45)", marginTop: 10, letterSpacing: "0.02em" }}>
        {pct}% do caminho para {META.toLocaleString("pt-BR")} empregos até 2030
      </p>
    </div>
  );
}

/* ── Padrão de campo (linhas de futebol) ─────────────────────────── */
function PitchPattern() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {/* linha do meio de campo */}
      <line x1="0" y1="300" x2="1000" y2="300" stroke="rgba(169,216,245,0.14)" strokeWidth="1.5" />
      {/* círculo central */}
      <circle cx="500" cy="300" r="150" stroke="rgba(169,216,245,0.14)" strokeWidth="1.5" fill="none" />
      {/* marca do meio-campo */}
      <circle cx="500" cy="300" r="3.5" fill="rgba(169,216,245,0.22)" />
      {/* arcos das grandes áreas, sugerindo os limites do campo */}
      <path d="M -60 140 A 150 150 0 0 1 -60 460" stroke="rgba(169,216,245,0.1)" strokeWidth="1.5" fill="none" />
      <path d="M 1060 140 A 150 150 0 0 0 1060 460" stroke="rgba(169,216,245,0.1)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ── Seção ───────────────────────────────────────────────────────── */
export default function NossaMissao() {
  return (
    <section style={{ background: "linear-gradient(180deg,#010E1B 0%,#03263F 55%,#010E1B 100%)", padding: "clamp(80px,11vh,120px) 0", position: "relative", overflow: "hidden" }}>

      {/* padrão de fundo: campo de futebol estilizado, sem foto */}
      <PitchPattern />
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "60%", background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(12,152,252,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.25),transparent)" }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", textAlign: "center" as const, position: "relative" }}>

        <FadeIn>
          {/* ícone decorativo — trave de gol, em vez do alvo genérico */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <svg width={44} height={36} viewBox="0 0 44 36" fill="none">
              <path d="M4 2v32M40 2v32M4 2h36" stroke="#0C98FC" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 2L1 6M40 2l3 4" stroke="#0C98FC" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>

          <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", marginBottom: 16 }}>
            Nossa missão
          </p>

          <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.4vw,46px)", lineHeight: 1.1, color: "rgba(244,244,244,0.75)", marginBottom: 44, fontWeight: 400 }}>
            Nossa missão é gerar<br />
            <span style={{ color: "#F4F4F4" }}>10.000 empregos no futebol até 2030.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: F, fontSize: "clamp(56px,11vw,120px)", lineHeight: 0.85, color: "#0C98FC", letterSpacing: "-0.02em" }}>
              <Counter value={ATUAL} />
            </span>
            <span style={{ fontFamily: M, fontSize: "clamp(14px,1.8vw,18px)", fontWeight: 600, color: "rgba(244,244,244,0.5)", paddingBottom: "clamp(10px,2vw,18px)" }}>
              empregos gerados
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div style={{ marginBottom: 40 }}>
            <ProgressBar pct={PROGRESSO} />
          </div>
        </FadeIn>

        <FadeIn delay={260}>
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
            Explorar formações
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </FadeIn>

      </div>
    </section>
  );
}