import React from 'react';
import { SetFillPercent } from './SetFillPercent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FillPercent } from '@src/consts';

describe('FlllPercent - parameterized tests', () => {
    test.each`
        curPercent          | clickAt
        ${FillPercent.P25}  | ${'0%'}
        ${FillPercent.P50}  | ${'25%'}
        ${FillPercent.P75}  | ${'50%'}
        ${FillPercent.P100} | ${'75%'}
        ${FillPercent.P25}  | ${'100%'}
    `('calls fill() callback when $clickAt is clicked', ({ clickAt, sizeId }) => {
        const mockCallBack = jest.fn();
        render(<SetFillPercent fill={mockCallBack} curPercent={FillPercent.P25} />);
        userEvent.click(screen.getByText('clear'));
        expect(mockCallBack).toBeCalledTimes(1);
    });
});
