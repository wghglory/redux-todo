import React from 'react';
import PropTypes from 'prop-types';

const FilterLink = ({ onClick, active, children }) => {
  return active ? (
    <span>{children}</span>
  ) : (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

FilterLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default FilterLink;
