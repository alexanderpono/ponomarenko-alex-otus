import React from 'react';
import { FlllPercent } from './FlllPercent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FlllPercent', () => {
    it('calls fill0() callback when 0% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <FlllPercent
                fill0={mockCallBack}
                fill25={dummy}
                fill50={dummy}
                fill75={dummy}
                fill100={dummy}
            />
        );
        userEvent.click(screen.getByText('clear'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill25() callback when 25% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <FlllPercent
                fill0={dummy}
                fill25={mockCallBack}
                fill50={dummy}
                fill75={dummy}
                fill100={dummy}
            />
        );
        userEvent.click(screen.getByText('25%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill50() callback when 50% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <FlllPercent
                fill0={dummy}
                fill25={dummy}
                fill50={mockCallBack}
                fill75={dummy}
                fill100={dummy}
            />
        );
        userEvent.click(screen.getByText('50%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill75() callback when 75% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <FlllPercent
                fill0={dummy}
                fill25={dummy}
                fill50={dummy}
                fill75={mockCallBack}
                fill100={dummy}
            />
        );
        userEvent.click(screen.getByText('75%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill100() callback when 100% is clicked', () => {
        const mockCallBack = jest.fn();
        const dummy = () => {};
        render(
            <FlllPercent
                fill0={dummy}
                fill25={dummy}
                fill50={dummy}
                fill75={dummy}
                fill100={mockCallBack}
            />
        );
        userEvent.click(screen.getByText('100%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
