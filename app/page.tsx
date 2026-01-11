// app/page.tsx
// Preicfes Material – Landing Page (Mobile First, CRO-focused)

import type { Metadata } from "next";

/* =====================
   CONFIGURACIÓN GLOBAL
===================== */

const WHATSAPP_NUMBER = "573000000000"; // ← CAMBIA AQUÍ
const WHATSAPP_MESSAGE = "Hola, quiero información sobre Preicfes Material y el plan personalizado.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const metadata: Metadata = {
  title: "Preicfes Material | Prepárate para el ICFES con ventaja real",
  description:
    "Plan de estudio personalizado, +2.000 preguntas explicadas, formularios automáticos y actualizaciones semanales. Prepárate para el ICFES con Preicfes Material.",
  openGraph: {
    title: "Preicfes Material",
    description:
      "La preparación ICFES más completa y clara: plan personalizado, preguntas explicadas y acompañamiento.",
    url: "https://www.preicfesmaterial.com",
    siteName: "Preicfes Material",
    locale: "es_CO",
    type: "website",
  },
};

/* =====================
   PÁGINA PRINCIPAL
===================== */

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Hero />
      <SocialProof />
      <Includes />
      <HowItWorks />
      <ForWho />
      <FAQs />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

/* =====================
   SECCIONES
===================== */

const Hero = () => (
  <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
    <div className="flex flex-col gap-6">
      <span className="inline-block w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
        Preparación ICFES 2026
      </span>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Prepárate para el ICFES con un <span className="text-emerald-400">plan hecho para ti</span>
      </h1>
      <p className="text-neutral-300 max-w-xl">
        No más estudiar a ciegas. Accede al material más completo del país: preguntas reales,
        explicaciones claras y un plan personalizado según tu nivel y tiempo.
      </p>
      <ul className="grid gap-3 text-neutral-200">
        <li>✅ +2.000 preguntas actualizadas con respuestas explicadas</li>
        <li>✅ 72 formularios con calificación automática</li>
        <li>✅ Plan de estudio personalizado</li>
        <li>✅ Acceso permanente + actualizaciones semanales</li>
      </ul>
      <div className="flex gap-4 flex-col sm:flex-row">
        <a
          href={WHATSAPP_LINK}
          className="rounded-xl bg-emerald-500 px-6 py-4 text-center font-semibold text-neutral-950 hover:bg-emerald-400 transition"
        >
          Hablar por WhatsApp
        </a>
        <a
          href="#includes"
          className="rounded-xl border border-neutral-700 px-6 py-4 text-center font-semibold hover:bg-neutral-900 transition"
        >
          Ver qué incluye
        </a>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="px-6 py-14 bg-neutral-900">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Resultados reales de estudiantes reales</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-800 p-4 text-neutral-300"
          >
            Testimonio #{i} (placeholder)
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Includes = () => (
  <section id="includes" className="px-6 py-16 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold mb-10">¿Qué incluye Preicfes Material?</h2>
    <div className="grid gap-6 md:grid-cols-2">
      {[
        {
          title: "Plan de estudio personalizado",
          desc: "Organizado según tus fechas, tiempo disponible y nivel actual.",
        },
        {
          title: "72 formularios automáticos",
          desc: "Calificación inmediata para medir tu progreso real.",
        },
        {
          title: "+2.000 preguntas explicadas",
          desc: "Basadas en cuadernillos oficiales 2010–2025.",
        },
        {
          title: "Acceso permanente",
          desc: "Sin vencimiento. Incluye actualizaciones semanales.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-neutral-800 p-6 hover:border-emerald-500/40 transition"
        >
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-neutral-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="px-6 py-16 bg-neutral-900">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">¿Cómo funciona?</h2>
      <ol className="grid gap-6 md:grid-cols-3">
        <li className="rounded-xl border border-neutral-800 p-6">
          <span className="text-emerald-400 font-bold">1.</span>
          <p className="mt-2">Escribes por WhatsApp y te orientamos según tu caso.</p>
        </li>
        <li className="rounded-xl border border-neutral-800 p-6">
          <span className="text-emerald-400 font-bold">2.</span>
          <p className="mt-2">Recibes tu plan y acceso completo al material.</p>
        </li>
        <li className="rounded-xl border border-neutral-800 p-6">
          <span className="text-emerald-400 font-bold">3.</span>
          <p className="mt-2">Estudias con estrategia y mides tu avance real.</p>
        </li>
      </ol>
    </div>
  </section>
);

const ForWho = () => (
  <section className="px-6 py-16 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold mb-10">¿Para quién es?</h2>
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-neutral-800 p-6">🎓 Estudiantes que quieren subir su puntaje</div>
      <div className="rounded-xl border border-neutral-800 p-6">👨‍👩‍👧 Padres que buscan un método serio y guiado</div>
      <div className="rounded-xl border border-neutral-800 p-6">📘 Docentes que apoyan con material actualizado</div>
    </div>
  </section>
);

const FAQs = () => (
  <section className="px-6 py-16 bg-neutral-900">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Preguntas frecuentes</h2>
      <div className="space-y-4">
        <FAQ q="¿Sirve si voy mal en el colegio?" a="Sí. El plan se adapta a tu nivel actual." />
        <FAQ q="¿Es solo para 11°?" a="No. Funciona desde 9° en adelante." />
        <FAQ q="¿Cuánto tiempo tengo acceso?" a="Acceso permanente." />
        <FAQ q="¿Es digital?" a="Sí, todo es online y accesible desde cualquier dispositivo." />
      </div>
    </div>
  </section>
);

const FAQ = ({ q, a }: { q: string; a: string }) => (
  <div className="rounded-xl border border-neutral-800 p-4">
    <p className="font-semibold">{q}</p>
    <p className="text-neutral-400 mt-2">{a}</p>
  </div>
);

const FinalCTA = () => (
  <section className="px-6 py-20 text-center max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Empieza hoy a prepararte con ventaja
    </h2>
    <p className="text-neutral-400 mb-8">
      Cada punto cuenta. No dejes tu resultado al azar.
    </p>
    <a
      href={WHATSAPP_LINK}
      className="inline-block rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-neutral-950 hover:bg-emerald-400 transition"
    >
      Hablar por WhatsApp
    </a>
  </section>
);

const Footer = () => (
  <footer className="px-6 py-10 border-t border-neutral-800 text-sm text-neutral-500">
    <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between">
      <p>© {new Date().getFullYear()} Preicfes Material</p>
      <a href={WHATSAPP_LINK} className="hover:text-neutral-300">
        Contacto
      </a>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_LINK}
    className="fixed bottom-5 right-5 rounded-full bg-emerald-500 p-4 shadow-lg text-neutral-950 hover:bg-emerald-400 transition"
    aria-label="WhatsApp"
  >
    💬
  </a>
);
