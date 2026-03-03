"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Get started",
    desc: "Create an account, choose your interests, and find local sports events near you.",
    image: "/iphone/iphone-get-started.png",
  },
  {
    title: "Join",
    desc: "See details, spots left, and info about the host \u2014 then join in one tap.",
    image: "/iphone/iphone-get-started-2.png",
  },
  {
    title: "Play",
    desc: "Meet new people and get active. Show up, move, and make it social.",
    image: "/iphone/iphone-get-started-3.png",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const phones = phoneRefs.current;
    if (!section || phones.some((p) => !p)) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      phones.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    gsap.set(phones, { opacity: 0, y: 24 });

    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "+=900",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      phones.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          i * 0.8
        );
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === section) st.kill();
        });
      };
    }

    // Mobile: simple IntersectionObserver fade-in
    const observers: IntersectionObserver[] = [];

    phones.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how"
      className="mx-auto w-full max-w-6xl px-6 py-16"
    >
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        How it works
      </h2>

      <div className="mt-8 grid gap-12 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <div className="glass-card p-6 w-full flex-1 transition-transform duration-300 ease-out will-change-transform hover:scale-[1.03]">
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.desc}
              </p>
            </div>

            <div
              ref={(el) => { phoneRefs.current[i] = el; }}
              className="mt-8 flex justify-center"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
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
  );
}
