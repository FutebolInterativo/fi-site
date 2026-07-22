import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futebol Interativo — Formações no Futebol",
  description: "Escola de formação profissional para o mercado do futebol.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Tag Manager — usa next/script (afterInteractive) em vez de
            um <script> cru, que é a forma recomendada pelo Next.js pra scripts
            de terceiros: carrega assim que a página fica interativa, sem
            bloquear o carregamento inicial. */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MH9PQ8F');`}
        </Script>
      </head>
      <body className="bg-fi-navy text-fi-white antialiased">
        {/* Google Tag Manager (noscript) — precisa ser logo no início do <body>,
            pra funcionar mesmo com JS desabilitado no navegador do visitante */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MH9PQ8F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}