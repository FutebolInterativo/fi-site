"use client";
import type { Curso } from "@/lib/cursos";
import HubspotContactForm from "@/components/HubspotContactForm";

export default function CursoForm({ curso }: { curso: Curso }) {
  return <HubspotContactForm pageName={curso.title} color="#08C27A" />;
}