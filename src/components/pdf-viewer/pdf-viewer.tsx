import { Component, Prop, Element, Event, EventEmitter, Watch, Method } from '@stencil/core';

@Component({
    tag: 'hive-pdf-viewer',
    styleUrl: 'pdf-viewer.scss',
    shadow: true,
    assetsDir: 'pdf-viewer-assets'
})
export class PdfViewer {

    static CSSVariables = [
        '--pdf-viewer-top-offset',
        '--pdf-viewer-bottom-offset'
    ];

    @Element() element: HTMLElement;

    @Prop({ context: 'resourcesUrl' }) resourcesUrl: string;
    @Prop({ context: 'window' }) window: Window;

    @Prop() src: string;
    @Prop() page: number;

    @Prop() enableSideDrawer = true;
    sidebarToggleEl: HTMLElement;

    @Watch('enableSideDrawer')
    updateSideDrawerVisibility() {
        if (this.sidebarToggleEl) {
            if (this.enableSideDrawer) {
                this.sidebarToggleEl.classList.remove('hidden');
            }
            else {
                this.sidebarToggleEl.classList.add('hidden');
            }
        }
    }

    @Prop() enableSearch = true;
    searchToggleEl: HTMLElement;

    @Watch('enableSearch')
    updateSearchVisibility() {
        if (this.searchToggleEl) {
            if (this.enableSearch) {
                this.searchToggleEl.classList.remove('hidden');
            }
            else {
                this.searchToggleEl.classList.add('hidden');
            }
        }
    }

    @Event() pageChange: EventEmitter<number>;
    @Event() onLinkClick: EventEmitter<string>;

    @Method()
    print() {
        return new Promise<void>((resolve) => {
            this.iframeEl.contentWindow.print();
            this.iframeEl.contentWindow.addEventListener('afterprint', () => {
                resolve();
            }, { once: true })
        })
    }

    @Prop() scale: 'auto' | 'page-fit' | 'page-width' | number;

    @Watch('scale')
    updateScale() {
        this.setScale(this.scale);
    }

    @Method()
    setScale(scale: 'auto' | 'page-fit' | 'page-width' | number) {
        const contentWindow = (this.iframeEl.contentWindow as any);

        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = (this.iframeEl.contentWindow as any).PDFViewerApplication;
            pdfViewer.currentScaleValue = scale;
        }
    }

    iframeEl: HTMLIFrameElement;
    viewerContainer: HTMLElement;

    get viewerSrc() {
        if (this.page) {
            return `${this.resourcesUrl}pdf-viewer-assets/viewer/web/viewer.html?file=${encodeURIComponent(this.src)}#page=${this.page}`;
        }
        return `${this.resourcesUrl}pdf-viewer-assets/viewer/web/viewer.html?file=${encodeURIComponent(this.src)}`;
    }

    componentDidLoad() {
        this.iframeEl.onload = () => {
            this.setCSSVariables();
            this.initButtonVisibility();
            this.addEventListeners();
        }
    }

    setCSSVariables() {
        for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
            const value = getComputedStyle(this.element).getPropertyValue(PdfViewer.CSSVariables[i]);
            this.iframeEl.contentDocument.documentElement.style.setProperty(PdfViewer.CSSVariables[i], value);
        }
    }

    initButtonVisibility() {
        this.sidebarToggleEl = this.iframeEl.contentDocument.body.querySelector('#sidebarToggle');
        this.searchToggleEl = this.iframeEl.contentDocument.body.querySelector('#viewFind');
        this.updateSideDrawerVisibility();
        this.updateSearchVisibility();
    }

    addEventListeners() {
        this.viewerContainer = this.iframeEl.contentDocument.body.querySelector('#viewerContainer')
        this.viewerContainer.addEventListener('pagechange', this.handlePageChange.bind(this));
        this.viewerContainer.addEventListener('click', this.handleLinkClick.bind(this));

        // when the documents within the pdf viewer finish loading
        this.iframeEl.contentDocument.addEventListener('pagesloaded', () => {
            if (this.scale) {
                this.setScale(this.scale);
            }
        });
    }

    handlePageChange(e: any) {
        this.pageChange.emit(e.pageNumber);
    }

    handleLinkClick(e: any) {
        e.preventDefault();
        const link = (e.target as any).closest('.linkAnnotation > a');
        if (link) {
            const href = (e.target as any).closest('.linkAnnotation > a').href || '';
            // Ignore internal links to the same document
            if (href.indexOf(`${window.location.host}`) !== -1) {
                return;
            }
            this.onLinkClick.emit(href);
        }
    }

    render() {
        return <iframe ref={(el) => this.iframeEl = el as HTMLIFrameElement} src={this.viewerSrc}></iframe>;
    }

}
