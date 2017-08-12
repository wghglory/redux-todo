import React from 'react';
import { toogleTodo } from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// present
const TodoList = ({ onClick, todos }) => {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id} onClick={() => onClick(t.id)} style={{ textDecoration: t.complete ? 'line-through' : 'none' }}>
          {t.text}
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
};

// container

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'uncompleted':
      return todos.filter((t) => !t.complete);
    case 'completed':
      return todos.filter((t) => t.complete);
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
