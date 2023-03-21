import {GET_PURCHASES} from '../../actions/types';

const initialState = {data: [], total_records: 0};

export default function purchasesRed(state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASES:
    //   console.log(
    //     action.payload.data,
    //     '====redux====pppppppppppppppp',
    //     action.payload.total_records,
    //   );
      return {
        ...state,
        data: action.payload.data,
        total_records: action.payload.total_records,
      };
    default:
      return state;
  }
}
