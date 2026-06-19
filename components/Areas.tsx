import Link from "next/link";
const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const areas = [
  { href:"/cursos/tecnica-e-tatica", label:"TÉCNICA\nE TÁTICA", desc:"Análise de desempenho, IA, ciência de dados e metodologia de jogo.", count:"12 formações", color:"#4096F2" },
  { href:"/cursos/comunicacao-marketing", label:"COMUNICAÇÃO\nE MARKETING", desc:"Jornalismo, narração, marketing esportivo e redes sociais.", count:"8 formações", color:"#818CF8" },
  { href:"/cursos/gestao-e-operacao", label:"GESTÃO E\nOPERAÇÃO", desc:"Direito, finanças, agente FIFA e gestão de clubes empresa.", count:"6 formações", color:"#F59E0B" },
  { href:"/cursos/saude", label:"SAÚDE", desc:"Fisioterapia, nutrição, psicologia esportiva e medicina.", count:"8 formações", color:"#2DD4BF" },
];
export default function Areas() {
  return (
    <section id="areas" style={{ background:"#04395f", padding:"80px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ marginBottom:48 }}>
          <span style={{ fontFamily:M, fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"#A9D8F5", display:"block", marginBottom:12 }}>Encontre seu caminho</span>
          <h2 style={{ fontFamily:F, fontSize:"clamp(32px,5vw,58px)", lineHeight:0.95, color:"#F4F4F4" }}>QUAL É A SUA ÁREA<br />NO FUTEBOL?</h2>
          <p style={{ fontFamily:M, fontSize:15, fontWeight:500, color:"rgba(244,244,244,0.65)", marginTop:12, maxWidth:500 }}>Explore as áreas e veja quais formações combinam com o seu perfil.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {areas.map((a) => (
            <Link key={a.href} href={a.href} className="flex flex-col gap-3 p-5 md:p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-200" style={{ border:"1px solid rgba(140,200,245,0.16)", background:"linear-gradient(145deg,rgba(12,90,150,0.3),rgba(4,57,95,0.2))" }}>
              <div style={{ fontFamily:F, fontSize:"clamp(17px,2vw,21px)", lineHeight:1.05, color:"#F4F4F4", whiteSpace:"pre-line" as const }}>{a.label}</div>
              <p style={{ fontFamily:M, fontSize:13, fontWeight:500, color:"rgba(244,244,244,0.65)", lineHeight:1.6, flex:1 }}>{a.desc}</p>
              <div style={{ fontFamily:M, fontSize:12, fontWeight:700, color:a.color, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                {a.count}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
