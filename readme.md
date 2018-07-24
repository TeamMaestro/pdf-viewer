# Stencil PDF Viewer
This web component allows you to add PDF rendering support to your web (and Ionic native) applications.

## Installation
- `npm i @teammaestro/stencil-pdf-viewer`

## Usage
```
<st-pdf-viewer src="http://www.mydomain.com/example.pdf"></st-pdf-viewer>
```

### Angular (6+) / Ionic (4+)
In your `angular.json` file add the following assets matcher in your `projects.app.architect.build.options.assets` collection:
```
{
    "glob": "**/*",
    "input": "node_modules/@teammaestro/stencil-pdf-viewer/dist/pdfviewer",
    "output": "./pdfviewer"
}
```

In your main `AppModule` (i.e. `app.module.ts`) add the following import statement:
```
import '@teammaestro/stencil-pdf-viewer/dist/pdfviewer';
```


## Contributors

[<img alt="Sean Bannigan" src="https://avatars1.githubusercontent.com/u/15218748?s=460&v=4" width="117">](https://github.com/sbannigan) | [<img alt="Sean Perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=4&s=117" width="117">](https://github.com/sean-perkins) |[<img alt="Justin True" src="https://avatars3.githubusercontent.com/u/17008383?s=400&v=4" width="117">](https://github.com/bbjdt2224)  |
:---:|:---:|:---:
|[Sean Bannigan](https://github.com/sean-perkins)|[Sean Perkins](https://github.com/sean-perkins)|[Justin True](https://github.com/bbjdt2224)
