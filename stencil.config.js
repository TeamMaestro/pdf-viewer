const sass = require('@stencil/sass');

exports.config = {
    namespace: 'pdfviewer',
    outputTargets: [
        {
            type: 'dist',
        },
        {
            type: 'www',
            serviceWorker: false
        }
    ],
    plugins: [
        sass()
    ],
    nodeResolve: {
        browser: true,
        preferBuiltins: true
    }
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
}
