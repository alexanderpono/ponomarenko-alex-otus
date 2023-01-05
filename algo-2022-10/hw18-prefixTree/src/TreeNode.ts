const A = 96;
const MIN_CODE = ' '.charCodeAt(0);

export class TreeNode {
    child: TreeNode[];
    isEnd: boolean;

    constructor() {
        this.child = new Array(A).fill(null);
        this.isEnd = false;
    }

    getIndex = (char: string) => {
        const index = char.charCodeAt(0) - MIN_CODE;
        return index;
    };

    next = (c: string): TreeNode => {
        const index = this.getIndex(c);
        if (!this.exists(c)) {
            this.child[index] = new TreeNode();
        }
        return this.child[index];
    };

    exists(c: string) {
        const index = this.getIndex(c);
        return this.child[index] !== null;
    }

    static create = (): TreeNode => {
        return new TreeNode();
    };
}
