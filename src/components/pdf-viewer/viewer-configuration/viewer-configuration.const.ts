import { ViewerConfiguration } from './viewer-configuration.interface';

export const Config = (shadowRoot: ShadowRoot): ViewerConfiguration => {
    function getElementById(selector: string) {
        return shadowRoot.getElementById(selector);
    }

    return {
        shadowRoot: shadowRoot,
        appContainer: document.body,
        mainContainer: getElementById('viewerContainer'),
        viewerContainer: getElementById('viewer'),
        eventBus: null,
        toolbar: {
            container: getElementById('toolbarViewer'),
            numPages: getElementById('numPages'),
            pageNumber: getElementById('pageNumber'),
            scaleSelectContainer: getElementById('scaleSelectContainer'),
            scaleSelect: getElementById('scaleSelect'),
            customScaleOption: getElementById('customScaleOption'),
            previous: getElementById('previous'),
            next: getElementById('next'),
            zoomIn: getElementById('zoomIn'),
            zoomOut: getElementById('zoomOut'),
            viewFind: getElementById('viewFind'),
            openFile: getElementById('openFile'),
            print: getElementById('print'),
            presentationModeButton: getElementById('presentationMode'),
            download: getElementById('download'),
            viewBookmark: getElementById('viewBookmark')
        },
        secondaryToolbar: {
            toolbar: getElementById('secondaryToolbar'),
            toggleButton: getElementById('secondaryToolbarToggle'),
            toolbarButtonContainer: getElementById('secondaryToolbarButtonContainer'),
            presentationModeButton: getElementById('secondaryPresentationMode'),
            openFileButton: getElementById('secondaryOpenFile'),
            printButton: getElementById('secondaryPrint'),
            downloadButton: getElementById('secondaryDownload'),
            viewBookmarkButton: getElementById('secondaryViewBookmark'),
            firstPageButton: getElementById('firstPage'),
            lastPageButton: getElementById('lastPage'),
            pageRotateCwButton: getElementById('pageRotateCw'),
            pageRotateCcwButton: getElementById('pageRotateCcw'),
            cursorSelectToolButton: getElementById('cursorSelectTool'),
            cursorHandToolButton: getElementById('cursorHandTool'),
            scrollVerticalButton: getElementById('scrollVertical'),
            scrollHorizontalButton: getElementById('scrollHorizontal'),
            scrollWrappedButton: getElementById('scrollWrapped'),
            spreadNoneButton: getElementById('spreadNone'),
            spreadOddButton: getElementById('spreadOdd'),
            spreadEvenButton: getElementById('spreadEven'),
            documentPropertiesButton: getElementById('documentProperties')
        },
        fullscreen: {
            contextFirstPage: getElementById('contextFirstPage'),
            contextLastPage: getElementById('contextLastPage'),
            contextPageRotateCw: getElementById('contextPageRotateCw'),
            contextPageRotateCcw: getElementById('contextPageRotateCcw')
        },
        sidebar: {
            outerContainer: getElementById('outerContainer'),
            viewerContainer: getElementById('viewerContainer'),
            toggleButton: getElementById('sidebarToggle'),
            thumbnailButton: getElementById('viewThumbnail'),
            outlineButton: getElementById('viewOutline'),
            attachmentsButton: getElementById('viewAttachments'),
            thumbnailView: getElementById('thumbnailView'),
            outlineView: getElementById('outlineView'),
            attachmentsView: getElementById('attachmentsView')
        },
        sidebarResizer: {
            outerContainer: getElementById('outerContainer'),
            resizer: getElementById('sidebarResizer')
        },
        findBar: {
            bar: getElementById('findbar'),
            toggleButton: getElementById('viewFind'),
            findField: getElementById('findInput'),
            highlightAllCheckbox: getElementById('findHighlightAll'),
            caseSensitiveCheckbox: getElementById('findMatchCase'),
            entireWordCheckbox: getElementById('findEntireWord'),
            findMsg: getElementById('findMsg'),
            findResultsCount: getElementById('findResultsCount'),
            findPreviousButton: getElementById('findPrevious'),
            findNextButton: getElementById('findNext')
        },
        passwordOverlay: {
            overlayName: 'passwordOverlay',
            container: getElementById('passwordOverlay'),
            label: getElementById('passwordText'),
            input: getElementById('password'),
            submitButton: getElementById('passwordSubmit'),
            cancelButton: getElementById('passwordCancel')
        },
        documentProperties: {
            overlayName: 'documentPropertiesOverlay',
            container: getElementById('documentPropertiesOverlay'),
            closeButton: getElementById('documentPropertiesClose'),
            fields: {
                'fileName': getElementById('fileNameField'),
                'fileSize': getElementById('fileSizeField'),
                'title': getElementById('titleField'),
                'author': getElementById('authorField'),
                'subject': getElementById('subjectField'),
                'keywords': getElementById('keywordsField'),
                'creationDate': getElementById('creationDateField'),
                'modificationDate': getElementById('modificationDateField'),
                'creator': getElementById('creatorField'),
                'producer': getElementById('producerField'),
                'version': getElementById('versionField'),
                'pageCount': getElementById('pageCountField'),
                'pageSize': getElementById('pageSizeField'),
                'linearized': getElementById('linearizedField')
            }
        },
        errorWrapper: {
            container: getElementById('errorWrapper'),
            errorMessage: getElementById('errorMessage'),
            closeButton: getElementById('errorClose'),
            errorMoreInfo: getElementById('errorMoreInfo'),
            moreInfoButton: getElementById('errorShowMore'),
            lessInfoButton: getElementById('errorShowLess')
        },
        printContainer: getElementById('printContainer'),
        openFileInputName: 'fileInput',
        debuggerScriptPath: './debugger.js'
    }
}
