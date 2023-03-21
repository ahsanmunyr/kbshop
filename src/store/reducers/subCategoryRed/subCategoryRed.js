import removeDuplicate from '../../../utils/removeDuplicate';
import { GET_SUB_CATGORIES, CLEAR_SUB_CATEGORY } from '../../actions/types';

const initialState = [];

export default function subCategoryRed(state = initialState, action) {

  switch (action.type) {

    case GET_SUB_CATGORIES:
      return action.payload;
    // return removeDuplicate([...action.payload],"_id");
    case "CLEAR_SUB_CATGORIES":
      return [];
    default:
      return state;
  }
}
