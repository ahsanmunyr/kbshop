// @ts-nocheck
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import {FlatList} from 'react-native-gesture-handler';
import * as favAct from '../store/actions/favouriteAct';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import numeral from 'numeral';
import {useDispatch} from 'react-redux';
import * as myListAct from '../store/actions/myListAct';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import * as urlShortnerAct from '../store/actions/urlShortnerAct';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';
import IVSPlayer from 'amazon-ivs-react-native-player';
import CommentIcon from 'react-native-vector-icons/FontAwesome';
import EyeIcon from 'react-native-vector-icons/AntDesign';

const tablet = deviceInfo.isTablet();
const children1 = [
  {
    ProductName: 'Vaughn Trucker | Aspen Mid',
    ProductSku: '11362',
    ProductUrl:
      'https://www.dl1961.com/products/vaughn-trucker-aspen-mid?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1',
    coordinates: [[Object]],
    id: '4be7d9b4-d8cc-4beb-8c27-7704b1482b2f',
    imgid: 76143,
    isFavoriteChild: false,
    media_url:
      'https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11362_VAUGHN_ASPENMID_027.jpg?v=1657557447',
    productAmount: '158.00',
    productCategory: ['62b6fed85dc7524f880aed88'],
    productDesc:
      'Vaughn is a vintage-inspired classic trucker jacket that’s neat at the shoulders and straight through the body.',
    productPromoCodeDscs: '0%',
    productPromoCodePromo: 'KB0',
    skuDataOther: '',
  },
  {
    ProductName: 'Sean Shirt Jacket | Dark Rinse',
    ProductSku: '11365',
    ProductUrl:
      'https://www.dl1961.com/products/sean-shirt-jacket-dark-rinse?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1',
    coordinates: [[Object]],
    id: '1584a030-b4b4-459a-be96-c513cab26db6',
    imgid: 78324,
    isFavoriteChild: false,
    media_url:
      'https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11365_SEANSHIRTJACKET_DARKRINSE_1033.jpg?v=1657557593',
    productAmount: '168.00',
    productCategory: ['62b6fed85dc7524f880aed88'],
    productDesc:
      'Sean is a long sleeve shirt jacket with a boxy fit, featuring a button front closure and front patch pockets.',
    productPromoCodeDscs: '0%',
    productPromoCodePromo: 'KB0',
    skuDataOther: '',
  },
];

