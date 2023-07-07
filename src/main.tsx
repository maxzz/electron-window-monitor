import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');

//TODO: cancel build request if application is closed by user for doGetWindowManiAtom and doGetWindowControlsAtom atoms
 