import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { store } from './app/store';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('root element not found');
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
