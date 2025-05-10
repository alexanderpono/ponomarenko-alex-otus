import React from 'react';
import { DefineMode } from './DefineMode';
import { Mode } from '@src/consts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DefineMode', () => {
    it('calls setMode() callback when #btPlay is clicked', () => {
        const mockCallBack = jest.fn();
        render(<DefineMode setMode={mockCallBack} mode={Mode.PAUSE} />);
        userEvent.click(screen.getByText('play'));
        expect(mockCallBack).toBeCalledTimes(1);
    });

    it('calls setMode() callback when #btPause is clicked', () => {
        const mockCallBack = jest.fn();
        render(<DefineMode setMode={mockCallBack} mode={Mode.PAUSE} />);
        userEvent.click(screen.getByText('pause'));
        expect(mockCallBack).toBeCalledTimes(1);
    });
});
