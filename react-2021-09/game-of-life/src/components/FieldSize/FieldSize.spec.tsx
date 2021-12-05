import React from 'react';
import { FieldSize } from './FieldSize';
import { LARGE_SIZE_CAPTION, MIDDLE_SIZE_CAPTION, Size, SMALL_SIZE_CAPTION } from '@src/consts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FieldSize', () => {
    it('calls setSmall() callback when #btSmall is clicked', () => {
        const mockCallBack = jest.fn();
        render(
            <FieldSize
                setSmall={mockCallBack}
                setMedium={() => {}}
                setLarge={() => {}}
                size={Size.MIDDLE}
            />
        );
        userEvent.click(screen.getByText(SMALL_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setMedium() callback when #btMedium is clicked', () => {
        const mockCallBack = jest.fn();
        render(
            <FieldSize
                setSmall={() => {}}
                setMedium={mockCallBack}
                setLarge={() => {}}
                size={Size.MIDDLE}
            />
        );
        userEvent.click(screen.getByText(MIDDLE_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setLarge() callback when #btLarge is clicked', () => {
        const mockCallBack = jest.fn();
        render(
            <FieldSize
                setSmall={() => {}}
                setMedium={() => {}}
                setLarge={mockCallBack}
                size={Size.MIDDLE}
            />
        );
        userEvent.click(screen.getByText(LARGE_SIZE_CAPTION));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
