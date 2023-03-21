import { GET_ALL_LIKES} from "../../actions/types";

const initialState=""

export default function profileAllLike(state=initialState,action){
    switch(action.type){
        case GET_ALL_LIKES:
            return action.payload
        default:
            return state
    }
}