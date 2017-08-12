import { combineReducers } from 'redux';
import todos from './todos';
// import visibilityFilter from './visibilityFilter';  // not needed because of using react-router-dom

// convention: reducer name === state key
const todoApp = combineReducers({
  todos
  // visibilityFilter
});

export default todoApp;
