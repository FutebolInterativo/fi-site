import Link from "next/link";
const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CTAFinal() {
  return (
    <section style={{ background: "#03263F", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            padding: "clamp(28px,5vw,48px) clamp(20px,5vw,56px)",
            border: "1px solid rgba(12,152,252,0.2)",
            background: "linear-gradient(135deg,rgba(0,75,156,0.2),rgba(0,123,255,0.06) 50%,transparent 70%)",
          }}
        >
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(12,152,252,0.1),transparent 70%)" }} />

          {/* Layout: coluna no mobile, linha no desktop */}
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Sem compromisso</span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 12 }}>NÃO SABE POR<br />ONDE COMEÇAR?</h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.65)", maxWidth: 440 }}>
                Fale com um consultor. Ele entende o seu momento e indica a formação certa para o seu perfil.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-shrink-0 md:w-auto w-full">
              <a
                href="https://api.whatsapp.com/send/?phone=5511942009407"
                target="_blank" rel="noreferrer"
                style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", borderRadius: 12, background: "#25d366", boxShadow: "0 8px 22px rgba(37,211,102,0.35)", textDecoration: "none" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar com um consultor
              </a>
              <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#A9D8F5", display: "block", textAlign: "center" as const, padding: "14px 24px", borderRadius: 12, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                Ver todas as formações
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}