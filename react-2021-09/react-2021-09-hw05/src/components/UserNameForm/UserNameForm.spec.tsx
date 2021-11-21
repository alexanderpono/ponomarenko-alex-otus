import React from 'react';
import { UserNameForm } from './UserNameForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { str } from '@src/testFramework/lib/reducer';

describe('UserNameForm', () => {
    it('calls onName() callback when submit is clicked and name is not empty', () => {
        const mockCallBack = jest.fn();
        const rndName = str();
        render(<UserNameForm onName={mockCallBack} />);
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('submit'));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('sends a name into props.onName() callback when submit is clicked and name is not empty', () => {
        const mockCallBack = jest.fn();
        const rndName = str();
        render(<UserNameForm onName={mockCallBack} />);
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('submit'));
        expect(mockCallBack.mock.calls[0][0]).toEqual(rndName);
    });
});
