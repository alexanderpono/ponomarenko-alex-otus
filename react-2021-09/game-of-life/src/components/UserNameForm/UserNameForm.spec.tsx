import React from 'react';
import { UserNameForm } from './UserNameForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { str } from '@src/testFramework/lib/reducer';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

describe('UserNameForm', () => {
    it('calls onName() callback when submit is clicked and name is not empty', () => {
        const mockCallBack = jest.fn();
        const rndName = str();
        render(
            <BrowserRouter>
                <UserNameForm onName={mockCallBack} userName="" onLogout={() => {}} />
            </BrowserRouter>
        );
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('Start'));
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    it('sends a name into props.onName() callback when submit is clicked and name is not empty', () => {
        const mockCallBack = jest.fn();
        const rndName = str();
        render(
            <BrowserRouter>
                <UserNameForm onName={mockCallBack} userName="" onLogout={() => {}} />
            </BrowserRouter>
        );
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('Start'));
        expect(mockCallBack).toHaveBeenCalledWith(rndName);
    });
});
