"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { CSSProperties } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export default function TypewriterText({
  text,
  speed = 40,
  className,
  style,
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return (
    <div ref={ref} className={`text-center ${className ?? ""}`} style={style}>
      <span>{displayed}</span>
      {displayed.length < text.length && (
        <span
          className="inline-block w-[3px] ml-1 align-middle bg-[#0D0D0D]"
          style={{
            height: '0.85em',
            animation: 'blink 0.8s step-end infinite',
          }}
        />
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
