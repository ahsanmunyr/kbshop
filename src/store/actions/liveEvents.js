import AsyncStorage from "@react-native-async-storage/async-storage"
import Konnect from "../../config/konnect"
import { GET_LIKES, GET_LIKES_ERROR, POST_LIKES, POST_LIKES_ERROR, GET_BRAND_LIVE_EVENTS, GET_CART_LIST, GET_LIVE_EVENTS, GET_LIVE_PRODUCTS, GET_LIVE_PRODUCT_DETAIL, GET_UPCOMMING_EVENTS, LIVE_PRODUCTS, GET_HOST_EVENTS, IS_HOST_EVENT_LIVE, GET_PREVIOUS_EVENT, GET_PREVIOUS_EVENTS_ITEM, GET_INFLUENCERS_REVIEWS, GET_PREVIOUS_EVENT_LOADMORE, GET_UPCOMMING_EVENTS_LOADMORE, GET_INFLUENCERS_REVIEWS_LOADMORE, GET_PREVIOUS_EVENT_BRAND_LOADMORE, GET_PREVIOUS_EVENT_BRAND, GET_LIVE_EVENTS_BRANDS, GET_PROFILE_DETAIL, GET_INFLUENCERS_REVIEWS_LOADMORE_BRAND, GET_INFLUENCERS_REVIEWS_BRAND, GET_INFLUENCERS_REVIEWS_LOADMORE_ONE, GET_INFLUENCERS_REVIEWS_ONE, GET_ALL_LIKES } from "./types"



export const getUpcommingEvents = (page, id, brand, loadMore) => async (dispatch) => {
    try {
        const res = await Konnect.post(`/v1/public/events/upcoming`, { ids: id, brand: brand }, {
            params: {
                limit: 8,
                page
            }
        })
        if (loadMore == "loadMore") {
            dispatch({
                type: GET_UPCOMMING_EVENTS_LOADMORE,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: GET_UPCOMMING_EVENTS,
                payload: res.data.message
            })
        }
    } catch (eerr) {
        console.log(eerr, "eerreerreerreerr")
    }
}

export const getPreviousEvents = (page, id, brand, loadMore,like) => async (dispatch, getState) => {
    console.log("like",like)
    try {
        const res = await Konnect.post(`/v1/public/events/published`, { ids: id, brand: brand,sort_by:like?like:undefined }, {
            params: {
                limit: 8,
                page,
                user: getState()?.authRed?.data?._id
            }
        })
        // console.log("getPreviousEvents",res.data.message.data )
        if (loadMore == "loadMore") {
            if (brand) {
                dispatch({
                    type: GET_PREVIOUS_EVENT_BRAND_LOADMORE,
                    payload: res.data.message
                })
            } else {
                dispatch({
                    type: GET_PREVIOUS_EVENT_LOADMORE,
                    payload: res.data.message
                })
            }
        } else {
            if (brand) {
                dispatch({
                    type: GET_PREVIOUS_EVENT_BRAND,
                    payload: res.data.message
                })
            } else {
                dispatch({
                    type: GET_PREVIOUS_EVENT,
                    payload: res.data.message
                })
            }
        }

    } catch (eerr) {
        console.log(eerr, "eerreerreerreerr")
    }
}


export const getLiveEvents = (page, id, brand) => async (dispatch) => {
    try {
        const res = await Konnect.post(`/v1/public/events/live`, { ids: id, brand: brand }, {
            params: {
                limit: 40,
                page
            }
        })
        if (brand) {
            dispatch({
                type: GET_LIVE_EVENTS_BRANDS,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: GET_LIVE_EVENTS,
                payload: res.data.message
            })
        }
    } catch (eerr) {
        console.log(eerr, "eerreerreerreerr")
    }
}

