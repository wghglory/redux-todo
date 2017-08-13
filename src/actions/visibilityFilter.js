import { SET_FILTER } from '../constants/index';

export const setVisibilityFilter = (filter) => ({
  type: SET_FILTER,
  filter
});
