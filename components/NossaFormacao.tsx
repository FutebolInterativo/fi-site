"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const PROFESSORES = [
  { foto: "/images/mentores/m-beting.png",    nome: "Mauro Beting",      cargo: "Jornalista e Comentarista — SBT, Jovem Pan e outros veículos" },
  { foto: "/images/mentores/l-bertozzi.png",  nome: "Leonardo Bertozzi", cargo: "Jornalista e Comentarista na ESPN" },
  { foto: "/images/mentores/m-rios.png",      nome: "Michelle Rios",     cargo: "Psicóloga do Atlético/MG" },
  { foto: "/images/mentores/g-gomes.png",     nome: "Gabriel Gomes",     cargo: "Scout do Bayer Leverkusen" },
  { foto: "/images/mentores/r-salvador.png",  nome: "Rodrigo Salvador",  cargo: "Coordenador de Analytics do Red Bull Bragantino" },
  { foto: "/images/mentores/e-affonso.png",   nome: "Eduardo Afonso",    cargo: "Jornalista e Repórter na ESPN" },
  { foto: "/images/mentores/c-neto.png",      nome: "Calza Neto",        cargo: "DPO do Corinthians" },
  { foto: "/images/mentores/w-nakamura.png",  nome: "Wilson Nakamura",   cargo: "Conselheiro e Diretor Estatutário do Palmeiras" },
  { foto: "/images/mentores/k-matias.png",    nome: "Katy Matias",       cargo: "Nutricionista do Palmeiras" },
  { foto: "/images/mentores/h-aguiar.png",    nome: "Henrique Almeida",  cargo: "Diretor de Marketing e Negócios do Sport/PE" },
  { foto: "/images/mentores/r-farias.png",    nome: "Roberta Farias",    cargo: "Advogada do Cruzeiro" },
];

const N = PROFESSORES.length;
const TRACK = [...PROFESSORES, ...PROFESSORES, ...PROFESSORES];
const ORIGIN = N;

