import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'pdf-viewer',
    outputTargets: [
        { type: 'dist' },
        { type: 'www', serviceWorker: null }
    ],
    devServer: {
        openBrowser: false
    },
    plugins: [
        sass()
    ]
};
