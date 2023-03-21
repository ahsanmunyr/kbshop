import {GET_CATEGORY_BRANDS_YOU_LOVE} from '../../actions/types';

const initialState = [];

export default function categoryBrandsYouLoveRed(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_BRANDS_YOU_LOVE:
      return action.payload;
    case 'CLEAR_CATEGORY_BRANDS_YOU_LOVE':
      return [];
    default:
      return state;
  }
}
