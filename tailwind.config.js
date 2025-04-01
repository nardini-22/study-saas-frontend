/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        colorT: {
          "0%, 19.99%": { color: "var(--main-blue)" },
          "20%, 39.99%": { color: "var(--main-orange)" },
          "40%, 59.99% ": { color: "var(--main-pink)" },
          "60%, 79.99%": { color: "var(--main-green)" },
          "80%, 100%": { color: "var(--main-purple)" },
        },
        colorI: {
          "0%, 19.99%": { color: "var(--main-purple)" },
          "20%, 39.99%": { color: "var(--main-green)" },
          "40%, 59.99% ": { color: "var(--main-orange)" },
          "60%, 79.99%": { color: "var(--main-pink)" },
          "80%, 100%": { color: "var(--main-blue)" },
        },
        colorL: {
          "0%, 19.99%": { color: "var(--main-orange)" },
          "20%, 39.99%": { color: "var(--main-pink)" },
          "40%, 59.99% ": { color: "var(--main-blue)" },
          "60%, 79.99%": { color: "var(--main-purple)" },
          "80%, 100%": { color: "var(--main-green)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        colorT: "colorT 9s step-end infinite",
        colorI: "colorI 9s step-end infinite",
        colorL: "colorL 9s step-end infinite",
        blink: "blink 0.75s step-end infinite",
      },
      colors: {
        main: "var(--main)",
        "main-blue": "var(--main-blue)",
        "main-orange": "var(--main-orange)",
        "main-pink": "var(--main-pink)",
        "main-green": "var(--main-green)",
        "main-purple": "var(--main-purple)",
        overlay: "var(--overlay)",
        bg: "var(--bg)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        text: "var(--text)",
        mtext: "var(--mtext)",
        border: "var(--border)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",

        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontFamily: {
        overpass: "var(--font-overpass)",
        "tactic-sans": "var(--font-tactic-sans)",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
