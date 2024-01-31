import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        right: "2px 20px 10px -5px rgba(255, 255,255, 1)", // Adjust values as needed
      },
      fontFamily: {
        fira: ["Fira Mono", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        nothingDisplay: ["Nothing You Could Do", "cursive"],
        firaCode: ["Fira Code", "monospace"],
      },
      colors: {
        "primary-blue": "#49C5B6",
      },
      keyframes: {
        flipHorizontal: {
          "0%": { transform: "rotateY(0deg)" },
          "33%,66%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
          "0%,50%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        flipHorizontal: "flipHorizontal 7s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["black"], // This disables DaisyUI's default themes
  },
};
export default config;
