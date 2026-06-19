const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const steps = [
  { num:"01", title:"APRENDA ONLINE", desc:"Aulas com profissionais que atuam no mercado. Conteúdo direto, sem enrolação. Assista no seu ritmo." },
  { num:"02", title:"APLIQUE EM CASES REAIS", desc:"Projetos baseados em situações reais dos bastidores do futebol profissional. Você sai com repertório." },
  { num:"03", title:"VIVA DENTRO DE UM CLUBE", desc:"A experiência prática é garantida. Você entra em um dos +130 clubes parceiros e coloca o currículo para correr." },
];
export default function Metodologia() {
  return (
    <section id="metodologia" style={{ background:"#03263F", padding:"80px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ marginBottom:48 }}>
          <span style={{ fontFamily:M, fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"#A9D8F5", display:"block", marginBottom:12 }}>Metodologia</span>
          <h2 style={{ fontFamily:F, fontSize:"clamp(30px,5vw,56px)", lineHeight:0.95, color:"#F4F4F4" }}>APRENDA. APLIQUE.<br />ENTRE EM CAMPO.</h2>
          <p style={{ fontFamily:M, fontSize:15, fontWeight:500, color:"rgba(244,244,244,0.65)", marginTop:12, maxWidth:500 }}>Nossa metodologia foi construída para quem quer resultados reais.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col gap-3 p-6 md:p-8 rounded-2xl" style={{ border:"1px solid rgba(140,200,245,0.14)", background:"linear-gradient(145deg,rgba(12,90,150,0.25),rgba(3,38,63,0.4))" }}>
              <div style={{ fontFamily:F, fontSize:48, lineHeight:1, color:"rgba(12,152,252,0.18)" }}>{s.num}</div>
              <div style={{ fontFamily:F, fontSize:"clamp(20px,2.4vw,26px)", lineHeight:1, color:"#F4F4F4" }}>{s.title}</div>
              <p style={{ fontFamily:M, fontSize:14, fontWeight:500, color:"rgba(244,244,244,0.65)", lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
