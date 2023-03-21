import konnect from "../../config/konnect"
import { GET_POPULAR_BRANDS, GET_POPULAR_CATEGORY, GET_POPULAR_INFLUENCER, GET_SEARCH_LIST } from "./types"


export const getPopular = (key,page,categoryId) => async (dispatch) => {
    // console.log("sdfasdfasdfsdfasdfsdaf",key,page,categoryId)
    try {
        const res = await konnect.post('/v1/mobile/category/getPopular', { key,categoryId:categoryId?categoryId:undefined }, {
            params: {
                page,
                limit:8
            }
        })
        if (key == "category") {
            dispatch({
                type: GET_POPULAR_CATEGORY,
                payload: res.data
            })
        }
        else if (key == "brand") {
            dispatch({
                type: GET_POPULAR_BRANDS,
                payload: res.data
            })
        }
        else if (key == "influencer") {
            dispatch({
                type: GET_POPULAR_INFLUENCER,
                payload: res.data
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const getSearchList = (key,name,page) => async (dispatch) => {
    try {
        const res = await konnect.post('/v1/mobile/category/filterCategoryBrandInfluencer', { key,name }, {
            params: {
                page,
                limit:12
            }
        })
        dispatch({
            type:GET_SEARCH_LIST,
            payload:res.data
        })
    } catch (err) {
        console.log(err)
    }
}