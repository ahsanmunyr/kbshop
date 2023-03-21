import {ADD_INSTA, LOG_IN, SIGN_UP, SUBMIT_INF_APP} from '../../actions/types';

const initialState = {};

export default function authRed(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      // console.log(action.payload,"authred")
      return action.payload;
    case SIGN_UP:
      return action.payload;
    case ADD_INSTA:
      return {...state,data:{...state.data,...action.payload}}
      case SUBMIT_INF_APP:
        return {...state,data:{...state.data,...action.payload}}
    case "clearAuth":
      return {}
    default:
      return state;
  }
}
