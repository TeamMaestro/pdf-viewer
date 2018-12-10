const glob = require('glob')
const fs = require('fs')

const distPath = 'pdf.js/build/dist';
glob(`${distPath}/*.tgz`, function (err, files) {
    if (err) {
        return console.error(err);
    }

    files.forEach(function (file) {
        fs.unlink(file, (err) => {
            if (err) {
                return console.error(err);
            }
        });
    });
});
