import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import sum from '@/test';
import { RouterProvider } from 'react-router-dom';
import Router from './router';
import "./theme.css"
import { Provider } from 'react-redux';
import store from './store';

const total = sum(1, 2)
console.log(total)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>

);
