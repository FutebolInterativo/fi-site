"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const areas = [
  {
    label: "Análise",
    href: "/ebooks/analise",
    color: "#4096F2",
    capa: "/images/cursos/analise-de-desempenho-e-mercado-sem-texto.webp",
    iconPath: "M18 20V10M12 20V4M6 20v-6",
  },
  {
    label: "Técnico e Tático",
    href: "/ebooks/area-tecnica",
    color: "#0C98FC",
    capa: "/images/cursos/ciencia-de-dados-sem-texto.webp",
    iconPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20ZM2 12h20",
  },
  {
    label: "Comunicação e Marketing",
    href: "/ebooks/comunicacao",
    color: "#818CF8",
    capa: "/images/cursos/marketing-no-futebol-sem-texto.webp",
    iconPath: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
  {
    label: "Direito",
    href: "/ebooks/direito",
    color: "#F59E0B",
    capa: "/images/cursos/direito-no-futebol-sem-texto.webp",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    label: "Fisioterapia",
    href: "/ebooks/fisioterapia",
    color: "#2DD4BF",
    capa: "/images/cursos/fisioterapia-no-futebol-sem-texto.webp",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
  {
    label: "Gestão",
    href: "/ebooks/gestao",
    color: "#F59E0B",
    capa: "/images/cursos/gestao-executiva-sem-texto.webp",
    iconPath: "M3 7h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18",
  },
  {
    label: "Medicina",
    href: "/ebooks/medicina",
    color: "#F87171",
    capa: "/images/cursos/medicina-sem-texto.png",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
  {
    label: "Nutrição",
    href: "/ebooks/nutricao",
    color: "#34D399",
    capa: "/images/cursos/nutricao-no-futebol-sem-texto.webp",
    iconPath: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z",
  },
  {
    label: "Preparação Física",
    href: "/ebooks/preparacao-fisica",
    color: "#FB923C",
    capa: "/images/cursos/preparacao-fisica-e-recovery-sem-texto.webp",
    iconPath: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3",
  },
  {
    label: "Psicologia",
    href: "/ebooks/psicologia",
    color: "#C084FC",
    capa: "/images/cursos/psicologia-no-futebol-sem-texto.webp",
    iconPath: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 17h.01",
  },
];

/* ── Card do e-book — mesmo padrão visual do CursoCard (/cursos) ──── */
function EbookCard({ label, href, color, capa, iconPath }: (typeof areas)[number]) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div style={{
        display: "flex", flexDirection: "column" as const, height: "100%",
        borderRadius: 20, overflow: "hidden",
        border: `1px solid ${hover ? `${color}55` : "rgba(140,200,245,0.14)"}`,
        background: "#0A1E35",
        boxShadow: hover ? "0 20px 44px -16px rgba(0,0,0,0.5)" : "none",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        transition: "transform .2s ease, border-color .2s ease, box-shadow .2s ease",
      }}>

        {/* Capa — 1:1, mesma proporção das imagens "sem texto" dos cursos */}
        <div style={{ width: "100%", aspectRatio: "1/1", position: "relative" as const, flexShrink: 0, overflow: "hidden" }}>
          {capa ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={capa} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          ) : (
            <div style={{
              position: "absolute" as const, inset: 0,
              background: `linear-gradient(150deg, ${color}30 0%, #0A1E35 65%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="62%" height="62%" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.16 }}>
                <path d={iconPath} stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Gradiente inferior — legibilidade garantida em qualquer imagem */}
          <div style={{
            position: "absolute" as const, inset: 0,
            background: "linear-gradient(to top, rgba(1,10,20,0.95) 0%, rgba(1,10,20,0.62) 38%, transparent 68%)",
          }} />

          {/* Tipo + área + título, sobrepostos na base */}
          <div style={{ position: "absolute" as const, left: 14, right: 14, bottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)" }}>
                E-book Gratuito
              </span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: `${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={8} height={8} viewBox="0 0 24 24" fill="none">
                    <path d={iconPath} stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" as const, color, lineHeight: 1.3 }}>
                  {label}
                </span>
              </div>
            </div>
            <p style={{
              fontFamily: F, fontSize: 16, lineHeight: 1.18, color: "#fff", margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.6)",
              display: "-webkit-box", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 2, overflow: "hidden",
            }}>
              Guia gratuito de {label}
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div style={{ padding: "12px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, color }}>Receber e-book</span>
          <span style={{
            width: 28, height: 28, borderRadius: 8, background: `${color}16`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hover ? "translateX(2px)" : "translateX(0)",
            transition: "transform .18s ease",
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EbooksPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(180deg,#021829 0%,#03263F 100%)", paddingTop: 120, paddingBottom: 64, borderBottom: "1px solid rgba(140,200,245,0.1)", textAlign: "center" }}>
          <div className="max-w-4xl mx-auto px-6">
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 16 }}>
              Gratuito
            </span>
            <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5vw,62px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
              BIBLIOTECA GRATUITA DO FUTEBOL
            </h1>
            <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)", maxWidth: 500, margin: "0 auto" }}>
              Selecione a área de interesse e receba seu e-book gratuito no e-mail.
            </p>
          </div>
        </div>

        {/* Grid de e-books */}
        <div className="max-w-6xl mx-auto px-6" style={{ padding: "64px 24px" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((a) => (
              <EbookCard key={a.href} {...a} />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}