import styled from '@emotion/styled';

export interface ButtonProps {
    active?: boolean;
}

export const Button = styled.button`
    background: ${(props: ButtonProps) => (props.active ? '#faa' : '#222')};
    color: ${(props: ButtonProps) => (props.active ? '#222' : '#ddd')};
    display: inline-block;
    height: 25px;
    margin: 0px 5px 0px 0px;
    font-size: 14px;
    border-radius: 5px;
`;
