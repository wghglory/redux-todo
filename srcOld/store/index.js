import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
//https://github.com/zalmoxisus/redux-devtools-extension#usage

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware() //pass ...middleware
    // other store enhancers if any
  )
);

export default store;
