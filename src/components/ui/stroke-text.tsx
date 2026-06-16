"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StrokeTextProps {
  text: string;
  className?: string;
  duration?: number;
  fillDelay?: number;
}

export default function StrokeText({
  text,
  className,
  duration = 3,
  fillDelay = 0.8,
}: StrokeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Split text into two lines at the period
  const lines = text.split(". ").map((l, i, arr) =>
    i < arr.length - 1 ? l + "." : l
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSvgDimensions({ width: rect.width, height: rect.height });
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className ?? ""}`}>
      {svgDimensions.width > 0 && (
        <svg
          ref={svgRef}
          width={svgDimensions.width}
          height={svgDimensions.height}
          viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
          className="w-full h-full"
        >
          <defs>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@900&display=swap');
            `}</style>
          </defs>

          {lines.map((line, lineIndex) => {
            const fontSize = Math.min(svgDimensions.width / (lines[0].length * 0.52), 64);
            const lineHeight = fontSize * 1.25;
            const totalHeight = lines.length * lineHeight;
            const startY = svgDimensions.height / 2 - totalHeight / 2 + lineHeight * 0.8;
            const y = startY + lineIndex * lineHeight;

            return (
              <g key={lineIndex}>
                {/* Stroke layer — zeichnet sich ein */}
                <motion.text
                  x={svgDimensions.width / 2}
                  y={y}
                  textAnchor="middle"
                  fontFamily="Space Grotesk, sans-serif"
                  fontSize={fontSize}
                  fontWeight={900}
                  fill="none"
                  stroke="#0D0D0D"
                  strokeWidth={1.5}
                  initial={{ opacity: 1 }}
                  animate={isInView ? {
                    strokeDashoffset: [1, 0],
                    opacity: 1,
                  } : {}}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                    paintOrder: "stroke",
                  }}
                  transition={{
                    strokeDashoffset: {
                      duration: duration,
                      delay: lineIndex * 0.4,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {line}
                </motion.text>

                {/* Fill layer — füllt sich nach dem Stroke */}
                <motion.text
                  x={svgDimensions.width / 2}
                  y={y}
                  textAnchor="middle"
                  fontFamily="Space Grotesk, sans-serif"
                  fontSize={fontSize}
                  fontWeight={900}
                  fill="#0D0D0D"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{
                    opacity: {
                      duration: 0.8,
                      delay: lineIndex * 0.4 + fillDelay,
                      ease: "easeIn",
                    },
                  }}
                >
                  {line}
                </motion.text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
