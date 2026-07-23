"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const cursos = [
  { src: "/images/cursos/analise-de-desempenho-e-mercado.webp", alt: "Análise de Desempenho e Mercado" },
  { src: "/images/cursos/ciencia-de-dados.webp",                 alt: "Ciência de Dados" },
  { src: "/images/cursos/direito-no-futebol.webp",                alt: "Direito no Futebol" },
  { src: "/images/cursos/fotografia-no-futebol.webp",             alt: "Fotografia no Futebol" },
  { src: "/images/cursos/gestao-executiva.webp",                  alt: "Gestão Executiva" },
  { src: "/images/cursos/jornalismo-no-futebol.webp",             alt: "Jornalismo no Futebol" },
  { src: "/images/cursos/marketing-no-futebol.webp",              alt: "Marketing no Futebol" },
  { src: "/images/cursos/nutricao-no-futebol.webp",               alt: "Nutrição no Futebol" },
  { src: "/images/cursos/preparacao-fisica-e-recovery.webp",      alt: "Preparação Física e Recovery" },
  { src: "/images/cursos/psicologia-no-futebol.webp",             alt: "Psicologia no Futebol" },
];

const N = cursos.length;

const areas = [
  {
    href: "/cursos?area=saude",
    label: "SAÚDE E PERFORMANCE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    href: "/cursos?area=tecnica-e-tatica",
    label: "TÉCNICO E TÁTICO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M3 11a5 5 0 0 0 5 5h4l6 3v-9a4 4 0 0 0-4-4H8a5 5 0 0 0-5 5Z" /><circle cx="8" cy="11" r="1.7" />
      </svg>
    ),
  },
  {
    href: "/cursos?area=comunicacao-marketing",
    label: "COMUNICAÇÃO E MARKETING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
      </svg>
    ),
  },
  {
    href: "/cursos?area=gestao-e-operacao",
    label: "GESTÃO E JURÍDICO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </svg>
    ),
  },
];

const SIDE = 4;
const SPACING = 240;
const SPEED = 0.0065;

export default function Areas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    function animate() {
      posRef.current = (posRef.current + SPEED) % N;
      setTick((t) => (t + 1) % 1000000);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pos = posRef.current;
  const center = Math.round(pos);
  const visible: { idx: number; rel: number }[] = [];
  for (let o = -SIDE; o <= SIDE; o++) {
    const idx = ((center + o) % N + N) % N;
    const rel = center + o - pos;
    visible.push({ idx, rel });
  }

  return (
    <section id="areas" style={{ position: "relative", background: "linear-gradient(180deg,#03263F 0%,#04395f 48%,#03263F 100%)", paddingBottom: "clamp(44px,7vh,80px)", overflow: "hidden", contain: "paint", maxWidth: "100vw" }}>
      <div style={{ position: "absolute", left: "50%", top: "55%", transform: "translate(-50%,-50%)", width: "90%", height: "60%", background: "radial-gradient(ellipse at center,rgba(12,154,255,0.30) 0%,transparent 68%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "clamp(34px,6vh,60px) 22px clamp(6px,2vh,14px)" }}>
        <p style={{ fontFamily: M, fontWeight: 700, fontSize: "clamp(12px,3.4vw,15px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", marginBottom: 12 }}>ENCONTRE SEU CAMINHO</p>
        <h2 style={{ fontFamily: F, fontSize: "clamp(34px,9vw,60px)", lineHeight: 0.92, color: "#F4F4F4", textShadow: "0 4px 22px rgba(0,0,0,0.35)", margin: 0, marginBottom: 14 }}>
          QUAL É A SUA ÁREA<br />NO FUTEBOL?
        </h2>
        <p style={{ fontFamily: M, fontWeight: 500, fontSize: "clamp(14px,2.2vw,16px)", lineHeight: 1.5, color: "rgba(244,244,244,0.7)", maxWidth: 440, margin: "0 auto" }}>
          Explore as áreas e veja quais formações combinam com o seu perfil.
        </p>
      </div>

      <div ref={trackRef} style={{ position: "relative", zIndex: 2, height: 290, margin: "20px 0 0", perspective: "1100px", overflow: "hidden", contain: "paint", maxWidth: "100vw" }}>
        {visible.map(({ idx, rel }) => {
          const abs = Math.abs(rel);
          const x = rel * SPACING;
          const scale = Math.max(0.62, 1 - abs * 0.16);
          const rotateY = Math.max(-48, Math.min(48, -rel * 32));
          const z = -abs * 120;
          const opacity = abs > SIDE - 0.2 ? 0 : Math.max(0.35, 1 - abs * 0.22);
          const brightness = 1 - Math.min(0.5, abs * 0.18);
          const zIndex = 100 - Math.round(abs * 10);

          return (
            <div key={idx} style={{ position: "absolute", top: "50%", left: "50%", width: 200, aspectRatio: "4/5", marginTop: -125, marginLeft: -100, borderRadius: 22, overflow: "hidden", boxShadow: abs < 0.5 ? "0 24px 50px rgba(0,0,0,0.6)" : "0 16px 30px rgba(0,0,0,0.4)", transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`, transformStyle: "preserve-3d", opacity, filter: `brightness(${brightness})`, zIndex, transition: "box-shadow 0.3s ease", willChange: "transform, opacity" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cursos[idx].src} alt={cursos[idx].alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ position: "relative", zIndex: 3, maxWidth: 1040, margin: "clamp(18px,3vh,30px) auto 0", padding: "0 22px" }}>
        {areas.map((a) => (
          <Link key={a.href} href={a.href} style={{ textDecoration: "none", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 5, padding: "12px 12px", borderRadius: 40, border: "1px solid rgba(140,200,245,0.32)", background: "linear-gradient(90deg,rgba(12,90,150,0.45) 0%,rgba(10,46,78,0.35) 100%)", backdropFilter: "blur(10px)", minHeight: 54, transition: "border-color .2s ease, background .2s ease" }}
            onMouseEnter={e=>{const l=e.currentTarget as HTMLAnchorElement;l.style.borderColor="rgba(43,180,255,0.6)";l.style.background="linear-gradient(90deg,rgba(12,90,150,0.6) 0%,rgba(10,46,78,0.5) 100%)";}}
            onMouseLeave={e=>{const l=e.currentTarget as HTMLAnchorElement;l.style.borderColor="rgba(140,200,245,0.32)";l.style.background="linear-gradient(90deg,rgba(12,90,150,0.45) 0%,rgba(10,46,78,0.35) 100%)";}}>
            <span className="md:whitespace-nowrap" style={{ fontFamily: M, fontWeight: 700, fontSize: "clamp(9px,1.3vw,11.5px)", textTransform: "uppercase", letterSpacing: "0.01em", color: "#F4F4F4", lineHeight: 1.2 }}>{a.label}</span>
            <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", color: "#2BB4FF", filter: "drop-shadow(0 2px 6px rgba(12,154,255,0.45))" }}>{a.icon}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}