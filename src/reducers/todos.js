import { ADD_TODO, TOGGLE_TODO } from '../constants/index';

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state, todo(undefined, action) ];
    case TOGGLE_TODO:
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'uncompleted':
      return state.filter((t) => !t.completed);
    case 'completed':
      return state.filter((t) => t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};
