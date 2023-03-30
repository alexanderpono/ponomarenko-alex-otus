import React from 'react';
import { GraphUI } from '@ui-src/components/GraphUI';
import { Graph } from '@ui-src/Graph';

interface Props {
    graph: Graph;
}

export const App: React.FC<Props> = ({ graph }) => {
    return (
        <div>
            <div>UI-aa</div>
            <canvas height="440" width="670" id="first_example">
                Пример
            </canvas>
            <GraphUI graph={graph} />
        </div>
    );
};
