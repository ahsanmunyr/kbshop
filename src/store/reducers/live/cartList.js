import { GET_CART_LIST} from "../../actions/types";

const initialState={}

export default function cartList(state=initialState,action){
    switch(action.type){
        case GET_CART_LIST:
            return action.payload
        default:
            return state
    }
}