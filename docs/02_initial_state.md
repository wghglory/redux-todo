# 02. Supplying the Initial State

[Video Link](https://egghead.io/lessons/javascript-redux-supplying-the-initial-state)

I'm not talking about initial state in reducers. Sometimes we want to load data into the store synchronously before the application starts.

For example, there may be Todos left from the previous session.

Redux lets us pass a `persistedState` as the second argument to the `createStore` function:

```diff
+ const persistedState = {
+   todos: [{
+     id: 0,
+     text: 'Welcome Back!',
+     completed: false
+   }]
+ }

const store = createStore(
  todoApp,
+  persistedState
)
```

**When passing in a `persistedState`, it will overwrite the default values set in the reducer as applicable.** In this example, we've provided `todos` with an array, but since we didn't specify a value for `visibilityFilter`, the default `'SHOW_ALL'` will be used.

Since the `persistedState` that we provided as a second argument to `createStore()` was obtained from Redux itself, it doesn't break encapsulation of reducers.

**It may be tempting to supply an initial state for your entire store inside of `persistedState`, but it is not recommended. If you were to do this, it would become more difficult to test and change your reducers later.**