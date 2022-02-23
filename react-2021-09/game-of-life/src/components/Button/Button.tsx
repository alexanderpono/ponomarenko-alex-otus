import styled from '@emotion/styled';

export interface ButtonProps {
    active?: boolean;
    disabled?: boolean;
}

export const Button = styled.button`
    background: ${(props: ButtonProps) =>
        props.disabled ? '#AAA' : props.active ? '#faa' : '#222'};
    color: ${(props: ButtonProps) => (props.active ? '#222' : '#ddd')};
    display: inline-block;
    height: 25px;
    margin: 0px 5px 0px 0px;
    font-size: 14px;
    border-radius: 5px;
    letter-spacing: 0px;
    border-style: outset;
    border-color: #777;
    border-width: 2px;
    padding: 1px 6px;
    box-sizing: border-box;
`;
