import konnect from '../../config/konnect';
import {GET_BRAND_CAT} from './types';

export const getCategories = brand_id => async dispatch => {
  try {
    const res = await konnect.post('/v1/users/marketPlace/brandcategories', {
      brand_id,
    });
    const updatedData = res.data?.message.map(item => {
      console.log(item)
      return {label: item.category_name, value: item.category_id};
    });
    updatedData.unshift({label: 'All', value: 'all'});
    dispatch({
      type: GET_BRAND_CAT,
      payload: updatedData,
    });
  } catch (err) {
    console.log(err);
  }
};
