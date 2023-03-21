import konnect from "../../config/konnect"
import { GET_ALL_INFLUENCERS } from "./types"


export const getAllInfluencers=(page,name, sort)=>async(dispatch)=>{
    console.log(page,name, sort)
    try{
        const res=await konnect.post('/v1/mobile/category/allInfluencers',{instagram_username:name=="all"?"":name, sort: sort},{
            params:{
                limit:12,
                page
            }
        })
        console.log(res.data?.data, "DADASDASDASASDASd")
        if(res.data?.data.length==0){
            dispatch({type:"InfNotFound"})
        }
        dispatch({
            type:GET_ALL_INFLUENCERS,
            payload:res.data
        })
    }catch(err){
        console.log(err)
    }
}









