import {GET_SEARCH_LIST} from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function searhList(state=initialState,action){
    switch(action.type){
        case GET_SEARCH_LIST:
            return action.payload
        default:
            return state
    }
}