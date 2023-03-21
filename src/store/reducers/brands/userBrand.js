import {GET_USER_BRAND} from "../../actions/types";

const initialState=[]

export default function userBrand(state=initialState,action){
    switch(action.type){
        case GET_USER_BRAND:
            return action.payload
        default:
            return state
    }
}