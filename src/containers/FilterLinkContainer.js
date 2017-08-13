import { setVisibilityFilter } from '../actions/visibilityFilter';
import { connect } from 'react-redux';
import FilterLink from '../components/FilterLink';

// ownProps: container's prop, in this case: filter of <FilterLink filter="all">
const mapStateToProps = (state, ownProps) => ({
  active: state.visibilityFilter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
