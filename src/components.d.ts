/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  PDFSource,
} from 'pdfjs-dist';

declare global {

  namespace StencilComponents {
    interface StPdfViewer {
      'canAutoResize': boolean;
      'currentMatchIndex': number;
      'externalLinkTarget': string;
      'fitToPage': boolean;
      'maxZoom': number;
      'minZoom': number;
      'originalSize': boolean;
      'page': number;
      'renderText': boolean;
      'rotation': number;
      'searchOpen': boolean;
      'src': string | Uint8Array | PDFSource;
      'stickToPage': boolean;
      'totalMatchCount': number;
      'zoom': number;
    }
  }

  interface HTMLStPdfViewerElement extends StencilComponents.StPdfViewer, HTMLStencilElement {}

  var HTMLStPdfViewerElement: {
    prototype: HTMLStPdfViewerElement;
    new (): HTMLStPdfViewerElement;
  };
  interface HTMLElementTagNameMap {
    'st-pdf-viewer': HTMLStPdfViewerElement;
  }
  interface ElementTagNameMap {
    'st-pdf-viewer': HTMLStPdfViewerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'st-pdf-viewer': JSXElements.StPdfViewerAttributes;
    }
  }
  namespace JSXElements {
    export interface StPdfViewerAttributes extends HTMLAttributes {
      'canAutoResize'?: boolean;
      'currentMatchIndex'?: number;
      'externalLinkTarget'?: string;
      'fitToPage'?: boolean;
      'maxZoom'?: number;
      'minZoom'?: number;
      'onAfterLoadComplete'?: (event: CustomEvent) => void;
      'onOnError'?: (event: CustomEvent) => void;
      'onOnProgress'?: (event: CustomEvent) => void;
      'onPageChange'?: (event: CustomEvent) => void;
      'originalSize'?: boolean;
      'page'?: number;
      'renderText'?: boolean;
      'rotation'?: number;
      'searchOpen'?: boolean;
      'src'?: string | Uint8Array | PDFSource;
      'stickToPage'?: boolean;
      'totalMatchCount'?: number;
      'zoom'?: number;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;