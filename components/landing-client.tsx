"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { trackContact } from "../lib/fbq";

/* ======================================================
   ✅ CONFIGURACIÓN (EDITA AQUÍ)
====================================================== */

const BRAND = "PreICFES Material";

// WhatsApp
const WHATSAPP_NUMBER = "+573208234642"; // ✅ tu número
const WHATSAPP_HERO_MESSAGE =
  "\u{1F3C6}\u{1F4DA}Holaa, Me gustaría adquirir el *Material ICFES 2026*, quiero más información \u{1F60A}";
const WHATSAPP_FLOATING_MESSAGE =
  "\u{1F393}\u{1F680} Holaa, Me gustaría adquirir el *Material ICFES 2026*, quiero más información \u{1F60A}";
const WHATSAPP_GUARANTEE_MESSAGE =
  "\u{1F31F}\u{1F4D8} Holaa, estuve viendo la info y quiero acceder por favor al *Material ICFES Supremo* por 30 minutos para conocer bien todo lo que incluye \u{1F60A}";
const WHATSAPP_INFO_MESSAGE =
  "\u{1F4D9}\u{1F393} Holaa, Me gustaría adquirir el *Material ICFES 2026*, tengo una pregunta \u{1F60A}";

// Paquetes / precios
const PRICE_1_OLD = 80000;
const PRICE_1_NOW = 60000;
const PRICE_2_OLD = 135000;
const PRICE_2_NOW = 95000;

const PACKAGE_1_NAME = "MATERIAL DE ESTUDIO SUPREMO";
const PACKAGE_2_NAME = "🎓 MATERIAL DE ESTUDIO SUPREMO + 🗓️ PLAN DE ESTUDIO PERSONALIZADO";

// Links de pago (Wompi / PSE) – 2 links (uno por paquete)
const WOMPI_LINK_P1 = ""; // 🔗 pega aquí link Paquete #1
const WOMPI_LINK_P2 = ""; // 🔗 pega aquí link Paquete #2

// Transferencias
const NEQUI_NUMBER = "3168695397";
const BANK_NAME = "🏦 Bancolombia";
const BANCOLOMBIA_ACCOUNT = "75675989958";
const ACCOUNT_HOLDER = "Iván Gómez";
const LLAVE = "3168695397";

// Deadline del contador (15 marzo 2026)
const DEADLINE_ISO = "2026-03-15T23:59:59-05:00"; // America/Bogota

// Mini test gratuito (Drive directo)
const MINI_TEST_DRIVE_LINK = "https://drive.google.com/drive/folders/17WRXPAIuOKi0PkE0pkpLfy4asH-mJIVV?usp=drive_link"; // 🔗 pega aquí el link directo al Drive del mini test

// Videos (ideal: YouTube no listado para mejor performance)
const VIDEO_PRESENTATION_URL = "https://www.youtube.com/embed/2uAdALhOnAA"; // 🔗 embed (YouTube) o Drive embed
const VIDEO_WALKTHROUGH_URL = ""; // 🔗 embed (YouTube) o Drive embed

// Assets (opcionales) – puedes usar /public/... luego
const HERO_IMAGE = ""; // ej: "/hero.png" o "https://..."
const TRANSFORMATION_IMAGE = "transformacion.jpg"; // ej: "/transform.png" o "https://..."

// Testimonios (placeholders): reemplaza por imágenes tuyas
const TESTIMONIALS: Array<{
  id: string;
  type: "puntaje" | "chat";
  img: string;
  alt: string;
  name?: string;
  quote?: string;
  caption?: string;
}> = [
  {
    id: "p-1",
    type: "puntaje",
    img: "/Testimonios/Puntajes/zuluaga.jpg",
    alt: "Puntaje Miguel Zuluaga",
    name: "Miguel Zuluaga",
    quote: "\"Me preparé para el ICFES casi un año por mi cuenta, y aún así, con solo un mes usando el material supremo aprendí más que con todo lo que hice antes.\"",
  },
  {
    id: "p-2",
    type: "puntaje",
    img: "/Testimonios/Puntajes/Nicolas Ramirez.png",
    alt: "Puntaje Nicolas Ramirez",
    name: "Nicolas Ramirez",
    quote: "\"Preicfes Material me ayudó mucho para practicar, en otros materiales las preguntas están desordenadas o sin respuesta, y en este tuve todo junto, es satisfactorio que gracias a este material y el apoyo que brinda pude pasar a medicina a la UIS, U caldas y U cauca.\"",
  },
  {
    id: "p-3",
    type: "puntaje",
    img: "/Testimonios/Puntajes/ujueta.jpg",
    alt: "Puntaje Juan Esteban",
    name: "Juan Manuel Ujueta",
    quote: "\"El ICFES no es un examen, es una experiencia unica en la vida que se deberia vivir acompañada de los mejores y con un material de estudio tan valioso como este es posible disfrutarla al maximo\"",
  },
  {
    id: "p-4",
    type: "puntaje",
    img: "/Testimonios/Puntajes/mariana.jpg",
    alt: "Puntaje Mariana Londoño",
    name: "Mariana Londoño Castaño",
    quote: "\"“El material me ayudó a conseguir un puntaje que ni yo misma me esperaba, de verdad que se me repitieron un montón de preguntas y no puedo estar más agradecida”.\"",
  },
  {
    id: "p-5",
    type: "puntaje",
    img: "/Testimonios/Puntajes/paula.jpg",
    alt: "Puntaje Maria Paula",
    name: "Maria Paula Osso",
    quote: "\"Este material fue clave en mi preparación para el ICFES. De verdad me ayudó muchísimo a entender mejor y a confiar más en mí durante el proceso. Con constancia y disciplina los resultados se notan y gracias a este apoyo logré el puntaje que me permitió acercarme a mis sueños. Muy agradecida por todo ✨\"",
  },
  { id: "c-1", type: "chat", img: "/Testimonios/Chats/chat1.jpg", alt: "Chat testimonio 1" },
  { id: "c-2", type: "chat", img: "/Testimonios/Chats/chat2.jpg", alt: "Chat testimonio 2" },
  { id: "c-3", type: "chat", img: "/Testimonios/Chats/chat3.jpg", alt: "Chat testimonio 3" },
  { id: "c-4", type: "chat", img: "/Testimonios/Chats/chat4.jpg", alt: "Chat testimonio 4" },
  { id: "c-5", type: "chat", img: "/Testimonios/Chats/chat5.jpg", alt: "Chat testimonio 5" },
];

