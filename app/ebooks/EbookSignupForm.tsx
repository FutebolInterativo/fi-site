"use client";
import { useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; email?: string; phone?: string };

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

/* Máscara de telefone — só aplica o formato BR (XX) XXXXX-XXXX quando o
   país selecionado é Brasil. Pros demais países, mantém só os dígitos. */
function formatPhone(value: string, countryCode: string) {
  const digits = value.replace(/\D/g, "");
  if (countryCode !== "BR") return digits.slice(0, 15);
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(name: string, email: string, phone: string, countryCode: string): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length < 3) {
    errors.name = "Digite seu nome completo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Digite um e-mail válido.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  const minLen = countryCode === "BR" ? 10 : 8;
  if (phoneDigits.length < minLen) {
    errors.phone = "Digite um telefone válido.";
  }
  return errors;
}

const baseField: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#F4F4F4",
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: M,
  outline: "none",
  transition: "border-color .15s ease, background .15s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: M,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(169,216,245,0.65)",
  marginBottom: 6,
};

export default function EbookSignupForm({ tagId, color }: { tagId: string; color: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("BR");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const errors = validate(name, email, phone, country);
  const selectedCountry = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];

  function fieldStyle(field: keyof FieldErrors): React.CSSProperties {
    const hasError = touched[field] && errors[field];
    return {
      ...baseField,
      border: `1px solid ${hasError ? "#ff6b6b" : "rgba(255,255,255,0.18)"}`,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    if (Object.keys(validate(name, email, phone, country)).length > 0) return;

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ebook-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${selectedCountry.dial}${phone.replace(/\D/g, "")}`,
          tagId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Resposta de erro da API /api/ebook-signup:", data);
        throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error || "Algo deu errado. Tente novamente.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Não foi possível enviar. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(8,194,122,0.15)", border: "1.5px solid rgba(8,194,122,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width={24} height={24} viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: F, fontSize: 20, color: "#F4F4F4", marginBottom: 8 }}>Recebemos sua inscrição!</p>
        <p style={{ fontFamily: M, fontSize: 14, color: "rgba(244,244,244,0.6)" }}>O e-book chega no seu e-mail em poucos minutos.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Nome completo <span style={{ color: "#08C27A" }}>*</span></label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="Digite seu nome"
          style={fieldStyle("name")}
        />
        {touched.name && errors.name && (
          <p style={{ fontFamily: M, fontSize: 12, color: "#ff6b6b", marginTop: 5 }}>{errors.name}</p>
        )}
      </div>

      <div>
        <label style={labelStyle}>Email <span style={{ color: "#08C27A" }}>*</span></label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="Digite seu email"
          style={fieldStyle("email")}
        />
        {touched.email && errors.email && (
          <p style={{ fontFamily: M, fontSize: 12, color: "#ff6b6b", marginTop: 5 }}>{errors.email}</p>
        )}
      </div>

      <div>
        <label style={labelStyle}>Telefone <span style={{ color: "#08C27A" }}>*</span></label>
        <div style={{
          display: "flex", alignItems: "stretch",
          background: "rgba(255,255,255,0.08)",
          border: `1px solid ${touched.phone && errors.phone ? "#ff6b6b" : "rgba(255,255,255,0.18)"}`,
          borderRadius: 10, overflow: "hidden",
        }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setPhone((p) => formatPhone(p, e.target.value)); }}
              aria-label="País"
              style={{
                appearance: "none", WebkitAppearance: "none", MozAppearance: "none",
                background: "transparent", border: "none", color: "#F4F4F4",
                padding: "12px 26px 12px 14px", fontSize: 14, fontFamily: M,
                outline: "none", cursor: "pointer",
              }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} style={{ background: "#0A1E35", color: "#F4F4F4" }}>
                  {c.flag} {c.dial}
                </option>
              ))}
            </select>
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" style={{ position: "absolute", right: 10, pointerEvents: "none" }}>
              <path d="M6 9l6 6 6-6" stroke="rgba(169,216,245,0.6)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ width: 1, alignSelf: "stretch", margin: "8px 0", background: "rgba(255,255,255,0.16)", flexShrink: 0 }} />

          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value, country))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder={country === "BR" ? "(00) 00000-0000" : "Número de telefone"}
            inputMode="numeric"
            style={{
              flex: 1, minWidth: 0, background: "transparent", border: "none",
              color: "#F4F4F4", padding: "12px 14px", fontSize: 14, fontFamily: M, outline: "none",
            }}
          />
        </div>
        {touched.phone && errors.phone && (
          <p style={{ fontFamily: M, fontSize: 12, color: "#ff6b6b", marginTop: 5 }}>{errors.phone}</p>
        )}
      </div>

      {status === "error" && (
        <p style={{ fontFamily: M, fontSize: 12.5, color: "#ff6b6b" }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          background: "linear-gradient(135deg,#08C27A,#059669)",
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontFamily: M,
          fontWeight: 700,
          fontSize: 14,
          padding: 14,
          cursor: status === "loading" ? "default" : "pointer",
          boxShadow: "0 8px 24px rgba(8,194,122,0.35)",
          opacity: status === "loading" ? 0.7 : 1,
          marginTop: 2,
        }}
      >
        {status === "loading" ? "Enviando..." : "QUERO GARANTIR MEU EBOOK"}
      </button>
    </form>
  );
}