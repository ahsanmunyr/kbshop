import konnect from '../../config/konnect';
import {GET_CATEGORY_FEATURED} from './types';

export const getCategoryFeatured = (category_id, type) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/category/getCategoryFeatured', {
      category_id,
      type,
    });
    dispatch({
      type: GET_CATEGORY_FEATURED,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
