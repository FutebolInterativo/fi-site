// app/experiencia-pratica/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const depoimentos = [
  { area: "Análise e Dados",       nome: "Rafael Mantovani",  texto: "A experiência prática no Ituano foi o que abriu as portas. Entrei no clube, mostrei meu trabalho e fui contratado.",           ytId: "KEZ8JXbGvl4" },
  { area: "Análise e Dados",       nome: "Rhostann de Almeida", texto: "Fiz minha Experiência Prática no Atlético-GO. Logo depois, fui contratado pelo clube.",                                    ytId: "NAe8BMn3E0g" },
  { area: "Análise e Dados",       nome: "Giulia Zanchett",   texto: "Realizei minha Experiência Prática no Avaí. Depois, fui contratada pelo clube.",                                               ytId: "_foOBOYAWTM" },
  { area: "Técnica e Tática",      nome: "Rafael Belini",     texto: "Fiz experiência prática no departamento técnico da Portuguesa/RJ.",                                                            ytId: "UkmLfPMX8_s" },
  { area: "Técnica e Tática",      nome: "Alan Ramos",        texto: "Fiz experiência prática no departamento técnico do Grêmio Osasco Audax.",                                                     ytId: "yy4-EH5rfEE" },
  { area: "Saúde e Performance",   nome: "Roque Alencar",     texto: "Realizei minha Experiência Prática no Atlético-GO. Depois, fui contratado pelo clube.",                                       ytId: "a49fOzPuZE4" },
  { area: "Saúde e Performance",   nome: "Caique Neves",      texto: "Fiz minha experiência prática no departamento de preparação física do São Caetano/SP.",                                       ytId: "TKrFekb3yMc" },
  { area: "Gestão e Operação",     nome: "Diego Carneiro",    texto: "Realizei minha Experiência Prática no departamento de gestão do Bahia.",                                                      ytId: "2fENX6EJN0E" },
  { area: "Gestão e Operação",     nome: "Thamires Hermida",  texto: "Formada em direito, fiz experiência prática no jurídico do Figueirense e fui contratada pelo clube.",                         ytId: "WpaGKFy-Ls0" },
  { area: "Comunicação",           nome: "Victória Souza",    texto: "Fiz experiência prática no departamento de comunicação do Bahia e fui contratada pelo Botafogo.",                             ytId: "XX5ml4f0zeM" },
  { area: "Comunicação",           nome: "Pedro Tanure",      texto: "Fiz experiência prática no departamento de comunicação do América-MG.",                                                       ytId: "Saz4bGb-YEM" },
];

const areas = [
  "Análise e Dados",
  "Técnica e Tática",
  "Saúde e Performance",
  "Gestão e Operação",
  "Comunicação",
];

const passos = [
  { num: "01", titulo: "Conclua a parte teórica", desc: "Termine as aulas online da sua especialização no seu ritmo, com profissionais que atuam no mercado." },
  { num: "02", titulo: "Escolha o clube parceiro", desc: "Selecione um dos +130 clubes parceiros espalhados pelo Brasil para realizar sua experiência prática." },
  { num: "03", titulo: "Viva dentro de um clube", desc: "Durante até 15 dias, você atua dentro do departamento da sua área, ao lado de profissionais reais." },
  { num: "04", titulo: "Seja contratado", desc: "Com o currículo rodando e a experiência comprovada, as portas do mercado se abrem para você." },
];

export const metadata = {
  title: "Experiência Prática — Futebol Interativo",
  description: "Viva a rotina de um clube profissional. Ao concluir sua especialização, você tem direito a até 15 dias de experiência prática dentro de um clube parceiro.",
};

