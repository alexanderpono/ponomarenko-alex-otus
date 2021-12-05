import React from 'react';
import { Button } from '@components/Button';
import styled from '@emotion/styled';
import { CAPTION_COLOR } from '@src/consts';

interface Props {
    onName: (name: string) => void;
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
            <Form onSubmit={this.onSubmit}>
                <Label htmlFor="name">Enter your name: </Label>
                <Input id="name" name="name" required />
                <Button type="submit">submit</Button>
            </Form>
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

// background: ${(props: ButtonProps) => (props.active ? '#faa' : '#222')};
// color: ${(props: ButtonProps) => (props.active ? '#222' : '#ddd')};
// margin: 0px 5px 0px 0px;