export const getInfluencersReviews = (page = 1, id, brand, loadMore) => async (dispatch) => {
    try {
        console.log("page22222", id)
        const res = await Konnect.post(`v1/public/reviews/published`, { category_id: id }, {
            params: {
                page: page,
                limit: 8
            }
        })

        console.log(res.data.message?.data?.length, "length")
        if (loadMore == "loadMore") {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS_LOADMORE,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS,
                payload: res.data.message
            })
        }

    } catch (err) {
        console.log(err, "error")
    }
}
export const getInfluencersReviewsOne = (page = 1, id, inf, loadMore, brand_id, is_id) => async (dispatch) => {
    // console.log('dddddddd',id,brand_id)
    console.log({ [is_id ? "influencer_id" : "instagram_username"]: inf, category_id: id, brand_id })
    try {
        // console.log("page",inf)
        const res = await Konnect.post(`v1/public/reviews/getinfluencermedia`, { [is_id ? "influencer_id" : "instagram_username"]: inf, category_id: id, brand_id }, {
            params: {
                page: page,
                limit: 8
            }
        })

        console.log(res.data.message?.data?.length, "length my")
        if (loadMore == "loadMore") {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS_LOADMORE_ONE,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS_ONE,
                payload: res.data.message
            })
        }

    } catch (err) {
        console.log(err, "errorinfluencer")
    }
}

export const getInfluencersReviewsBrand = (page = 1, id, brand, loadMore) => async (dispatch) => {
    try {
        console.log("page", id, brand)
        const res = await Konnect.post(`v1/public/reviews/published`, { brand, category_id: id }, {
            params: {
                page: page,
                limit: 8
            }
        })

        // console.log(res.data.message?.data?.length, "length")
        if (loadMore == "loadMore") {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS_LOADMORE_BRAND,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: GET_INFLUENCERS_REVIEWS_BRAND,
                payload: res.data.message
            })
        }

    } catch (err) {
        console.log(err, "error")
    }
}

export const getBrandLiveEvents = (page, username, id) => async (dispatch) => {
    // console.log(id, "++++++++++++++++++++++++++++++++++++++++++++++++++++")
    try {
        const res = await Konnect.post(`/v1/public/events/getBrandLiveEvents`, { ids: id, username }, {
            params: {
                limit: 40,
                page
            }
        })
        // console.log(res.data.message.data.length, "{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}")
        dispatch({
            type: GET_BRAND_LIVE_EVENTS,
            payload: res.data.message
        })
    } catch (eerr) {
        console.log(eerr, "eerreerreerreerr")
    }
}

export const getProducts = (id) => async (dispatch) => {
    console.log("called--------------------------------------------------------------")
    try {
        const res = await Konnect.get(`/v1/public/events/getOneScheduleEvent/${id}`)
        dispatch({
            type: GET_LIVE_PRODUCTS,
            payload: res.data.message
        })
    } catch (eerr) {
        console.log(eerr, "eerreerreerreerr")
    }

}

export const getPreviousEventsItem = (id, userID) => async (dispatch) => {
    try {
        const res = await Konnect.get(`/v1/public/events/getOneScheduleEvent/${id}?user=${userID}`)
        dispatch({
            type: GET_PREVIOUS_EVENTS_ITEM,
            payload: res.data.message
        })
    } catch (Err) {
        console.log(Err, "ERROR 1")
    }
}

export const getProductDetail = (data) => async (dispatch) => {
    try {
        console.log(data, "getProductDetail==================== ERROR 2");
        const res = await Konnect.post(`/v1/shopify/getproduct`, data)
        // console.log("deta",res.data)
        dispatch({
            type: GET_LIVE_PRODUCT_DETAIL,
            payload: res.data.message
        })
    } catch (Err) {
        console.log(Err, "ERROR 2")
    }
}

export const checkoutProduct = (data) => async (dispatch) => {
    // console.log("data",data)
    // console.log("sdfsdf",data.line_item[0].)
    try {
        const res = await Konnect.post(`/v1/shopify/addtocart`, data)
        return res.data
    } catch (Err) {
        console.log(Err, "ERROR 3")
    }
}

