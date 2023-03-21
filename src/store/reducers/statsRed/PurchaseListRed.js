import removeDuplicate from '../../../utils/removeDuplicate';
import { GET_CUSTOMER_PURCHASE_LIST, GET_CUSTOMER_PURCHASE_LIST_ERROR } from '../../actions/types';

const initialState = {};

export default function purchaseListRed(state = initialState, action) {

  switch (action.type) {

    case GET_CUSTOMER_PURCHASE_LIST:
      return action.payload;
    case GET_CUSTOMER_PURCHASE_LIST_ERROR:
      return action.payload;
    case "CLEAR_PURCHASE_LIST":
      return {};
    default:
      return state;
  }
}
