const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Alterações aplicadas (doc "Alterações site"):
  - Fotos e texto maiores (estava pequeno)
  - Depoimentos atualizados: Mantovani (Noroeste/SP), Hoffmann (Anápolis/GO),
    Victória Souza (Analista de Branding — Botafogo)
  - TODO: confirmar clubes/cargos com Matthes antes de publicar
*/
const depos = [
  {
    foto: "/images/site/rafael-mantovani.jpg",
    name: "RAFAEL MANTOVANI",
    role: "Analista de Desempenho — Noroeste/SP",
    quote: "Após o curso de Análise de Desempenho e Mercado, fiz a experiência prática do curso no Ituano. Fui contratado pelo clube e atualmente estou no Noroeste/SP. Foi graças ao Futebol Interativo que entrei no mercado.",
  },
  {
    foto: "/images/site/otavio-hoffmann.jpg",
    name: "OTAVIO HOFFMANN",
    role: "Analista de Desempenho — Anápolis/GO",
    quote: "Fiz o curso de Análise de Desempenho e Mercado, depois disso fiz a prática no Bahia. Foi uma experiência incrível. Depois fui contratado pelo Uberlândia/MG. Também estive no Atlético/MG e agora assumi a cadeira de Analista de Desempenho do Anapólis/GO. Foi através do Futebol Interativo que conquistei a minha primeira oportunidade.",
  },
  {
    foto: "/images/site/victoria-souza.jpg",
    name: "VICTORIA SOUZA",
    role: "Analista de Branding — Botafogo",
    quote: "Fiz o curso de Jornalismo no Futebol, fiz a experiência prática no Bahia. Depois fui contratada pelo Botafogo, também acabei passando pela CBF e atualmente sou Analista de Branding no Botafogo. A experiência prática foi fundamental para que eu conseguisse entrar no mercado.",
  },
];

export default function Depoimentos() {
  return (
    <section style={{ background: "#04395f", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Quem já passou pelo FI</span>
          <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5vw,56px)", lineHeight: 0.95, color: "#F4F4F4" }}>+4.500 ALUNOS<br />FIZERAM PRÁTICA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {depos.map((d) => (
            <div key={d.name} className="flex flex-col gap-5 p-7 rounded-2xl" style={{ border: "1px solid rgba(140,200,245,0.14)", background: "linear-gradient(145deg,rgba(12,90,150,0.25),rgba(3,38,63,0.4))" }}>
              <p style={{ fontFamily: M, fontSize: 15.5, fontWeight: 500, color: "rgba(244,244,244,0.82)", lineHeight: 1.65, flex: 1 }}>&ldquo;{d.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.foto} alt={d.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(140,200,245,0.35)" }} />
                <div>
                  <div style={{ fontFamily: F, fontSize: 17, lineHeight: 1, color: "#F4F4F4" }}>{d.name}</div>
                  <div style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "#A9D8F5", marginTop: 5 }}>{d.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}