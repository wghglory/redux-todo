# 12. Wrapping `dispatch()` to Log Actions

[Video Link](https://egghead.io/lessons/javascript-redux-wrapping-dispatch-to-log-actions)

Now that our state shape is more complex, we want to override the `store.dispatch` function to add some `console.log()` statements so we can see how the state is affected by the actions.

We'll start by creating a new function called `addLoggingToDispatch` that accepts `store` as an argument. It's going to wrap the `dispatch` provided by Redux, so it reads the raw dispatch from `store.dispatch`.

`addLoggingToDispatch()` will return another function with the same signature as dispatch, which is a single action argument. Some browsers like Chrome support using `console.group()` to group several log statements under a single title, and we're passing in `action.type` in order to group several logs under the action type.

We will log the previous `state` before dispatching the action by calling `store.getState()`. Next, we will log the action itself so that we can see which action causes the change.

To preserve the contract of the `dispatch` function exactly, we'll declare `returnValue` and call the `rawDispatch()` function with the action. Now the calling code will not be able to distinguish between our function and the function provided by Redux, except that we are also logging some information.

We log the next state as well, because the store is guaranteed to be updated after the dispatch is called. We can use `store.getState()` in order to receive the next state after the dispatch.

**`store/index.js`**

```javascript
const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {  //`console.group()` API is not available in all browsers
    return rawDispatch
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  //...
  return store;
}
```

![logger](http://om1o84p1p.bkt.clouddn.com/1502617942.png?imageMogr2/thumbnail/!70p)

[Recap at 2:18 in video](https://egghead.io/lessons/javascript-redux-wrapping-dispatch-to-log-actions)