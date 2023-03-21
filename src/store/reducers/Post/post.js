import {
  POST_CLEAN,
  GET_POST,
  GET_POST_SHOP,
  POST_CLEAN_SHOP
} from '../../actions/types';

const initialStateOfPost = {};

const initialStateOfShop = {};
  

export function getPostReducer(state = initialStateOfPost, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    case POST_CLEAN:
      return action.payload;
    default:
      return state;
  }
}

export function getPostShopReducer(state = initialStateOfShop, action) {
    switch (action.type) {
      case GET_POST_SHOP:
        return action.payload;
      case POST_CLEAN_SHOP:
        return action.payload;
      default:
        return state;
    }
  }
  

