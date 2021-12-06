import React from 'react';
import { SetFillPercent } from './SetFillPercent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FillPercent } from '@src/consts';

describe('FlllPercent', () => {
    it('calls fill0() callback when 0% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <SetFillPercent
                fill0={mockCallBack}
                fill25={dummy}
                fill50={dummy}
                fill75={dummy}
                fill100={dummy}
                curPercent={FillPercent.P25}
            />
        );
        userEvent.click(screen.getByText('clear'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill25() callback when 25% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <SetFillPercent
                fill0={dummy}
                fill25={mockCallBack}
                fill50={dummy}
                fill75={dummy}
                fill100={dummy}
                curPercent={FillPercent.P50}
            />
        );
        userEvent.click(screen.getByText('25%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill50() callback when 50% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <SetFillPercent
                fill0={dummy}
                fill25={dummy}
                fill50={mockCallBack}
                fill75={dummy}
                fill100={dummy}
                curPercent={FillPercent.P75}
            />
        );
        userEvent.click(screen.getByText('50%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill75() callback when 75% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <SetFillPercent
                fill0={dummy}
                fill25={dummy}
                fill50={dummy}
                fill75={mockCallBack}
                fill100={dummy}
                curPercent={FillPercent.P100}
            />
        );
        userEvent.click(screen.getByText('75%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill100() callback when 100% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <SetFillPercent
                fill0={dummy}
                fill25={dummy}
                fill50={dummy}
                fill75={dummy}
                fill100={mockCallBack}
                curPercent={FillPercent.P25}
            />
        );
        userEvent.click(screen.getByText('100%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
