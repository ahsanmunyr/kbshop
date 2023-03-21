import konnect from '../../config/konnect';
import {GET_SHIPPING_ADDRESS} from './types';

export const getShippingAddress = () => async dispatch => {
  try {
    const res = await konnect.get('v1/users/shipping/getalladdresses');
    dispatch({
      type: GET_SHIPPING_ADDRESS,
      payload: res?.data?.message,
    });
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: GET_SHIPPING_ADDRESS,
      payload: [],
    });
  }
};

export const updateAttribute = (brandID, eventID) => async dispatch => {
  try {
    const res = await konnect.post('v1/shopify/updateattribute', {
      brand: brandID,
      event: eventID,
      source: 'eventshop',
    });
    console.log(
      res.data.message,
      'res.data.successres.data.successres.data.successres.data.success',
    );
    return res.data.success;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const setDefaultAddress = (id, cb) => async dispatch => {
  try {
    console.log('default');
    const res = await konnect.put(`v1/users/shipping/setdefaultaddress/${id}`);

    if (res?.data?.success) {
      cb();
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const createShippingAddress = (data, cb) => async dispatch => {
  try {
    const res = await konnect.post('v1/users/shipping/createnewaddress', {
      firstName: data.fname,
      lastName: data.lname,
      address1: data.address1,
      address2: data.address2,
      country: data.country,
      province: data.province,
      city: data.city,
      zip: data.zipCode,
      phone: data.phone,
      company: data.company,
    });
    console.log(res.data);
    cb();
    // dispatch({
    //   type: GET_SHIPPING_ADDRESS,
    //   payload: res?.data?.message,
    // });
  } catch (err) {
    console.log(err.response.data.message);
    // dispatch({
    //   type: GET_SHIPPING_ADDRESS,
    //   payload: [],
    // });
  }
};

export const deleteShippingAddress = (address_id,cb) => async dispatch => {
  try {
    console.log(address_id)
    const res = await konnect.post('v1/users/shipping/deleteaddress', {
      address_id,
    });
    console.log(res.data,"-------------")
    cb()
    // dispatch({
    //   type: GET_SHIPPING_ADDRESS,
    //   payload: res?.data?.message,
    // });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const updateShippingAddress = (data, cb) => async dispatch => {
  try {
    const res = await konnect.post('v1/users/shipping/updateaddress', {
      address_id: data.address_id,
      firstName: data.fname,
      lastName: data.lname,
      address1: data.address1,
      address2: data.address2,
      country: data.country,
      province: data.province,
      city: data.city,
      zip: data.zipCode,
      phone: data.phone,
      company: data.company,
    });
    console.log(res.data);
    cb();
  } catch (err) {
    console.log(err.response.data.message);
  }
};