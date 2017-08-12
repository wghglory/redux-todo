import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//https://github.com/zalmoxisus/redux-devtools-extension#usage
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

// not recommended since it would become more difficult to test and change your reducers later.
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
  // persistedState,
  loadState(),
  composeWithDevTools(
    applyMiddleware() //pass ...middleware
    // other store enhancers if any
  )
);

// throttle will make sure saveState won't be called more than 1 second. we don't want this expensive function executes too frequently
store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000)
);

export default store;
