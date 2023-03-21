import {IS_HOST_EVENT_LIVE} from '../../actions/types';

const initialState = {};

export default function hostEventLiveRed(state = initialState, action) {
  switch (action.type) {
    case IS_HOST_EVENT_LIVE:
      return action.payload;
    case "CLEAR_HOST_EVENT_LIVE_RED":
      return {};
    default:
      return state;
  }
}
