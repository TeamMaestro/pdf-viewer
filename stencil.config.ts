import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

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
        sass(),
        builtins(),
        globals()
    ],
    nodeResolve: {
        preferBuiltins: true
    }
};
