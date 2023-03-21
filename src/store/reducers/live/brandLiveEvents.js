import {GET_BRAND_LIVE_EVENTS} from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function brandLiveEvents(state=initialState,action){
    switch(action.type){
        case GET_BRAND_LIVE_EVENTS:
            return action.payload
        default:
            return state
    }
}