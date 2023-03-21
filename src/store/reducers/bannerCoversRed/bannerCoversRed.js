import {GET_BANNERS_COVERS} from '../../actions/types';

const initialState = [];

export default function bannerCoversRed(state = initialState, action) {
  switch (action.type) {
    case GET_BANNERS_COVERS:
      return action.payload;
    default:
      return state;
  }
}
