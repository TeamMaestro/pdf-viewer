import { Component, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
    tag: 'hive-pdf-viewer',
    styleUrl: 'pdf-viewer.scss',
    shadow: true,
    assetsDir: 'pdf-viewer-assets'
})
export class PdfViewer {

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
            this.initButtonVisibility();
            this.addEventListeners();
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
