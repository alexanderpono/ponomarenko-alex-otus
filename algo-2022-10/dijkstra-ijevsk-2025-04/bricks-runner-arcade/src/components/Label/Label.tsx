import React from 'react';

export function Label(val: boolean, setter: () => void, id: string, caption: string) {
    return (
        <label htmlFor={id} className="checkUI">
            <span className="checkBox">
                <input type="checkbox" checked={val} onChange={setter} id={id} />
                <b></b>
            </span>
            <span className="checkText">{caption}</span>
        </label>
    );
}
