const path = require('path');
const CracoLessPlugin = require('craco-less');
const BUILD_PATH = path.resolve(__dirname, './build');
const { isEqual } = require("lodash");

// pdfjs does some derpy stuff, which makes the build throw a lot of warnings which will stop the build in the CI pipeline
const removeRulesPlugin = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {

        const updatedRules = webpackConfig.module.rules.filter(
            rule => !isEqual(rule, { parser: { requireEnsure: false } })
        );
        webpackConfig.module.rules = updatedRules;

        return webpackConfig;
    }
};

module.exports = {
    plugins: [
        { plugin: CracoLessPlugin },
        { plugin: removeRulesPlugin },
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
