import konnect from '../../config/konnect';
import {GET_CATEGORY_BRANDS_YOU_LOVE} from './types';

export const getCategoryBrandsYouLove = (category_id, type) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/category/getCategoryLovedBrands', {
      category_id,
      type,
    });
    console.log("aaaaaaaaa3333333",res?.data.data?.length)
    dispatch({
      type: GET_CATEGORY_BRANDS_YOU_LOVE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err?.response.data,"----getCategoryBrandsYouLove",category_id,type);
  }
};