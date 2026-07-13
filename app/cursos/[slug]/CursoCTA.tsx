"use client";
import type { Curso } from "@/lib/cursos";

export default function CursoCTA({ curso, cor = "#4096F2" }: { curso: Curso; cor?: string }) {
  const url = curso.checkoutUrl || curso.externalUrl;
  const match = curso.preco?.match(/(\d+)[xX]\s*R\$\s*(\d[\d.]*),(\d{2})/);
  const parcelas = match?.[1];
  const inteiro = match?.[2];
  const cents = match?.[3];
  const avista = curso.precoAvista?.replace(/^R\$\s*/, "").trim();

  const items = [
    "Acesso irrestrito a todo o ecossistema do curso",
    "Certificação emitida oficial e chancelada",
    "Mentorias e suporte individualizado direto",
    "Acesso à comunidade exclusiva de networking FI",
    "Prática garantida alocado em clube parceiro",
  ];

  return (
    <div
      className="h-full rounded-3xl border overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col justify-between bg-gradient-to-b from-[#0F2744] to-[#0A1E35]"
      style={{ borderColor: `${cor}40` }}
    >
      <div>
        <div className="p-6 border-b border-white/[0.06] bg-black/10">
          <p className="[font-family:var(--font-montserrat)] text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300/50">
            Benefícios inclusos no acesso
          </p>
        </div>
        <div className="p-6">
          <ul className="flex flex-col gap-3.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 [font-family:var(--font-montserrat)] text-sm font-medium text-gray-300/90 leading-tight">
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="9" cy="9" r="8.5" fill={`${cor}20`} stroke={`${cor}50`} strokeWidth="1" />
                  <path d="M5 9l2.5 2.5L13 6.5" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 border-t border-white/[0.06] bg-black/15">
        <div className="text-center mb-6">
          <p className="[font-family:var(--font-montserrat)] text-xs font-semibold text-blue-300/40 mb-2 uppercase tracking-widest">
            Matrícula promocional
          </p>

          {match ? (
            <>
              <div className="flex items-baseline justify-center gap-1.5 leading-none">
                <span className="[font-family:var(--font-anton)] text-lg text-gray-400 font-bold tracking-tight">{parcelas}x de R$</span>
                <span className="[font-family:var(--font-anton)] text-5xl sm:text-6xl text-white tracking-tight leading-none">{inteiro}</span>
                <span className="[font-family:var(--font-anton)] text-xl text-gray-400 font-bold">,{cents}</span>
              </div>
              {avista && (
                <p className="[font-family:var(--font-montserrat)] text-xs text-gray-400/80 mt-3">
                  ou <strong className="text-gray-200 font-bold">R$ {avista}</strong> pagamento à vista
                </p>
              )}
            </>
          ) : curso.preco ? (
            <p className="[font-family:var(--font-anton)] text-3xl text-white">{curso.preco}</p>
          ) : null}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 w-full p-4 pl-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-400/20 text-white transition-all duration-300 hover:brightness-110 shadow-lg shadow-emerald-950/40 active:scale-[0.98]"
        >
          <span className="[font-family:var(--font-montserrat)] font-bold text-sm">Garantir minha vaga agora</span>
          <span className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center flex-shrink-0">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </a>
      </div>
    </div>
  );
}