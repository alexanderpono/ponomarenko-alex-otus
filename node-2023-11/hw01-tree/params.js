function printUsage() {
    console.log(`
Usage: tree <dirName> -d <depth>
Example: tree data -d 2
    `);
}

const validateParams = (params) => {
    if (params.length < 3) {
        console.log('\nFATAL: not enough parameters');
        printUsage();
        process.exit();
    }
    
    if (params[1] != '-d') {
        console.log('\nFATAL: parameter [1] must be = -d');
        printUsage();
        process.exit();
    }
    
    if (isNaN(parseInt(params[2]))) {
        console.log('\nFATAL: parameter [2] must be a number');
        printUsage();
        process.exit();
    }
}


module.exports = {
    validateParams
}