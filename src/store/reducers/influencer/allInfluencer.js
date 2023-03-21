import removeDuplicate from "../../../utils/removeDuplicate";
import { GET_ALL_INFLUENCERS } from "../../actions/types";
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const initialState = {
    data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"},{_id:"4"},{_id:"5"}]:[{_id:"1"}],
    count: 0
};

export default function allInfluencers(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_INFLUENCERS:
            return { ...action.payload, data: removeDuplicate([...state.data, ...action.payload.data], "_id") };
        case "InfNotFound":
            const updatedData = [...state.data].map((item, i) => {
                if (i==(tablet?4:0)) {
                    return { _id: "notFound" }
                } else {
                    return item
                }
            })
            return { ...state, data: updatedData }
        case "clearAllInfluencer":
            return {data:tablet?[{_id:"1"},{_id:"2"},{_id:"3"},{_id:"4"},{_id:"5"}]:[{_id:"1"}],count:0}
        default:
            return state
    }
}