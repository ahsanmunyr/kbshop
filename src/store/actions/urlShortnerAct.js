import konnect from '../../config/konnect';

export const urlShortner = url => async dispatch => {
  try {
    // console.log(url, 'url');
    const res = await konnect.post(`/v1/shorturl`,{url});
    console.log("new url",res.data, "=========================")
    if(res.data.success){
      return res.data;
    }
  } catch (err) {
    console.log(err.response.data.message, "==============EERRRORRR===========");
  }
};
