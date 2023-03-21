import {GET_PREVIOUS_EVENTS_ITEM} from '../../actions/types';

const initialState = {};

export default function getPerviousEventItem(state = initialState, action) {
  switch (action.type) {
    case GET_PREVIOUS_EVENTS_ITEM:
      return action.payload;
    default:
      return state;
  }
}
