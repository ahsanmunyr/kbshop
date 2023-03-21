// @ts-nocheck
import React, {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
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
  KeyboardAvoidingView,
  StatusBar,
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
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';
import * as favAct from '../store/actions/favouriteAct';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import * as myListAct from '../store/actions/myListAct';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import * as urlShortnerAct from '../store/actions/urlShortnerAct';
import * as liveActions from '../store/actions/liveEvents';
import * as liveChatAct from '../store/actions/liveChatAct';
import Loader from './Loader';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/FontAwesome';
import { dateInDays } from '../utils/time';
import IVSPlayer from 'amazon-ivs-react-native-player';
import Btn from './Btn';
import Cart from '../screens/home/Live/liveFeatures/Cart';
import Shipping from '../screens/home/Live/liveFeatures/Shipping';
import ShippingMethod from '../screens/home/Live/liveFeatures/ShippingMethod';
import ChatScreen from '../screens/home/Live/ChatScreen';
import DetailScreen from '../screens/home/Live/DetailScreen';

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
  currentEvents,
  authRed
}) {
  // console.log(item, "itemitemitemitemitem");
  const [loading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState('');


  const videoPlayer = useRef();
  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };
  const {
    recording_url,
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
  const [dt, setDt] = useState([]);

  useLayoutEffect(() => {
    setDt(dateInDays(item.start_date, new Date(), 1))
  }, [])

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(dateInDays(item.start_date, new Date(), 1))
    }, 1000)

    return () => {
      clearInterval(secTimer)
    };
  }, [])

  function renderTimer() {
    return (
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(4),
            fontWeight: 'bold',
            width: responsiveWidth(15),
          }}>
          {dt[0]} :
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(4),
            fontWeight: 'bold',
            width: responsiveWidth(15),
          }}>
          {dt[1]} :
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(4),
            fontWeight: 'bold',
            width: responsiveWidth(15),
          }}>
          {dt[2]} :
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(4),
            fontWeight: 'bold',
            width: responsiveWidth(15),
          }}>
          {dt[3]}{' '}
        </Text>
      </View>
    );
  }

  if (currentEvents == 'upcomming') {
    return (
      <View style={{ flex: 1, width: responsiveWidth(100), height: responsiveHeight(100) }}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
        <ImageBackground
          resizeMode={item?.banner === 'https://static.konnect.bio/eventdefaultbanner/banner.png' ? 'contain' : 'cover'}
          style={{ width: responsiveWidth(100), flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: colors.themeblue }}
          source={{ uri: item.banner }}
        >
          <View style={{ ...styles.overlay, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 1.5 : 2), textAlign: 'center', marginBottom: responsiveFontSize(2) }}>This live event will start in</Text>
          {renderTimer()}

          <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.25), width: responsiveWidth(15) }}>DAYS</Text>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.25), width: responsiveWidth(15) }}>HOURS</Text>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.25), width: responsiveWidth(15) }}>MINUTES</Text>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.25), width: responsiveWidth(15) }}>SECONDS</Text>
          </View>
        <View style={{
          width:responsiveWidth(95),
          justifyContent:'space-around',alignItems:'center', flexDirection:'row',flexWrap:'wrap'
        }}>
          <TouchableOpacity>
            <View style={{
              backgroundColor: 'white',
              paddingHorizontal: responsiveScreenFontSize(2),
              height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(1),
              borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
            }}>
              <Text style={{
                fontWeight: 'bold', fontSize: responsiveScreenFontSize(2), color: 'black'
              }}>Notify me</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{
              backgroundColor: 'white',
              paddingHorizontal: responsiveScreenFontSize(2),
              height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(1),
              borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
            }}>
              <Text style={{
                fontWeight: 'bold', fontSize: responsiveScreenFontSize(2), color: 'black'
              }}>Add to my store</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{
              backgroundColor: 'white',
              paddingHorizontal: responsiveScreenFontSize(2),
              height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(1),
              borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
            }}>
              <Text style={{
                fontWeight: 'bold', fontSize: responsiveScreenFontSize(2), color: 'black'
              }}>Share</Text>
            </View>

          </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center', width: responsiveWidth(95),
            marginVertical: responsiveScreenFontSize(2), flexWrap: 'wrap',
          }}>
            {
              promo != "" && promo != undefined && promo != "KB0" &&
              <View style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingHorizontal: responsiveScreenFontSize(1.5),
                height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(4),

                borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
              }}>
                <Text style={{
                  fontWeight: 'bold', fontSize: responsiveScreenFontSize(1.8), color: 'white'
                }}>Promo {promo}</Text>
              </View>
            }

            {
              authRed.data.account_type == 'customer' ?
                <>
                  {

                    currentEvents == "upcomming" &&
                    <>
                      {
                        item?.referral_percent !== 'undefined' && item?.referral_percent !== '' && item?.referral_percent !== '0' ?
                          <View style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingHorizontal: responsiveScreenFontSize(1.5),
                            height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(4),
                            borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                          }}>
                            <Text style={{
                              fontWeight: 'bold', fontSize: responsiveScreenFontSize(1.8), color: 'white'
                            }}>{item?.referral_percent}% Referral Fee</Text>
                          </View>
                          : null
                      }
                    </>

                  }
                </> :
                <>
                  {

                    currentEvents == "upcomming" &&
                    <>
                      {
                        item?.influencer_percent != undefined && item?.influencer_percent != 'undefined' && item?.influencer_percent !== '' && item?.influencer_percent !== '0' ?
                          <View style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingHorizontal: responsiveScreenFontSize(1.5),
                            height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(4),
                            borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                          }}>
                            <Text style={{
                              fontWeight: 'bold', fontSize: responsiveScreenFontSize(1.8), color: 'white'
                            }}>{item?.influencer_percent}% Influencer Fee</Text>
                          </View> : null
                      }
                    </>

                  }
                </>
            }



            {
              item?.discount !== undefined && item?.discount !== '' && item?.discount !== '0%' && item?.discount !== 'undefined' &&
              <View style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingHorizontal: responsiveScreenFontSize(1.5),
                height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(4),
                borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
              }}>
                <Text style={{
                  fontWeight: 'bold', fontSize: responsiveScreenFontSize(1.8), color: 'white'
                }}>{item?.discount} Off</Text>
              </View>
            }


          </View>
         
          <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 2 : 3), fontWeight: 'bold', textAlign: 'center', marginTop: responsiveFontSize(2), width: responsiveWidth(88) }}>{item.title}</Text>
          <View style={{
             width: responsiveFontSize(5), height: responsiveFontSize(5),
             borderRadius:responsiveScreenFontSize(50),
             borderWidth: 1, borderColor: 'white',justifyContent:'center',alignItems:'center'
          }}>
          <Image
            resizeMode='contain'
            
            style={{ width: responsiveFontSize(5), height: responsiveFontSize(5), borderRadius: responsiveScreenFontSize(50),  }}
            source={{ uri: item.brand_profile }}
          />
          </View>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 1 : 1.5), textAlign: 'center' }}>{item.brand_name}</Text>
          <View style={{height:responsiveScreenFontSize(5)}} />
        </ImageBackground>
      </View>
    );
  }



  return (
    <View style={{ flex: 1, width: responsiveWidth(100) }}>
      <TouchableOpacity
        disabled={!(item._id == current?._id)}
        activeOpacity={1}
        onPress={() => {
          if (item._id == current?._id) {
            onSetPause(!pause);
          }
        }}
        style={{ alignItems: 'center', flex: 1 }}>
        {pause && item._id == current._id ? (
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
            <Loader color={'white'} />
          </View>
        )}
        {(item.index == current.index ||
          item.index == current.index - 1 ||
          item.index == current.index + 1) && (
            // <Video
            //   repeat
            //   resizeMode="cover"
            //   paused={(item._id == current?._id) ? pause : true}
            //   //  paused={(pause && !(item._id==current._id))}
            //   bufferConfig={{
            //     minBufferMs: 6000,
            //     maxBufferMs: 7000,
            //     bufferForPlaybackMs: 500,
            //     bufferForPlaybackAfterRebufferMs: 1000
            //   }}
            //   onLoadStart={() => {
            //     setLoading(true)
            //   }}
            //   onLoad={() => {
            //     setLoading(false)
            //   }}
            //   hideShutterView={false}
            //   ref={videoPlayer}
            //   playInBackground={false}
            //   playWhenInactive={false}
            //   ignoreSilentSwitch="ignore"
            //   disableFocus
            //   source={{ uri: media_url ? media_url : null }}
            //   style={{ width: tablet ? '75%' : '100%', flex: 1, backgroundColor: 'black' }}></Video>
            <>
              {
                item.event_status == "recorded" ?

                  <Video

                    resizeMode="cover"
                    paused={(item._id == current?._id) ? pause : true}
                    controls={true}
                    // paused={false}
                    //  paused={(pause && !(item._id==current._id))}
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
                    // ref={videoPlayer}
                    playInBackground={false}
                    playWhenInactive={false}
                    ignoreSilentSwitch="ignore"
                    disableFocus
                    source={{ uri: recording_url }}
                    style={{ width: tablet ? '75%' : '100%', flex: 1, backgroundColor: 'black' }}>
                  </Video>

                  : playerState == "Ended" ? (
                    <View style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', zIndex: 11, flex: 1, width: '100%' }}>
                      <Text style={{ color: 'white', fontSize: responsiveFontSize(3.5), fontWeight: 'bold', textAlign: 'center' }}>Live session ended</Text>
                    </View>
                  ) : (
                    <IVSPlayer
                      liveLowLatency={true}
                      onData={qualities => {
                        console.log(qualities);
                      }}

                      paused={(item._id == current?._id) ? pause : true}
                      autoQualityMode={true}
                      onError={error => {
                        console.log(error, 'onError');
                      }}
                      onPlayerStateChange={(state) => {
                        console.log("state", state)
                        setPlayerState(state)
                      }}
                      maxBitrate={850000}
                      progressInterval={0}
                      onTextCue={textCue => {
                        console.log(textCue, 'onTextCue');
                      }}
                      onTextMetadataCue={textMetadataCue => {
                        console.log(textMetadataCue, 'textMetadataCue');
                      }}
                      initialBufferDuration={0.1}
                      style={{
                        width: '100%',
                        backgroundColor: 'black',
                      }}
                      resizeMode="aspectFit"
                      streamUrl={item.playbackUrl}
                    />
                  )
              }
              {/* {playerState == "Ended" ? (
              <View style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', zIndex: 11, flex: 1, width: '100%' }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(3.5), fontWeight: 'bold', textAlign: 'center' }}>Live session ended</Text>
              </View>
            ) : (
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
                // playbackRate={0.5}
                paused={(item._id == current?._id) ? pause : true}
                // onLoad={() => setIsShowLoader(false)}
                autoQualityMode={true}
                onError={error => {
                  console.log(error, 'onError');
                  // setIsShowLoader(false)
                  // setIsSession(false)
                  // alert('Error: ' + error);
                }}
                onPlayerStateChange={(state) => {
                  console.log("state",state)
                  setPlayerState(state)
                }}
                maxBitrate={850000}
                progressInterval={0}
                onTextCue={textCue => {
                  console.log(textCue, 'onTextCue');
                }}
                onTextMetadataCue={textMetadataCue => {
                  console.log(textMetadataCue, 'textMetadataCue');
                }}
                initialBufferDuration={0.1}
                style={{
                  width: '100%',
                  // flex: 1,
                  backgroundColor: 'black',
                }}
                resizeMode="aspectFit"
                // ref={videoPlayer}
                streamUrl={item.playbackUrl}
              />
            )} */}
            </>
          )}
      </TouchableOpacity>
    </View>
  );
}

