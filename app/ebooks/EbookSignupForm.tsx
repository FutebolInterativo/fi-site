"use client";
import { useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; email?: string; phone?: string };

/* Máscara de telefone BR — formata enquanto digita, aceita fixo (4 díg.)
   e celular (5 díg.) progressivamente */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validate(name: string, email: string, phone: string): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length < 3) {
    errors.name = "Digite seu nome completo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Digite um e-mail válido.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    errors.phone = "Digite um telefone válido, com DDD.";
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
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const errors = validate(name, email, phone);

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
    if (Object.keys(validate(name, email, phone)).length > 0) return;

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ebook-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.replace(/\D/g, ""), tagId }),
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
        <input
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="(00) 00000-0000"
          inputMode="numeric"
          style={fieldStyle("phone")}
        />
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