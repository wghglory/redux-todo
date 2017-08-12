import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//https://github.com/zalmoxisus/redux-devtools-extension#usage
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    reducer,
    persistedState,
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

  return store;
};

// By exporting configureStore instead of just store, we will be able to create as many store instances as we want for testing.
export default configureStore;
