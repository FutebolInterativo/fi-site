const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Componente novo (não existia arquivo — criado do zero seguindo os tokens
  do projeto). Alterações aplicadas do doc:
  - Hierarquia invertida: a headline "Tornar o futebol..." vem em destaque primeiro
  - Removido o texto que começava com "Guiar a nova geração..."
  - Cor do texto de apoio melhorada (mais contraste que a versão anterior)
  - Métrica atualizada: 2.100 alunos já contratados / meta 10.000 / 21%
  - Removida a barra de "caminho" (progresso) e o ícone de "trave" — fica só o número
  - Botão "Explorar Formações" → "Quero ser um dos 10.000"
*/
export default function Missao() {
  return (
    <section style={{ background: "#010E1B", padding: "clamp(80px,11vh,120px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(12,152,252,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6" style={{ position: "relative", textAlign: "center" as const }}>
        <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", marginBottom: 18 }}>
          Nossa missão
        </p>

        <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5.5vw,58px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 22 }}>
          TORNAR O FUTEBOL BRASILEIRO,<br />NOVAMENTE, O MELHOR DO MUNDO.
        </h2>

        <p style={{ fontFamily: M, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 500, color: "rgba(244,244,244,0.68)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 56px" }}>
          E isso começa por quem trabalha nele: a nova geração de profissionais que estamos formando.
        </p>

        <div style={{ display: "inline-flex", flexDirection: "column" as const, alignItems: "center", gap: 6, padding: "28px 48px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(140,200,245,0.14)", marginBottom: 40 }}>
          <div style={{ fontFamily: F, fontSize: "clamp(38px,6vw,64px)", lineHeight: 1, color: "#F4F4F4" }}>2.100</div>
          <div style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#A9D8F5" }}>Alunos já contratados</div>
          <div style={{ fontFamily: M, fontSize: 12, fontWeight: 500, color: "rgba(244,244,244,0.45)", marginTop: 8 }}>
            21% do caminho até a meta de <strong style={{ color: "rgba(244,244,244,0.7)" }}>10.000</strong>
          </div>
        </div>

        <div>
          <a href="#areas" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 16, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 44px rgba(8,194,122,0.42)", border: "1.5px solid rgba(8,194,122,0.75)", fontFamily: M, fontSize: 15, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            Quero ser um dos 10.000
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}