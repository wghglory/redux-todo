import { ADD_TODO, TOGGLE_TODO, RECEIVE_TODOS, REQUEST_TODOS } from '../constants/index';
import { v4 } from 'node-uuid';
import * as api from '../api';

export const requestTodos = (filter) => ({
  type: REQUEST_TODOS,
  filter
});

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

// dispatch this action whose response is a promise
const receiveTodos = (filter, response) => ({
  type: RECEIVE_TODOS,
  filter,
  response
});

// when fetchTodos action creator gets dispatched, it will call api, return a promise instead of a normal object
// after the promise is resolved, dispatch that resolved action object
export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then((response) => {
    dispatch(receiveTodos(filter, response));
  });
};
