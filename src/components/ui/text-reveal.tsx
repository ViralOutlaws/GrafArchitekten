"use client";
import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen max-w-5xl items-center bg-white px-10 md:px-20">
        <p className="flex flex-wrap">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-3 md:mr-4 mb-2">
      <span
        className="absolute font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          letterSpacing: '-0.03em',
          color: '#0D0D0D',
          opacity: 0.12,
        }}
      >
        {children}
      </span>
      <motion.span
        style={{
          opacity,
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          letterSpacing: '-0.03em',
          color: '#0D0D0D',
          fontWeight: 900,
          display: 'inline-block',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
