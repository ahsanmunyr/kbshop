import removeDuplicate from "../../../utils/removeDuplicate";
import {GET_POPULAR_BRANDS} from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function popularBrands(state=initialState,action){
    switch(action.type){
        case GET_POPULAR_BRANDS:
            return {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
        case "clearFeaturedBrands":
            return {data:[],count:0}
        default:
            return state
    }
}