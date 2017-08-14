import { RECEIVE_TODOS } from '../constants/index';

/* state structure for byId
Take 'uncompleted' Action.response for example:

```json
[
  {id:1, text:'heel', completed:false},
  {id:2, text:'world', completed:false},
  {id:3, text:'derek', completed:false}
]
```

```json
todos: {
  idsByFilter: {
    'all': [1,2,3,4,5,6],
    'uncompleted': [1,2,3],
    'completed': [4,5,6]
  },
  byId: {
    1: {id:1, text:'heel', completed:false},
    2: {id:2, text:'world', completed:false},
    3: {id:3, text:'derek', completed:false},
    4: {id:4, text:'john', completed:true},
    5: {id:5, text:'mike', completed:true},
    6: {id:6, text:'susan', completed:true},
  }
}
```
 */

const byId = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_TODOS:
      action.response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

export default byId;

// get single todo
export const getTodo = (state, id) => state[id];
