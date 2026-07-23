"use client";
import Link from "next/link";
import HubspotFormModal from "@/components/HubspotFormModal";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/* ── CTA Final ─────────────────────────────────────────────────────── */
export default function CTAFinal() {
  return (
    <section style={{ background: "#03263F", padding: "clamp(64px,9vh,96px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "12%", top: "-10%", width: "55%", height: "70%", background: "radial-gradient(ellipse at center,rgba(12,152,252,0.14) 0%,transparent 68%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "8%", bottom: "-15%", width: "40%", height: "60%", background: "radial-gradient(ellipse at center,rgba(8,194,122,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative" }}>
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            padding: "clamp(36px,6vw,60px) clamp(28px,6vw,64px)",
            border: "1px solid rgba(64,150,242,0.28)",
            background: "linear-gradient(150deg,#123255 0%,#0C263F 55%,#081A2C 100%)",
            boxShadow: "0 40px 90px -32px rgba(0,10,30,0.7)",
          }}
        >
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(12,152,252,0.22),transparent 70%)" }} />
          <div className="absolute -left-16 -bottom-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(8,194,122,0.14),transparent 70%)" }} />
          <div style={{ position: "absolute", top: 0, left: "6%", right: "6%", height: 1, background: "linear-gradient(90deg,transparent,rgba(12,152,252,0.55),transparent)" }} />

          <div className="relative flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
            <div style={{ maxWidth: 560, flex: "1 1 auto" }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 14 }}>Sem compromisso</span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.2vw,44px)", lineHeight: 1.04, color: "#F4F4F4", marginBottom: 16 }}>SEU LUGAR NO FUTEBOL<br />JÁ EXISTE. FALTA O<br />CAMINHO ATÉ ELE.</h2>
              <p style={{ fontFamily: M, fontSize: 17.5, fontWeight: 500, color: "rgba(244,244,244,0.75)", lineHeight: 1.6, maxWidth: 440 }}>
                Fale com um consultor. Ele entende seu momento e indica a formação certa pro seu perfil, em 5 minutos você sai com um plano.
              </p>
            </div>

            <div style={{ flex: "0 0 auto", width: "100%", maxWidth: 340, display: "flex", flexDirection: "column" as const, gap: 22 }} className="md:pl-12 md:border-l md:border-white/10">
              <div className="flex flex-col gap-3">
                <HubspotFormModal
                  title="Fale com um consultor"
                  subtitle="Preencha seus dados e retornaremos o quanto antes."
                  defaultUtm={{
                    utm_source: "trafego",
                    utm_medium: "site",
                    utm_campaign: "geral",
                    utm_content: "home-cta-final-falar-com-um-consultor",
                    utm_term: "geral",
                  }}
                  trigger={
                    <button
                      onMouseEnter={(e) => { const b = e.currentTarget; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 12px 30px rgba(37,211,102,0.5)"; }}
                      onMouseLeave={(e) => { const b = e.currentTarget; b.style.transform = "translateY(0)"; b.style.boxShadow = "0 8px 22px rgba(37,211,102,0.35)"; }}
                      style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", borderRadius: 14, background: "linear-gradient(135deg,#2fe08a,#08C27A)", boxShadow: "0 8px 22px rgba(37,211,102,0.35)", border: "none", cursor: "pointer", transition: "transform .18s ease, box-shadow .18s ease", width: "100%" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Falar com um consultor
                    </button>
                  }
                />
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "rgba(244,244,244,0.75)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" as const, padding: "14px 24px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.24)", textDecoration: "none", transition: "border-color .18s ease, color .18s ease" }}
                  onMouseEnter={(e) => { const l = e.currentTarget; l.style.borderColor = "rgba(140,200,245,0.5)"; l.style.color = "#F4F4F4"; }}
                  onMouseLeave={(e) => { const l = e.currentTarget; l.style.borderColor = "rgba(140,200,245,0.24)"; l.style.color = "rgba(244,244,244,0.75)"; }}
                >
                  Prefiro explorar as formações
                </Link>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", flexShrink: 0 }}>
                  {["/images/site/mantovani.jpeg", "/images/site/Hoffmann.jpeg", "/images/site/Victoria.jpeg"].map((src, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={src} src={src} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #0C263F", marginLeft: i > 0 ? -10 : 0, position: "relative", zIndex: 3 - i, boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }} />
                  ))}
                </div>
                <p style={{ fontFamily: M, fontSize: 12.5, fontWeight: 600, color: "rgba(169,216,245,0.55)", lineHeight: 1.4 }}>
                  <strong style={{ color: "rgba(244,244,244,0.85)", fontWeight: 700 }}>+4.500 alunos</strong> começaram assim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}