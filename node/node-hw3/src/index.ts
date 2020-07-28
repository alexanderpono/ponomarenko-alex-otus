import { Node, printNode } from './lib';

const tree: Node = {
    name: '1',
    items: [
        {
            name: '2',
            items: [{ name: '3' }, { name: '4' }]
        },
        {
            name: '5',
            items: [{ name: '6' }]
        }
    ]
};

console.log(printNode(0, tree));
