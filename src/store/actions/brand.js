import konnect from '../../config/konnect';
import {GET_ALL_BRANDS, GET_USER_BRAND} from './types';

export const getAllBrands = (page, name, sort) => async dispatch => {
  try {
    const res = await konnect.post(
      '/v1/mobile/category/allBrands',
      {name: name == 'all' ? '' : name, sort: sort},
      {
        params: {
          limit: 12,
          page,
        },
      },
    );
    // console.log(res.data?.data, "SDADASDASDSAD---------------------------------------------------------")
    if (res.data?.data.length == 0) {
      dispatch({type: 'brandNotFound'});
    }
    dispatch({
      type: GET_ALL_BRANDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserBrands = () => async dispatch => {
  try {
    const res = await konnect.post('/v1/users/marketPlace/getUserBrands');
    dispatch({
      type: GET_USER_BRAND,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};