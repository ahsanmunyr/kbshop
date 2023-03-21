import konnect from '../../config/konnect';
import Toast from 'react-native-toast-message';

export const passwordChange = (id, cp, np) => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/auth/appchangePassword', {
        user_id: id,
        currentPassword: cp,
        newPassword: np
      });
      Toast.show({
        type: 'success',
        text1: "Password changed successfully",
      });
      return res;
  } catch (err) {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: err.response.data.message,
    });
  }
};