// Ejemplos por materia (imágenes listas según dijiste)
const SUBJECT_EXAMPLES: Array<{ key: string; label: string; img: string; alt: string }> = [
  { key: "mate", label: "Matemáticas", img: "preguntas-ejemplo/ejemplomatematicas.png", alt: "Ejemplo Matemáticas" },
  { key: "sociales", label: "Sociales", img: "preguntas-ejemplo/ejemplosociales.png", alt: "Ejemplo Sociales" },
  { key: "lectura", label: "Lectura Crítica", img: "preguntas-ejemplo/ejemplolectura.png", alt: "Ejemplo Lectura" },
  { key: "bio", label: "Biología", img: "preguntas-ejemplo/ejemplobiologia.png", alt: "Ejemplo Biología" },
  { key: "quim", label: "Química", img: "preguntas-ejemplo/ejemploquimica.png", alt: "Ejemplo Química" },
  { key: "fis", label: "Física", img: "preguntas-ejemplo/ejemplofisica.png", alt: "Ejemplo Física" },
  { key: "ing", label: "Inglés", img: "preguntas-ejemplo/ejemploingles.png", alt: "Ejemplo Inglés" },
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
  const [floatingVisible, setFloatingVisible] = useState(false);

  const waHero = useMemo(() => makeWaLink(WHATSAPP_HERO_MESSAGE), [WHATSAPP_HERO_MESSAGE, makeWaLink]);
  const waFloating = useMemo(
    () => makeWaLink(WHATSAPP_FLOATING_MESSAGE),
    [WHATSAPP_FLOATING_MESSAGE, makeWaLink]
  );
  const waGuarantee = useMemo(
    () => makeWaLink(WHATSAPP_GUARANTEE_MESSAGE),
    [WHATSAPP_GUARANTEE_MESSAGE, makeWaLink]
  );
  const waInfo = useMemo(() => makeWaLink(WHATSAPP_INFO_MESSAGE), [WHATSAPP_INFO_MESSAGE, makeWaLink]);

  const waProofP1 = useMemo(
    () =>
      makeWaLink(
        "Holaa \u{1F60A}, me gustaría adquirir el \u{1F4D8} Paquete #1 (\u{1F393}\u{1F4DA}MATERIAL DE ESTUDIO SUPREMO). Ya hice el pago y adjunto comprobante.\n\nNombre: ___\nCorreo: ___"
      ),
    [PACKAGE_1_NAME, makeWaLink]
  );

  const waProofP2 = useMemo(
    () =>
      makeWaLink(
        "Holaa \u{1F60A}, me gustaría adquirir el \u{1F4D7}Paquete #2 (\u{1F393}\u{1F3C6} MATERIAL DE ESTUDIO SUPREMO + \u{1F5D3}\u{FE0F} PLAN DE ESTUDIO PERSONALIZADO). Ya hice el pago y adjunto comprobante.\n\nNombre: ___\nCorreo:___"
      ),
    [PACKAGE_2_NAME, makeWaLink]
  );

  const heroVideoBullets = [
    "Único pago · Acceso permanente",
    "Actualizaciones semanales",
    "Material real y organizado para subir puntaje",
  ];

  useEffect(() => {
    const section = document.getElementById("queincluye");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFloatingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-neutral-950 text-neutral-50 selection:bg-fuchsia-400/30 selection:text-white">
      <Hero
        onViewPackages={() => scrollToId("queincluye")}
        onMiniTest={() => scrollToId("mini-test")}
        waLink={waHero}
        rightContent={
          <div className="card-neo p-5 md:p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                🏆📚 ¡Más de 1500 estudiantes ya lo adquirieron!
              </h2>
              <p className="text-sm text-white/70">Descubre el motivo:</p>
            </div>

            <div className="mt-5">
              <div className="aspect-[3/4] w-full max-h-[520px] md:max-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {VIDEO_PRESENTATION_URL ? (
                  <iframe
                    className="h-full w-full"
                    src={VIDEO_PRESENTATION_URL}
                    title="Video presentación"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="grid h-full place-items-center px-6 text-center text-xs text-white/60">
                    <div>
                      <div className="font-semibold text-white">Pega aquí tu embed URL</div>
                      <div className="mt-1">Edita VIDEO_PRESENTATION_URL.</div>
                      <div className="mt-3">Recomendado: YouTube no listado (embed).</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      />


      <TestimonialsSection />

      <div className="bg-glow bg-glow-transform">
        <TransformationSection />
      </div>

      <div className="bg-glow bg-glow-access">
        <IncludesSection />
      </div>

      <div className="bg-glow bg-glow-plan">
        <PersonalPlanSection
          onViewP2={() => {
            setSelectedPackage(2);
            scrollToId("paquetes");
          }}
        />
      </div>

      {/* <VideoSection
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
        primary={{ label: "⚡️ Quiero ver las ofertas", onClick: () => scrollToId("packages") }}
      /> */}

      <ExamplesAccordion />

      <PackagesSection
        selected={selectedPackage}
        onSelect={setSelectedPackage}
        onGoPay={() => scrollToId("pagos")}
      />

      <GuaranteeSection waLink={waGuarantee} />

      <LimitedOfferSection deadlineISO={DEADLINE_ISO} onGoPay={() => scrollToId("pagos")} />

      <FitSection />

      <div className="bg-glow bg-glow-mini">
        <MiniTestSection />
      </div>

      <FAQSection />

      <PaymentsSection
        selected={selectedPackage}
        setSelected={setSelectedPackage}
        waProofP1={waProofP1}
        waProofP2={waProofP2}
        waInfo={waInfo}
      />

      <Footer waLink={waHero} />

      <FloatingLibraryMenu
        waLink={waFloating}
        instagramUrl="https://www.instagram.com/icfesmaterial/"
        onViewPackages={() => scrollToId("paquetes")}
        visible={floatingVisible}
      />

      <StyleTokens />
    </main>
  );
}

/* ======================================================
   HERO
====================================================== */

function Hero({
  onViewPackages,
  onMiniTest,
  waLink,
  rightContent,
}: {
  onViewPackages: () => void;
  onMiniTest: () => void;
  waLink: string;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className="bg-glow bg-glow-hero">
      <section className="relative mx-auto max-w-6xl px-5 pt-8 pb-10 md:pt-12" aria-label="Hero">
        <div className={cn("grid gap-10 md:items-center", rightContent ? "md:grid-cols-2" : undefined)}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src="/logos/logo2blancov1sinfondo.png"
                alt="PreICFES Material"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange-300">
              ÚNICO PAGO
              </span>
              <Badge variant="cyan">Actualizaciones semanales</Badge>
              <Badge variant="emerald">Acceso permanente</Badge>
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Prepárate para el ICFES con el <span className="text-glow">mejor material de estudio</span> de todo el país
            </h1>

            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              ¿Te imaginas tener en tu bolsillo todo el material que necesitas para un puntaje alto en el ICFES
              con un <span className="text-white">Plan de Estudio Personalizado</span> a tu ritmo? 🚀
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
              <button onClick={onViewPackages} className="btn-primary hero-include-btn">
                📘¿Que Incluye?
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
              <a className="underline hover:text-white" href={waLink} onClick={trackContact}>
                ¿Dudas? Escríbeme
              </a>
            </div>
          </div>

          {rightContent ? (
            <div className="relative">
              {rightContent}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
            </div>
          ) : null}
        </div>
      </section>
    </div>
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
    <div className="bg-glow bg-glow-video">
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
    </div>
  );
}

/* ======================================================
   TRUST BAR
====================================================== */

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
    <div className="bg-glow bg-glow-proof">
      <section id="testimonios" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Testimonios">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">METODO COMPROBADO</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              🎓🤩 Resultados y Testimonios
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Si todos ellos pudieron... ¡TU TAMBIÉN!, sacar más de 400 es algo normal para los que se preparan con nuestro material 
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
    </div>
  );
}

