import React from 'react';
import { SetFillPercent } from './SetFillPercent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FillPercent } from '@src/consts';

describe('FlllPercent', () => {
    it('calls fill() callback when 0% is clicked', () => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P25} />);
        userEvent.click(screen.getByText('clear'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill() callback when 25% is clicked', () => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P50} />);
        userEvent.click(screen.getByText('25%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill() callback when 50% is clicked', () => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P75} />);
        userEvent.click(screen.getByText('50%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill() callback when 75% is clicked', () => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P100} />);
        userEvent.click(screen.getByText('75%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls fill() callback when 100% is clicked', () => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P25} />);
        userEvent.click(screen.getByText('100%'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
