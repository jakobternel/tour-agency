module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                lobster: ["Lobster", "Helvetica Neue", "arial"],
                montserrat: ["Montserrat"],
                segment: ["Segment", "monospace"],
            },
            colors: {
                primary: "#ff4d6d",
                primaryOff: "#E4335C",
            },
            backgroundColor: {
                primary: "#ff4d6d",
                primaryOff: "#E4335C",
            },
            keyframes: {
                scroll: {
                    "0%": { opacity: "0" },
                    "10%": { opacity: "1" },
                    "80%": { opacity: "1" },
                    "100%": {
                        opacity: "0",
                        transform: "translate(-50%, 0.5rem)",
                    },
                },
                blink: {
                    "0%": { opacity: "0" },
                    "50%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
            },
            animation: {
                scroll: "3s infinite scroll",
                spin: "spin 2.5s linear infinite",
                blink: "2s steps(1, end) infinite blink",
            },
        },
    },
    plugins: [],
};
