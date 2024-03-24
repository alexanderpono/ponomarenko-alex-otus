import {
    AbstractGraph,
    Edge,
    Vertex,
    defaultAbstractGraph,
    defaultVertex
} from '@src/game/Graph.types';
import { defaultEdgeCost } from '@src/game/GraphCalculator';

const NULL = -1;
const getPairs = (chars: string[]): string[] => {
    const result: string[] = [];
    for (let i = 0; i < chars.length; i += 2) {
        const pair = `${chars[i]}${chars[i + 1]}`;
        result.push(pair);
    }
    return result;
};
type Matrix = number[][];

export class GraphFromAdjString {
    private matrixFromAdjacencyString = (s: string): Matrix => {
        const trimmed = s.trim();
        const lines = trimmed.split('\n');
        const matrix: Matrix = lines.reduce((result: Matrix, line: string, index: number) => {
            if (index === 0) {
                return result;
            }
            const chars = line.split('').slice(2);
            const pairs = getPairs(chars);
            const adjasentAndCosts = pairs.map((pair: string) => {
                if (pair === '..') {
                    return NULL;
                }
                return parseInt(pair);
            });
            return [...result, adjasentAndCosts];
        }, []);
        return matrix;
    };

    graphFromAdjacencyString = (s: string): AbstractGraph => {
        const matrix = this.matrixFromAdjacencyString(s);
        let graph = {
            ...defaultAbstractGraph
        };
        graph = this.calcEdges(graph, matrix);
        graph = this.calcVertices(graph, matrix);
        return graph;
    };

    private calcEdges = (graph: AbstractGraph, matrix: Matrix = []) => {
        return { ...graph, edges: this.getEdges_(matrix) };
    };

    private getEdges_ = (matrix: Matrix = []): Edge[] => {
        const result: Edge[] = [];
        const edges = new Set();
        for (let i = 0; i < matrix.length; i++) {
            const line = matrix[i];
            for (let j = 0; j < line.length; j++) {
                const cost = line[j];
                if (cost === NULL) {
                    continue;
                }
                let minIndex = i;
                let maxIndex = j;
                if (i > j) {
                    minIndex = j;
                    maxIndex = i;
                }
                const edgeName = `${minIndex}-${maxIndex}`;
                if (edges.has(edgeName)) {
                    continue;
                }
                edges.add(edgeName);
                result.push({
                    vertex0: i,
                    vertex1: j,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }

        return result;
    };

    private calcVertices = (graph: AbstractGraph, matrix: Matrix = []) => {
        return { ...graph, vertices: this.calcVertices_(matrix) };
    };

    private calcVertices_ = (matrix: Matrix = []): Vertex[] =>
        matrix.map(() => ({ ...defaultVertex }));
}
