console.log('index.ts!');

import { splitFile } from './lib';

// const readStream = fs.createReadStream('./test.txt', { encoding: 'utf8' });
// async function print() {
//     for await (const chunk of readStream) {
//         console.log('chunk=', chunk);
//     }
// }

// print();

const fileName = './100Mb.txt';

splitFile(fileName, 5);
