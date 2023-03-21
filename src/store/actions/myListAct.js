import konnect from '../../config/konnect';
import {GET_MY_LIST} from './types';
import Toast from 'react-native-toast-message';

export const getMyList = page_no => async dispatch => {
  try {
    const res = await konnect.post(
      '/v1/mobile/private/getFavouritePostUserList',
      {},
      {
        params: {
          page: page_no,
          limit: 8,
        },
      },
    );
    console.log(res.data)
    dispatch({
      type: GET_MY_LIST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeItemMyList = (_id, children_id,cb =()=>{}) => async dispatch => {
  try {
    const res = await konnect.post(
      '/v1/mobile/private/removeFavouritePostUserList',
      {
        post_id: _id,
        children_id
      }
    );
    cb()
    // Toast.show({
    //   type: 'success',
    //   text1: res.data.message,
    // });
    // console.log(res.data.message,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const removeParentFavouritePost = (_id) => async dispatch => {
  try {
    const res = await konnect.post(
      '/v1/mobile/private/removeParentFavouritePost',
      {
        post_id: _id,
      }
    );
   
    Toast.show({
      type: 'success',
      text1: res.data.message,
    });
    return res
} catch (error) {
  console.log(error);
}
}
