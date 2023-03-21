import { GET_SHIPPING_RATES, SET_SHIPPING_ADDRESS } from '../../actions/types';

const initialState = {};

export function getShippingRatesRed(state = initialState, action) {
  switch (action.type) {
    case GET_SHIPPING_RATES:
      return action.payload;
    default:
      return state;
  }
}
const initialState1 = {};
export function getShippingAddressRed(state = initialState1, action) {
  switch (action.type) {
    case SET_SHIPPING_ADDRESS:
      return action.payload;
    default:
      return state;
  }
}

