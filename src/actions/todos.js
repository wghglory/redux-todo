import { ADD_TODO, TOGGLE_TODO } from '../constants/index';
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
