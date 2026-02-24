export const findNodeWithDataAttr = (node: HTMLElement, attr: string, maxDepth = 0): HTMLElement | null => {
    let target: HTMLElement = node;
    let depth = 0;
    while (target !== null && typeof target.dataset[attr] === 'undefined' && depth < maxDepth) {
        target = target.parentElement as HTMLElement;
        depth++;
    }

    if (target === null || typeof target.dataset[attr] === 'undefined') {
        console.error('DOM node is not found', node, attr, depth);
        return null;
    }

    return target;
};
