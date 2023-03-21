// @ts-nocheck
import konnect from '../../config/konnect';
import config from '../../config/config';
import {LOG_IN, SIGN_UP, FORGET_PASSWORD, COUNTRIES} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import deviceInfo from "react-native-device-info";

export const login = (password, email,device) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/auth/appUserLogin', {
      email,
      password,
      device,
      version:deviceInfo.getVersion()
    });
    console.log(res.data,"=============login================")

    await AsyncStorage.setItem('token', res.data.data.token);
    konnect.defaults.headers.common['Authorization'] =
      'Bearer ' + res.data.data.token;
    console.log('login', res.data.data.token);
    dispatch({
      type: LOG_IN,
      payload: res.data,
    });
  } catch (err) {
    console.log(err, "===================================================")
    dispatch({
      type: LOG_IN,
      payload: err?.response?.data,
    });
  }
};

export const signUp = (data, cb) => async dispatch => {
  const {
    firstName,
    lastName,
    nickName,
    // zipCode,
    userName,
    email,
    password,
    selectedCountry,
    selectedState,
    selectedCity,
    gender,
    device
  } = data;
  // alert("ASd")
  try {
   const res = await konnect.post('/v1/mobile/auth/appUserSignup', {
      name: firstName+' '+lastName,
      nick_name: nickName,
			first_name: firstName,
			last_name: lastName,
      zip: 1,
      email: email,
      gender: '',
			country: '',
			state: '',
			city: '',
      password: password,
      device:device,
      coming_from_app: true,
      brand: ''
    })
    // console.log(res?.data,"=======================================")
    cb(res?.data?.message);
    // return res;
    cb()
    await AsyncStorage.setItem('token', res.data?.data?.token);
    konnect.defaults.headers.common['Authorization'] =
      'Bearer ' + res?.data?.data?.token;
    dispatch({
      type: LOG_IN,
      payload: res.data,
    });
     
  } catch (err) {
    cb();
  
    dispatch({
      type: LOG_IN,
      payload: err?.response?.data,
    });
    console.log(err.response.data,"auth")
    Toast.show({
      type: 'error',
      text1: err?.response?.data?.message,

    });
    // return err?.response?.data?.message
    // console.log(err?.response?.data,"err")
  }
};

export const forget_password = email => async dispatch => {
  try {
    const res = await konnect.get(`/forgotpassword?email=${email}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const setUser = (cb, loadingOff, showMessage) => async dispatch => {
  konnect.interceptors.response.use(
    response => {
      if (response.status === 200) {
        return response;
      }
    },
    error => {
      if (error.response && error.response.status === 401) {
        showMessage();
        cb();
      }
      return Promise.reject(error);
    },
  );

  const token = await AsyncStorage.getItem('token');

  if (token) {
    konnect.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return konnect
      .post('/v1/mobile/auth/appTokenValidate')
      .then(res => {
        console.log('myres', res.data);
        dispatch({
          type: LOG_IN,
          payload: {
            ...res.data,
            data: {...res.data.Data, token},
            Data: undefined,
          },
        });
        loadingOff();
      })
      .catch(err => {
        loadingOff();
      })
      .catch(err => {
        loadingOff();
      });
  } else {
    loadingOff();
  }
};

export const logOut = () => async dispatch => {
  messaging().unsubscribeFromTopic('konnectBio');
  AsyncStorage.removeItem('token');
  dispatch({
    type: LOG_IN,
    payload: {},
  });
};

export const refreshAuth = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  console.log('refersh');
  if (token) {
    return konnect.post('/v1/mobile/auth/appTokenValidate').then(res => {
      dispatch({
        type: LOG_IN,
        payload: {
          ...res.data,
          data: {...res.data.Data, token},
          Data: undefined,
        },
      });
    });
  }
};

export const deleteAccount = id => async dispatch => {
  return konnect.put(`/v1/users/revise/accountdelete/${id}`);
};

export const saveLocation = obj => async dispatch => {
  return konnect.post(`/v1/mobile/private/saveCurrentUserLocation`, {
    location: obj,
  });
};

export const editUserInfo = (data, cb) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const configReq = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    };
    
    fetch(
      `${config.base_url}/v1/mobile/private/updateMobileUserPofile`,
      configReq,
    )
      .then(checkStatusAndGetJSONResponse => {
        return checkStatusAndGetJSONResponse.json();
      })
      .then(res => {
        console.log(res, '>>>>>>>>>>>>>>>>>>');
        cb();
        Toast.show({
          type: 'success',
          text1: "Updated successfully",
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log('error', err);
  }
};

export const updatePaypalEmail = paypalEmail => async dispatch => {
  try {
    const response = await konnect.post(
      `/v1/mobile/private/updatePaypalEmail`,
      {
        paypalEmail: paypalEmail,
      },
    );
    return response;
  } catch (e) {
    console.log(e.response.data, 'ERR');
  }
};
