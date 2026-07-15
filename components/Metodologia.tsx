const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Componente novo — substitui a antiga seção "PPI" na home, conforme pedido
  no doc de alterações ("PPI - substituir por experiência prática").
  Conteúdo (título, subtítulo e os 3 passos) veio integralmente do doc.
*/
const passos = [
  {
    num: "01",
    titulo: "APRENDA COM QUEM ESTÁ NO MERCADO",
    texto: "Aulas ao vivo com profissionais que trabalham hoje em clubes e instituições do futebol. Você aprende o que o mercado exige — direto de quem contrata e entrega.",
  },
  {
    num: "02",
    titulo: "VIVA O DIA A DIA DE UM CLUBE",
    texto: "Prática garantida em um dos +130 clubes parceiros. Não é estágio simbólico: é você dentro da operação, resolvendo problemas reais e construindo relacionamento com quem já está lá dentro.",
  },
  {
    num: "03",
    titulo: "ENTRE NO MERCADO COM HISTÓRIA PRA CONTAR",
    texto: "Você sai com repertório técnico, vivência de clube no currículo e uma rede de contatos que abre portas. Preparado não só pra primeira oportunidade, mas pra crescer nela.",
  },
];

export default function ExperienciaPraticaHome() {
  return (
    <section style={{ background: "#03263F", padding: "clamp(80px,11vh,120px) 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ textAlign: "center" as const, marginBottom: "clamp(48px,6vh,64px)" }}>
          <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", marginBottom: 14 }}>
            Nossa metodologia
          </p>
          <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5.2vw,54px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 18 }}>
            APRENDA. APLIQUE.<br />ENTRE EM CAMPO.
          </h2>
          <p style={{ fontFamily: M, fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 500, color: "rgba(169,216,245,0.55)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            Uma metodologia desenhada para encurtar a distância entre você e o mercado do futebol.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {passos.map((p) => (
            <div key={p.num} style={{ padding: "32px 26px", borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "linear-gradient(145deg,rgba(12,90,150,0.2),rgba(3,38,63,0.5))" }}>
              <div style={{ fontFamily: F, fontSize: 44, lineHeight: 1, color: "rgba(12,152,252,0.35)", marginBottom: 18 }}>{p.num}</div>
              <h3 style={{ fontFamily: F, fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.15, color: "#F4F4F4", marginBottom: 12 }}>{p.titulo}</h3>
              <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.6)", lineHeight: 1.65 }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}