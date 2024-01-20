const HOR = '─';
const CORNER = '└';
const HOR_DOWN = '┬';
const VERT_RIGHT = '├';
const VERT = '│';
const SPACE = ' ';
const TAB_WIDTH = 2;

const repeat = (char, count) => new Array(count).fill(char).join('');
const drawNode = (myDepth, name) => {
    const spaces = repeat(' ', myDepth * TAB_WIDTH);
    const line = '└' + repeat(HOR, TAB_WIDTH);
    return `${spaces}${line}${name}`;
};
const dir = (dirName) => `${dirName}`;

class Graph {
    draw(sortedNodes) {
        const treeLines = this.preDraw(sortedNodes);

        const prettyLines = this.fixGraph(treeLines);

        return prettyLines;
    }

    preDraw(sortedNodes) {
        let previousParent = '';
        const treeLines = [];
        sortedNodes.forEach((node) => {
            const depth = node.name.split('/').length - 1;
            const parentPath = node.name.split('/').slice(0, -1);
            const parent = parentPath.join('/');
            if (parent !== previousParent) {
                previousParent = parent;
                treeLines.push(drawNode(depth - 1, dir(parentPath.pop())));
            }

            const nodeName = node.name.split('/').pop();
            const line = drawNode(depth, nodeName);
            treeLines.push(line);
        });

        return treeLines;
    }

    fixGraph = (lines) => {
        const treeLines = [...lines];
        for (let i = treeLines.length - 2; i >= 0; i--) {
            const curLine = treeLines[i].split('');
            const nextLine = treeLines[i + 1].split('');

            for (let x = 0; x < curLine.length; x++) {
                if (curLine[x] === HOR && nextLine[x] === CORNER) {
                    curLine[x] = HOR_DOWN;
                }
                if (curLine[x] === HOR && nextLine[x] === VERT_RIGHT) {
                    curLine[x] = HOR_DOWN;
                }
                if (curLine[x] === CORNER && nextLine[x] === CORNER) {
                    curLine[x] = VERT_RIGHT;
                }
                if (curLine[x] === CORNER && nextLine[x] === VERT_RIGHT) {
                    curLine[x] = VERT_RIGHT;
                }
                if (curLine[x] === SPACE && nextLine[x] === CORNER) {
                    curLine[x] = VERT;
                }
                if (curLine[x] === SPACE && nextLine[x] === VERT) {
                    curLine[x] = VERT;
                }
                if (curLine[x] === CORNER && nextLine[x] === VERT) {
                    curLine[x] = VERT_RIGHT;
                }
            }
            treeLines[i] = curLine.join('');
        }
        return treeLines;
    };
}

module.exports = {
    Graph,
    dir
};
