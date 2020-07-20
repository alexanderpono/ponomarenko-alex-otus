import { printNode, Node, getPrefixLine } from './lib';

describe('getPrefixLine', () => {
    const RESULT_0 = '';
    const RESULT_1 = '└───';
    const RESULT_2 = '    └───';
    const RESULT_3 = '        └───';
    it(`returns '${RESULT_0}' from level=0`, () => {
        expect(getPrefixLine(0)).toBe(RESULT_0);
    });
    it(`returns '${RESULT_1}' from level=1`, () => {
        expect(getPrefixLine(1)).toBe(RESULT_1);
    });

    it(`returns '${RESULT_2}' from level=2`, () => {
        expect(getPrefixLine(2)).toBe(RESULT_2);
    });

    it(`returns '${RESULT_3}' from level=3`, () => {
        expect(getPrefixLine(3)).toBe(RESULT_3);
    });
});

describe('printNode', () => {
    const NODE_A: Node = { name: 'a' };
    const RESULT_A = 'a\n';
    const NODE_A0B1: Node = { name: 'a', items: [{ name: 'b' }] };
    const RESULT_A0B1 = 'a\n└───b\n';
    const NODE_A0B1C1: Node = { name: 'a', items: [{ name: 'b' }, { name: 'c' }] };
    const RESULT_A0B1C1 = 'a\n└───b\n└───c\n';
    const NODE_A0B1C2: Node = { name: 'a', items: [{ name: 'b', items: [{ name: 'c' }] }] };
    const RESULT_A0B1C2 = 'a\n└───b\n    └───c\n';

    it('returns RESULT_A from NODE_A', () => {
        expect(printNode(0, NODE_A)).toBe(RESULT_A);
    });
    it('returns RESULT_A0B1 from NODE_A0B1', () => {
        expect(printNode(0, NODE_A0B1)).toBe(RESULT_A0B1);
    });

    it('returns RESULT_A0B1C1 from NODE_A0B1C1', () => {
        expect(printNode(0, NODE_A0B1C1)).toBe(RESULT_A0B1C1);
    });

    it('returns RESULT_A0B1C2 from NODE_A0B1C2', () => {
        expect(printNode(0, NODE_A0B1C2)).toBe(RESULT_A0B1C2);
    });
});
