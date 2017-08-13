import { ADD_TODO, TOGGLE_TODO } from '../constants/index';
import { combineReducers } from 'redux';
import todo from './todo';

/* 
// when we only have 1 array of todos
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state, todo(undefined, action) ];
    case TOGGLE_TODO:
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
}; */

/* state structure for byId
todos:{
  byId: {
    "9329ufdsaf": { id: '9329ufdsaf', text: 'hello', completed: false, },
    "13213123df": { id: '13213123df', text: 'world', completed: true, },
    "445524ffad": { id: '445524ffad', text: 'yaya', completed: false, },
  }
}
 */
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    default:
      return state;
  }
};

/**
 * state structure: todos: { allIds: [ '213123', '123213', '123231' ] }
 * @param {array of ids} state 
 * @param {*} action 
 */
const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state, action.id ];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});

export default todos;

// create an array of todos. Note convention: reducerName = state.key
const getAllTodos = (state) => state.allIds.map((id) => state.byId[id]);

/**
 * 
 * @param {} state : just state of redux, no any guess like array or object
 * @param {*} filter 
 */
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state); // array of all todos
  switch (filter) {
    case 'all':
      return allTodos;
    case 'uncompleted':
      return allTodos.filter((t) => !t.completed);
    case 'completed':
      return allTodos.filter((t) => t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};
