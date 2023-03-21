import { GET_LIVE_EVENTS_BRANDS } from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function liveEventsBrand(state=initialState,action){
    switch(action.type){
        case GET_LIVE_EVENTS_BRANDS:
            return action.payload
        default:
            return state
    }
}