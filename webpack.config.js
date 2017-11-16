module.exports = {
    entry: {
        "script": "./src/script.js",
        "user/script": "./src/user/script.js",
        "style": "./src/style.scss",
        "style-mobile": "./src/style-mobile.scss",
        "user/style": "./src/user/style.scss",
        "user/style-mobile": "./src/user/style-mobile.scss"
    },
    output: {
        filename: "./dust/[name].js"
    },
    module: {
        loaders: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                loader : 'babel-loader',
                query  : {
                    presets: [ 'es2015' ]
                }
            },
            {
                test   : /\.scss$/,
                exclude: /node_modules/,
                loader : 'style-loader!css-loader!sass-loader'
            }
        ]

    }
};