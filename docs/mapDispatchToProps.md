# Using mapDispatchToProps() Shorthand Notation

Only if the arguments of callback and actionCreator are exactly the same, we can use mapDispatchToProps shorthand notation!

**Pass an object with callback function name and actionCreator name.**

TodoListContainer.js

```diff
- const mapDispatchToProps = (dispatch, ownProps) => {
-   return {
-     onClick: (id) => {
-       dispatch(toggleTodo(id));
-     }
-   };
- };

- export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
+ export default withRouter(connect(mapStateToProps, { onClick: toggleTodo })(TodoList));
```