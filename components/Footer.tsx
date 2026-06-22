import Link from "next/link";
import Image from "next/image";
const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const cols = [
  { title: "Formações", links: [
    { href: "/cursos?area=tecnica-e-tatica",      label: "Técnica e Tática" },
    { href: "/cursos?area=comunicacao-marketing", label: "Comunicação" },
    { href: "/cursos?area=gestao-e-operacao",     label: "Gestão e Operação" },
    { href: "/cursos?area=saude",                 label: "Saúde" },
    { href: "/cursos",                            label: "Todos os cursos" },
  ]},
  { title: "Institucional", links: [
    { href: "/sobre",  label: "Sobre o FI" },
    { href: "https://futebolinterativo.com/blog", label: "Blog", external: true },
    { href: "/ebooks", label: "E-books gratuitos" },
  ]},
  { title: "Legal", links: [
    { href: "/termos",                          label: "Termos de uso" },
    { href: "/termos/politica-de-privacidade",  label: "Política de privacidade" },
    { href: "https://alunos.futebolinterativo.com/", label: "Área do aluno", external: true },
  ]},
];
export default function Footer() {
  return (
    <footer style={{ background:"#020d1a", borderTop:"1px solid rgba(140,200,245,0.18)" }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop:48, paddingBottom:32 }}>
        <div className="grid md:grid-cols-4 gap-10" style={{ marginBottom:48 }}>
          <div>
            <Image src="https://futebolinterativo.com/novo-site/img/logo.png" alt="Futebol Interativo" width={140} height={36} style={{ height:32, width:"auto", marginBottom:16 }} />
            <p style={{ fontFamily:M, fontSize:13, fontWeight:500, color:"rgba(244,244,244,0.45)", lineHeight:1.7, maxWidth:280 }}>Escola de formação profissional para o mercado do futebol. Fundada em 2018, incubada pela UFRN.</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily:F, fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:"#A9D8F5", marginBottom:16 }}>{col.title}</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column" as const, gap:10 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external
                      ? <a href={l.href} target="_blank" rel="noreferrer" style={{ fontFamily:M, fontSize:13, fontWeight:500, color:"rgba(244,244,244,0.45)" }}>{l.label}</a>
                      : <Link href={l.href} style={{ fontFamily:M, fontSize:13, fontWeight:500, color:"rgba(244,244,244,0.45)" }}>{l.label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(140,200,245,0.18)", paddingTop:24, display:"flex", flexWrap:"wrap" as const, alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <span style={{ fontFamily:M, fontSize:12, color:"rgba(244,244,244,0.3)" }}>© 2026 Futebol Interativo. Todos os direitos reservados.</span>
          <span style={{ fontFamily:M, fontSize:11, color:"rgba(244,244,244,0.25)" }}>CNPJ 29.939.011/0001-13</span>
        </div>
      </div>
    </footer>
  );
}
