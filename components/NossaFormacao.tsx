const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const profissionais = [
  { src: "https://tonojogo.futebolinterativo.com/futebolinterativo/FELIPE%20MELO.webp", alt: "Felipe Melo" },
  { src: "https://tonojogo.futebolinterativo.com/futebolinterativo/FERNANDO%20PRASS.webp", alt: "Fernando Prass" },
  { src: "https://tonojogo.futebolinterativo.com/futebolinterativo/PEDRINHO.webp", alt: "Pedrinho" },
  { src: "https://tonojogo.futebolinterativo.com/futebolinterativo/DANILO%20FERNANDES.webp", alt: "Danilo Fernandes" },
];

export default function NossaFormacao() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg,#03263F 0%,#04395f 50%,#03263F 100%)",
        padding: "clamp(40px,7vh,80px) 0",
        overflow: "hidden",
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          textAlign: "center",
          padding: "0 clamp(18px,4vw,64px)",
          marginBottom: "clamp(24px,4vh,40px)",
        }}
      >
        <p
          style={{
            fontFamily: M,
            fontWeight: 700,
            fontSize: "clamp(10px,2.4vw,13px)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#A9D8F5",
            marginBottom: 10,
          }}
        >
          CONHEÇA PROFISSIONAIS DO FUTEBOL QUE JÁ FIZERAM
        </p>
        <h2
          style={{
            fontFamily: F,
            fontWeight: 400,
            fontSize: "clamp(30px,8vw,58px)",
            lineHeight: 0.95,
            letterSpacing: "0.01em",
            color: "#ffffff",
            margin: 0,
          }}
        >
          NOSSA FORMAÇÃO
        </h2>
      </div>

      {/* Grid de cards */}
      <div
        className="nossa-formacao__grid"
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 clamp(16px,4vw,40px)",
        }}
      >
        {profissionais.map((p) => (
          <div
            key={p.alt}
            style={{ borderRadius: 16, overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 16 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}