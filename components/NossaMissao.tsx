"use client";
import { useEffect, useRef } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const ATUAL = 2100; // manter sincronizado com o número usado no resto do site
const META = 10000;
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

/* ── ProgressBar — animação de largura ao entrar na viewport ──────── */
function ProgressBar({ pct }: { pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = pct + "%"; obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div style={{ width: "100%", maxWidth: 460, margin: "0 auto" }}>
      <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden", position: "relative" as const }}>
        <div
          ref={ref}
          style={{
            width: "0%", height: "100%", borderRadius: 99,
            background: "linear-gradient(90deg,#0C98FC,#4FC3FF)",
            boxShadow: "0 0 16px rgba(12,152,252,0.55)",
            transition: "width 1.5s cubic-bezier(.22,.61,.36,1)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: M, fontSize: 12, fontWeight: 700, letterSpacing: "0.03em" }}>
        <span style={{ color: "#4FC3FF" }}>{pct}% da meta atingida</span>
        <span style={{ color: "rgba(169,216,245,0.5)" }}>Objetivo: 10.000 alunos</span>
      </div>
    </div>
  );
}

/* ── Fundo — vinheta suave, sem padrão repetitivo ── */
function BackdropPattern() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <radialGradient id="nm-fade" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#nm-fade)" />
    </svg>
  );
}

/* ── Seção ───────────────────────────────────────────────────────── */
export default function NossaMissao() {
  return (
    <section style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, #0A2E4A 0%, #010E1B 55%, #010812 100%)", padding: "clamp(80px,11vh,120px) 0", position: "relative", overflow: "hidden" }}>

      <BackdropPattern />
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "60%", background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(12,152,252,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.25),transparent)" }} />
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ fontFamily: F, fontSize: "clamp(56px,11vw,120px)", lineHeight: 0.85, color: "#0C98FC", letterSpacing: "-0.02em" }}>
              <Counter value={ATUAL} />
            </span>
            <span style={{ fontFamily: M, fontSize: "clamp(14px,1.8vw,18px)", fontWeight: 600, color: "rgba(244,244,244,0.5)", paddingBottom: "clamp(10px,2vw,18px)" }}>
              alunos já contratados
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={160}>
          <div style={{ marginBottom: 44 }}>
            <ProgressBar pct={PROGRESSO} />
          </div>
        </FadeIn>

        <FadeIn delay={220}>
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