/*
  Ajuste mobile: antes o carrossel sempre mostrava 4 cards por vez (VISIBLE
  fixo), o que deixava cada card com ~80px de largura num celular — selo e
  texto ilegíveis. Agora o número de cards visíveis é controlado por uma
  custom property CSS (--nf-visible), trocada via media query:
  celular ~1.15 card (1 cheio + uma "espiadinha" do próximo, convida a arrastar),
  tablet ~2.3, desktop 4 (igual antes). O cálculo de flex/transform abaixo
  usa var(--nf-visible) em vez do número fixo, então tudo se adapta sozinho.
*/
export default function NossaFormacao() {
  const [offset, setOffset] = useState(ORIGIN);
  const [transition, setTransition] = useState(true);
  const jumping = useRef(false);

  const go = useCallback((dir: 1 | -1) => {
    if (jumping.current) return;
    setTransition(true);
    setOffset(o => o + dir);
  }, []);

  const onTransitionEnd = useCallback(() => {
    setOffset(o => {
      const lo = ORIGIN;
      const hi = ORIGIN + N - 1;
      if (o < lo || o > hi) {
        jumping.current = true;
        const normalized = ((o - ORIGIN) % N + N) % N + ORIGIN;
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

  const css = `
    .nf-track { --nf-visible: 4; }
    @media (max-width: 640px) { .nf-track { --nf-visible: 1.15; } }
    @media (min-width: 641px) and (max-width: 1023px) { .nf-track { --nf-visible: 2.3; } }
  `;

  return (
    <section style={{ background: "linear-gradient(180deg,#020C18 0%,#03263F 55%,#020C18 100%)", padding: "clamp(40px,6vh,64px) 0 clamp(64px,9vh,100px)", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 clamp(20px,4vw,48px)", marginBottom: "clamp(28px,4vh,40px)" }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,58px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>
          NO FUTEBOL INTERATIVO,<br />SÓ ENSINA QUEM FAZ
        </h2>
        <p style={{ fontFamily: M, fontWeight: 500, fontSize: "clamp(14px,1.4vw,17px)", color: "rgba(169,216,245,0.5)", lineHeight: 1.6 }}>
          +100 professores atuando hoje em clubes, seleções e imprensa esportiva
        </p>
      </div>

      {/* Carrossel */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,40px)", display: "flex", alignItems: "center", gap: "clamp(8px,1.5vw,20px)", marginBottom: 40 }}>

        <button onClick={() => go(-1)} style={{ ...BtnStyle, width: "clamp(36px,8vw,48px)", height: "clamp(36px,8vw,48px)" }} aria-label="Anterior"
          onMouseEnter={e=>{const b=e.currentTarget;b.style.borderColor="rgba(12,152,252,0.6)";b.style.background="rgba(12,90,150,0.4)";b.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{const b=e.currentTarget;b.style.borderColor="rgba(169,216,245,0.25)";b.style.background="rgba(3,38,63,0.8)";b.style.transform="scale(1)";}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#A9D8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            className="nf-track"
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              gap: "clamp(8px,1.5vw,18px)",
              transform: `translateX(calc(-${offset} * (100% / var(--nf-visible) + clamp(8px,1.5vw,18px) / var(--nf-visible))))`,
              transition: transition ? "transform .45s cubic-bezier(.4,0,.2,1)" : "none",
              willChange: "transform",
            }}
          >
            {TRACK.map((p, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 calc(100% / var(--nf-visible) - clamp(8px,1.5vw,18px) * (var(--nf-visible) - 1) / var(--nf-visible))`,
                  position: "relative" as const,
                  borderRadius: 18,
                  overflow: "hidden",
                  aspectRatio: "1/1",
                  background: "linear-gradient(155deg,#0A1E35,#0C5A9628)",
                }}
              >
                {/* fallback com inicial — fica visível até a imagem carregar por cima */}
                <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 40, color: "rgba(169,216,245,0.35)" }}>
                  {p.nome.charAt(0)}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.foto}
                  alt={p.nome}
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
                <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "68%", background: "linear-gradient(to top, rgba(1,10,20,0.98) 0%, rgba(1,10,20,0.75) 42%, transparent 100%)" }} />
                <div style={{ position: "absolute" as const, bottom: 14, left: 14, right: 14 }}>
                  <p style={{ fontFamily: F, fontSize: "clamp(14px,3.4vw,17px)", color: "#fff", lineHeight: 1.15, marginBottom: 6, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{p.nome}</p>
                  <p style={{
                    fontFamily: M, fontSize: "clamp(11px,2.7vw,12.5px)", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
                    display: "-webkit-box", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 2, overflow: "hidden",
                  }}>{p.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => go(1)} style={{ ...BtnStyle, width: "clamp(36px,8vw,48px)", height: "clamp(36px,8vw,48px)" }} aria-label="Próximo"
          onMouseEnter={e=>{const b=e.currentTarget;b.style.borderColor="rgba(12,152,252,0.6)";b.style.background="rgba(12,90,150,0.4)";b.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{const b=e.currentTarget;b.style.borderColor="rgba(169,216,245,0.25)";b.style.background="rgba(3,38,63,0.8)";b.style.transform="scale(1)";}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#A9D8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
        {PROFESSORES.map((_, i) => (
          <button key={i}
            onClick={() => { setTransition(true); setOffset(ORIGIN + i); }}
            style={{ width: i === activeIndex ? 22 : 7, height: 7, borderRadius: 99, border: "none", padding: 0, cursor: "pointer", background: i === activeIndex ? "#0C98FC" : "rgba(169,216,245,0.25)", transition: "width .3s ease, background .3s ease" }}
            aria-label={`Professor ${i + 1}`} />
        ))}
      </div>

      {/* Fechamento */}
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <p style={{ fontFamily: F, fontSize: "clamp(18px,2.4vw,28px)", color: "#F4F4F4", lineHeight: 1.2, marginBottom: 22, maxWidth: 620, margin: "0 auto 22px" }}>
          São +100 profissionais do mercado.<br />Qual deles vai te ensinar primeiro?
        </p>
        <Link href="/cursos" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 36px rgba(8,194,122,0.4)", fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", textDecoration: "none" }}>
          Conheça as formações
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>

    </section>
  );
}