// @ts-nocheck
import * as types from './types';
import Konnect from './../../config/konnect';


function addChild(arr) {
  return arr.map(item => {
    if (item.media_type == "VIDEO" && item.children.length == 0) {
      return {
        ...item,
        children: [
          {
            ProductName: "",
            ProductSku: "",
            ProductUrl: item.redirected_url,
            coordinates: [],
            id: item.post_id,
            media_type: "VIDEO",
            imgid: "",
            media_url: item.media_url,
            productAmount: "",
            productCategory: "",
            productDesc: "",
            productPromoCodeDscs: "0%",
            productPromoCodePromo: "KB0",
            skuDataOther: "",
          }
        ]
      }
    } else {
      return item
    }
  })
}

export const bioShopClearSub = () => async dispatch => {

  dispatch({
    type: types.BIO_SHOP_POST_ERROR,
    payload: {
      data: [],
      status: false,
      loading: false,
      hasMore: false,
      error: true,
    },
  });
  dispatch({
    type: types.CATEGORY_TYPE,
    payload: {
      data: [],
      main: null,
      otherStatus: false,
      otherData: [],
      hasMore: false,
      loading: false,
      error: false,
    },
  });
  dispatch({
    type: types.CATEGORY_TYPE_ERROR,
    payload: {
      data: [],
      main: 'ALL POSTS',
      otherStatus: false,
      otherData: [],
      hasMore: true,
      loading: false,
      error: true,
    },
  });


};

export const bioShopClear = () => async dispatch => {
  dispatch({
    type: types.BIO_SHOP,
    payload: {
      data: [],
      status: false,
    },
  });
  dispatch({
    type: types.BIO_SHOP_POST_ERROR,
    payload: {
      data: [],
      status: false,
      loading: false,
      hasMore: false,
      error: true,
    },
  });
  dispatch({
    type: types.CATEGORY_TYPE,
    payload: {
      data: [],
      main: null,
      otherStatus: false,
      otherData: [],
      hasMore: false,
      loading: false,
      error: false,
    },
  });
  dispatch({
    type: types.CATEGORY_TYPE_ERROR,
    payload: {
      data: [],
      main: 'ALL POSTS',
      otherStatus: false,
      otherData: [],
      hasMore: true,
      loading: false,
      error: true,
    },
  });
};

export const categoryDataClear = () => dispatch => {
  dispatch({
    type: types.CATEGORY_TYPE_CLEAR_DATA,
    payload: {
      data: [],
      main: '',
      otherStatus: true,
      otherData: [],
      hasMore: false,
      loading: false,
      error: false,
    },
  });
};

