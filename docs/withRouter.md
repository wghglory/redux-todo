# Using withRouter() to Inject the Params into Connected Components

Currently we are reading `match.params.filter` passed by the Router inside of the App component. We can access the `params` from there because the router injects the `params` prop into any Route handler component specified in the route configuration.

However, the App component itself doesn't use filter, it just passes it to TodoListContainer (`<TodoListContainer filter={props.match.params.filter || 'all'} />`), which uses it to calculate the currently visible Todos.

Passing the params from the top level of Route Handlers gets tedious, so we'll remove the filter prop. Instead, we'll find a way to read the current Router params in the `TodoListContainer` itself.

App.js:  Use `withRouter` so no need to pass filter. Feel `withRouter` to `match.params` is like `Provider` to `store`.

```diff
import React from 'react';
import AddTodo from '../containers/AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import Footer from './Footer';

export default () => (
  <div>
    <AddTodo />
-    <TodoListContainer filter={props.match.params.filter || 'all'} />
+    <TodoListContainer />
    <Footer />
  </div>
);
```

TodoListContainer.js

```diff
import { toggleTodo } from '../actions/index';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
+ import { withRouter } from 'react-router-dom';

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
-    todos: filterTodos(state.todos, ownProps.filter)  // pass from container
+    todos: filterTodos(state.todos, ownProps.match.params.filter || 'all') // pass from withRouter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

- export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
+ export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
```