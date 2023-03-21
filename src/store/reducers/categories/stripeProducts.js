import {GET_STRIP_PRODUCT} from "../../actions/types";

const initialState={};

export default function stripeProducts(state=initialState,action){
    switch(action.type){
        case GET_STRIP_PRODUCT:
            return action.payload;
        default:
            return state
    }
}