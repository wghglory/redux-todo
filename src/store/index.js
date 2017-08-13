import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//https://github.com/zalmoxisus/redux-devtools-extension#usage

const persistedState = {
  todos: [
    {
      id: 0,
      text: 'Welcome Back!',
      completed: false
    }
  ]
};

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware() //pass ...middleware
    // other store enhancers if any
  )
);

export default store;
