// @ts-nocheck
import React, { Component, useCallback, useRef, useState } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
  SafeAreaView,
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
import Btn from '../../../components/Btn';
import * as favAct from '../../../store/actions/favouriteAct';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import * as myListAct from '../../../store/actions/myListAct';
import * as urlShortnerAct from '../../../store/actions/urlShortnerAct';
import { useDispatch } from 'react-redux';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import Loader from '../../../components/Loader';

const tablet = deviceInfo.isTablet();

function NotifyModel({
  visible,
  closeModle,
  data,
  addFavourite,
  addToMyList,
  getMyList,
  removeItemMyList,
  deleteFavourite,
  openWeb,
  cbForHeart = () => console.log('test'),
  cbForBrandHeart = () => console.log("test"),
  authRed,
  urlShortner
}) {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const [pause, onSetPause] = React.useState(true);
  const [click, setClick] = useState(false);
  const [index, onChangeIndex] = useState(0);
  const [activeTag, setActiveTag] = useState(0);
  const [likeChildItems, setLikeChildItems] = useState(0);
  const [isShareApi, setIsShareApi] = useState(false)

  const flatRef = useRef();
  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };

  React.useEffect(() => {
    onSetPause(true);
    return () => {
      onSetPause(false);
    };
  }, []);

  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };

  function onRemoveItem(post_id, item, children) {
    if (children.filter(item => item.isFavoriteChild === true).length > 1) {
      removeItemMyList(post_id, item.id).then(() => {
        dispatch({
          type: 'favPostLike',
          payload: {
            isFavoriteChild: false,
            id: item?.id,
            post_id: data?.data?.post_id,
          },
        });
        cbForHeart({ ...item, isFavoriteChild: false });
      });
    } else {
      removeItemMyList(post_id, item.id).then(() => {
        closeModle();
        getMyList(1);
      });
    }
  }

  function onRemoveBrand(id, con) {
    if (!con) {
      addFavourite(id)
        .then(res => {
          dispatch({
            type: 'FavBrandLike',
            payload: {
              brandLike: true,
              brandId: id,
            },
          });
          cbForBrandHeart(id, true)
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      deleteFavourite(id)
        .then(() => {
          dispatch({
            type: 'FavBrandLike',
            payload: {
              brandLike: false,
              brandId: id,
            },
          });
          cbForBrandHeart(id, false)
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }

  function renderItem(item, index, data) {
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
          <Image
            source={{ uri: item?.media_url }}
            resizeMode={'cover'}
            style={{
              width: '100%',
              flex: 1,
              borderRadius: responsiveFontSize(0.5)

            }}
          />
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
                            fontSize: responsiveFontSize(1.5),

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

              {/* {
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
                marginTop: responsiveHeight(0.5),
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
                    style={{
                      color: 'red',
                      textDecorationLine: 'line-through',
                    }}>
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
                      item?.productPromoCodeDscs.replace(/[^0-9]/g, ''),
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
                        err && console.log(err, "ERROR DO NOT SHARE");
                      });
                  } else {
                    alert("Something went wrong")
                  }
                  setIsShareApi(false)
                })
                // Share.open({
                //   title: data.shopName,
                //   url: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                // })
                //   .then(res => {
                //     console.log(res, 'RES');
                //     closeModle();
                //     setLikeChildItems(0);
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
                  <Loader color="#FFFFFF" />
                  :
                  <>
                    <ShareIcon
                      name="share"
                      size={responsiveFontSize(tablet ? 1.25 : 2.5)}
                      color="white"
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.2),
                        color: 'white',
                        textAlign: 'center',
                        marginTop: '5%',
                      }}>
                      SHARE
                    </Text>
                  </>}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (item.isFavoriteChild) {
                  onRemoveItem(
                    data?.data?.post_id,
                    item,
                    data?.data?.postData?.children,
                  );
                } else {
                  addToMyList(data?.data?.post_id, item?.id)
                    .then(res => {
                      dispatch({
                        type: 'favPostLike',
                        payload: {
                          isFavoriteChild: true,
                          id: item?.id,
                          post_id: data?.data?.post_id,
                        },
                      });
                      cbForHeart({ ...item, isFavoriteChild: true });
                    })
                    .catch(err => {
                      console.log(err.response.data);
                    });
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
                  size={responsiveFontSize(tablet ? 1.25 : 2.5)}
                  color={item?.isFavoriteChild ? 'red' : 'white'}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.2),
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
                closeModle()
                openWeb({ ...item, redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}` })
                console.log({ redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}` }, authRed?.data?._id)
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ShopIcon
                  name="shopping-cart"
                  size={responsiveFontSize(tablet ? 1.25 : 2.5)}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.2),
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
        data={data?.itemDetail?.children}
        renderItem={({ item, index }) => renderItem(item, index, data)}
        keyExtractor={(item, i) => i.toString()}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={flatRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onChangeItemBottom}
      />
    );
  }
  return (
    <Modal
      animationType="slide"
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
            paddingTop: headerHeight,
          }}>
          <View style={{ ...styles.con, backgroundColor: 'white' }}>
            <View style={{ ...styles.btn, height: headerHeight, zIndex: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image
                                style={{ width: responsiveFontSize(3.5), height: responsiveFontSize(3.5), borderRadius: responsiveFontSize(3.5) / 2, marginLeft: responsiveFontSize(1) }}
                                source={{ uri: data?.image }}
                            /> */}
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                      color: 'gray',
                      marginLeft: responsiveFontSize(1),
                      fontWeight: 'bold',
                    }}>
                    {data?.shopName}
                  </Text>
                  {data?.data?.hasOwnProperty('promo') ? (data?.data?.promo != 'KB0' && data?.data?.promo != '') && <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                      color: 'red',
                      marginLeft: responsiveFontSize(1),
                      fontWeight: 'bold',
                    }}>
                    GET {data?.data?.discount} OFF
                  </Text> : null}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    onRemoveBrand(data?.data?.brand_id, data?.data?.isFavoriteBrand);
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
                      color={data?.data?.isFavoriteBrand ? 'red' : 'white'}
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
                    setLikeChildItems(0);
                  }}>
                  <IconCross
                    name="cross"
                    color={'gray'}
                    size={responsiveFontSize(tablet ? 2 : 4)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, width: '100%' }}>
              <View style={{ flex: 1 }}>
                {data?.itemDetail?.media_type == 'VIDEO' ? (
                  <TouchableOpacity
                    disabled={pause}
                    onPress={() => onSetPause(true)}
                    activeOpacity={1}
                    style={{ alignItems: 'center', flex: 2.2 }}>
                    {pause ? (
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

                    <Video
                      ignoreSilentSwitch="ignore"
                      repeat
                      resizeMode="cover"
                      paused={pause}
                      playInBackground={false}
                      playWhenInactive={false}
                      disableFocus
                      source={{ uri: data?.itemDetail?.media_url }}
                      style={{
                        width: tablet ? '75%' : '100%',
                        flex: 1,
                      }}></Video>
                    <>
                    </>
                  </TouchableOpacity>
                ) : data?.itemDetail?.media_type == 'IMAGE' ||
                  data?.itemDetail?.media_type == 'CAROUSEL_ALBUM' ? (
                  <>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2.2 }}>
                      <View style={{ width: responsiveWidth(tablet ? 70 : 100), alignSelf: 'center' }}>
                        <AutoHeightImage
                          width={responsiveWidth(tablet ? 70 : 100)}
                          source={{ uri: data?.itemDetail?.media_url }} />
                        {data?.data?.postData?.children?.length > 0
                          ? data?.data?.postData?.children.map((item, i) => {
                            return (
                              <TouchableOpacity
                                activeOpacity={0.9}
                                key={i}
                                onPress={() =>
                                  flatRef.current.scrollToIndex({
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
                  </>
                ) : null}
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

function mapStateToProps({ authRed }) {
  return { authRed };
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
    borderRadius: 20,
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
    alignItems: 'center',
    paddingRight: responsiveFontSize(1.2),
    paddingVertical: responsiveFontSize(1),
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
  },
  btn2: {
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(0.75),
    width: '90%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
  },
  btnSquareCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: tablet ? '30%' : '32%',
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
    // backgroundColor: '#010b40',
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

