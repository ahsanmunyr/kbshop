import { GET_LIVE_PRODUCT_DETAIL} from "../../actions/types";

const initialState={
};

export default function productDetail(state=initialState,action){
    switch(action.type){
        case GET_LIVE_PRODUCT_DETAIL:
            return action.payload
        default:
            return state
    }
}