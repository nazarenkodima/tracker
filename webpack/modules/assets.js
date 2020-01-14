// Paths
import { source, statics } from '../paths';

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';

const Path = require('path');

export const loadImages = () => ({
    module: {
        rules: [
            {
                test:    /\.jpe?g|png|svg$/,
                include: source,
                use:     {
                    loader:  'url-loader',
                    options: {
                        fallback: 'file-loader',
                        limit:    8192,
                        name:     'images/[name].[hash:5].[ext]',
                    },
                },
            }
        ],
    },
});

export const setupHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            inject:   false,
            template: HtmlWebpackTemplate,
            title:    'Tracker',
            favicon:  `${statics}/favicon/favicon.png`,
            meta:     [
                {
                    name:    'viewport',
                    content: 'user-scalable=no, width=device-width, initial-scale=1',
                }
            ],
            appMountIds: ['app'],
        })
    ],
});
