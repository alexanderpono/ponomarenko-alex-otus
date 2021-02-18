import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { getUserSession } from '../../auth';

export interface Props {
    children: ReactNode;
    redirectPath: string;
}

export class AccessChecker extends React.Component<Props> {
    render() {
        const user = getUserSession();
        if (typeof user === 'string' && user !== '') {
            return (
                <>
                    <p>AccessChecker: access granted</p>
                    {this.props.children}
                </>
            );
        } else {
            return <Redirect to={this.props.redirectPath} />;
        }
    }
}
