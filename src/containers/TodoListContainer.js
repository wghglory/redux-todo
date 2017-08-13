import * as actions from '../actions/index';
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
    const { filter, fetchTodos } = this.props; // * actions from '../actions/index' (mapDispatchToProps: actions)
    fetchTodos(filter); //dispatch receiveTodos action internally
    /* Note: here, fetchTodos comes from connect container's actions.
       it's a mapDispatchToProps's shorthand.
       When it gets called, it will dispatch fetchTodos action.
       Then that action internally calls api to fetch data,
       Then internally calls receivesTodos action passing the promise.

       const mapDispatchToProps = (dispatch, ownProps) => {
        return {
          fetchTodos: (filter) => {
            dispatch(fetchTodos(filter));
          }
        };
    };*/
    // todo: reducer implementation for receiveTodos
  }

  render() {
    console.log(this.props);
    /**
      addTodo:ƒ ()
      filter:"completed"
      history:{length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
      location:{pathname: "/completed", search: "", hash: "", state: undefined, key: "0zq0n7"}
      match:{path: "/:filter?", url: "/completed", isExact: true, params: {…}}
      receiveTodos:ƒ ()
      setVisibilityFilter:ƒ ()
      staticContext:undefined
      todos:[]
      toggleTodo:ƒ ()
     */
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onClick={toggleTodo} />;
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired
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
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
