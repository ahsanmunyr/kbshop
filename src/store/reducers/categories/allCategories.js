import {GET_ALL_CATEGORIES} from "../../actions/types";

const initialState={};

export default function allCategories(state=initialState,action){
    switch(action.type){
        case GET_ALL_CATEGORIES:
            return action.payload;
        default:
            return state
    }
}