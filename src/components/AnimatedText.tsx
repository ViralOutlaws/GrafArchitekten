"use client";

import { useEffect, useRef, ElementType, ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps<T extends ElementType> = {
  tag?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "tag" | "children" | "className">;

export default function AnimatedText<T extends ElementType = "p">({
  tag,
  children,
  className,
  ...rest
}: AnimatedTextProps<T>) {
  const Tag = (tag ?? "p") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
