const CracoLessPlugin = require('craco-less');
const isEqual = require("lodash.isequal");

// pdfjs does some derpy stuff, which makes the build throw a lot of warnings which will stop the build in the CI pipeline
const removeRulesPlugin = {
    overrideWebpackConfig: ({ webpackConfig }) => {

        webpackConfig.module.rules = webpackConfig.module.rules.filter(
            rule => !isEqual(rule, {parser: {requireEnsure: false}})
        );

        return webpackConfig;
    }
};

module.exports = {
    plugins: [
        { plugin: CracoLessPlugin },
        { plugin: removeRulesPlugin },
    ]
};
