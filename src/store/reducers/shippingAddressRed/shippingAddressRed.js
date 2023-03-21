import {GET_SHIPPING_ADDRESS} from '../../actions/types';

const initialState = [];

export default function shippingAddressRed(state = initialState, action) {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS:
      return action.payload;
    default:
      return state;
  }
}
