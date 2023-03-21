import {GET_SELECTED_CATEGORIES} from "../../actions/types";

const initialState=[];

export default function seletedCategories(state=initialState,action){
    switch(action.type){
        case GET_SELECTED_CATEGORIES:
            return action.payload;
        default:
            return state
    }
}