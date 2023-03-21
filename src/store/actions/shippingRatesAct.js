import konnect from '../../config/konnect';
import { GET_ALL_CATEGORIES, GET_SHIPPING_RATES, SET_SHIPPING_ADDRESS } from './types';
import Toast from 'react-native-toast-message';

export const getShippingRates = brandID => async dispatch => {
  // console.log(brandID, "brandIDbrandIDbrandIDbrandID");
  try {
    const res = await konnect.post('v1/shopify/getshippingrates', {
      brand: brandID,
    });
    // console.log(res?.data?.message?.data,'=====================')
    dispatch({
      type: GET_SHIPPING_RATES,
      payload: res?.data?.message?.data?.node,
    });
  } catch (err) {
    console.log(err.response.data.message, "====================getShippingRates====================");
  }
};
// https://apiv2.konnect.bio/v1/shopify/setshippingaddress

export const setshippingAddress = brandID => async dispatch => {


  const res = await konnect.post('v1/shopify/setshippingaddress', {
    brand: brandID,
  });
  // console.log(res?.data?.message?.data,'=====================')
  dispatch({
    type: SET_SHIPPING_ADDRESS,
    payload: res?.data?.message?.data,
  });
  return res?.data?.message

};




export const setShippingRatesApi =
  (handle, brand, cb = () => console.log('setShippingRatesApi')) =>
    async dispatch => {
      return konnect
        .post('v1/shopify/setshippingrates', { handle, brand })
        .then(res => {
          console.log('setShippingRatesApi', res.data);
          if (res.data.success) {
            cb();
            return res?.data?.message;
          }
        })
        .catch(err => {
          console.log('err', err.response.data.message);
          cb();

          Toast.show({ type: 'error', text1: err.response.data.message });
          return err
        });
    };



