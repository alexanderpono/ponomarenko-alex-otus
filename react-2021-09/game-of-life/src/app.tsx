import React from 'react';
import { render } from 'react-dom';
import { AppStateManager } from './components/AppStateManager';
import { MyStorage } from './MyStorage';

const storage = new MyStorage();
render(<AppStateManager storage={storage} />, document.getElementById('app-target'));
