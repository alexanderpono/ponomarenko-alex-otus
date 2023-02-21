export class CristmasTree {
    toTree = (s: string): number[][] => {
        console.log('CristmasTree::toTree() s=', s);
        const treeLines = s
            .split('\n')
            .filter((line: string) => line.trim() !== '')
            .map((lineS: string) => lineS.split(' '))
            .map((lineArS: string[]): number[] =>
                lineArS.map((numberS: string) => parseInt(numberS))
            );
        return treeLines;
    };

    getMaxPathCost = (srcTree: number[][]): number => {
        console.log('CristmasTree::getMaxPathCost() srcTree=', srcTree);
        const tree = srcTree.map((line: number[]) => line.concat());
        console.log('CristmasTree::getMaxPathCost() tree=', tree);

        for (let y = tree.length - 2; y >= 0; y--) {
            for (let x = 0; x <= y; x++) {
                tree[y][x] = Math.max(tree[y + 1][x], tree[y + 1][x + 1]) + tree[y][x];
            }
            console.log('CristmasTree::getMaxPathCost() tree[y]=', tree[y]);
        }
        return tree[0][0];
    };
}
