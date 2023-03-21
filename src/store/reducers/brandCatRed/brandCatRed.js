import {GET_BRAND_CAT} from '../../actions/types';

const initialState = {categories: []};

export default function brandCatRed(state = initialState, action) {
  switch (action.type) {
    case GET_BRAND_CAT:
      return {categories: [...action.payload]};
    case 'CLEAR_BRAND_CAT':
      return {categories: []};
    default:
      return state;
  }
}
