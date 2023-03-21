import { GET_UPCOMMING_EVENTS, GET_UPCOMMING_EVENTS_LOADMORE } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function upcomingEvents(state = initialState, action) {
    switch (action.type) {
        case GET_UPCOMMING_EVENTS:
            return action.payload
        case GET_UPCOMMING_EVENTS_LOADMORE:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}