import React from 'react';
import { DefineSpeed } from './DefineSpeed';
import { Speed } from '@src/consts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DefineSpeed', () => {
    it('calls setSpeed() callback when #btSlow is clicked', () => {
        const mockCallBack = jest.fn();
        render(<DefineSpeed setSpeed={mockCallBack} speed={Speed.SLOW} />);
        userEvent.click(screen.getByText('slow'));
        expect(mockCallBack).toBeCalledTimes(1);
    });

    it('calls setSpeed() callback when #btMedium is clicked', () => {
        const mockCallBack = jest.fn();
        render(<DefineSpeed setSpeed={mockCallBack} speed={Speed.SLOW} />);
        userEvent.click(screen.getByText('medium'));
        expect(mockCallBack).toBeCalledTimes(1);
    });

    it('calls setSpeed() callback when #btFast is clicked', () => {
        const mockCallBack = jest.fn();
        render(<DefineSpeed setSpeed={mockCallBack} speed={Speed.SLOW} />);
        userEvent.click(screen.getByText('fast'));
        expect(mockCallBack).toBeCalledTimes(1);
    });
});
