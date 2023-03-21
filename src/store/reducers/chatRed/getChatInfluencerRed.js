import {GET_CHAT_INFLUENCER_SUCCESS, GET_CHAT_INFLUENCER_ERROR} from "../../actions/types";

const initialState={
};

export default function getChatInfluencerRed(state=initialState,action){
    switch(action.type){
        case GET_CHAT_INFLUENCER_SUCCESS:
            return action.payload
        case GET_CHAT_INFLUENCER_ERROR:
            return action.payload
        default:
            return state
    }
}