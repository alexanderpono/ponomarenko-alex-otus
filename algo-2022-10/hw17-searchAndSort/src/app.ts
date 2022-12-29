import { Graph } from './Graph';

const adjacencyMatrix = `
.1......
....1...
...1....
11..11..
......1.
....1..1
.......1
........
`;

console.log(JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).getMatrix()));
console.log(
    JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).getColumnsSumma())
);

console.log(JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).sortDemucron()));
