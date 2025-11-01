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
        sans: ["Sora", "sans-serif"],
        sora: ["Sora", "sans-serif"],
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
    themes: [
      {
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          "font-family": "'Sora', sans-serif",
          "base-100": "oklch(18% 0.019 237.69)",
          "base-200": "oklch(20% 0.019 237.69)",
          "base-300": "oklch(18% 0.019 237.69)",
        },
        lemonade: {
          ...require("daisyui/src/theming/themes")["lemonade"],
          "font-family": "'Sora', sans-serif",
        },
      },
    ],
  },
};
export default config;
