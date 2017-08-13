import { toggleTodo } from '../actions/index';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';

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

/* If store structure changes, have to remember to update filterTodos(state.todos), not good
 * getVisibleTodos selector should internally decide what it needs
 * since reducer knows the store structure, selector should be put in same place with reducer
 *  */
const mapStateToProps = (state, ownProps) => {
  return {
    // todos: filterTodos(state.todos, ownProps.filter)  // pass from container
    todos: getVisibleTodos(state, ownProps.match.params.filter || 'all') // pass from withRouter
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
export default withRouter(connect(mapStateToProps, { onClick: toggleTodo })(TodoList));
