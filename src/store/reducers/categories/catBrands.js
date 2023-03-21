import {GET_CAT_BRAND} from "../../actions/types";

const initialState=[];

export default function CatBrands(state=initialState,action){
    switch(action.type){
        case GET_CAT_BRAND:
            return action.payload;
        default:
            return state
    }
}