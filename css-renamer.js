// Dette er en midlertidig og hacky måte og fikse feil i craco/craco-less som gjør at hash på css-filer ikke blir fjernet
const fs = require('fs');
const path = require('path');

const cssDirPath = path.join(__dirname, './build/static/css');

try {
    const files = fs.readdirSync(cssDirPath);
    files.forEach(file => {
        const fileName = file.substr(0, file.indexOf('.'));
        const fileEnding = file.substr(file.indexOf('.css'));
        fs.renameSync(path.join(cssDirPath, file), path.join(cssDirPath, fileName + fileEnding));
    });
} catch (e) {
    console.error(e.toString());
    console.error('Klarte ikke å rename CSS-fil i ' + cssDirPath);
    process.exit(1);
}
