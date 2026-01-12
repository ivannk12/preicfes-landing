"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ======================================================
   ✅ CONFIGURACIÓN (EDITA AQUÍ)
====================================================== */

const BRAND = "PreICFES Material";

// WhatsApp
const WHATSAPP_NUMBER = "+573208234642"; // ✅ tu número
const WHATSAPP_BASE_MESSAGE =
  "Hola, quiero información sobre PreICFES Material y el plan personalizado.";

// Paquetes / precios
const PRICE_1_OLD = 80000;
const PRICE_1_NOW = 60000;
const PRICE_2_OLD = 130000;
const PRICE_2_NOW = 95000;

const PACKAGE_1_NAME = "MATERIAL DE ESTUDIO SUPREMO";
const PACKAGE_2_NAME = "MATERIAL DE ESTUDIO SUPREMO + PLAN DE ESTUDIO PERSONALIZADO";

// Links de pago (Wompi / PSE) – 2 links (uno por paquete)
const WOMPI_LINK_P1 = ""; // 🔗 pega aquí link Paquete #1
const WOMPI_LINK_P2 = ""; // 🔗 pega aquí link Paquete #2

// Transferencias
const NEQUI_NUMBER = "3168695397";
const BANK_NAME = "Bancolombia";
const BANCOLOMBIA_ACCOUNT = "75675989958";
const ACCOUNT_HOLDER = "Iván Gómez";

// Deadline del contador (15 marzo 2026)
const DEADLINE_ISO = "2026-03-15T23:59:59-05:00"; // America/Bogota

// Mini test gratuito (Drive directo)
const MINI_TEST_DRIVE_LINK = ""; // 🔗 pega aquí el link directo al Drive del mini test

// Videos (ideal: YouTube no listado para mejor performance)
const VIDEO_PRESENTATION_URL = ""; // 🔗 embed (YouTube) o Drive embed
const VIDEO_WALKTHROUGH_URL = ""; // 🔗 embed (YouTube) o Drive embed

// Assets (opcionales) – puedes usar /public/... luego
const HERO_IMAGE = ""; // ej: "/hero.png" o "https://..."
const TRANSFORMATION_IMAGE = ""; // ej: "/transform.png" o "https://..."

// Testimonios (placeholders): reemplaza por imágenes tuyas
const TESTIMONIALS: Array<{
  id: string;
  type: "puntaje" | "chat";
  img: string;
  alt: string;
  caption?: string;
}> = Array.from({ length: 10 }).map((_, i) => ({
  id: `t-${i + 1}`,
  type: i < 5 ? "puntaje" : "chat",
  img: "", // 🔁 pega URL o /public/...
  alt: `Testimonio ${i + 1}`,
  caption: i < 5 ? "Resultado / puntaje (placeholder)" : "Chat (placeholder)",
}));

// Ejemplos por materia (imágenes listas según dijiste)
const SUBJECT_EXAMPLES: Array<{ key: string; label: string; img: string; alt: string }> = [
  { key: "mate", label: "Matemáticas", img: "", alt: "Ejemplo Matemáticas" },
  { key: "sociales", label: "Sociales", img: "", alt: "Ejemplo Sociales" },
  { key: "lectura", label: "Lectura Crítica", img: "", alt: "Ejemplo Lectura" },
  { key: "bio", label: "Biología", img: "", alt: "Ejemplo Biología" },
  { key: "quim", label: "Química", img: "", alt: "Ejemplo Química" },
  { key: "fis", label: "Física", img: "", alt: "Ejemplo Física" },
  { key: "ing", label: "Inglés", img: "", alt: "Ejemplo Inglés" },
];

/* ======================================================
   HELPERS
====================================================== */

function formatCOP(value: number) {
  // Formato simple (sin depender de Intl avanzado por compat)
  // Ej: 95000 -> 95.000
  const s = Math.round(value).toString();
  const parts: string[] = [];
  for (let i = s.length; i > 0; i -= 3) parts.unshift(s.substring(Math.max(0, i - 3), i));
  return `$${parts.join(".")}`;
}

function makeWaLink(message: string) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/* ======================================================
   PAGE
====================================================== */

