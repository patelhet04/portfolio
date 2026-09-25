import type { Config } from "tailwindcss";

// Tailwind supplies the CSS reset and utilities; the design system lives in
// src/app/globals.css as CSS custom properties.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
