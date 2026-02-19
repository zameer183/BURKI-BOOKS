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
        teal: {
          DEFAULT: "#0E7E8B",
          dark: "#0A6570",
          light: "#12A0B0",
        },
        cream: {
          DEFAULT: "#E8E8E8",
          dark: "#D9D9D9",
        },
        gold: "#C5A992",
        dark: "#2f2f2f",
        gray: "#757575",
        "light-gray": "#afafaf",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "Arial", "sans-serif"],
        heading: ["var(--font-prata)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
