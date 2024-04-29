const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1220px",
      "2xl": "1440px",
      "3xl": "1700px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bluewind: ['"Bluewind"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
        simplemichael: ['"Simple Michael"', "serif"],
      },
      colors: {
        primary: "#a67b6a",
        black: {
          DEFAULT: "#000",
          100: "#0D1117",
          200: "#161B22",
          300: "#1F2428",
          400: "#242C38",
        },
        grey: {
          100: "#969BA5",
          200: "#55616D",
        },
        white: {
          DEFAULT: "#FFF",
          400: "#A3B3BC",
          500: "#A4B8D5",
          800: "#D0DFFF",
        },
        purple: "#8C7CFF",
        pink: "#ED5FBD",
        violet: "#F16565",
        orange: "#FF964B",
      },
      backgroundImage: {
        banner: "url('/jsm_resources_banner.svg')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomAndPan1: {
          "0%": { transform: "scale(1.2) translateX(0) translateY(0)" },
          "50%": { transform: "scale(1.3) translateX(10%) translateY(10%)" },
          "100%": { transform: "scale(1.2) translateX(0) translateY(0)" },
        },
        zoomAndPan2: {
          "0%": { transform: "scale(1.3) translateX(0) translateY(0)" },
          "50%": { transform: "scale(1.4) translateX(-10%) translateY(10%)" },
          "100%": { transform: "scale(1.3) translateX(0) translateY(0)" },
        },
        zoomAndPan3: {
          "0%": { transform: "scale(1.3) translateX(0) translateY(0)" },
          "50%": { transform: "scale(1.4) translateX(10%) translateY(10%)" },
          "100%": { transform: "scale(1.3) translateX(0) translateY(0)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 3s ease-in-out",
        zoomAndPan1: "zoomAndPan1 50s infinite",
        zoomAndPan2: "zoomAndPan2 50s infinite",
        zoomAndPan3: "zoomAndPan3 50s infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },

  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
