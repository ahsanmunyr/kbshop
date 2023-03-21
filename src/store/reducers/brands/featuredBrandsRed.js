import removeDuplicate from '../../../utils/removeDuplicate';
import {GET_FEATURED_BRANDS} from '../../actions/types';

const initialState = [];

export default function featuredBrandsRed(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_BRANDS:
      // return removeDuplicate([...action.payload],"_id");
      return action.payload;
    default:
      return state;
  }
}
