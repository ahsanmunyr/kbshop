import konnect from '../../config/konnect';


export const getSubCategoriesDropDown = id => async dispatch => {
  try {
    // https://apiv2.konnect.bio/v1/users/receive/subcategories?category_id=6166e7368d5dd60891f08d43
        console.log(id, "ID")
    const res =  await konnect.get(`/v1/users/receive/subcategories?category_id=${id}`)
    // console.log(res.data?.message, "ACTION++++++++++++++++++++++++")
    // alert("SAD")
    if(res.data?.message?.length > 0){
        return res.data?.message
    }

  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getSubCatt = id => async dispatch => {
  try {
    // https://apiv2.konnect.bio/v1/users/receive/subcategories?category_id=6166e7368d5dd60891f08d43
        console.log(id, "ID")
    const res =  await konnect.get(`/v1/users/receive/subcategories?category_id=${id}`)
    // console.log(res.data?.message, "ACTION++++++++++++++++++++++++")
    // alert("SAD")
    if(res.data?.message?.length > 0){
        return res.data?.message
    }

  } catch (err) {
    console.log(err.response.data.message);
  }
};
