import React from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Btn from '../../../../components/Btn'
import Loader from '../../../../components/Loader'
import colors from '../../../../assets/colors/colors'
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();


export default function Cart({cartList,setRevLoading,setCurrentRevId,liveProducts,removeCart,getCartList,currentRevId,revLoading,checkLoadingF,setCheckLoadingF,checkoutProductFinal,setAllCheck,setShippingPage}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1, width: '100%', backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: responsiveFontSize(2) }}>
                {cartList.lineItems?.map((item, index) => {
                    return (
                        <View key={index} style={{ backgroundColor: 'white', borderRadius: responsiveFontSize(tablet?1:0.5), width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingVertical: responsiveFontSize(1) }}>
                            <View style={{ width: '15%' }}>
                                <Image
                                    style={{ width: '100%', height: tablet?responsiveFontSize(10):80, borderRadius: responsiveFontSize(0.5) }}
                                    source={{ uri: item.variant?.image?.src }} />
                            </View>
                            <View style={{ width: '85%', paddingLeft: responsiveFontSize(1), justifyContent: 'space-between', paddingVertical: responsiveFontSize(0.5) }}>
                                <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?1.25:1.75) }}>
                                    {item.variant.title}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <View>
                                        <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet?1:1.5), marginTop: responsiveFontSize(0.5) }}>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?1:1.5), paddingRight: responsiveFontSize(2) }}>Price: </Text>${item.variant.priceV2?.amount}
                                        </Text>
                                        <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?1:1.5) }}>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?1:1.5), paddingRight: responsiveFontSize(2) }}>Quantity: </Text>{item.quantity}
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
                                            style={{ paddingHorizontal: responsiveFontSize(1), paddingVertical: responsiveFontSize(0.5), backgroundColor: 'red', borderRadius: responsiveFontSize(tablet?0.25:0.5) }}>
                                            {(revLoading && currentRevId == item?.id) ? <Loader size={2} color="white" /> : (<Text style={{ color: 'white', textAlign: 'center', fontSize: responsiveFontSize(tablet?1:1.5) }}>Remove</Text>)}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: responsiveFontSize(1) }}>
                    <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?1:1.75) }}>Total Amount:</Text>
                    <Text style={{ color: 'green', fontSize: responsiveFontSize(tablet?1:1.75), marginLeft: responsiveFontSize(1) }}>${cartList?.lineItems?.reduce((acc, it) => {
                        acc = acc + (it.variant.priceV2.amount * it.quantity)
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
                                // if(cartList?.shippingAddress){
                                //     setShippingPage("shippingMethod")
                                    // Ahsan ERROR
                                // }else{
                                    setShippingPage("add")
                                    setCheckLoadingF(true)
                                    // alert(liveProducts[0]?.brand[0]?._id)
                                    checkoutProductFinal(liveProducts[0]?.brand[0]?._id).then((res) => {
                                        // alert("AL")
                                        setCheckLoadingF(false)
                                        // alert(JSON.stringify(res.message))
                                        setAllCheck(res.message)
                                    }).catch(()=>{
                                        // setShippingPage("add")
                                    })
                                // }
                            }}
                            text={"Checkout"} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})