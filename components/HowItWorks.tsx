"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

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
  const [visible, setVisible] = useState([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  const trigger = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible([true, true, true]);
      return;
    }

    ITEMS.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 650);
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <section id="how" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        How it works
      </h2>

      <div ref={sectionRef} className="mt-8 grid gap-12 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <div className="glass-card p-6 w-full flex-1 transition-transform duration-300 ease-out will-change-transform hover:scale-[1.03]">
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.desc}
              </p>
            </div>

            <div
              className={[
                "mt-8 flex justify-center transition-all duration-1000 ease-out",
                visible[i]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
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
