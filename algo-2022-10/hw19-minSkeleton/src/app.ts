import { Graph, SILENT, VERBOSE } from './Graph';

const adjacencyMatrix = `
  AABBCCDDEEFFGGHHII
AA..09..10........03
BB09..04..08......16
CC..04....1401......
DD10......07..130511
EE..081407..1215....
FF....01..12..02....
GG......131502..06..
HH......05....06....
II0316..11..........
`;
console.log('adjacencyMatrix=', adjacencyMatrix);
console.log(
    '\nadjacencyMatrix=',
    JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).getMatrix())
);
console.log(
    '\nedges=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .getEdges()
);

console.log(
    '\nverticesNumber=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .getVerticesNumber()
);

console.log(
    '\nsorted edges=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .sortEdges()
        .getEdges()
);

console.log(
    '\nadjacencyComponents=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .sortEdges()
        .createAdjacencyComponents(SILENT)
        .getAdjacencyComponents()
);

console.log(
    '\nskippedEdges=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .sortEdges()
        .createAdjacencyComponents(SILENT)
        .getSkippedEdges()
);

console.log(
    '\nsmallestSkeleton=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .sortEdges()
        .createAdjacencyComponents(SILENT)
        .createSmallestSkeleton(VERBOSE)
        .getSmallestSkeleton()
);

console.log(
    '\nprettySmallestSkeleton=',
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .deduplicateEdges()
        .sortEdges()
        .createAdjacencyComponents(SILENT)
        .createSmallestSkeleton(SILENT)
        .getPrettySmallestSkeleton()
);
