import konnect from '../../config/konnect';
import { ADD_CAMPAIGN, CAMPAIGN_PAUSE, GET_CAMPAIGNS, GET_SALES, REMOVE_CAMPAIGN_FROM_UI } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet() 

export const getCampaigns = (key, page_no, id, catId,sort_by) => async dispatch => {
  console.log({catId,sort_by }, 'PPPPPPPPPPPPPPPPPPPPPPPPPPP');
  // alert("caaaaaaaaaaaalllllllllllllllll")
  try {
    const res = await konnect.post(
      `/v1/users/marketPlace/getCampaigns`,
      {
        brand_id: id ? id : "all",
        category_id: catId ? catId : 'all',
        end_date: '2023-03-25',
        key: key,
        order_by: 'desc',
        sort_by: sort_by ? sort_by :'date',
        start_date: '2022-03-25',
      },
      {
        params: {
          limit: tablet?9:8,
          page: page_no,
        },
      },
    );
    // console.log('get all campaigns', res.data);
    // dispatch({
    //   type: GET_CAMPAIGNS,
    //   payload: res.data,
    // });
    // console.log(res.data.message, "------->>>>>>>>>>")
    dispatch({
      type: GET_CAMPAIGNS,
      payload: {
        data: res.data.message,
        pagination: res.data.pagination,
        totalCount: res.data.totalCount,
      },
    });
  } catch (e) {
    dispatch({
      type: GET_CAMPAIGNS,
      payload: {
        data: [],
        pagination: "",
        totalCount: 0,
      },
    });
    console.log(e);
  }
};

export const getPausedCampaigns = (key, page_no) => async dispatch => {
  try {
    const res = await konnect.post(
      `/v1/users/marketPlace/getAllPusedCampaignPost`,
      {
        brand_id: 'all',
        category_id: 'all',
        end_date: '2023-03-25',
        key: key,
        order_by: 'desc',
        sort_by: 'commission',
        start_date: '2022-03-25',
      },
      {
        params: {
          limit: tablet?9:8,
          page: page_no,
        },
      },
    );
    console.log(res.data, "paused capaign")
    // dispatch({
    //   type: GET_CAMPAIGNS,
    //   payload: res.data,
    // });
    dispatch({
      type: GET_CAMPAIGNS,
      payload: {
        data: res.data.message,
        pagination: res.data.pagination,
        totalCount: res.data.totalCount,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const active_inactive_campaign =
  (campaign_id, is_active, cb) => async dispatch => {
    try {
      const res = await konnect.post(
        `/v1/users/marketPlace/pauseAndResumeCampaignPost`,
        {
          campaign_id,
          is_active: is_active ? false : true,
        },
      );
      console.log(res.data)
      if (is_active) {
        dispatch({
          type: REMOVE_CAMPAIGN_FROM_UI,
          payload: campaign_id,
        });
      } else {
        dispatch({
          type: CAMPAIGN_PAUSE,
          payload: campaign_id,
        });
      }

    } catch (e) {
      console.log(e);
      cb ? cb(e.response.data.message) : null
    }
  };

export const add_campaign = (data, cb) => async dispatch => {
  // advertiser_id: "62176a7bf46bf62280d45720"
  // campaign_id: "6238775b10ef0c2d48c43f88"
  // category_id: "62176c05f46bf62280d458c4"
  // /v1/users/marketPlace/campaignPost
  try {
    console.log(
      data.user_id,
      data.campaign_id,
      data.category_id,
      'add_campaign action',
    );
    const res = await konnect.post(`/v1/users/marketPlace/campaignPost`, {
      advertiser_id: data.user_id,
      campaign_id: data.campaign_id,
      category_id: data.category_id,
    });
    dispatch({
      type: ADD_CAMPAIGN,
      payload: data.campaign_id,
    });
  } catch (e) {
    console.log(e.response.data.message, "ttttttttttttttttttttttttttttttttttt");
    cb ? cb(e.response.data.message) : null

  }
};


export const getSales = (page, group_by, startDate, endDate) => async (dispatch) => {

  // console.log(page, group_by, startDate, endDate)
  try {
    const res = await konnect.post(`/v1/users/marketPlace/getearning?from_date=${startDate}&to_date=${endDate}`, {}, {
      params: {
        group_by,
        limit: 8,
        page
      }
    })
    // console.log(res.data)
    dispatch({
      type: GET_SALES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
