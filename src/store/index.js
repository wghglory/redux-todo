import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//https://github.com/zalmoxisus/redux-devtools-extension#usage
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

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

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

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