function LiveModal({
  visible,
  closeModle,
  data,
  bioShopAllPosts,
  loadMore,
  categoriesReducer,
  select,
  openWeb,
  authRed,
  urlShortner,
  currentEvents,
  list,
  currentIndex,
  getProducts,
  liveProducts,
  setCurrentChild,
  getProductDetail,
  currentChild,
  setProDtLoading,
  getCartList,
  cartList,
  checkoutProductFinal,
  setAllCheck,
  removeCart,
  renderModal,
  previousEventItem,
  upcomming,
  eventItem,
  createChatToken
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
  const [productLoading, setProductLoading] = React.useState(true)
  const [checkLoadingF, setCheckLoadingF] = useState(false)
  const [loading, setLoading] = useState(false)
  const [revLoading, setRevLoading] = useState(false)
  const [seletedChild, setSelectedChild] = useState({})
  const [currentRevId, setCurrentRevId] = useState("")
  const [shippingPage, setShippingPage] = useState("")

  const [menu, setMenu] = useState("shop")



  const flatRef = useRef();
  const dispatch = useDispatch();
  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };

  useEffect(() => {
    if (eventItem?._id) {
      // console.log("createChatToken");

      createChatToken(eventItem?._id)
    }

  }, [eventItem, menu])


  React.useEffect(() => {
    if (scroll == 0) {
      setInitialIndex(1);
    }
    setScroll(
      list?.data
        .map(it => it._id)
        .indexOf(upcomming?._id)
    );
  }, []);


  // console.log(upcomming, "======================================")

  function renderItem(item, index, data) {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: responsiveWidth(96.5),
          marginHorizontal: responsiveFontSize(0.75),
          marginVertical: responsiveFontSize(tablet ? 0.5 : 0.75),
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
            source={{
              uri: item.mediaUrl,
            }}
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: responsiveHeight(tablet ? 15 : 18),
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
          <View style={{ width: '100%' }}>
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
              <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.8) }}>
                {item.ProductSku}
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                <Text style={{ color: 'green' }}>${item.productAmount}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.btnSquareCont}>
            <TouchableOpacity
              style={{ ...styles.btnSquare }}
              onPress={() => {
                // closeModle();
                // console.log("ssss", item)
                setCurrentChild(item)
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
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.5),
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
                setSelectedChild(item)
                setIsShareApi(true)
                urlShortner(`${item?.ProductUrl}`).then((res) => {
                  if (res?.message) {
                    // console.log(item.ProductUrl)

                    Share.open({
                      title: item.ProductSku?.toString(),
                      url: res?.message,
                    })
                      .then(res => {
                        // console.log(res, 'RES');
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
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.5),
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

  useEffect(() => {
    if (currentChild && visible) {

      getProductDetailMethod()
    }
  }, [currentChild])

  function getProductDetailMethod() {
    setProDtLoading(true)

    // ERROR AHSAN 505
    getProductDetail({
      brand: liveProducts[0]?.brand[0]?._id,
      product_id: currentChild?.id
    }).then(() => setProDtLoading(false))
  }

  useEffect(() => {
    if (liveProducts[0]?.brand[0]?._id) {
      // alert(liveProducts[0]?.brand[0]?._id)
      console.log("getCartList");
      getCartList(liveProducts[0]?.brand[0]?._id)
    }
  }, [liveProducts])

  const onChangeItemBottom = useCallback(({ viewableItems }) => {

    setActiveTag(viewableItems[0]?.index);
    setCurrentChild(viewableItems[0]?.item)

  }, []);

  // alert(JSON.stringify(liveProducts))
  function renderBottomItem(data) {
    return (
      <FlatList
        data={liveProducts[0]?.products}
        renderItem={({ item, index }) => renderItem(item, index, data)}
        keyExtractor={(item, i) => i.toString()}
        // pagingEnabled={true}
        ref={flatRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        // horizontal={true}
        showsVerticalScrollIndicator={false}
      // onViewableItemsChanged={onChangeItemBottom}
      />
    );
  }

  const onChangeItem = useCallback(({ viewableItems, changed }) => {
    if (viewableItems[0]?.item) {
      setProductLoading(true)
      console.log("getProducts");
      getProducts(viewableItems[0]?.item._id).then(() => setProductLoading(false))
      setCurrent({ ...viewableItems[0]?.item, index: viewableItems[0]?.index });
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
      length: responsiveHeight(100),
      offset: responsiveHeight(100) * index,
      index,
    };
  };

  function renderCart() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1, width: '100%', backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: responsiveFontSize(2) }}>
          {cartList.lineItems?.map((item, index) => {
            return (
              <View key={index} style={{ backgroundColor: 'white', borderRadius: responsiveFontSize(0.5), width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingVertical: responsiveFontSize(1) }}>
                <View style={{ width: '20%' }}>
                  <Image
                    style={{ width: '100%', height: 80, borderRadius: responsiveFontSize(0.5) }}
                    source={{ uri: item.variant?.image?.src }} />
                </View>
                <View style={{ width: '80%', paddingLeft: responsiveFontSize(1), justifyContent: 'space-between', paddingVertical: responsiveFontSize(0.5) }}>
                  <Text style={{ color: 'black', fontSize: responsiveFontSize(1.75) }}>
                    {item.variant.title}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View>
                      <Text style={{ color: 'green', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), paddingRight: responsiveFontSize(2) }}>Price: </Text>${item.variant.price}
                      </Text>
                      <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5) }}>
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), paddingRight: responsiveFontSize(2) }}>Quantity: </Text>{item.quantity}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={revLoading}
                        onPress={() => {
                          // alert(JSON.stringify({
                          //   brand:liveProducts[0]?.brand[0]?._id,
                          //   variant_id:item?.variant?.id
                          // }))
                          setRevLoading(true)
                          setCurrentRevId(item?.id)
                          removeCart({
                            brand: liveProducts[0]?.brand[0]?._id,
                            line_item_id: item?.id
                          }).then((res) => {
                            // alert(JSON.stringify(res))
                            getCartList(liveProducts[0]?.brand[0]?._id).then(() => setRevLoading(false))
                          })
                          // .catch(err=>alert(JSON.stringify(err.response)))
                        }}
                        style={{ paddingHorizontal: responsiveFontSize(1), paddingVertical: responsiveFontSize(0.5), backgroundColor: 'red', borderRadius: responsiveFontSize(0.5) }}>
                        {(revLoading && currentRevId == item?.id) ? <Loader size={2} color="white" /> : (<Text style={{ color: 'white', textAlign: 'center', fontSize: responsiveFontSize(1.5) }}>Remove</Text>)}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: responsiveFontSize(1) }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.75) }}>Total Amount:</Text>
            <Text style={{ color: 'green', fontSize: responsiveFontSize(1.75), marginLeft: responsiveFontSize(1) }}>${cartList?.lineItems?.reduce((acc, it) => {
              acc = acc + (it.variant.price * it.quantity)
              return acc
            }, 0)}</Text>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: responsiveFontSize(1.5) }}>
            <View style={{ width: '100%' }}>
              <Btn
                disabled={(cartList?.lineItems?.length > 0) ? false : true}
                color={(cartList?.lineItems?.length > 0) ? colors.themeblue : "lightgray"}

                loader={checkLoadingF}
                call={() => {
                  setCheckLoadingF(true)
                  checkoutProductFinal(liveProducts[0]?.brand[0]?._id).then((res) => {
                    setCheckLoadingF(false)
                    // alert(res.message)
                    setAllCheck(res.message)
                  })
                }}
                text={"Checkout"} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }


  function renderOptions(data) {

    if (menu == "shop") {
      return renderBottomItem(data)
    }
    else if (menu == "cart") {

      return <Cart
        cartList={cartList}
        setRevLoading={setRevLoading}
        setCurrentRevId={setCurrentRevId}
        liveProducts={liveProducts}
        removeCart={removeCart}
        getCartList={getCartList}
        currentRevId={currentRevId}
        revLoading={revLoading}
        checkLoadingF={checkLoadingF}
        setCheckLoadingF={setCheckLoadingF}
        checkoutProductFinal={checkoutProductFinal}
        setAllCheck={setAllCheck}
        setShippingPage={setShippingPage}
      />
      // if (shippingPage == "add") {
      //   return <Shipping
      //     cb={()=>{
      //       return getCartList(liveProducts[0]?.brand[0]?._id).then(()=>{
      //         setShippingPage("shippingMethod")
      //       })
      //     }}
      //     setShippingPage={setShippingPage} />
      // }
      // else if (shippingPage == "shippingMethod") {
      //   return <ShippingMethod setShippingPage={setShippingPage} />
      // }
      // else {
      //   return <Cart
      //     cartList={cartList}
      //     setRevLoading={setRevLoading}
      //     setCurrentRevId={setCurrentRevId}
      //     liveProducts={liveProducts}
      //     removeCart={removeCart}
      //     getCartList={getCartList}
      //     currentRevId={currentRevId}
      //     revLoading={revLoading}
      //     checkLoadingF={checkLoadingF}
      //     setCheckLoadingF={setCheckLoadingF}
      //     checkoutProductFinal={checkoutProductFinal}
      //     setAllCheck={setAllCheck}
      //     setShippingPage={setShippingPage}
      //   />
      // }
    } else if (menu == "detail") {
      return <DetailScreen event={eventItem} current={currentEvents} />
    }
    else if (menu == "chat") {
      return <ChatScreen event={eventItem} current={currentEvents} />
    }
  }
  // console.log(previousEventItem, "previousEventItempreviousEventItempreviousEventItempreviousEventItempreviousEventItempreviousEventItem")
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={closeModle}
      visible={visible}
      
      style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>

      {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}> */}
      {renderModal && renderModal()}
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
          {currentEvents == "previous" ? (
            <View style={{ position: 'absolute', left: responsiveFontSize(1), top: responsiveFontSize(1), zIndex: 1, flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                  color: 'gray',
                  marginLeft: responsiveFontSize(1),
                  fontWeight: 'bold',
                }}>
                {current?.brand_name}
              </Text>
              <View style={{ left: responsiveFontSize(1), backgroundColor: 'red', paddingVertical: responsiveFontSize(0.25), width: responsiveWidth(18), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveFontSize(0.25) }}>
                <Text style={{ color: 'white' }}>Recorded</Text>
              </View>
            </View>
          ) : currentEvents !== "upcomming" ? (
            <View style={{ position: 'absolute', left: responsiveFontSize(1), top: responsiveFontSize(1), zIndex: 1, flexDirection: 'row', }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                  color: 'gray',
                  marginLeft: responsiveFontSize(1),
                  fontWeight: 'bold',
                }}>
                {current?.brand_name}
              </Text>
              <View style={{ left: responsiveFontSize(1), backgroundColor: 'red', paddingVertical: responsiveFontSize(0.25), width: responsiveWidth(10), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveFontSize(0.25) }}>
                <Text style={{ color: 'white' }}>Live</Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              position: 'absolute',
              right: responsiveFontSize(1),
              top: responsiveFontSize(1),
              zIndex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                closeModle();
              }}>
              <IconCross
                name="cross"
                color={currentEvents == 'upcomming' ? 'white' : 'gray'}
                size={responsiveFontSize(tablet ? 2 : 4)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, width: responsiveWidth(100) }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={currentEvents == "upcomming" ? list.data : currentEvents == "previous" && previousEventItem?.length > 0 ?
                    previousEventItem?.map(it => {
                      return {
                        ...it,
                        children: children1,
                      }
                    }) :
                    currentEvents.liveEvents?.data.map(it => {
                      return {
                        ...it,
                        children: children1,
                      }
                    })}
                  initialScrollIndex={currentEvents == "upcomming" ? scroll : currentEvents.index} // for experiment ahsan
                  getItemLayout={getItemLayout}
                  onViewableItemsChanged={onChangeItem}
                  viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                  }}
                  pagingEnabled={true}
                  // horizontal={true}
                  renderItem={({ item, index }) => (
                    <RenderPost
                      current={current}
                      item={{ ...item, index }}
                      activeTag={activeTag}
                      onSetPause={onSetPause}
                      pause={pause}
                      flatRef={flatRef}
                      authRed={authRed}
                      currentEvents={currentEvents}
                    />
                  )}
                  onEndReached={loadMore}
                  showsHorizontalScrollIndicator={false}
                  onEndReachedThreshold={0.1}
                  keyExtractor={(item, id) => id.toString()}
                />

              </View>
              {currentEvents !== "upcomming" && (
                <View style={{ ...styles.con2, flex: tablet ? 1.3 : 1.75 }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => setMenu("shop")}
                      style={{ width: '25%', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveFontSize(1), borderBottomColor: colors.themeblue, borderBottomWidth: menu == "shop" ? 2 : 0 }}>
                      <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: 'bold', color: menu == "shop" ? "black" : "gray" }}>ShopXX</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // createChatToken(eventItem?._id)
                        setMenu("chat")
                      }}
                      style={{ width: '25%', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveFontSize(0.5), borderBottomColor: colors.themeblue, borderBottomWidth: menu == "chat" ? 2 : 0 }}>
                      <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: 'bold', color: menu == "chat" ? "black" : "gray" }}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setMenu("detail")}
                      style={{ width: '25%', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveFontSize(0.5), borderBottomColor: colors.themeblue, borderBottomWidth: menu == "detail" ? 2 : 0 }}>

                      <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: 'bold', color: menu == "detail" ? "black" : "gray" }}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setMenu("cart")}
                      style={{ width: '25%', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveFontSize(0.5), borderBottomColor: colors.themeblue, borderBottomWidth: menu == "cart" ? 2 : 0 }}>
                      {cartList?.lineItems?.length > 0 && (
                        <View style={{ backgroundColor: 'red', borderRadius: responsiveFontSize(12), position: 'absolute', right: responsiveWidth(4), top: responsiveWidth(1), width: responsiveFontSize(tablet ? 1.5 : 2), height: responsiveFontSize(tablet ? 1.5 : 2), justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 1 : 1.5), textAlign: 'center', textAlignVertical: 'center' }}>{cartList?.lineItems?.length}</Text>
                        </View>
                      )}
                      <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: 'bold', color: menu == "cart" ? "black" : "gray" }}>Cart</Text>
                    </TouchableOpacity>
                  </View>
                  {productLoading ? <Loader /> : renderOptions(data)}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      {/* </SafeAreaView> */}

    </Modal>
  );
}

function mapStateToProps({ bioShopAllPosts, categoriesReducer, authRed, liveProducts, cartList }) {
  return { bioShopAllPosts, categoriesReducer, authRed, liveProducts, cartList };
}

export default connect(mapStateToProps, { ...myListAct, ...favAct, ...urlShortnerAct, ...liveActions, ...liveChatAct })(LiveModal);

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
    // flexDirection: 'row',
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
  },
  btnSquare: {
    backgroundColor: colors.themeblue,
    width: '49%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
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
    top: responsiveHeight(35),
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

