import React from 'react';
import { Button } from './Button';
import renderer from 'react-test-renderer';

interface RenderResult {
    type: string;
    children: { type: string }[];
    props: Record<string, string>;
}

describe('Button', () => {
    it('renders without class "disabled" if props.disabled!=true', () => {
        const snapshot = renderer
            .create(<Button onClick={() => {}}>aaa</Button>)
            .toJSON() as RenderResult;

        expect(snapshot.props.className.split(' ').indexOf('disabled')).toEqual(-1);
    });

    it('renders with class "disabled" if Boolean(props.disabled)==true', () => {
        const snapshot = renderer
            .create(
                <Button onClick={() => {}} disabled>
                    aaa
                </Button>
            )
            .toJSON() as RenderResult;

        expect(snapshot.props.className.split(' ')).toEqual(expect.arrayContaining(['disabled']));
    });

    it('renders with class "active" if props.active==true', () => {
        const snapshot = renderer
            .create(
                <Button onClick={() => {}} active={true}>
                    aaa
                </Button>
            )
            .toJSON() as RenderResult;

        expect(snapshot.props.className.split(' ')).toEqual(expect.arrayContaining(['active']));
    });
});
