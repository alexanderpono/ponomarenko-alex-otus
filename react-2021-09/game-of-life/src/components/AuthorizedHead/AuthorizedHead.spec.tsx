import React from 'react';
import { AuthorizedHead } from './AuthorizedHead';
import { num, str } from '@src/testFramework/lib/reducer';
import { render, screen } from '@testing-library/react';

describe('AuthorizedHead', () => {
    it('renders without class "disabled" if props.disabled!=true', () => {
        const rndCounter = num();
        render(<AuthorizedHead onLogout={() => {}} userName={str()} counter={rndCounter} />);

        expect(screen.queryByText(rndCounter)).toBeInTheDocument();
    });
});
