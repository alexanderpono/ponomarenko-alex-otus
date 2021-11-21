import React from 'react';
import { Button } from '@components/Button';

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
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name">Введите имя: </label>
                <input id="name" name="name" required />
                <Button type="submit">submit</Button>
            </form>
        );
    }
}
