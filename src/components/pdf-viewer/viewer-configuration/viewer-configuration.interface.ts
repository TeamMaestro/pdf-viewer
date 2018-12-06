export interface ViewerConfiguration {
    appContainer: HTMLElement;
    mainContainer: HTMLElement;
    viewerContainer: HTMLElement;
    eventBus: null;
    toolbar: {
        container: HTMLElement;
        numPages: HTMLElement;
        pageNumber: HTMLElement;
        scaleSelectContainer: HTMLElement;
        scaleSelect: HTMLElement;
        customScaleOption: HTMLElement;
        previous: HTMLElement;
        next: HTMLElement;
        zoomIn: HTMLElement;
        zoomOut: HTMLElement;
        viewFind: HTMLElement;
        openFile: HTMLElement;
        print: HTMLElement;
        presentationModeButton: HTMLElement;
        download: HTMLElement;
        viewBookmark: HTMLElement
    };
    secondaryToolbar: {
        toolbar: HTMLElement;
        toggleButton: HTMLElement;
        toolbarButtonContainer: HTMLElement;
        presentationModeButton: HTMLElement;
        openFileButton: HTMLElement;
        printButton: HTMLElement;
        downloadButton: HTMLElement;
        viewBookmarkButton: HTMLElement;
        firstPageButton: HTMLElement;
        lastPageButton: HTMLElement;
        pageRotateCwButton: HTMLElement;
        pageRotateCcwButton: HTMLElement;
        cursorSelectToolButton: HTMLElement;
        cursorHandToolButton: HTMLElement;
        scrollVerticalButton: HTMLElement;
        scrollHorizontalButton: HTMLElement;
        scrollWrappedButton: HTMLElement;
        spreadNoneButton: HTMLElement;
        spreadOddButton: HTMLElement;
        spreadEvenButton: HTMLElement;
        documentPropertiesButton: HTMLElement
    };
    fullscreen: {
        contextFirstPage: HTMLElement;
        contextLastPage: HTMLElement;
        contextPageRotateCw: HTMLElement;
        contextPageRotateCcw: HTMLElement
    };
    sidebar: {
        outerContainer: HTMLElement;
        viewerContainer: HTMLElement;
        toggleButton: HTMLElement;
        thumbnailButton: HTMLElement;
        outlineButton: HTMLElement;
        attachmentsButton: HTMLElement;
        thumbnailView: HTMLElement;
        outlineView: HTMLElement;
        attachmentsView: HTMLElement
    };
    sidebarResizer: {
        outerContainer: HTMLElement;
        resizer: HTMLElement;
    };
    findBar: {
        bar: HTMLElement;
        toggleButton: HTMLElement;
        findField: HTMLElement;
        highlightAllCheckbox: HTMLElement;
        caseSensitiveCheckbox: HTMLElement;
        entireWordCheckbox: HTMLElement;
        findMsg: HTMLElement;
        findResultsCount: HTMLElement;
        findPreviousButton: HTMLElement;
        findNextButton: HTMLElement;
    };
    passwordOverlay: {
        overlayName: 'passwordOverlay';
        container: HTMLElement;
        label: HTMLElement;
        input: HTMLElement;
        submitButton: HTMLElement;
        cancelButton: HTMLElement
    };
    documentProperties: {
        overlayName: 'documentPropertiesOverlay';
        container: HTMLElement;
        closeButton: HTMLElement;
        fields: {
            'fileName': HTMLElement;
            'fileSize': HTMLElement;
            'title': HTMLElement;
            'author': HTMLElement;
            'subject': HTMLElement;
            'keywords': HTMLElement;
            'creationDate': HTMLElement;
            'modificationDate': HTMLElement;
            'creator': HTMLElement;
            'producer': HTMLElement;
            'version': HTMLElement;
            'pageCount': HTMLElement;
            'pageSize': HTMLElement;
            'linearized': HTMLElement;
        }
    };
    errorWrapper: {
        container: HTMLElement;
        errorMessage: HTMLElement;
        closeButton: HTMLElement;
        errorMoreInfo: HTMLElement;
        moreInfoButton: HTMLElement;
        lessInfoButton: HTMLElement
    };
    printContainer: HTMLElement;
    openFileInputName: 'fileInput';
    debuggerScriptPath: './debugger.js';
}
