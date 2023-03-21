import {GET_LIVE_EVENTS} from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function liveEvents(state=initialState,action){
    switch(action.type){
        case GET_LIVE_EVENTS:
            return action.payload
        default:
            return state
    }
}