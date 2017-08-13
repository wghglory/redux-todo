import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/index';

import { fetchTodos } from './api';
fetchTodos('all').then((todos) => console.log(todos));

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
