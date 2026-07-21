import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade — Futebol Interativo",
  description: "Política de privacidade e proteção de dados do Futebol Interativo.",
};

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

// Conteúdo espelhado de https://futebolinterativo.com/termos/politica-de-privacidade/index.html —
// cada parágrafo do documento oficial vira um item próprio, em vez de um bloco de texto único.
const sections: { title: string; content: string[] }[] = [
  {
    title: "1. Recolhimento e Manuseio de Dados",
    content: [
      "A Futebol Interativo poderá acessar, coletar, armazenar e, em alguns casos, revelar informações de seus Usuários e visitantes, relativas aos dados cadastrais, para terceiros, quando estes possuírem a natureza de fornecedores, parceiros, autoridades e pessoas físicas ou jurídicas que sustentem ter sido prejudicadas por Usuários cadastrados na Futebol Interativo.",
      "Há três tipos de Usuários credenciados a participar da rede interativa da Futebol Interativo: o visitante, o aulista e o professor. Para cada um, haverá o respectivo modelo de cadastro, contendo os dados pessoais necessários que deverão ser fornecidos.",
      "O Usuário visitante deverá fornecer, obrigatoriamente: nome; e-mail; login; senha.",
      "O Usuário aulista deverá fornecer, obrigatoriamente: nome; e-mail; login; senha; CPF; dados de cartão (caso opte por esse meio de pagamento). E, facultativamente: foto de perfil; endereço; sexo; identidade.",
      "O Usuário professor deverá fornecer, obrigatoriamente: nome; e-mail; senha.",
      "A Futebol Interativo terá, ainda, a faculdade de atestar a veracidade das informações prestadas, realizando consulta a órgãos públicos de emissão desses dados, tais como a Receita Federal, ou ainda bancos de dados específicos.",
      "O Usuário, ao se cadastrar na rede, está ciente e emite sua expressa anuência quanto à prática da Futebol Interativo em armazenar, de maneira criptografada, as trocas de mensagens eletrônicas entre os Usuários dentro da comunidade, com o objetivo de garantir a segurança dos próprios Usuários.",
    ],
  },
  {
    title: "2. Segurança dos Dados",
    content: [
      "Todos os dados coletados são armazenados em servidores da Futebol Interativo, guardados por uma \"hash\" (criptografia). Eventualmente, quando o cliente optar por pagar por suas compras se utilizando de cartão de crédito, o armazenamento desses dados será responsabilidade do gateway com o qual a Futebol Interativo trabalha, quais sejam, PagSeguro, Paypal e Pagar.me, restando a plataforma completamente salvaguardada de quaisquer responsabilidades quanto a isto.",
      "Entretanto, muito embora a Futebol Interativo se resguarde, utilizando padrões avançados em matéria de proteção de dados, é imprescindível conscientizar o Usuário para o fato de que, na internet, não há segurança total, ainda, infelizmente.",
      "Por isso, a Futebol Interativo se isenta de qualquer responsabilidade por intercepção ilegal de dados, bem como de violação dos seus sistemas e bases, não se responsabilizando, também, pela ilegal utilização de qualquer informação obtida por esses meios.",
    ],
  },
  {
    title: "3. Utilização dos Dados",
    content: [
      "A coleta de informações pessoais do Usuário tem um objetivo simples: fornecer o melhor e mais completo serviço, dentro da proposta de valor que a Futebol Interativo busca agregar.",
      "Sendo assim, o recolhimento que fazemos tem, entre outras, as seguintes funcionalidades: (1) auxiliar na comunicação entre aulistas, professores e entre ambas as categorias; (2) saber das necessidades de cada aulista e visitante, fazendo assim com que mais conteúdo que lhe interessa chegue até ele; (3) enviar, via e-mail, campanhas de publicidade acerca das atividades realizadas pela Futebol Interativo, novos serviços, promoções etc., bem como de atividades inacabadas realizadas pelos Usuários, tais como \"carrinhos\" de compra abandonados — o Usuário poderá solicitar, a qualquer tempo, que seja retirado da listagem de pessoas que receberão este conteúdo, clicando em \"não receber mais e-mails\"; (4) fornecer as informações necessárias às instituições que precisem atuar na resolução de conflitos.",
      "A Futebol Interativo não venderá, alugará ou compartilhará qualquer informação pessoal dos Usuários, a não ser por ocasião de força maior, expressamente prevista nesta Política de Privacidade.",
      "As informações que sempre foram de caráter público, por óbvio, não serão consideradas sigilosas e, por isso, não estarão sob o esteio das políticas de proteção e privacidade de dados da Futebol Interativo.",
      "Os Usuários possuirão sua senha pessoal de acesso quando efetivamente se cadastrarem, concretizando seu registro. Essa senha servirá para, além de entrar na plataforma, ter acesso aos materiais gratuitos e àqueles adquiridos. Com relação à sua proteção, a Futebol Interativo utiliza o sistema de autenticação que detém todo o processo de armazenamento de segurança e criptografia.",
      "O Usuário é inteiramente responsável por toda e qualquer operação que for realizada mediante a utilização de sua senha pessoal, o que inclui, por exemplo, compras, pagamentos, contatos com outros usuários, realização de atividades etc. Por isso mesmo, o Usuário é responsável pela administração da sua senha, não devendo repassá-la a outrem, e por quaisquer prejuízos causados pela má utilização do seu perfil.",
    ],
  },
  {
    title: "4. Exclusão de Conteúdo Impróprio",
    content: [
      "A Futebol Interativo se reserva no direito de manter em sua comunidade virtual um ambiente saudável, onde os Usuários se sintam à vontade para interagir entre si, trocando informações e esclarecendo matérias relacionadas aos cursos.",
      "Por isso, todo conteúdo considerado inapropriado para o ambiente, como linguajar ofensivo, discussões depreciativas, agressões de toda ordem e demais ocorrências afins, será taxativamente fiscalizado e excluído da rede de relacionamento dos Usuários, sem prejuízo das demais responsabilidades com as quais arca o Usuário de comentários pejorativos e/ou depreciativos.",
    ],
  },
  {
    title: "5. Da Expansão e Mutação da Plataforma",
    content: [
      "Como toda e qualquer empresa de tecnologia, é comum que a Futebol Interativo aperfeiçoe seu modo de atuar. Sua plataforma, como qualquer outra, estará em constante atualização e melhoramento, a fim de melhor atender os anseios e necessidades de todos os Usuários. Estes serão notificados em todas as ocasiões em que qualquer mudança ocorrer, para que tomem conhecimento e estejam antenados às novas regras e às eventuais alterações nas regras antigas, para que possam continuar dando a melhor utilidade possível à plataforma.",
      "Por isso, sugere-se que o Usuário esteja sempre atento às modificações que ocorrerão também nos Termos de Uso e na Política de Privacidade da empresa. A continuação da conta do Usuário dependerá, sempre, de sua expressa aceitação dos Termos e Condições de Uso e desta Política de Privacidade. Dessa forma, ambas as partes estarão sempre cientes de seus direitos e obrigações na relação jurídica travada, e ninguém será ou se sentirá lesado em nenhuma situação.",
    ],
  },
  {
    title: "6. Hipóteses de Revelação de Dados",
    content: [
      "A Futebol Interativo colabora, na medida de suas possibilidades, com a rigorosa obediência às leis pátrias, sobretudo no que diz respeito à segurança da dignidade de seus Usuários. Portanto, dados inicialmente sigilosos podem ser revelados às autoridades competentes, nos termos previstos na legislação brasileira, a fim de contribuir na busca pela punição de atividades ilegais.",
      "Não obstante, a Futebol Interativo se reserva no direito de revelar dados de Usuários a outros Usuários, em casos especialíssimos, quando entender haver alguma atividade ilícita nas atitudes de algum deles que possa vir a prejudicar outras pessoas, nos termos da legislação brasileira, a fim de garantir a dignidade de todo e qualquer Usuário que possa vir a ter seus direitos lesionados.",
    ],
  },
  {
    title: "7. Cancelamento da Conta e Alteração de Dados",
    content: [
      "O Usuário poderá excluir sua conta a qualquer tempo, indo até às configurações da plataforma. Todas as suas informações ficarão completamente indisponíveis para terceiros.",
      "A retificação dos dados se dá em ocasiões de necessidade. Ao se cadastrar, o Usuário contrai a responsabilidade pela veracidade e autenticidade dos dados informados, bem como assume o comprometimento em mantê-los sempre condizentes com a realidade.",
      "A Futebol Interativo se reserva no direito de manter guardados, sob sigilo, os dados informados inicialmente, a fim de utilizá-los na fiscalização e combate contra fraudações.",
    ],
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
              Última atualização: julho de 2026
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-6" style={{ padding: "64px 24px" }}>

          {/* preâmbulo — mesma saudação e explicação do documento oficial */}
          <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(140,200,245,0.08)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.8, color: "rgba(244,244,244,0.65)" }}>
              Olá, Usuário! Antes de iniciar a sua experiência na Futebol Interativo, é necessário que você leia com atenção a nossa Política de Privacidade, uma vez
              que ela vai ditar as diretrizes com as quais trabalharemos no manuseio e armazenamento dos dados e informações pessoais que precisam ser coletados
              para possibilitar a utilização da plataforma.
            </p>
            <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.8, color: "rgba(244,244,244,0.65)" }}>
              Ao aceitar os termos desta Política de Privacidade, você se mostra de acordo com a coleta, armazenamento, uso e divulgação de suas informações
              pessoais, nos termos que serão a seguir apresentados. A eventual não aceitação desta Política de Privacidade acarreta a impossibilidade de utilização
              da plataforma. Esta Política de Privacidade se aplica a todo e qualquer Usuário cadastrado e é parte integrante dos Termos e Condições de uso da
              Futebol Interativo.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {sections.map((s) => (
              <div key={s.title} style={{ borderBottom: "1px solid rgba(140,200,245,0.08)", paddingBottom: 40 }}>
                <h2 style={{ fontFamily: F, fontSize: "clamp(18px,2.5vw,24px)", lineHeight: 1, color: "#F4F4F4", marginBottom: 14 }}>
                  {s.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {s.content.map((p, i) => (
                    <p key={i} style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.8, color: "rgba(244,244,244,0.65)" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* rodapé — dados da empresa e contato, igual ao fim do documento oficial */}
          <div style={{ marginTop: 8 }}>
            <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "rgba(244,244,244,0.8)", marginBottom: 6 }}>
              FUTEBOL INTERATIVO TREINAMENTOS LTDA. — CNPJ nº 29.939.011/0001-13
            </p>
            <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.5)" }}>
              Contato: <a href="mailto:contato@futebolinterativo.com" style={{ color: "#A9D8F5", textDecoration: "none" }}>contato@futebolinterativo.com</a>
            </p>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}