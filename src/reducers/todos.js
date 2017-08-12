import { ADD_TODO, TOOGLE_TODO } from '../constants/index';

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };
    case TOOGLE_TODO:
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
    case TOOGLE_TODO:
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

export default todos;
