import { ADD_TODO, TOGGLE_TODO } from '../constants/index';

let nextId = 0;
export const addTodo = (value) => {
  return {
    id: nextId++,
    type: ADD_TODO,
    text: value,
    completed: false
  };
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  };
};
