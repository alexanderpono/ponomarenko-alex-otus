import { CristmasTree } from './CristmasTree';
import { Solve5x8 } from './Solve5x8';

class Program {
    main() {
        this.runCristmasTree();
        this.run5x8();
    }

    runCristmasTree = () => {
        console.log('================ runCristmasTree ================');
        const treeProcessor = new CristmasTree();
        const srcTree = `
1
2 3
4 5 6
9 8 0 3
`;
        console.log(
            'runCristmasTree max cost=',
            treeProcessor.getMaxPathCost(treeProcessor.toTree(srcTree))
        );
    };

    run5x8 = () => {
        console.log('\n================ run5x8 ================');
        const solve5x8 = new Solve5x8();
        const N = 8;
        console.log(
            `run5x8 count of 5/8(no555/no888) numbers of length(${N})=`,
            solve5x8.countNumbers(solve5x8.getResultsTable(solve5x8.getWorkTable(N)), N)
        );
    };

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
