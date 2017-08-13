import { toggleTodo } from '../actions/index';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { withRouter } from 'react-router-dom';

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
    todos: filterTodos(state.todos, ownProps.match.params.filter || 'all')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
