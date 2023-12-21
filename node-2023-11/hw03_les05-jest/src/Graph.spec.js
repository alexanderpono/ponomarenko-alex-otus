const { Graph } = require('./Graph');
const { DIRECTORY } = require('./ports/FsInput');

describe('Graph', () => {
    describe('.draw()', () => {
        const txt1 = { name: '/1.txt', size: 0 };
        const dir1 = { name: '/dir1', size: DIRECTORY };
        const txt2 = { name: '/dir1/2.txt', size: 0 };
        test.each`
            sortedNodes     | expected
            ${[txt1]}       | ${['  └──1.txt']}
            ${[txt1, dir1]} | ${['  ├──1.txt', '  └──dir1']}
            ${[txt1, txt2]} | ${['  ├──1.txt', '  └─┬dir1', '    └──2.txt']}
        `('it returns $expected from $sortedNodes', ({ sortedNodes, expected }) => {
            const graph = new Graph();
            expect(graph.draw(sortedNodes)).toEqual(expected);
        });
    });

    describe('.fixGraph()', () => {
        test.each`
            lines                            | expected
            ${['  └──dir1', '    └──2.txt']} | ${['  └─┬dir1', '    └──2.txt']}
            ${['  └──dir1', '    ├──5.txt']} | ${['  └─┬dir1', '    ├──5.txt']}
            ${['  └──dir1', '  ├──dir2']}    | ${['  ├──dir1', '  ├──dir2']}
            ${['  └──dir1', '└──dir2']}      | ${['│ └──dir1', '└──dir2']}
            ${['  └──dir1', '│  dir2']}      | ${['│ └──dir1', '│  dir2']}
            ${['  └──dir1', '  │  dir2']}    | ${['  ├──dir1', '  │  dir2']}
        `('it returns $expected from $lines', ({ lines, expected }) => {
            const graph = new Graph();
            expect(graph.fixGraph(lines)).toEqual(expected);
        });
    });
});
