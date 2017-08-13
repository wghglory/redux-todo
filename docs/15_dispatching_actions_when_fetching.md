# 15. Dispatching Actions with the Fetched Data

[Video Link](https://egghead.io/lessons/javascript-redux-dispatching-actions-with-the-fetched-data?series=building-react-applications-with-idiomatic-redux)

Picking up where we left off inside of `TodoListContainer`, we will extract the common code between the lifecycle hooks into a separate method called `fetchData`, where the data we want to fetch only depends on the filter.

We call this method from the `componentDidMount()` hook in order to fetch the initial data. We will also call it whenever the `filter` changes inside the `componentDidUpdate` lifecycle hook.

**`TodoListContainer.js`**

```javascript
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
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
```

## Updating `fetchData()`

**We want the fetched todos to become a part of the Redux store's `state`, and the only way to get something into the state is to dispatch an action.**

We'll have it call the callback prop `receiveTodos` with the `todos` we just fetched.

```javascript
fetchData() {
  fetchTodos(this.props.filter).then(todos =>
    this.props.receiveTodos(todos)
  );
}
```

To make it available inside the component, we need to pass a function called `receiveTodos` that would be an action creator inside the second argument to `connect`. Since the name of the function matches the name of the callback prop, we can use the shorter ES6 Object property notation.

We also will import `receiveTodos` from the file where all other action creators are defined.

```javascript
// At the top of `TodoListContainer.js`
import { toggleTodo, receiveTodos } from '../actions'

...

// At the bottom of `TodoListContainer.js`
export default withRouter(connect(
  mapStateToProps,
  { onClick: toggleTodo, receiveTodos }
)(VisibleTodoList))
```

## Implementing `receiveTodos`

Now we need to actually implement `receiveTodos`.

Inside of our action creators file (`src/actions/index.js`) we creating a new export of a function `receiveTodos` that takes the server `response` as an argument and returns an object with the `type` of `'RECEIVE_TODOS'` and the `response` as a field.

### Inside `src/actions/todos.js`

The reducers handling this action will need to know which filter the response corresponds to, so we will add a `filter` as an argument to the `receiveTodos` action creator and we'll pass it as part of the action object.

```javascript
export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
});
```

### Updating the `VisibleTodoList` Component with `filter`

Back in `VisibleTodoList`, we need to update `fetchData` to pass the filter through the action creator.

We use the ES6 destructuring syntax to get the `filter` and `receiveTodos` from `props`. It's important that I destructure the `filter` right away, because by the time the callback fires, `this.props.filter` might have changed because the user might have navigated away.

**Inside `VisibleTodoList`**

```javascript
fetchData() {
  //{match: {…}, location: {…}, history: {…}, staticContext: undefined, todos: Array(0), filter...}
  /* after fetching data from database, we need fill it into store,
    this can be achieved only by dispatching an action !!! */
  const { filter, receiveTodos } = this.props;
  fetchTodos(filter).then((todos) => receiveTodos(filter, todos)); //dispatch receiveTodos action
}
```

---

### Writing Less Boilerplate (Simplify)

As we navigate through the app, the component fetches data in its lifecycle hooks and dispatches Redux actions when the data is ready. Now let's write less boilerplate.

We can start by replacing named imports with a namespace import. This means that any function exported from the actions file will be in the object called `actions`, which we will pass as a second argument to connect.

```javascript
// At the top of `TodoListContainer`

// Before: import { toggleTodo, receiveTodos } from '../actions'
import * as actions from '../actions' // After

// At the bottom of `TodoListContainer`
export default withRouter(connect(
  mapStateToProps,
  // Before: { onClick: toggleTodo, receiveTodos}
  actions // After
)(VisibleTodoList))
```

Inside of `VisibleTodoList`'s `render()` function, we'll destructure the `props`, because the `toggleTodo` action creator needs to be passed the `onClick` prop name, but the rest of the props can be passed as they are.

The `...rest` object now contains all the props other than `toggleTodo`, so we will pass them through. We will also pass `toggleTodo` as the `onClick` prop, because that's what the `TodoList` component expects.

```javascript
// Inside of `VisibleTodoList`
  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onClick={toggleTodo}
      />
    );
  }
}
```

[Recap at 3:30 in video](https://egghead.io/lessons/javascript-redux-dispatching-actions-with-the-fetched-data?series=building-react-applications-with-idiomatic-redux)