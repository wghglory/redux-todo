import { RECEIVE_TODOS } from '../constants/index';
import { combineReducers } from 'redux';

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
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_TODOS:
      action.response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const uncompletedIds = (state = [], action) => {
  if (action.filter !== 'uncompleted') {
    return state;
  }
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  uncompleted: uncompletedIds,
  completed: completedIds
});

const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map((id) => state.byId[id]);
};
