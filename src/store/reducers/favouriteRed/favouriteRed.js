import {GET_FAVOURITES} from "../../actions/types";

const initialState=[];

export default function favouriteRed(state=initialState,action){
    switch(action.type){
        case GET_FAVOURITES:
            return action.payload;
        default:
            return state
    }
}