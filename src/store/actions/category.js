import AsyncStorage from "@react-native-async-storage/async-storage"
import konnect from "../../config/konnect"
import config from "../../config/config"
import { GET_ALL_CATEGORIES, GET_BRANDINFLUENCERS, GET_CATEGORIES, GET_CAT_BRAND, GET_SELECTED_CATEGORIES, GET_STRIP_PRODUCT } from "./types"
import Toast from 'react-native-toast-message';

export const getCategories = (name) => async (dispatch) => {
    try {
        const res = await konnect.post('/v1/mobile/category/parentCategories', { name })
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}
export const getBrandInfluencers = (page, categoryId, name, account_type, sort) => async (dispatch) => {

    try {
        const res = await konnect.post('/v1/mobile/category/allBrands', { categoryId, name: name == "all" ? "" : name, account_type: account_type, sort: sort }, {
            params: {
                limit: 12,
                page
            }
        })
        // console.log(res.data?.data, "SADASASDASDASDASDSD")
        if (res.data?.data.length == 0) {
            dispatch({ type: "brandInfNotFound" })
        }
        dispatch({
            type: GET_BRANDINFLUENCERS,
            payload: res.data
        })
    } catch (err) {
        console.log("aaaa",err?.response?.data)
    }
}


export const getAllCategories = () => async (dispatch) => {
    try {
        const res = await konnect.get('/v1/usercategory/receive')
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const getSelectedCategories = (id) => async (dispatch) => {
    try {
        const res = await konnect.get(`/v1/users/receive/categories?id=${id}`)
        dispatch({
            type: GET_SELECTED_CATEGORIES,
            payload: res.data.message
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateCategories = (categories) => async (dispatch) => {
    const res = await konnect.post(`/v1/usercategory/reserve`, { categories: categories, sort: true })
}

export const getStripeProducts = () => async (dispatch) => {
    try {
        const res = await konnect.post(`/v1/subscribe/config`)
        dispatch({
            type: GET_STRIP_PRODUCT,
            payload: res.data.message
        })
    } catch (err) {
        console.log(err)
    }
}

export const editCategory = (data, cb) => async (dispatch) => {
    // console.log(data)
    const body = new FormData()

    var file = {
        uri: data.img.uri,
        name: data.img.fileName,
        type: data.img.type
    }

    // console.log(file)

    body.append("image", file)
    body.append("category_name", data.category_name);

    const token = await AsyncStorage.getItem('token')
    const configReq = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + token
        },
        body: body,
    };
    fetch(`${config.base_url}/v1/usercategory/revise/${data.category_id}`, configReq)
        .then((checkStatusAndGetJSONResponse) => {
            cb()
            return checkStatusAndGetJSONResponse
        }).catch((err) => { console.log(err) });


}



export const getCatbrands = (categoryId) => async (dispatch) => {
    try {
        const res = await konnect.post(`/v1/mobile/category/campainWiseBrand`, { categoryId })
        dispatch({
            type: GET_CAT_BRAND,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const sendReqToBrand = (brand_id) => async (dispatch) => {
    console.log(brand_id)
    const res = await konnect.post(`/v1/users/marketPlace/requestbrand`, { brand_id })
    return res
}

// check if the selected category doesnot have any post init then it is removeable 
export const verifyUserCategory = (category_id, cb) => async (dispatch) => {
    try {
        const res = await konnect.post('/v1/usercategory/verify', { category_id })
        cb()
        // return res;
    } catch (err) {
        // console.log(err.response,"--------------------------")
        Toast.show({
            type: 'error',
            text1: err?.response?.data?.message,
        });
    }
}