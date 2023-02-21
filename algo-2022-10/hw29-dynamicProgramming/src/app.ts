import { CristmasTree } from './CristmasTree';

class Program {
    main() {
        const treeProcessor = new CristmasTree();
        const srcTree = `
1
2 3
4 5 6
9 8 0 3
`;
        console.log(
            'getMaxPathCost() cost=',
            treeProcessor.getMaxPathCost(treeProcessor.toTree(srcTree))
        );
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
