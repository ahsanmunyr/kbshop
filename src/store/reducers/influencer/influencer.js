import removeDuplicate from "../../../utils/removeDuplicate";
import {GET_POPULAR_INFLUENCER} from "../../actions/types";

const initialState={
    data:[],
    count:0
};

export default function popularInfluencer(state=initialState,action){
    switch(action.type){
        case GET_POPULAR_INFLUENCER:
            return {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
        case "clearPopularInfluencers":
            return {data:[],count:0}
        default:
            return state
    }
}