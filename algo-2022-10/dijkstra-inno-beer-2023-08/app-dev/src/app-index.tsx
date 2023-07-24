import React from 'react';
import { render } from 'react-dom';
import './app.css';
import { Slides } from './components/Slides';

console.log('app!');

render([<Slides />], document.getElementById('abstract-graph'));
