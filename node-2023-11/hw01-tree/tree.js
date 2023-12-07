const { description, name, version } = require('./package.json');
const { validateParams } = require('./params');
const { FsInput } = require('./FsInput');

const params = process.argv.slice(2);
printAbout();

console.log('validateParams=', validateParams);
validateParams(params);

function printAbout() {
    console.log(`\n\n${[name, description, version].join(' | ')}`);
}

new FsInput().getDirStats('./data', '', [], 2).then((foundFiles) => {
    console.log('foundFiles=', foundFiles);
});