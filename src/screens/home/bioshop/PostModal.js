// @ts-nocheck
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  AppState,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';
import * as favAct from '../../../store/actions/favouriteAct';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import * as myListAct from '../../../store/actions/myListAct';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import * as urlShortnerAct from '../../../store/actions/urlShortnerAct';
import Loader from '../../../components/Loader';


const tablet = deviceInfo.isTablet();



export function RenderPost({ item, activeTag, onSetPause, pause, current, flatRef }) {
  const [loading, setLoading] = useState(false)


  const videoPlayer = useRef()
  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };
  const {
    media_url,
    caption,
    created_at,
    end_date,
    instagram_username,
    linked,
    media_id,
    media_type,
    post_id,
    post_type,
    promo,
    redirected_url,
    start_date,
    discount,
    children,
  } = item;

  const appState = useRef(AppState.currentState);

  useEffect(() => {

    if(item.post_id == current?.post_id){
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === "background") {
          console.log('App has come to the foreground!');
          onSetPause(true)
        }
        // else{
        //   onSetPause(false)
        // }
        console.log('AppState', appState.current,"--",nextAppState);
      });
  
      return () => {
        subscription.remove();
      };
    }

  }, [current]);

  return (
    <View style={{ flex: 1, width: responsiveWidth(100) }}>
      {media_type == 'VIDEO' ? (
        <TouchableOpacity
          disabled={!(item.post_id == current?.post_id)}
          activeOpacity={1}
          onPress={() => {
            if (item.post_id == current?.post_id) {
              onSetPause(!pause)
            }
          }}
          style={{ alignItems: 'center' }}>
          {(pause && (item.post_id == current.post_id)) ? (
            <View style={styles.videoPlay}>
              <TouchableOpacity onPress={sexyPlay} style={styles.touch}>
                <SimpleLineIcons
                  name={pause ? 'control-play' : 'control-pause'}
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {loading && (
            <View style={styles.videoPlay}>
              <Loader color={"white"} />
            </View>
          )}
          {(item.index == current.index || item.index == current.index - 1 || item.index == current.index + 1) && (
            <Video
              repeat
              resizeMode="cover"
              paused={(item.post_id == current?.post_id) ? pause : true}
              //  paused={(pause && !(item.post_id==current.post_id))}
              bufferConfig={{
                minBufferMs: 6000,
                maxBufferMs: 7000,
                bufferForPlaybackMs: 500,
                bufferForPlaybackAfterRebufferMs: 1000
              }}
              onLoadStart={() => {
                setLoading(true)
              }}
              onLoad={() => {
                setLoading(false)
              }}
              hideShutterView={false}
              ref={videoPlayer}
              playInBackground={false}
              playWhenInactive={false}
              ignoreSilentSwitch="ignore"
              disableFocus
              source={{ uri: media_url ? media_url : null }}
              style={{ width: tablet ? '75%' : '100%', height: responsiveHeight(65), backgroundColor: 'black' }}></Video>
          )}
        </TouchableOpacity>
      ) : media_type == 'IMAGE' || media_type == 'CAROUSEL_ALBUM' ? (
        // <ImageBackground
        // source={{uri: media_url ? media_url : null}}
        // blurRadius={15}
        // style={{flex:1,justifyContent:'center',alignItems:'center'}}
        // >
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View
            activeOpacity={0.9}
            style={{
              position: 'relative',
              width: responsiveWidth(tablet ? 70 : 100),
              alignSelf: 'center',
            }}>
            <AutoHeightImage
              width={responsiveWidth(tablet ? 70 : 100)}
              source={{ uri: media_url ? media_url : null }}
            />
            {/* <Image
            // source={require('../../../assets/posts/13.jpg')}
            source={{uri: media_url ? media_url : null}}
            ref={imgRef}
            style={{
              width: '100%',
              resizeMode: 'contain',
            }}
          /> */}

            {children?.length > 0
              ? children.map((item, i) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={i}
                    onPress={() =>
                      flatRef?.current?.scrollToIndex({
                        index: i,
                      })
                    }
                    style={[
                      styles.tagCont,
                      {
                        top: item.coordinates[0].y,
                        left: item.coordinates[0].x,
                      },
                      activeTag === i && {
                        backgroundColor: 'rgba(255,0,0,0.75)',
                      },
                    ]}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })
              : null}
          </View>
        </View>
      ) : // </ImageBackground>
        null}
    </View>
  );
}

