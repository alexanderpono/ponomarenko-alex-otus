import React from 'react';
import { Button } from '@components/Button';
import styled from '@emotion/styled';
import { CAPTION_COLOR, frameCSS } from '@src/consts';
import { TableBg, TopControls } from '@components/common';

interface LoginFormProps {
    onChangeName: (name: string) => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onChangeName }) => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const value = (form.elements.namedItem('name') as HTMLInputElement)?.value;
        onChangeName(value);
    };

    return (
        <TableBg>
            <TopControls>
                <TopBox>
                    <H1>Game of life</H1>
                    <article>
                        <Form onSubmit={onSubmit}>
                            <Label htmlFor="name">Enter your name: </Label>
                            <Input id="name" name="name" required role="textbox" />
                            <Button type="submit">Start</Button>
                        </Form>
                    </article>
                </TopBox>
            </TopControls>
        </TableBg>
    );
};

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

const H1 = styled.h1`
    text-align: center;
    color: ${CAPTION_COLOR};
    font-size: 130%;
    line-height: 140%;
`;

const TopBox = styled.section`
    display: inline-block;
    width: 400px;
    ${frameCSS}
`;
