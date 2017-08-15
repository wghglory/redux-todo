# 19. Updating the State with the Fetched Data

[Video Link](https://egghead.io/lessons/javascript-redux-updating-the-state-with-the-fetched-data#/tab-transcript)

In the current implementation of `getVisibleTodos` inside of `todos.js`, we keep all todos in memory. We have an array of all `id`s ever and we get the array of todos that we can filter according to the filter passed from React Router.

**Current `getVisibleTodos`**

```javascript
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'uncompleted':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
```

Current state:

```json
{
  "todos": { "allIds": [ 1, 2, 3, 4, 666 ] }
}
```

However, this only works correctly if all the data from the server is already available in the client, which is usually not the case with applications that fetch something. If we have thousands of todos on the server, it would be impractical to fetch them all and filter them on the client.

## Refactoring `getVisibleTodos`

Rather than keep one big list of `id`s, we'll keep a list of `id`s for every filter's tab so that they can be stored separately and filled according to the actions with the fetched data.

We'll remove the `getAllTodos` selector because we won't have access to `allTodos`. We also don't need to filter on the client anymore because we will use the list of todos provided by the server. This means we can remove our `switch` statement from the current implementation.

Instead of reading from `state.allIds`, we will read the IDs from `state.IdsByFilter[filter]`. Then we will map the `id`s to the `state.ById` lookup table to get the actual todos.

### Updated `getVisibleTodos`

```javascript
export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];    // get ids by filter
  return ids.map(id => state.byId[id]);     // get todos for those ids
};
```

Store state:

```json
{
  "todos": {
    "byId": {
      "1": { "id": 1, "text": "heel", "completed": false },
      "2": { "id": 2, "text": "world", "completed": false },
      "3": { "id": 3, "text": "derek", "completed": false },
      "4": { "id": 4, "text": "john", "completed": true },
      "5": { "id": 5, "text": "mike", "completed": true },
      "6": { "id": 6, "text": "susan", "completed": true }
    },
    "idsByFilter": {
      "all": [ 1, 2, 3, 4, 5, 6 ],
      "uncompleted": [ 1, 2, 3 ],
      "completed": [ 4, 5, 6 ]
    }
  }
}
```

## Refactoring `todos`

The selector now expects `idsByFilter` and `byId` to be part of the combined `state` of the `todos` reducer.

**`todos` Reducer Before:**

```javascript
const todos = combineReducers({
  byId,
  allIds
});
```

The `todos` reducer used to combine the lookup table and a list of `allIds`. Now, though, we'll replace the lis of `allIds` with the list of `idsByFilter`, which will be a new combined reducer.

**`todos` Reducer After:**

```javascript
const todos = combineReducers({
  byId,
  idsByFilter
});
```

### Creating `idsByFilter` reducer

`idsByFilter` combines a separate list of `id`s for every filter. So it's `allIds` for the `all` filter, `uncompletedIds` for the `uncompleted` filter, and `completedIDs` for the `completed` filter.

```javascript
const idsByFilter = combineReducers({
  all: allIds,
  uncompleted: uncompletedIds,
  completed: completedIds,
});
```

### Updating the `allIds` Reducer

The original `allIDs` reducer managed an array of IDs and the `ADD_TODO` action.

We are going to take this responsibility away for now, because for now we want to teach it to respond to the data fetched from the server.

**`allIds` Before:**

```javascript
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};
```

We'll start by renaming `ADD_TODO` to `RECEIVE_TODOS`. In order to handle the `RECEIVE_TODOS` action, we want to return a new array of todos that we'll get from the server response. We'll map this new array of todos to a function that just selects an `id` from the `todo`. Recall that we decided to keep all IDs separate from uncompleted IDs and completed IDs, so they are fetched completely independently.

**`allIds` After:**

```javascript
// action.response is filtered todos(all todos in this case), we return ids from these todos
const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
```

### Creating the `uncompletedIds` Reducer

Our `uncompletedIds` reducer will also keep track of an array of `id`s, but only for `todos` on the uncompleted tab. We will need to handle the `RECEIVE_TODOS` action in exactly the same way as the `allIds` reducer before it.

```javascript
// action.response is filtered todos(uncompleted todos in this case), we return ids from these todos
const uncompletedIds = (state = [], action) => {
  if (action.filter !== 'uncompleted') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
```

Both `uncompletedIds` and `allIds` need to return a new `state` when the `RECEIVE_TODOS` action fires, but we need to have a way of telling which `id` array we should update.

If you recall the `RECEIVE_TODOS` action, you might remember that we passed the `filter` as part of the action. This lets us compare the `filter` inside the action with a `filter` corresponding to the reducer.

The `allIds` reducer is only interested in the actions with the `all` filter, and the `uncompletedIds` is only interested in the `uncompleted` filter.

### Creating the `completedIds` Reducer

```javascript
// action.response is filtered todos(completed todos in this case), we return ids from these todos
const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
```

### Updating the `byId` Reducer

Now that we have reducers that managing the `id`s, we need to update the `byId` reducer to actually handle the new `todos` from the response.

**`byId` Before:**

```javascript
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};
```

We can start by removing the existing `case`s because the data does not live locally anymore. Instead, we will handle the `RECEIVE_TODOS` action.

Then we'll create `nextState`, a shallow copy of the `state` object which corresponds to the lookup table. We want to iterate through every `todo` object in the `response` and put it into our `nextState`.

We'll replace whatever is in `nextState`'s entry for `todo.id` with the new `todo` we just fetched.

Finally, we'll return the next version of the lookup table from our reducer.

**`byId` After:**

```javascript
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};
```

---

## Understanding what happens

Suppose we initially load `localhost/completed`, and our state is like below:

```json
{
  "todos": {
    "byId": {
      "4": { "id": 4, "text": "john", "completed": true },
      "5": { "id": 5, "text": "mike", "completed": true },
      "6": { "id": 6, "text": "susan", "completed": true }
    },
    "idsByFilter": {
      "all": [ 1, 2, 3, 4, 5, 6 ],
      "uncompleted": [ 1, 2, 3 ],
      "completed": [ 4, 5, 6 ]
    }
  }
}
```

When user clicks `uncompleted` link, we **dispatch a `fetchTodos` action** with filter `uncompleted`:

```javascript
// actions/todos.js
const receiveTodos = (filter, response) => ({
  type: RECEIVE_TODOS,
  filter,
  response
});

export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then((response) => receiveTodos(filter, response));
```

When `fetchTodos` action creator gets called, it will call api, return a promise. After the promise is resolved, return a promise object: `{ type: RECEIVE_TODOS, filter, [Promise] }`. So eventually, Clicking `dispatch(fetchTodos(filter))` ==> `dispatch({ type: RECEIVE_TODOS, filter, [Promise] })`. We need a middleware to handle Promise.

fetchTodos api response:

```json
{
  "1": { "id": 1, "text": "heel", "completed": false },
  "2": { "id": 2, "text": "world", "completed": false },
  "3": { "id": 3, "text": "derek", "completed": false },
}
```

action:

```json
{ "type": "RECEIVE_TODOS", "filter": "uncompleted", [Promise] }
```

New state:

```diff
{
  "todos": {
    "byId": {
+      "1": { "id": 1, "text": "heel", "completed": false },
+      "2": { "id": 2, "text": "world", "completed": false },
+      "3": { "id": 3, "text": "derek", "completed": false },
      "4": { "id": 4, "text": "john", "completed": true },
      "5": { "id": 5, "text": "mike", "completed": true },
      "6": { "id": 6, "text": "susan", "completed": true }
    },
    "idsByFilter": {
      "all": [ 1, 2, 3, 4, 5, 6 ],
      "uncompleted": [ 1, 2, 3 ],
      "completed": [ 4, 5, 6 ]
    }
  }
}
```

**Note:** Normally the assignment operation is a mutation. However, in this case it's fine because `nextState` is a shallow copy, and we're only assigning one level deep. Our function stays pure because we're not modifying any of the original state objects.

### Finishing Up

As the last step, we can remove the import of `todo.js` as well as the file itself from our project, because the logic for adding and toggling todos will be implemented as API calls to the server in the future lessons.

[Recap at 5:22 in video](https://egghead.io/lessons/javascript-redux-updating-the-state-with-the-fetched-data)