function NotifyModel({
  visible,
  closeModle,
  data,
  addFavourite,
  addToMyList,
  bioShopAllPosts,
  loadMore,
  categoriesReducer,
  select,
  dis,
  openWeb,
  deleteFavourite,
  removeItemMyList,
  brandLike,
  cbForHeart,
  authRed,
  urlShortner
}) {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [current, setCurrent] = React.useState({});
  const [scroll, setScroll] = useState(0);
  const [initialIndex, setInitialIndex] = useState(0);
  const [tagsData, setTagsData] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [isShareApi, setIsShareApi] = useState(false)
  const [pause, onSetPause] = React.useState(false);

  const flatRef = useRef();
  const dispatch = useDispatch();
  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };


  React.useEffect(() => {
    if (scroll == 0) {
      setInitialIndex(1);
    }
    setScroll(
      select == 'ALL POSTS'
        ? bioShopAllPosts.data
          .map(it => it.post_id)
          .indexOf(data?.itemDetail.post_id)
        : categoriesReducer.otherData
          .map(it => it.post_id)
          .indexOf(data.itemDetail.post_id),
    );
    // onSetPause(true);
    // return () => {
    //   onSetPause(false);
    // };
  }, []);

  function renderItem(item, index, data) {
    const {
      media_url,
      caption,
      created_at,
      end_date,
      instagram_username,
      linked,
      media_id,
      media_type,
      post_id,
      post_type,
      promo,
      redirected_url,
      start_date,
    } =
      initialIndex == 0
        ? select == 'ALL POSTS'
          ? bioShopAllPosts.data[0]
          : categoriesReducer.otherData[0]
        : current;

    return (
      <View
        style={{
          flexDirection: 'row',
          width: responsiveWidth(96.5),
          marginHorizontal: responsiveFontSize(0.75),
          marginVertical: responsiveFontSize(0.75),
          backgroundColor: 'white',
          borderRadius: responsiveFontSize(0.5),
          padding: responsiveFontSize(0.5),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{ width: tablet ? '17%' : '30%', alignItems: 'center' }}>
          {item?.media_type == "VIDEO" ? (
            <Video
              ignoreSilentSwitch="ignore"
              repeat
              resizeMode="cover"
              paused={true}
              playInBackground={false}
              playWhenInactive={false}
              disableFocus
              source={{
                uri: item?.media_url,
              }}
              style={{
                width: '100%',
                flex: 1,
                borderRadius: responsiveFontSize(0.5),
              }}
            />
          ) : (
            <Image
              source={{
                uri: item?.media_url,
              }}
              resizeMode={'cover'}
              style={{
                width: '100%',
                flex: 1,
                borderRadius: responsiveFontSize(0.5),
              }}
            />
          )}
        </View>
        <View
          style={{
            width: tablet ? '83%' : '70%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(1),
          }}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                minHeight: responsiveHeight(7.2),
              }}>
              {item?.ProductName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: responsiveFontSize(5), justifyContent: 'space-between' }}>

              {
                authRed.data.account_type == 'customer' ?
                  <>
                    {
                      item?.hasOwnProperty("referral_percent") === true && item?.referral_percent !== '' ?
                        <Text
                          numberOfLines={4}
                          style={{
                            fontWeight: 'bold',
                            fontSize: tablet? responsiveFontSize(1): responsiveFontSize(1.5),

                            textAlign: 'left',
                            color: 'red'
                            // width: '60%',
                          }}>
                          {item?.referral_percent + "% Referral Fee"}


                        </Text> : null
                    }
                  </> :
                  <>

                    {
                      item?.hasOwnProperty("influencerFee") === true && item?.influencerFee !== '' ?
                        <Text

                          style={{
                            fontWeight: 'bold',
                            fontSize: responsiveFontSize(1.5),

                            textAlign: 'left',
                            color: 'orange'
                            // width: '60%',
                          }}>
                          {item?.influencerFee + "% Influencer Fee"}
                        </Text> : null
                    }
                  </>
              }

              {/* {
          item?.hasOwnProperty("referral_percent") === true && item?.referral_percent !== '' ?
            <Text
              numberOfLines={4}
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),

                textAlign: 'left',
                color: 'red'
                // width: '60%',
              }}>
                 {item?.referral_percent+"% Referral Fee"} 
                 
             
            </Text>: null
          } */}
              {/* 
        {
          item?.hasOwnProperty("influencerFee") === true && item?.influencerFee !== '' ?
            <Text

              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),

                textAlign: 'left',
                color: 'orange'
                // width: '60%',
              }}>
              {item?.influencerFee+"% Influencer Fee"}
            </Text>:null
          }  */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(0.4),
              }}>
              <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.8) }}>
                {item?.ProductSku !== ''
                  ? `#${item?.ProductSku}`
                  : item?.skuDataOther !== '' && `#${item?.skuDataOther}`}
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                {item?.productPromoCodePromo !== 'KB0' && (
                  <Text
                    style={{ color: 'red', textDecorationLine: 'line-through' }}>
                    ${numeral(item?.productAmount).format('0.00')}
                  </Text>
                )}
                {item?.productPromoCodePromo === 'KB0'
                  ? `$${numeral(item?.productAmount).format('0.00')}`
                  : item?.productPromoCodeDscs?.includes('%')
                    ? `$${numeral(
                      item?.productAmount -
                      discountPercent(
                        item?.productPromoCodeDscs,
                        item?.productAmount,
                      ),
                    ).format('0.00')}  `
                    : `$${numeral(
                      item?.productAmount -
                      item?.productPromoCodeDscs?.replace(/[^0-9]/g, ''),
                    ).format('0.00')}  `}

              </Text>
            </View>
          </View>
          <View style={styles.btnSquareCont}>
            <TouchableOpacity
              style={styles.btnSquare}
              onPress={() => {
                setIsShareApi(true)
                onSetPause(true);
                urlShortner(`${item?.ProductUrl}&c_id=${authRed?.data?._id}`).then((res) => {
                  if (res?.message) {

                    Share.open({
                      title: data.shopName?.toString(),
                      url: res?.message,
                    })
                      .then(res => {
                        // console.log(res, 'RES');
                        closeModle();
                        setLikeChildItems(0);
                      })
                      .catch(err => {
                        console.log(err, "ERROR DO NOT SHARE");
                      });
                  } else {
                    alert("Something went wrong")
                  }
                  setIsShareApi(false)
                })
                // Share.open({
                //   title: data?.instagram_username,
                //   url: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                // })
                //   .then(res => {
                //     console.log(res, 'RES');
                //     closeModle();
                //   })
                //   .catch(err => {
                //     err && console.log(err);
                //   });
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isShareApi ?
                  <Loader color="#FFFFFF" /> :
                  <>
                    <ShareIcon
                      name="share"
                      size={responsiveFontSize(tablet ? 1.25 : 2)}
                      color="white"
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1),
                        color: 'white',
                        textAlign: 'center',
                        marginTop: '5%',
                      }}>
                      SHARE
                    </Text>
                  </>
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (select == 'ALL POSTS') {
                  if (!item?.isFavoriteChild) {
                    addToMyList(current?.post_id, item?.id)
                      .then(res => {
                        dispatch({
                          type: 'allpostChildLike',
                          payload: {
                            isFavoriteChild: true,
                            id: item?.id,
                            post_id: current?.post_id,
                          },
                        });
                        const cState = [...tagsData].map(it => {
                          if (it?.id === item?.id) {
                            return { ...item, isFavoriteChild: true };
                          } else {
                            return { ...it };
                          }
                        });
                        setTagsData([...cState]);
                      })
                      .catch(err => {
                        console.log(err.response.data);
                      });
                  } else {
                    console.log('removeItemMyList');
                    removeItemMyList(current?.post_id, item?.id)
                      .then(() => {
                        dispatch({
                          type: 'allpostChildLike',
                          payload: {
                            isFavoriteChild: false,
                            id: item?.id,
                            post_id: current?.post_id,
                          },
                        });
                        const cState = [...tagsData].map(it => {
                          if (it.id === item.id) {
                            return { ...item, isFavoriteChild: false };
                          } else {
                            return { ...it };
                          }
                        });
                        setTagsData([...cState]);
                      })
                      .catch(err => {
                        console.log(err.response.data);
                      });
                  }
                } else {
                  if (!item.isFavoriteChild) {
                    addToMyList(current?.post_id, item?.id)
                      .then(res => {
                        dispatch({
                          type: 'categoryChildrenLike',
                          payload: {
                            isFavoriteChild: true,
                            id: item?.id,
                            post_id: current?.post_id,
                          },
                        });
                        const cState = [...tagsData].map(it => {
                          if (it?.id === item?.id) {
                            return { ...item, isFavoriteChild: true };
                          } else {
                            return { ...it };
                          }
                        });
                        setTagsData([...cState]);
                      })
                      .catch(err => {
                        console.log(err.response.data);
                      });
                  } else {
                    console.log('removeItemMyList');
                    removeItemMyList(current?.post_id, item?.id)
                      .then(() => {
                        dispatch({
                          type: 'categoryChildrenLike',
                          payload: {
                            isFavoriteChild: false,
                            id: item?.id,
                            post_id: current?.post_id,
                          },
                        });
                        const cState = [...tagsData].map(it => {
                          if (it.id === item.id) {
                            return { ...item, isFavoriteChild: false };
                          } else {
                            return { ...it };
                          }
                        });
                        setTagsData([...cState]);
                      })
                      .catch(err => {
                        console.log(err.response.data);
                      });
                  }
                }
              }}
              style={styles.btnSquare}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FavIcon
                  name="favorite"
                  size={responsiveFontSize(tablet ? 1.25 : 2)}
                  color={item?.isFavoriteChild ? 'red' : 'white'}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1),
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '5%',
                  }}>
                  ADD TO MY LIST
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btnSquare }}
              onPress={() => {
                closeModle();
                openWeb({
                  ...item,
                  redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                });
                // console.log(authRed?.data?._id, '______', {
                //   redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                // });
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ShopIcon
                  name="shopping-cart"
                  size={responsiveFontSize(tablet ? 1.25 : 2)}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1),
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '5%',
                  }}>
                  SHOP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const onChangeItemBottom = useCallback(({ viewableItems }) => {

    setActiveTag(viewableItems[0]?.index);

  }, []);

  function renderBottomItem(data) {
    return (
      <FlatList
        data={[...tagsData]}
        renderItem={({ item, index }) => renderItem(item, index, data)}
        keyExtractor={(item, i) => i.toString()}
        pagingEnabled={true}
        ref={flatRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onChangeItemBottom}
      />
    );
  }


  const onChangeItem = useCallback(({ viewableItems, changed }) => {
    if (viewableItems[0]?.item) {
      setCurrent({ ...viewableItems[0]?.item, index: viewableItems[0]?.index });
    }
    if (viewableItems[0]?.item.hasOwnProperty('children')) {
      setTagsData(viewableItems[0]?.item?.children);
      flatRef.current.props.data.length > 0 &&
        flatRef.current.scrollToIndex({
          index: 0,
          viewPosition: 1,
        });
    } else {
      setTagsData([]);
    }
  }, []);

  function renderFooter() {
    if (select == 'ALL POSTS') {
      return (
        <>
          {bioShopAllPosts?.hasMore ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                width: responsiveWidth(100),
              }}>
              <View style={styles.footer}>
                <Text style={styles.btnText}>Loading...</Text>
                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
              </View>
            </View>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          {categoriesReducer?.hasMore ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <View style={styles.footer}>
                <Text style={styles.btnText}>Loading...</Text>
                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
              </View>
            </View>
          ) : null}
        </>
      );
    }
  }
  const getItemLayout = (data, index) => {
    return {
      length: responsiveWidth(100),
      offset: responsiveWidth(100) * index,
      index,
    };
  };
  // console.log("my dataaa-------------------------",select == 'ALL POSTS'
  // ? bioShopAllPosts.data
  // : categoriesReducer.otherData)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={closeModle}
      visible={visible}
      style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: height,
            backgroundColor: 'rgba(0,0,0,0.35)',
            // paddingTop: headerHeight,
            // paddingBottom: responsiveHeight(7.25),
          }}>
          <View style={{ ...styles.con, backgroundColor: 'white' }}>
            <View style={{ ...styles.btn, height: responsiveHeight(6) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image
                style={{
                  width: responsiveFontSize(3.5),
                  height: responsiveFontSize(3.5),
                  borderRadius: responsiveFontSize(3.5) / 2,
                  marginLeft: responsiveFontSize(1),
                }}
                source={{uri: data?.itemDetail?.user?.profile_image_url}}
              /> */}
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                      color: 'gray',
                      marginLeft: responsiveFontSize(1),
                      fontWeight: 'bold',
                    }}>
                    {data?.itemDetail?.user?.name}
                  </Text>
                  {dis ? (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                        color: 'red',
                        marginLeft: responsiveFontSize(1),
                        fontWeight: 'bold',
                      }}>
                      {dis}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(data);
                    if (!brandLike) {
                      addFavourite(data?.itemDetail?.user?._id)
                        .then(res => {
                          dispatch({
                            type: 'brandLike',
                            payload: {
                              brandLike: true,
                              brandId: data?.itemDetail?.user?._id,
                            },
                          });
                          console.log(data?.itemDetail?.user?._id, 'BRAND ID');
                          // getFavourites()
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    } else {
                      deleteFavourite(data?.itemDetail?.user?._id)
                        .then(res => {
                          dispatch({
                            type: 'brandLike',
                            payload: {
                              brandLike: false,
                              brandId: data?.itemDetail?.user?._id,
                            },
                          });
                          console.log(data?.itemDetail?.user?._id, 'BRAND ID');
                          // getFavourites()
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }}
                  style={{
                    ...styles.btn2,
                    width: responsiveWidth(tablet ? 18 : 27),
                    marginRight: responsiveFontSize(2),
                    paddingVertical: responsiveFontSize(0.5),
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FavIcon
                      name="favorite"
                      size={responsiveFontSize(tablet ? 1 : 2)}
                      color={brandLike ? 'red' : 'white'}
                    // color={'white'}
                    />
                    <Text
                      style={{
                        marginLeft: responsiveFontSize(1),
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                        color: 'white',
                      }}>
                      FAVOURITE
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    closeModle();
                  }}>
                  <IconCross
                    name="cross"
                    color={'gray'}
                    size={responsiveFontSize(tablet ? 2 : 4)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, width: responsiveWidth(100) }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 2.35 }}>
                  <FlatList
                    data={
                      select == 'ALL POSTS'
                        ? bioShopAllPosts.data
                        : categoriesReducer.otherData
                    }
                    initialNumToRender={
                      select == 'ALL POSTS'
                        ? bioShopAllPosts.data.length
                        : categoriesReducer.otherData.length
                    }
                    initialScrollIndex={scroll}
                    // onScrollEndDrag={()=>{
                    //   flatRef.current.props.data.length > 0 && flatRef.current.scrollToIndex({
                    //     index:0,
                    //     viewPosition:1
                    //   })
                    // }}
                    // onScrollToIndexFailed={index => {
                    //   setScroll(index);
                    // }}
                    getItemLayout={getItemLayout}
                    onViewableItemsChanged={onChangeItem}
                    viewabilityConfig={{
                      itemVisiblePercentThreshold: 50,
                    }}
                    pagingEnabled={true}
                    horizontal={true}
                    renderItem={({ item, index }) => <RenderPost
                      current={current}
                      item={{ ...item, index }}
                      activeTag={activeTag}
                      onSetPause={onSetPause}
                      pause={pause}
                      flatRef={flatRef}
                    />}
                    onEndReached={loadMore}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, id) => id.toString()}
                    ListFooterComponent={renderFooter()}
                  />
                </View>
                <View style={{ ...styles.con2, flex: 1 }}>
                  {renderBottomItem(data)}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function mapStateToProps({ bioShopAllPosts, categoriesReducer, authRed }) {
  return { bioShopAllPosts, categoriesReducer, authRed };
}

