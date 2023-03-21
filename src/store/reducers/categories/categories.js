import {GET_CATEGORIES} from "../../actions/types";

const initialState=[];

export default function categories(state=initialState,action){
    switch(action.type){
        case GET_CATEGORIES:
            return action.payload;
        case "clearAllCategories":
            return []
        default:
            return state
    }
}