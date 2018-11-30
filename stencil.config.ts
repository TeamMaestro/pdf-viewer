import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export const config: Config = {
    namespace: 'pdfviewer',
    outputTargets: [
        {
            type: 'dist',
        }
    ],
    plugins: [
        sass(),
        builtins(),
        globals()
    ],
    nodeResolve: {
        browser: true,
        preferBuiltins: true
    }
};
