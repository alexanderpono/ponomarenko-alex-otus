import React from 'react';
import { GraphFromLesson } from '@ui-src/components/GraphFromLesson';
import { Graph } from '@ui-src/Graph';

interface Props {
    graph: Graph;
}

export const App: React.FC<Props> = ({ graph }) => {
    return (
        <div>
            <div>UI-aa</div>
            <GraphFromLesson graph={graph} />
        </div>
    );
};
