import type { Metadata } from "next";
import LandingClient from "@/components/landing-client";

export const metadata: Metadata = {
  title: "PreICFES Material | Material ICFES + Plan Personalizado",
  description:
    "Prepárate para el ICFES con el material más completo: cuadernillos 2017–2025, respuestas explicadas, +80 formularios automáticos, simulacros y plan de estudio personalizado (paquete #2).",
  metadataBase: new URL("https://www.preicfesmaterial.com"),
  openGraph: {
    title: "PreICFES Material",
    description:
      "Material ICFES premium: preguntas reales + respuestas explicadas + formularios automáticos + acceso permanente + actualizaciones semanales.",
    url: "https://www.preicfesmaterial.com",
    siteName: "PreICFES Material",
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LandingClient />;
}
