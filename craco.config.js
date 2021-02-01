const path = require('path');
const CracoLessPlugin = require('craco-less');
const isEqual = require("lodash.isequal");
const BUILD_PATH = path.resolve(__dirname, './build');

// pdfjs does some derpy stuff, which makes the build throw a lot of warnings which will stop the build in the CI pipeline
const removeRulesPlugin = {
    overrideWebpackConfig: ({ webpackConfig }) => {

        webpackConfig.module.rules = webpackConfig.module.rules.filter(
            rule => !isEqual(rule, {parser: {requireEnsure: false}})
        );

        return webpackConfig;
    }
};

const removeCssHashPlugin = {
    overrideWebpackConfig: ({ webpackConfig }) => {

        const plugins = webpackConfig.plugins;
        plugins.forEach(plugin => {

            const options = plugin.options;

            if (!options) {
                return;
            }

            if (options.filename && options.filename.endsWith('.css')) {
                options.filename = "static/css/[name].css";
            }

        });

        return webpackConfig;
    }
};

module.exports = {
    plugins: [
        { plugin: CracoLessPlugin },
        { plugin: removeRulesPlugin },
        { plugin: removeCssHashPlugin },
    ],
    webpack: {
        configure: {
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        default: false,
                        vendors: false
                    },
                },
                runtimeChunk: false
            },
            output: {
                path: BUILD_PATH,
                filename: 'static/js/[name].js',
            },
        }
    }
};
