"use client";
import { useEffect, useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Status = "idle" | "loading" | "success" | "error";

const COUNTRIES = [
  { code: "BR", label: "Brasil", dial: "+55", flag: "🇧🇷" },
  { code: "PT", label: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "ES", label: "Espanha", dial: "+34", flag: "🇪🇸" },
  { code: "US", label: "Estados Unidos", dial: "+1", flag: "🇺🇸" },
  { code: "AR", label: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "MX", label: "México", dial: "+52", flag: "🇲🇽" },
  { code: "CO", label: "Colômbia", dial: "+57", flag: "🇨🇴" },
  { code: "CL", label: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "UY", label: "Uruguai", dial: "+598", flag: "🇺🇾" },
  { code: "PY", label: "Paraguai", dial: "+595", flag: "🇵🇾" },
] as const;

const IDADE_OPCOES = [
  { label: "Menor de 18 anos", value: "Menor de 18 anos" },
  { label: "Maior ou igual 18 anos", value: "Maior ou igual 18 anos" },
];

const AREA_OPCOES = [
  { label: "Técnica e Tática (Análise de Desempenho, Scout, Treinador, Dados…)", value: "Técnica e Tática (Análise de Desempenho, Scout, Treinador, Dados…)" },
  { label: "Comunicação (Jornalismo, Marketing, Fotografia…)", value: "Comunicação (Jornalismo, Marketing, Fotografia…)" },
  { label: "Saúde (Medicina, Fisioterapia, Nutrição, Psicologia, Preparação Física…)", value: "Saúde (Medicina, Fisioterapia, Nutrição, Psicologia, Preparação Física…)" },
  { label: "Gestão (Gestão Executiva, Direito, Finanças…)", value: "Gestão (Gestão Executiva, Direito, Finanças…)" },
];

// Mapeia o id de área usado em lib/cursos.ts (curso.area) pro valor exato
// dessa pergunta — quem usa presetArea não precisa repetir o texto da opção.
export const AREA_BY_CURSO_AREA: Record<string, string> = {
  "tecnica-e-tatica": AREA_OPCOES[0].value,
  "comunicacao-marketing": AREA_OPCOES[1].value,
  "saude": AREA_OPCOES[2].value,
  "gestao-e-operacao": AREA_OPCOES[3].value,
};

const MOMENTO_OPCOES = [
  { label: "Já trabalho no futebol", value: "Já trabalho no futebol" },
  { label: "Formado há 3+ anos", value: "Formado há 3+ anos" },
  { label: "Recém-formado", value: "Recém-formado" },
  { label: "Cursando graduação", value: "Cursando graduação" },
  { label: "Sem graduação", value: "Sem graduação" },
];

const INVESTIMENTO_OPCOES = [
  { label: "Já investi mais de R$ 10.000 em cursos, MBAs, mentorias ou imersões", value: "acima_10k" },
  { label: "Já investi entre R$ 3.000 e R$ 10.000 em formação profissional", value: "3k_10k" },
  { label: "Já investi entre R$ 1.000 e R$ 3.000 em formação profissional", value: "1k_3k" },
  { label: "Já paguei por algum curso ou especialização (até R$ 1.000)", value: "ate_1k" },
  { label: "Não paguei por educação ou desenvolvimento profissional extra", value: "zero" },
];

function formatPhone(value: string, countryCode: string) {
  const digits = value.replace(/\D/g, "");
  if (countryCode !== "BR") return digits.slice(0, 15);
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Lê os parâmetros utm_* da URL atual — só entram no objeto os que
// realmente vierem na URL (não sobrescreve o padrão da página com vazio).
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

const fieldBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#F4F4F4",
  padding: "13px 14px",
  fontSize: 15,
  fontFamily: M,
  outline: "none",
  border: "1px solid rgba(255,255,255,0.18)",
};

type Answers = {
  name: string;
  email: string;
  country: string;
  phone: string;
  idade: string;
  area: string;
  momento: string;
  investimento: string;
};

const EMPTY: Answers = { name: "", email: "", country: "BR", phone: "", idade: "", area: "", momento: "", investimento: "" };

// Ordem das telas do wizard — nome/email/telefone juntos na primeira tela,
// depois uma pergunta de múltipla escolha por vez. "area" só entra quando
// não houver um presetArea (ou seja, quando a página não já sabe a área).
const ALL_STEP_KEYS = ["contato", "idade", "area", "momento", "investimento"] as const;
type StepKey = (typeof ALL_STEP_KEYS)[number];

type Props = {
  pageName?: string;
  color?: string;
  /** UTMs padrão dessa página/curso — só valem pra chave que a URL NÃO tiver */
  defaultUtm?: Partial<Record<(typeof UTM_KEYS)[number], string>>;
  /**
   * Quando informado, pula a pergunta "Qual área você tem interesse?" e usa
   * esse valor direto (ex: na página de um curso específico, onde a área já
   * é conhecida). Deixe undefined pra perguntar normalmente.
   */
  presetArea?: string;
  /**
   * Disparado assim que nome/e-mail/telefone são confirmados no HubSpot
   * (logo na 1ª etapa, antes do resto do wizard) — usado por quem embrulha
   * este componente pra espelhar os mesmos dados em outro sistema (ex: o
   * e-book manda isso pro ActiveCampaign também).
   */
  onContactCaptured?: (contact: { name: string; email: string; phone: string; country: string }) => void;
  onSuccess?: () => void;
  successTitle?: string;
  successSubtitle?: string;
};

export default function HubspotContactForm({
  pageName, color = "#08C27A", defaultUtm, presetArea, onContactCaptured, onSuccess,
  successTitle = "Recebemos seus dados!",
  successSubtitle = "Em breve alguém da nossa equipe entra em contato.",
}: Props) {
  const STEP_KEYS = presetArea ? ALL_STEP_KEYS.filter((k) => k !== "area") : ALL_STEP_KEYS;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});

  const defaultUtmKey = JSON.stringify(defaultUtm ?? {});
  useEffect(() => {
    setUtm({ ...defaultUtm, ...getUtmParams() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultUtmKey]);

  const stepKey: StepKey = STEP_KEYS[step];
  const isLast = step === STEP_KEYS.length - 1;
  const selectedCountry = COUNTRIES.find((c) => c.code === answers.country) ?? COUNTRIES[0];

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function validateStep(key: StepKey): string {
    if (key === "contato") {
      if (answers.name.trim().length < 3) return "Digite seu nome completo.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) return "Digite um e-mail válido.";
      const digits = answers.phone.replace(/\D/g, "");
      const minLen = answers.country === "BR" ? 10 : 8;
      if (digits.length < minLen) return "Digite um telefone válido.";
    }
    if (key === "idade" && !answers.idade) return "Selecione uma opção.";
    if (key === "area" && !answers.area) return "Selecione uma opção.";
    if (key === "momento" && !answers.momento) return "Selecione uma opção.";
    if (key === "investimento" && !answers.investimento) return "Selecione uma opção.";
    return "";
  }

  function contatoProperties(): Record<string, string> {
    const [firstname, ...rest] = answers.name.trim().split(" ");
    return {
      email: answers.email.trim(),
      firstname,
      lastname: rest.join(" ") || firstname,
      phone: `${selectedCountry.dial}${answers.phone.replace(/\D/g, "")}`,
      ...utm,
    };
  }

  async function postProperties(properties: Record<string, string>): Promise<boolean> {
    try {
      const res = await fetch("/api/hubspot-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ properties }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Resposta de erro da API /api/hubspot-submit:", data);
        throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error || "Algo deu errado. Tente novamente.");
      }
      return true;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Não foi possível enviar. Tente novamente.");
      return false;
    }
  }

  async function goNext() {
    const err = validateStep(stepKey);
    if (err) { setError(err); return; }
    setError("");

    if (stepKey === "contato") {
      setStatus("loading");
      const ok = await postProperties(contatoProperties());
      setStatus("idle");
      if (!ok) return;
      onContactCaptured?.({ name: answers.name.trim(), email: answers.email.trim(), phone: answers.phone.replace(/\D/g, ""), country: answers.country });
    }

    setStep((s) => s + 1);
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  async function chooseAndAdvance<K extends keyof Answers>(key: K, value: Answers[K]) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setError("");
    if (isLast) { await finalSubmit(updated); return; }
    setStep((s) => s + 1);
  }

  async function finalSubmit(finalAnswers: Answers = answers) {
    setStatus("loading");
    setErrorMsg("");

    const ok = await postProperties({
      email: finalAnswers.email.trim(),
      idade: finalAnswers.idade,
      qual_area_voce_tem_interesse: presetArea ?? finalAnswers.area,
      qual_o_momento_da_carreira: finalAnswers.momento,
      fi_investimento_educacao_12m: finalAnswers.investimento,
    });

    if (!ok) { setStatus("error"); return; }
    setStatus("success");
    onSuccess?.();
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(8,194,122,0.15)", border: "1.5px solid rgba(8,194,122,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width={24} height={24} viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: F, fontSize: 20, color: "#F4F4F4", marginBottom: 8 }}>{successTitle}</p>
        <p style={{ fontFamily: M, fontSize: 14, color: "rgba(244,244,244,0.6)" }}>{successSubtitle}</p>
      </div>
    );
  }

  function OptionButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: 12,
          border: `1.5px solid ${active ? color : "rgba(255,255,255,0.14)"}`,
          background: active ? `${color}1E` : "rgba(255,255,255,0.04)",
          color: "#F4F4F4", fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.4,
          cursor: "pointer", transition: "border-color .15s ease, background .15s ease",
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        {step > 0 && (
          <button type="button" onClick={goBack} aria-label="Voltar" style={{ background: "none", border: "none", color: "rgba(169,216,245,0.6)", cursor: "pointer", padding: 0, display: "flex" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((step + 1) / STEP_KEYS.length) * 100}%`, background: color, transition: "width .25s ease" }} />
        </div>
        <span style={{ fontFamily: M, fontSize: 11, color: "rgba(169,216,245,0.5)", flexShrink: 0 }}>{step + 1}/{STEP_KEYS.length}</span>
      </div>

      {stepKey === "contato" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontFamily: F, fontSize: 17, color: "#F4F4F4", display: "block", marginBottom: 12 }}>Vamos começar — seus dados de contato</label>
          </div>

          <div>
            <label style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(169,216,245,0.6)", display: "block", marginBottom: 6 }}>Nome completo</label>
            <input autoFocus value={answers.name} onChange={(e) => set("name", e.target.value)} placeholder="Digite seu nome" style={fieldBase} />
          </div>

          <div>
            <label style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(169,216,245,0.6)", display: "block", marginBottom: 6 }}>Email</label>
            <input type="email" value={answers.email} onChange={(e) => set("email", e.target.value)} placeholder="Digite seu email" style={fieldBase} />
          </div>

          <div>
            <label style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(169,216,245,0.6)", display: "block", marginBottom: 6 }}>Telefone</label>
            <div style={{ display: "flex", alignItems: "stretch", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", flexShrink: 0 }}>
                <select
                  value={answers.country}
                  onChange={(e) => { set("country", e.target.value); set("phone", formatPhone(answers.phone, e.target.value)); }}
                  aria-label="País"
                  style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none", background: "transparent", border: "none", color: "#F4F4F4", padding: "13px 26px 13px 14px", fontSize: 15, fontFamily: M, outline: "none", cursor: "pointer" }}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code} style={{ background: "#0A1E35", color: "#F4F4F4" }}>{c.flag} {c.dial}</option>
                  ))}
                </select>
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" style={{ position: "absolute", right: 10, pointerEvents: "none" }}>
                  <path d="M6 9l6 6 6-6" stroke="rgba(169,216,245,0.6)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ width: 1, alignSelf: "stretch", margin: "9px 0", background: "rgba(255,255,255,0.16)", flexShrink: 0 }} />
              <input
                value={answers.phone}
                onChange={(e) => set("phone", formatPhone(e.target.value, answers.country))}
                onKeyDown={(e) => e.key === "Enter" && goNext()}
                placeholder={answers.country === "BR" ? "(00) 00000-0000" : "Número de telefone"}
                inputMode="numeric"
                style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", color: "#F4F4F4", padding: "13px 14px", fontSize: 15, fontFamily: M, outline: "none" }}
              />
            </div>
          </div>
        </div>
      )}

      {stepKey === "idade" && (
        <div>
          <label style={{ fontFamily: F, fontSize: 17, color: "#F4F4F4", display: "block", marginBottom: 12 }}>Qual sua idade?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {IDADE_OPCOES.map((o) => (
              <OptionButton key={o.value} label={o.label} active={answers.idade === o.value} onClick={() => chooseAndAdvance("idade", o.value)} />
            ))}
          </div>
        </div>
      )}

      {stepKey === "area" && (
        <div>
          <label style={{ fontFamily: F, fontSize: 17, color: "#F4F4F4", display: "block", marginBottom: 12 }}>Qual área você tem interesse?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {AREA_OPCOES.map((o) => (
              <OptionButton key={o.value} label={o.label} active={answers.area === o.value} onClick={() => chooseAndAdvance("area", o.value)} />
            ))}
          </div>
        </div>
      )}

      {stepKey === "momento" && (
        <div>
          <label style={{ fontFamily: F, fontSize: 17, color: "#F4F4F4", display: "block", marginBottom: 12 }}>Qual o momento da sua carreira?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOMENTO_OPCOES.map((o) => (
              <OptionButton key={o.value} label={o.label} active={answers.momento === o.value} onClick={() => chooseAndAdvance("momento", o.value)} />
            ))}
          </div>
        </div>
      )}

      {stepKey === "investimento" && (
        <div>
          <label style={{ fontFamily: F, fontSize: 17, color: "#F4F4F4", display: "block", marginBottom: 12 }}>
            Nos últimos 12 meses, quanto você já investiu em educação?
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {INVESTIMENTO_OPCOES.map((o) => (
              <OptionButton key={o.value} label={o.label} active={answers.investimento === o.value} onClick={() => chooseAndAdvance("investimento", o.value)} />
            ))}
          </div>
        </div>
      )}

      {error && <p style={{ fontFamily: M, fontSize: 12.5, color: "#ff6b6b", marginTop: 10 }}>{error}</p>}
      {status === "error" && <p style={{ fontFamily: M, fontSize: 12.5, color: "#ff6b6b", marginTop: 10 }}>{errorMsg}</p>}

      {stepKey === "contato" && (
        <button
          type="button"
          onClick={goNext}
          disabled={status === "loading"}
          style={{
            width: "100%", marginTop: 16,
            background: `linear-gradient(135deg,${color},#059669)`,
            border: "none", borderRadius: 12, color: "#fff",
            fontFamily: M, fontWeight: 700, fontSize: 14, padding: 14,
            cursor: status === "loading" ? "default" : "pointer",
            boxShadow: `0 8px 24px ${color}55`,
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          Continuar
        </button>
      )}

      {isLast && status === "loading" && (
        <p style={{ fontFamily: M, fontSize: 12.5, color: "rgba(169,216,245,0.6)", marginTop: 12, textAlign: "center" }}>Enviando...</p>
      )}
    </div>
  );
}