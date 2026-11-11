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
        background: "#121212",
        surface: {
          DEFAULT: "#1E1E1E",
          subtle: "#181818",
          elevated: "#282828",
          border: "#2E2E2E",
        },
        text: {
          primary: "#F5F5F0",
          secondary: "#A0A0A0",
          muted: "#737373",
        },
        olive: {
          DEFAULT: "#84936A",
          light: "#A2B384",
          dark: "#687652",
          muted: "rgba(132, 147, 106, 0.15)",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  plugins: [],
};
export default config;

