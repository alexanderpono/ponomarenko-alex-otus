import { CristmasTree } from './CristmasTree';
import { GCD } from './GCD';
import { Islands } from './Islands';
import { Solve5x8 } from './Solve5x8';

class Program {
    main() {
        this.runCristmasTree();
        this.run5x8();
        this.runIslands();
        this.runGCD();
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

    runIslands = () => {
        console.log('\n================ runIslands ================');
        const islands = new Islands();
        const srcIslands = `
1 1 0 0
1 0 0 1
1 0 1 0
0 1 1 0
`;
        console.log(
            `runIslands result =`,
            islands.countIslands(islands.getMatrixFromString(srcIslands))
        );
    };

    runGCD = () => {
        console.log('\n================ JS-GCD ================');
        console.log(`GCD(1, 1) =`, GCD(1, 1));
        console.log(`GCD(10, 10) =`, GCD(10, 10));
        console.log(`GCD(12, 6) =`, GCD(12, 6));
        console.log(`GCD(36, 42) =`, GCD(36, 42));
        console.log(`GCD(75, 35) =`, GCD(75, 35));
    };

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
