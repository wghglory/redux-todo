/* import React from 'react';
import store from '../store';
import { addTodo } from '../actions/index';

const AddTodo = () => {
  let input;

  return (
    <div>
      <input type="text" ref={(ele) => (input = ele)} />
      <button
        onClick={() => {
          store.dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo; */

import React from 'react';
import { addTodo } from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input type="text" ref={(ele) => (input = ele)} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(AddTodo);

/* connect doesn't pass anything: state or dispatch doesn't pass. 
dispatch will by passed to presentation component by default */