import { sum } from './sum';
import React from 'react';
import { render } from 'react-dom';
import { AppFC } from './components';

console.log('2 + 3=', sum(2, 3));

render(<AppFC />, document.getElementById('app-target'));
