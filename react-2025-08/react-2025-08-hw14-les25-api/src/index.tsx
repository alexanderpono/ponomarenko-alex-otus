import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { AppController } from './app/AppController';

const ctrl = new AppController();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={getStore()}>
            <App ctrl={ctrl} />
        </Provider>
    </React.StrictMode>
);
