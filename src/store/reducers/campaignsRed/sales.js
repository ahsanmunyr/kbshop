import removeDuplicate from "../../../utils/removeDuplicate";
import { GET_SALES } from "../../actions/types";

const initialState = {
    message: {
        data: [],
        total_records: 0
    }
};

export default function sales(state = initialState, action) {
    switch (action.type) {
        case GET_SALES:
            return {
                ...action.payload,
                message: {
                    ...action.payload.message,
                    // data: removeDuplicate([...state.message.data, ...action.payload.message.data], "_id")
                    data: [...state.message.data, ...action.payload.message.data]
                }
            };
        case "clearAllSales":
            return {message:{ data: [], total_records: 0 }}
        default:
            return state
    }
}