export default function LandingClient() {
  // Paquete preseleccionado para que la sección de pagos se adapte
  const [selectedPackage, setSelectedPackage] = useState<1 | 2>(2);

  const waGeneral = useMemo(
    () => makeWaLink(WHATSAPP_BASE_MESSAGE),
    [WHATSAPP_BASE_MESSAGE, makeWaLink]
  );

  const waProofP1 = useMemo(
    () =>
      makeWaLink(
        `Hola, quiero el Paquete #1 (${PACKAGE_1_NAME}). Ya hice el pago y adjunto comprobante.\n\nNombre: ____\nCorreo (opcional): ____`
      ),
    [PACKAGE_1_NAME, makeWaLink]
  );

  const waProofP2 = useMemo(
    () =>
      makeWaLink(
        `Hola, quiero el Paquete #2 (${PACKAGE_2_NAME}). Ya hice el pago y adjunto comprobante.\n\nNombre: ____\nFecha ICFES (si la sabes): ____\nObjetivo de puntaje: ____`
      ),
    [PACKAGE_2_NAME, makeWaLink]
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-fuchsia-400/30 selection:text-white">
      <NeonBackground />

      <TopBar waLink={waGeneral} />

      <Hero
        onViewPackages={() => scrollToId("packages")}
        onMiniTest={() => scrollToId("mini-test")}
        waLink={waGeneral}
      />

      <TrustBar />

      <VideoSection
        id="video-presentacion"
        eyebrow="VIDEO PRESENTACIÓN"
        title="Conócelo en 90 segundos"
        subtitle="Más de 1500 estudiantes ya lo adquirieron. Mira cómo funciona y por qué es tan completo."
        embedUrl={VIDEO_PRESENTATION_URL}
        bullets={[
          "Único pago · Acceso permanente",
          "Actualizaciones semanales",
          "Material real y organizado para subir puntaje",
        ]}
        primary={{ label: "Ver Paquetes", onClick: () => scrollToId("packages") }}
        secondary={{ label: "Hablar por WhatsApp", href: waGeneral }}
      />

      <TestimonialsSection />

      <TransformationSection />

      <IncludesSection />

      <PersonalPlanSection
        onViewP2={() => {
          setSelectedPackage(2);
          scrollToId("packages");
        }}
      />

      <VideoSection
        id="video-recorrido"
        eyebrow="RECORRIDO REAL"
        title="Mira el material por dentro"
        subtitle="Grabación de pantalla (2:30) mostrando carpetas, formularios, simulacros y organización completa."
        embedUrl={VIDEO_WALKTHROUGH_URL}
        bullets={[
          "Drive organizado por materias",
          "+80 formularios con calificación automática",
          "Simulacros y respuestas explicadas",
        ]}
        primary={{ label: "Quiero ver ofertas", onClick: () => scrollToId("packages") }}
        secondary={{ label: "Abrir Mini Test Gratis", onClick: () => scrollToId("mini-test") }}
      />

      <ExamplesAccordion />

      <PackagesSection
        selected={selectedPackage}
        onSelect={setSelectedPackage}
        onGoPay={() => scrollToId("payments")}
      />

      <GuaranteeSection waLink={waGeneral} />

      <LimitedOfferSection deadlineISO={DEADLINE_ISO} onGoPay={() => scrollToId("payments")} />

      <FitSection />

      <MiniTestSection />

      <FAQSection />

      <PaymentsSection
        selected={selectedPackage}
        setSelected={setSelectedPackage}
        wompiP1={WOMPI_LINK_P1}
        wompiP2={WOMPI_LINK_P2}
        waProofP1={waProofP1}
        waProofP2={waProofP2}
      />

      <Footer waLink={waGeneral} />

      <FloatingWhatsApp waLink={waGeneral} />

      <StyleTokens />
    </main>
  );
}

/* ======================================================
   UI: Background / TopBar
====================================================== */

function NeonBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Orbes difuminados */}
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[90px]" />
      <div className="absolute top-[30%] -left-24 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[110px]" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[560px] w-[560px] rounded-full bg-emerald-400/15 blur-[120px]" />

      {/* Grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.12]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_75%)]" />
    </div>
  );
}

function TopBar({ waLink }: { waLink: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
            <span className="text-sm font-black tracking-tight text-white">P</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">{BRAND}</div>
            <div className="text-xs text-white/60">ICFES 2026 · Único pago</div>
          </div>
        </div>

        <a
          href={waLink}
          className="rounded-xl bg-white text-neutral-950 px-4 py-2 text-sm font-semibold hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
        >
          Hablar por WhatsApp
        </a>
      </div>
    </header>
  );
}

/* ======================================================
   HERO
====================================================== */

function Hero({
  onViewPackages,
  onMiniTest,
  waLink,
}: {
  onViewPackages: () => void;
  onMiniTest: () => void;
  waLink: string;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 md:pt-20" aria-label="Hero">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>ICFES 2026</Badge>
            <Badge variant="cyan">Actualizaciones semanales</Badge>
            <Badge variant="emerald">Acceso permanente</Badge>
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Prepárate para el ICFES con el <span className="text-glow">mejor material de estudio</span> de todo el país
          </h1>

          <p className="text-base leading-relaxed text-white/75 md:text-lg">
            ¿Te imaginas tener en tu bolsillo todo el material que necesitas para un puntaje alto en el ICFES
            con un <span className="text-white">Plan de Estudio Personalizado</span> a tu ritmo?
          </p>

          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex gap-2">
              <Check /> <span>Preguntas reales <b className="text-white">actualizadas</b></span>
            </li>
            <li className="flex gap-2">
              <Check /> <span>Respuestas explicadas <b className="text-white">paso a paso</b></span>
            </li>
            <li className="flex gap-2">
              <Check /> <span>Formularios con <b className="text-white">calificación automática</b></span>
            </li>
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={onViewPackages} className="btn-primary">
              Ver Paquetes
            </button>
            <button onClick={onMiniTest} className="btn-secondary">
              Mini Test Diagnóstico Gratis
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.6)]" />
              Entrega inmediata por WhatsApp
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <a className="underline hover:text-white" href={waLink}>
              ¿Dudas? Escríbeme
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="card-neo p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">PROMO ACTUAL</div>
                <div className="mt-1 text-lg font-bold">2 opciones · Pago único</div>
              </div>
              <div className="text-xs text-white/60">COP</div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Paquete #1</div>
                  <span className="text-xs text-white/60 line-through">{formatCOP(PRICE_1_OLD)}</span>
                </div>
                <div className="mt-1 text-2xl font-black">{formatCOP(PRICE_1_NOW)}</div>
                <div className="mt-2 text-xs text-white/70">Material completo (2017–2025) + formularios automáticos</div>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4 shadow-[0_0_0_1px_rgba(232,121,249,0.25),0_0_36px_rgba(232,121,249,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Paquete #2</div>
                  <span className="rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-200">
                    Más vendido
                  </span>
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <div className="text-2xl font-black">{formatCOP(PRICE_2_NOW)}</div>
                  <div className="text-xs text-white/60 line-through">{formatCOP(PRICE_2_OLD)}</div>
                </div>
                <div className="mt-2 text-xs text-white/70">Todo el material + Plan de Estudio Personalizado</div>
              </div>
            </div>

            <div className="mt-5">
              {HERO_IMAGE ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={HERO_IMAGE}
                  alt="Vista del material (hero)"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-44 place-items-center rounded-2xl border border-white/10 bg-white/5 text-center text-xs text-white/60">
                  <div className="px-6">
                    <div className="font-semibold text-white">(Opcional) Imagen/Mockup del material</div>
                    <div className="mt-1">Pega una imagen en HERO_IMAGE para que esto se vea brutal.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   TRUST BAR
====================================================== */

function TrustBar() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-semibold">Más de <span className="text-white">1500 estudiantes</span> ya lo adquirieron</div>
          <div className="flex flex-wrap gap-2 text-xs text-white/70">
            <Chip>Único pago</Chip>
            <Chip>Acceso permanente</Chip>
            <Chip>Actualizaciones semanales</Chip>
            <Chip>Entrega inmediata por WhatsApp</Chip>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   VIDEO SECTION
====================================================== */

function VideoSection({
  id,
  eyebrow,
  title,
  subtitle,
  embedUrl,
  bullets,
  primary,
  secondary,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  embedUrl: string;
  bullets: string[];
  primary: { label: string; onClick?: () => void; href?: string };
  secondary?: { label: string; onClick?: () => void; href?: string };
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-widest text-white/60">{eyebrow}</div>
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h2>
          <p className="text-sm leading-relaxed text-white/70">{subtitle}</p>

          <ul className="space-y-2 text-sm text-white/75">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <Spark /> <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            {primary.href ? (
              <a className="btn-primary" href={primary.href}>
                {primary.label}
              </a>
            ) : (
              <button className="btn-primary" onClick={primary.onClick}>
                {primary.label}
              </button>
            )}

            {secondary ? (
              secondary.href ? (
                <a className="btn-secondary" href={secondary.href}>
                  {secondary.label}
                </a>
              ) : (
                <button className="btn-secondary" onClick={secondary.onClick}>
                  {secondary.label}
                </button>
              )
            ) : null}
          </div>
        </div>

        <div className="card-neo overflow-hidden p-0">
          <div className="aspect-video w-full bg-white/5">
            {embedUrl ? (
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="grid h-full place-items-center px-6 text-center text-xs text-white/60">
                <div>
                  <div className="font-semibold text-white">Pega aquí tu embed URL</div>
                  <div className="mt-1">Edita VIDEO_PRESENTATION_URL / VIDEO_WALKTHROUGH_URL.</div>
                  <div className="mt-3">Recomendado: YouTube no listado (embed).</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   TESTIMONIALS (arriba de transformación ✅)
====================================================== */

function TestimonialsSection() {
  const [tab, setTab] = useState<"all" | "puntaje" | "chat">("all");

  const filtered = useMemo(() => {
    if (tab === "all") return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.type === tab);
  }, [tab, TESTIMONIALS]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Testimonios">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">PRUEBA SOCIAL</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            Resultados y chats reales
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Reemplaza estos placeholders por tus capturas (puntajes y chats). No hace falta texto largo.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setTab("all")} className={cn("chip-btn", tab === "all" && "chip-btn-active")}>
            Todos
          </button>
          <button
            onClick={() => setTab("puntaje")}
            className={cn("chip-btn", tab === "puntaje" && "chip-btn-active")}
          >
            Puntajes
          </button>
          <button onClick={() => setTab("chat")} className={cn("chip-btn", tab === "chat" && "chip-btn-active")}>
            Chats
          </button>
        </div>
      </div>

      <div className="mt-6">
        <HorizontalGallery items={filtered} />
      </div>
    </section>
  );
}

function HorizontalGallery({
  items,
}: {
  items: Array<{ id: string; img: string; alt: string; caption?: string }>;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {items.map((t) => (
          <div key={t.id} className="snap-start">
            <div className="card-neo w-[280px] overflow-hidden md:w-[320px]">
              {t.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.img}
                  alt={t.alt}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-44 place-items-center bg-white/5 text-xs text-white/60">
                  Pega aquí imagen del testimonio
                </div>
              )}
              <div className="p-4 text-xs text-white/70">{t.caption ?? ""}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        className="gallery-nav left-2"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        className="gallery-nav right-2"
        aria-label="Siguiente"
      >
        ›
      </button>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

/* ======================================================
   TRANSFORMATION (después de testimonios ✅)
====================================================== */

function TransformationSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Transformación">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-widest text-white/60">TRANSFORMACIÓN</div>
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            Lo que cambia cuando estudias con orden
          </h2>
          <p className="text-sm leading-relaxed text-white/70">
            Tres sensaciones que casi todos viven: antes, durante y después de prepararse con el material.
          </p>

          <div className="grid gap-3">
            <NeonCard
              title="Antes"
              desc="Ansiedad por no saber por dónde empezar, sensación de ir tarde y estudiar sin rumbo."
              tone="danger"
            />
            <NeonCard
              title="Durante"
              desc="Control total: sigues un plan, practicas con preguntas reales y mides tu progreso con formularios automáticos."
              tone="info"
            />
            <NeonCard
              title="Después"
              desc="Seguridad: llegas con meses de ventaja, con estrategia y confianza para subir tu puntaje."
              tone="success"
            />
          </div>
        </div>

        <div className="card-neo overflow-hidden p-0">
          {TRANSFORMATION_IMAGE ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={TRANSFORMATION_IMAGE}
              alt="Transformación (antes/después)"
              className="w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid aspect-[4/3] place-items-center bg-white/5 px-8 text-center text-xs text-white/60">
              <div>
                <div className="font-semibold text-white">(Opcional) Imagen de transformación</div>
                <div className="mt-1">Pega una imagen en TRANSFORMATION_IMAGE.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   INCLUDES (beneficios y características)
====================================================== */

function IncludesSection() {
  const items = [
    { title: "Cuadernillos oficiales 2017–2025", desc: "Los mejores y más recientes, organizados para que avances con estrategia." },
    { title: "Respuestas explicadas paso a paso", desc: "No solo es la respuesta: entiendes el porqué para no volver a fallar." },
    { title: "+80 formularios automáticos", desc: "Calificación inmediata para medir progreso real (como los simulacros)." },
    { title: "Simulacros VIP", desc: "Práctica tipo examen para subir rendimiento bajo presión." },
    { title: "Compilados por materia", desc: "Matemáticas, Lectura, Sociales, Biología, Química, Física e Inglés." },
    { title: "Clases grabadas + temarios", desc: "Refuerzo rápido cuando un tema se te dificulta." },
    { title: "Acceso permanente", desc: "Pago único, sin mensualidades. Tu material queda para siempre." },
    { title: "Actualizaciones semanales", desc: "El material se mantiene vivo y actualizado con el tiempo." },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Qué incluye">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">QUÉ INCLUYE</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="mt-2 text-sm text-white/70">
            La idea es simple: menos caos, más práctica real, y un sistema que te acompaña hasta el día del ICFES.
          </p>
        </div>
        <div className="text-xs text-white/60">Pago único · Entrega por WhatsApp · Drive organizado</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.title} className="card-neo p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                <Spark />
              </div>
              <div>
                <h3 className="font-bold">{it.title}</h3>
                <p className="mt-1 text-sm text-white/70">{it.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   PERSONAL PLAN (sección dedicada)
====================================================== */

function PersonalPlanSection({ onViewP2 }: { onViewP2: () => void }) {
  const benefits = [
    "Te dice EXACTAMENTE qué hacer y en qué orden (sin improvisar)",
    "Se adapta a tu fecha, ritmo, tiempo disponible y materias",
    "Evitas perder tiempo con cuadernillos que no te aportan",
    "Llegas con meses de ventaja y progreso medible",
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Plan personalizado">
      <div className="card-neo p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-200">
              <span className="h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.7)]" />
              Incluido en Paquete #2
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              Plan de Estudio Personalizado
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              El diferencial #1: harás únicamente los mejores cuadernillos y el orden correcto según tu objetivo.
            </p>
          </div>

          <button onClick={onViewP2} className="btn-primary">
            Ver Paquete #2 (Más vendido)
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-bold">¿Qué recibes?</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li className="flex gap-2"><Check /> Cronograma a tu ritmo</li>
              <li className="flex gap-2"><Check /> Priorización por materias</li>
              <li className="flex gap-2"><Check /> Ruta clara: qué hacer cada día</li>
              <li className="flex gap-2"><Check /> Entrega en pocas horas por WhatsApp</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-bold">Beneficios directos</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {benefits.map((b) => (
                <li key={b} className="flex gap-2"><Spark /> {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   EXAMPLES (Accordion por materia)
====================================================== */

function ExamplesAccordion() {
  const [open, setOpen] = useState<string>(SUBJECT_EXAMPLES[0]?.key ?? "mate");

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Ejemplos">
      <div>
        <div className="text-xs font-semibold tracking-widest text-white/60">EJEMPLOS REALES</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
          Así se ven las preguntas y explicaciones
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Abre una materia y mira un ejemplo real (pregunta + explicación). Reemplaza las imágenes cuando quieras.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          {SUBJECT_EXAMPLES.map((s) => (
            <button
              key={s.key}
              onClick={() => setOpen(s.key)}
              className={cn(
                "w-full rounded-2xl border px-4 py-4 text-left transition",
                open === s.key
                  ? "border-fuchsia-400/40 bg-fuchsia-500/10 shadow-[0_0_0_1px_rgba(232,121,249,0.20)]"
                  : "border-white/10 bg-white/5 hover:bg-white/7"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{s.label}</div>
                <div className="text-xs text-white/60">Ver ejemplo</div>
              </div>
            </button>
          ))}
        </div>

        <div className="card-neo overflow-hidden p-0">
          {(() => {
            const item = SUBJECT_EXAMPLES.find((x) => x.key === open);
            if (!item) return null;
            return item.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.img} alt={item.alt} className="w-full object-cover" loading="lazy" />
            ) : (
              <div className="grid aspect-[4/3] place-items-center bg-white/5 px-8 text-center text-xs text-white/60">
                <div>
                  <div className="font-semibold text-white">Pega aquí la imagen de: {item.label}</div>
                  <div className="mt-1">Edita SUBJECT_EXAMPLES (img).</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   PACKAGES (2 rectángulos)
====================================================== */

function PackagesSection({
  selected,
  onSelect,
  onGoPay,
}: {
  selected: 1 | 2;
  onSelect: (v: 1 | 2) => void;
  onGoPay: () => void;
}) {
  const p1Bullets = [
    "Cuadernillos oficiales 2017–2025 (los mejores)",
    "Respuestas explicadas paso a paso",
    "+80 formularios automáticos (calificación inmediata)",
    "Simulacros VIP + compilados por materia",
    "Clases grabadas + temarios",
    "Acceso permanente + actualizaciones semanales",
  ];

  const p2Bullets = [
    "Todo lo del Paquete #1",
    "Plan de Estudio Personalizado (entregado por WhatsApp)",
    "Cronograma a tu ritmo + priorización por materias",
    "Guía clara: qué hacer y en qué orden",
    "Soporte por WhatsApp",
  ];

  return (
    <section id="packages" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Paquetes">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">OFERTAS</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            Elige tu paquete
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Pago único · Acceso permanente · Actualizaciones semanales
          </p>
        </div>
        <div className="text-xs text-white/60">Luego bajas a “Métodos de pago”</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Paquete 1 */}
        <div
          className={cn(
            "card-neo p-6",
            selected === 1 && "ring-1 ring-cyan-300/40 shadow-[0_0_32px_rgba(34,211,238,0.10)]"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/60">PAQUETE #1</div>
              <div className="mt-1 text-lg font-black">{PACKAGE_1_NAME}</div>
            </div>
            <button
              type="button"
              className={cn("select-pill", selected === 1 && "select-pill-active")}
              onClick={() => onSelect(1)}
            >
              {selected === 1 ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <div className="text-3xl font-black">{formatCOP(PRICE_1_NOW)}</div>
            <div className="text-sm text-white/60 line-through">{formatCOP(PRICE_1_OLD)}</div>
            <div className="ml-auto text-xs text-white/60">COP</div>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {p1Bullets.map((b) => (
              <div key={b} className="flex gap-2"><Check /> {b}</div>
            ))}
          </div>

          <button onClick={onGoPay} className="btn-primary mt-6 w-full">
            ¡Quiero el Paquete #1!
          </button>
          <div className="mt-3 text-center text-xs text-white/60">Te lleva a Métodos de pago ↓</div>
        </div>

        {/* Paquete 2 */}
        <div
          className={cn(
            "card-neo p-6",
            "border-fuchsia-400/30 bg-fuchsia-500/10",
            selected === 2 && "ring-1 ring-fuchsia-300/50 shadow-[0_0_44px_rgba(232,121,249,0.14)]"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-white/60">PAQUETE #2</div>
                <span className="rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-100">
                  Más vendido
                </span>
              </div>
              <div className="mt-1 text-lg font-black">{PACKAGE_2_NAME}</div>
            </div>
            <button
              type="button"
              className={cn("select-pill", selected === 2 && "select-pill-active")}
              onClick={() => onSelect(2)}
            >
              {selected === 2 ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <div className="text-3xl font-black">{formatCOP(PRICE_2_NOW)}</div>
            <div className="text-sm text-white/60 line-through">{formatCOP(PRICE_2_OLD)}</div>
            <div className="ml-auto text-xs text-white/60">COP</div>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {p2Bullets.map((b) => (
              <div key={b} className="flex gap-2"><Spark /> {b}</div>
            ))}
          </div>

          <button onClick={onGoPay} className="btn-primary mt-6 w-full">
            ¡Quiero el Paquete #2!
          </button>
          <div className="mt-3 text-center text-xs text-white/60">Te lleva a Métodos de pago ↓</div>
        </div>
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   GUARANTEE (30 minutos)
====================================================== */

function GuaranteeSection({ waLink }: { waLink: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Garantía">
      <div className="card-neo p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">GARANTÍA DE CONFIANZA</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              30 minutos de acceso para explorar
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Tienes <b className="text-white">30 minutos</b> para entrar, explorar y confirmar que el material es exactamente lo que viste.
            </p>
          </div>

          <a href={waLink} className="btn-secondary">
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   LIMITED OFFER + COUNTDOWN
====================================================== */

function LimitedOfferSection({ deadlineISO, onGoPay }: { deadlineISO: string; onGoPay: () => void }) {
  const { days, hours, minutes, seconds } = useCountdown(deadlineISO);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Oferta limitada">
      <div className="card-neo p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="text-xs font-semibold tracking-widest text-white/60">OFERTA POR TIEMPO LIMITADO</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              A medida que se acerque el ICFES, el precio sube
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Aprovecha el precio actual. Contador hasta el <b className="text-white">15 de marzo de 2026</b>.
            </p>
          </div>

          <div className="grid gap-3">
            <CountdownRow days={days} hours={hours} minutes={minutes} seconds={seconds} />
            <button onClick={onGoPay} className="btn-primary">
              Aprovechar precio hoy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function useCountdown(deadlineISO: string) {
  const [diff, setDiff] = useState<number>(() => {
    const t = new Date(deadlineISO).getTime() - Date.now();
    return Math.max(0, t);
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = new Date(deadlineISO).getTime() - Date.now();
      setDiff(Math.max(0, t));
    }, 1000);
    return () => window.clearInterval(id);
  }, [deadlineISO]);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function CountdownRow({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <TimeBox label="Días" value={days} />
      <TimeBox label="Horas" value={hours} />
      <TimeBox label="Min" value={minutes} />
      <TimeBox label="Seg" value={seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  const v = value.toString().padStart(2, "0");
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div className="text-2xl font-black tracking-tight">{v}</div>
      <div className="mt-1 text-[11px] text-white/60">{label}</div>
    </div>
  );
}

/* ======================================================
   FIT (No es para ti / Sí es para ti)
====================================================== */

function FitSection() {
  const no = [
    "Quieres resultados sin estudiar nada",
    "Buscas trucos mágicos sin practicar",
    "No vas a seguir un plan ni medir progreso",
    "Solo piensas improvisar el último mes",
  ];

  const yes = [
    "Quieres subir puntaje con estructura real",
    "Te sirve tener TODO organizado en un solo lugar",
    "Quieres practicar con preguntas reales + explicación",
    "Quieres llegar con meses de ventaja al ICFES",
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Para quién es">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-neo p-6">
          <div className="text-sm font-black text-white">Este material NO es para ti si…</div>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {no.map((x) => (
              <li key={x} className="flex gap-2"><X /> {x}</li>
            ))}
          </ul>
        </div>

        <div className="card-neo p-6 border-emerald-400/20 bg-emerald-500/5">
          <div className="text-sm font-black text-white">Este material SÍ es para ti si…</div>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {yes.map((x) => (
              <li key={x} className="flex gap-2"><Check /> {x}</li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   MINI TEST
====================================================== */

function MiniTestSection() {
  return (
    <section id="mini-test" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Mini test">
      <div className="card-neo p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest text-white/60">DIAGNÓSTICO GRATUITO</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              ¿Cuánto sacarías si presentaras el ICFES hoy?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Mini test GRATIS con <b className="text-white">25 preguntas reales</b> del último ICFES.
              Incluye <b className="text-white">respuestas explicadas paso a paso</b> y formulario con
              <b className="text-white"> calificación automática</b> (como los simulacros del material completo).
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <Chip>Valor real gratis</Chip>
              <Chip>Confianza</Chip>
              <Chip>Muestra de calidad</Chip>
            </div>
          </div>

          <div className="grid gap-3">
            <a
              href={MINI_TEST_DRIVE_LINK || "#"}
              className={cn("btn-primary", !MINI_TEST_DRIVE_LINK && "opacity-70 pointer-events-none")}
            >
              Abrir Mini Test Gratis
            </a>
            <div className="text-xs text-white/60">
              {MINI_TEST_DRIVE_LINK ? "Abre el Drive directo" : "Pega el link en MINI_TEST_DRIVE_LINK"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   FAQ
====================================================== */

function FAQSection() {
  const faqs = [
    {
      q: "¿El acceso es para siempre?",
      a: "Sí. Es un único pago y el acceso es permanente. Además, hay actualizaciones semanales.",
    },
    {
      q: "¿Cómo recibo el material?",
      a: "Después de pagar, envías el comprobante por WhatsApp y recibes el acceso inmediato al Drive en el mismo chat.",
    },
    {
      q: "¿Qué diferencia hay entre Paquete #1 y #2?",
      a: "El Paquete #2 incluye TODO lo del #1 + Plan de Estudio Personalizado (cronograma a tu ritmo entregado en pocas horas por WhatsApp).",
    },
    {
      q: "¿Sirve si voy mal o si estoy empezando?",
      a: "Sí. El material está organizado y el plan (paquete #2) se adapta a tu nivel y tiempo.",
    },
    {
      q: "¿Los formularios califican automáticamente?",
      a: "Sí. Tienes +80 formularios y simulacros con calificación automática para medir tu progreso real.",
    },
    {
      q: "¿Puedo usarlo desde el celular?",
      a: "Sí. Puedes abrir el Drive y los formularios desde celular o computador.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Preguntas frecuentes">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">FAQ</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Preguntas frecuentes</h2>
          <p className="mt-2 text-sm text-white/70">Yo puse unas base. Tú las cambias por las reales que te preguntan.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="card-neo p-5">
            <summary className="cursor-pointer list-none font-semibold">
              <span className="flex items-center justify-between gap-4">
                {f.q}
                <span className="text-white/50">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-white/70">{f.a}</p>
          </details>
        ))}
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   PAYMENTS (destino de botones)
====================================================== */

function PaymentsSection({
  selected,
  setSelected,
  wompiP1,
  wompiP2,
  waProofP1,
  waProofP2,
}: {
  selected: 1 | 2;
  setSelected: (v: 1 | 2) => void;
  wompiP1: string;
  wompiP2: string;
  waProofP1: string;
  waProofP2: string;
}) {
  const proofLink = selected === 1 ? waProofP1 : waProofP2;
  const wompiLink = selected === 1 ? wompiP1 : wompiP2;

  return (
    <section id="payments" className="mx-auto max-w-6xl px-5 py-12 md:py-16" aria-label="Métodos de pago">
      <div className="card-neo p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">MÉTODOS DE PAGO</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Paga y recibe el acceso por WhatsApp</h2>
            <p className="mt-2 text-sm text-white/70">
              Elige tu paquete, paga por transferencia o link, y envía el comprobante. Te damos acceso inmediato al Drive.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-bold">Paso 1 — Elige tu paquete</div>
            <div className="mt-4 grid gap-2">
              <button
                className={cn("select-row", selected === 1 && "select-row-active")}
                onClick={() => setSelected(1)}
              >
                <div>
                  <div className="text-sm font-semibold">Paquete #1</div>
                  <div className="text-xs text-white/60">{formatCOP(PRICE_1_NOW)} COP</div>
                </div>
                <span className="text-xs text-white/60">{selected === 1 ? "✓" : ""}</span>
              </button>

              <button
                className={cn("select-row", selected === 2 && "select-row-active")}
                onClick={() => setSelected(2)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">Paquete #2</div>
                    <span className="rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-100">Más vendido</span>
                  </div>
                  <div className="text-xs text-white/60">{formatCOP(PRICE_2_NOW)} COP</div>
                </div>
                <span className="text-xs text-white/60">{selected === 2 ? "✓" : ""}</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-bold">Paso 2 — Paga por tu método</div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                <div className="text-xs font-semibold text-white/70">Transferencia (recomendado)</div>
                <div className="mt-2 grid gap-2 text-sm">
                  <CopyRow label="Nequi" value={NEQUI_NUMBER} note={ACCOUNT_HOLDER} />
                  <CopyRow label={BANK_NAME} value={BANCOLOMBIA_ACCOUNT} note={ACCOUNT_HOLDER} />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                <div className="text-xs font-semibold text-white/70">Link de pago (PSE / tarjeta)</div>
                <a
                  href={wompiLink || "#"}
                  className={cn("btn-secondary w-full text-center", !wompiLink && "opacity-70 pointer-events-none")}
                >
                  {wompiLink ? "Pagar con link (Wompi)" : "Pega WOMPI_LINK_P1 / WOMPI_LINK_P2"}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-bold">Paso 3 — Envía el comprobante y recibe el acceso</div>
          <p className="mt-2 text-sm text-white/70">
            Cuando pagues, envía el comprobante por WhatsApp y te damos acceso inmediato al Drive. Si compras el Paquete #2,
            te pedimos los datos del plan y se envía en pocas horas por el mismo WhatsApp.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={proofLink} className="btn-primary">
              Enviar comprobante por WhatsApp
            </a>
            <a href={makeWaLink(WHATSAPP_BASE_MESSAGE)} className="btn-secondary">
              Hacer una pregunta
            </a>
          </div>

          <div className="mt-3 text-xs text-white/60">
            Tip: puedes fijar el chat para que el cliente vea instrucciones y reciba el Drive ahí mismo.
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="font-semibold text-white">{label}</div>
        <div className="text-sm text-zinc-400">{value}</div>
        {note && <div className="text-xs text-zinc-500">{note}</div>}
      </div>

      <button
        onClick={handleCopy}
        className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-white hover:bg-zinc-800 transition"
      >
        {copied ? "Copiado ✓" : "Copiar"}
      </button>
    </div>
  );
}

/* ======================================================
   FOOTER / FLOATING / TOKENS
====================================================== */

function Footer({ waLink }: { waLink: string }) {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-16 pt-8" aria-label="Footer">
      <div className="card-neo p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">{BRAND}</div>
            <div className="text-xs text-white/60">TODO: completar contenido del footer</div>
          </div>
          <a href={waLink} className="btn-secondary">
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp({ waLink }: { waLink: string }) {
  return (
    <a
      href={waLink}
      aria-label="WhatsApp"
      className="floating-wa"
    >
      WhatsApp
    </a>
  );
}

function StyleTokens() {
  return (
    <style jsx global>{`
      .text-glow {
        color: #ffffff;
        text-shadow: 0 0 28px rgba(232, 121, 249, 0.35);
      }
      .card-neo {
        border-radius: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
      }
      .btn-primary,
      .btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: 0.9rem;
        padding: 0.7rem 1.2rem;
        font-weight: 700;
        transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
      }
      .btn-primary {
        background: #ffffff;
        color: #0a0a0a;
      }
      .btn-primary:hover {
        background: #f5f5f5;
        transform: translateY(-1px);
      }
      .btn-secondary {
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        background: rgba(255, 255, 255, 0.04);
      }
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        padding: 0.35rem 0.7rem;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .badge-cyan {
        border-color: rgba(34, 211, 238, 0.4);
        color: #67e8f9;
      }
      .badge-emerald {
        border-color: rgba(52, 211, 153, 0.4);
        color: #6ee7b7;
      }
      .chip {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.35rem 0.7rem;
        background: rgba(255, 255, 255, 0.04);
      }
      .chip-btn {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.04);
        padding: 0.35rem 0.9rem;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .chip-btn-active {
        border-color: rgba(232, 121, 249, 0.4);
        background: rgba(232, 121, 249, 0.12);
        color: #f5d0fe;
      }
      .select-pill {
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        padding: 0.35rem 0.8rem;
        font-size: 0.75rem;
      }
      .select-pill-active {
        border-color: rgba(34, 211, 238, 0.5);
        background: rgba(34, 211, 238, 0.12);
        color: #cffafe;
      }
      .select-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.03);
      }
      .select-row-active {
        border-color: rgba(232, 121, 249, 0.4);
        background: rgba(232, 121, 249, 0.12);
      }
      .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(10, 10, 10, 0.6);
        height: 2.2rem;
        width: 2.2rem;
        display: grid;
        place-items: center;
        font-size: 1.2rem;
      }
      .floating-wa {
        position: fixed;
        right: 1.2rem;
        bottom: 1.2rem;
        z-index: 50;
        border-radius: 999px;
        background: #22c55e;
        color: #0a0a0a;
        padding: 0.65rem 1rem;
        font-weight: 700;
        box-shadow: 0 12px 30px rgba(34, 197, 94, 0.35);
      }
    `}</style>
  );
}

/* ======================================================
   SMALL UI PRIMITIVES
====================================================== */

function Badge({ children, variant }: { children: React.ReactNode; variant?: "cyan" | "emerald" }) {
  return <span className={cn("badge", variant === "cyan" && "badge-cyan", variant === "emerald" && "badge-emerald")}>{children}</span>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

function Separator() {
  return <div className="mt-10 h-px w-full bg-white/10" aria-hidden />;
}

function NeonCard({
  title,
  desc,
  tone,
}: {
  title: string;
  desc: string;
  tone: "danger" | "info" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "border-rose-400/20 bg-rose-500/10"
      : tone === "success"
        ? "border-emerald-400/20 bg-emerald-500/10"
        : "border-cyan-400/20 bg-cyan-500/10";

  return (
    <div className={cn("rounded-2xl border p-4", toneClass)}>
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 text-emerald-300"
      fill="currentColor"
    >
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 0 1 1.4-1.4l3.2 3.2 6.7-6.7a1 1 0 0 1 1.4 0z" />
    </svg>
  );
}

function X() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 text-rose-300"
      fill="currentColor"
    >
      <path d="M6.3 5.3a1 1 0 0 1 1.4 0L10 7.6l2.3-2.3a1 1 0 1 1 1.4 1.4L11.4 9l2.3 2.3a1 1 0 0 1-1.4 1.4L10 10.4l-2.3 2.3a1 1 0 0 1-1.4-1.4L8.6 9 6.3 6.7a1 1 0 0 1 0-1.4z" />
    </svg>
  );
}

function Spark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 text-fuchsia-300"
      fill="currentColor"
    >
      <path d="M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8L12 2z" />
    </svg>
  );
}
