import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Termos de Uso — Futebol Interativo",
  description: "Termos de uso do Futebol Interativo.",
};

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

// Conteúdo espelhado de https://futebolinterativo.com/termos/index.html —
// cada item da ementa numerada (1.1, 1.2 etc.) vira um parágrafo próprio,
// em vez de um bloco único de texto corrido.
const sections: { title: string; content: string[] }[] = [
  {
    title: "1. Objeto",
    content: [
      "1.1. Desde logo, fica esclarecido aos usuários que a Futebol Interativo consiste em uma plataforma digital cuja responsabilidade é unicamente veicular e ministrar conteúdo didático e instrutivo acerca das práticas futebolísticas; sem que para tal, caracterize-se como Instituição de Ensino. Para mais, é de sua competência, ainda, promover, no âmbito dos cursos ofertados pelo Futebol Interativo, o contato de seus usuários aulistas, selecionados com base em critério de avaliação definido exclusivamente pelo Futebol Interativo, com clubes de futebol parceiros do Futebol Interativo, para fins de propiciar-lhes uma experiência prática nas respectivas áreas de ensino objeto dos cursos ofertados.",
      "1.2. Os produtos que podem ser ofertados pela presente plataforma, de modo gratuito ou oneroso, permanecem disponíveis para acesso por prazo indeterminado, têm a modalidade de obtenção informada assim que lançados e incluem, sem limitação, os seguintes: (i) E-books; (ii) Interativo Talk — o maior e mais democrático evento on-line da comunidade do futebol, mediante o qual se veicula, ao vivo, um diálogo entre profissionais e pesquisadores de referência no futebol brasileiro e mundial, permanecendo o material gravado disponível para acesso posterior; (iii) MasterClass — aula inaugural de cada curso, em formato de amostra grátis, para interessados no tema experienciarem o funcionamento dos cursos da Futebol Interativo, também disponível gravada após a transmissão; (iv) Footalk — material audiovisual que apresenta o conteúdo e os bastidores de um evento presencial.",
      "1.3. Os produtos ofertados pela presente plataforma na modalidade paga permanecem disponíveis para acesso por prazo determinado e são os seguintes: (i) Cursos — com duração média de 3 (três) meses e inscrições limitadas à data de início da turma, consistem em lições didáticas continuadas, ministradas por meio de vídeo-aulas, acompanhadas de material instrutivo em formatos diversos; o rendimento dos participantes é mensurado por meio de avaliações periódicas, as quais poderão, a exclusivo critério do Futebol Interativo, ser utilizadas para fins de seleção dos usuários aulistas em experiência prática junto a clube de futebol parceiro. (ii) Experiência prática/Estágio — a oportunidade de estágio ofertada pelo Futebol Interativo em clube de futebol profissional parceiro não depende do pagamento de valor adicional ao montante pago no ato da contratação do curso, sendo certo que todos e quaisquer custos e despesas relacionados ao curso (incluindo, sem limitação, deslocamento, alimentação e vestimenta) serão desembolsados exclusivamente pelos usuários aulistas, sem reembolso pelo Futebol Interativo; caso apto, o Futebol Interativo proporciona o contato com o clube para experiência prática por período e carga horária a serem informados, ficando excluída qualquer relação de subordinação, vínculo empregatício ou previdenciário entre clube e egresso do curso; a experiência prática é regida por uma política de embarques e remanejamento, disponibilizada ao usuário aulista previamente ao início da experiência prática. (iii) Congresso FC — congresso virtual realizado através da plataforma online, cuja primeira edição é disponibilizada gratuitamente; demais edições poderão ocorrer a título gratuito ou oneroso, a critério do Futebol Interativo, que informará a modalidade ao anunciá-lo; o conteúdo é veiculado ao vivo e posteriormente gravado, permanecendo disponível na plataforma durante 7 dias consecutivos.",
      "1.4. Para que se considere devidamente realizada, a experiência prática promovida pelo Futebol Interativo junto a clubes profissionais de futebol parceiros não estará sujeita à satisfação de condições subjetivas intrínsecas aos respectivos usuários aulistas, de modo que o não atendimento de suas expectativas ou a insatisfação quanto à estrutura do clube parceiro, tratamento despendido por este aos usuários aulistas ou exigências impostas pelo clube parceiro, dentre outros casos, não poderão ser interpretados como descumprimento de qualquer das obrigações assumidas pelo Futebol Interativo junto aos usuários aulistas.",
      "1.5. Ressalvado o direito de arrependimento previsto na legislação aplicável, os usuários aulistas não terão direito ao reembolso do valor pago ao Futebol Interativo para fins de matrícula nos produtos ofertados.",
    ],
  },
  {
    title: "2. Categorias de Usuários",
    content: [
      "2.1. Há 3 (três) categorias de usuários da plataforma Futebol Interativo: os Usuários Visitantes, os Usuários Aulistas e os Usuários Professores.",
      "(i) Os Usuários Visitantes efetuam cadastro nesta plataforma digital com o único escopo de acompanhar os conteúdos gratuitamente disponibilizados.",
      "(ii) Os Usuários Aulistas, por sua vez, são usuários visitantes com a qualificação de participantes dos cursos online nos quais realizem a devida inscrição, valendo-se de todos os direitos, deveres e prerrogativas inerentes durante o gozo deste produto.",
      "(iii) Já os Usuários Professores têm seus cadastros realizados pela própria Futebol Interativo, mediante os quais lhes são conferidas todas as funcionalidades do Usuário Comum, em compasso com aquelas especiais que lhes permitem exercer sua atividade fim na plataforma.",
    ],
  },
  {
    title: "3. Cadastro",
    content: [
      "3.1. O cadastramento dos Usuários só será confirmado após preenchidos todos os campos indispensáveis ao cadastro: Nome, Login, E-mail e Senha. O preenchimento dos demais campos é opcional.",
      "3.2. Quando de seu cadastramento, os Usuários comprometem-se a fornecer informações verídicas, precisas e fidedignas a respeito de si, sendo certo que o Futebol Interativo não será responsável por eventuais danos e/ou perdas ocasionados aos Usuários em virtude da inveracidade, imprecisão ou inexatidão dos dados fornecidos. À Futebol Interativo fica resguardada a prerrogativa de excluir ou bloquear os cadastros nos quais identifique inverdades ou imprecisões atentatórias à benemérita utilização da plataforma.",
      "3.3. Manter seus dados cadastrais atualizados é responsabilidade exclusiva de cada Usuário. A Futebol Interativo não será responsabilizada caso o canal de comunicação plataforma/cliente reste prejudicado por eventual desatualização.",
      "3.4. No ato do cadastramento, o usuário escolhe discricionariamente quais informações de seu cadastro permanecerão públicas perante os demais usuários da plataforma.",
      "3.5. O cadastro na plataforma garante ao usuário o status de visitante. Para tornar-se um Usuário Aulista será necessário diligenciar a compra do produto \"curso\" em aba apartada, por intermédio dos gateways de pagamento PagSeguro, Paypal e Pagar.me.",
    ],
  },
  {
    title: "4. Obrigações dos Usuários",
    content: [
      "4.1. Todos os usuários são obrigados a aceitar os presentes Termos de Uso em sua integralidade, de acordo com seus respectivos termos e condições.",
      "4.2. Todos os usuários restam obrigados a preencher os campos obrigatórios de seus cadastros, para que sejam devidamente validados.",
      "4.3. Todos os Usuários ficam obrigados a manterem entre si relações respeitosas e íntegras, sob pena de, não o fazendo, terem seus cadastros excluídos da plataforma, sem que a eles seja devida qualquer indenização ou o reembolso de quaisquer valores despendidos para fins de contratação de quaisquer produtos comercializados pelo Futebol Interativo.",
      "4.4. Todas as opiniões expressas pelos usuários desta plataforma não representam a posição do Futebol Interativo, mas tão somente de quem a escreveu, ficando todos obrigados a manterem entre si relações respeitosas à dignidade da pessoa humana, sob pena de, não o fazendo, terem seus comentários ou cadastros excluídos, a exclusivo critério do Futebol Interativo.",
      "4.5. Resta vedado a todos os usuários o compartilhamento de conteúdo publicitário alheio à Futebol Interativo no seio desta plataforma, sob pena de bloqueio ou exclusão do cadastro, a critério do Futebol Interativo, que não se responsabiliza por qualquer dano ou prejuízo ocasionado por este desvio de finalidade de terceiros.",
      "4.6. Compete a todos os usuários utilizar a plataforma pelo seu próprio esforço, já que todas as funcionalidades disponibilizadas são autoexplicativas e propiciam a autogerência.",
      "4.7. É obrigação de todos os usuários estabelecer contato única e exclusivamente por meio de e-mail disponibilizado pelo Futebol Interativo, considerado o meio oficial de comunicação. Contato estabelecido por quaisquer outros meios pode vir a ser respondido, a critério e conveniência do Futebol Interativo.",
      "4.8. Ao adquirir um produto ofertado onerosamente, o usuário responsabiliza-se por se cadastrar no gateway de pagamento e adimplir com o montante correspondente, em contraprestação aos serviços e benefícios inerentes a ele.",
      "4.9. Aos usuários aulistas compete atentar para o cronograma de atividades, assistindo às vídeo-aulas em tempo hábil e cumprindo as avaliações tempestivamente, recomendando-se fortemente que se utilizem apenas da funcionalidade disponível na plataforma para o saneamento de dúvidas.",
      "4.10. Aos usuários professores compete atentar para o cronograma de atividades, ministrando tempestivamente as vídeo-aulas devidas, corrigindo as atividades avaliativas, sanando as dúvidas dos usuários aulistas e disponibilizando à gerência da Futebol Interativo os resultados destes.",
      "4.11. Os usuários professores são obrigados a manter sigilo quanto às notas do seu alunado perante qualquer terceiro, à exceção apenas da gerência da própria Futebol Interativo.",
    ],
  },
  {
    title: "5. Obrigações do Futebol Interativo",
    content: [
      "5.1. A Futebol Interativo resta obrigada a disponibilizar plataforma virtual capaz de acolher as relações travadas entre as diferentes categorias de usuários, bem como deles com os produtos disponibilizados.",
      "5.2. Cabe à Futebol Interativo ofertar os meios de pagamento on-line, de modo que os usuários visitantes e aulistas possam proceder com compra de produtos onerosos, com segurança, rapidez e proteção digital.",
      "5.3. A Futebol Interativo obriga-se a proteger, por meio de armazenamento em servidores e tecnologias de criptografia de dados, a confidencialidade de todas as informações veiculadas por seus usuários — ressalvado que a proteção de dados bancários, operações financeiras ou transações monetárias advindas da compra de produtos pagos compete ao gateway de pagamento, não à Futebol Interativo.",
      "5.4. Em face de cursos didáticos, a Futebol Interativo responsabiliza-se exclusivamente pelos contatos e documentos estabelecidos por meio da plataforma. Em hipóteses excepcionais, o contato deverá se dar exclusivamente via canal de comunicação oficial (e-mail).",
      "5.5. Compete à Futebol Interativo disponibilizar tempestivamente os conteúdos programáticos de seus produtos, bem como emitir os certificados dos cursos didáticos imediatamente após a divulgação dos resultados finais.",
      "5.6. Quando aplicável, a Futebol Interativo obriga-se a garantir vaga de experiência prática em clube de futebol profissional parceiro para os usuários aulistas selecionados a seu exclusivo critério, nos termos da Cláusula 1.1.",
      "5.7. A Futebol Interativo obriga-se, ainda, a colher de seus usuários autorizações expressas e apartadas deste documento acerca da permissão para enviar conteúdo de marketing via e-mail, bem como para veicular, com fins publicitários, imagem, depoimentos e conteúdos produzidos por eles ou em conjunto com eles.",
    ],
  },
  {
    title: "6. Experiências Práticas",
    content: [
      "6.1. Mediante a aceitação destes Termos de Uso, o Usuário Aulista declara estar ciente da localização, data e duração da experiência prática agendada, não sendo responsabilidade do Futebol Interativo eventuais custos extras — notadamente, mas não somente, de transporte, hospedagem e/ou alimentação — com os quais o Usuário Aulista venha a arcar em razão da participação na experiência prática.",
      "6.2. O Futebol Interativo e/ou o clube parceiro não se responsabilizam por qualquer dano, físico, patrimonial ou extrapatrimonial, sofrido pelo Usuário Aulista no âmbito da experiência prática, incluindo furtos, perdas de objetos pessoais, lesões, quedas, acidentes, intoxicação alimentar ou quaisquer outras situações, não havendo nexo causal entre o dano ocorrido e qualquer ato comissivo ou omissivo do Futebol Interativo e/ou do clube parceiro.",
      "6.3. O agendamento da experiência é de responsabilidade do Usuário Aulista e do Futebol Interativo, em conjunto, devendo o Usuário Aulista contatar o Futebol Interativo e informar, com no máximo dois meses de antecedência, a data e o clube (dentre os parceiros à época) em que deseja realizar sua prática.",
      "6.4. Em caso de necessidade de reagendamento por culpa exclusiva do Usuário Aulista, este terá direito ao reagendamento uma única vez, sendo certo que: (a) o Usuário Aulista não poderá mais realizar sua experiência prática no clube originalmente selecionado, a menos que este seja novamente escolhido de comum acordo entre clube parceiro, Futebol Interativo e Usuário Aulista; (b) o Usuário Aulista não poderá realizar sua experiência prática nos próximos 90 dias subsequentes ao reagendamento.",
      "6.5. Em caso de reagendamento, os Usuários Aulistas deverão entrar em contato e registrar de forma expressa, com o Futebol Interativo, obrigatoriamente através do e-mail experienciaspraticas@futebolinterativo.com ou pelo telefone do setor de experiências: (11) 95583-3800.",
      "6.6. A experiência prática poderá ser realizada em 1 (um) clube parceiro do Futebol Interativo, considerado como tal à época da realização, desde que este disponibilize vagas relacionadas aos respectivos cursos contratados; o Futebol Interativo não tem obrigação de promover a experiência prática em clube que deixou de ser parceiro após a contratação do curso pelo aluno.",
      "6.7. Em caso de falta ou desistência do aluno em comparecer ao clube no início da prática, a experiência prática será considerada realizada, não restando pendência do Futebol Interativo junto ao Usuário Aulista.",
      "6.8. O clube, através do Futebol Interativo, reserva-se o direito de cancelar a experiência prática em situações excepcionais, como casos de força maior, indisponibilidade de recursos humanos ou outros motivos relevantes — hipótese em que os alunos poderão reagendar a prática sem penalidades. Caso o cancelamento esteja relacionado a comportamento inadequado dos alunos, que não sigam as diretrizes orientadas no período anterior ao início da prática, a experiência prática restará cancelada em definitivo, sem prejuízo para o clube ou o Futebol Interativo.",
      "6.9. Mediante comparecimento do Usuário Aulista ao clube parceiro selecionado (ainda que uma única vez), a experiência prática será considerada devidamente realizada, não restando pendência do Futebol Interativo junto ao aluno.",
    ],
  },
  {
    title: "7. Direito de Cancelamento",
    content: [
      "7.1. Os Usuários Aulistas poderão, no prazo de 7 (sete) dias contados da matrícula nos cursos ofertados pelo Futebol Interativo ou da disponibilização do produto contratado, exercer seu direito de arrependimento e desistir do contrato celebrado, caso em que os valores eventualmente pagos até a data da desistência serão devolvidos aos respectivos Usuários Aulistas.",
      "7.2. O reembolso dos valores pagos não será devido caso o direito de arrependimento seja manifestado em prazo diverso daquele previsto no item 7.1.",
      "7.3. Para fins de formalização do direito de arrependimento previsto nos itens 7.1 e 7.2, os Usuários Aulistas deverão, necessariamente, encaminhar comunicação escrita para o contato de suporte mantido pelo Futebol Interativo — Experiência do aluno: (11) 94200-9407 — sendo certo que a comunicação realizada por meio diverso não será contabilizada para a contagem do prazo descrito nesta cláusula.",
    ],
  },
  {
    title: "8. Modificação destes Termos de Uso",
    content: [
      "8.1. A Futebol Interativo poderá, a qualquer tempo, atualizar as disposições destes Termos de Uso, com o escopo do constante aprimoramento de suas disposições, desde que comunique seus Usuários através de meios de contato idôneos e oportunize a opção de concordância com as novas cláusulas.",
      "8.2. As modificações começarão a viger na data de sua implementação, e a manutenção do status de usuário ativo desta plataforma estará condicionada à anuência expressa dos usuários às novas cláusulas regentes do seu funcionamento e utilização.",
    ],
  },
  {
    title: "9. Direitos Autorais",
    content: [
      "9.1. Ficam resguardados à Futebol Interativo os direitos autorais de posse e de propriedade sobre os produtos oriundos de suas atividades viabilizadas nesta plataforma, bem como de todo o material do qual dispor para gerenciá-las, prestá-las e executá-las — inclusive aqueles desenvolvidos pelos Usuários Professores enquanto em função da startup.",
    ],
  },
  {
    title: "10. Aceitação destes Termos de Uso",
    content: [
      "10.1. Todos os Usuários declaram ter lido e aceitado, integralmente, as disposições contidas nestes Termos de Uso.",
    ],
  },
  {
    title: "11. Foro",
    content: [
      "11.1. Para dirimir quaisquer controvérsias existentes entre a Futebol Interativo e seus Usuários, fica eleito o Foro da Comarca de Natal, Estado do Rio Grande do Norte.",
    ],
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
              Última atualização: julho de 2026
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-6" style={{ padding: "64px 24px" }}>

          {/* preâmbulo — identificação da empresa, igual ao topo do documento oficial */}
          <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.8, color: "rgba(244,244,244,0.65)", marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(140,200,245,0.08)" }}>
            Estes Termos e Condições Gerais de uso aplicam-se aos serviços prestados nesta plataforma pela startup <strong style={{ color: "#F4F4F4" }}>Futebol Interativo</strong>,
            pessoa jurídica devidamente registrada sob o Cadastro Nacional das Pessoas Jurídicas do Ministério da Fazenda (&ldquo;CNPJ/MF&rdquo;) sob o nº 29.939.011/0001-13,
            com sede em CIVT – UFRN, Av. Senador Salgado Filho, 3000, Lagoa Nova, CEP 59.078-970, Natal/RN, neste ato representada nos termos de seu contrato social (&ldquo;Futebol Interativo&rdquo;).
          </p>

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