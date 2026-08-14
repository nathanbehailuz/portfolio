tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#ffffff",
                "on-primary": "#2f3131",
                "on-surface": "#e2e2e2",
                "on-surface-variant": "#c4c7c8",
                "on-background": "#e2e2e2",
                outline: "#8e9192",
                "outline-variant": "#444748",
                "border-subtle": "#18181B",
                background: "#000000",
                surface: "#131313",
                "surface-elevated": "#09090B",
                "surface-container": "#1f1f1f",
                "surface-container-low": "#1b1b1b",
                "surface-container-high": "#2a2a2a",
                "surface-container-highest": "#353535",
                "surface-container-lowest": "#0e0e0e",
                "surface-variant": "#353535",
                "surface-bright": "#393939",
                "surface-dim": "#131313",
                secondary: "#c6c6cf",
                "secondary-container": "#45464e",
                "on-secondary": "#2f3037",
                "on-secondary-container": "#b4b4bd",
                tertiary: "#ffffff",
                "on-tertiary": "#303037",
                "code-accent": "#E4E4E7",
                "inverse-surface": "#e2e2e2",
                "inverse-on-surface": "#303030",
                "inverse-primary": "#5d5f5f",
                error: "#ffb4ab",
                "on-error": "#690005",
                "error-container": "#93000a",
                "on-error-container": "#ffdad6"
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                full: "0.75rem"
            },
            spacing: {
                base: "8px",
                "margin-mobile": "20px",
                gutter: "24px",
                "section-gap": "64px",
                "container-max": "800px"
            },
            fontFamily: {
                "mono-label": ["JetBrains Mono", "monospace"],
                "mono-sm": ["JetBrains Mono", "monospace"],
                "headline-lg": ["Geist", "sans-serif"],
                "headline-md": ["Geist", "sans-serif"],
                "headline-lg-mobile": ["Geist", "sans-serif"],
                "body-md": ["JetBrains Mono", "monospace"],
                "body-sm": ["JetBrains Mono", "monospace"]
            },
            fontSize: {
                "mono-label": ["14px", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "400" }],
                "mono-sm": ["12px", { lineHeight: "1.4", fontWeight: "500" }],
                "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
                "headline-md": ["20px", { lineHeight: "1.4", fontWeight: "500" }],
                "headline-lg-mobile": ["24px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "500" }],
                "body-sm": ["14px", { lineHeight: "1.55", fontWeight: "400" }]
            }
        }
    }
};
