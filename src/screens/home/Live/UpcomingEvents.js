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
  import * as liveActions from '../../../store/actions/liveEvents';
  import * as liveChatAct from '../../../store/actions/liveChatAct';
  import * as NotifyAct from '../../../store/actions/NotifyAct';
  import * as kbslyAct from '../../../store/actions/kbsly';
  import Loader from '../../../components/Loader';
  import EyeIcon from 'react-native-vector-icons/AntDesign';
  import CommentIcon from 'react-native-vector-icons/FontAwesome';
  import { dateInDays } from '../../../utils/time';
  import IVSPlayer from 'amazon-ivs-react-native-player';
  import Btn from '../../../components/Btn';
import config from '../../../config/config';

  
  const tablet = deviceInfo.isTablet();
  // const children1 = [
  //   {
  //     ProductName: 'Vaughn Trucker | Aspen Mid',
  //     ProductSku: '11362',
  //     ProductUrl:
  //       'https://www.dl1961.com/products/vaughn-trucker-aspen-mid?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1',
  //     coordinates: [[Object]],
  //     id: '4be7d9b4-d8cc-4beb-8c27-7704b1482b2f',
  //     imgid: 76143,
  //     isFavoriteChild: false,
  //     media_url:
  //       'https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11362_VAUGHN_ASPENMID_027.jpg?v=1657557447',
  //     productAmount: '158.00',
  //     productCategory: ['62b6fed85dc7524f880aed88'],
  //     productDesc:
  //       'Vaughn is a vintage-inspired classic trucker jacket that’s neat at the shoulders and straight through the body.',
  //     productPromoCodeDscs: '0%',
  //     productPromoCodePromo: 'KB0',
  //     skuDataOther: '',
  //   },
  //   {
  //     ProductName: 'Sean Shirt Jacket | Dark Rinse',
  //     ProductSku: '11365',
  //     ProductUrl:
  //       'https://www.dl1961.com/products/sean-shirt-jacket-dark-rinse?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1',
  //     coordinates: [[Object]],
  //     id: '1584a030-b4b4-459a-be96-c513cab26db6',
  //     imgid: 78324,
  //     isFavoriteChild: false,
  //     media_url:
  //       'https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11365_SEANSHIRTJACKET_DARKRINSE_1033.jpg?v=1657557593',
  //     productAmount: '168.00',
  //     productCategory: ['62b6fed85dc7524f880aed88'],
  //     productDesc:
  //       'Sean is a long sleeve shirt jacket with a boxy fit, featuring a button front closure and front patch pockets.',
  //     productPromoCodeDscs: '0%',
  //     productPromoCodePromo: 'KB0',
  //     skuDataOther: '',
  //   },
  // ];
  
  export function RenderPost({
    item,
    current,
    currentEvents,
    authRed,
    notifyMe,
    kbslyShortenURL
  }) {

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
    const [isNotifyCall, setIsNotifyCall] = useState(false);
    const [isShare, setIsShare] = useState(false)
  
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
              fontSize: responsiveFontSize(tablet ? 3 : 4),
              fontWeight: 'bold',
              width: responsiveWidth(15),
            }}>
            {dt[0]} :
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(tablet ? 3 : 4),
              fontWeight: 'bold',
              width: responsiveWidth(15),
            }}>
            {dt[1]} :
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(tablet ? 3 : 4),
              fontWeight: 'bold',
              width: responsiveWidth(15),
            }}>
            {dt[2]} :
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(tablet ? 3 : 4),
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
          {/* <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} /> */}
          <ImageBackground
            resizeMode={item?.banner === 'https://static.konnect.bio/eventdefaultbanner/banner.png' ? 'contain' : 'cover'}
            style={{ width: responsiveWidth(100), flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: colors.themeblue}}
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
            <TouchableOpacity onPress={()=>{
              setIsNotifyCall(true)
              notifyMe(item?._id).then(()=>setIsNotifyCall(false))
              }}
              disabled={isNotifyCall}
            >
              <View style={{
                backgroundColor: 'white',
                // paddingHorizontal: responsiveScreenFontSize(2),
                width:responsiveWidth(tablet ? 20 : 25),
                height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(1),
                // borderWidth: responsiveScreenFontSize(0.3), 
                borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
              }}>
                {isNotifyCall ? <Loader size={3} /> :<Text style={{
                  fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 2), color: 'black'
                }}>Notify me</Text>}
              </View>
  
            </TouchableOpacity>
            {/* <TouchableOpacity>
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
  
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{
              // console.log(item)
              // console.log(`${config.base_url_for_KBSLY}/upcoming-event/${item?._id}/${item?.instagram_username == "" ? item?.pixel_id : item?.instagram_username}?origin=home&pixel_id=${authRed?.data?.pixel_id}&publisher_id=${authRed?.data?._id}&event_id=${item?._id}&roiEvent=true&brand=1&event=eventshare#`)
              setIsShare(true)
              kbslyShortenURL(`${config.base_url_for_KBSLY}/upcoming-event/${item?._id}/${item?.instagram_username == "" ? item?.pixel_id : item?.instagram_username}?origin=home&pixel_id=${authRed?.data?.pixel_id}&publisher_id=${authRed?.data?._id}&event_id=${item?._id}&roiEvent=true&brand=1&event=eventshare#`)
              .then((res) => {
                if (res?.message) {
                  Share.open({
                    title: item?.brand_name?.toString(),
                    url: res?.message,
                  })
                    .then(res => {
                      console.log(res, "share btn")
                    })
                    .catch(err => {
                      err && console.log(err);
                    })
                }
                setIsShare(false)
              })
              }}
              disabled={isShare}
            >
              <View style={{
                backgroundColor: 'white',
                // paddingHorizontal: responsiveScreenFontSize(2),
                width:responsiveWidth(tablet ? 20 : 25),
                height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(1),
                // borderWidth: responsiveScreenFontSize(0.3), 
                borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
              }}>
                {isShare ? <Loader size={3} /> : <Text style={{
                  fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 2), color: 'black'
                }}>Share</Text>}
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
                  paddingHorizontal: responsiveScreenFontSize(tablet ? 1.8 : 1.5),
                  height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(4),
  
                  borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                }}>
                  <Text style={{
                    fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8), color: 'white'
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
                              height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(4),
                              borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                            }}>
                              <Text style={{
                                fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8), color: 'white'
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
                              height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(4),
                              borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                            }}>
                              <Text style={{
                                fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8), color: 'white'
                              }}>{item?.influencer_percent}% Influencer Fee</Text>
                            </View> 
                            : null
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
                  height: responsiveScreenFontSize(tablet ? 4 : 5), borderRadius: responsiveScreenFontSize(4),
                  borderWidth: responsiveScreenFontSize(0.3), borderColor: 'white', alignSelf: 'center', marginVertical: responsiveScreenFontSize(2), justifyContent: 'center', alignItems: "center"
                }}>
                  <Text style={{
                    fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8), color: 'white'
                  }}>{item?.discount} Off</Text>
                </View>
              }
  
  
            </View>
           
            <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 1.4 : 3), fontWeight: 'bold', textAlign: 'center', marginTop: responsiveFontSize(2), width: responsiveWidth(88) }}>{item.title}</Text>
            <View style={{
               width: responsiveFontSize(5), height: responsiveFontSize(5),
               borderRadius:responsiveScreenFontSize(50),
               borderWidth: 1, borderColor: 'white',justifyContent:'center',alignItems:'center',
               marginTop:responsiveHeight(1)
            }}>
            <Image
              resizeMode='contain'
              
              style={{ width: responsiveFontSize(5), height: responsiveFontSize(5), borderRadius: responsiveScreenFontSize(50),  }}
              source={{ uri: item.brand_profile }}
            />
            </View>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 1.25 : 1.5), textAlign: 'center' }}>{item.brand_name}</Text>
            <View style={{height:responsiveScreenFontSize(5)}} />
          </ImageBackground>
        </View>
      );
    }
  
  

  }
  
  function UpcomingEvents({
    route,
    navigation,
    authRed,
    getUpcommingEvents,
    upcomingEvents,
    notifyMe,
    kbslyShortURL
  }) {
    const upcomming = route?.params?.upcomming
    const list = route?.params?.list
    const currentEvents = route?.params?.currentEvents
    
    
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
    const [upcommingPage,setUpcommingPage]=useState(route?.params?.upcommingPage)
  

  
  
  
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
        list?.data
          .map(it => it._id)
          .indexOf(upcomming?._id)
      );
    }, []);
  
  
    // console.log(upcomming, "======================================")
  
 
  


  
    const onChangeItem = useCallback(({ viewableItems, changed }) => {
    //   if (viewableItems[0]?.item) {
    //     setProductLoading(true)
    //     console.log("getProducts");
    //     getProducts(viewableItems[0]?.item._id).then(() => setProductLoading(false))
    //     setCurrent({ ...viewableItems[0]?.item, index: viewableItems[0]?.index });
    //   }
    }, []);
  

    const getItemLayout = (data, index) => {
      return {
        length: responsiveHeight(100),
        offset: responsiveHeight(100) * index,
        index,
      };
    };
  
 
    function renderFooterUpcomming() {
        return (
          <>
            {(upcomingEvents.total_records) > upcomingEvents.data.length ? (
              <View style={styles.footer1}>
                <Text style={styles.btnText1}>Loading...</Text>
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              </View>
            ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
          </>
        );
      }


      const loadMoreUpcomming = useCallback(() => {
        // console.log(previousEvents.total_records, previousEvents.data.length)
        if (upcomingEvents.total_records> upcomingEvents.data.length) {
          console.log(upcommingPage,route.params?.ids)
          getUpcommingEvents(upcommingPage, route.params?.ids,(route?.params?.brand_id),"loadMore").then(()=>{
            setUpcommingPage(pre=>pre+1)
          })
        }
      }, [upcommingPage,upcomingEvents]);



    return (

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: colors.themeblue,
          }}>

          
            <View
              style={{
                position: 'absolute',
                right: responsiveFontSize(1),
                top: responsiveFontSize(1),
                zIndex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}>
                <IconCross
                  name="cross"
                  color={'white'}
                  size={responsiveFontSize(tablet ? 2 : 5)}
                />
              </TouchableOpacity>
            </View>
      
            
                <View style={{height: responsiveHeight(100),width: responsiveWidth(100) }}>
                  <FlatList
                    data={upcomingEvents.data}
                    initialScrollIndex={scroll} // for experiment ahsan
                    getItemLayout={getItemLayout}
                    // onViewableItemsChanged={onChangeItem}
                    viewabilityConfig={{
                      itemVisiblePercentThreshold: 50,
                    }}
                    pagingEnabled={true}
                    // horizontal={true}
                    renderItem={({ item, index }) => (
                      <RenderPost
                        current={current}
                        item={{ ...item, index }}
                        authRed={authRed}
                        currentEvents={'upcomming'}
                        notifyMe={notifyMe}
                        kbslyShortenURL={kbslyShortURL}
                      />
                    )}
                    // onEndReached={loadMore}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, id) => id.toString()}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadMoreUpcomming}
                    ListFooterComponent={renderFooterUpcomming}
                  />
  
                </View>
       
             
            
       
        </View>
    );
  }
  
  function mapStateToProps({ bioShopAllPosts, categoriesReducer, authRed, liveProducts, cartList,upcomingEvents }) {
    return { bioShopAllPosts, categoriesReducer, authRed, liveProducts, cartList ,upcomingEvents};
  }
  
  export default connect(mapStateToProps, { ...myListAct, ...favAct, ...urlShortnerAct, ...liveActions, ...liveChatAct, ...NotifyAct, ...kbslyAct })(UpcomingEvents);
  
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
    footer1: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'black'
      },
      btnText1: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      },
  });
  
  