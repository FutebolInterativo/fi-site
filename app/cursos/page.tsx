import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursosClient from "./CursosClient";

export const metadata = {
  title: "Formações — Futebol Interativo",
  description: "Todas as formações do Futebol Interativo.",
};

export default function CursosPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>
        <Suspense fallback={<div style={{ paddingTop: 120, textAlign: "center", color: "#A9D8F5" }}>Carregando...</div>}>
          <CursosClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}