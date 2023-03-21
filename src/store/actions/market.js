import * as types from './types';
import Konnect from './../../config/konnect';
import axios from 'axios';


export const typeCheck = (typeName) => async dispatch => {
    dispatch({ 
        type: types.MARKET_SELECTED,
        payload: {
          type: typeName
        },
    })
}