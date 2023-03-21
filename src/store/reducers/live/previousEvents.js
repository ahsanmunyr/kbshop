import { GET_PREVIOUS_EVENT, GET_PREVIOUS_EVENT_LOADMORE } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function previousEvents(state = initialState, action) {
    switch (action.type) {
        case GET_PREVIOUS_EVENT:
            return action.payload
        case GET_PREVIOUS_EVENT_LOADMORE:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}