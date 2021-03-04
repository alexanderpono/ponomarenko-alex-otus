import React from 'react';
import { Link } from 'react-router-dom';

export function Menu() {
    return (
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
    );
}
