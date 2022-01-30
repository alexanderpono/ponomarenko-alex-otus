import React from 'react';
import { FieldSize } from './FieldSize';
import { LARGE_SIZE_CAPTION, MIDDLE_SIZE_CAPTION, Size, SMALL_SIZE_CAPTION } from '@src/consts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FieldSize', () => {
    it('calls setSize() callback when #btSmall is clicked', () => {
        const mockCallBack = jest.fn();
        render(<FieldSize setSize={mockCallBack} size={Size.MIDDLE} />);
        userEvent.click(screen.getByText(SMALL_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setSize() callback when #btMedium is clicked', () => {
        const mockCallBack = jest.fn();
        render(<FieldSize setSize={mockCallBack} size={Size.MIDDLE} />);
        userEvent.click(screen.getByText(MIDDLE_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setSize() callback when #btLarge is clicked', () => {
        const mockCallBack = jest.fn();
        render(<FieldSize setSize={mockCallBack} size={Size.MIDDLE} />);
        userEvent.click(screen.getByText(LARGE_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
