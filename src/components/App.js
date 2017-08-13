import React from 'react';
import AddTodo from '../containers/AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import Footer from './Footer';

export default () => (
  <div>
    <AddTodo />
    {/* Use withRouter below instead of <TodoListContainer filter={props.match.params.filter || 'all'} />*/}
    <TodoListContainer />
    <Footer />
  </div>
);
