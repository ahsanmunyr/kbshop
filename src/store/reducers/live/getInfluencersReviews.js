import { GET_INFLUENCERS_REVIEWS, GET_INFLUENCERS_REVIEWS_LOADMORE } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function getInfluencerReviewsRed(state = initialState, action) {
    switch (action.type) {
        case GET_INFLUENCERS_REVIEWS:
            return action.payload
        case GET_INFLUENCERS_REVIEWS_LOADMORE:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}