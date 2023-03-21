import {GET_DASHBOARD_DATA} from "../../actions/types";

const initialState={
    share_purchases: [], shop_purchases: []
};

export default function dashboardRed(state=initialState,action){
    switch(action.type){
        case GET_DASHBOARD_DATA:
            console.log(action.payload,"-----getDashboardData redu",)
            return action.payload;
        default:
            return state
    }
}