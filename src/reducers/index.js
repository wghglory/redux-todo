import { ADD_TODO, TOOGLE_TODO, SET_FILTER } from "../constants/index";
import { combineReducer } from "react-redux";

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        name: action.name,
        complete: false,
      };
    case TOOGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        complete: !state.complete,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todo(undefined, action)];
    case TOOGLE_TODO:
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "ShowAll", action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

// convention: reducer name === state key
export default combineReducer({ todos, visibilityFilter });
