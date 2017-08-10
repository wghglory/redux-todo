import React from "react";
import { store } from "../store";
import { addNewTodo } from "../actions";

export const AddTodo = () => {
  let input;

  return (
    <div>
      <input type="text" ref={ele => (input = ele)} />
      <button onClick={store.dispatch(addNewTodo(input.value))}>Add</button>
    </div>
  );
};
