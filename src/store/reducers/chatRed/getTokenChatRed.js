import {GET_CHAT_TOKEN, GET_CHAT_TOKEN_ERROR, GET_CHAT_TOKEN_CLEAR } from "../../actions/types";

const initialState={
};

export default function getChatTokenRed(state=initialState,action){
    switch(action.type){
        case GET_CHAT_TOKEN:
            return action.payload
        case GET_CHAT_TOKEN_CLEAR:
            return action.payload
        case GET_CHAT_TOKEN_ERROR:
            return action.payload
        default:
            return state
    }
}
