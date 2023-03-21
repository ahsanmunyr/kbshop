// @ts-nocheck
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../../assets/colors/colors';
import LiveWebModal from '../../liveWebModal';
import * as liveEvents from '../../../../store/actions/liveEvents';
import * as kbsly from '../../../../store/actions/kbsly';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
import Loader from '../../../../components/Loader';
import AntDesign from "react-native-vector-icons/AntDesign"
import numeral from 'numeral';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const tablet = deviceInfoModule.isTablet();

const ShopModal = ({
  opens,
  close,
  data,
  portrait,
  index,
  authRed,
  getProductDetail,
  liveProducts,
  //   openWeb,
  setCurrentChild,
  currentChild,
  onChangeHid,
  hid,
  influencerShop,
  kbslyShortURL,
  setControlShare,
  flatLayout
}) => {
  // console.log(data?.discount, "data")
  const webViewRef = useRef()
  const [webModal, setWebModal] = useState(false);
  const [webData, setWebData] = useState({});
  //   const [currentChild, setCurrentChild] = useState({});
  const [proDtLoading, setProDtLoading] = useState(false);
  const [allCheck, setAllCheck] = useState('');
  const [openCartDetailWebView, setOpenCartDetailWebView] = useState(false)
  const [url, setUrl] = useState('')
  const [nestedModal, setNestedModal] = useState(false)
  const tabHeight = useBottomTabBarHeight()
  //   useEffect(() => {
  //     // console.log(data?.products[0], "+++++++++++++");
  //   }, []);

  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };



  function renderModal() {
    return (
      <>
        {/* {(webModal ? true : false) && ( */}
        {(nestedModal || allCheck ? true : false) && (
          <LiveWebModal
            closeModle={() => {
              setNestedModal(false);
              setAllCheck('');
            }}
            data={webData}
            parentHeight={(flatLayout?.height + responsiveScreenFontSize(tablet ? 4.5 : 8)) - Dimensions.get('screen').width / (16 / 9)}
            currentChild={currentChild}
            proDtLoading={proDtLoading}
            visible={nestedModal || allCheck ? true : false}
            allCheck={allCheck}
            onModalShow={() => {
              getProductDetail({
                brand: liveProducts[0]?.brand[0]?._id,
                product_id: currentChild?.id,
              }).then(() => {
                setProDtLoading(false);
              });
            }}
          />
        )}
      </>
    );
  }

  function RenderItem({ item, index, influencerShop, setOpenCartDetailWebView, kbslyShortURL, setControlShare, close }) {
    // console.log(item.ProductUrl, "DATA====")
    const [isShortUrlApiCall, setIsShortUrlApiCall] = useState(false)


    return (
      <View
        key={index}
        style={{
          width: responsiveWidth(90),
          alignSelf: 'center',
          height: tablet ? responsiveHeight(18) : responsiveHeight(18),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: responsiveScreenFontSize(1),
          // backgroundColor:'green'
        }}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(18),
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveWidth(tablet ? 17 : 25),
              height: responsiveHeight(18),
            }}>
            <Image
              // resizeMode="contain"
              borderRadius={responsiveScreenFontSize(tablet ? 0.25 : 0.5)}
              style={{
                width: responsiveWidth(tablet ? 17 : 25),
                height: responsiveHeight(18),
              }}
              source={{ uri: item?.mediaUrl }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: responsiveWidth(63),
              height: responsiveHeight(18),
              flexDirection: 'column',

              paddingVertical: responsiveScreenFontSize(0),
              // paddingHorizontal: responsiveScreenFontSize(0.5),
              paddingLeft: tablet ? '2%' : "2%",
              // backgroundColor:"red"
            }}>
            <View
              style={{
                height: responsiveHeight(10),
                width: responsiveWidth(60),
              }}>
              <Text
                numberOfLines={2}
                style={{
                  color: 'black',
                  fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.75),
                  fontWeight: '400',
                  minHeight: responsiveHeight(6)
                }}>
                {item?.ProductName}
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.8),
                  includeFontPadding: false,
                  fontWeight: '500',
                }}>
                ${item?.productAmount}
              </Text>
              {/* <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                {item?.promo !== 'KB0' && (
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

              </Text> */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.8),
                    fontWeight: 'bold',
                    includeFontPadding: false,
                    paddingVertical: responsiveHeight(1),
                  }}>
                  #{item?.ProductSku}
                </Text>
                {authRed.data.account_type == 'customer' ?
                  (item.hasOwnProperty("referral_percent") ? (item?.referral_percent !== 'undefined' && item?.referral_percent !== '' && item?.referral_percent !== '0' && <Text
                    style={{
                      color: 'red',
                      fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.6),
                      fontWeight: '500',
                    }}>
                    {item?.referral_percent}% Referral Fee
                  </Text>) : null) :
                  (item.hasOwnProperty("influencer_percent") ? (item?.influencer_percent != undefined && item?.influencer_percent != 'undefined' && item?.influencer_percent !== '' && item?.influencer_percent !== '0' && <Text
                    style={{
                      color: 'red',
                      fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.6),
                      fontWeight: '500',
                    }}>
                    {item?.referral_percent}% Influencer Fee
                  </Text>) : null)
                }
              </View>
            </View>
            {
              influencerShop ?
                <View
                  style={{
                    height: responsiveScreenFontSize(5),
                    // width: responsiveWidth(30),
                    // backgroundColor: 'red',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: "row",
                    // alignSelf: 'flex-end',


                    width: responsiveWidth(62),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: responsiveHeight(0.5),
                      width: tablet ? responsiveWidth(14) : responsiveWidth(20),
                      backgroundColor: colors.themeblue,
                      borderRadius: responsiveScreenFontSize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: "3%"
                    }}
                    onPress={() => {
                      setOpenCartDetailWebView(true)
                      setUrl(item.ProductUrl)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.75),
                        // fontWeight: '500',
                      }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: responsiveHeight(0.5),
                      width: tablet ? responsiveWidth(14) : responsiveWidth(20),
                      backgroundColor: colors.themeblue,
                      borderRadius: responsiveScreenFontSize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    disabled={isShortUrlApiCall}
                    onPress={() => {
                      setIsShortUrlApiCall(true)
                      // console.log(item,"---i")
                      // console.log('ssss',setControlShare)
                      setControlShare && setControlShare(true)
                      kbslyShortURL(item?.ProductUrl)
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
                                setControlShare && setControlShare(false)
                                err && console.log(err);
                              })
                          }
                          setIsShortUrlApiCall(false)
                        })
                    }}>
                    {isShortUrlApiCall ? <Loader color={"#fff"} size={3} /> :
                      <Text
                        style={{
                          color: 'white',
                          fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.75),
                          // fontWeight: '500',
                        }}>
                        Share
                      </Text>
                    }
                  </TouchableOpacity>
                </View> :
                <View
                  style={{
                    height: tablet ? responsiveScreenFontSize(3.3) : responsiveScreenFontSize(5),
                    width: responsiveWidth(62),
                    // backgroundColor:'red',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flexDirection: "row",
                  }}>
                  <TouchableOpacity
                    style={{
                      // height: tablet ? responsiveScreenFontSize(3) : responsiveScreenFontSize(4),
                      paddingVertical: responsiveHeight(0.5),
                      width: tablet ? responsiveWidth(14) : responsiveWidth(20),
                      backgroundColor: colors.themeblue,
                      borderRadius: responsiveScreenFontSize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: "3%"
                    }}
                    onPress={() => {
                      setCurrentChild(item);
                      setProDtLoading(true);
                      //   openWeb({
                      //     ...item,
                      //     redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                      //   });
                      setWebData({
                        ...item,
                        redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                      });
                      // close(false)
                      // setWebModal(true);
                      setNestedModal(true)

                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.75),
                        // fontWeight: '500',
                      }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      // height: tablet ? responsiveScreenFontSize(3) : responsiveScreenFontSize(4),
                      width: tablet ? responsiveWidth(14) : responsiveWidth(20),
                      paddingVertical: responsiveHeight(0.5),
                      backgroundColor: colors.themeblue,
                      borderRadius: responsiveScreenFontSize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    disabled={isShortUrlApiCall}
                    onPress={() => {
                      setIsShortUrlApiCall(true)
                      // console.log(item,"---")
                      setControlShare && setControlShare(true)
                      kbslyShortURL(item?.ProductUrl)
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
                                setControlShare && setControlShare(false)
                                err && console.log(err);
                              })
                          }
                          setIsShortUrlApiCall(false)
                        })
                    }}>
                    {isShortUrlApiCall ? <ActivityIndicator size={responsiveFontSize(tablet ? 1.25 : 2.5)} color={"white"} /> :
                      <Text
                        style={{
                          color: 'white',
                          fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.75),
                          // fontWeight: '500',
                        }}>
                        Share
                      </Text>
                    }
                  </TouchableOpacity>
                </View>
            }

          </View>
        </View>
        {webModal && renderModal()}
      </View>
    );
  }

  // console.log(url, "url");
  if (openCartDetailWebView) {
    return (
      <Modal
        key={index}
        // animationType="fade"
        transparent={true}
        style={styles.modal1}
        onRequestClose={() => {
          setOpenCartDetailWebView(false)
        }}
        statusBarTranslucent={true}
        visible={openCartDetailWebView}>
        <View style={{ ...styles.modalCont1, height: (flatLayout.height + responsiveScreenFontSize(tablet ? 4.5 : 8)) - Dimensions.get('window').width / (16 / 9) }}>
          <View style={{ ...styles.modalHeader1, height: responsiveHeight(tablet ? 4 : 5) }}>
            <View style={styles.headerLeft}>
              {/* <CrossIcon
                name="shopping-bag"
                color={colors.themeblue}
                size={responsiveFontSize(tablet ? 1 : 3)}
              /> */}
              {/* <Text style={styles.heading}>Website</Text> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenCartDetailWebView(false)
              }}>
              {/* <CrossIcon
                name="cross"
                color={'#010b40'}
                size={responsiveFontSize(tablet ? 2 : 3)}
                style={{ right: 10 }}
              /> */}
              <AntDesign
                name="close"
                color={'#010b40'}
                size={responsiveFontSize(tablet ? 2.5 : 3)}
                style={{ right: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',

              // justifyContent:'flex-end',
            }}>
            <WebView
              style={{ flex: 1 }}
              containerStyle={{ flex: 1 }}
              source={{ uri: url }}
              mediaPlaybackRequiresUserAction={true}
              startInLoadingState={true}
              ref={webViewRef}
              onNavigationStateChange={(navState) => {
                // console.log("myustat", navState)
                // setWebNavState(navState)
              }}
            />
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <Modal
      key={index}
      animationType="fade"
      transparent={true}
      style={styles.modal}
      onRequestClose={() => {
        close(false);
        portrait(false);
        onChangeHid(false)
      }}
      statusBarTranslucent={true}
      visible={opens}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.modalCont}>
          <TouchableWithoutFeedback
            onPress={() => {
              close(false);
              portrait(false);
              onChangeHid(false)
            }}>
            <View style={styles.modalViews}></View>
          </TouchableWithoutFeedback>
          {nestedModal && renderModal()}
          {/* <View style={{...styles.modalView, height:responsiveHeight(tablet?113:100)-(Dimensions.get('window').width/(Dimensions.get('window').height/Dimensions.get('window').width)+StatusBar.currentHeight)}}> */}
          <View style={{ ...styles.modalView, height: (flatLayout?.height + responsiveScreenFontSize(tablet ? 4.5 : 8)) - Dimensions.get('screen').width / (16 / 9) }}>

            {/* <View style={styles.line} /> */}

            <View style={styles.modalHeader}>

              <View style={styles.headerLeft}>
                {/* <CrossIcon
                name="shopping-bag"
                color={colors.themeblue}
                size={responsiveFontSize(tablet ? 1 : 3)}
              /> */}
                <Text style={{ ...styles.heading, fontWeight: 'normal' }}>Product List</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  close(false);
                  portrait(false);
                  onChangeHid(false)
                }}>
                <AntDesign
                  name="close"
                  color={'#010b40'}
                  size={responsiveFontSize(tablet ? 2.5 : 3)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopFlatList}>
              <FlatList
                data={data?.products}
                keyExtractor={(item, index) => {
                  index.toString();
                }}
                renderItem={({ item, index }) => (
                  <RenderItem
                    index={index}
                    item={item}
                    influencerShop={influencerShop}
                    setOpenCartDetailWebView={setOpenCartDetailWebView}
                    openCartDetailWebView={openCartDetailWebView}
                    setUrl={setUrl}
                    close={close}
                    kbslyShortURL={kbslyShortURL}
                    setControlShare={setControlShare}
                    setNestedModal={setNestedModal}
                    nestedModal={nestedModal}
                  />
                )}
                // renderItem={

                //   renderItem

                // }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                // ListHeaderComponent={<View style={{ height: 15 }} />}
                ListFooterComponent={<View style={{ height: 15 }} />}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  heading: {
    color: colors.themeblue,
    fontSize: tablet ? responsiveScreenFontSize(1.75) : responsiveScreenFontSize(2.5),
    marginLeft: responsiveWidth(2),
    // fontWeight: 'bold',
    fontWeight: "500"
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    elevation: 5,
  },
  modal1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    elevation: 5,
  },
  separator: {
    height: responsiveScreenFontSize(0.1),
    width: responsiveWidth(100),
    backgroundColor: '#cccccc',
  },
  shopFlatList: {
    height: tablet ? responsiveHeight(40) : responsiveScreenFontSize(49),
    width: responsiveWidth(100),
    alignSelf: 'center',
    marginVertical: responsiveScreenFontSize(1),
    flex: 1
  },
  modalHeader: {
    width: '100%',
    height: responsiveScreenFontSize(3.3),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  modalHeader1: {
    width: '100%',
    height: responsiveScreenFontSize(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    // borderTopLeftRadius: responsiveScreenFontSize(2),
    // borderTopRightRadius: responsiveScreenFontSize(2)
  },
  line: {
    height: responsiveHeight(1),
    width: responsiveWidth(15),
    backgroundColor: '#cccccc',
    alignSelf: 'center',
    borderRadius: responsiveFontSize(1),
  },
  btn: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(20),
    margin: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCont: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  modalCont1: {

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute', bottom: 0,
    width: responsiveWidth(100)
  },
  modalView: {
    width: responsiveWidth(100),
    backgroundColor: 'white',
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    paddingTop: 15,
    paddingHorizontal: responsiveWidth(2.5),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  modalViews: {
    width: responsiveWidth(100),
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: responsiveWidth(56.25),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  modalHeadCont: {
    alignSelf: 'flex-end',
  },
  crossBtn: {
    alignItems: 'flex-end',
    width: responsiveWidth(6),
  },
  modalBody: {},
  sortByCont: {
    marginVertical: responsiveHeight(1),
  },
  datePicker: {
    backgroundColor: 'white',
    width: responsiveWidth(40),
    height: responsiveHeight(4.5),
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
});

function mapStateToProps({ authRed, liveProducts }) {
  return {
    authRed,
    liveProducts,
  };
}

export default connect(mapStateToProps, { ...liveEvents, ...kbsly })(ShopModal);
