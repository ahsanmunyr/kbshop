import konnect from '../../config/konnect';
import {GET_DASHBOARD_DATA} from './types';

export const getDashboardData = (from_date, to_date) => async dispatch => {
  try {
    const res = await konnect.post('/v1/user/dashboard/receive/customerevent', {
        from_date,to_date
    });
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data.message,
    });
    // console.log(res.data.message,"-----getDashboardData",from_date, "=====", to_date)
  } catch (err) {
    console.log(err);
  }
};