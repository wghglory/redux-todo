import { createStore } from 'redux';
import reducer from '../reducers/index';

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next;
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares
    .slice()
    .reverse()
    .forEach((middleware) => (store.dispatch = middleware(store)(store.dispatch)));
};

const configureStore = () => {
  const store = createStore(reducer);
  const middlewares = [ promise ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

// By exporting configureStore instead of just store, we will be able to create as many store instances as we want for testing.
export default configureStore;
