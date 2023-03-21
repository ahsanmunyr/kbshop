import konnect from '../../config/konnect';
import {GET_FAVOURITES, GET_MORE_FAVOURITES} from './types';

export const getFavourites = (account_type, name) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/private/getFavourite', {
      account_type,
      name,
    });
    dispatch({
      type: GET_FAVOURITES,
      payload: res.data.data,
    });
    console.log(res.data.data)
  } catch (err) {
    console.log(err);
  }
};
export const addFavourite = favourite_id => async dispatch => {
  // brand fav ho raha hai
  const res = await konnect.post('/v1/mobile/private/addFavourite', {
    favourite_id,
  });
  return res;
};

export const addToMyList = (id, children_id) => async dispatch => {
  // post fav ho rahy hai
  try {
    const res = await konnect.post('/v1/mobile/private/addToFavouriteUserList', {
      post_id:id,
      // productSKU: sku
      children_id
    });
    return res
    // console.log(res.data, "=================== response fav=====================")
  } catch (error) {
    console.log(error.response.data.message);
  }
}



export const deleteFavourite = (_id) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/private/removeFavourite', {
      _id,
    });
 

  } catch (error) {
    console.log(error.response.data);
  }
};