export default connect(mapStateToProps, { ...myListAct, ...favAct, ...urlShortnerAct })(NotifyModel);

const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    // borderRadius: 20,
  },
  iconCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(242, 242, 242)',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingRight: responsiveFontSize(1.2),
    paddingVertical: responsiveFontSize(1),
    // borderTopLeftRadius: responsiveFontSize(2.2),
    // borderTopRightRadius: responsiveFontSize(2.2)
  },
  icon: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#001441',
    width: '18%',
    height: '18%',
    borderRadius: '18%' / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    borderBottomWidth: 0.5,
    padding: responsiveFontSize(1.5),
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    paddingRight: responsiveFontSize(2),
  },
  con2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(242, 242, 242)',
    justifyContent: 'space-between',
    width: '100%',

    // borderBottomLeftRadius:responsiveFontSize(2.2),
    // borderBottomRightRadius:responsiveFontSize(2.2),
  },
  btn2: {
    // backgroundColor:"gray",
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(tablet ? 0.4 : 0.75),
    // width: '90%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
  },
  btnSquareCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: tablet ? '30%' : responsiveFontSize(5.5),
  },
  btnSquare: {
    backgroundColor: colors.themeblue,
    height: '100%',
    width: '32%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
    padding: responsiveFontSize(tablet ? 0.5 : 1),
  },
  videoPlay: {
    height: responsiveWidth(tablet ? 10 : 15),
    width: responsiveWidth(tablet ? 10 : 15),
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    position: 'absolute',
    // top: '37%',
    alignSelf: 'center',
    top: responsiveHeight(25),
    // left: responsiveWidth(42),
    zIndex: 999,
    // right: 3,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveWidth(10),
    width: responsiveWidth(10),
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  text: {
    fontWeight: '600',
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  disBox: {
    position: 'absolute',
    height: responsiveHeight(5),
    width: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(3),
    paddingVertical: responsiveFontSize(0.2),
  },
  tagCont: {
    width: responsiveWidth(tablet ? 4 : 8),
    height: responsiveWidth(tablet ? 4 : 8),
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
    borderRadius: responsiveWidth(tablet ? 2 : 4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// onPress={() => {
//     Share.open({
//         title:'BioShop',
//         url: `https://konnect.bio/${data.name}`
//     }).then((res) => {
//         console.log(res, "RES");
//         closeModle()

//       })
//       .catch((err) => {
//         err && console.log(err);
//       });
// }}
