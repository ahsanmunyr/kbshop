import * as types from './types';
import Konnect from './../../config/konnect';

// /v1/mobile/private/getCustomerPurchaseList?page=1&limit=10&from_date=2022-01-01&to_date=2022-06-02
export const getPurchases = (page, from_date, to_date) => async dispatch => {
  console.log(page, from_date, to_date)
  try {
    const res = await Konnect.post(
      '/v1/mobile/private/getCustomerPurchaseList',
      {},
      {
        params: {
          limit: 10,
          page,
          from_date,
          to_date
        },
      },
    );
    dispatch({
      type: types.GET_PURCHASES,
      payload: res.data.message,
    });
  } catch (e) {
    console.log(e.response.data);
  }
};