function HorizontalGallery({
  items,
}: {
  items: Array<{
    id: string;
    img: string;
    alt: string;
    type?: "puntaje" | "chat";
    caption?: string;
    name?: string;
    quote?: string;
  }>;
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
                  className={cn(
                    "w-full object-contain bg-neutral-950/40",
                    t.type === "chat" ? "max-h-72" : "max-h-56"
                  )}
                  loading="lazy"
                />
              ) : (
                <div className="grid h-44 place-items-center bg-white/5 text-xs text-white/60">
                  Pega aquí imagen del testimonio
                </div>
              )}
              <div className="p-4 text-xs text-white/70">
                {t.type === "puntaje" ? (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-white">{t.name ?? "Nombre Apellido"}</div>
                    <p>{t.quote ?? "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\""}"</p>
                  </div>
                ) : (
                  t.caption ?? ""
                )}
              </div>
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
            📚 Lo que sentirás en cada fase de tu preparación 
          </h2>
          <p className="text-sm leading-relaxed text-white/70">
            Tres sensaciones que casi todos viven: antes, durante y después de prepararse con el material.
          </p>

          <div className="grid gap-3">
            <NeonCard
              title="Antes de preparate con Preicfes Material"
              desc="Ansiedad por no saber por dónde empezar, ves al ICFES como algo dificil, crees que vas tarde, que cada vez queda menos tiempo y no has avanzado nada."
              tone="danger"
            />
            <NeonCard
              title="Durante tu preparación"
              desc="Sientes que vas por el camino correcto hacia tu meta con un sistema organizado y dinámico, empiezas a formar un hábito y cada día las preguntas se empiezan a ver más fáciles."
              tone="info"
            />
            <NeonCard
              title="El día del examen"
              desc="Llegas al ICFES con la seguridad y confianza de que sacarás el mejor puntaje, ninguna pregunta te da miedo, al contrario, sientes entusiasmo porque te entreguen la hoja del examen porque sabes que te va a ir increíble."
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
    {
      icon: "📘",
      title: "Preguntas Reales 2017 - 2025  CALENDARIO A Y B",
      desc: "Las mejores y más recientes en todas sus versiones, organizadas para que el día de la prueba llegues con lo mejor en tu cabeza",
      images: [
        "/material/preguntas/pregunta1.png",
        "/material/preguntas/pregunta2.png",
        "/material/preguntas/pregunta3.png",
      ],
    },
    {
      icon: "✏️",
      title: "Respuestas explicadas paso a paso",
      desc: "Todas las semanas estamos trabajando en darle respuesta explicada paso a paso a cada pregunta nueva que sale, garantizando comprensión absoluta de cada posible pregunta, incluyendo el tema del que trata la pregunta y su dificultad",
      images: [
        "/material/respuestas/respuesta1.png",
        "/material/respuestas/respuesta2.png",
        "/material/respuestas/respuesta3.png",
      ],
    },
    {
      icon: "📊",
      title: "+80 Formularios de Google con calificación automática",
      desc: "En cada simulacro podrás marcar y enviar tus respuestas en los Google Forms para recibir tu puntaje de inmediato, sabrás cuantas preguntas buenas y malas tuviste",
      images: [
        "/material/formularios/formulario1.png",
        "/material/formularios/formulario2.png",
        "/material/formularios/formulario3.png",
      ],
    },
    {
      icon: "📓",
      title: "Tips y Temarios actualizados de todas las áreas",
      desc: "+300 Slides y archivos con explicaciones y tips de los temas que salen en el ICFES de cada materia",
      images: [
        "/material/tips/tips1.png",
        "/material/tips/tips2.png",
        "/material/tips/tips3.png",
      ],
    },
    {
      icon: "🏆",
      title: "Simulacros VIP",
      desc: "Últimas 3000 preguntas que ha sacado el ICFES organizadas con sus respuestas explicadas y formularios. En tu Plan de Estudio Personalizado podrás escoger cuantas hacer por día, hay de sobra y siempre vamos agregando preguntas nuevas",
      images: ["/material/simulacros/simulacro1.png", "/material/simulacros/simulacro2.png"],
    },
    {
      icon: "⚡️",
      title: "Compilados VIP",
      desc: "12 Compilados por Materia con +150 preguntas seleccionadas por cada una de las cinco materias del ICFES",
      images: [
        "/material/compilados/compilado1.png",
        "/material/compilados/compilado2.png",
        "/material/compilados/compilado3.png",
      ],
    },
    {
      icon: "🎥",
      title: "Clases Grabadas",
      desc: "Tendrás acceso a más de 200 clases grabadas ya subidas en el material tanto prácticas y teóricas, 3 lives en tik tok semanales siguen actualizandolas",
      images: ["/material/clases/clase1.png", "/material/clases/clase2.png", "/material/clases/clase3.png"],
    },
    {
      icon: "📗",
      title: "Material PreUNAL y PreUDEA",
      desc: "+800 archivos de preparación para los examenes de la Universidad Nacional y la Universidad de Antioquia",
      images: ["/material/preunal/unal1.png", "/material/preunal/unal2.png", "/material/preunal/unal3.png"],
    },
  ];

  return (
    <section id="queincluye" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Qué incluye">
      <div className="flex flex-col gap-3">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">
            TODA LA PREPARACIÓN DISPONIBLE 24/7 PARA TI EN TU BOLSILLO 💻📱
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            🤔 ¿A que tendrás acceso?
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.25fr] md:items-start">
        <div>
          <p className="text-sm text-white/70">
            La idea es simple, tendrás un material digital que podrás abrir todos los días a cualquier hora y en cualquier lugar.
            Esto te permite la máxima flexibilidad y calidad para que estudies todo el tiempo que desees y nunca te canses.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
              ✅ Único pago - sin mensualidades
            </span>
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1">
              🗂️ Entrega en Google Drive
            </span>
            <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1">
              🔒 Acceso permanente
            </span>
            <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1">
              🚀 Actualizaciones semanales
            </span>
          </div>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
            <img
              src="/material/biblioteca.png"
              alt="Biblioteca virtual PreICFES Material"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-white/50">👉 Haz click para conocer el contenido</div>
          {items.map((it) => (
            <details
              key={it.title}
              className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4 transition open:border-cyan-300/40 open:bg-neutral-950/90 open:shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg">
                    <span aria-hidden="true">{it.icon}</span>
                  </div>
                  <div className="font-semibold">{it.title}</div>
                  <span className="ml-auto text-white/60">
                    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4">
                      <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </summary>
              <div className="mt-3 text-sm text-white/70">{it.desc}</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {it.images.length > 0 ? (
                  it.images.map((img) => (
                    <div key={img} className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950/40">
                      <img src={img} alt={it.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  ))
                ) : (
                  <div className="grid h-20 place-items-center rounded-xl border border-white/10 bg-neutral-950/40 text-xs text-white/40 sm:col-span-3">
                    Pega aquí las imágenes del desplegable
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      <Separator />
    </section>
  );
}

/* ======================================================
   PERSONAL PLAN (sección dedicada)
====================================================== */

function PersonalPlanSection({ onViewP2 }: { onViewP2: () => void }) {
  const [activeTab, setActiveTab] = useState<"plan" | "registro">("plan");
  const benefits = [
    "Te dice EXACTAMENTE qué hacer y en qué orden (sin improvisar)",
    "Se adapta a tu fecha, ritmo, tiempo disponible y materias",
    "Evitas perder tiempo con cuadernillos que no te aportan",
    "Llegas con meses de ventaja y progreso medible",
  ];
  const tabs = [
    {
      key: "plan" as const,
      label: "Plan de Estudio Personalizado",
      big: "/plandeestudioyregistro/ejemploplan1.jpg",
      thumbs: [
        "/plandeestudioyregistro/ejemploplan2.jpg",
        "/plandeestudioyregistro/ejemploplan3.jpg",
        "/plandeestudioyregistro/ejemploplan4.jpg",
        "/plandeestudioyregistro/ejemploplan5.jpg",
      ],
    },
    {
      key: "registro" as const,
      label: "Registro de Progreso",
      big: "/plandeestudioyregistro/ejemploregistro1.jpg",
      thumbs: [
        "/plandeestudioyregistro/ejemploregistro2.jpeg",
        "/plandeestudioyregistro/ejemploregistro3.jpg",
        "/plandeestudioyregistro/ejemploregistro4.jpg",
        "/plandeestudioyregistro/ejemploregistro5.jpg",
      ],
    },
  ];
  const defaultBigByTab = {
    plan: tabs[0].big,
    registro: tabs[1].big,
  };
  const [selectedBigByTab, setSelectedBigByTab] = useState<Record<"plan" | "registro", string>>(defaultBigByTab);
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];
  const currentBig = selectedBigByTab[activeTab] || current.big;
  const allImages = [current.big, ...current.thumbs];
  const thumbImages = allImages.filter((src) => src !== currentBig).slice(0, 4);

  return (
    <section id="plan-personalizado" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Plan personalizado">
      <div className="flex flex-col gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-200">
            <span className="h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.7)]" />
            Incluido en Paquete #2
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
            Plan de Estudio Personalizado y Registro de Progreso
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Selecciona el ejemplo y mira cómo se ve por dentro.
          </p>
        </div>

      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Selecciona para ver el ejemplo 👉
        </div>
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-white/40 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
        <div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src={currentBig}
              alt={current.label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {thumbImages.map((src, idx) => (
              <button
                key={`${current.key}-${idx}`}
                type="button"
                onClick={() =>
                  setSelectedBigByTab((prev) => ({
                    ...prev,
                    [current.key]: src,
                  }))
                }
                className={cn(
                  "overflow-hidden rounded-xl border bg-white/5 transition",
                  currentBig === src ? "border-white/40" : "border-white/10 hover:border-white/25"
                )}
              >
                <img src={src} alt={`${current.label} ${idx + 2}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          {activeTab === "plan" ? (
            <div className="space-y-3 text-sm text-white/80">
              <div className="font-semibold text-white">
                🚀 La herramienta definitiva para asegurar un puntaje alto en el ICFES 🎓
              </div>
              <p>
                🌟 Dentro del Material de estudio hay <span className="font-semibold text-white">miles de archivos</span>, ¿como
                saber por cual empezar?
              </p>
              <p>
                📚📘 <span className="font-semibold text-white">Por eso creamos</span> el{" "}
                <span className="font-semibold text-white">Plan de Estudio Personalizado en PDF</span>, una guía tipo calendario
                extra al drive que te dirá día a día qué preguntas hacer, buscando que te prepares siempre con{" "}
                <span className="font-semibold text-white">las preguntas reales más recientes</span>, con respuesta explicada y formularios.
              </p>
              <div className="font-semibold text-white">📙 ¿Por qué este plan es tan único?</div>
              <ul className="space-y-2">
                <li>⚡️ Adaptado al ICFES 2026: harás solamente los mejores cuadernillos adaptados a tu ritmo.</li>
                <li>⚡️ Tendrás un orden claro para seguir cada día.</li>
                <li>⚡️ Nunca te quedarás sin saber qué cuadernillo del material hacer.</li>
                <li>⚡️ Formarás un hábito de estudio inquebrantable.</li>
                <li>⚡️ Podrás proyectar y calcular todo tu estudio hasta el día del examen.</li>
              </ul>
              <div className="font-semibold text-white">🎨 Personalizable:</div>
              <ul className="space-y-2">
                <li>🔹 Elige la fecha de inicio y de fin.</li>
                <li>🔹 Ajusta la cantidad de preguntas diarias.</li>
                <li>🔹 Personaliza los colores a tu gusto.</li>
                <li>🔹 Escoge los días de la semana que prefieres estudiar.</li>
                <li>🔹 Selecciona las materias que quieras darle más enfoque según tu carrera.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-white/80">
              <div className="font-semibold text-white">✨ ¡Registra tu avance como un futuro 500! ✨</div>
              <p>
                Este es <span className="font-semibold text-white">solo un ejemplo</span> de la herramienta que viene incluida con tu
                plan de estudios. 📕
              </p>
              <p>
                Tu <span className="font-semibold text-white">Registro de Progreso o Bitácora ICFES</span> será uno de tus mejores
                compañeros en tu camino hacia el puntaje que sueñas. Servirá para ir contabilizando tu puntaje a lo largo de tu
                preparación y plan de estudio; cada vez que termines uno de los más de 80 formularios de google podrás registrar tu
                puntaje.
              </p>
              <ul className="space-y-2">
                <li>🔹 Aquí anotarás cuántas preguntas buenas tuviste en cada formulario.</li>
                <li>🔹 Podrás saber qué tanto estás mejorando por materia y en cada simulacro que hagas.</li>
                <li>🔹 Te darás cuenta qué materias tienes que reforzar más y cuáles son tus fortalezas.</li>
                <li>🔹 Tendrás un registro de cuántas preguntas buenas y malas tuviste.</li>
                <li>🔹 Conocerás a detalle cuántas preguntas te hicieron falta para alcanzar el puntaje perfecto en cada materia.</li>
              </ul>
              <div>📊 Llevarás el control de tus resultados y medirás tu progreso real.</div>
              <div className="font-semibold text-white">¡Así estudiarás con estrategia y mejorarás en cada simulacro! 🚀</div>
            </div>
          )}
          <div className="mt-5 flex justify-center">
            <button onClick={onViewP2} className="btn-primary">
              Ver Paquete #2 (Más vendido)
            </button>
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
  const activeClassByKey: Record<string, string> = {
    mate: "border-rose-400/40 bg-rose-500/10 shadow-[0_0_0_1px_rgba(248,113,113,0.2)]",
    sociales: "border-orange-400/40 bg-orange-500/10 shadow-[0_0_0_1px_rgba(251,146,60,0.2)]",
    lectura: "border-fuchsia-400/40 bg-fuchsia-500/10 shadow-[0_0_0_1px_rgba(232,121,249,0.2)]",
    bio: "border-lime-400/40 bg-lime-500/10 shadow-[0_0_0_1px_rgba(163,230,53,0.2)]",
    quim: "border-sky-400/40 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]",
    fis: "border-zinc-400/40 bg-zinc-500/10 shadow-[0_0_0_1px_rgba(161,161,170,0.2)]",
    ing: "border-yellow-400/40 bg-yellow-500/10 shadow-[0_0_0_1px_rgba(250,204,21,0.2)]",
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Ejemplos">
      <div>
        <div className="text-xs font-semibold tracking-widest text-white/60">EJEMPLOS REALES</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
          💥 Ejemplos de Pregunta Material ICFES Supremo
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="mb-2 text-sm text-white/70">
            En cada simulacro que resuelvas tendrás las preguntas más recientes a color, con respuesta explicada paso a paso y formularios
            de google con calificación automática
          </p>
          {SUBJECT_EXAMPLES.map((s) => (
            <button
              key={s.key}
              onClick={() => setOpen(s.key)}
              className={cn(
                "w-full rounded-2xl border px-4 py-4 text-left transition",
                open === s.key
                  ? activeClassByKey[s.key] ?? "border-white/20 bg-white/5"
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

        <div className="card-neo h-full overflow-hidden p-0">
          {(() => {
            const item = SUBJECT_EXAMPLES.find((x) => x.key === open);
            if (!item) return null;
            return item.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.img} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
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
    "📚 Preguntas Reales 2017 - 2025 Cal A y B",
    "✏️ Respuestas Explicadas Paso a Paso",
    "📊 +80 Formularios con Calificación Automática",
    "🏆 Simulacros VIP",
    "📙 Mini Test Diagnóstico 2026",
    "🎥 +200 Clases Grabadas",
    "⚡️ Compilados VIP por materia",
    "📓 Tips y Temarios actualizados",
    "🏛️ PreUNAL y PreUDEA",
  ];

  const p2Bullets = [
    "✅ Todo lo del Paquete #1 incluido",
    "🗓️ Plan de Estudio Personalizado",
    "🧭 Registro de Progreso ICFES",
  ];
  const p2Personalize = [
    "Fecha de inicio y de fin",
    "Cantidad de preguntas por día",
    "Colores de cada cuadernillo",
    "Días de la semana que prefieres estudiar",
    "Materias en las que quieras darle más enfoque según tu carrera",
  ];

  return (
    <div className="bg-glow bg-glow-packages">
      <section id="paquetes" className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Paquetes">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">OFERTAS POR TIEMPO LIMITADO</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              🚀 Elige tu paquete
            </h2>
            <p className="mt-2 text-sm text-white/70">
              · 💳 Único Pago (sin mensualidades) · ♾️ Acceso permanente   · 👨🏻‍💻 Soporte 24/7 para resolver tus dudas
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Paquete 1 */}
          <div
          className={cn(
            "card-neo package-card package-card-1 p-6",
            selected === 1 && "package-card-selected-1"
          )}
        >
            <div className="flex items-start justify-between gap-3">
              <div>
              <div className="text-xs text-white/60">📘 PAQUETE #1</div>
              <div className="mt-1 text-lg font-black">🎓 MATERIAL DE ESTUDIO SUPREMO</div>
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

            <button onClick={onGoPay} className="btn-primary package-btn-1 mt-6 w-full">
              ¡Quiero el Paquete #1!
            </button>
            <div className="mt-3 text-center text-xs text-white/60">Te lleva a Métodos de pago ↓</div>
          </div>

          {/* Paquete 2 */}
          <div
          className={cn(
            "card-neo package-card package-card-2 p-6",
            selected === 2 && "package-card-selected-2"
          )}
        >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-white/60">📗 🏆 PAQUETE #2</div>
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
                <div key={b} className="flex gap-2"><Check /> {b}</div>
              ))}
            </div>
            <div className="mt-4 text-sm font-semibold text-white">🎨 Puedes personalizar:</div>
            <div className="mt-2 grid gap-2 text-sm text-white/75">
              {p2Personalize.map((b) => (
                <div key={b} className="flex gap-2"><Check /> {b}</div>
              ))}
            </div>

            <button onClick={onGoPay} className="btn-primary package-btn-2 mt-6 w-full">
              ¡Quiero el Paquete #2!
            </button>
            <div className="mt-3 text-center text-xs text-white/60">Te lleva a Métodos de pago ↓</div>
          </div>
        </div>

        <Separator />
      </section>
    </div>
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

          {/* Meta Pixel Contact event: reuse trackContact on WhatsApp CTAs */}
          <a href={waLink} className="btn-secondary" onClick={trackContact}>
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
    "Eres de los que quieren resultados sin estudiar nada",
    "Buscas trucos mágicos sin practicar",
    "No vas a seguir un plan ni medir tu progreso",
    "Solo piensas improvisar el último mes",
    "Crees que el puntaje en el ICFES es “suerte“",
  ];

  const yes = [
    "Quieres tener la oportunidad de luchar por una meta importante",
    "Tienes pensado sacar el mejor puntaje de tu colegio o ciudad",
    "Te gusta tener TODO organizado en un solo lugar",
    "Quieres practicar con preguntas reales con explicación",
    "Quieres llegar con meses de ventaja al ICFES",
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Para quién es">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(248,113,113,0.2)]">
          <div className="absolute inset-y-4 left-0 w-1 rounded-full bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.8)]" />
          <div className="text-sm font-black text-white">Este material NO es para ti si…</div>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {no.map((x) => (
              <li key={x} className="flex gap-2"><X /> {x}</li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
          <div className="absolute inset-y-4 left-0 w-1 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
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
  const miniTestCards = [
    { title: "25 Preguntas Reales", img: "/minitest/portada.jpeg" },
    { title: "Formulario de Google", img: "/minitest/formulario.jpeg" },
    { title: "Respuestas explicadas", img: "/minitest/respuestas.jpeg" },
  ];

  return (
    <section id="mini-test" className="mx-auto max-w-6xl px-5 py-6 md:py-10" aria-label="Mini test">
      <div className="flex flex-col gap-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-widest text-white/60">¿CUANTO SACARÍAS SI PRESENTARAS EL ICFES HOY?</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            📙 MINI TEST DIAGNÓSTICO GRATUITO
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div className="order-1 md:order-none md:col-start-2">
            <p className="text-sm text-white/70">
              Accede <b className="text-white"> GRATIS y de INMEDIATO </b> a <b className="text-white">25 preguntas reales</b> del último ICFES. <br /><br />
              ¡Podrás experimentar de primera mano la <b className="text-white">calidad del Material Completo! </b>
              Tendrás las <b className="text-white">respuestas explicadas paso a paso</b> y un formulario de google con
              <b className="text-white"> calificación automática</b> para que conozcas tu nivel actual en cada materia antes de empezar a prepararte.
            </p>
          </div>

          <div className="order-2 md:order-none md:col-start-2">
            <div className="mt-2 grid grid-cols-3 gap-2">
              {miniTestCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-2">
                  <div className="text-center text-[10px] font-semibold tracking-widest text-white/70">{card.title}</div>
                  <div className="mt-2 aspect-[3/4] w-full rounded-xl border border-white/10 bg-neutral-950/40">
                    {card.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.img}
                        alt={card.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs text-white/40">
                        Pega aquí la imagen
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-3 md:order-none md:col-start-1 md:row-start-1 md:row-span-3 md:self-stretch">
            <div className="flex h-full items-center justify-center">
              <img
                src="/minitest/minitest.png"
                alt="Mini test diagnóstico"
                className="mx-auto w-1/2 md:w-11/12 object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-4 md:order-none md:col-start-2">
            <div className="grid gap-3">
              <a
                href={MINI_TEST_DRIVE_LINK || "#"}
                className={cn("btn-primary mini-test-btn", !MINI_TEST_DRIVE_LINK && "opacity-70 pointer-events-none")}
              >
                Abrir Mini Test Gratis
              </a>
              <div className="text-xs text-white/60">
                {MINI_TEST_DRIVE_LINK ? "👉 Te lleva al drive inmediatamente" : "Pega el link en MINI_TEST_DRIVE_LINK"}
              </div>
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
      q: "¿Por cuanto tiempo tengo acceso al material?",
      a: "¡Es un único pago y quedas con el acceso es para siempre!. Además, hay actualizaciones semanales con nuevas respuestas explicadas y las preguntas nuevas a color que vayan saliendo.",
    },
    {
      q: "¿Cómo recibo el material?",
      a: "Después de pagar, envías el comprobante por WhatsApp y recibes el acceso inmediato al Drive en el mismo chat con el correo que escogas, el plan de estudio se entrega en pdf pocas horas después por el mismo Whatsapp.",
    },
    {
      q: "¿Qué diferencia hay entre Paquete #1 y #2?",
      a: "El Paquete #2 incluye TODO lo del Paquete #1, la diferencia está en que el Paquete #2 te incluye el Plan de Estudio Personalizado y el Registro de progeso (cronograma a tu ritmo entregado en pdf pocas horas después de realizar tu compra por WhatsApp).",
    },
    {
      q: "¿Sirve si estoy en noveno o decimo?",
      a: "Sí, tenemos decenas de estudiantes que empezaron con nosotros desde octavo y noveno, incluso estás de suerte, ya que te podrás preparar con mucho tiempo de ventaja, y al ser un único pago, estarías desde ya asegurando toda tu preparación.",
    },
    {
      q: "¿Los simulacros me dan mi puntaje?",
      a: "Sí, tendrás más de 80 formularios de google que te dirán tu puntaje al final, al igual que la cantidad de preguntas buenas y malas, sabrás en cuales te equivocaste para luego ver las explicaciones paso a paso",
    },
    {
      q: "¿Puedo usarlo desde el celular?",
      a: "Sí, puedes abrir el Drive desde celular, tablet o computador.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14" aria-label="Preguntas frecuentes">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">FAQ</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Preguntas frecuentes</h2>
          <p className="mt-2 text-sm text-white/70">¡Si tienes alguna otra duda distinta puedes hablarnos al Whatsapp!</p>
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
  waProofP1,
  waProofP2,
  waInfo,
}: {
  selected: 1 | 2;
  setSelected: (v: 1 | 2) => void;
  waProofP1: string;
  waProofP2: string;
  waInfo: string;
}) {
  const proofLink = selected === 1 ? waProofP1 : waProofP2;

  return (
    <div className="bg-glow bg-glow-payments">
      <section id="pagos" className="mx-auto max-w-6xl px-5 py-12 md:py-16" aria-label="Métodos de pago">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">PAGA Y RECIBE EL ACCESO POR WHATSAPP 📲</div>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">⚡️ MÉTODOS DE PAGO</h2>
          <p className="mt-2 text-sm text-white/70">
            Elige tu paquete, paga por transferencia, y envíanos el comprobante. Te damos acceso inmediato al Drive.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5">
          <div className="text-sm font-bold">Paso 1 — Elige tu paquete</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition",
                selected === 1 && "border-sky-300 bg-sky-500/20 shadow-[0_0_0_2px_rgba(56,189,248,0.45)]"
              )}
              onClick={() => setSelected(1)}
            >
              <div className="text-sm font-semibold">1, 📚 MATERIAL DE ESTUDIO SUPREMO</div>
              <div className="mt-2 text-xs text-white/60 line-through">{formatCOP(PRICE_1_OLD)} COP</div>
              <div className="mt-1 text-sm font-semibold text-white">{formatCOP(PRICE_1_NOW)} COP</div>
            </button>

            <button
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition",
                selected === 2 && "border-amber-300 bg-amber-500/20 shadow-[0_0_0_2px_rgba(251,191,36,0.35)]"
              )}
              onClick={() => setSelected(2)}
            >
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">2, 🏆 🎓MATERIAL DE ESTUDIO SUPREMO + PLAN DE ESTUDIO PERSONALIZADO</div>
                <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-100">Más vendido</span>
              </div>
              <div className="mt-2 text-xs text-white/60 line-through">{formatCOP(PRICE_2_OLD)} COP</div>
              <div className="mt-1 text-sm font-semibold text-white">{formatCOP(PRICE_2_NOW)} COP</div>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-5">
          <div className="text-sm font-bold">Paso 2 — Paga por tu método</div>

          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
              <div className="text-xs font-semibold text-white/70">Transferencia</div>
              <div className="mt-2 grid gap-2 text-sm">
                <CopyRow label="📲 Nequi" value={NEQUI_NUMBER} note={ACCOUNT_HOLDER} />
                <CopyRow label={BANK_NAME} value={BANCOLOMBIA_ACCOUNT} note={ACCOUNT_HOLDER} />
                <CopyRow label="🔑 Llave" value={LLAVE} note={ACCOUNT_HOLDER} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-5">
        <div className="text-sm font-bold">Paso 3 — Envía el comprobante y recibe el acceso</div>
        <p className="mt-2 text-sm text-white/70">
          Cuando pagues, envía el comprobante por WhatsApp y te damos acceso inmediato al Drive. Si compras el Paquete #2,
          te pedimos los datos del plan y se envía en pocas horas por el mismo WhatsApp.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={proofLink} className="btn-primary payment-wa-btn" onClick={trackContact}>
            Enviar comprobante por WhatsApp
          </a>
            <a href={waInfo} className="btn-secondary">
              Hacer una pregunta
            </a>
        </div>

        
      </div>
      </section>
    </div>
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logos/logo3.png"
              alt="PreICFES Material"
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
            <div>
              <div className="text-sm font-semibold text-white">PreICFES Material</div>
              <div className="text-xs text-white/70">Preparación inteligente para el ICFES 2026</div>
            </div>
          </div>
          <div className="text-xs text-white/50">
            <div>© 2026 PreICFES Material</div>
            <div>Todos los derechos reservados</div>
            <div>Material educativo – No afiliado al ICFES</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingLibraryMenu({
  waLink,
  instagramUrl,
  onViewPackages,
  visible,
}: {
  waLink: string;
  instagramUrl: string;
  onViewPackages: () => void;
  visible: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [rotateDir, setRotateDir] = useState<"cw" | "ccw">("cw");
  const rotateTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rotateTimer.current) window.clearTimeout(rotateTimer.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="floating-menu floating-menu-enter">
      {open && (
        <div className="floating-menu-panel" role="menu" aria-label="Accesos rápidos">
          <button
            type="button"
            className="floating-menu-item floating-menu-item-packages"
            onClick={() => {
              onViewPackages();
              setOpen(false);
            }}
          >
            <span className="floating-menu-icon floating-menu-icon-packages" aria-hidden="true">
              <img src="/logosdesplegable/flecha.png" alt="" />
            </span>
            Ver Paquetes
          </button>
          <a
            href={instagramUrl}
            className="floating-menu-item floating-menu-item-instagram"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <span className="floating-menu-icon floating-menu-icon-instagram" aria-hidden="true">
              <img src="/logosdesplegable/instagram.png" alt="" />
            </span>
            Instagram +22k Seguidores
          </a>
          <a
            href={waLink}
            className="floating-menu-item floating-menu-item-whatsapp"
            onClick={(event) => {
              trackContact(event);
              setOpen(false);
            }}
          >
            <span className="floating-menu-icon floating-menu-icon-whatsapp" aria-hidden="true">
              <img src="/logosdesplegable/whatsapp.png" alt="" />
            </span>
            Hablar por Whatsapp
          </a>
        </div>
      )}
      <button
        type="button"
        className="floating-menu-trigger"
        aria-label="Abrir accesos rápidos"
        aria-haspopup="menu"
        aria-expanded={open}
        data-rotating={rotating ? "true" : "false"}
        data-rotate-dir={rotateDir}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            setRotateDir(next ? "ccw" : "cw");
            return next;
          });
          setRotating(true);
          if (rotateTimer.current) window.clearTimeout(rotateTimer.current);
          rotateTimer.current = window.setTimeout(() => setRotating(false), 650);
        }}
      >
        <span role="img" aria-label="Biblioteca">
          📚
        </span>
      </button>
    </div>
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
      .floating-menu {
        position: fixed;
        right: 1.2rem;
        bottom: 1.2rem;
        z-index: 50;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.75rem;
      }
      .floating-menu-enter {
        animation: floatDrop 700ms ease-out;
      }
      .floating-menu-trigger {
        display: grid;
        place-items: center;
        height: 3.8rem;
        width: 3.8rem;
        border-radius: 999px;
        border: 1px solid rgba(57, 255, 20, 0.6);
        background: #39ff14;
        color: #041b0f;
        font-size: 1.7rem;
        box-shadow: 0 0 20px rgba(57, 255, 20, 0.7), 0 0 45px rgba(57, 255, 20, 0.55);
        transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
      }
      .floating-menu-trigger:hover {
        background: #53ff33;
        transform: translateY(-3px);
        box-shadow: 0 0 24px rgba(57, 255, 20, 0.8), 0 0 55px rgba(57, 255, 20, 0.6);
      }
      .floating-menu-trigger[data-rotating="true"][data-rotate-dir="cw"] {
        animation: spin360cw 650ms ease-in-out;
      }
      .floating-menu-trigger[data-rotating="true"][data-rotate-dir="ccw"] {
        animation: spin360ccw 650ms ease-in-out;
      }
      .floating-menu-panel {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.65rem;
        border-radius: 0.9rem;
        border: 1px solid rgba(80, 160, 255, 0.25);
        background: linear-gradient(160deg, rgba(5, 12, 36, 0.96), rgba(2, 4, 14, 0.96));
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6);
        min-width: 220px;
      }
      .floating-menu-item {
        width: 100%;
        text-align: left;
        border-radius: 0.5rem;
        border: 1px solid transparent;
        padding: 0.65rem 0.9rem;
        font-size: 0.85rem;
        font-weight: 700;
        color: #0b0b0b;
        background: transparent;
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        transition: transform 150ms ease, background 150ms ease, border 150ms ease;
      }
      .floating-menu-item:hover {
        transform: translateY(-1px);
      }
      .floating-menu-item-packages {
        background: #22d3ee;
        color: #041b2a;
        box-shadow: 0 0 14px rgba(34, 211, 238, 0.7), 0 0 30px rgba(34, 211, 238, 0.45);
      }
      .floating-menu-item-instagram {
        background: linear-gradient(120deg, #8b5cf6, #ec4899);
        color: #ffffff;
        box-shadow: 0 0 16px rgba(236, 72, 153, 0.6), 0 0 32px rgba(139, 92, 246, 0.5);
      }
      .floating-menu-item-whatsapp {
        background: #22c55e;
        color: #071c0f;
        box-shadow: 0 0 16px rgba(34, 197, 94, 0.7), 0 0 34px rgba(34, 197, 94, 0.5);
      }
      .mini-test-btn {
        background: #fb923c;
        color: #2a1200;
        box-shadow: 0 0 18px rgba(251, 146, 60, 0.7), 0 0 38px rgba(251, 146, 60, 0.45);
      }
      .mini-test-btn:hover {
        background: #fdba74;
      }
      .payment-wa-btn {
        background: #7dd3fc;
        color: #04223a;
        box-shadow: 0 0 18px rgba(56, 189, 248, 0.7), 0 0 40px rgba(56, 189, 248, 0.45);
        animation: heroBounce 2.2s ease-in-out infinite;
      }
      .payment-wa-btn:hover {
        background: #a5e3ff;
      }
      .package-card {
        border-width: 1px;
        border-style: solid;
      }
      .package-card-1 {
        border-color: rgba(56, 189, 248, 0.7);
        box-shadow: 0 0 22px rgba(56, 189, 248, 0.35), 0 0 50px rgba(56, 189, 248, 0.2);
        background: rgba(56, 189, 248, 0.06);
      }
      .package-card-2 {
        border-color: rgba(234, 179, 8, 0.75);
        box-shadow: 0 0 24px rgba(234, 179, 8, 0.35), 0 0 55px rgba(234, 179, 8, 0.22);
        background: rgba(234, 179, 8, 0.08);
      }
      .package-card-selected-1 {
        box-shadow: 0 0 30px rgba(56, 189, 248, 0.55), 0 0 70px rgba(56, 189, 248, 0.3);
      }
      .package-card-selected-2 {
        box-shadow: 0 0 32px rgba(234, 179, 8, 0.55), 0 0 75px rgba(234, 179, 8, 0.3);
      }
      .package-btn-1 {
        background: #7dd3fc;
        color: #04223a;
        box-shadow: 0 0 18px rgba(56, 189, 248, 0.7), 0 0 40px rgba(56, 189, 248, 0.45);
        animation: heroBounce 2.2s ease-in-out infinite;
      }
      .package-btn-1:hover {
        background: #a5e3ff;
      }
      .package-btn-2 {
        background: #fbbf24;
        color: #2a1700;
        box-shadow: 0 0 18px rgba(234, 179, 8, 0.7), 0 0 40px rgba(234, 179, 8, 0.45);
        animation: heroBounce 2.2s ease-in-out infinite;
      }
      .package-btn-2:hover {
        background: #fde047;
      }
      .hero-include-btn {
        box-shadow: 0 0 18px rgba(56, 189, 248, 0.75), 0 0 40px rgba(56, 189, 248, 0.45);
        animation: heroBounce 2.2s ease-in-out infinite;
      }
      .floating-menu-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: 2rem;
        border-radius: 0.45rem;
        background: rgba(0, 0, 0, 0.1);
      }
      .floating-menu-icon img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
      .floating-menu-icon-instagram img {
        transform: scale(2.2);
      }
      .floating-menu-icon-whatsapp img {
        transform: scale(1.12);
      }
      @keyframes spin360cw {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes spin360ccw {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(-360deg);
        }
      }
      @keyframes floatDrop {
        0% {
          transform: translateY(-40px);
          opacity: 0;
        }
        70% {
          transform: translateY(6px);
          opacity: 1;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      @keyframes heroBounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-6px);
        }
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
// FORCE DEPLOY Wed Jan 14 11:53:23 -05 2026
