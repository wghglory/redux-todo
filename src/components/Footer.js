import React from 'react';
import { setVisibilityFilter } from '../actions/visibilityFilter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Footer = ({ onClick }) => {
  return (
    <p>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick('all');
        }}
      >
        All
      </a>{' '}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick('uncompleted');
        }}
      >
        Uncompleted
      </a>{' '}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick('completed');
        }}
      >
        Completed
      </a>
    </p>
  );
};

Footer.propTypes = {
  onClick: PropTypes.func.isRequired
};

// container
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (filter) => {
      dispatch(setVisibilityFilter(filter));
    }
  };
};

export default connect(null, mapDispatchToProps)(Footer);
