# 01. Simplifying the Arrow Functions

[Video Link](https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions?course=building-react-applications-with-idiomatic-redux)

## Arrow Function Syntax

**Traditional Function Syntax:**

``` javascript
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text,
  };
}
```

**Arrow Function Syntax:**

```javascript
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  text,
})
```

---

This process can be used outside of Action Creators as well. For example, it is common for `mapStateToProps` and `mapDispatchToProps` to just return objects:

**Before:**

FilterLinkContainer.js

```javascript
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}
```

**After:**

```javascript
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})
```

We can make `mapDispatchToProps` even more compact by replacing the arrow function with a concise method notation that is part of ES6 and is available when a function is defined inside an object.

```javascript
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})
```