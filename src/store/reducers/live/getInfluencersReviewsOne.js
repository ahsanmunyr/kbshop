import { GET_INFLUENCERS_REVIEWS_LOADMORE_ONE, GET_INFLUENCERS_REVIEWS_ONE } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function getInfluencerReviewsOne(state = initialState, action) {
    switch (action.type) {
        case GET_INFLUENCERS_REVIEWS_ONE:
            return action.payload
        case GET_INFLUENCERS_REVIEWS_LOADMORE_ONE:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}