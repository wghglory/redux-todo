# 13. Adding a Fake Backend to the project

[Video Link](https://egghead.io/lessons/javascript-redux-adding-a-fake-backend-to-the-project)

In the next lessons, we won't be dealing with persistence anymore. Instead, we're going to add some asynchronous fetching to the app.

We are now removing all the code related to the `localStorage` persistence, and deleting the `localStorage.js` file as well, because a new module has been added that implements a fake remote API.

store/index.js

```diff
import reducer from '../reducers/index';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//https://github.com/zalmoxisus/redux-devtools-extension#usage
- // import { loadState, saveState } from './localStorage';
- // import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
-  // const persistedState = loadState();
  const store = createStore(
    reducer,
-    // persistedState,
    composeWithDevTools(
      applyMiddleware() //pass ...middleware
      // other store enhancers if any
    )
  );

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

-  /*   // throttle will make sure saveState won't be called more than 1 second. we don't want this expensive function executes too frequently
-  store.subscribe(
-    throttle(() => {
-      saveState({
-        todos: store.getState().todos
-      });
-    }, 1000)
-  ); */

  return store;
};

// By exporting configureStore instead of just store, we will be able to create as many store instances as we want for testing.
export default configureStore;
```

All of the todos are kept in memory, and an artificial delay has been added. We also have methods that return Promises just like a real API implementation.

**Create `src/api/index.js`**

```javascript
import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling REST server.

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'hey',
      completed: true
    },
    {
      id: v4(),
      text: 'ho',
      completed: true
    },
    {
      id: v4(),
      text: 'let’s go',
      completed: false
    }
  ]
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'uncompleted':
        return fakeDatabase.todos.filter((t) => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter((t) => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
```

Testing it:

**`index.js`**

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/index';

+ import { fetchTodos } from './api';
+ fetchTodos('all').then((todos) => console.log(todos));

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
```

Should see all todos in console after 500ms.

The fake API waits for half a second to simulate the network connection, and then resolves the promise to an array of todos that we will treat as if they were retrieved from a remote server.