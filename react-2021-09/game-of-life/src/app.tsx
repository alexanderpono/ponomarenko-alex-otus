import React from 'react';
import { render } from 'react-dom';
import { AppStateManager } from './components/AppStateManager';
import { MyStorage } from './MyStorage';
import { store } from '@src/store';

const storage = new MyStorage();
render(<AppStateManager storage={storage} store={store} />, document.getElementById('app-target'));
