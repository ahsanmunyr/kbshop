import AsyncStorage from "@react-native-async-storage/async-storage"
import konnect from "../../config/konnect"
import { ADD_INSTA, GET_INSTA_POST, SUBMIT_INF_APP } from "./types"
import Toast from "react-native-toast-message"
import config from "../../config/config"
export const getInstagramUrl = () => async (dispatch) => {
        const res = await konnect.post('/v1/social/ig/url/instagram')
        return res
}


export const getInstaToken = (code, email, user_id, cb) => async (dispatch) => {
        try {
                // console.log(code,email,user_id)
                const res = await konnect.post(`/v1/social/ig/data/${code}`, { email })
                const { access_token, username } = res.data
                const res2 = await konnect.put(`/v1/users/revise/ig/instagram`, {
                        access_token,
                        user_id,
                        username
                })
                // console.log(res2.data)
                dispatch({
                        type: ADD_INSTA,
                        payload: { ...res2.data, _id: user_id, instagram_username: username }
                })
        } catch (err) {
                cb ? cb(err.response.data.message) : null
                console.log(err.response.data, "hELLOW")
        }
}

export const influencerApplication = (data) => async (dispatch) => {
        return konnect.post('/v1/mobile/private/becameInfluencer', data).then((res) => {
                dispatch({
                        type: SUBMIT_INF_APP,
                        payload: { became_influencer: "pending" }
                })
        })
}


export const getInstaPost = (token, username, source) => async (dispatch) => {
        try {
                if (source == "gallery") {
                        const res = await konnect.get(`/v1/library/receive/source/gallery?limit=20&page=1`)
                        dispatch({
                                type: GET_INSTA_POST,
                                payload: {...res.data.message,data:[...res.data.message.data].map(it=>({...it,media_id:it.id}))}
                        })
                } else {
                        const res = await konnect.post(`/v1/social/ig/media/${token}`, { username })
                        dispatch({
                                type: GET_INSTA_POST,
                                payload: res.data
                        })
                }
        } catch (err) {
                dispatch({ type: 'clearInstaPost' });
                console.log(err?.response?.data)
        }
}

export const instPostLoadMore = (url, instaName, source) => async (dispatch) => {
        try {
                if (source == "gallery") {
                        const res = await konnect.get(`/v1/library/receive/source/gallery?limit=20&page=${url}`)
                        dispatch({
                                type: GET_INSTA_POST,
                                payload: {...res.data.message,data:[...res.data.message.data].map(it=>({...it,media_id:it.id}))}
                        })
                } else {
                        const res = await konnect.post(`/v1/social/ig/nextMedia/${instaName}`, { url })
                        dispatch({
                                type: GET_INSTA_POST,
                                payload: res.data
                        })
                }
        } catch (err) {
                console.log(err.response.data)
        }
}


export const disconnectInstaGram = (id) => async (dispatch) => {
        return konnect.put(`/v1/users/revise/disconnectinstagram/${id}`)
}

export const addMedia = (data,cb,cb_if_err) => async (dispatch) => {
        // return konnect.post(`/v1/library/reserve`,data)
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
                  `${config.base_url}/v1/library/reserve`,
                  configReq,
                )
                  .then(checkStatusAndGetJSONResponse => {
                    return checkStatusAndGetJSONResponse.json();
                  })
                  .then(res => {
                    cb(res)
                  })
                  .catch(err => {
                        cb_if_err()
                        Toast.show({type:"error",text1:"something went wrong"})
                        console.log(err);
                });
        } catch (err) {
                cb_if_err()
                Toast.show({type:"error",text1:"something went wrong"})
                console.log('error', err);
        }
}