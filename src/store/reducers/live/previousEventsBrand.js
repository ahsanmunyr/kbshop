import { GET_PREVIOUS_EVENT_BRAND, GET_PREVIOUS_EVENT_BRAND_LOADMORE } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function previousEventsBrand(state = initialState, action) {
    switch (action.type) {
        case GET_PREVIOUS_EVENT_BRAND:
            return action.payload
        case GET_PREVIOUS_EVENT_BRAND_LOADMORE:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}