const fs = require('fs');
const definePaths = [
    './dist/esm/es5/pdf-viewer.define.js',
    './dist/esm/es2017/pdf-viewer.define.js',
];

definePaths.forEach(function (path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        }

        data = data + "import '../../pdf-viewer/pdfjs-worker';"

        fs.writeFile(path, data, 'utf8', function (err) {
            if (err) {
                return console.error(err);
            }

            console.log(`Worker import added to ${path}`)
        })
    });
})
