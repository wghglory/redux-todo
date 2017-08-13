import React from 'react';
import AddTodo from '../containers/AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import Footer from './Footer';

export default (props) => (
  <div>
    <AddTodo />
    <TodoListContainer filter={props.match.params.filter || 'all'} />
    <Footer />
  </div>
);
