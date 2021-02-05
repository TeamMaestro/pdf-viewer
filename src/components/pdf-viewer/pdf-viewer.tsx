import {
    Component,
    Prop,
    Element,
    Event,
    EventEmitter,
    Watch,
    Method,
    State,
    h,
    getAssetPath,
    ComponentInterface,
} from "@stencil/core";
import * as screenfull from "screenfull";

@Component({
    tag: "hive-pdf-viewer",
    styleUrl: "pdf-viewer.scss",
    shadow: true,
    assetsDirs: ["pdf-viewer-assets"],
})
export class PdfViewer implements ComponentInterface {
    static CSSVariables = [
        "--pdf-viewer-top-offset",
        "--pdf-viewer-bottom-offset",
        "--background-color",
        "--toolbar-background-color",
        "--border-color",
        "--icon-color",
        "--accent-color",
        "--page-border-radius",
        "--page-box-shadow",
        "--page-margin",
        "--floating-buttons-offset",
    ];

    @Element() element: HTMLElement;

    @Prop() src: string;
    @Prop() page: number;

    @Prop() enableToolbar = true;
    toolbarEl: HTMLElement;

    @Watch("enableToolbar")
    updateToolbarVisibility() {
        if (this.toolbarEl) {
            if (this.enableToolbar) {
                this.toolbarEl.classList.remove("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty(
                    "--toolbar-height",
                    ""
                );
            } else {
                this.toolbarEl.classList.add("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty(
                    "--toolbar-height",
                    "0px"
                );
            }
        }
    }

    @Prop() disableScrolling = false;

    @Watch("disableScrolling")
    updateScrolling() {
        if (this.viewerContainer) {
            if (this.disableScrolling) {
                this.viewerContainer.style.pointerEvents = "none";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "auto";
            } else {
                this.viewerContainer.style.pointerEvents = "";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "";
            }
        }
    }

    @Prop() enableSideDrawer = true;
    sidebarToggleEl: HTMLElement;

    @Watch("enableSideDrawer")
    updateSideDrawerVisibility() {
        if (this.sidebarToggleEl) {
            if (this.enableSideDrawer) {
                this.sidebarToggleEl.classList.remove("hidden");
            } else {
                this.sidebarToggleEl.classList.add("hidden");
            }
        }
    }

    @Prop() enableSearch = true;
    searchToggleEl: HTMLElement;

    @Watch("enableSearch")
    updateSearchVisibility() {
        if (this.searchToggleEl) {
            if (this.enableSearch) {
                this.searchToggleEl.classList.remove("hidden");
            } else {
                this.searchToggleEl.classList.add("hidden");
            }
        }
    }

    @Event() pageChange: EventEmitter<number>;
    @Event() linkClick: EventEmitter<string>;

    @Method()
    print() {
        return new Promise<void>((resolve) => {
            this.iframeEl.contentWindow.print();
            (this.iframeEl
                .contentWindow as any).PDFViewerApplication.eventBus.on(
                "afterprint",
                () => {
                    resolve();
                },
                { once: true }
            );
        });
    }

    @Prop() scale: "auto" | "page-fit" | "page-width" | number;

    @Watch("scale")
    updateScale() {
        this.setScale(this.scale);
    }

