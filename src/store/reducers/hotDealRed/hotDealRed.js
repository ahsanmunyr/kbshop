import {GET_HOTDEAL_COVERS} from '../../actions/types';

const initialState = [];

export default function hotDealRed(state = initialState, action) {
  switch (action.type) {
    case GET_HOTDEAL_COVERS:
      return action.payload;
    default:
      return state;
  }
}
