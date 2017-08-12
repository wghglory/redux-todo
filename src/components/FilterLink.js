import React from 'react';
import { setVisibilityFilter } from '../actions/visibilityFilter';
import { connect } from 'react-redux';
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
  children: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.visibilityFilter === ownProps.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
