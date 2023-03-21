import * as types from './types';
import Konnect from './../../config/konnect';

export const getPosts = () => async dispatch => {
  try {

    const response = await Konnect.post(`/v1/graph/ig/analytics/media`,{limit:300});
        dispatch({
          type: types.GET_POST,
          payload:response.data
        });

  } catch (e) {
    console.log(e.response.data);
  }
};



export const getPostShop = () => async dispatch => {
    try {
      const response = await Konnect.post(`/v1/graph/ig/analytics/user`);
     
          dispatch({
            type: types.GET_POST_SHOP,
            payload: response.data,
          });
    } catch (e) {
      console.log(e.response.data);
    }
  };