import {GET_CATEGORY_FEATURED} from '../../actions/types';

const initialState = [];

export default function categoryFeaturedRed(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_FEATURED:
      return action.payload;
    case 'CLEAR_CATEGORY_FEATURED':
      return [];
    default:
      return state;
  }
}
