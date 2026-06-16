"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left";
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars =
      from === "bottom" ? { y: 48, opacity: 0 } : { x: -48, opacity: 0 };
    const toVars =
      from === "bottom" ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 };

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        duration: 1.0,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [delay, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
