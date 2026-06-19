const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const depos = [
  { initials:"RM", name:"RAFAEL MANTOVANI", role:"Contratado pelo Ituano", quote:"A experiência prática no Ituano foi o que abriu as portas. Entrei no clube, mostrei meu trabalho e fui contratado. O FI entregou exatamente o que prometeu." },
  { initials:"OH", name:"OTAVIO HOFFMANN", role:"Analista — Atlético-MG", quote:"Fiz a prática no Bahia. Hoje sou Analista de Desempenho do Atlético-MG. O FI me deu o conteúdo e o caminho para chegar lá." },
  { initials:"VS", name:"VICTORIA SOUZA", role:"Contratada pelo Botafogo", quote:"Realizei minha prática no Bahia e fui contratada pelo Botafogo. O FI é a ponte entre quem você é e quem o futebol precisa." },
];
export default function Depoimentos() {
  return (
    <section style={{ background:"#04395f", padding:"80px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ marginBottom:48 }}>
          <span style={{ fontFamily:M, fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"#A9D8F5", display:"block", marginBottom:12 }}>Quem já passou pelo FI</span>
          <h2 style={{ fontFamily:F, fontSize:"clamp(30px,5vw,56px)", lineHeight:0.95, color:"#F4F4F4" }}>+4.500 ALUNOS<br />CONTRATADOS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {depos.map((d) => (
            <div key={d.name} className="flex flex-col gap-4 p-6 rounded-2xl" style={{ border:"1px solid rgba(140,200,245,0.14)", background:"linear-gradient(145deg,rgba(12,90,150,0.25),rgba(3,38,63,0.4))" }}>
              <p style={{ fontFamily:M, fontSize:14, fontWeight:500, color:"rgba(244,244,244,0.75)", lineHeight:1.6, flex:1 }}>&ldquo;{d.quote}&rdquo;</p>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#0C98FC,#08C27A)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:F, fontSize:13, color:"#fff", flexShrink:0 }}>{d.initials}</div>
                <div>
                  <div style={{ fontFamily:F, fontSize:15, lineHeight:1, color:"#F4F4F4" }}>{d.name}</div>
                  <div style={{ fontFamily:M, fontSize:12, fontWeight:600, color:"#A9D8F5", marginTop:4 }}>{d.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
