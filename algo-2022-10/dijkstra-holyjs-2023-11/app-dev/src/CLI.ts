import { description, name, version } from '../package.json';
import { GraphFromField } from './game/GraphFromField';
import { GameField } from './game/GameField';
import { GraphFromFieldAdvancedV2 } from './game/GraphFromFieldAdvancedV2';
import { GraphCalculatorV2 } from './game/GraphCalculatorV2';
import { ALL_NODES, SILENT } from './game/GraphCalculator';
import { GraphCalculatorV5f } from './game/GraphCalculatorV5f';

console.log(`${name} ${version}`);
const ADVANCED_V2 = new GraphFromFieldAdvancedV2();

// for (let i = 10; i <= 100; i *= 10) {
//     console.log('i=', i);
//     const line0 = new Array('▓', ...new Array(i - 1).fill(' '));
//     const middleLine = new Array(i).fill(' ');
//     const lastLine = new Array(...new Array(i - 1).fill(' '), '▓');
//     const mapAr = [line0];
//     for (let k = 0; k < i - 2; k++) {
//         mapAr.push([...middleLine]);
//     }
//     mapAr.push(lastLine);
//     const targetX = i < 20 ? 7 : 17;
//     mapAr[2][5] = 'M';
//     mapAr[6][targetX] = '$';
//     const map = mapAr.map((lineAr) => lineAr.join('')).join('\n');

//     const gameField = GameField.create().initFromText(map);
//     const ADVANCED_V2 = GraphFromFieldV2.getEdgeAdvancedCost;
//     let graph = ADVANCED_V2.graphFromField(gameField, ADVANCED_V2);
//     const mIndex = ADVANCED_V2.getVertexIndex(map, 'M');
//     const dIndex = ADVANCED_V2.getVertexIndex(map, '$');
//     const start = Date.now();
//     graph = new GraphCalculatorV2().calculateGraph(
//         graph,
//         mIndex,
//         dIndex,
//         SILENT,
//         ALL_NODES,
//         gameField
//     );
//     const end = Date.now();
//     console.log(`Dijkstra N:${i} time: ${end - start}`);
// }

// i= 10
// Dijkstra N:10 time: 3
// i= 100
// Dijkstra N:100 time: 557
// i= 1000
// Dijkstra N:1000 time: 51555

for (let i = 10; i <= 10000; i *= 10) {
    console.log('i=', i);
    const line0 = new Array('▓', ...new Array(i - 1).fill(' '));
    const middleLine = new Array(i).fill(' ');
    const lastLine = new Array(...new Array(i - 1).fill(' '), '▓');
    const mapAr = [line0];
    for (let k = 0; k < i - 2; k++) {
        mapAr.push([...middleLine]);
    }
    mapAr.push(lastLine);
    const targetX = i < 20 ? 7 : 17;
    mapAr[2][5] = 'M';
    mapAr[6][targetX] = '$';
    const map = mapAr.map((lineAr) => lineAr.join('')).join('\n');

    const gameField = GameField.create().initFromText(map);
    let graph = ADVANCED_V2.graphFromField(gameField);
    const mIndex = ADVANCED_V2.getVertexIndex(map, 'M');
    const dIndex = ADVANCED_V2.getVertexIndex(map, '$');
    const start = Date.now();
    graph = new GraphCalculatorV5f().calculateGraph(
        graph,
        mIndex,
        dIndex,
        SILENT,
        ALL_NODES,
        gameField
    );
    const end = Date.now();
    console.log(`A* N:${i} time: ${end - start}`);
}

// A*
// i= 10
// A* N:10 time: 2
// i= 100
// A* N:100 time: 14
// i= 1000
// A* N:1000 time: 835
// i= 10000
// A* out of memory
