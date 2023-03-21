import removeDuplicate from '../../../utils/removeDuplicate';
import { ADD_CAMPAIGN, CAMPAIGN_PAUSE, GET_CAMPAIGNS, REMOVE_CAMPAIGN_FROM_UI } from '../../actions/types';

const initialState = {
  data: [],
};

export default function campaignsRed(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      // console.log({
      //   ...action.payload,
      //   data: [...state.data, ...action.payload.data],
      // },"LLLLLLLLLLLLLL");
      
      return {
        ...action.payload,
        // data: [...state.data, ...action.payload.data],
        data: removeDuplicate([...state.data, ...action.payload.data],"_id")
      };
    case REMOVE_CAMPAIGN_FROM_UI:
      // let temp_data = [...state.data];
      // temp_data.splice(
      //   temp_data.findIndex(x => x.campaign_id === action.payload),
      //   1,
      // );
      // console.log(
      //   {
      //     ...state,
      //     data: [...temp_data],
      //   },
      //   '------------------------------------------------_________',
      // );
      // return {
      //   ...state,
      //   data: [...temp_data],
      //   totalCount: state.totalCount - 1,
      // };
      const data = [...state.data].filter(
        item => item.campaign_id != action.payload,
      );
      return { ...state, data: [...data], totalCount: state.totalCount - 1 };
    case CAMPAIGN_PAUSE:
      const data1 = [...state.data].map(it => {
        if (it.campaign_id == action.payload) {
          return { ...it ,is_linked:true,is_active:true}
        } else {
          return it
        }
      })
      return { ...state, data: [...data1], totalCount: state.totalCount - 1 }
    case ADD_CAMPAIGN:
      const data2 = [...state.data].map(it => {
        if (it.campaign_id == action.payload) {
          return { ...it,is_linked:true,is_active:true }
        } else {
          return it
        }
      })
      return { ...state, data: [...data2], totalCount: state.totalCount - 1 }
    case 'clearCampaignData':
      return { data: [] };
    default:
      return state;
  }
}
