import { ViewerOptions } from './viewer-options.interface';

export function setViewerOptions(options: ViewerOptions) {
    const PDFViewerApplicationOptions = window['PDFViewerApplicationOptions']
    Object.keys(options).map(function(name) {
        PDFViewerApplicationOptions.set(name, options[name]);
    });
}
