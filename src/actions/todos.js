import { ADD_TODO, TOOGLE_TODO } from '../constants/index';

let nextId = 0;
export const addTodo = (value) => {
  return {
    id: nextId++,
    type: ADD_TODO,
    text: value,
    completed: false
  };
};

export const toogleTodo = (id) => {
  return {
    type: TOOGLE_TODO,
    id
  };
};
