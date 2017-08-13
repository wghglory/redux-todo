import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ id, completed, text, onClick }) => {
  return (
    <li key={id} onClick={() => onClick(id)} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      {text}
    </li>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Todo;
