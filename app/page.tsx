"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";

const BUBBLES = [
  "Get more people to your venue",
  "Curate your own events",
  "Expand your brand reach through collaboration",
];

function WorkWithUsSection() {
  const [visible, setVisible] = useState<boolean[]>(() => BUBBLES.map(() => false));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasTriggered = useRef(false);

  const trigger = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(BUBBLES.map(() => true));
      return;
    }

    BUBBLES.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 700);
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16 overflow-x-clip">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Why work with us
      </h2>

      <div ref={containerRef} className="mt-10 flex flex-col gap-5">
        {BUBBLES.map((text, i) => (
          <div
            key={text}
            className={[
              "glass-card p-6 transform-gpu",
              visible[i] ? "bubble-visible" : "bubble-hidden",
            ].join(" ")}
          >
            <p className="text-base font-medium leading-relaxed md:text-lg">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3 “slides” (text + iPhone screen)
  // ✅ Keep your existing /iphone-app.png
  // 👉 Add 2 more images into /public when ready:
  //    /iphone-app-2.png
  //    /iphone-app-3.png
  const steps = useMemo(
    () => [
      {
        title: "Movement made social.",
        subtitle: "Join local events.",
        image: "/iphone/screen-1.png",
      },
      {
        title: "Find your community.",
        subtitle: "Meet like minded people.",
        image: "/iphone/screen-2.png",
      },
      {
        title: "Make it personal.",
        subtitle: "Curate your feed.",
        image: "/iphone/screen-3.png",
      },
    ],
    []
  );

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // How much scrollable distance exists inside the hero section
        const total = el.offsetHeight - viewportH;
        if (total <= 0) return;

        // How far into the section we are (0..total)
        const scrolled = Math.min(Math.max(-rect.top, 0), total);

        // progress 0..1
        const progress = scrolled / total;

        // Map to step index (0..steps.length-1)
        const idx = Math.min(
          steps.length - 1,
          Math.max(0, Math.floor(progress * steps.length))
        );

        setActiveStep(idx);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <main className="relative min-h-screen text-white">
      {/* Animated blob background */}
      <div className="pointer-events-none absolute inset-0 blob-gradient" />

      {/* Content layer */}
      <div className="relative">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <a
            href="/"
            className="flex items-center gap-2.5 whitespace-nowrap transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            <img src="/vora-logo.png" alt="Vora" className="h-6 w-6 object-contain" />
            <span className="text-lg font-bold lowercase tracking-tight leading-none">vora</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#how" className="hover:text-white">
              How it works
            </a>
            <a href="#features" className="hover:text-white">
              Work with us
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>

          <div ref={contactRef} className="relative">
            <button
              onClick={() => setContactOpen((v) => !v)}
              className="glass-btn px-6 py-2 text-sm"
            >
              Contact us
            </button>

            <div
              className={[
                "contact-dropdown absolute left-0 right-0 top-full mt-2 flex items-center justify-evenly rounded-full border border-white/15 bg-white/10 backdrop-blur-xl py-2 shadow-lg",
                contactOpen ? "contact-dropdown-open" : "contact-dropdown-closed",
              ].join(" ")}
            >
              <a
                href="https://www.instagram.com/vora"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-btn"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 pointer-events-none">
                  <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5Zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5C20 18.216 18.216 20 16.25 20h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4Zm4.25 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm4.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
                </svg>
              </a>
              <a
                href="mailto:vorasocials@gmail.com"
                className="contact-icon-btn"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 pointer-events-none">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* ✅ SCROLL HERO (replaces your old hero section) */}
        <section
          ref={heroRef as any}
          className="relative mx-auto w-full max-w-6xl px-6"
          style={{
            // Make this section tall so scroll can drive the “slides”
            // You can tweak: 180vh/220vh etc
            height: "250vh",
          }}
        >
          {/* Sticky content */}
          <div className="sticky top-0 pt-10 pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
              {/* LEFT */}
              <div>
                <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Launching in Sydney • Early access opening soon
                </p>

                {/* HEADLINE SWAP (animated) */}
                <div className="mt-5 relative min-h-[220px] md:min-h-[260px]">
  {steps.map((s, i) => {
    const isActive = i === activeStep;

    return (
      <div
        key={s.title}
        className={[
          "absolute inset-0 transition-all duration-500 ease-out",
          isActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none",
        ].join(" ")}
      >
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl leading-[0.95]">
          {s.title}
          <span className="block text-white/70">{s.subtitle}</span>
        </h1>
      </div>
    );
  })}
</div>

                {/* This text stays the same */}
                <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                  Vora helps you discover local sessions, join instantly, and meet great people —
                  from padel and tennis to runs, swims, and hikes.
                </p>

                {/* Waitlist stays the same */}
                <div id="waitlist" className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-11 w-full overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-white/30">
                    <div className="flex items-center px-4 text-sm text-white/70 border-r border-white/10">
                      +61
                    </div>

                    <input
                      type="tel"
                      placeholder="4xx xxx xxx"
                      className="w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 outline-none"
                    />
                  </div>

                  <button className="glass-btn h-11 px-6 text-sm">
                    Get early access
                  </button>
                </div>

                <p className="mt-3 text-xs text-white/50">No spam. Just launch updates + early access.</p>

                {/* Optional: small progress dots */}
                <div className="mt-6 flex items-center gap-2">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        i === activeStep ? "w-8 bg-white/80" : "w-3 bg-white/30",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT (iPhone swap, smooth) */}
              <div className="relative flex justify-center md:justify-end">
                <div className="relative w-[420px] sm:w-[500px] md:w-[620px]">
                  {/* reserve height so it doesn’t jump when images load */}
                  <div className="aspect-[9/16] w-full opacity-0" />

                  {steps.map((s, i) => {
                    const isActive = i === activeStep;
                    return (
                      <img
                        key={s.image}
                        src={s.image}
                        alt="Vora app preview"
                        className={[
                          "absolute left-0 top-0 w-full h-auto select-none drop-shadow-2xl",
                          "transition-all duration-500 ease-out will-change-transform",
                          isActive ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
                        ].join(" ")}
                        draggable={false}
                        // if you haven’t added iphone-app-2/3 yet, you’ll see broken images.
                        // Add them to /public or temporarily set them to /iphone-app.png.
                        onError={(e) => {
                          // Fallback: if missing, hide broken image
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-12 md:grid-cols-3">
            {[
              { title: "Get started", desc: "Create an account, choose your interests, and find local sports events near you.", image: "/iphone/iphone-get-started.png" },
              { title: "Join", desc: "See details, spots left, and info about the host — then join in one tap.", image: "/iphone/iphone-get-started-2.png" },
              { title: "Play", desc: "Meet new people and get active. Show up, move, and make it social.", image: "/iphone/iphone-get-started-3.png" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="glass-card p-6 w-full flex-1 transition-transform duration-300 ease-out will-change-transform hover:scale-[1.03]">
                  <div className="text-lg font-semibold">{item.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
                </div>
                <div className="mt-8 flex justify-center">
                  <Image
                    src={item.image}
                    alt={`Vora app — ${item.title}`}
                    width={360}
                    height={720}
                    className="object-contain transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <WorkWithUsSection />

        <section id="faq" className="mx-auto w-full max-w-6xl px-6 pb-0">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
          <div className="mt-8 grid gap-4">
            {[
              {
                q: "When does Vora launch?",
                a: "We’re starting in Sydney with early access, then expanding sport-by-sport and city-by-city.",
              },
              {
                q: "Is Vora free?",
                a: "Joining and browsing will be free. Some sessions may have a small fee set by hosts/venues.",
              },
              {
                q: "What sports are supported?",
                a: "Padel, tennis, runs, gym meetups, swims, hikes, basketball and more — based on demand.",
              },
            ].map((item) => (
              <div key={item.q} className="glass-card p-6">
                <div className="text-sm font-semibold">{item.q}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Vora</div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/vora"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:opacity-80 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5Zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5C20 18.216 18.216 20 16.25 20h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4Zm4.25 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm4.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
                </svg>
              </a>

              <a
                href="mailto:vorasocials@gmail.com"
                className="text-sm transition-opacity hover:opacity-80"
              >
                vorasocials@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}