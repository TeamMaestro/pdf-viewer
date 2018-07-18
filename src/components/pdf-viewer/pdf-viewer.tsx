import { Component, Prop, Element, Event, EventEmitter, Listen, Watch, State } from '@stencil/core';

import { PDFJSStatic, PDFViewerParams, PDFProgressData, PDFDocumentProxy, PDFSource, PDFPageProxy } from 'pdfjs-dist';
import PDFJS from 'pdfjs-dist/build/pdf';
import PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';

declare global {
    const PDFJS: PDFJSStatic;
}

@Component({
    tag: 'st-pdf-viewer',
    styleUrl: 'pdf-viewer.scss',
    shadow: true,
    assetsDir: 'vendor'
})
export class PdfViewerComponent {

    render() {
        return (
            <div id="mainContainer">
                <div class="toolbar">
                    <div class="toolbar-left">
                        <button class="toolbar-btn" title="Side Drawer"
                            onClick={() => this.toggleSideDrawer()}>
                            <svg class="side-drawer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g id="e236b97c-3920-4be5-b6a8-a5eb5d413154" data-name="Layer 1">
                                    <path d="M3.25 1A2.25 2.25 0 0 0 1 3.25v17.5A2.25 2.25 0 0 0 3.25 23H11V1zM8 19.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5z"></path>
                                    <path class="right-path" d="M11 2h9.75A1.25 1.25 0 0 1 22 3.25v17.5A1.25 1.25 0 0 1 20.75 22H11"></path>
                                </g>
                            </svg>
                        </button>
                        <div class="page-section">
                            <span>Page </span>
                            <button class="prev-btn" title="Previous Page" disabled={this.currentPage === 1}
                                onClick={() => this.prevPage()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.5 12.5l9 9v-18z"></path></svg>
                            </button>
                            <input
                                type="number"
                                min="1"
                                max={this.totalPages}
                                value={this.currentPage}
                                onChange={(event) => this.handlePageInput(event)}>
                            </input>
                            <button class="next-btn" title="Next Page" disabled={this.currentPage === this.totalPages}
                                onClick={() => this.nextPage()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M16.5 12.5l-9 9v-18z"></path>
                                </svg>
                            </button>
                            <span> of </span>
                            <span>{this.totalPages}</span>
                        </div>
                        <button class="toolbar-btn" title="Zoom Out"
                            disabled={this.zoom <= this.minZoom}
                            onClick={() => this.zoomOut()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M4.5 8h9v2h-9z" opacity=".5"></path>
                                <path d="M9 18a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zM9 2a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7z"></path>
                                <path d="M20.556 23.03l-5.793-5.793 2.475-2.475 5.793 5.793a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 0 1-1.415.001z" opacity=".66"></path>
                            </svg>
                        </button>
                        <button class="toolbar-btn" title="Zoom In"
                            disabled={this.zoom >= this.maxZoom}
                            onClick={() => this.zoomIn()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path opacity=".5" d="M13.5 8H10V4.5H8V8H4.5v2H8v3.5h2V10h3.5V8z"></path>
                                <path d="M9 18a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zM9 2a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7z"></path>
                                <path d="M20.556 23.03l-5.793-5.793 2.475-2.475 5.793 5.793a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 0 1-1.415.001z" opacity=".66"></path>
                            </svg>
                        </button>
                        <button class="toolbar-btn" title="Fit Page"
                            onClick={() => this.toggleFitToPage()}
                            hidden={!this.fitToPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20.25 2A1.75 1.75 0 0 1 22 3.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25V3.75A1.75 1.75 0 0 1 3.75 2h16.5m0-2H3.75A3.754 3.754 0 0 0 0 3.75v16.5A3.754 3.754 0 0 0 3.75 24h16.5A3.754 3.754 0 0 0 24 20.25V3.75A3.754 3.754 0 0 0 20.25 0z" opacity=".33"></path>
                                <path d="M20 9.657V4h-5.657L20 9.657zM4 14.343V20h5.657L4 14.343z"></path>
                                <path d="M15.758 9.657l-1.414-1.414 2.121-2.121 1.414 1.414zm-8.223 8.221l-1.414-1.414 2.121-2.121 1.414 1.414z" opacity=".75"></path>
                                <path d="M12.222 10.364l1.06-1.06 1.415 1.413-1.06 1.061zm-2.918 2.919l1.06-1.06 1.415 1.414-1.061 1.06z" opacity=".33"></path>
                            </svg>
                        </button>
                        <button class="toolbar-btn" title="Fit Width"
                            onClick={() => this.toggleFitToPage()}
                            hidden={this.fitToPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20.25 2A1.75 1.75 0 0 1 22 3.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25V3.75A1.75 1.75 0 0 1 3.75 2h16.5m0-2H3.75A3.754 3.754 0 0 0 0 3.75v16.5A3.754 3.754 0 0 0 3.75 24h16.5A3.754 3.754 0 0 0 24 20.25V3.75A3.754 3.754 0 0 0 20.25 0z" opacity=".33"></path>
                                <path d="M19 16l4-4-4-4v8zM5 8l-4 4 4 4V8z"></path><path d="M19 13h-3v-2h3zM8 13H5v-2h3z" opacity=".75"></path>
                                <path d="M13 11h1.5v2H13zm-3.5 0H11v2H9.5z" opacity=".33"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="toolbar-right">
                        <button class="toolbar-btn" title="Search Document"
                            onClick={() => this.toggleSearch()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M21.48 18.95l-4.15-4.15-2.53 2.53 4.15 4.15a1.08 1.08 0 0 0 1.52 0l1-1a1.08 1.08 0 0 0 .01-1.53z" opacity=".75"></path>
                                <circle cx="9.5" cy="9.5" r="6.5" fill="none" stroke-miterlimit="10" stroke-width="2" stroke="currentColor"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="search-container" hidden={!this.searchOpen}>
                    <div class="search-form">
                        <input type="text" name="search" autocomplete="off"
                            onInput={(event) => this.handleSearch(event)}
                            onKeyUp={(event) => this.handleSearchNext(event)}
                            placeholder="Search Document"
                            value={this.searchQuery} />
                        <div class="search-form-result" hidden={this.searchQuery.trim().length < 1}>
                            <div>
                                <span>{this.currentMatchIndex}</span>
                                <span> of </span>
                                <span>{this.totalMatchCount}</span>
                            </div>
                        </div>
                        <div class="search-control">
                            <button class="search-control-btn search-control-btn-prev"
                                onClick={() => this.searchNext(true)}
                                title="Previous">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 8l9 9H3z"></path>
                                </svg>
                            </button>
                            <button class="search-control-btn search-control-btn-next"
                                onClick={() => this.searchNext()}
                                title="Next">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 17l9-9H3z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <a class="search-close-btn"
                        onClick={() => this.closeSearch()}>Close</a>
                </div>
                <div id="viewerContainer"  hidden={this.openDrawer}>
                    <div class="pdf-viewer"></div>
                </div>
                <div class="side-drawer" hidden={!this.openDrawer}>
                    Pages
                </div>
            </div>
        );
    }

    handlePageInput(e) {
        let newPageNumber = parseInt(e.target.value, 10) || 1;
        if (this._pdf) {
            newPageNumber = this.getValidPageNumber(newPageNumber);
        }
        this.page = newPageNumber;
    }

    handleSearch(e) {
        this.searchQuery = e.target.value;
        this.pdfFindController.executeCommand('find', {
            caseSensitive: false,
            findPrevious: false,
            highlightAll: true,
            findResultsCount: true,
            phraseSearch: true,
            query: e.target.value
        });

    }

    searchTimeout: any;

    handleSearchNext(e) {
        if (e.key === 'Enter') {
            this.searchNext();
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.updateMatchCount();
        }, 300);
    }

    public searchNext(findPrevious = false) {
        this.pdfFindController.executeCommand('findagain', {
            caseSensitive: false,
            findPrevious: findPrevious,
            highlightAll: false,
            findResultsCount: true,
            phraseSearch: true,
            query: this.searchQuery
        });
        this.updateMatchCount();
    }

    componentWillLoad() {
        PDFJS.GlobalWorkerOptions.workerSrc = `${this.publicPath}vendor/pdf.worker.min.js`;
    }

    @Prop({ context: 'publicPath' }) private publicPath: string;
    @Element() private element: HTMLElement;

    static CSS_UNITS: number = 96.0 / 72.0;

    public pdfLinkService: any;
    public pdfViewer: any;
    public pdfFindController: any;

    @State() currentPage: number = 1;
    @State() totalPages: number;

    private _pdf: PDFDocumentProxy;
    private lastLoaded: string | Uint8Array | PDFSource;
    private resizeTimeout: NodeJS.Timer;

    @Event() afterLoadComplete: EventEmitter;
    @Event() onError: EventEmitter;
    @Event() onProgress: EventEmitter;
    @Event() pageChange: EventEmitter;

    @Listen('window:resize')
    public onPageResize() {
        if (!this.canAutoResize || !this._pdf) {
            return;
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            this.updateSize();
        }, 100);
    }

    private _initListeners() {
        // Page change event
        this.element.shadowRoot
            .querySelector('#viewerContainer')
            .addEventListener('pagechange', (e: any) => {
                this.currentPage = e.pageNumber;
                this.pageChange.emit(e.pageNumber);
            })
    }

    @Prop() src: string | Uint8Array | PDFSource;
    @Watch('src')
    srcChanged() {
        this.loadPDF();
    }

    @Prop({ mutable: true }) page: number = 1;
    @Watch('page')
    pageChanged(page) {
        this.currentPage = page;
        this.pdfViewer.currentPageNumber = this.currentPage;
    }

    @Prop({ mutable: true }) zoom: number = 1;
    @Prop() minZoom: number = 0.25;
    @Prop() maxZoom: number = 4;

    @Prop() rotation: number = 0;

    @Prop({ mutable: true }) searchOpen: boolean = false;
    searchQuery: string = '';

    @Prop() renderText: boolean = true;
    @Prop() originalSize: boolean = false;
    @Prop() stickToPage: boolean = false;
    @Prop() externalLinkTarget: string = 'blank';
    @Prop() canAutoResize: boolean = true;
    @Prop({ mutable: true }) fitToPage: boolean = true;
    @Prop({ mutable: true }) openDrawer: boolean = false;

    @Prop({ mutable: true }) currentMatchIndex = 0;
    @Prop({ mutable: true }) totalMatchCount = 0;

    componentDidLoad() {
        this._initListeners();
        this.setupViewer();
        if (this.src) {
            this.loadPDF();
        }
    }

    public setupViewer() {
        PDFJS.disableTextLayer = !this.renderText;

        this.pdfLinkService = new PDFJSViewer.PDFLinkService();
        this.setExternalLinkTarget(this.externalLinkTarget);

        const pdfOptions: PDFViewerParams | any = {
            container: this.element.shadowRoot.querySelector('#viewerContainer'),
            linkService: this.pdfLinkService,
            textLayerMode: this.renderText ? 1 : 0,
            // This will enable forms, which are currently WIP
            // renderInteractiveForms: true
        };

        this.pdfViewer = new PDFJSViewer.PDFViewer(pdfOptions);
        this.pdfLinkService.setViewer(this.pdfViewer);
        this.pdfFindController = new PDFJSViewer.PDFFindController({ pdfViewer: this.pdfViewer });
        this.pdfViewer.setFindController(this.pdfFindController);
    }

    public nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.pdfViewer.currentPageNumber = this.currentPage;
        }
    }

    public prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.pdfViewer.currentPageNumber = this.currentPage;
        }
    }

    public toggleFitToPage() {
        this.fitToPage = !this.fitToPage;
        this.zoom = 1;
        this.updateSize();
    }

    public toggleSideDrawer(){
        this.openDrawer = !this.openDrawer;
        console.log(this.openDrawer);
    }

    public zoomOut() {
        this.fitToPage = true;
        this.zoom *= 0.75;
        if (this.zoom < this.minZoom) {
            this.zoom = this.minZoom;
        }
        this.updateSize();
    }

    public zoomIn() {
        this.fitToPage = true;
        this.zoom *= 1.25;
        if (this.zoom > this.maxZoom) {
            this.zoom = this.maxZoom;
        }
        this.updateSize();
    }

    private updateMatchCount() {
        this.currentMatchIndex = this.pdfFindController.selected.matchIdx + 1;
        this.totalMatchCount = this.pdfFindController.matchCount;
    }

    public closeSearch() {
        this.searchOpen = false;
        this.handleSearch({
            target: {
                value: ''
            }
        });
    }

    public toggleSearch() {
        this.searchOpen = !this.searchOpen;
        if (this.searchOpen) {
            setTimeout(() => {
                const searchEl = this.element.shadowRoot.querySelector('input[name="search"]') as HTMLInputElement;
                if (searchEl) {
                    searchEl.focus();
                }
            }, 150);
        }
    }

    public updateSize() {
        this._pdf.getPage(this.pdfViewer.currentPageNumber).then((page: PDFPageProxy) => {
            const viewport = page.getViewport(this.zoom, this.rotation);
            let scale = this.zoom;
            let stickToPage = true;

            // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
            if (!this.originalSize || (this.fitToPage && viewport.width > this.element.offsetWidth)) {
                if (this.fitToPage) {
                    scale = this.getScaleWidth(page.getViewport(1).width);
                } else {
                    scale = this.getScaleHeight(page.getViewport(1).height);
                }
                stickToPage = !this.stickToPage;
            }

            this.pdfViewer._setScale(scale, stickToPage);
        });
    }

    private getValidPageNumber(page: number): number {
        if (page < 1) {
            return 1;
        }
        if (page > this._pdf.numPages) {
            return this._pdf.numPages;
        }
        return page;
    }

    static getLinkTarget(type: string) {
        switch (type) {
            case 'blank':
                return PDFJS.LinkTarget.BLANK;
            case 'none':
                return PDFJS.LinkTarget.NONE;
            case 'self':
                return PDFJS.LinkTarget.SELF;
            case 'parent':
                return PDFJS.LinkTarget.PARENT;
            case 'top':
                return PDFJS.LinkTarget.TOP;
        }
        return null;
    }

    private setExternalLinkTarget(type: string) {
        const linkTarget = PdfViewerComponent.getLinkTarget(type);
        if (linkTarget !== null) {
            this.pdfLinkService.externalLinkTarget = linkTarget;
        }
    }

    private loadPDF() {
        if (!this.src) {
            return;
        }
        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }

        let loadingTask: any = PDFJS.getDocument(this.src);
        loadingTask.onProgress = (progressData: PDFProgressData) => {
            this.onProgress.emit(progressData);
        };

        const src = this.src;
        loadingTask.promise.then((pdf: PDFDocumentProxy) => {
            this._pdf = pdf;
            this.totalPages = this._pdf.numPages;
            this.lastLoaded = src;
            this.afterLoadComplete.emit(pdf);
            this.update();
        }, (error: any) => {
            this.onError.emit(error);
        });
    }

