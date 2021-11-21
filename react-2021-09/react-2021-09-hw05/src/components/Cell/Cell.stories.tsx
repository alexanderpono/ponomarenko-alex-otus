import React from 'react';
import { action } from '@storybook/addon-actions';
import { Cell } from './Cell';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'Cell',
    component: Cell,
    decorators: [withKnobs],
};

export const Static = () => {
    return (
        <Cell
            num={number('num', 3)}
            showContent={boolean('showContent', true)}
            onClick={action('clicked')}
            caption={text('caption', 'cc')}
            isRight={boolean('isRight', true)}
            isBottom={boolean('isBottom', true)}
        />
    );
};

export const Dynamic: React.FC<{}> = () => {
    const [showContent, setShowContent] = React.useState(true);
    const num = number('num', 3);
    const onClick = (num: number) => {
        setShowContent(!showContent);
    };

    return (
        <Cell
            num={num}
            showContent={showContent}
            onClick={onClick}
            caption={text('caption', 'X')}
            isRight={boolean('isRight', true)}
            isBottom={boolean('isBottom', true)}
        />
    );
};
