import {GET_REFERRAL_STATS} from '../../actions/types';

const initialState = {data: [], summary: [], total_records: 0};

export default function referralStatsRed(state = initialState, action) {
  switch (action.type) {
    case GET_REFERRAL_STATS:
      return {
        ...state,
        data: action.payload.data,
        summary: action.payload.summary,
        total_records: action.payload.total_records,
      };
    default:
      return state;
  }
}
