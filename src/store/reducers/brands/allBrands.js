import removeDuplicate from "../../../utils/removeDuplicate";
import {GET_ALL_BRANDS} from "../../actions/types";
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const initialState={
    data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"}]:[{_id:"1"}],
    count:0
};

export default function allBrands(state=initialState,action){
    switch(action.type){
        case GET_ALL_BRANDS:
            return {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
        case "brandNotFound":
           const updatedData=[...state.data].map((item,i)=>{
                if(i==(tablet?2:0)){
                    return {_id:"notFound"}
                }else{
                    return item
                }
            })
            return {...state,data:updatedData}
        case "clearAllBrands":
            return {data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"}]:[{_id:"1"}],count:0}
        default:
            return state
    }
}