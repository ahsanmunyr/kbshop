import { GET_PROFILE_DETAIL } from "../../actions/types";

const initialState={
};

export default function profileDetail(state=initialState,action){
    switch(action.type){
        case GET_PROFILE_DETAIL:
            return action.payload
        default:
            return state
    }
}