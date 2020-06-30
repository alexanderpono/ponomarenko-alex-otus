export interface Node {
    name: string;
    items?: Node[];
}

export function getPrefixLine(level: number): string {
    const UP = '└';
    const LINE = '───';
    let result = '';
    if (level <= 0) {
        return result;
    }

    result += '    '.repeat(level - 1);
    result += UP;
    result += LINE;
    return result;
}

export function printNode(level: number, node: Node): string {
    let result = '' + getPrefixLine(level) + node.name + '\n';
    const keys = Object.keys(node);
    if (keys.indexOf('items') >= 0) {
        const children = node.items;
        children?.forEach(function (item: Node) {
            result += printNode(level + 1, item);
        });
    }

    return result;
}
