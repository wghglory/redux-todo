# Colocating Selectors with reducers

[Video Link](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers?series=building-react-applications-with-idiomatic-redux)

Inside of `TodoListContainer`, the `mapStateToProps` function uses the `filterTodos` function, and it passes the slice of the `state` corresponding to the `todos`. However, if we ever change the state's structure, we have to remember to update this whole side.

In order to clean this up, we can move the `filterTodos` function out of the view layer and place it inside of the file that contains our `todos` reducer. We do this because the `todos` reducer knows the most about the internal structure of the state's `todos`.

## `TodoListContainer` Before

```jsx
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

// HOPE filterTodos(state, ) instead of filterTodos(state.todos, )
const mapStateToProps = (state, ownProps) => {
  return {
    todos: filterTodos(state.todos, ownProps.match.params.filter || 'all') // pass from withRouter
  };
};
```

## 1. Updating our Reducer

We are going to move our `filterTodos` implementation into the file with the reducers, and make it a named export.

The convention we follow is simple. The default export is always the reducer function, but any named export starting with `'get'` is a function that prepares the data to be displayed by the UI. We usually call these functions ***selectors*** because they select something from the current state.

In the reducers, the `state` argument corresponds to the state of this particular reducer, so we will follow the same convention for selectors. The `state` argument corresponds to the state of the exported reducer in this file.

### Inside `src/reducers/todos.js`

```jsx
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'uncompleted':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
```

## 2. Updating the Root Reducer

Inside of `TodoListContainer` we still depend on the state structure because we read the `todos` from the state, but the actual method of reading `todos` may change in the future.

With this in mind, we are going to update our root reducer with a named selector export. It will also be called `getVisibleTodos`, and like before it also accepts `state` and `filter`. However, in this case `state` corresponds to the state of the combined reducer.

Now we want to be able to call the `getVisibleTodos` function defined in the `todos` file alongside the reducer, but we can't use a named import because there is a function with exactly the same name in the scope.

To work around this, we will use the name space import syntax that puts all the exports on an object (called `fromTodos` in this case).

Now we can use `fromTodos.getVisibleTodos()` to call the function we defined in the other file, and pass the slice of the `state` corresponding to the `todos`.

### Root Reducer Update (`src/reducers/index.js`)

```diff
import { combineReducers } from 'redux';
+ import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

+ export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);
```

## 3. Updating `TodoListContainer`

Now we can go back to our `TodoListContainer` component and import `getVisibleTodos` from the root reducer file.

```diff
import { getVisibleTodos } from '../reducers'

const mapStateToProps = (state, ownProps) => {
  return {
-    todos: filterTodos(state.todos, ownProps.filter)  // pass from container
+    todos: getVisibleTodos(state, ownProps.match.params.filter || 'all') // pass from withRouter
  };
};
```

`getVisibleTodos` encapsulates all the knowledge about the application state shape, so we can just pass it the whole state of our application and it will figure out how to select the visible todos according to the logic described in our selector.