import {GET_REFERRAL_STATS} from './types';
import Konnect from './../../config/konnect';

export const get_referral_stats =
  (page, from_date, sort_by, source, to_date) => async dispatch => {
    try {
      console.log({page, from_date, sort_by, source, to_date},"----get_referral_stats")
      const res = await Konnect.post(
        'v1/kbsly/customerstatssummary',
        // {
        //   from_date: '2023-01-01',
        //   sort_by: 'share',
        //   source: 'all',
        //   to_date: '2023-01-16',
        // },
        {
          from_date,
          sort_by,
          source,
          to_date,
        },
        {
          params: {
            limit: 25,
            page :1,
          },
        },
      );
      console.log(res.data.message , " ------>>")
      dispatch({
        type: GET_REFERRAL_STATS,
        payload: res.data.message,
      });
    } catch (e) {
      console.log(e.response.data, 'eerrr');
    }
  };
