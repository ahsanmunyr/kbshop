import {SAVE_CHAT_SUCCESS, SAVE_CHAT_ERROR} from "../../actions/types";

const initialState={
};

export default function saveChatRed(state=initialState,action){
    switch(action.type){
        case SAVE_CHAT_SUCCESS:
            return action.payload
        case SAVE_CHAT_ERROR:
            return action.payload
        default:
            return state
    }
}