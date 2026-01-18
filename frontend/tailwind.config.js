module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  "#f5f6f7",
                    100: "#e9eaec",
                    500: "#1f2937",   // тъмен акцент (напр. графит)
                    600: "#111827",
                    900: "#0b0f16",
                }
            },
            borderRadius: { xl: "0.9rem", "2xl": "1.25rem" }
        }
    },
    plugins: [],
};
