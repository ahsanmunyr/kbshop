import {GET_BRANDYOULOVE_COVERS} from '../../actions/types';

const initialState = [];

export default function brandYouLoveRed(state = initialState, action) {
  switch (action.type) {
    case GET_BRANDYOULOVE_COVERS:
      return action.payload;
    default:
      return state;
  }
}
