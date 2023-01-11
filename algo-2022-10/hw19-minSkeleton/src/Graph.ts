const NULL = -1;
const NOT_FOUND = -1;
const BELONGS_TO_SEVERAL_COMPONENTS = -2;
export const VERBOSE = true;
export const SILENT = false;

interface Edge {
    vertex0: number;
    vertex1: number;
    cost: number;
}

interface CreateAdjacencyComponentsResult {
    adjacencyComponents: number[][];
    skippedEdges: number[];
}

const getPairs = (chars: string[]): string[] => {
    const result: string[] = [];
    for (let i = 0; i < chars.length; i += 2) {
        const pair = `${chars[i]}${chars[i + 1]}`;
        result.push(pair);
    }
    return result;
};
export class Graph {
    matrix: number[][] = [];
    edges: Edge[] = [];
    adjacencyComponents: number[][] = [];
    skippedEdges: number[] = [];
    verticesNumber: number = 0;
    smallestSkeleton: number[] = [];

    constructor() {}

    initFromAdjacencyString = (s: string) => {
        const trimmed = s.trim();
        const lines = trimmed.split('\n');
        const matrix: number[][] = lines.reduce(
            (result: number[][], line: string, index: number) => {
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
            },
            []
        );
        this.matrix = matrix;
        this.verticesNumber = matrix.length;
        return this;
    };

    getMatrix = () => this.matrix;
    getEdges = () => this.edges;
    getAdjacencyComponents = () => this.adjacencyComponents;
    getSkippedEdges = () => this.skippedEdges;
    getVerticesNumber = () => this.verticesNumber;
    getSmallestSkeleton = () => this.smallestSkeleton;

    calcEdges = () => {
        this.edges = this.getEdges_();
        return this;
    };

    getEdges_ = (): Edge[] => {
        const result: Edge[] = [];
        for (let i = 0; i < this.matrix.length; i++) {
            const line = this.matrix[i];
            for (let j = 0; j < line.length; j++) {
                const cost = line[j];
                if (cost === NULL) {
                    continue;
                }
                result.push({
                    vertex0: i,
                    vertex1: j,
                    cost
                });
            }
        }

        return result;
    };

    deduplicateEdges = () => {
        this.edges = this.deduplicateEdges_();
        return this;
    };

    deduplicateEdges_ = (): Edge[] => {
        const result: Edge[] = [];

        const getEdgeHash = (edge: Edge): string => {
            let max = edge.vertex0;
            let min = edge.vertex1;
            if (max < min) {
                max = edge.vertex1;
                min = edge.vertex0;
            }
            return `${min}${max}`;
        };
        const hashes = new Set();
        this.edges.forEach((edge: Edge) => {
            const hash = getEdgeHash(edge);
            if (hashes.has(hash)) {
                return;
            }
            hashes.add(hash);
            result.push(edge);
        });
        return result;
    };

    sortEdges = () => {
        this.edges = this.sortEdges_();
        return this;
    };

    sortEdges_ = (): Edge[] => {
        const result: Edge[] = this.edges.sort((a: Edge, b: Edge) => {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });

        return result;
    };

    vertexBelongsToComponent = (aComponent: number[], vertex: number): boolean => {
        for (let eIndex = 0; eIndex < aComponent.length; eIndex++) {
            const edgeIndex = aComponent[eIndex];
            const edge = this.edges[edgeIndex];
            if (edge.vertex0 === vertex || edge.vertex1 === vertex) {
                return true;
            }
        }
        return false;
    };

    getComponentsWithEdge = (adjacencyComponents: number[][], edgeIndex: number): number[] => {
        const testedEdge = this.edges[edgeIndex];
        const foundComponents: number[] = [];
        for (
            let componentIndex = 0;
            componentIndex < adjacencyComponents.length;
            componentIndex++
        ) {
            const aComponent = adjacencyComponents[componentIndex];
            const v0Belongs = this.vertexBelongsToComponent(aComponent, testedEdge.vertex0);
            const v1Belongs = this.vertexBelongsToComponent(aComponent, testedEdge.vertex1);
            if (v0Belongs || v1Belongs) {
                foundComponents.push(componentIndex);
            }
        }
        return foundComponents;
    };

    getAjacencyComponentWithVertex = (
        adjacencyComponents: number[][],
        edgeIndex: number
    ): number => {
        const foundComponents = this.getComponentsWithEdge(adjacencyComponents, edgeIndex);
        if (foundComponents.length === 1) {
            return foundComponents[0];
        }
        if (foundComponents.length > 1) {
            return BELONGS_TO_SEVERAL_COMPONENTS;
        }
        return NOT_FOUND;
    };

    deadLoopWithEdge = (aComponent: number[], testedEdge: Edge): boolean => {
        const v0Belongs = this.vertexBelongsToComponent(aComponent, testedEdge.vertex0);
        const v1Belongs = this.vertexBelongsToComponent(aComponent, testedEdge.vertex1);
        return v0Belongs && v1Belongs;
    };

