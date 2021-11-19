import React from 'react';

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
                <button type="submit">submit</button>
            </form>
        );
    }
}
