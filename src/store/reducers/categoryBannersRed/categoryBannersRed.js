import {GET_CATEGORY_BANNERS} from '../../actions/types';

const initialState = [];

export default function categoryBannersRed(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_BANNERS:
      return action.payload;
    case "CLEAR_CATEGORY_BANNERS":
      return [];
    default:
      return state;
  }
}
