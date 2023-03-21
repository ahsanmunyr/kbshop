import { View, Text, TextInput,Image,StyleSheet,Dimensions,TouchableOpacity,Keyboard, ScrollView, FlatList} from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import CrossIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/Feather';
import { responsiveFontSize,responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import Btn from '../../components/Btn';
import * as liveActions from "../../store/actions/liveEvents"
import { WebView } from 'react-native-webview';
import ShippingInfo from '../home/Live/liveFeatures/ShippingInfo';
const tablet = deviceInfo.isTablet();
const { width } = Dimensions.get('window');

const head = {};
if (width > 550) head.height = 80;

function Cart({
 navigation,
 cartList,
 getCartList,
 removeCart,
 checkoutProductFinal
}) {

  const [searchText, setSearchText] = useState('');
  const [cartLoading, setCartLoading] = useState(false)
  const [revLoading, setRevLoading] = useState(false)
  const [currentRevId, setCurrentRevId] = useState("")
  const [openCartDetailWebView, setOpenCartDetailWebView] = useState(false)
  const [checkLoadingF, setCheckLoadingF] = useState(false)
  const [url, setUrl] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
        </View>
      ),
      headerStyle: head,
      headerTitle: props => (
        <View>
          <View style={styles.textCon}>
            <SearchIcon
              style={styles.searchIcon}
              name="search"
              color="#bdbdbd"
              size={responsiveFontSize(tablet ? 1.25 : 2)}
            />
            <TextInput
              // onFocus={() => 
              //   setDrop(true)
              // }
              value={searchText}
              onChangeText={v => setSearchText(v)}
              placeholder="Search"
              style={{
                flex: 1,
                paddingVertical: 0,
                color: 'grey',
                fontSize: responsiveFontSize(tablet ? 0.8 : 1.6),
              }}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  // setDrop(false);
                  Keyboard.dismiss();
                }}>
                <CrossIcon
                  name="cross"
                  size={responsiveFontSize(tablet ? 1.25 : 3)}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ),
    });
  }, [navigation, searchText]);

  useEffect(() => {
    setCartLoading(true);
    getCartList("61d373de54c7db79889ecd2e").then(() => {
      setRevLoading(false);
      setCartLoading(false);
    })
  }, [])

  // function renderInformation() {

  //   if (openCartDetailWebView) {
  //     return (
  //       <View
  //         style={{
  //           height: responsiveHeight(45),
  //           width: '100%',
  //         }}>
  //         <WebView
  //           style={{ flex: 1 }}
  //           containerStyle={{ flex: 1 }}
  //           source={{ uri: allCheck ? allCheck : url }}
  //           mediaPlaybackRequiresUserAction={true}
  //           startInLoadingState={true}
  //           // ref={webViewRef}
  //           onNavigationStateChange={(navState) => {
  //             // console.log("myustat", navState)
  //             // setWebNavState(navState)
  //           }}
  //         />
  //       </View>
  //     )
  //   } else {
  //     // console.log(liveProducts,"===================AHSAN+++++++++++++++++++++++");
  //     return <ShippingInfo brandId={"liveProducts[0]?.brand[0]?._id"} eventID={liveProducts[0]?._id} setOpenCartDetailWebView={setOpenCartDetailWebView} />
  //   }

  // }

  const CartItem = ({item})=>{
    return (
      <View style={{ backgroundColor: 'white', borderRadius: responsiveFontSize(0.5), width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingVertical: responsiveFontSize(1), paddingHorizontal:"2%" }}>
                    <View style={{ width: '15%' }}>
                      <Image
                        style={{ width: '100%', height: tablet ? responsiveFontSize(10) : 80, borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}
                        source={{ uri: item.variant?.image?.src }} />
                    </View>
                    <View style={{ width: '85%', paddingLeft: responsiveFontSize(1), justifyContent: 'space-between', paddingVertical: responsiveFontSize(0.5) }}>
                      <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.25 : 1.75) }}>
                        {item.variant.title}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <View>
                          <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet ? 1 : 1.5), marginTop: responsiveFontSize(0.5) }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5), paddingRight: responsiveFontSize(2) }}>Price: </Text>${item.variant.priceV2?.amount}
                          </Text>
                          <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5) }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5), paddingRight: responsiveFontSize(2) }}>Quantity: </Text>{item.quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setRevLoading(true)
                            setCurrentRevId(item?.id)
                            removeCart({
                              brand: "61d373de54c7db79889ecd2e",
                              line_item_id: item?.id
                            }).then((res) => {
                              getCartList("61d373de54c7db79889ecd2e").then(() => setRevLoading(false))
                            })
                          }}
                          style={{ alignItems: 'center', paddingHorizontal: responsiveFontSize(1), paddingVertical: responsiveFontSize(0.5), backgroundColor: 'red', borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}>
                          {(revLoading && currentRevId == item?.id) ? <Loader size={2} color="white" /> : (<Text style={{ color: 'white', textAlign: 'center', fontSize: responsiveFontSize(tablet ? 1 : 1.5) }}>Remove</Text>)}
                        </TouchableOpacity>
                      </View>
                    </View>
      </View>
    )
  }
  

  return (
    // <ScrollView style={{ flexGrow: 1, width: '100%' }}>
    <>
      <View style={{flex:1,paddingHorizontal: responsiveFontSize(1)}}>
          {cartLoading ? <Loader /> : (
            <>
              <View style={{ marginVertical:responsiveHeight(1) }}>
              <FlatList
                  data={cartList.lineItems}
                  renderItem={({ item, i }) => {
                    return (
                      <CartItem item={item} />
                    );
                  }}
                  keyExtractor={(item, i) => i.toString()}
                  // showVer
                />
                {/* {cartList.lineItems?.map((item, index) => {
                  return (
                    <CartItem item={item} key={index} />
                    // <View key={index} style={{ backgroundColor: 'white', borderRadius: responsiveFontSize(0.5), width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingVertical: responsiveFontSize(1), paddingHorizontal:"2%" }}>
                    //   <View style={{ width: '15%' }}>
                    //     <Image
                    //       style={{ width: '100%', height: tablet ? responsiveFontSize(10) : 80, borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}
                    //       source={{ uri: item.variant?.image?.src }} />
                    //   </View>
                    //   <View style={{ width: '85%', paddingLeft: responsiveFontSize(1), justifyContent: 'space-between', paddingVertical: responsiveFontSize(0.5) }}>
                    //     <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.25 : 1.75) }}>
                    //       {item.variant.title}
                    //     </Text>
                    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    //       <View>
                    //         <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet ? 1 : 1.5), marginTop: responsiveFontSize(0.5) }}>
                    //           <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5), paddingRight: responsiveFontSize(2) }}>Price: </Text>${item.variant.priceV2?.amount}
                    //         </Text>
                    //         <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5) }}>
                    //           <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.5), paddingRight: responsiveFontSize(2) }}>Quantity: </Text>{item.quantity}
                    //         </Text>
                    //       </View>
                    //       <TouchableOpacity
                    //         onPress={() => {
                    //           setRevLoading(true)
                    //           setCurrentRevId(item?.id)
                    //           removeCart({
                    //             brand: "61d373de54c7db79889ecd2e",
                    //             line_item_id: item?.id
                    //           }).then((res) => {
                    //             getCartList("61d373de54c7db79889ecd2e").then(() => setRevLoading(false))
                    //           })
                    //         }}
                    //         style={{ alignItems: 'center', paddingHorizontal: responsiveFontSize(1), paddingVertical: responsiveFontSize(0.5), backgroundColor: 'red', borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}>
                    //         {(revLoading && currentRevId == item?.id) ? <Loader size={2} color="white" /> : (<Text style={{ color: 'white', textAlign: 'center', fontSize: responsiveFontSize(tablet ? 1 : 1.5) }}>Remove</Text>)}
                    //       </TouchableOpacity>
                    //     </View>
                    //   </View>
                    // </View>
                  )
                })} */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: responsiveFontSize(1) }}>
                  <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.75) }}>Total Amount:</Text>
                  <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet ? 1 : 1.75), marginLeft: responsiveFontSize(1) }}>${cartList?.lineItems?.reduce((acc, it) => {
                    acc = acc + (it.variant.priceV2?.amount * it.quantity)
                    return acc
                  }, 0)}</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginVertical: responsiveFontSize(1.5) }}>
                  <View style={{ width: '48.5%' }}>
                    <Btn
                      loader={checkLoadingF}
                      call={() => {
                        // Ahsan Working
                        setCheckLoadingF(true)
                        checkoutProductFinal("61d373de54c7db79889ecd2e").then((res) => {
                          console.log(res,"----------------------------------------------")
                          setCheckLoadingF(false)
                          setUrl(res.message)
                        //   // setNext(2)
                        })
                      }}
                      text={"Checkout"} />
                  </View>
                </View>
              </View>
              {/* {renderInformation()} */}
            </>
          )}
      </View>
    </>
      // </ScrollView>
  )
}

function mapStateToProps({ cartList }) {
  return { cartList };
}

export default connect(mapStateToProps, {...liveActions})(Cart);

const styles=StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(
      Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
    ),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
})