export default function ExperienciaPraticaPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F" }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(160deg,#021829 0%,#03263F 60%,#04395f 100%)", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
          
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(8,194,122,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 99, border: "1px solid rgba(8,194,122,0.4)", background: "rgba(8,194,122,0.08)", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#08C27A", display: "inline-block" }} />
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, color: "#A9D8F5", letterSpacing: "0.12em" }}>DIFERENCIAL EXCLUSIVO DO FUTEBOL INTERATIVO</span>
            </div>

            <h1 style={{ fontFamily: F, fontSize: "clamp(40px,6vw,76px)", lineHeight: 0.92, color: "#F4F4F4", letterSpacing: "0.01em", marginBottom: 24 }}>
              EXPERIÊNCIA<br />
              <span style={{ color: "#08C27A" }}>PRÁTICA</span><br />
              DENTRO DE UM CLUBE
            </h1>

            <p style={{ fontFamily: M, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.75)", maxWidth: 620, margin: "0 auto 40px" }}>
              Ao concluir a parte teórica de uma especialização do FI, você tem direito a até{" "}
              <strong style={{ color: "#F4F4F4" }}>15 dias de experiência prática dentro de um clube parceiro</strong>,
              atuando no departamento da sua área de estudo.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <a href="#como-funciona" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 28px rgba(8,194,122,0.45)", textDecoration: "none" }}>
                Como funciona
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="/cursos" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.7)", display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                Ver formações
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section style={{ background: "rgba(4,57,95,0.5)", borderTop: "1px solid rgba(140,200,245,0.12)", borderBottom: "1px solid rgba(140,200,245,0.12)", padding: "40px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 32, textAlign: "center" }}>
            {[
              { num: "+130",     label: "Clubes parceiros" },
              { num: "+3.500",   label: "Alunos enviados" },
              { num: "15 dias",  label: "De imersão prática" },
              { num: "100%",     label: "Garantida na especialização" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: F, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1, color: "#08C27A" }}>{s.num}</div>
                <div style={{ fontFamily: M, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A9D8F5", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMO FUNCIONA ─────────────────────────────────────── */}
        <section id="como-funciona" style={{ background: "#03263F", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Passo a passo</span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(30px,5vw,52px)", lineHeight: 0.95, color: "#F4F4F4" }}>COMO FUNCIONA A<br />EXPERIÊNCIA PRÁTICA?</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
              {passos.map((p) => (
                <div key={p.num} style={{ padding: "28px 24px", borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "linear-gradient(145deg,rgba(12,90,150,0.25),rgba(3,38,63,0.4))" }}>
                  <div style={{ fontFamily: F, fontSize: 52, lineHeight: 1, color: "rgba(8,194,122,0.2)", marginBottom: 12 }}>{p.num}</div>
                  <div style={{ fontFamily: F, fontSize: "clamp(18px,2vw,22px)", lineHeight: 1, color: "#F4F4F4", marginBottom: 10 }}>{p.titulo}</div>
                  <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, color: "rgba(244,244,244,0.65)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VÍDEO PRINCIPAL ──────────────────────────────────── */}
        <section style={{ background: "#04395f", padding: "80px 24px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Veja como é</span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 32 }}>A EXPERIÊNCIA NA PRÁTICA</h2>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/9", background: "#021829" }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/892M4EUIp1w?rel=0&modestbranding=1"
                title="Experiência Prática Futebol Interativo"
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ── MAPA DE CLUBES ───────────────────────────────────── */}
        <section style={{ background: "#03263F", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Onde você pode viver essa experiência</span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 32 }}>+130 CLUBES PARCEIROS</h2>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/Mapa_Clubes_Parceiros.png" alt="Clubes parceiros" style={{ width: "100%", height: "auto", display: "block", opacity: 0.9 }} />
            </div>
            <a href="#oferta" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 28px rgba(8,194,122,0.4)", textDecoration: "none" }}>
              Quero participar da Experiência Prática
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </section>

        {/* ── DEPOIMENTOS POR ÁREA ─────────────────────────────── */}
        <section style={{ background: "#04395f", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Casos de sucesso</span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 48 }}>ALUNOS QUE FIZERAM E<br />FORAM CONTRATADOS</h2>

            {areas.map((area) => {
              const deps = depoimentos.filter((d) => d.area === area);
              return (
                <div key={area} style={{ marginBottom: 56 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "6px 16px", borderRadius: 99, border: "1px solid rgba(8,194,122,0.3)", background: "rgba(8,194,122,0.08)" }}>
                    <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700, color: "#08C27A", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{area}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
                    {deps.map((d) => (
                      <div key={d.nome}>
                        <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", background: "#021829", marginBottom: 14 }}>
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${d.ytId}?rel=0&modestbranding=1`}
                            title={d.nome}
                            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div style={{ fontFamily: F, fontSize: "clamp(18px,2.2vw,22px)", lineHeight: 1, color: "#F4F4F4", marginBottom: 6 }}>{d.nome}</div>
                        <p style={{ fontFamily: M, fontSize: 13, fontWeight: 500, color: "rgba(244,244,244,0.6)", lineHeight: 1.55 }}>{d.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA / FORMULÁRIO ─────────────────────────────────── */}
        <section id="oferta" style={{ background: "#021829", padding: "80px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 12 }}>Dê o próximo passo</span>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>QUERO PARTICIPAR DA<br />EXPERIÊNCIA PRÁTICA</h2>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.65)", lineHeight: 1.65, marginBottom: 32 }}>
              Fale com um consultor do FI e descubra qual especialização é a certa para você começar.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=5511942009407&text=Quero+saber+mais+sobre+a+Experi%C3%AAncia+Pr%C3%A1tica+do+Futebol+Interativo"
              target="_blank" rel="noreferrer"
              style={{ fontFamily: M, fontWeight: 700, fontSize: 16, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 14, background: "#25d366", boxShadow: "0 8px 28px rgba(37,211,102,0.4)", textDecoration: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar com um consultor
            </a>
            <div style={{ marginTop: 16 }}>
              <Link href="/cursos" style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(169,216,245,0.7)", textDecoration: "none" }}>
                Ver todas as especializações →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}