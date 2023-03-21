import konnect from '../../config/konnect';
import Toast from 'react-native-toast-message';

export const contactUs = (subject, message) => async dispatch => {
  try {
    const res = await konnect.post('/v1/support/feedback/submit', {
      feedback_text: message,
      feedback_about: subject,
      is_mobile: true,
    });

    console.log(res);
    Toast.show({
      type: 'success',
      text1: 'Your feedback has been submitted successfully...',
    });
    return res;
  } catch (err) {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: err?.response?.data?.message,
    });
  }
};
