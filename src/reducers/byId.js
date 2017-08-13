import { RECEIVE_TODOS } from '../constants/index';

/* state structure for byId
todos:{
  byId: {
    "9329ufdsaf": { id: '9329ufdsaf', text: 'hello', completed: false, },
    "13213123df": { id: '13213123df', text: 'world', completed: true, },
    "445524ffad": { id: '445524ffad', text: 'yaya', completed: false, },
  }
}
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

export const getTodo = (state, id) => state[id];
