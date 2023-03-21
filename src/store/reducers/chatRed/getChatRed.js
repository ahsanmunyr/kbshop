import {GET_CHAT_SUCCESS, GET_CHAT_ERROR} from "../../actions/types";

const initialState={
};

export default function getChatRed(state=initialState,action){
    switch(action.type){
        case GET_CHAT_SUCCESS:
            return action.payload
        case GET_CHAT_ERROR:
            return action.payload
        default:
            return state
    }
}