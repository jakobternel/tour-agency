module.exports = {
    webpack: {
        rules: [
            {
                test: /\.csv$/,
                use: "csv-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
