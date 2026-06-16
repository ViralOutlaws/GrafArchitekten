"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

type AppearTextProps = {
  text: string;
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  duration?: number;
};

export default function AppearText({
  text,
  font = { fontFamily: "Space Grotesk, sans-serif", fontSize: "48px", fontWeight: 900 },
  color = "rgb(13, 13, 13)",
  spread = 4,
  density = 6,
  duration = 2.5,
}: AppearTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [animationState, setAnimationState] = useState<"appearing" | "static">("appearing");
  const appearProgressRef = useRef(0);
  const [isInView, setIsInView] = useState(false);
  const hasAnimatedRef = useRef(false);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") return window.devicePixelRatio * 1.5 || 1;
    return 1;
  }, []);

  const transformedDensity = useMemo(() => {
    const [inputMin, inputMax] = [0, 10];
    const [outputMin, outputMax] = [0.3, 1];
    const progress = (density - inputMin) / (inputMax - inputMin);
    return Math.min(Math.max(outputMin + progress * (outputMax - outputMin), outputMin), outputMax);
  }, [density]);

  const APPEAR_DURATION = duration * 1000;

  const renderCanvas = useCallback((size: { width: number; height: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || !size.width || !size.height) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    canvas.width = Math.floor(size.width * globalDpr);
    canvas.height = Math.floor(size.height * globalDpr);

    const fontSize = parseInt(font.fontSize?.replace("px", "") || "48");
    const fontStr = `${font.fontWeight ?? 900} ${fontSize * globalDpr}px ${font.fontFamily ?? "Space Grotesk, sans-serif"}`;
    const parsedColor = parseColor(color);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = parsedColor;
    ctx.font = fontStr;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    const maxWidth = canvas.width * 0.85;

    // Wörter umbrechen
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + " " + words[i];
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    const lineHeight = fontSize * globalDpr * 1.3;
    const totalHeight = lines.length * lineHeight;
    const startY = textY - totalHeight / 2 + lineHeight / 2;

    let minLeft = canvas.width, maxRight = 0;
    lines.forEach((line, i) => {
      const w = ctx.measureText(line).width;
      const lx = textX - w / 2;
      if (lx < minLeft) minLeft = lx;
      if (lx + w > maxRight) maxRight = lx + w;
      ctx.fillText(line, textX, startY + i * lineHeight);
    });

    canvas.textBoundaries = {
      left: minLeft,
      right: maxRight,
      width: maxRight - minLeft,
    };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const currentDPR = canvas.width / parseInt(canvas.style.width);
    const sampleRate = Math.max(1, Math.round(currentDPR / 3));

    const particles: Particle[] = [];
    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 0) {
          const originalAlpha = (alpha / 255) * (sampleRate / currentDPR);
          particles.push({
            x: x + (Math.random() - 0.5) * spread * 20,
            y: y + (Math.random() - 0.5) * spread * 20,
            originalX: x,
            originalY: y,
            color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
            opacity: 0,
            originalAlpha,
            velocityX: 0,
            velocityY: 0,
            angle: 0,
            speed: 0,
          });
        }
      }
    }

    particlesRef.current = particles;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [text, font, color, globalDpr, spread]);

  useEffect(() => {
    if (!isInView) return;

    // Animation state zurücksetzen wenn in View
    appearProgressRef.current = 0;
    setAnimationState("appearing");

    let lastTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(globalDpr, globalDpr);

      if (animationState === "appearing") {
        appearProgressRef.current += (deltaTime * 1000) / APPEAR_DURATION;
        const progress = Math.min(1, appearProgressRef.current);

        const boundaries = canvas.textBoundaries;
        if (boundaries) {
          const revealX = boundaries.left + boundaries.width * progress;

          particlesRef.current.forEach(particle => {
            const shouldReveal = particle.originalX <= revealX;

            if (shouldReveal) {
              const dx = particle.originalX - particle.x;
              const dy = particle.originalY - particle.y;
              particle.x += dx * Math.min(1, deltaTime * 8);
              particle.y += dy * Math.min(1, deltaTime * 8);
              particle.opacity = Math.min(particle.originalAlpha, particle.opacity + deltaTime * 3);
            }

            if (particle.opacity > 0) {
              const col = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
              ctx.fillStyle = col;
              ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
            }
          });
        }

        if (progress >= 1) {
          setAnimationState("static");
        }
      } else {
        particlesRef.current.forEach(particle => {
          if (particle.opacity > 0) {
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.originalX / globalDpr, particle.originalY / globalDpr, 1, 1);
          }
        });
      }

      ctx.restore();
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animationState, globalDpr, APPEAR_DURATION, isInView]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
        renderCanvas({ width, height });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [renderCanvas]);

  // IntersectionObserver — Animation startet erst wenn in View
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Initial size + canvas rendern (aber Animation noch nicht starten)
  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const size = { width: rect.width, height: rect.height };
      setWrapperSize(size);
      renderCanvas(size);
    }
  }, [renderCanvas]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ minWidth: "30px", minHeight: "20px", pointerEvents: "none" }} />
    </div>
  );
}

function parseColor(color: string): string {
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, 1)`;
  return "rgba(13, 13, 13, 1)";
}
