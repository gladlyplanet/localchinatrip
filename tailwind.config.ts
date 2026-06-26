import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#24211B",
        charcoal: "#2B281F",
        bone: "#FBF4E8",
        mist: "#70695D",
        gold: "#D7A84D",
        moss: "#626F45",
        lacquer: "#A7513D",
        paper: "#F7EDDB",
        cream: "#FFFBF3"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        serif: [
          "Cormorant Garamond",
          "Georgia",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(77, 61, 35, 0.18)",
        card: "0 12px 32px rgba(65, 54, 35, 0.14)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        drift: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.045)" }
        }
      },
      animation: {
        rise: "rise 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        drift: "drift 18s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
