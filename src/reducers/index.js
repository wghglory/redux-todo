import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// convention: reducer name === state key
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;
