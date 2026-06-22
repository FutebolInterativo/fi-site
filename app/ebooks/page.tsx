"use client";
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4096F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    label: "Técnica e Tática",
    href: "/ebooks/area-tecnica",
    color: "#0C98FC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0C98FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    label: "Comunicação",
    href: "/ebooks/comunicacao",
    color: "#818CF8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: "Direito",
    href: "/ebooks/direito",
    color: "#F59E0B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: "Fisioterapia",
    href: "/ebooks/fisioterapia",
    color: "#2DD4BF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: "Gestão",
    href: "/ebooks/gestao",
    color: "#F59E0B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>
      </svg>
    ),
  },
  {
    label: "Medicina",
    href: "/ebooks/medicina",
    color: "#F87171",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: "Nutrição",
    href: "/ebooks/nutricao",
    color: "#34D399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
      </svg>
    ),
  },
  {
    label: "Preparação Física",
    href: "/ebooks/preparacao-fisica",
    color: "#FB923C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    label: "Psicologia",
    href: "/ebooks/psicologia",
    color: "#C084FC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

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

        {/* Grid de áreas */}
        <div className="max-w-5xl mx-auto px-6" style={{ padding: "64px 24px" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  borderRadius: 16,
                  border: "1px solid rgba(140,200,245,0.14)",
                  background: "rgba(12,90,150,0.15)",
                  transition: "transform 0.2s, border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = a.color;
                  el.style.background = `${a.color}12`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(140,200,245,0.14)";
                  el.style.background = "rgba(12,90,150,0.15)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, border: `1px solid ${a.color}30`, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 18, lineHeight: 1, color: "#F4F4F4", marginBottom: 4 }}>
                      {a.label}
                    </div>
                    <div style={{ fontFamily: M, fontSize: 12, fontWeight: 600, color: "rgba(244,244,244,0.45)" }}>
                      Receber e-book
                    </div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}