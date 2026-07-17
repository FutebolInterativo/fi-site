// app/api/hubspot-submit/route.ts
//
// Cria (ou atualiza, se o e-mail já existir) um contato direto no CRM do
// HubSpot via API — não depende de um formulário/portalId específico.
// Usa "batch/upsert" com idProperty=email: cria se não existir, atualiza
// se já existir, em uma única chamada.
//
// Variável de ambiente necessária (ver .env.example):
//   HUBSPOT_ACCESS_TOKEN   Chave de serviço (private app) — escopos
//                          crm.objects.contacts.read + .write
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { properties } = (await req.json()) as { properties?: Record<string, string> };

    if (!properties?.email) {
      return NextResponse.json({ error: "E-mail é obrigatório." }, { status: 400 });
    }

    const TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!TOKEN) {
      console.error("HubSpot não configurado: defina HUBSPOT_ACCESS_TOKEN.");
      return NextResponse.json({ error: "Integração não configurada." }, { status: 500 });
    }

    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: properties.email,
            properties,
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Erro ao criar/atualizar contato no HubSpot:", res.status, detail);
      return NextResponse.json(
        { error: "Não foi possível enviar seus dados.", detail: `HTTP ${res.status} — ${detail || "resposta sem corpo"}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro inesperado em /api/hubspot-submit:", err);
    return NextResponse.json(
      { error: "Erro inesperado. Tente novamente.", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}