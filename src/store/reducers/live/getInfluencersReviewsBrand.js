import { GET_INFLUENCERS_REVIEWS_BRAND, GET_INFLUENCERS_REVIEWS_LOADMORE_BRAND } from "../../actions/types";

const initialState = {
    data: [],
    count: 0
};

export default function getInfluencerReviewsRedBrand(state = initialState, action) {
    switch (action.type) {
        case GET_INFLUENCERS_REVIEWS_BRAND:
            return action.payload
        case GET_INFLUENCERS_REVIEWS_LOADMORE_BRAND:
            return {
                ...action.payload,
                data:[...state.data,...action.payload.data]
            }
        default:
            return state
    }
}