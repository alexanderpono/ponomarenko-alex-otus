import { sum } from './sum';
import React from 'react';
import { render } from 'react-dom';
import { AppStateController } from './components';

console.log('2 + 3=', sum(2, 3));

render(<AppStateController />, document.getElementById('app-target'));
