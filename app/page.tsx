// app/page.tsx
import React from "react";

const WHATSAPP_LINK =
  "https://wa.link/icfesmaterial";
const PRICE = "$60.000";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
      {children}
    </span>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

function CTA({ label = "Escríbenos por WhatsApp" }: { label?: string }) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
    >
      {label} →
    </a>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white font-bold">
              PM
            </div>
            <div>
              <div className="font-semibold">Preicfes Material</div>
              <div className="text-xs text-slate-500">ICFES 2026</div>
            </div>
          </div>
          <CTA />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>📘 Pago único</Badge>
              <Badge>🧠 Respuestas explicadas</Badge>
              <Badge>🚀 Actualizaciones</Badge>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              El material más completo para el{" "}
              <span className="underline decoration-black/20">
                ICFES 2026
              </span>
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Plan de estudio personalizado + cuadernillos oficiales (2010–2025)
              + más de 2.000 preguntas con respuestas explicadas + formularios con
              calificación automática.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTA label="Quiero el material completo" />
              <div className="rounded-2xl border bg-white px-5 py-3">
                <div className="text-xs text-slate-500">Inversión</div>
                <div className="text-xl font-bold">{PRICE}</div>
              </div>
            </div>
          </div>

          {/* Right block */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-2xl font-bold">¿Qué incluye?</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>✅ Plan de estudio personalizado</li>
                <li>✅ +72 formularios con calificación automática</li>
                <li>✅ +2.000 preguntas explicadas</li>
                <li>✅ Cuadernillos oficiales ICFES</li>
                <li>✅ Acceso permanente</li>
              </ul>
              <div className="mt-6">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-900"
                >
                  Empezar ahora →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold">Cómo funciona</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card title="1️⃣ Escríbenos">
            Nos contactas por WhatsApp y te enviamos la información completa.
          </Card>
          <Card title="2️⃣ Recibes acceso">
            Te damos acceso inmediato y te explicamos cómo usar el material.
          </Card>
          <Card title="3️⃣ Estudias con método">
            Cada día sabes exactamente qué hacer para subir tu puntaje.
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card title="¿Es pago único?">
              Sí. Pagas una sola vez y tienes acceso permanente.
            </Card>
            <Card title="¿Cómo lo recibo?">
              Te enviamos todo por WhatsApp con instrucciones claras.
            </Card>
            <Card title="¿Sirve si voy mal en una materia?">
              Sí. Puedes reforzar las materias más débiles.
            </Card>
            <Card title="¿Tiene explicaciones?">
              Todas las preguntas vienen con explicación detallada.
            </Card>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-slate-50 p-5">
            <div>
              <div className="text-sm text-slate-500">
                ¿Listo para empezar?
              </div>
              <div className="text-xl font-bold">
                Escríbenos y recibe el material hoy mismo.
              </div>
            </div>
            <CTA />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Preicfes Material — Todos los derechos
          reservados.
        </div>
      </footer>
    </main>
  );
}
