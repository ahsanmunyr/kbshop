import konnect from '../../config/konnect';
import { GET_SUB_CATGORIES } from './types';

export const getSubCategories = data => async dispatch => {
  // alert("SADASDSAD")
  console.log(data._id, "========getSubCategories========")
  try {
    const res = await konnect.post('/v1/mobile/category/subCategories', {
      parent_id: data._id,
    });


    if (data.subCategory) {
       console.log(res.data.data,"++++++++++++++++++++++++++++++++++++++++++get sub categories")
      dispatch({
        type: GET_SUB_CATGORIES,
        payload: res.data.data,
      });
    } else {
      if(!data?.bioShop){
        let updateddata = res.data.data;
        updateddata.unshift({ category_name: `All ${data?.category_name}`, image_url: data?.image_url })
        dispatch({
          type: GET_SUB_CATGORIES,
          payload: updateddata,
        });
      }else{
        dispatch({
          type: GET_SUB_CATGORIES,
          payload: res.data.data,
        });
      }
    }

  } catch (err) {
    console.log(err.response.data.message);
  }
};
