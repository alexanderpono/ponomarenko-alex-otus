import { sum } from './sum';
import React from 'react';
import { render } from 'react-dom';

console.log('2 + 3=', sum(2, 3));

render(<h1>React here!</h1>, document.getElementById('app-target'));
