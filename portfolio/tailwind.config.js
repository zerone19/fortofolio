/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./assets/js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-fixed": "#001f2a",
        "on-tertiary": "#ffffff",
        "primary-fixed": "#bee9ff",
        "on-tertiary-fixed": "#2b1700",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#68d3ff",
        "surface-container-high": "#e3e9ed",
        "surface-container": "#e9eff3",
        "inverse-on-surface": "#ecf1f6",
        "error": "#ba1a1a",
        "secondary-fixed": "#e2e2e2",
        "tertiary-container": "#fba72f",
        "on-primary": "#ffffff",
        "on-primary-container": "#005067",
        "on-secondary-fixed": "#1b1b1b",
        "surface": "#f5fafe",
        "inverse-surface": "#2b3135",
        "neutral-border": "#e2e2e2",
        "primary-container": "#2ac7fb",
        "on-tertiary-fixed-variant": "#653e00",
        "surface-variant": "#dee3e7",
        "blueprint-cyan": "#2ac7fb",
        "outline-variant": "#bcc8d0",
        "error-container": "#ffdad6",
        "secondary-container": "#e2e2e2",
        "surface-main": "#FFFFFF",
        "surface-container-highest": "#dee3e7",
        "on-secondary-fixed-variant": "#474747",
        "on-surface-variant": "#3d484f",
        "surface-container-lowest": "#ffffff",
        "on-error-container": "#93000a",
        "primary": "#006684",
        "deep-tech-black": "#0e0e0e",
        "on-secondary": "#ffffff",
        "secondary": "#5e5e5e",
        "surface-dim": "#d5dbdf",
        "surface-bright": "#f5fafe",
        "tertiary-fixed-dim": "#ffb960",
        "surface-container-low": "#eff4f9",
        "surface-tint": "#006684",
        "on-background": "#161c20",
        "inverse-primary": "#68d3ff",
        "on-tertiary-container": "#694000",
        "outline": "#6d7980",
        "secondary-fixed-dim": "#c6c6c6",
        "tertiary-fixed": "#ffddb8",
        "on-surface": "#161c20",
        "on-secondary-container": "#646464",
        "tertiary": "#865300",
        "ghost-cyan": "rgba(42, 199, 251, 0.1)",
        "background": "#f5fafe",
        "accent-yellow": "#ffde59",
        "on-primary-fixed-variant": "#004d64"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-md": "40px",
        "unit": "8px",
        "stack-offset": "2px",
        "margin-sm": "16px",
        "gutter": "24px",
        "margin-lg": "80px"
      },
      fontFamily: {
        "body-md": ["Hanken Grotesk"],
        "display-lg-mobile": ["Sora"],
        "body-lg": ["Hanken Grotesk"],
        "headline-md": ["Sora"],
        "label-caps": ["JetBrains Mono"],
        "display-lg": ["Sora"],
        "label-sm": ["JetBrains Mono"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display-lg-mobile": ["48px", { lineHeight: "52px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "700" }],
        "display-lg": ["80px", { lineHeight: "88px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "label-sm": ["11px", { lineHeight: "14px", fontWeight: "500" }]
      }
    }
  },
  plugins: []
};
