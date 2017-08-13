import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
// import visibilityFilter from './visibilityFilter';  // not needed because of using react-router-dom

// convention: reducer name === state key
const todoApp = combineReducers({
  todos
  // visibilityFilter
});

export default todoApp;

// here, very easy to know state structure for `selectors` by looking at reducer's name(same with store key)
export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);
