import { ADD_TODO, TOGGLE_TODO } from '../constants/index';
import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers/createList';

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then((response) => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response
    });
  });

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});

// when fetchTodos action creator gets dispatched, it will call api, return a promise instead of a normal object
// after the promise is resolved, dispatch that resolved action object
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    (response) => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response
      });
    },
    (error) => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      });
    }
  );
};
