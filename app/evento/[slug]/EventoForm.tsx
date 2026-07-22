"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Evento } from "@/lib/eventos";
import { getFiCampanha } from "@/lib/eventos";
import { MOMENTO_OPCOES, INVESTIMENTO_OPCOES, COUNTRIES, formatPhone } from "@/components/HubspotContactForm";

const FB = "[font-family:var(--font-montserrat)]";

type Status = "idle" | "loading" | "error";

// Lê só as UTMs que realmente vierem na URL do link de campanha que trouxe a
// pessoa até a página — nada aqui é pré-definido/fixo. Se o link não tiver
// uma dessas UTMs, ela simplesmente não é enviada (mesmo padrão já usado em
// components/HubspotContactForm.tsx).
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

const ICON_WRAP = "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/35";
const inputBase =
  "w-full rounded-xl border border-white/[0.14] bg-white/[0.05] pl-11 pr-4 py-4 text-[15.5px] text-white placeholder-white/35 outline-none transition-colors focus:border-[#0C98FC]/60 focus:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[#0C98FC]/40";
const selectBase = `${inputBase} appearance-none cursor-pointer pr-10`;
const labelClass = `${FB} block text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/45 mb-2`;

/* ─── ícones inline, pra não depender de biblioteca externa ─────────── */
const IconUser = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconMail = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M4 6.5l7.4 6a1 1 0 001.2 0L20 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconChevron = ({ className = "" }: { className?: string }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${className}`}>
    <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.45)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function EventoForm({ evento }: { evento: Evento }) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("BR");
  const [whatsapp, setWhatsapp] = useState("");
  const [momento, setMomento] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (nome.trim().length < 3) { setErro("Digite seu nome completo."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErro("Digite um e-mail válido."); return; }
    const digits = whatsapp.replace(/\D/g, "");
    const minLen = country === "BR" ? 10 : 8;
    if (digits.length < minLen) { setErro("Digite um WhatsApp válido, com DDD."); return; }
    if (!momento) { setErro("Selecione uma opção em \"qual o momento da sua carreira\"."); return; }
    if (!investimento) { setErro("Selecione uma opção em \"quanto já investiu em educação\"."); return; }

    setErro("");
    setStatus("loading");

    const [firstname, ...rest] = nome.trim().split(" ");
    try {
      const res = await fetch("/api/hubspot-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          properties: {
            email: email.trim(),
            firstname,
            lastname: rest.join(" ") || firstname,
            phone: `${selectedCountry.dial}${digits}`,
            qual_o_momento_da_carreira: momento,
            fi_investimento_educacao_12m: investimento,
            // Identificação estável do evento — sempre no formato
            // "evento-nome-do-evento-dd-mm-aa", gerado automaticamente (nunca
            // digitado à mão) pra garantir que o mesmo evento sempre produza
            // o mesmo valor, com ou sem UTM de campanha na URL.
            fi_campanha: getFiCampanha(evento),
            // UTMs reais da campanha, sem nenhum valor fixo — só o que
            // realmente vier na URL de quem clicou no link.
            ...getUtmParams(),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Algo deu errado. Tente novamente.");
      router.push(`/evento/${evento.slug}/obrigado`);
    } catch (err) {
      setStatus("error");
      setErro(err instanceof Error ? err.message : "Não foi possível enviar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={onSubmit} id="formulario-padrao-eventos" name="Formulário padrão de eventos">
      <div className="flex flex-col gap-5">
      {/* Nome + E-mail — lado a lado a partir do sm, cada um com rótulo e ícone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ev-nome" className={labelClass}>Nome</label>
          <div className="relative">
            <span className={ICON_WRAP}><IconUser /></span>
            <input
              id="ev-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              autoComplete="name"
              className={inputBase}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ev-email" className={labelClass}>E-mail</label>
          <div className="relative">
            <span className={ICON_WRAP}><IconMail /></span>
            <input
              id="ev-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              autoComplete="email"
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp com seletor de DDI — rótulo único pro grupo inteiro */}
      <div>
        <label className={labelClass}>WhatsApp</label>
        <div className="flex items-stretch rounded-xl border border-white/[0.14] bg-white/[0.05] overflow-hidden focus-within:border-[#0C98FC]/60 focus-within:bg-white/[0.08] transition-colors">
          <div className="relative flex items-center flex-shrink-0">
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setWhatsapp(formatPhone(whatsapp, e.target.value)); }}
              aria-label="País"
              className="appearance-none bg-transparent border-none text-white pl-4 pr-7 py-4 text-[15.5px] outline-none cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="text-[#03263F]">{c.flag} {c.dial}</option>
              ))}
            </select>
            <IconChevron className="right-2.5" />
          </div>
          <div className="w-px self-stretch my-2.5 bg-white/[0.14] flex-shrink-0" />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(formatPhone(e.target.value, country))}
            placeholder={country === "BR" ? "(00) 00000-0000" : "Número de WhatsApp"}
            inputMode="numeric"
            autoComplete="tel"
            className="flex-1 min-w-0 bg-transparent border-none text-white placeholder-white/35 px-4 py-4 text-[15.5px] outline-none"
          />
        </div>
      </div>

      {/* Momento da carreira */}
      <div>
        <label htmlFor="ev-momento" className={labelClass}>Qual o momento da sua carreira?</label>
        <div className="relative">
          <select
            id="ev-momento"
            value={momento}
            onChange={(e) => setMomento(e.target.value)}
            className={`${selectBase} ${momento ? "text-white" : "text-white/35"}`}
          >
            <option value="" disabled>Selecione uma opção</option>
            {MOMENTO_OPCOES.map((o) => (
              <option key={o.value} value={o.value} className="text-[#03263F]">{o.label}</option>
            ))}
          </select>
          <IconChevron className="right-4" />
        </div>
      </div>

      {/* Investimento em educação */}
      <div>
        <label htmlFor="ev-investimento" className={labelClass}>Nos últimos 12 meses, quanto já investiu em educação?</label>
        <div className="relative">
          <select
            id="ev-investimento"
            value={investimento}
            onChange={(e) => setInvestimento(e.target.value)}
            className={`${selectBase} ${investimento ? "text-white" : "text-white/35"}`}
          >
            <option value="" disabled>Selecione uma opção</option>
            {INVESTIMENTO_OPCOES.map((o) => (
              <option key={o.value} value={o.value} className="text-[#03263F]">{o.label}</option>
            ))}
          </select>
          <IconChevron className="right-4" />
        </div>
      </div>

      {erro && <p className={`${FB} text-[13px] text-red-400`}>{erro}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${FB} mt-1 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-4.5 text-base font-bold text-white shadow-[0_10px_30px_rgba(8,194,122,0.4)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-white/60 outline-none`}
      >
        {status === "loading" ? "Enviando..." : (evento.ctaText ?? "Garantir minha vaga gratuita")}
        {status !== "loading" && (
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </button>

      {evento.microcopy && (
        <p className={`${FB} text-center text-[13px] text-white/40 leading-relaxed mt-1`}>{evento.microcopy}</p>
      )}
      </div>
    </form>
  );
}