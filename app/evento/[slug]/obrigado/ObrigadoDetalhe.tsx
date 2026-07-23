"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Evento } from "@/lib/eventos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const DARK = "#010E1B";
const NAVY = "#03263F";
const AZUL = "#0C98FC";

const REDIRECT_SECONDS = 8;

export default function ObrigadoDetalhe({ evento }: { evento: Evento }) {
  const temGrupo = Boolean(evento.whatsappGroupUrl);
  const [restante, setRestante] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (!temGrupo) return;
    const id = setInterval(() => {
      setRestante((s) => {
        if (s <= 1) {
          clearInterval(id);
          window.location.href = evento.whatsappGroupUrl!;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temGrupo]);

  const progresso = temGrupo ? Math.round(((REDIRECT_SECONDS - restante) / REDIRECT_SECONDS) * 50) + 50 : 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: DARK }}>
      <header className="flex items-center justify-center py-8">
        <Link href="/" aria-label="Futebol Interativo">
          <Image src="/images/logo.png" alt="Futebol Interativo" width={110} height={30} style={{ height: 28, width: "auto" }} />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-[480px] w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#08C27A]/15 border-2 border-[#08C27A]/40 flex items-center justify-center mx-auto mb-7">
            <svg width={26} height={26} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          <h1 style={{ fontFamily: F, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.1, color: "#F4F4F4" }} className="mb-3">
            {temGrupo ? (
              <>SUA INSCRIÇÃO ESTÁ <span style={{ color: AZUL }}>QUASE CONCLUÍDA!</span></>
            ) : (
              <>INSCRIÇÃO <span style={{ color: AZUL }}>CONFIRMADA!</span></>
            )}
          </h1>

          {temGrupo && (
            <>
              {/* barra de progresso — mostra a inscrição avançando de 50%
                  (formulário preenchido) até 100% (grupo do WhatsApp) */}
              <div className="mb-2 mt-6">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progresso}%`, background: `linear-gradient(90deg,${AZUL},#08C27A)` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(169,216,245,0.5)" }}>Sua inscrição</span>
                  <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, color: "rgba(169,216,245,0.5)" }}>{progresso}%</span>
                </div>
              </div>

              <p style={{ fontFamily: M, fontSize: 17, color: "rgba(244,244,244,0.75)", lineHeight: 1.65 }} className="mb-8 mt-6">
                É muito importante que você <strong style={{ color: "#F4F4F4" }}>entre no grupo do WhatsApp</strong> para concluir sua inscrição — lá vamos compartilhar <strong style={{ color: "#F4F4F4" }}>comunicações e materiais exclusivos</strong> pra tornar sua experiência ainda melhor.
              </p>

              <a
                href={evento.whatsappGroupUrl}
                className="inline-flex items-center gap-3 rounded-2xl px-8 py-4.5 transition-transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                style={{ background: "#25D366", boxShadow: "0 0 40px rgba(37,211,102,0.4)" }}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <span style={{ fontFamily: M, fontWeight: 700, fontSize: 16, color: "#fff" }}>Entrar no grupo do WhatsApp</span>
              </a>

              <p style={{ fontFamily: M, fontSize: 12.5, color: "rgba(244,244,244,0.3)" }} className="mt-5">
                Redirecionando automaticamente em {restante}s...
              </p>
            </>
          )}

          {!temGrupo && (
            <p style={{ fontFamily: M, fontSize: 17, color: "rgba(244,244,244,0.75)", lineHeight: 1.65 }} className="mb-2">
              Recebemos sua inscrição. Você vai receber os detalhes de acesso por e-mail e WhatsApp antes do evento.
            </p>
          )}
        </div>
      </main>

      <footer style={{ background: NAVY }} className="border-t border-white/[0.06] py-6 text-center">
        <p style={{ fontFamily: M, fontSize: 11, color: "rgba(244,244,244,0.3)" }}>© 2026 Futebol Interativo</p>
      </footer>
    </div>
  );
}