export const getCartList = (brand) => async (dispatch) => {
    try {
        const res = await Konnect.post(`/v1/shopify/getcart`, { brand })
        // console.log("deta232",res.data)
        dispatch({
            type: GET_CART_LIST,
            payload: res.data.message
        })
        return res
    } catch (err) {
        dispatch({
            type: GET_CART_LIST,
            payload: {}
        })
        console.log("eee", err?.response)
    }
}


export const checkoutProductFinal = (brand) => async (dispatch) => {
    try {
        const res = await Konnect.post(`/v1/shopify/getcheckout`, { brand })
        // console.log(res.data, "=============checkoutProductFinal==================")
        return res.data
    } catch (Err) {
        console.log(Err, "ERROR 4")
    }
}

export const removeCart = (data) => async (dispatch) => {
    // alert(data.variant_id)
    // console.log("data",data)
    // console.log("sdfsdf",data.line_item[0].)
    try {
        const res = await Konnect.post(`/v1/shopify/removefromcart`, data)
        return res.data
    } catch (Err) {
        console.log(Err, "ERROR 5")
    }
}

export const getAllHostEvents = (status) => async (dispatch) => {
    try {
        const res = await Konnect.get(`/v1/events/getallevents?limit=${40}&page=${1}&status=${status}`)
        dispatch({
            type: GET_HOST_EVENTS,
            payload: res.data.message
        })
    } catch (Err) {
        console.log(Err, "ERROR 6")
    }
}

export const getIsHostEventLive = (event_id) => async (dispatch) => {
    try {
        const res = await Konnect.get(`/v1/events/getoneevent/${event_id}`)
        // console.log("action")
        dispatch({
            type: IS_HOST_EVENT_LIVE,
            payload: res.data.message[0]
        })
    } catch (Err) {
        console.log(Err, "ERROR 7")
    }
}

export const getProfileDetails = (user) => async (dispatch) => {
    try {
        const res = await Konnect.post(`https://apiv2.konnect.bio/v1/public/graph/ig/user`, { user })
        // console.log("action")
        dispatch({
            type: GET_PROFILE_DETAIL,
            payload: res.data.message
        })
    } catch (Err) {
        dispatch({
            type: GET_PROFILE_DETAIL,
            payload: {}
        })
        console.log(Err.response?.data, "ERROR 8")
    }
}

export const like = (id,brand,review) => async (dispatch) => {
    console.log(id,brand)
    // console.log(review?{
    //     reviews_id: id,
    //     brand
    // }:{
    //     event_id: id,
    //     brand
    // })
    try {
        const res = await Konnect.post(`/v1/likes/save`, review?{
            review_id: id,
            brand
        }:{
            event_id: id,
            brand
        })
        // console.log("action", res.data.message)

        return res.data.message

        // dispatch({
        //     type: POST_LIKES,
        //     payload: res.data.message
        // })
    } catch (Err) {
        dispatch({
            type: POST_LIKES_ERROR,
            payload: {}
        })
        console.log(Err?.response?.data, "ERROR 9")
    }
}

export const likeGet = (id,review) => async (dispatch) => {
    console.log("ddd",id)
    try {
        const res = await Konnect.post(`/v1/likes/get`, review?{
            review_id: id
        }:{
            event_id: id
        })
        console.log("action", res.data.message)
        return res.data.message
        // dispatch({
        //     type: GET_LIKES,
        //     payload: res.data.message
        // })
    } catch (Err) {
        dispatch({
            type: GET_LIKES_ERROR,
            payload: {}
        })
        console.log(Err?.response?.data, "ERROR 10")
    }
}

export const getProfileLike = (id) => async (dispatch) => {

    try {
        const res = await Konnect.post(`/v1/public/reviews/profilecount`, {
            brand_id: id
        })
        // console.log("action", id,res.data)
        dispatch({
            type: GET_ALL_LIKES,
            payload: res.data.message
        })
    } catch (Err) {
        console.log(Err?.response?.data, "profileAllLike")
    }

}