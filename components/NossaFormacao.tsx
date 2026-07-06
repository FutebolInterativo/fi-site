"use client";
import { useState, useRef, useCallback } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const FOTOS = [
  "/images/mentores/mauro-beting.webp",
  "/images/mentores/thairo-arruda.webp",
  "/images/mentores/leonardo-bertozzi.webp",
  "/images/mentores/matheus-alvarez.webp",
  "/images/mentores/katy-matias.webp",
];

const VISIBLE = 4;
const N = FOTOS.length;

// Triplicar para ter margem dos dois lados
const TRACK = [...FOTOS, ...FOTOS, ...FOTOS];
const ORIGIN = N; // índice onde começa o bloco do meio

export default function NossaFormacao() {
  const [offset, setOffset] = useState(ORIGIN);
  const [transition, setTransition] = useState(true);
  const jumping = useRef(false);

  const go = useCallback((dir: 1 | -1) => {
    if (jumping.current) return;
    setTransition(true);
    setOffset(o => o + dir);
  }, []);

  // Quando a transição termina, verifica se precisa reposicionar sem animação
  const onTransitionEnd = useCallback(() => {
    setOffset(o => {
      const lo = ORIGIN;           // limite mínimo (início do bloco do meio)
      const hi = ORIGIN + N - 1;   // limite máximo
      if (o < lo || o > hi) {
        jumping.current = true;
        const normalized = ((o - ORIGIN) % N + N) % N + ORIGIN;
        // Desliga transition, corrige posição
        setTransition(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            jumping.current = false;
            setTransition(true);
          });
        });
        return normalized;
      }
      return o;
    });
  }, []);

  const activeIndex = ((offset - ORIGIN) % N + N) % N;

  const BtnStyle: React.CSSProperties = {
    width: 48, height: 48, borderRadius: "50%",
    border: "1.5px solid rgba(169,216,245,0.25)",
    background: "rgba(3,38,63,0.8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0,
    transition: "border-color .2s, background .2s, transform .15s",
  };

  // Largura de cada card como fração da janela visível
  const cardPct = 100 / VISIBLE;

  return (
    <section style={{ background: "linear-gradient(180deg,#020C18 0%,#03263F 55%,#020C18 100%)", padding: "clamp(64px,9vh,100px) 0", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 clamp(20px,4vw,48px)", marginBottom: "clamp(44px,6vh,64px)" }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,58px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>
          NO FUTEBOL INTERATIVO,<br />SÓ ENSINA QUEM FAZ
        </h2>
        <p style={{ fontFamily: M, fontWeight: 500, fontSize: "clamp(14px,1.4vw,17px)", color: "rgba(169,216,245,0.5)", lineHeight: 1.6 }}>
          Aprenda com quem vive o futebol todos os dias
        </p>
      </div>

      {/* Carrossel */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,40px)", display: "flex", alignItems: "center", gap: "clamp(10px,1.5vw,20px)" }}>

        <button onClick={() => go(-1)} style={BtnStyle} aria-label="Anterior"
          onMouseEnter={e=>{const b=e.currentTarget;b.style.borderColor="rgba(12,152,252,0.6)";b.style.background="rgba(12,90,150,0.4)";b.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{const b=e.currentTarget;b.style.borderColor="rgba(169,216,245,0.25)";b.style.background="rgba(3,38,63,0.8)";b.style.transform="scale(1)";}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#A9D8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Janela */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              gap: "clamp(10px,1.5vw,18px)",
              // Cada card ocupa 1/VISIBLE da janela; desloca por quantos cards passamos
              transform: `translateX(calc(-${offset} * (${cardPct}% + clamp(10px,1.5vw,18px) / ${VISIBLE})))`,
              transition: transition ? "transform .45s cubic-bezier(.4,0,.2,1)" : "none",
              willChange: "transform",
            }}
          >
            {TRACK.map((foto, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 calc(${cardPct}% - clamp(10px,1.5vw,18px) * ${(VISIBLE - 1) / VISIBLE})`,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={foto} alt="" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => go(1)} style={BtnStyle} aria-label="Próximo"
          onMouseEnter={e=>{const b=e.currentTarget;b.style.borderColor="rgba(12,152,252,0.6)";b.style.background="rgba(12,90,150,0.4)";b.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{const b=e.currentTarget;b.style.borderColor="rgba(169,216,245,0.25)";b.style.background="rgba(3,38,63,0.8)";b.style.transform="scale(1)";}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#A9D8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
        {FOTOS.map((_, i) => (
          <button key={i}
            onClick={() => { setTransition(true); setOffset(ORIGIN + i); }}
            style={{ width: i === activeIndex ? 22 : 7, height: 7, borderRadius: 99, border: "none", padding: 0, cursor: "pointer", background: i === activeIndex ? "#0C98FC" : "rgba(169,216,245,0.25)", transition: "width .3s ease, background .3s ease" }}
            aria-label={`Professor ${i + 1}`} />
        ))}
      </div>

    </section>
  );
}