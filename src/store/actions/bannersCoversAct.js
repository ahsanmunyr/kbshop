import konnect from '../../config/konnect';
import {
  GET_BANNERS_COVERS,
  GET_FEATURED_BRANDS,
  GET_BRANDYOULOVE_COVERS,
  GET_HOTDEAL_COVERS
} from './types';

// Get Banner (HPSP-A)
export const getBannersCovers = () => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/category/getBanners');
    dispatch({
      type: GET_BANNERS_COVERS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message,"---++++getBannersCovers");
  }
};

// Get Fetured (HPSP-B)
export const getFeaturedCovers = () => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/category/getFeatured');
    dispatch({
      type: GET_FEATURED_BRANDS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message,"---++++getFeaturedCovers");
  }
};

// Get BrandYouLove (HPSP-C)
export const getBrandYouLoveCovers = () => async dispatch => {
  try {
    const res = await konnect.post('/v1/mobile/category/getLovedBrands');
    dispatch({
      type: GET_BRANDYOULOVE_COVERS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response.data.message,"---++++getBrandYouLoveCovers");
  }
};

// Get HotDeals (HPSP-D)
export const getHotDealsCovers = () => async dispatch => {
    try {
      const res = await konnect.post('/v1/mobile/category/getHotDeals');
      dispatch({
        type: GET_HOTDEAL_COVERS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err.response.data.message,"---++++getHotDealsCovers");
    }
  };
  