    private update() {
        this.setupViewer();

        if (this.pdfViewer) {
            this.pdfViewer.setDocument(this._pdf);
        }

        if (this.pdfLinkService) {
            this.pdfLinkService.setDocument(this._pdf, null);
        }

        this.pdfRender();
    }

    private pdfRender() {
        this.renderMultiplePages();
    }

    private renderMultiplePages() {
        this.currentPage = this.getValidPageNumber(this.currentPage);

        if (this.rotation !== 0 || this.pdfViewer.pagesRotation !== this.rotation) {
            setTimeout(() => {
                this.pdfViewer.pagesRotation = this.rotation;
            });
        }

        if (this.stickToPage) {
            setTimeout(() => {
                this.pdfViewer.currentPageNumber = this.currentPage;
            });
        }

        this.updateSize();
    }

    static removeAllChildNodes(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    private getScaleWidth(viewportWidth: number) {
        const offsetWidth = this.element.offsetWidth - 40;

        if (offsetWidth === 0) {
            return 1;
        }

        return this.zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
    }

    private getScaleHeight(viewportHeight: number) {
        const offsetHeight = this.element.offsetHeight - 40;

        if (offsetHeight === 0) {
            return 1;
        }

        return this.zoom * (offsetHeight / viewportHeight) / PdfViewerComponent.CSS_UNITS;
    }

}
