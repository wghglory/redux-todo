import React from 'react';
import { toogleTodo } from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Todo from './Todo';

// present
const TodoList = ({ onClick, todos }) => {
  return <ul>{todos.map((t) => <Todo key={t.id} {...t} onClick={onClick} />)}</ul>;
};

TodoList.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

// container
const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'uncompleted':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: filterTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(toogleTodo(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
