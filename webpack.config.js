const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestGenerator = require('webpack-pwa-manifest');

const constants = require('./constants');


module.exports = {
    watchOptions: {
        ignored: /node_modules/
    },
    entry: {
        app: './src/index.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['eslint-loader', 'babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new CleanPlugin(['./dist']),
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin([
            {
                from: require.resolve('workbox-sw'),
                to: './workbox-sw.js'
            }
        ]),
        new WorkboxPlugin({
            globDirectory: './dist',
            globPatterns: ['**/*.{html,js}'],
            swSrc: './src/sw.js',
            swDest: './dist/sw.js',
        }),
        new ManifestGenerator({
            lang: 'en',
            dir: 'ltr',
            ios: true,
            name: constants.appName,
            short_name: 'Remind Me',
            display: 'minimal-ui',
            orientation: 'portrait',
            theme_color: constants.themeColor,
            background_color: constants.themeColor,
            start_url: '/',
            icons: [
                {
                    src: path.resolve('./src/rocket-ship.png'),
                    sizes: [ 96, 128, 256, 512 ],
                    ios: true
                }
            ]
        })
    ],
    output: {
        filename: '[name].[hash].js'
    }
};
