"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Props = {
  area: string;
  formId: string;
  communityUrl: string;
  color: string;
};

export default function EbookPage({ area, formId, communityUrl, color }: Props) {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>

        <div style={{ background: "linear-gradient(180deg,#021829 0%,#03263F 100%)", paddingTop: 120, paddingBottom: 64, borderBottom: "1px solid rgba(140,200,245,0.1)", textAlign: "center" }}>
          <div className="max-w-3xl mx-auto px-6">
            <Link href="/ebooks" style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(244,244,244,0.45)", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24, textDecoration: "none" }}>
              Todos os e-books
            </Link>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 16 }}>
              E-book Gratuito
            </span>
            <h1 style={{ fontFamily: F, fontSize: "clamp(32px,5vw,56px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
              PREENCHA E RECEBA SEU E-BOOK DE <span style={{ color }}>{area.toUpperCase()}</span>
            </h1>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)" }}>
              Preencha os dados abaixo e receba o material gratuito no seu e-mail.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6" style={{ padding: "64px 24px" }}>

          <div style={{ borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)", padding: "32px", marginBottom: 24 }}>
            <div className={`_form_${formId}`} />
            <Script
              src={`https://futebolinterativo-mkt.activehosted.com/f/embed.php?id=${formId}`}
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>

          <div style={{ borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)", padding: "28px", marginBottom: 40 }}>
            <h2 style={{ fontFamily: F, fontSize: 20, lineHeight: 1, color: "#F4F4F4", marginBottom: 8 }}>
              ENTRE NA NOSSA COMUNIDADE
            </h2>
            <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, color: "rgba(244,244,244,0.65)", marginBottom: 20 }}>
              Receba 2 vezes por semana conteúdo gratuito sobre {area}.
            </p>
            <a href={communityUrl} target="_blank" rel="noreferrer" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 12, background: "#25d366", textDecoration: "none" }}>
              Entrar na comunidade
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span style={{ fontFamily: M, fontSize: 13, fontWeight: 700, color: "#F4F4F4" }}>E-books Gratuitos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                <path d="M18 14h-8"/>
                <path d="M15 18h-5"/>
                <path d="M10 6h8v4h-8V6z"/>
              </svg>
              <span style={{ fontFamily: M, fontSize: 13, fontWeight: 700, color: "#F4F4F4" }}>Notícias da área</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="17"/>
                <line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
              </svg>
              <span style={{ fontFamily: M, fontSize: 13, fontWeight: 700, color: "#F4F4F4" }}>Vagas em emprego</span>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}