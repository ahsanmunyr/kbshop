import {GET_MY_LIST} from '../../actions/types';

const initialState = {data: []};

export default function myListRed(state = initialState, action) {
  switch (action.type) {
    case GET_MY_LIST:
      return action.payload;
    case 'favPostLike':
      const cState=[...state.data].map(item=>{
        if(item.post_id===action.payload.post_id){
          return {
            ...item,
            postData:{
              ...item.postData,
              children:item.postData.children.map(subItem=>{
                if(subItem.id==action.payload.id){
                  return {...subItem,isFavoriteChild:action.payload.isFavoriteChild}
                }else{
                  return subItem
                }
              })
            }
          }
        }else{
          return item
        }
      })
      return {...state,data:cState}

      case 'FavBrandLike':
        // console.log(action.payload, "====redux====", state)
        const copyState=[...state.data].map(item=>{
          if(item.brand_id===action.payload.brandId){
            return {
              ...item,
              isFavoriteBrand: action.payload.brandLike
            }
          }else{
            return item
          }
        })
        return {...state,data:copyState}
        
         
      // return {
      //   ...state,
      //   data: {
      //     ...state.data,
      //     isFavoriteBrand: action.payload.brandLike,
      //   },
      // };
    default:
      return state;
  }
}