export function RenderPost({
  item,
  activeTag,
  onSetPause,
  pause,
  current,
  flatRef,
}) {
  const {media_url, media_type, children} = item;
  return (
    <View style={{flex: 1, width: responsiveWidth(100)}}>
      {media_type == 'VIDEO' ? (
        <TouchableOpacity
          disabled={!(item.post_id == current?.post_id)}
          activeOpacity={1}
          onPress={() => {
            if (item.post_id == current?.post_id) {
              onSetPause(!pause);
            }
          }}
          style={{alignItems: 'center'}}>
          <Video
            repeat
            resizeMode="cover"
            paused={item.post_id == current?.post_id ? pause : true}
            //  paused={(pause && !(item.post_id==current.post_id))}
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch="ignore"
            disableFocus
            source={{uri: media_url ? media_url : null}}
            style={{
              width: tablet ? '75%' : '100%',
              height: responsiveHeight(65),
            }}></Video>
        </TouchableOpacity>
      ) : media_type == 'IMAGE' || media_type == 'CAROUSEL_ALBUM' ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View
            activeOpacity={0.9}
            style={{
              position: 'relative',
              width: responsiveWidth(tablet ? 70 : 100),
              alignSelf: 'center',
            }}>
            <AutoHeightImage
              width={responsiveWidth(tablet ? 70 : 100)}
              source={{uri: media_url ? media_url : null}}
            />

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
                      <Text style={{color: 'white', fontWeight: '600'}}>
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

const toastConfig = {
  error: ({text1, props}) => (
    <View
      style={{
        paddingVertical: responsiveHeight(1),
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: responsiveFontSize(0.75),
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: 'tomato',
      }}>
      <Text
        style={{
          paddingHorizontal: responsiveFontSize(3),
          fontSize: responsiveFontSize(1.5),
          fontWeight: 'bold',
          color: '#000000',
        }}>
        {text1}
      </Text>
    </View>
  ),
};

function LiveSessionModal({
  visible,
  closeModle,
  bioShopReducer,
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
  urlShortner,
  brandName,
  discount,
}) {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [current, setCurrent] = React.useState({});
  const [scroll, setScroll] = useState(0);
  const [initialIndex, setInitialIndex] = useState(0);
  const [tagsData, setTagsData] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [isShareApi, setIsShareApi] = useState(false);
  const [pause, onSetPause] = React.useState(false);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isSession, setIsSession] = useState(true);
  const [counter, setCounter] = useState(4);
  const [playerState, setPlayerState] = useState('');
  const videoPlayer = useRef();

  const flatRef = useRef();
  const dispatch = useDispatch();
  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };

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
        <View style={{width: tablet ? '17%' : '30%', alignItems: 'center'}}>
          <Image
            source={{
              uri: item.media_url,
            }}
            resizeMode={'cover'}
            style={{
              width: '100%',
              flex: 1,
              borderRadius: responsiveFontSize(0.5),
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
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                minHeight: responsiveHeight(7.2),
              }}>
              {item.ProductName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(0.4),
              }}>
              <Text style={{fontSize: responsiveFontSize(tablet ? 1 : 1.8)}}>
                {item.ProductSku}
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                <Text style={{color: 'green'}}>${item.productAmount}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.btnSquareCont}>
            <TouchableOpacity
              style={{...styles.btnSquare}}
              onPress={() => {
                // closeModle();
                openWeb({
                  ...item,
                  redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
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
                    marginLeft: responsiveFontSize(1),
                  }}>
                  Buy Now
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSquare}
              onPress={() => {
                setIsShareApi(true);
                urlShortner(
                  `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                ).then(res => {
                  if (res?.message) {
                    Share.open({
                      title: item.ProductSku?.toString(),
                      url: res?.message,
                    })
                      .then(res => {
                        closeModle();
                        setLikeChildItems(0);
                      })
                      .catch(err => {
                        err && console.log(err);
                      });
                  } else {
                    alert('Something went wrong');
                  }
                  setIsShareApi(false);
                });
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isShareApi ? (
                  <Loader size={2} color="#FFFFFF" />
                ) : (
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
                        marginLeft: responsiveFontSize(1),
                      }}>
                      SHARE
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const onChangeItemBottom = useCallback(({viewableItems}) => {
    setActiveTag(viewableItems[0]?.index);
  }, []);

  function renderBottomItem(data) {
    return (
      <FlatList
        data={children1}
        renderItem={({item, index}) => renderItem(item, index, data)}
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

  useEffect(() => {
    console.log('timing');
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [counter]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={closeModle}
      visible={visible}
      style={{flex: 1, justifyContent: 'center', elevation: 5}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: height,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}>
          <View style={{...styles.con, backgroundColor: 'white'}}>
            <View
              style={{
                ...styles.btn,
                height: headerHeight,
                zIndex: 1,
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0)',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                      color: 'gray',
                      marginLeft: responsiveFontSize(1),
                      fontWeight: 'bold',
                    }}>
                    {brandName}
                  </Text>
                  {bioShopReducer?.data?.promo != 'KB0' &&
                  bioShopReducer?.data.promo ? (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                        color: 'red',
                        marginLeft: responsiveFontSize(1),
                        fontWeight: 'bold',
                      }}>
                      GET {bioShopReducer?.data?.discount} OFF
                      {/* {`GET ${discount} OFFFFFF`} */}
                    </Text>
                  ) : null}
                </View>
                {isSession && (
                  <View
                    style={{
                      backgroundColor: 'red',
                      paddingVertical: responsiveFontSize(0.25),
                      width: responsiveWidth(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: responsiveFontSize(0.25),
                      marginLeft: responsiveFontSize(1),
                    }}>
                    <Text style={{color: 'white'}}>Live</Text>
                  </View>
                )}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            {counter > 0 ? (
              <View
                style={{
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 11,
                  flex: 1,
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: responsiveFontSize(9),
                    fontWeight: 'bold',
                  }}>
                  {counter}
                </Text>
              </View>
            ) : (
              <>
                {isSession ? (
                  <View style={{flex: 1, width: responsiveWidth(100)}}>
                    <View style={{flex: 1}}>
                      <View style={{flex: 3.25}}>
                        <View style={{flex: 1, width: responsiveWidth(100)}}>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {}}
                            style={{
                              alignItems: 'center',
                              position: 'relative',
                              flex: 1,
                              justifyContent: 'center',
                            }}>
                            <>
                              {playerState == 'Ended' ? (
                                <View
                                  style={{
                                    backgroundColor: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 11,
                                    flex: 1,
                                    width: '100%',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: responsiveFontSize(3.5),
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                    }}>
                                    Live session ended
                                  </Text>
                                </View>
                              ) : (
                                <>
                                  <IVSPlayer
                                    // autoMaxQuality={100000}
                                    // logLevel={(logLevel)=>{
                                    //   console.log(logLevel)
                                    // }}
                                    liveLowLatency={true}
                                    onData={qualities => {
                                      console.log(qualities);
                                      // onSetQaulity()
                                    }}
                                    onLoad={() => setIsShowLoader(false)}
                                    autoQualityMode={true}
                                    onError={error => {
                                      console.log(error, 'onError');
                                      setIsShowLoader(false);
                                      setIsSession(false);
                                      // alert('Error: ' + error);
                                    }}
                                    onPlayerStateChange={state => {
                                      setPlayerState(state);
                                    }}
                                    maxBitrate={1427999}
                                    progressInterval={0}
                                    onTextCue={textCue => {
                                      console.log(textCue, 'onTextCue');
                                    }}
                                    onTextMetadataCue={textMetadataCue => {
                                      console.log(
                                        textMetadataCue,
                                        'textMetadataCue',
                                      );
                                    }}
                                    initialBufferDuration={0.001}
                                    style={{
                                      width: '100%',
                                      flex: 1,
                                      backgroundColor: 'black',
                                    }}
                                    resizeMode="aspectFit"
                                    // ref={videoPlayer}
                                    streamUrl={
                                      'https://862720a0b228.us-east-1.playback.live-video.net/api/video/v1/us-east-1.210751258169.channel.UfgIXqieOPhO.m3u8'
                                    }
                                  />
                                  <View
                                    style={{
                                      width: '100%',
                                      flexDirection: 'row',
                                      position: 'absolute',
                                      bottom: 0,
                                      zIndex: 2,
                                    }}>
                                    <View
                                      style={{
                                        width: '33.33%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: responsiveFontSize(0.5),
                                        borderColor: 'lightgray',
                                        borderRightWidth: 1,
                                      }}>
                                      <EyeIcon
                                        color={'lightgray'}
                                        name="eye"
                                        size={responsiveFontSize(1.75)}
                                      />
                                      <Text
                                        style={{
                                          marginLeft: responsiveFontSize(0.75),
                                          fontSize: responsiveFontSize(1.5),
                                          color: 'white',
                                        }}>
                                        Views
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: '33.33%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: responsiveFontSize(0.5),
                                        borderColor: 'lightgray',
                                        borderRightWidth: 1,
                                      }}>
                                      <CommentIcon
                                        color={'lightgray'}
                                        name="comment"
                                        size={responsiveFontSize(1.75)}
                                      />
                                      <Text
                                        style={{
                                          marginLeft: responsiveFontSize(0.75),
                                          fontSize: responsiveFontSize(1.5),
                                          color: 'white',
                                        }}>
                                        Comments
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: '33.33%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: responsiveFontSize(0.5),
                                      }}>
                                      <ShareIcon
                                        color={'lightgray'}
                                        name="share"
                                        size={responsiveFontSize(1.75)}
                                      />
                                      <Text
                                        style={{
                                          marginLeft: responsiveFontSize(0.75),
                                          fontSize: responsiveFontSize(1.5),
                                          color: 'white',
                                        }}>
                                        Share
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              )}
                            </>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{...styles.con2, flex: 1}}>
                        {renderBottomItem(data)}
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.errCont}>
                    <Text style={styles.errMsg}>
                      Influencer does not have any live event at this time.
                      Check back later.
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
        <Toast
          visibilityTime={2000}
          config={toastConfig}
          ref={c => {
            if (c) Toast.toastInstance = c;
          }}
          onHide={() => closeModle()}
        />
      </SafeAreaView>
    </Modal>
  );
}

function mapStateToProps({
  bioShopAllPosts,
  categoriesReducer,
  authRed,
  bioShopReducer,
}) {
  return {bioShopAllPosts, categoriesReducer, authRed, bioShopReducer};
}

export default connect(mapStateToProps, {
  ...myListAct,
  ...favAct,
  ...urlShortnerAct,
})(LiveSessionModal);

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
    height: tablet ? '30%' : '45%',
  },
  btnSquare: {
    backgroundColor: colors.themeblue,
    width: '49%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
    padding: responsiveFontSize(tablet ? 0.5 : 1),
  },
  videoPlay: {
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: '#010b40',
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    position: 'absolute',
    // top: '50%',
    alignSelf: 'center',
    top: responsiveHeight(26),
    left: responsiveWidth(42),

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
  errCont: {
    backgroundColor: '#000',
    width: tablet ? '75%' : '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errMsg: {
    textAlign: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(4),
    paddingHorizontal: responsiveFontSize(1),
  },
});
