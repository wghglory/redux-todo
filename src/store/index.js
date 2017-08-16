import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
// import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

const configureStore = () => {
  // const middlewares = [ promise ];
  const middlewares = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(reducer, applyMiddleware(...middlewares));
};

export default configureStore;
