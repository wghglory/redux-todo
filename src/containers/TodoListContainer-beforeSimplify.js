import { toggleTodo, receiveTodos } from '../actions/index';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';
import PropTypes from 'prop-types';

/* // moved to reducer file
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
*/

// add new class because we need fetchTodo Async call
import React, { Component } from 'react';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    //{match: {…}, location: {…}, history: {…}, staticContext: undefined, todos: Array(0), filter...}
    /* after fetching data from database, we need fill it into store,
     this can be achieved only by dispatching an action !!! */
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then((todos) => receiveTodos(filter, todos)); //dispatch receiveTodos action
    // todo: reducer implementation for receiveTodos
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  receiveTodos: PropTypes.func.isRequired
};

/* If store structure changes, have to remember to update filterTodos(state.todos), not good
 * getVisibleTodos selector should internally decide what it needs
 * since reducer knows the store structure, selector should be put in same place with reducer
 *  */
const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    // todos: filterTodos(state.todos, ownProps.filter)  // pass from container
    todos: getVisibleTodos(state, filter), // pass from withRouter
    filter
  };
};

/* 
// Using mapDispatchToProps() Shorthand Notation: { onClick: toggleTodo }
// Only if the arguments of callback and actionCreator are exactly the same, we can use mapDispatchToProps shorthand notation
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
}; */

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
export default withRouter(connect(mapStateToProps, { onClick: toggleTodo, receiveTodos })(VisibleTodoList));
