import React from 'react';
import { Button } from '@components/Button';
import styled from '@emotion/styled';
import { CAPTION_COLOR } from '@src/consts';

interface Props {
    onName: (name: string) => void;
    userName: string;
    onLogout: () => void;
}
export class UserNameForm extends React.Component<Props> {
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const value = (form.elements.namedItem('name') as HTMLInputElement)?.value;
        this.props.onName(value);
    };

    render() {
        return (
            <>
                {!this.props.userName && (
                    <Form onSubmit={this.onSubmit}>
                        <Label htmlFor="name">Enter your name: </Label>
                        <Input id="name" name="name" required role="textbox" />
                        <Button type="submit">Start</Button>
                    </Form>
                )}
                {this.props.userName && (
                    <LoggedInUser>
                        <Label>{this.props.userName} </Label>
                        <Button onClick={this.props.onLogout}>Logout</Button>
                    </LoggedInUser>
                )}
            </>
        );
    }
}

const Label = styled.label`
    color: ${CAPTION_COLOR};
    font-size: 14px;
`;

const Form = styled.form`
    padding-left: 20px;
    margin-bottom: 5px;
`;

const Input = styled.input`
    display: inline-block;
    height: 20px;
    font-size: 14px;
    border-radius: 5px;
    width: 130px;
    background: ${CAPTION_COLOR};
    padding-left: 5px;
    margin-right: 5px;
`;

const LoggedInUser = styled.div`
    text-align: center;
`;
