# Hive Stencil PDF Viewer
This web component allows you to add PDF rendering support to your web (and Ionic native) applications.

## Features
- Rendering PDFs on web (Angular, Ionic, React, Stencil, etc.)
- Search
- Rotation of Documents
- Fit to Page / Fit to Width
- Side panel for quick thumbnail navigation

## Preview

|Mobile|Web|
:---:|:---:
|![Mobile Image](https://i.gyazo.com/8f0af76f1e0d1b138baeed3d25266b81.gif)|![Web Image](https://i.gyazo.com/8e0b44567b15e4aec1b20df550aae817.gif)|

## Installation
- `npm i @teamhive/stencil-pdf-viewer`

## Usage
```
<hive-pdf-viewer src="http://www.mydomain.com/example.pdf"></hive-pdf-viewer>
```

### Angular (6+) / Ionic (4+)
In your `angular.json` file add the following assets matcher in your `projects.app.architect.build.options.assets` collection:
```
{
    "glob": "**/*",
    "input": "node_modules/@teamhive/stencil-pdf-viewer/dist/pdfviewer",
    "output": "./pdfviewer"
}
```

In your main `AppModule` (i.e. `app.module.ts`) add the following import statement:
```
import '@teamhive/stencil-pdf-viewer/dist/pdfviewer';
```

## Properties
|Property|Default|Description
:---:|:---:|:---:
|`src`||The PDF web address location (file://|http|https)|
|`page`|`1`|The default page index.|
|`zoom`|`1`|The current zoom target for the document.|
|`minZoom`|`0.25`|The minimum zoom target allowed for the document.|
|`maxZoom`|`4`|The maximum zoom target allowed for the document.|
|`rotation`|`0`|The rotated document value.
|`allowPrint`|`false`|If the document allows printing (hides print button).|
|`searchOpen`|`false`|If the search pop-up panel should be displayed by default.|
|`enableSideDrawer`|`true`|If the side drawer UI (and button) is available for display.|
|`enableRotate`|`true`|If the document can be rotated. Hides the button when false.|


### Events
|Event|Description|
:---:|:---:
|`onLinkClick(href: string)`|Emits the `href` clicked when it's not an internal document annotation.|
|`pageChange(currentPage: number)`|Emits the current page number when the current page changes.|
|`afterLoadComplete(pdf: PDFDocumentProxy)`|Emits the pdf document when the loading task completes.|
|`onError(error: any)`|Emitted when the document fails to load.|
|`onProgress(progressData: PDFProgressData)`|Emit when the loading task returns back progress.|

---


## Contributors

[<img alt="Sean Bannigan" src="https://avatars1.githubusercontent.com/u/15218748?s=460&v=4" width="117">](https://github.com/sbannigan) | [<img alt="Sean Perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=4&s=117" width="117">](https://github.com/sean-perkins) |[<img alt="Justin True" src="https://avatars3.githubusercontent.com/u/17008383?s=400&v=4" width="117">](https://github.com/bbjdt2224)  |
:---:|:---:|:---:
|[Sean Bannigan](https://github.com/sean-perkins)|[Sean Perkins](https://github.com/sean-perkins)|[Justin True](https://github.com/bbjdt2224)
