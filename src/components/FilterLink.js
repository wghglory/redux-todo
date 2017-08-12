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
