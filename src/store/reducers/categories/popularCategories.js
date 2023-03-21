import {GET_POPULAR_CATEGORY} from "../../actions/types";
import removeDuplicate from "../../../utils/removeDuplicate"

const initialState={
    data:[],
    count:0
};

export default function popularCategories(state=initialState,action){
    switch(action.type){
        case GET_POPULAR_CATEGORY:
            return {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
        case "clearPopularCategories":
            return {data:[],count:0}
        default:
            return state
    }
}