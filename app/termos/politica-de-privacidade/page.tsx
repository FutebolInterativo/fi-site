import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade — Futebol Interativo",
  description: "Política de privacidade e proteção de dados do Futebol Interativo.",
};

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const sections = [
  {
    title: "1. Introdução",
    content: "O Futebol Interativo (CNPJ 29.939.011/0001-13) está comprometido com a proteção de seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
  },
  {
    title: "2. Dados Coletados",
    content: "Coletamos os seguintes tipos de dados: (a) Dados de identificação: nome completo, e-mail, CPF, telefone e endereço, fornecidos no momento do cadastro ou compra. (b) Dados de acesso: informações sobre como você utiliza nossa plataforma, incluindo páginas visitadas, tempo de acesso e dispositivo utilizado. (c) Dados de pagamento: processados por plataformas terceiras certificadas — não armazenamos dados de cartão de crédito. (d) Dados de comunicação: mensagens enviadas via formulários, WhatsApp ou e-mail.",
  },
  {
    title: "3. Finalidade do Tratamento",
    content: "Utilizamos seus dados para: prestação dos serviços contratados; comunicações relacionadas às suas formações; envio de informações sobre novos cursos e conteúdos (com possibilidade de descadastro a qualquer momento); cumprimento de obrigações legais e regulatórias; melhoria contínua dos nossos serviços; e prevenção de fraudes.",
  },
  {
    title: "4. Base Legal",
    content: "O tratamento dos seus dados é fundamentado nas seguintes bases legais previstas na LGPD: execução de contrato (art. 7º, V); cumprimento de obrigação legal (art. 7º, II); legítimo interesse (art. 7º, IX); e consentimento (art. 7º, I), quando aplicável.",
  },
  {
    title: "5. Compartilhamento de Dados",
    content: "Seus dados poderão ser compartilhados com: plataformas de pagamento (para processamento de transações); clubes parceiros (apenas dados necessários para a experiência prática); ferramentas de marketing e CRM (para comunicações autorizadas); e autoridades públicas, quando exigido por lei. Não vendemos nem cedemos seus dados para fins comerciais.",
  },
  {
    title: "6. Armazenamento e Segurança",
    content: "Seus dados são armazenados em servidores seguros com criptografia e controles de acesso adequados. Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição. Os dados são mantidos pelo prazo necessário para a prestação dos serviços ou conforme exigido por lei.",
  },
  {
    title: "7. Seus Direitos",
    content: "Nos termos da LGPD, você tem direito a: confirmar a existência de tratamento dos seus dados; acessar seus dados; corrigir dados incompletos ou incorretos; solicitar a anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade dos dados; revogação do consentimento; e oposição ao tratamento. Para exercer seus direitos, entre em contato conosco.",
  },
  {
    title: "8. Cookies e Tecnologias de Rastreamento",
    content: "Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdos. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site. Utilizamos também pixels de rastreamento de plataformas como Meta (Facebook) e Google para veiculação de anúncios relevantes.",
  },
  {
    title: "9. Links para Sites Externos",
    content: "Nosso site pode conter links para sites de terceiros, como plataformas de pagamento e clubes parceiros. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos que você consulte as políticas de privacidade de cada um deles.",
  },
  {
    title: "10. Alterações nesta Política",
    content: "Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos mudanças significativas por e-mail ou por aviso em destaque no site. O uso continuado dos nossos serviços após as alterações implica na aceitação da nova política.",
  },
  {
    title: "11. Contato e Encarregado (DPO)",
    content: "Para exercer seus direitos, tirar dúvidas ou fazer solicitações relacionadas aos seus dados pessoais, entre em contato conosco pelo WhatsApp disponível no site ou pelo e-mail indicado em nossa plataforma. Futebol Interativo — CNPJ 29.939.011/0001-13 — Natal, Rio Grande do Norte.",
  },
];

export default function PoliticaPrivacidadePage() {
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
              POLÍTICA DE PRIVACIDADE
            </h1>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.7 }}>
              Última atualização: junho de 2026
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-6" style={{ padding: "64px 24px" }}>

          {/* Aviso LGPD */}
          <div style={{ borderRadius: 14, border: "1px solid rgba(12,152,252,0.25)", background: "rgba(12,152,252,0.06)", padding: "20px 24px", marginBottom: 48, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C98FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.75)", margin: 0 }}>
              Esta política foi elaborada em conformidade com a <strong style={{ color: "#F4F4F4" }}>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>. Seus dados são tratados com segurança e transparência.
            </p>
          </div>

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