    @Method()
    async setScale(scale: "auto" | "page-fit" | "page-width" | number) {
        const contentWindow = this.iframeEl.contentWindow as any;

        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = (this.iframeEl
                .contentWindow as any).PDFViewerApplication;
            pdfViewer.currentScaleValue = scale;
        }
    }

    iframeEl: HTMLIFrameElement;
    viewerContainer: HTMLElement;

    PDFViewerApplication: any;

    @State() iframeLoaded: boolean;

    get viewerSrc() {
        if (this.page) {
            return `${getAssetPath(
                "./pdf-viewer-assets/viewer/web/viewer.html"
            )}?file=${encodeURIComponent(this.src)}#page=${this.page}`;
        }
        return `${getAssetPath(
            "./pdf-viewer-assets/viewer/web/viewer.html"
        )}?file=${encodeURIComponent(this.src)}`;
    }

    componentDidLoad() {
        this.iframeEl.onload = () => {
            this.setCSSVariables();
            this.initButtonVisibility();
            this.addEventListeners();
            this.iframeLoaded = true;
            this.PDFViewerApplication = (this.iframeEl.contentWindow as any).PDFViewerApplication;
        };
    }

    disconnectedCallback() {
        // https://github.com/mozilla/pdf.js/issues/11297
        this.PDFViewerApplication.pdfViewer._pages.forEach(page => page.reset());
    }

    setCSSVariables() {
        for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
            const value = getComputedStyle(this.element).getPropertyValue(
                PdfViewer.CSSVariables[i]
            );
            this.iframeEl.contentDocument.documentElement.style.setProperty(
                PdfViewer.CSSVariables[i],
                value
            );
        }
    }

    initButtonVisibility() {
        this.toolbarEl = this.iframeEl.contentDocument.body.querySelector(
            "#toolbarContainer"
        );
        this.sidebarToggleEl = this.iframeEl.contentDocument.body.querySelector(
            "#sidebarToggle"
        );
        this.searchToggleEl = this.iframeEl.contentDocument.body.querySelector(
            "#viewFind"
        );
        this.updateToolbarVisibility();
        this.updateSideDrawerVisibility();
        this.updateSearchVisibility();
    }

    addEventListeners() {
        this.viewerContainer = this.iframeEl.contentDocument.body.querySelector(
            "#viewerContainer"
        );

        const frameWindow = this.iframeEl.contentWindow as any;
        const pdfViewer = frameWindow.PDFViewerApplication;

        pdfViewer.initializedPromise.then(() => {
            pdfViewer.eventBus.on(
                "pagechanging",
                this.handlePageChange.bind(this)
            );
            // when the documents within the pdf viewer finish loading
            pdfViewer.eventBus.on("pagesloaded", () => {
                if (this.scale) {
                    this.setScale(this.scale);
                }
            });
        });

        this.viewerContainer.addEventListener(
            "click",
            this.handleLinkClick.bind(this)
        );

        this.updateScrolling();

        const fullscreenBtn = this.iframeEl.contentDocument.documentElement.querySelector(
            "#fullscreen"
        );

        if (screenfull.isEnabled) {
            screenfull.on("change", () => {
                if (screenfull.isEnabled) {
                    const collapseIcon = fullscreenBtn.querySelector(
                        "#collapseIcon"
                    ) as HTMLElement;
                    const fullscreenIcon = fullscreenBtn.querySelector(
                        "#fullscreenIcon"
                    ) as HTMLElement;
                    if (screenfull.isFullscreen) {
                        collapseIcon.classList.remove("hidden");
                        fullscreenIcon.classList.add("hidden");
                    } else {
                        fullscreenIcon.classList.remove("hidden");
                        collapseIcon.classList.add("hidden");
                    }
                }
            });
        } else {
            fullscreenBtn.classList.add("hidden");
        }

        fullscreenBtn.addEventListener("click", () => {
            if (screenfull.isEnabled) {
                screenfull.toggle(
                    this.iframeEl.contentDocument.documentElement
                );
            }
        });
    }

    handlePageChange(e: any) {
        this.pageChange.emit(e.pageNumber);
    }

    handleLinkClick(e: any) {
        e.preventDefault();
        const link = (e.target as any).closest(".linkAnnotation > a");
        if (link) {
            // Ignore internal links to the same document
            if (link.classList.contains("internalLink")) {
                return;
            }
            const href =
                (e.target as any).closest(".linkAnnotation > a").href || "";
            this.linkClick.emit(href);
        }
    }

    render() {
        return (
            <iframe
                class={{
                    loaded: this.iframeLoaded,
                }}
                ref={(el) => (this.iframeEl = el as HTMLIFrameElement)}
                src={this.viewerSrc}
            ></iframe>
        );
    }
}
