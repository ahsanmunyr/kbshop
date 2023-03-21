import {
  BIO_SHOP,
  BIO_SHOP_ERROR,
  BIO_SHOP_POST,
  BIO_SHOP_POST_ERROR,
  BIO_SHOP_POST_LOAD_MORE,
  CATEGORY_TYPE,
  CATEGORY_TYPE_ERROR,
  CATEGORY_TYPE_LOAD_MORE,
  CATEGORY_TYPE_CLEAR_DATA
} from '../../actions/types';
import removeDuplicate from "../../../utils/removeDuplicate";
const initialStateOfBioShop = {
  data: [],
  status: false,
};

const initialStateOfBioPosts = {
  data: [],
  status: false,
  loading: false,
  hasMore: true,
  error: false,
};

const initialCategories = {
  data: [],
  main: 'ALL POSTS',
  otherStatus: false,
  otherData: [],
  hasMore: true,
  loading: false,
  error: false,
};

export function categoriesReducer(state = initialCategories, action) {
  switch (action.type) {
    case CATEGORY_TYPE:
      return action.payload;
    case 'removeItem':
      const data = [...state.otherData].filter(
        item => item.post_id != action.payload,
      );
      return {...state, otherData: [...data]};
    case CATEGORY_TYPE_CLEAR_DATA:
      return action.payload;

      case "categoryChildrenLike":
      const cState=[...state.otherData].map(item=>{
        if(item.post_id===action.payload.post_id){
          return {
            ...item,
              children:item.children.map(subItem=>{
                if(subItem.id==action.payload.id){
                  return {...subItem,isFavoriteChild:action.payload.isFavoriteChild}
                }else{
                  return subItem
                }
              })
          }
        }else{
          return item
        }
      })
      return {...state,otherData:cState}
    case CATEGORY_TYPE_LOAD_MORE:
      return {
        otherData: [...state.otherData, ...action.payload.otherData],
        status: action.payload.status,
        loading: action.payload.loading,
        hasMore: action.payload.hasMore,
        error: action.payload.error,
      };
    case CATEGORY_TYPE_ERROR:
      return action.payload;
    default:
      return state;
  }
}

export function bioShopReducer(state = initialStateOfBioShop, action) {
  switch (action.type) {
    case BIO_SHOP:

      return action.payload;
    case "brandLike":
      return {
        ...state,
        data:{
          ...state.data,
          isFavoriteBrand:action.payload.brandLike
        }
      }


    case BIO_SHOP_ERROR:
      return action.payload;
    default:
      return state;
  }
}
// {...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"_id")};
export function bioShopAllPosts(state = initialStateOfBioPosts, action) {
  switch (action.type) {

    case BIO_SHOP_POST:
      // console.log("my data updated ",action.payload.data, "my data updated ")
      // console.log(action.payload.data,"_---------------BIO_SHOP_POST")
      return {...state,...action.payload,data:removeDuplicate([...state.data,...action.payload.data],"post_id")};
      // return {...state, ...action.payload};
    case BIO_SHOP_POST_ERROR:
      return action.payload;
    case 'removeItem':
      const data = [...state.data].filter(
        item => item.post_id != action.payload,
      );
      return {...state, data: [...data]};
    case "allpostChildLike":
      const cState=[...state.data].map(item=>{
        if(item.post_id===action.payload.post_id){
          return {
            ...item,
              children:item.children.map(subItem=>{
                if(subItem.id==action.payload.id){
                  return {...subItem,isFavoriteChild:action.payload.isFavoriteChild}
                }else{
                  return subItem
                }
              })
          }
        }else{
          return item
        }
      })
      return {...state,data:cState}
    case BIO_SHOP_POST_LOAD_MORE:
      return {
        data:removeDuplicate([...state.data,...action.payload.data],"post_id"),
        // data: [...state.data, ...action.payload.data],
        status: action.payload.status,
        loading: action.payload.loading,
        hasMore: action.payload.hasMore,
        error: action.payload.error,
      };
    case "clearAllPost":
      return  {
        data: [],
        status: false,
        loading: false,
        hasMore: true,
        error: false,
      };
    default:
      return state;
  }
}
