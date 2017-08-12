import { SET_FILTER } from '../constants/index';

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_FILTER,
    filter
  };
};
