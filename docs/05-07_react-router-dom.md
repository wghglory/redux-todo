# 05-07 todo list based on react-router-dom v4

Root.js: filter is optional parameter, both `/` and `all` will target `App` component

```jsx
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/:filter?" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
```

App.js: if not `/`, `match.params.filter` will receive the value, otherwise `all` for main root

```jsx
export default (props) => (
  <div>
    <AddTodo />
    <TodoListContainer filter={props.match.params.filter || 'all'} />
    <Footer />
  </div>
);
```

TodoListContainer.js: ownProps.filter will receive container's prop filter

```javascript
const mapStateToProps = (state, ownProps) => {
  return {
    todos: filterTodos(state.todos, ownProps.filter)
  };
};
```

FilterLink.js: use `NavLink to and activeStyle`. Pay attention to `exact` and `to`

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => {
  return (
    <NavLink
      exact
      to={filter === 'all' ? '/' : `/${filter}`}
      activeStyle={{
        textDecoration: 'none',
        color: 'red'
      }}
      style={{ margin: '0 4px' }}
    >
      {children}
    </NavLink>
  );
};

FilterLink.propTypes = {
  filter: PropTypes.oneOf([ 'all', 'completed', 'uncompleted' ]).isRequired,
  children: PropTypes.node
};

export default FilterLink;
```

Footer.js: use FilterLink directly, not need FilterLinkContainer any more.

```jsx
const Footer = () => {
  return (
    <p>
      <FilterLink filter="all">All</FilterLink>
      <FilterLink filter="uncompleted">Uncompleted</FilterLink>
      <FilterLink filter="completed">Completed</FilterLink>
    </p>
  );
};

export default Footer;
```