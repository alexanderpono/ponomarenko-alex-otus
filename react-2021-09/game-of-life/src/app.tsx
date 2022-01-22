import React from 'react';
import { render } from 'react-dom';
import { AppStateManager } from './components/AppStateManager';
import { StorageService } from './StorageService';
import { store } from '@src/store';

const storage = new StorageService();
render(<AppStateManager storage={storage} store={store} />, document.getElementById('app-target'));
