import { ADD_TODO, TOOGLE_TODO, SET_FILTER } from "../constants/index";

let nextId = 0;
export const addNewTodo = value => {
  return {
    id: nextId++,
    type: ADD_TODO,
    text: value,
  };
};

export const toogleTodo = id => {
  return {
    type: TOOGLE_TODO,
    id,
  };
};

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  };
};
