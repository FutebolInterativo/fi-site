import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Termos de Uso — Futebol Interativo",
  description: "Termos de uso do Futebol Interativo.",
};

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const sections = [
  {
    title: "1. Aceitação dos Termos",
    content: "Ao acessar e utilizar o site e os serviços do Futebol Interativo, você concorda com os presentes Termos de Uso. Caso não concorde com qualquer disposição aqui descrita, recomendamos que não utilize nossos serviços.",
  },
  {
    title: "2. Sobre o Futebol Interativo",
    content: "O Futebol Interativo é uma escola de formação profissional voltada para o mercado do futebol, fundada em 2018 e incubada pela UFRN. Oferecemos cursos, especializações e experiências práticas dentro de clubes parceiros. CNPJ: 29.939.011/0001-13.",
  },
  {
    title: "3. Uso dos Serviços",
    content: "Nossos serviços são destinados a pessoas maiores de 18 anos ou maiores de 16 anos com autorização dos responsáveis. O usuário é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.",
  },
  {
    title: "4. Propriedade Intelectual",
    content: "Todo o conteúdo disponibilizado pelo Futebol Interativo, incluindo textos, vídeos, imagens, materiais didáticos, marcas e logotipos, é de propriedade exclusiva do Futebol Interativo e está protegido pelas leis de propriedade intelectual. É vedada a reprodução, distribuição ou uso comercial sem autorização prévia e por escrito.",
  },
  {
    title: "5. Conteúdo das Formações",
    content: "Os conteúdos das formações são disponibilizados exclusivamente para uso pessoal do aluno matriculado. É proibido compartilhar acessos, gravar aulas sem autorização ou reproduzir o material para terceiros. O descumprimento poderá resultar no cancelamento do acesso sem direito a reembolso.",
  },
  {
    title: "6. Pagamentos e Reembolsos",
    content: "Os pagamentos são processados por plataformas terceiras seguras. Em caso de cancelamento dentro de 7 dias corridos após a compra, o aluno tem direito ao reembolso integral, conforme o Código de Defesa do Consumidor. Após esse prazo, os reembolsos seguem as políticas específicas de cada produto.",
  },
  {
    title: "7. Experiência Prática",
    content: "A experiência prática dentro de clubes parceiros está sujeita à disponibilidade de vagas e ao cumprimento dos requisitos estabelecidos em cada formação. O Futebol Interativo não garante contratação pelo clube onde a experiência é realizada.",
  },
  {
    title: "8. Limitação de Responsabilidade",
    content: "O Futebol Interativo não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes do uso de nossos serviços. Não garantimos que o acesso aos serviços será ininterrupto ou livre de erros.",
  },
  {
    title: "9. Modificações dos Termos",
    content: "Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. O uso continuado dos serviços após as modificações implica na aceitação dos novos termos.",
  },
  {
    title: "10. Foro e Legislação Aplicável",
    content: "Estes Termos de Uso são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de Natal, Rio Grande do Norte, para dirimir quaisquer controvérsias decorrentes deste instrumento.",
  },
  {
    title: "11. Contato",
    content: "Para dúvidas sobre estes Termos de Uso, entre em contato conosco pelo WhatsApp ou pelo e-mail disponível em nosso site. Futebol Interativo — CNPJ 29.939.011/0001-13.",
  },
];

export default function TermosPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(180deg,#021829 0%,#03263F 100%)", paddingTop: 120, paddingBottom: 64, borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
          <div className="max-w-4xl mx-auto px-6">
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 16 }}>
              Legal
            </span>
            <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5vw,60px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
              TERMOS DE USO
            </h1>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.7 }}>
              Última atualização: junho de 2026
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-6" style={{ padding: "64px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {sections.map((s) => (
              <div key={s.title} style={{ borderBottom: "1px solid rgba(140,200,245,0.08)", paddingBottom: 40 }}>
                <h2 style={{ fontFamily: F, fontSize: "clamp(18px,2.5vw,24px)", lineHeight: 1, color: "#F4F4F4", marginBottom: 14 }}>
                  {s.title}
                </h2>
                <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.8, color: "rgba(244,244,244,0.65)" }}>
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}