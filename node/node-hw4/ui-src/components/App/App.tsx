import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import { AccessChecker } from '../AccessChecker/AccessChecker';
import { LoginPage } from '../LoginPage/LoginPage';
import { UsersPage } from '../UsersPage';

export const App: React.FC<Record<string, unknown>> = () => (
    <Router>
        <nav>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/main">Main</Link>
                </li>
                <li>
                    <Link to="/course">Course</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/mycourses">MyCourses</Link>
                </li>
                <li>
                    <Link to="/mycourse">MyCourse</Link>
                </li>
            </ul>
        </nav>
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/main">
                <AccessChecker redirectPath="/login">
                    <div>main</div>
                </AccessChecker>
            </Route>
            <Route path="/course">
                <div>course</div>
            </Route>
            <Route path="/users">
                <AccessChecker redirectPath="/login">
                    <UsersPage />
                </AccessChecker>
            </Route>
            <Route path="/mycourses">
                <div>mycourses</div>
            </Route>
            <Route path="/mycourse">
                <div>mycourse</div>
            </Route>
            <Route path="*">
                <Redirect to="/main" />
            </Route>
        </Switch>
    </Router>
);
