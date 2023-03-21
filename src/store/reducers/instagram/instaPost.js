import removeDuplicate from "../../../utils/removeDuplicate";
import { GET_INSTA_POST } from "../../actions/types";

const initialState = {
    data: [],
    paging: {}
};

export default function instaPost(state = initialState, action) {
    switch (action.type) {
        case GET_INSTA_POST:
            return { ...action.payload, data: removeDuplicate([...state.data, ...action.payload.data], "id") };
        case "saveBioPost":
            const data = [...state.data].map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
            return { ...state, data }
        case "removeBioPost":
            const data1 = [...state.data].map(item => {
                if (item.id == action.payload.id) {
                    return {
                        caption: item.caption,
                        id: item.id,
                        media_type: item.media_type,
                        media_url: item.media_url,
                        timestamp: item.timestamp,
                        username: item.username
                    }
                } else {
                    return item
                }
            })
            return { ...state, data: data1 }
        case "clearInstaPost":
            return { data: [], paging: {} }
        default:
            return state
    }
}