import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

export const App = () =>
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>;