    createAdjacencyComponents = (verbose: boolean) => {
        const { adjacencyComponents, skippedEdges } = this.createAdjacencyComponents_(verbose);
        this.adjacencyComponents = adjacencyComponents;
        this.skippedEdges = skippedEdges;
        return this;
    };

    createAdjacencyComponents_ = (verbose: boolean): CreateAdjacencyComponentsResult => {
        let adjacencyComponents: number[][] = [];
        const addEdgeToComponent = (componentIndex: number, edgeIndex: number) =>
            (adjacencyComponents[componentIndex] = [
                ...adjacencyComponents[componentIndex],
                edgeIndex
            ]);
        const createNewComponentWithEdge = (edgeIndex: number) =>
            adjacencyComponents.push([edgeIndex]);

        const skippedEdges: number[] = [];

        this.edges.forEach((edge: Edge, edgeIndex: number) => {
            if (verbose) {
                console.log(`${edgeIndex} edge=`, edge);
            }
            const componentIndex = this.getAjacencyComponentWithVertex(
                adjacencyComponents,
                edgeIndex
            );
            if (componentIndex === NOT_FOUND) {
                createNewComponentWithEdge(edgeIndex);
            } else if (componentIndex === BELONGS_TO_SEVERAL_COMPONENTS) {
                skippedEdges.push(edgeIndex);
                if (verbose) {
                    console.log(
                        `edge ${edgeIndex} should not add because it belongs to several components`
                    );
                }
            } else {
                if (!this.deadLoopWithEdge(adjacencyComponents[componentIndex], edge)) {
                    addEdgeToComponent(componentIndex, edgeIndex);
                } else {
                    skippedEdges.push(edgeIndex);

                    if (verbose) {
                        console.log(
                            `edge ${edgeIndex} should not add to ${componentIndex}-${adjacencyComponents[componentIndex]} because of loop`
                        );
                    }
                }
            }
        });

        return { adjacencyComponents, skippedEdges };
    };

    connectComponentsUsingEdge = (
        adjacencyComponents: number[][],
        foundComponents: number[],
        edgeIndex: number
    ): number[][] => {
        const componentA = adjacencyComponents[foundComponents[0]];
        const componentB = adjacencyComponents[foundComponents[1]];
        const newAdjacencyComponents = [
            ...adjacencyComponents.filter(
                (component, index: number) =>
                    index !== foundComponents[0] && index !== foundComponents[1]
            ),
            [...componentA, ...componentB, edgeIndex]
        ];
        return newAdjacencyComponents;
    };

    createSmallestSkeleton = (verbose: boolean) => {
        this.smallestSkeleton = this.createSmallestSkeleton_(verbose);
        return this;
    };

    createSmallestSkeleton_ = (verbose: boolean) => {
        let adjacencyComponents = [...this.adjacencyComponents];
        for (let edgeIndex = 0; edgeIndex < this.skippedEdges.length; edgeIndex++) {
            const resultIsReady = adjacencyComponents[0].length === this.verticesNumber - 1;
            if (resultIsReady) {
                if (verbose) {
                    console.log('result is ready');
                }
                break;
            }

            const foundComponents = this.getComponentsWithEdge(adjacencyComponents, edgeIndex);
            if (verbose) {
                console.log(
                    `edgeIndex=${edgeIndex} foundComponents=${foundComponents
                        .map((index: number) => adjacencyComponents[index])
                        .map((aComponent: number[]) => this.toPrintAComp(aComponent))
                        .join(' ')}`
                );
            }
            const edgeMakesLoops = foundComponents.reduce(
                (prev: boolean, componentIndex: number) => {
                    if (verbose) {
                        console.log('componentIndex=', componentIndex);
                    }
                    return (
                        prev ||
                        this.deadLoopWithEdge(
                            adjacencyComponents[componentIndex],
                            this.edges[edgeIndex]
                        )
                    );
                },
                false
            );
            if (verbose) {
                console.log('edgeMakesLoops=', edgeMakesLoops);
            }
            if (!edgeMakesLoops) {
                const newComponents = this.connectComponentsUsingEdge(
                    adjacencyComponents,
                    foundComponents,
                    edgeIndex
                );
                if (verbose) {
                    console.log('newComponents=', newComponents);
                }
                adjacencyComponents = newComponents;
            }

            if (verbose) {
                console.log(
                    `after processing edge ${edgeIndex}: ${adjacencyComponents
                        .map((aComponent: number[]) => this.toPrintAComp(aComponent))
                        .join(' ')}`
                );
            }
        }
        return adjacencyComponents[0];
    };

    getPrettySmallestSkeleton = () => {
        return this.smallestSkeleton.map((edgeIndex: number) => this.edges[edgeIndex]);
    };

    toPrintAComp = (aComp: number[]) =>
        '[' + aComp.map((eIndex: number) => this.edges[eIndex].cost) + ']';

    static create(): Graph {
        return new Graph();
    }
}
