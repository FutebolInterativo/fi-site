import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Sobre — Futebol Interativo",
  description: "Conheça a história do Futebol Interativo, escola de formação profissional para o futebol fundada em 2018 e incubada pela UFRN.",
};

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const STATS = [
  { v: "+25 mil", l: "Alunos formados" },
  { v: "+130",    l: "Clubes parceiros" },
  { v: "34",      l: "Formações ativas" },
  { v: "2018",    l: "Fundação" },
];

const TIMELINE = [
  { year: "2018", title: "Fundação", desc: "O Futebol Interativo nasce dentro da UFRN com o objetivo de formar profissionais para o mercado do futebol brasileiro.", color: "#3B82F6" },
  { year: "2019", title: "Primeiras turmas", desc: "Lançamento das primeiras especializações presenciais. Mais de 300 alunos formados no primeiro ano.", color: "#818CF8" },
  { year: "2020", title: "Expansão digital", desc: "Transição para o modelo 100% online, ampliando o acesso a alunos de todo o Brasil.", color: "#F59E0B" },
  { year: "2021", title: "Rede de parceiros", desc: "Mais de 50 clubes parceiros integrados. O programa de experiências práticas se consolida como diferencial único.", color: "#4096F2" },
  { year: "2023", title: "+130 clubes", desc: "A rede de parceiros ultrapassa 130 clubes em todo o Brasil. Mais de 15.000 alunos formados.", color: "#3B82F6" },
  { year: "2026", title: "Hoje", desc: "Mais de 25.000 alunos formados, 34 formações ativas e a maior rede de clubes parceiros do país.", color: "#08C27A" },
];

const VALUES = [
  {
    title: "Educação de verdade",
    desc: "Conteúdo criado por profissionais que estão no mercado, não em salas de aula. Prático, direto e aplicável.",
    color: "#3B82F6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Prática garantida",
    desc: "Todo aluno das especializações tem uma experiência prática dentro de um clube profissional. Isso é diferencial.",
    color: "#4096F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4096F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    title: "Comunidade",
    desc: "Uma rede de mais de 25 mil profissionais que compartilham a mesma paixão e os mesmos objetivos.",
    color: "#818CF8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Crescimento contínuo",
    desc: "Atualizamos nossos conteúdos constantemente para acompanhar a velocidade do mercado do futebol.",
    color: "#F59E0B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ paddingTop: 120, paddingBottom: 80, borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "inline-block", marginBottom: 20, padding: "6px 14px", borderRadius: 40, border: "1px solid rgba(140,200,245,0.2)", background: "rgba(140,200,245,0.06)" }}>
                  Sobre o FI
                </span>
                <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5vw,62px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 24 }}>
                  A ESCOLA QUE TE LEVA PARA DENTRO DO CLUBE.
                </h1>
                <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)", marginBottom: 36, maxWidth: 500 }}>
                  Fundada em 2018 e incubada pela UFRN, o Futebol Interativo nasceu com uma missão clara: formar profissionais completos para o mercado do futebol, com educação de qualidade e prática garantida.
                </p>
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.4)", textDecoration: "none" }}>
                  Ver formações →
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.v} style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.2)", padding: "28px 24px" }}>
                    <div style={{ fontFamily: F, fontSize: 34, lineHeight: 1, color: "#F4F4F4", marginBottom: 8 }}>
                      {s.v}
                    </div>
                    <div style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A9D8F5" }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Missão */}
        <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)", background: "#04395f" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                  Nossa missão
                </span>
                <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 20 }}>
                  DEMOCRATIZAR O ACESSO À CARREIRA NO FUTEBOL.
                </h2>
                <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)", marginBottom: 16 }}>
                  Sempre acreditamos que o futebol brasileiro precisa de mais profissionais qualificados em todas as suas áreas — não só em campo. Nosso trabalho é conectar apaixonados com o mercado, com método e com prática real.
                </p>
                <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)" }}>
                  A experiência prática dentro de um clube não é bônus. É parte do currículo. É o que diferencia o nosso aluno no mercado.
                </p>
              </div>

              {/* Destaque 100% */}
              <div style={{ borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(3,38,63,0.6)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontFamily: F, fontSize: "clamp(56px,8vw,80px)", lineHeight: 1, color: "#08C27A", letterSpacing: "0.01em" }}>
                  100%
                </div>
                <div style={{ fontFamily: M, fontSize: 14, fontWeight: 600, color: "rgba(244,244,244,0.6)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Prática garantida
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                Nossa história
              </span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4" }}>
                DO CAMPUS UNIVERSITÁRIO AO BRASIL TODO.
              </h2>
            </div>

            <div style={{ position: "relative" }}>
              {/* Linha vertical */}
              <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "rgba(140,200,245,0.15)" }} className="lg:hidden" />

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TIMELINE.map((item) => (
                  <div key={item.year} style={{ position: "relative", display: "flex", gap: 24, paddingBottom: 40, paddingLeft: 52 }} className="lg:pl-0">
                    {/* Dot mobile */}
                    <div style={{ position: "absolute", left: 13, top: 4, width: 14, height: 14, borderRadius: "50%", background: item.color, border: "2px solid #03263F", zIndex: 1 }} className="lg:hidden" />

                    <div style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.12)", background: "rgba(12,90,150,0.15)", padding: "20px 24px", flex: 1 }}>
                      <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700, color: item.color, background: `${item.color}18`, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
                        {item.year}
                      </span>
                      <div style={{ fontFamily: F, fontSize: 20, lineHeight: 1, color: "#F4F4F4", marginBottom: 8 }}>
                        {item.title}
                      </div>
                      <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)", background: "#04395f" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                O que nos guia
              </span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4" }}>
                PRINCÍPIOS QUE DEFINEM CADA DECISÃO.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(3,38,63,0.5)", padding: "28px" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{v.icon}</div>
                  <div style={{ fontFamily: F, fontSize: 22, lineHeight: 1, color: "#F4F4F4", marginBottom: 10 }}>
                    {v.title}
                  </div>
                  <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 0" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div style={{ borderRadius: 24, border: "1px solid rgba(12,152,252,0.2)", background: "linear-gradient(135deg,rgba(0,75,156,0.2),rgba(0,123,255,0.06) 50%,transparent)", padding: "64px 48px", textAlign: "center" }}>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
                PRONTO PARA ENTRAR EM CAMPO?
              </h2>
              <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
                Explore as formações e encontre a área certa para construir sua carreira no futebol.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", textDecoration: "none" }}>
                  Ver todas as formações →
                </Link>
                <a href="https://api.whatsapp.com/send/?phone=5511942009407" target="_blank" rel="noreferrer" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "rgba(244,244,244,0.75)", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                  Falar com consultor
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}