import konnect from '../../config/konnect';
import {GET_CATEGORY_BANNERS} from './types';

export const getCategoryBanners = (category_id, type) => async dispatch => {
  console.log("cccccc",category_id,type)
  try {
    const res = await konnect.post('/v1/mobile/category/getCategoryBanners', {
      category_id,
      type,
    });
    dispatch({
      type: GET_CATEGORY_BANNERS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
