import {GET_LIVE_PRODUCTS} from "../../actions/types";

const initialState={
};

export default function liveProducts(state=initialState,action){
    switch(action.type){
        case GET_LIVE_PRODUCTS:
            return action.payload
        default:
            return state
    }
}