import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ onClick, todos }) => {
  return <ul>{todos.map((t) => <Todo key={t.id} {...t} onClick={onClick} />)}</ul>;
};

TodoList.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default TodoList;
