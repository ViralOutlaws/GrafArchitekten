import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        white: "#FFFFFF",
        anthrazit: "#2A2A2A",
        sand: "#C8B89A",
        grau: "#8A8A8A",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
        container: "clamp(1.5rem, 5vw, 4rem)",
      },
      maxWidth: {
        site: "1440px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontSize: {
        "display-2xl": [
          "clamp(4rem, 10vw, 10rem)",
          { lineHeight: "0.93", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(3rem, 8vw, 7.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2rem, 5vw, 5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.5rem, 4vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(1.25rem, 3vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
