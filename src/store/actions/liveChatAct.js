import * as types from './types';
import Konnect from './../../config/konnect';


export const createChatToken = (event_id) => async (dispatch) => {

    try {
        const res = await Konnect.post(
            `/v1/chat/gettoken`, {
            event_id
        })
        if (res.data.success) {
            dispatch({
                type: types.GET_CHAT_TOKEN,
                payload: res.data?.message,
            });
        }
    } catch (e) {
        dispatch({
            type: types.GET_CHAT_TOKEN_ERROR,
            payload: e
        })
    }
};


export const createChatTokenClear = () => async (dispatch) => {

    dispatch({
        type: types.GET_CHAT_TOKEN_CLEAR,
        payload: {}
    });
};



export const getChat = (event_id) => async (dispatch) => {
    try {
        const res = await Konnect.post(
            `/v1/chat/messages`,  {
                event_id
            })

        if (res.data.success) {
            dispatch({
                type: types.GET_CHAT_SUCCESS,
                payload: res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: types.GET_CHAT_ERROR,
            payload: error
        })
    }


}


export const getChatInfluencer = (review_id) => async (dispatch) => {
  
    try {
        const res = await Konnect.post(
            `/v1/chat/messages`, {
                review_id
        })
       
        if (res.data.success) {
      
            dispatch({
                type: types.GET_CHAT_INFLUENCER_SUCCESS,
                payload: res.data.message
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_CHAT_INFLUENCER_ERROR,
            payload: error
        })
    }


}

export const saveInfluencerChat = (id, message) => async (dispatch) => {
    try {

        const res = await Konnect.post(
            `/v1/chat/save`, {
            review_id: id,
            message
        })

        if (res.data.success) {

            dispatch({
                type: types.SAVE_CHAT_INFLUENCER_SUCCESS,
                payload: res.data.message
            })
        }


    } catch (error) {

        console.log(error, "ERROR")
        dispatch({
            type: types.SAVE_CHAT_INFLUENCER_ERROR,
            payload: error
        })
    }
}



export const saveChat = (id, message) => async (dispatch) => {
    try {

        const res = await Konnect.post(
            `/v1/chat/save`, {
            event_id: id,
            message
        })

        if (res.data.success) {

            dispatch({
                type: types.SAVE_CHAT_SUCCESS,
                payload: res.data.message
            })
        }


    } catch (error) {

        console.log(error, "ERROR")
        dispatch({
            type: types.SAVE_CHAT_ERROR,
            payload: error
        })
    }
}

