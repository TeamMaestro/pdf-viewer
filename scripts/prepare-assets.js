const fs = require('fs');

// Copy Worker
const workerPath = 'pdf.js/build/dist/build/pdf.worker.min.js';
const destPath = 'src/components/pdf-viewer/pdfjs-assets/pdf.worker.min.js';
fs.readFile(workerPath, 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }
    fs.writeFile(destPath, data, 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(`Worker copied to ${destPath}`)
    })
});

const localeRootPath = 'pdf.js/build/generic/web/locale';
const destRootPath = 'src/components/pdf-viewer/pdfjs-assets/locale';
// rewrite locale.properties
fs.readFile(`${localeRootPath}/locale.properties`, 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }
    data = data.replace(/\//g, '.');
    fs.writeFile(`${destRootPath}/locale.properties`, data, 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(`locale.properties copied to ${destRootPath}`)
    });
});

fs.readdir(`${localeRootPath}`, 'utf8', function (err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(file => {
        if (file !== 'locale.properties') {
            fs.readFile(`${localeRootPath}/${file}/viewer.properties`, 'utf8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                fs.writeFile(`${destRootPath}/${file}.viewer.properties`, data, 'utf8', function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
        }
    });
    console.log(`viewer.properties copied to ${destRootPath}`)
});
