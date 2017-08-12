import React from 'react';
import store from '../store';
import { addTodo } from '../actions/index';

const AddTodo = () => {
  let input;

  return (
    <div>
      <input type="text" ref={(ele) => (input = ele)} />
      <button
        onClick={() => {
          store.dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
