module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                lobster: ["Lobster", "Helvetica Neue", "arial"],
                montserrat: ["Montserrat"],
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
            },
            animation: {
                scroll: "3s infinite scroll",
                spin: "spin 2.5s linear infinite",
            },
        },
    },
    plugins: [],
};
