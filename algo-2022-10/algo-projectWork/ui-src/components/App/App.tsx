import React from 'react';
import { GraphFromLesson } from '@ui-src/components/GraphFromLesson';
import { Graph } from '@ui-src/Graph';
import { LRGameField } from '@ui-src/components/LRGameField';
import { GameField } from '@ui-src/GameField';

interface Props {
    graph: Graph;
    field: GameField;
}

export const App: React.FC<Props> = ({ graph, field }) => {
    return (
        <div>
            <GraphFromLesson graph={graph} />
            <LRGameField field={field} />
        </div>
    );
};
