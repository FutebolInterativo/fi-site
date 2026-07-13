import Link from "next/link";
import Image from "next/image";
const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/futebolinterativobr/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/futebolinterativobr",
    path: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z",
  },
  {
    name: "X",
    href: "https://x.com/FutebolIntBR",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@FutebolInterativobr",
    path: "M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.569A2.994 2.994 0 0 0 .502 6.186 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.107 2.117C4.495 20.5 12 20.5 12 20.5s7.505 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/school/futebolinterativo/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.556V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@futebolinterativobr",
    path: "M16.6 5.82a4.7 4.7 0 0 1-2.9-1.03A4.68 4.68 0 0 1 12.06 1H9.13v13.4a2.59 2.59 0 1 1-1.83-2.48V8.85a5.62 5.62 0 1 0 4.66 5.55V9.01a7.6 7.6 0 0 0 4.64 1.57V7.65a4.68 4.68 0 0 1 0-1.83z",
  },
];
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
    { href: "https://jobs.quickin.io/futebolinterativo", label: "Trabalhe conosco", external: true },
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
      <style dangerouslySetInnerHTML={{ __html: `
        .fi-social{ transition: border-color .18s ease, background .18s ease; }
        .fi-social:hover{ border-color: rgba(12,152,252,0.6) !important; background: rgba(12,152,252,0.12) !important; }
      `}} />
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop:48, paddingBottom:32 }}>
        <div className="grid md:grid-cols-4 gap-10" style={{ marginBottom:48 }}>
          <div>
            <Image src="https://futebolinterativo.com/novo-site/img/logo.png" alt="Futebol Interativo" width={140} height={36} style={{ height:32, width:"auto", marginBottom:16 }} />
            <p style={{ fontFamily:M, fontSize:13, fontWeight:500, color:"rgba(244,244,244,0.45)", lineHeight:1.7, maxWidth:280 }}>Escola de formação profissional para o mercado do futebol. Fundada em 2018, incubada pela UFRN.</p>
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:8, marginTop:20 }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="fi-social"
                  style={{
                    width:32, height:32, borderRadius:"50%",
                    border:"1px solid rgba(140,200,245,0.18)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0,
                  }}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="rgba(244,244,244,0.55)"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
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