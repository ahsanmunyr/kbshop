// @ts-nocheck
import React, { Component, useEffect, useRef, useState } from 'react';
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
  SafeAreaView,
  StatusBar

} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize
} from 'react-native-responsive-dimensions';
import colors from '../../assets/colors/colors';
import { connect } from 'react-redux';
import BackIcon from 'react-native-vector-icons/AntDesign';
import BackIcon1 from 'react-native-vector-icons/Ionicons';
import deviceInfo from 'react-native-device-info';
import Btn from '../../components/Btn';
import InputField from "../../components/InputField"
import numeral from 'numeral';
import { WebView } from 'react-native-webview';
import findVariant from "../../utils/findVariant"
import Loader from '../../components/Loader';
import * as liveActions from "../../store/actions/liveEvents"
import Toast from "react-native-toast-message"
import { FlatList } from 'react-native-gesture-handler';
import DropDownComp from '../../components/DropDownComp';
import ShippingInfo from "./Live/liveFeatures/ShippingInfo"



const tablet = deviceInfo.isTablet();
function LiveWebModal({ visible,parentHeight, closeModle, currentChild, productDetail, proDtLoading, checkoutProduct, checkoutProductFinal, liveProducts, getCartList, cartList, allCheck, removeCart, onModalShow }) {
  const navigation = useNavigation();

  const [WebNavState, setWebNavState] = useState({})
  const [next, setNext] = useState(0)
  const [currentImage, setCurrentImage] = useState({})
  const [checkLoading, setCheckLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [currentVariant, setCurrentVariant] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [cartLoading, setCartLoading] = useState(false)
  const [checkLoadingF, setCheckLoadingF] = useState(false)
  const [options, setOptions] = useState([])
  const [revLoading, setRevLoading] = useState(false)
  const [currentRevId, setCurrentRevId] = useState("")
  const [openCartDetailWebView, setOpenCartDetailWebView] = useState(false)


  const [fields, setFields] = useState({
  })
  const [submit, setSubmit] = useState(false)
  const webViewRef = useRef()

  useEffect(() => {

    if (visible && Object.keys(productDetail ? productDetail : {}).length > 0) {
      setCurrentImage(productDetail?.images[0])
      setOptions(productDetail.options.map(it => ({ name: it.name, open: false })))
      const initailData = productDetail.options?.reduce((acc, it) => {
        acc = { ...acc, [it.name]: it.values[0].value }
        return acc
      }, {})
      // console.log("nnnn",initailData)
      // setFields({ ...fields, ...initailData })
      setQuantity(1)
    }


  }, [productDetail, visible])
  useEffect(() => {
    return () => {
      setFields({})
      setSubmit(false)
      setOptions([])
    }
  }, [])

  useEffect(() => {

    if (Object.keys(fields)?.length > 0 && Object.keys(productDetail ? productDetail : {})?.length > 0) {
      const currentVari = findVariant(productDetail, fields)
      setCurrentVariant(currentVari)
    }

  }, [fields])
  // console.log("current", productDetail)

  // function renderOptions() {
  //   return productDetail?.options?.map(item => {
  //     return (
  //       <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
  //         <View style={{ width: '20%' }}>
  //           <Text style={{ color: 'black', fontSize: responsiveFontSize(2), minWidth: responsiveWidth(15) }}>{item.name} :</Text>
  //         </View>
  //         <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', width: '80%' }}>
  //           {
  //             item.values.map(it => {
  //               return (
  //                 <TouchableOpacity
  //                   key={it.value}
  //                   onPress={() => {
  //                     setFields({ ...fields, [item.name]: it.value })
  //                   }}
  //                   style={{ backgroundColor: fields[item.name] == it.value ? colors.themeblue : 'lightgray', padding: responsiveFontSize(1.5), paddingVertical: responsiveFontSize(0.25), borderRadius: responsiveFontSize(0.5), marginLeft: responsiveFontSize(1), marginTop: responsiveFontSize(0.5) }}>
  //                   <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5) }}>{it.value}</Text>
  //                 </TouchableOpacity>
  //               )
  //             })
  //           }
  //         </View>
  //       </View>
  //     )
  //   })
  // }
  function renderOptions() {
    return productDetail?.options?.map((item, i) => {
      return (
        <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveFontSize(1), zIndex: options[i]?.open ? 1 : 0 }}>
          <View style={{ width: '20%' }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.25 : 2), minWidth: responsiveWidth(15) }}>{item.name} :</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', width: '80%' }}>
            {/* <DropDownComp
              items={item.values?.map(it => ({ label: it.value, value: it.value }))}
              open={options[i]?.open}
              value={fields[item.name]}
              setOpen={(data) => {
                const updated = options.map(dIt => {
                  if (dIt.name == item.name) {
                    return { ...dIt, open: data }
                  }
                  return { ...dIt, open: false }
                })
                setOptions(updated)
              }}
              onSelectItem={data => {
                setFields({ ...fields, [item.name]: data.value })
              }}
              error={submit && !fields[item.name]}
      
              listMode="MODAL"
              containerStyle={{ width: '100%' }}
              style={{ width: '100%', height: responsiveFontSize(tablet ? 3 : 5), backgroundColor: options[i]?.open ? '#f0f0f0' : 'white' }}
              dropDownContainerStyle={{ width: '100%', backgroundColor: options[i]?.open ? '#f0f0f0' : 'white',  }}
              ShowsVerticalScrollIndicator={false}
              textStyle={{
                fontSize: responsiveFontSize(tablet ? 1 : 1.5),
              }}
              placeholdertxt={`Select ${item.name}`}
            /> */}
            {
              item.values.map(it => {
                return (
                  <TouchableOpacity
                    key={it.value}
                    onPress={() => {
                      setFields({ ...fields, [item.name]: it.value })
                    }}
                    style={{
                      backgroundColor: fields[item.name] == it.value ? colors.themeblue : 'white', 
                      padding: responsiveFontSize(1.5), 
                      paddingVertical:tablet? responsiveFontSize(1): responsiveFontSize(1.5), 
                      borderRadius: tablet? responsiveFontSize(0.5): responsiveFontSize(1), 
                      marginLeft: responsiveFontSize(1), 
                      marginTop: responsiveFontSize(1), 
                      paddingHorizontal: tablet? responsiveFontSize(1.5): responsiveFontSize(2.1),
                      borderWidth: responsiveFontSize(0.1)

                    }}>
                    <Text style={{ color: fields[item.name] == it.value ? 'white' : colors.themeblue, fontSize:tablet? responsiveFontSize(1): responsiveFontSize(1.5) }}>{it.value}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      )
    })
  }

  function renderImages() {
    return productDetail?.images?.map((item) => {
      return (
        <TouchableOpacity
          onPress={() => setCurrentImage(item)}
          key={item?.id} style={{ width: tablet ? '20%' : '33.33%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Image
            style={{ width: '90%', height: responsiveHeight(tablet ? 8.5 : 7), borderColor: 'red', borderWidth: currentImage.id == item.id ? 1 : 0, borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5), marginTop: responsiveFontSize(0.5) }}
            source={{ uri: item?.src }}
          />
        </TouchableOpacity>
      )
    })
  }
  // console.log("ssccccccccc", cartList)
  function checkoutSubmit() {
    const customAttributes = currentVariant?.selectedOptions?.map(it => {
      // if (it.name == "Inseam") {
      //   return { key: it.name, value: "32" }
      // }
      return { key: it.name, value: it.value }
    })
    setCheckLoading(true)
    // alert(JSON.stringify({
    //     customAttributes
    // }))
    // console.log("sfsadf", {
    //   line_item: [{
    //     variantId: currentVariant.id,
    //     quantity,
    //     customAttributes
    //   }],
    //   brand: liveProducts[0]?.brand[0]?._id,
    //   first_item: (cartList?.lineItems?.length > 0) ? false : true
    // })
    checkoutProduct({
      line_item: [{
        variantId: currentVariant.id,
        quantity,
        customAttributes
      }],
      brand: liveProducts[0]?.brand[0]?._id,
      first_item: (cartList?.lineItems?.length > 0) ? false : true
    }).then((res) => {
      Toast.show({
        type: "success",
        text1: res.message
      })
      setCheckLoading(false)
      setNext(1)
      setCartLoading(true)
      getCartList(liveProducts[0]?.brand[0]?._id).then(() => setCartLoading(false))
    })
  }
  function renderCheckout() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: responsiveFontSize(2), width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ width: tablet ? '20%' : '40%' }}>
            <Image
              style={{ width: '100%', height: responsiveHeight(tablet ? 20 : 26), borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}
              source={{ uri: currentImage ? currentImage.src : currentChild?.mediaUrl }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(2), width: tablet ? '80%' : '60%', flexWrap: 'wrap', borderColor: 'lightgray', borderWidth: 1, flex: 1, borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}>
            {renderImages()}
          </View>
        </View>
        <View style={{ marginTop: responsiveFontSize(1.5), width: '100%' }}>
          <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.35 : 2.25), fontWeight: '500' }}>{currentChild?.ProductName}</Text>
          <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.35 : 2), marginTop: responsiveFontSize(0.75) }}><Text style={{ color: 'green', fontWeight: '700' }}>${currentChild?.price}</Text></Text>
          <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 1.25 : 1.7), marginVertical: responsiveFontSize(0.75), textAlign: 'justify' }}>{(currentChild?.productDesc?.length > 300) ? currentChild?.productDesc.slice(0, 300) + "..." : currentChild?.productDesc}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: responsiveFontSize(1), zIndex: 1, width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveFontSize(1), justifyContent: 'space-between', }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1.25 : 2), minWidth: responsiveWidth(15), width: '20%' }}>Quantity: </Text>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderWidth: responsiveFontSize(0.1), 
              borderColor: colors.themeblue, 
              borderRadius: tablet? responsiveFontSize(0.5): responsiveFontSize(1), 
              height: responsiveHeight(tablet ? 4.5 : 5), 
              width: '78%' }}>


              <TouchableOpacity
                disabled={quantity <= 1}
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1)
                  }
                }}
                style={{
                  backgroundColor: quantity <= 1 ? "white" : colors.themeblue,
                  width: '20%',
                  height: tablet ? responsiveHeight(4.2): '100%',
                  borderTopLeftRadius: responsiveFontSize(tablet ? 0.5 : 1),
                  borderBottomLeftRadius: responsiveFontSize(tablet ? 0.5 : 1),
                  justifyContent: 'center',
                  borderRightWidth: responsiveFontSize(0.1),
                  alignItems: 'center'
                }}>


                <Text style={{ fontSize: responsiveFontSize(tablet ? 1.5 : 3), fontWeight: 'bold', color: quantity > 1 ? 'white' : colors.themeblue }}>-</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: responsiveFontSize(tablet ? 1.5 : 2.5), fontWeight: '900', color: colors.themeblue }}>{quantity}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1)
                }}
                style={{
                  backgroundColor: colors.themeblue,
                  width: '20%',
                  height: tablet ? responsiveHeight(4.2): '100%',
                  borderTopRightRadius: responsiveFontSize(tablet ? 0.3 : 1),
                  borderBottomRightRadius: responsiveFontSize(tablet ? 0.3 : 1),
                  justifyContent: 'center', alignItems: 'center'
                }}>
                <Text style={{ fontSize: responsiveFontSize(tablet ? 1.5 : 3), fontWeight: 'bold', color: 'white' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {renderOptions()}
        </View>
        <View style={{ width: '100%', flexDirection: 'row', marginTop: responsiveFontSize(1), justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: responsiveFontSize(tablet ? 1.25 : 2), color: 'black' }}>Subtotal</Text>
          <Text style={{ color: 'green', marginLeft: responsiveFontSize(2), fontSize: responsiveFontSize(tablet ? 1.25 : 2) }}>${numeral(currentChild.price * quantity).format("0.00")}</Text>
        </View>

        
        <View style={{ width: '100%', flexDirection: 'row', marginVertical: responsiveFontSize(1.5) }}>
          <View style={{ width: '48.5%' }}>
            {cartList?.lineItems?.length > 0 && (
              <View style={{ backgroundColor: 'red', borderRadius: responsiveFontSize(12), position: 'absolute', left: -responsiveFontSize(1), width: responsiveFontSize(tablet ? 2 : 3), height: responsiveFontSize(tablet ? 2 : 3), top: -responsiveFontSize(1), zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), textAlign: 'center', textAlignVertical: 'center' }}>{cartList?.lineItems?.length}</Text>
              </View>
            )}
            <Btn
              color={(Object.values(fields)?.length) == options.length ? colors.themeblue : "lightgray"}
              loader={checkLoading}
              call={
                () => {
                  setSubmit(true)
                  if ((Object.values(fields)?.length) == options.length) {
                    checkoutSubmit()
                  }
                }
              }
              text={"Add to cart"} />
          </View>
          <View style={{width:'3%'}}/>
          <View style={{ width: '48.5%' }}>
            <Btn
              disabled={!(cartList?.lineItems?.length > 0)}
              loader={checkLoadingF}
              call={() => {
                setCheckLoadingF(true)
                checkoutProductFinal(liveProducts[0]?.brand[0]?._id).then((res) => {
                  setCheckLoadingF(false)
                  setUrl(res.message)
                  setNext(2)
                })
              }}
              color={cartList?.lineItems?.length > 0 ? colors.themeblue : "lightgray"}
              text={"Checkout"} />
          </View>
        </View>
      </ScrollView>
    )
  }

  // function renderInformation() {
  //   return (
  //     <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), paddingBottom: responsiveFontSize(1) }}>
  //       <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(2), marginBottom: responsiveFontSize(1), fontWeight: 'bold' }}>Shipping Information</Text>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="First Name"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Last Name"
  //             color="grey"
  //           />
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Email"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Phone"
  //             color="grey"
  //           />
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //         <View style={{ width: '30%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Country"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '30%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="State"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '30%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="City"
  //             color="grey"
  //           />
  //         </View>
  //       </View>
  //       <View style={{ width: '100%' }}>
  //         <InputField
  //           error={false}
  //           getValue={() => 5}
  //           placeHolder="Street"
  //           color="grey"
  //         />
  //       </View>
  //       <View style={{ width: '100%' }}>
  //         <InputField
  //           error={false}
  //           getValue={() => 5}
  //           placeHolder="Zip/Postal code"
  //           color="grey"
  //         />
  //       </View>
  //       <View style={{ width: '100%' }}>
  //         <Btn
  //           call={() => setNext(2)}
  //           text={"Continue"} />
  //       </View>
  //     </View>
  //   )
  // }

  function renderInformation() {

    if (openCartDetailWebView) {
      return (
        <View
          style={{
            flex:1,
            width: '100%',
          }}>
          <WebView
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            source={{ uri: allCheck ? allCheck : url }}
            mediaPlaybackRequiresUserAction={true}
            startInLoadingState={true}
            ref={webViewRef}
            onNavigationStateChange={(navState) => {
              // console.log("myustat", navState)
              // setWebNavState(navState)
            }}
          />
        </View>
      )
    } else {
      // console.log(liveProducts,"===================AHSAN+++++++++++++++++++++++");
      return <ShippingInfo brandId={liveProducts[0]?.brand[0]?._id} eventID={liveProducts[0]?._id} setOpenCartDetailWebView={setOpenCartDetailWebView} />
    }

  }

  // function renderReview() {
  //   return (
  //     <>
  //       <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: responsiveFontSize(2), borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: responsiveFontSize(1) }}>
  //         <View>
  //           <Image
  //             style={{ width: responsiveWidth(25), height: responsiveHeight(17.5), borderRadius: responsiveFontSize(0.5) }}
  //             source={{ uri: currentChild?.mediaUrl }}
  //           />
  //         </View>
  //         <View style={{ flex: 1, marginLeft: responsiveWidth(2) }}>
  //           <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5) }}>{currentChild?.ProductName}</Text>
  //           <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.25), marginTop: responsiveFontSize(0.5) }}>{currentChild?.productDesc}</Text>
  //           <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(1.5) }}>Price: <Text style={{ color: 'green' }}>${currentChild?.price}</Text></Text>
  //           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveFontSize(0.5) }}>
  //             <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5) }}>Quality: </Text>
  //             <View>
  //               <Text style={{ fontSize: responsiveFontSize(1.5), color: 'black' }}>{fields.quantity}</Text>
  //             </View>
  //           </View>
  //           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveFontSize(0.5) }}>
  //             <View>
  //               <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5) }}>Size :</Text>
  //             </View>
  //             <View>
  //               <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5) }}>Small</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2) }}>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Shipping To:</Text>
  //         <Text style={{ fontSize: responsiveFontSize(1.25) }}>new york NY, United States of America, 1003</Text>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2) }}>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Shipping method:</Text>
  //         <Text style={{ fontSize: responsiveFontSize(1.25) }}>UPS GROUND SHIPPING (5-7 BUSSINESS DAYS)</Text>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  //         <View style={{ width: '75%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Coupon Code"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '22%' }}>
  //           <Btn
  //             color={"green"}
  //             text={"Apply"}
  //           />
  //         </View>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //         <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Subtotal</Text>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>${numeral(fields.quantity * currentChild.price).format("0.00")}</Text>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //         <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Shipping</Text>
  //         <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Free Shipping</Text>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //         <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>Taxes</Text>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>${numeral(14.02).format("0.00")}</Text>
  //       </View>
  //       <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5), fontWeight: 'bold' }}>Total</Text>
  //         <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), marginTop: responsiveFontSize(0.5) }}>${numeral(fields.quantity * currentChild.price + 14.02).format("0.00")}</Text>
  //       </View>
  //       <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveFontSize(2), marginVertical: responsiveFontSize(1.5) }}>
  //         <Btn
  //           call={() => setNext(3)}
  //           text={"Continue"} />
  //       </View>
  //     </>
  //   )
  // }

  // function renderCardInfo() {
  //   return (
  //     <View style={{ width: '100%', paddingHorizontal: responsiveFontSize(2), paddingBottom: responsiveFontSize(1) }}>
  //       <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(2), marginBottom: responsiveFontSize(1), fontWeight: 'bold' }}>Payment Information</Text>
  //       <View style={{ width: '100%' }}>
  //         <InputField
  //           error={false}
  //           getValue={() => 5}
  //           placeHolder="Name"
  //           color="grey"
  //         />
  //       </View>
  //       <View style={{ width: '100%' }}>
  //         <InputField
  //           error={false}
  //           getValue={() => 5}
  //           keyboardType="number"
  //           placeHolder="Card Number"
  //           color="grey"
  //         />
  //       </View>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="Expiry (MM/YY)"
  //             color="grey"
  //           />
  //         </View>
  //         <View style={{ width: '48%' }}>
  //           <InputField
  //             error={false}
  //             getValue={() => 5}
  //             placeHolder="CVC or CW"
  //             color="grey"
  //           />
  //         </View>
  //       </View>
  //       <View style={{ paddingVertical: responsiveFontSize(0.5) }}>
  //         <Text style={{ color: "gray", fontSize: responsiveFontSize(1.25), textAlign: 'center' }}>By plaicing this order, i agree to the Terms and Conditions and confirm that i have read and acknowledge the Privacy Policy</Text>
  //       </View>
  //       <View style={{ width: '100%' }}>
  //         <Btn
  //           // call={() => setNext(2)}
  //           text={"Continue"} />
  //       </View>
  //     </View>
  //   )
  // }

  function renderCardList() {
    return (
      <ScrollView style={{ flexGrow: 1, width: '100%' }}>
        {cartLoading ? <Loader /> : (
          <View style={{ paddingHorizontal: responsiveFontSize(2) }}>
            {cartList.lineItems?.map((item, index) => {
              return (
                <View key={index} style={{ backgroundColor: 'white', borderRadius: responsiveFontSize(0.5), width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingVertical: responsiveFontSize(1) }}>
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
                            brand: liveProducts[0]?.brand[0]?._id,
                            line_item_id: item?.id
                          }).then((res) => {
                            // alert(JSON.stringify(res))
                            getCartList(liveProducts[0]?.brand[0]?._id).then(() => setRevLoading(false))
                          })
                        }}
                        style={{ alignItems: 'center', paddingHorizontal: responsiveFontSize(1), paddingVertical: responsiveFontSize(0.5), backgroundColor: 'red', borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5) }}>
                        {(revLoading && currentRevId == item?.id) ? <Loader size={2} color="white" /> : (<Text style={{ color: 'white', textAlign: 'center', fontSize: responsiveFontSize(tablet ? 1 : 1.5) }}>Remove</Text>)}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: responsiveFontSize(1) }}>
              <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 1 : 1.75) }}>Total Amount:</Text>
              <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet ? 1 : 1.75), marginLeft: responsiveFontSize(1) }}>${cartList?.lineItems?.reduce((acc, it) => {
                acc = acc + (it.variant.priceV2?.amount * it.quantity)
                return acc
              }, 0)}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: responsiveFontSize(1.5) }}>
              <View style={{ width: '48.5%' }}>
                <Btn
                  call={() => {
                    closeModle()
                    setNext(0)
                  }}
                  text={"Continue Shopping"} />
              </View>
              <View style={{ width: '48.5%' }}>
                <Btn
                  loader={checkLoadingF}
                  call={() => {
                    // Ahsan Working
                    setCheckLoadingF(true)
                    checkoutProductFinal(liveProducts[0]?.brand[0]?._id).then((res) => {
                      setCheckLoadingF(false)
                      setUrl(res.message)
                      setNext(2)
                    })
                  }}
                  text={"Checkout"} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    )
  }

  function renderNotFound() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
      }}>
        <Text style={{
          fontSize: responsiveFontSize(2),
          color: colors.themeblue,
          fontWeight: 'bold'
        }}>This product is not available </Text>
        <Btn
          pS={{
            paddingHorizontal:responsiveScreenFontSize(3),marginTop:responsiveScreenFontSize(1)
          }}
          call={() => {
            closeModle();
            setNext(0)
          }}
          text={"Go Back"} />
      </View>
    )
  }

  function renderData() {
    switch (next) {
      case 0:
        return allCheck ? renderInformation() : productDetail == null ? renderNotFound() : renderCheckout()
      case 1:
        return cartList?.lineItems?.length > 0 ? renderCardList() : productDetail == null ? renderNotFound() : renderCheckout()
      case 2:
        return renderInformation()
      // case 3:
      //   return renderCardInfo()
    }
  }

  return (
    <Modal
      // animationType="slide"
      transparent={true}
      onRequestClose={() => {
        if (WebNavState.canGoBack) {
          webViewRef.current.goBack()
        } else {
          closeModle()
          setNext(0)
        }
      }}
      visible={visible}
      onShow={()=>onModalShow()}
      style={{ flex: 1, justifyContent: 'flex-end', elevation: 5, }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', }}>
        <View
          style={{
            // height:responsiveHeight(60),
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{ ...styles.con, height:parentHeight, backgroundColor: 'white' }}>
            {proDtLoading ? <Loader /> : (
              <>
                <View style={{ ...styles.btn }}>
                  <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', paddingLeft: responsiveFontSize(2) }}>
                    {(next == 1 || next == 2) && (
                      <TouchableOpacity
                        onPress={() => setNext(0)}
                        style={{ paddingRight: responsiveFontSize(2) }}>
                        <BackIcon1
                          name="arrow-back"
                          color={'black'}
                          size={responsiveFontSize(tablet ? 2 : 3)}
                        />
                      </TouchableOpacity>
                    )}
                    {
                      next != 1 ? (
                        next == 2 ? null : <Text style={{ fontSize: responsiveFontSize(tablet ? 1.8 : 2.5), color: colors.themeblue }}>Details</Text>
                      ) : <Text style={{ fontSize: responsiveFontSize(tablet ? 1.25 : 2), color: colors.themeblue }}>Cart Items</Text>
                    }
                  </View>
                  <View style={{ width: '50%', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      style={{ padding: responsiveFontSize(1) }}
                      onPress={() => {
                        closeModle();
                        setNext(0)
                      }}>
                      <BackIcon
                        name="close"
                        color={'black'}
                        size={responsiveFontSize(tablet ? 2 : 3)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <ScrollView>
                <View style={{width: 300, height:100, alignSelf:'center', backgroundColor:'red', marginVertical: 10}}></View>
                <View style={{width: 300, height:100, alignSelf:'center', backgroundColor:'red', marginVertical: 10}}></View>
                <View style={{width: 300, height:100, alignSelf:'center', backgroundColor:'red', marginVertical: 10}}></View>
                <View style={{width: 300, height:100, alignSelf:'center', backgroundColor:'red', marginVertical: 10}}></View>
                <View style={{width: 300, height:100, alignSelf:'center', backgroundColor:'red', marginVertical: 10}}></View>
         
                </ScrollView> */}
                {renderData()}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function mapStateToProps({ productDetail, liveProducts, cartList }) {
  return { productDetail, liveProducts, cartList };
}

export default connect(mapStateToProps, { ...liveActions })(LiveWebModal);

const styles = StyleSheet.create({
  con: {
    alignItems: 'center',
    width: responsiveWidth(100),
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor:'lightgray',
    // borderBottomWidth:1
  },
  title: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: colors.themeblue,
    paddingLeft: responsiveFontSize(2),
  },
});
