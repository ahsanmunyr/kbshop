import {GET_HOST_EVENTS} from '../../actions/types';

const initialState = {};

export default function hostEventRed(state = initialState, action) {
  switch (action.type) {
    case GET_HOST_EVENTS:
      return action.payload;
    default:
      return state;
  }
}
