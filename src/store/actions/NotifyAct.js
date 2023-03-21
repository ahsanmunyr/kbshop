import konnect from '../../config/konnect';
import Toast from 'react-native-toast-message';

export const notifyMe = event_id => async dispatch => {
  try {
    const res = await konnect.post('/v1/public/notify/me', {event_id});
    Toast.show({
      type: 'success',
      text1: res?.data?.message,
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message, 'Notify me err');
    Toast.show({
      type: 'error',
      text1: err?.response?.data?.message,
    });
  }
};
