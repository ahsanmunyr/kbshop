// @ts-nocheck
import Konnect from "../../config/konnect"
import { GET_CUSTOMER_PURCHASE_LIST, GET_CUSTOMER_PURCHASE_LIST_ERROR } from "./types"

// https://apiv2.konnect.bio/v1/mobile/private/getCustomerPurchaseList?limit=25&from_date=2021-01-01&to_date=2023-01-04&event_type=all&group_by=none
export const getCustomerPurchaseList = (limit = 25, startDate, endDate, eventType, groupBy ) => async (dispatch) => {

    console.log({
        limit: limit,
        from_date: startDate,
        to_date: endDate,
        event_type: eventType,
        group_by: groupBy
    })
    const res = await Konnect.post(`/v1/mobile/private/getCustomerPurchaseList?limit=${limit}&from_date=${startDate}&to_date=${endDate}&event_type=${eventType}&group_by=${groupBy}`, {
        params: {
            from_date: startDate,
            to_date: endDate,
            event_type: eventType,
            group_by: groupBy
        }
    })
    // console.log(res.data.message?.data?.length, "===============================================");
    dispatch({
        type: GET_CUSTOMER_PURCHASE_LIST,
        payload: res.data.message
    })


}
