const glob = require('glob')
const fs = require('fs')

const distPath = 'pdf.js/build/dist';
glob(`${distPath}/*.tgz`, function (err, files) {
    if (err) {
        return console.error(err);
    }
    fs.rename(files[0], `${distPath}/pdfjs-dist.tgz`, function (err) {
        if (err) {
            return console.error(err);
        }
    });
});
