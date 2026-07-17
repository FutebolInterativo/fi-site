// app/api/ebook-signup/route.ts
//
// Recebe a inscrição do formulário customizado de e-book e repassa pro
// ActiveCampaign via API (a API Key nunca fica exposta no navegador).
//
// Todo e-book usa a MESMA lista (EBOOK_LIST_ID) — a diferenciação por área
// é feita por TAG (tagId, um valor diferente por área).
//
// Variáveis de ambiente necessárias (ver .env.example):
//   ACTIVECAMPAIGN_API_URL   ex: https://SUACONTA.api-us1.com
//   ACTIVECAMPAIGN_API_KEY   em AC: Configurações → Desenvolvedor
import { NextRequest, NextResponse } from "next/server";

const EBOOK_LIST_ID = Number(process.env.ACTIVECAMPAIGN_EBOOK_LIST_ID ?? 62);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, tagId } = await req.json();

    if (!name || !email || !tagId) {
      return NextResponse.json({ error: "Preencha nome e e-mail." }, { status: 400 });
    }

    const API_URL = process.env.ACTIVECAMPAIGN_API_URL;
    const API_KEY = process.env.ACTIVECAMPAIGN_API_KEY;

    if (!API_URL || !API_KEY) {
      console.error("ActiveCampaign não configurado: defina ACTIVECAMPAIGN_API_URL e ACTIVECAMPAIGN_API_KEY.");
      return NextResponse.json({ error: "Integração não configurada." }, { status: 500 });
    }

    const headers = {
      "Api-Token": API_KEY,
      "Content-Type": "application/json",
    };

    // 1) cria (ou atualiza, se o e-mail já existir) o contato
    const [firstName, ...rest] = String(name).trim().split(" ");
    const syncRes = await fetch(`${API_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName: rest.join(" ") || undefined,
          phone: phone || undefined,
        },
      }),
    });

    if (!syncRes.ok) {
      const detail = await syncRes.text();
      console.error("Erro ao sincronizar contato no AC:", syncRes.status, detail);
      return NextResponse.json(
        { error: "Não foi possível processar sua inscrição.", detail: `HTTP ${syncRes.status} — ${detail || "resposta sem corpo"}` },
        { status: 502 }
      );
    }

    const { contact } = await syncRes.json();
    const contactId = Number(contact?.id);
    const tagIdNum = Number(tagId);

    if (!contactId || !tagIdNum) {
      console.error("ID de contato ou de tag inválido:", { contactId, tagId });
      return NextResponse.json(
        { error: "Configuração de tag inválida.", detail: `contactId=${contactId} tagId=${tagId}` },
        { status: 400 }
      );
    }

    // 2) inscreve o contato na lista única de e-books
    const listRes = await fetch(`${API_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: { list: EBOOK_LIST_ID, contact: contactId, status: 1 },
      }),
    });

    if (!listRes.ok) {
      const detail = await listRes.text();
      console.error("Erro ao inscrever contato na lista do AC:", listRes.status, detail);
      return NextResponse.json(
        { error: "Não foi possível concluir a inscrição.", detail: `HTTP ${listRes.status} — ${detail || "resposta sem corpo"}` },
        { status: 502 }
      );
    }

    // 3) aplica a tag da área — é isso que identifica qual e-book a pessoa pediu
    //    (e provavelmente o gatilho da automação que envia o material)
    const tagRes = await fetch(`${API_URL}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactTag: { contact: contactId, tag: tagIdNum },
      }),
    });

    if (!tagRes.ok) {
      const detail = await tagRes.text();
      console.error("Erro ao aplicar tag no AC:", tagRes.status, detail);
      return NextResponse.json(
        { error: "Não foi possível concluir a inscrição.", detail: `HTTP ${tagRes.status} — ${detail || "resposta sem corpo"}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro inesperado em /api/ebook-signup:", err);
    return NextResponse.json(
      { error: "Erro inesperado. Tente novamente.", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}