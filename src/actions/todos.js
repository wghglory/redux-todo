import { ADD_TODO, TOGGLE_TODO, RECEIVE_TODOS } from '../constants/index';
import { v4 } from 'node-uuid';

export const addTodo = (value) => ({
  id: v4(),
  type: ADD_TODO,
  text: value,
  completed: false
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});

export const receiveTodos = (filter, response) => ({
  type: RECEIVE_TODOS,
  filter,
  response
});
