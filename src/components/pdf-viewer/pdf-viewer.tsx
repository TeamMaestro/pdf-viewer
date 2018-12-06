import { Component, Prop, Element } from '@stencil/core';
import { Config } from './viewer-configuration';
import { setViewerOptions } from './viewer-options';

import pdfjsLib from 'pdfjs-dist/build/pdf.js';

@Component({
    tag: 'hive-pdf-viewer',
    styleUrl: 'pdf-viewer.scss',
    shadow: true,
    assetsDir: 'pdfjs-worker'
})
export class PdfViewer {

    @Element() element: HTMLElement;
    @Prop({ context: 'resourcesUrl' }) resourcesUrl!: string;

    get PDFJSLib() {
        return window['pdfjs-dist/build/pdf'];
    }
    set PDFJSLib(pdfjs) {
        window['pdfjs-dist/build/pdf'] = pdfjs;
    }

    get PDFViewerApplication() {
        return window['PDFViewerApplication'];
    }

    loadPDFJSLib() {
        this.PDFJSLib = pdfjsLib;
        this.PDFJSLib.GlobalWorkerOptions.workerSrc = `${this.resourcesUrl}pdfjs-worker/pdf.worker.min.js`;
    }

    async loadPDFJSViewer() {
        await import('./pdfjs-vendor/viewer.js');
        (window as any).webViewerLoad(Config);
        setViewerOptions({
            workerSrc: `${this.resourcesUrl}pdfjs-worker/pdf.worker.min.js`,
            defaultUrl: ''
        })
    }

    async componentWillLoad() {
        this.loadPDFJSLib();
        await this.loadPDFJSViewer();
        // (window as any).PDFViewerApplication.open('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');
    }

    componentDidLoad() {
    }

    render() {
        return (
            <div id="viewerContainer">
                <div id="viewer" class="pdfViewer"></div>
            </div>
        )
    }
}
