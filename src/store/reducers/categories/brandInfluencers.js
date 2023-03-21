import {GET_BRANDINFLUENCERS} from "../../actions/types";
import removeDuplicate from "../../../utils/removeDuplicate"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const initialState={
    data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"}]:[{_id:"1"}],
    count:0
};

export default function brandInfluencers(state=initialState,action){
    switch(action.type){
        case GET_BRANDINFLUENCERS:
            return {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
        case "brandInfNotFound":
            const updatedData=[...state.data].map((item,i)=>{
                if(i==(tablet?2:0)){
                    return {_id:"notFound"}
                }else{
                    return item
                }
            })
            return {...state,data:updatedData}
        case "clearBrandInfluencers":
            return {data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"}]:[{_id:"1"}],count:0}
        default:
            return state
    }
}