export const bioShopPostClear = () => async dispatch => {
  dispatch({
    type: types.BIO_SHOP_POST_ERROR,
    payload: {
      data: [],
      status: false,
      loading: false,
      hasMore: false,
      error: true,
    },
  });
};
export const getBioShopData = user => async dispatch => {
  try {
    const response = await Konnect.get(`/v1/profile/userinfo/${user}`);
    if (response.data.success) {
      dispatch({
        type: types.BIO_SHOP,
        payload: {
          data: response.data.message.data,
          status: true,
        },
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: types.BIO_SHOP_ERROR,
      payload: {
        data: [],
        status: false,
      },
    });
  }
};





export const getAllPost =
  (user, limit, page, postType, shop, sub) => async dispatch => {
    console.log(user, limit, page, postType, shop, sub, "======================================")
    try {
      // alert(sub)

      var response
      if (sub == 'date' || sub == undefined) {

        response = await Konnect.get(
          `/v1/profile/posts/${user}?limit=${limit}&page=${page}&post_type=${postType}&source=${shop}&sort_by=`,
        );
      } else {

        response = await Konnect.get(
          `/v1/profile/posts/${user}?limit=${limit}&page=${page}&post_type=${postType}&source=${shop}&sort_by=${sub}`,
        );
      }
      if (response.data.success) {
        //  console.log(response.data.message.result.data, "==============getAllPost==============");
        if (
          response.data.message.result.data.length > 0 &&
          response.data.message?.result?.next?.page
        ) {
          // console.log(response.data.message.result.data, "BIOSHOP DATA")
          if (page == 1) {
            console.log('BIO_SHOP_POST')
            dispatch({
              type: types.BIO_SHOP_POST,
              payload: {
                data: addChild(response.data.message.result.data),
                status: true,
                loading: false,
                hasMore: true,
                error: false,
              },
            });
          } else {
            console.log('BIO_SHOP_POST_LOAD_MORE')
            dispatch({
              type: types.BIO_SHOP_POST_LOAD_MORE,
              payload: {
                data: addChild(response.data.message.result.data),
                status: true,
                loading: false,
                hasMore: true,
                error: false,
              },
            });
          }
        } else {
          dispatch({
            type: types.BIO_SHOP_POST_LOAD_MORE,
            payload: {
              data: addChild(response.data.message.result.data),
              status: true,
              loading: false,
              hasMore: false,
              error: false,
            },
          });
        }
      }
    } catch (e) {
      dispatch({
        type: types.BIO_SHOP_POST_ERROR,
        payload: {
          data: [],
          status: false,
          loading: false,
          hasMore: false,
          error: true,
        },
      });
    }
  };

export const getAllPostBasedOnSubCat =
  (shop, childiId, page, parentID, name, postType, sub) => async dispatch => {
    try {
      console.log({ shop, childiId, page, parentID });

      let response;
      if (childiId === null) {

        let link1
        if (sub == 'date' || sub == undefined) {
          link1 = postType ? `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&source=shop&post_type=${postType}` : `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&source=shop&sort_by=`
          response = await Konnect.get(
            link1
          );
        } else {
          link1 = postType ? `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&source=shop&post_type=${postType}` : `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&source=shop&sort_by=${sub}`
          response = await Konnect.get(
            link1
          );
        }


      } else {

        let link2
        if (sub == 'date' || sub == undefined) {
          link2 = postType ? `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&sub_id=${childiId}&sort_by=&source=shop&post_type=${postType}` : `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&sub_id=${childiId}&sort_by=&source=shop`
          response = await Konnect.get(
            link2
          );
        } else {
          link2 = postType ? `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&sub_id=${childiId}&sort_by=${sub}&source=shop&post_type=${postType}` : `/v1/profile/filter/${shop}?limit=20&page=${page}&id=${parentID}&sub_id=${childiId}&sort_by=${sub}&source=shop`
          response = await Konnect.get(
            link2
          );

        }
      }

      if (response.data.success) {

        if (
          response.data.message.result.data.length > 0 &&
          response.data.message?.result?.next?.page
        ) {
          if (page == 1) {
            dispatch({
              type: types.CATEGORY_TYPE,
              payload: {
                data: [],
                main: name,
                otherStatus: true,
                otherData: addChild(response.data.message.result.data),
                hasMore: false,
                loading: false,
                error: false,
              },
            });
          } else {

            dispatch({
              type: types.CATEGORY_TYPE_LOAD_MORE,
              payload: {
                data: [],
                main: name,
                otherStatus: true,
                otherData: addChild(response.data.message.result.data),
                hasMore: true,
                loading: false,
                error: false,
              },
            });
          }
        } else {
          dispatch({
            type: types.CATEGORY_TYPE_LOAD_MORE,
            payload: {
              data: [],
              main: name,
              otherStatus: true,
              otherData: addChild(response.data.message.result.data),
              hasMore: false,
              loading: false,
              error: false,
            },
          });
        }
      }
    } catch (e) {
      // dispatch({
      //   type: types.BIO_SHOP_POST_ERROR,
      //   payload: {
      //     data: [],
      //     status: false,
      //     loading: false,
      //     hasMore: false,
      //     error: true,
      //   },
      // });
    }
  };

export const categoriesSelected = (id, name, user, page, postType1, sub) => async dispatch => {

  try {
    console.log(id, name, user, page, postType1, sub, "{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}");
    if (name == 'PROFILE') {
      dispatch({
        type: types.CATEGORY_TYPE,
        payload: {
          data: [],
          main: name,
          otherStatus: false,
          otherData: [],
          hasMore: false,
          loading: false,
          error: false,
        },
      });
    }
    if (name == 'ALL POSTS') {
      // dispatch({
      //   type:"clearAllPost",
      // });
      dispatch({
        type: types.CATEGORY_TYPE,
        payload: {
          data: [],
          main: name,
          otherStatus: false,
          otherData: [],
          hasMore: false,
          loading: false,
          error: false,
        },
      });
      // alert("ALL POST")
      try {
        const postType = postType1 ? postType1 : 'image,campaign,video';
        const shop = 'shop';
        const limit = '20';
        // console.log(id, name, user, page, limit);

        let response
        if (sub == 'date' || sub == undefined) {

          response = await Konnect.get(
            `/v1/profile/posts/${user}?limit=${limit}&page=${page}&post_type=${postType}&source=${shop}&sort_by=`,
          );
        } else {

          response = await Konnect.get(
            `/v1/profile/posts/${user}?limit=${limit}&page=${page}&post_type=${postType}&source=${shop}&sort_by=${sub}`,
          );
        }

        // const response = await Konnect.get(
        //   `/v1/profile/posts/${user}?limit=${limit}&page=${page}&post_type=${postType}&source=${shop}&sort_by=`,
        // );

        if (response.data.success) {
          if (
            response.data.message.result.data.length > 0 &&
            response.data.message?.result?.next?.page
          ) {
          
            if (page == 1) {
              dispatch({
                type: types.BIO_SHOP_POST,
                payload: {
                  data: addChild(response.data.message.result.data),
                  status: true,
                  loading: false,
                  hasMore: true,
                  error: false,
                },
              });
            } else {
              dispatch({
                type: types.BIO_SHOP_POST_LOAD_MORE,
                payload: {
                  data: addChild(response.data.message.result.data),
                  status: true,
                  loading: false,
                  hasMore: true,
                  error: false,
                },
              });
            }
          } else {
            dispatch({
              type: types.BIO_SHOP_POST_LOAD_MORE,
              payload: {
                data: addChild(response.data.message.result.data),
                status: true,
                loading: false,
                hasMore: false,
                error: false,
              },
            });
          }
        }
      } catch (e) {
        console.log(e);
        dispatch({
          type: types.BIO_SHOP_POST_ERROR,
          payload: {
            data: [],
            status: false,
            loading: false,
            hasMore: false,
            error: true,
          },
        });
      }
    }
    if (name == 'LINKS') {
      const postType = 'link';
      const source = 'shop';
      dispatch({
        type: types.CATEGORY_TYPE,
        payload: {
          data: [],
          main: name,
          otherStatus: false,
          otherData: [],
          hasMore: false,
          loading: false,
          error: false,
        },
      });
      // alert('ahsan');
      // const url = `/v1/profile/posts/${user}&post_type=${postType}&source=${source}&sort_by=`;

      let response
      if (sub == 'date' || sub == undefined) {

        response = await Konnect.get(
          `/v1/profile/posts/${user}?post_type=${postType}&source=${source}&sort_by=`,
        );
      } else {

        response = await Konnect.get(
          `/v1/profile/posts/${user}?post_type=${postType}&source=${source}&sort_by=${sub}`,
        );
      }


      // const response = await Konnect.get(
      //   `/v1/profile/posts/${user}?post_type=${postType}&source=${source}&sort_by=`,
      // );
      if (response.data.success) {
        if (response.data.message.result.data.length > 0) {
          dispatch({
            type: types.CATEGORY_TYPE,
            payload: {
              data: response.data.message.result.data,
              main: name,
              otherStatus: false,
              otherData: [],
              hasMore: false,
              loading: false,
              error: false,
            },
          });
        } else {
          dispatch({
            type: types.CATEGORY_TYPE,
            payload: {
              data: [],
              main: name,
              otherStatus: false,
              otherData: [],
              hasMore: false,
              loading: false,
              error: false,
            },
          });
        }
      }
    }

    if (name == 'VIDEOS') {
      // alert("ASDASDASD")
      // alert("VIDEOS")
      // console.log(id, "idididididididididididididididididididididididid")
      const limit = 18;
      const shop = 'shop';
      if (user) {

        let response
        if (sub == 'date' || sub == undefined) {
          // alert("YOUR 1")
          response = await Konnect.get(
            `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=video&sort_by=&source=${shop}`,
          );
        } else {
          // alert("YOUR 2")
          // console.log("==================================", sub, "==================================")
          response = await Konnect.get(
            `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=video&sort_by=${sub}&source=${shop}`,
          );
          // console.log(`/v1/profile/posts/${user}?limit=${limit}&page=${page}&id=${id}&post_type=video&sort_by=${sub}&source=${shop}`)
        }

        // /v1/profile/posts/dl1961denim?limit=18&page=1&id=6399c501a82ce2b482b5a0fc&post_type=video&sort_by=referralfee&source=shop
        // /v1/profile/filter/dl1961denim?limit=18&page=1&id=6399c501a82ce2b482b5a0fc&post_type=video&sort_by=referralfee&source=shop

        if (response.data.success) {
          console.log(response.data.message.result.data.length, "==============LENGTH")
          // console.log(page, 'page number');
          if (
            response.data.message.result.data.length > 0 &&
            response.data.message?.result?.next?.page
          ) {
            if (page == 1) {
              // alert("DATA")
              // console.log(response.data.message.result.data[1]?.children[0], "==========================")
              dispatch({
                type: types.CATEGORY_TYPE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: false,
                  loading: false,
                  error: false,
                },
              });
            } else {
              dispatch({
                type: types.CATEGORY_TYPE_LOAD_MORE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: true,
                  loading: false,
                  error: false,
                },
              });
            }
          } else {
            dispatch({
              type: types.CATEGORY_TYPE_LOAD_MORE,
              payload: {
                data: [],
                main: name,
                otherStatus: true,
                otherData: addChild(response.data.message.result.data),
                hasMore: false,
                loading: false,
                error: false,
              },
            });
          }
        }
      }
    }


    if (name == 'POSTS') {
      // console.log(id, "idididididididididididididididididididididididid")
      const limit = 18;
      const shop = 'shop';
      if (user) {

        let response
        if (sub == 'date' || sub == undefined) {
   
          response = await Konnect.get(
            `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image&sort_by=&source=${shop}`,
          );
        } else {

          response = await Konnect.get(
            `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image&sort_by=${sub}&source=${shop}`,
          );
        }


        if (response.data.success) {
         
            console.log(response.data.message.result.data.length, "===================LENGTH");
          if (
            response.data.message.result.data.length > 0 &&
            response.data.message?.result?.next?.page
          ) {
            if (page == 1) {

              // console.log(response.data.message.result.data, "===========ACTION===============")
              dispatch({
                type: types.CATEGORY_TYPE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: false,
                  loading: false,
                  error: false,
                },
              });
            } else {
              dispatch({
                type: types.CATEGORY_TYPE_LOAD_MORE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: true,
                  loading: false,
                  error: false,
                },
              });
            }
          } else {
            dispatch({
              type: types.CATEGORY_TYPE_LOAD_MORE,
              payload: {
                data: [],
                main: name,
                otherStatus: true,
                otherData: addChild(response.data.message.result.data),
                hasMore: false,
                loading: false,
                error: false,
              },
            });
          }
        }
      }
    }

    if (name != 'LINKS' && name != 'ALL POSTS' && name != 'PROFILE' && name != "VIDEOS" && name != 'POSTS') {
      const limit = 18;
      const shop = 'shop';
      console.log({postType1});
      if (postType1 == 'image') {
       
        let link
        if (sub == 'date' || sub == undefined) {

          link = postType1 ? `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image&sort_by=&source=${shop}` : `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&source=${shop}&sort_by=`

        } else {

          link = postType1 ? `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image&sort_by=&source=${shop}` : `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&source=${shop}&sort_by=${sub}`
        }
        if (user) {
          const response = await Konnect.get(
            link
          );
          // console.log(response.data.message.result.data, "===========ahsan==========")
          if (response.data.success) {
           
            if (
              response.data.message.result.data.length > 0 &&
              response.data.message?.result?.next?.page
            ) {
              if (page == 1) {
                dispatch({
                  type: types.CATEGORY_TYPE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: false,
                    loading: false,
                    error: false,
                  },
                });
              } else {
                dispatch({
                  type: types.CATEGORY_TYPE_LOAD_MORE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: true,
                    loading: false,
                    error: false,
                  },
                });
              }
            } else {
              dispatch({
                type: types.CATEGORY_TYPE_LOAD_MORE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: false,
                  loading: false,
                  error: false,
                },
              });
            }
          }
        }
      }else if(postType1 === ""){
      
        let link
        if (sub == 'date' || sub == undefined) {
      
          link = postType1 === "" ? `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image,video,campaign&sort_by=&source=${shop}` : `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&sort_by=&source=${shop}`

        } else {
       
          link = postType1 === "" ? 
          `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&sort_by=${sub}&source=${shop}` :
          `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=image,video,campaign&sort_by=&source=${shop}`
          // : 
          // `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&sort_by=${sub}&source=${shop}`
          
        }


        if (user) {
          const response = await Konnect.get(
            link
          );
          console.log(link, "link")
          // /v1/profile/filter/dl1961denim?limit=18&page=1&id=6374a808e37ae8c755330386&post_type=image,video,campaign&sort_by=&source=shop
          // /v1/profile/filter/dl1961denim?limit=18&page=1&id=6374a808e37ae8c755330386&post_type=image,video,campaign&sort_by=topdiscount&source=shop
         
          if (response.data.success) {
          //  console.log(response.data.message.result.data.length, "===================")
            if (
              response.data.message.result.data.length > 0 &&
              response.data.message?.result?.next?.page
            ) {
              if (page == 1) {
                dispatch({
                  type: types.CATEGORY_TYPE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: false,
                    loading: false,
                    error: false,
                  },
                });
              } else {
                dispatch({
                  type: types.CATEGORY_TYPE_LOAD_MORE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: true,
                    loading: false,
                    error: false,
                  },
                });
              }
            } else {
              dispatch({
                type: types.CATEGORY_TYPE_LOAD_MORE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: false,
                  loading: false,
                  error: false,
                },
              });
            }
          }
        }

      } else {
       
        let link
        if (sub == 'date' || sub == undefined) {

          link = postType1 ? `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=video&sort_by=&source=${shop}` : `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&source=${shop}&sort_by=`

        } else {

          link = postType1 ? `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&post_type=video&sort_by=&source=${shop}` : `/v1/profile/filter/${user}?limit=${limit}&page=${page}&id=${id}&source=${shop}&sort_by=${sub}`
        }
        if (user) {
          const response = await Konnect.get(
            link
          );
          if (response.data.success) {
            // console.log(page, 'page number');
            // console.log(response.data.message.result.data, 'data');
            if (
              response.data.message.result.data.length > 0 &&
              response.data.message?.result?.next?.page
            ) {
              if (page == 1) {
                dispatch({
                  type: types.CATEGORY_TYPE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: false,
                    loading: false,
                    error: false,
                  },
                });
              } else {
                dispatch({
                  type: types.CATEGORY_TYPE_LOAD_MORE,
                  payload: {
                    data: [],
                    main: name,
                    otherStatus: true,
                    otherData: addChild(response.data.message.result.data),
                    hasMore: true,
                    loading: false,
                    error: false,
                  },
                });
              }
            } else {
              dispatch({
                type: types.CATEGORY_TYPE_LOAD_MORE,
                payload: {
                  data: [],
                  main: name,
                  otherStatus: true,
                  otherData: addChild(response.data.message.result.data),
                  hasMore: false,
                  loading: false,
                  error: false,
                },
              });
            }
          }
        }
      }


    }
  } catch (err) {
    dispatch({
      type: types.CATEGORY_TYPE_ERROR,
      payload: {
        data: [],
        main: 'ALL POSTS',
        otherStatus: false,
        otherData: [],
        hasMore: false,
        loading: false,
        error: true,
      },
    });
    console.log(err);
  }
};
