import React from 'react';
import AddTodo from '../containers/AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import Footer from './Footer';

export default () => (
  <div>
    <AddTodo />
    <TodoListContainer />
    <Footer />
  </div>
);
