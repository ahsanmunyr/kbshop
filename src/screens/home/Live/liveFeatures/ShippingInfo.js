// @ts-nocheck
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as getShippingAddress from '../../../../store/actions/shippingAddressAct';
import * as getShippingRates from '../../../../store/actions/shippingRatesAct';
import ShippingAddressCard from '../../../../components/ShippingAddressCard';
import colors from '../../../../assets/colors/colors';
import Loader from '../../../../components/Loader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import CheckIcon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

const tablet = deviceInfo.isTablet();

function ShippingInfo({
  getShippingAddress,
  shippingAddressRed,
  setDefaultAddress,
  brandId,
  getShippingRates,
  getShippingRatesRed,
  setOpenCartDetailWebView,
  setShippingRatesApi,
  setshippingAddress,
  getShippingAddressRed,
  authRed,
  updateAttribute,
  eventID
}) {
  const [isApiCall, setIsApiCall] = useState(false);
  const [isApiCall1, setIsApiCall1] = useState(false);
  const [isCompReady, setIsCompReady] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedShippingRate, setSelectedShippingRate] = useState({});
  const [address, onChangeAddress] = useState(null);
  const [invalid, onChangeInvalid] = useState(false);
  const GetNewShippingAddress = () => {
    setIsCompReady(true)
    getShippingAddress().then(() => {
      setshippingAddress(brandId).then((res) => {
        onChangeInvalid(false)
      }).catch(err => {
        console.log(err, "OOOOOOOOOOOOOOOOOO")
        // alert("Invalid zip code")
        onChangeInvalid(true)
      })
    })
    setIsCompReady(false)
  }

  useEffect(() => {
    GetNewShippingAddress()
  }, []);


  useEffect(() => {
    if (getShippingAddressRed?.checkoutShippingAddressUpdateV2?.checkout?.shippingAddress) {
      setIsApiCall1(true)
      onChangeAddress(getShippingAddressRed?.checkoutShippingAddressUpdateV2?.checkout?.shippingAddress)
      getShippingRates(brandId).then(() => {
        setIsApiCall1(false)
      }).catch(error => {
        console.log(error, "")
      })
    }
  }, [getShippingAddressRed])

  useEffect(() => {
    setShippingAddresses(shippingAddressRed);
    // console.log('---------');
    setIsApiCall(false);
  }, [shippingAddressRed]);
  useEffect(() => {
    // if(getShippingRatesRed?.availableShippingRates?.shippingRates == null){
    // getShippingRates(brandId) 
    // }
    // console.log(getShippingRatesRed?.availableShippingRates, "============================");
    // if(getShippingRatesRed?.availableShippingRates?.shippingRates == null){
    //   // getShippingRates(brandId) 
    // }else{
    //   setShippingRates(
    //     getShippingRatesRed?.availableShippingRates?.shippingRates,
    //   );
    // }
    // if(getShippingRatesRed?.availableShippingRates?.shippingRates?.length > 0){
    //   setShippingRates(
    //     getShippingRatesRed?.availableShippingRates?.shippingRates,
    //   );
    // }

    // setSelectedShippingRate(
    //   getShippingRatesRed?.availableShippingRates?.shippingRates[0],
    // );
    setIsApiCall(true);
    if (getShippingRatesRed?.availableShippingRates?.shippingRates?.length > 0) {
      setShippingRates(
        getShippingRatesRed?.availableShippingRates?.shippingRates,
      );
      setShippingRatesApi(
        getShippingRatesRed?.availableShippingRates?.shippingRates[0]?.handle,
        brandId,
        () => setIsApiCall(false),
      ).then(res => {
        // console.log(res)
        setSelectedShippingRate(
          getShippingRatesRed?.availableShippingRates?.shippingRates[0],
        );
      });
    }
  }, [getShippingRatesRed]);
  if (isCompReady) {
    return <Loader />
  }


  function upperDetails() {
    return (
      <View style={{ marginHorizontal: '4%', height: responsiveHeight(16) }}>
        <FlatList
          horizontal={true}
          data={shippingAddresses}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
          pagingEnabled
          renderItem={({ item, index }) => {
            return (
              <ShippingAddressCard
                onPressCard={() => {
                  setIsApiCall(true);
                  setDefaultAddress(item?._id, getShippingAddress);
                  GetNewShippingAddress()
                }}
                onEdit={() => alert('Coming soon')}
                onDelete={() => alert('Coming soon')}
                address={item}
                cardCont={{
                  width: responsiveWidth(90
                  ),
                  // marginRight: 15,
                  marginHorizontal: responsiveWidth(1),
                  marginVertical: responsiveScreenFontSize(1),
                }}
                isShowBtns={false}
              />

            );
          }}
        />

      </View>
    )
  }

  return (
    // <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      {upperDetails()}


      <View style={styles.shippingRateCont}>
        {
          !isApiCall1 ?
            <>
              {
                !invalid &&
                <>

                  <Text style={styles.heading}>Shipping Method</Text>
                  <FlatList
                    horizontal={false}
                    data={shippingRates}
                    ListHeaderComponent={
                      <View style={{
                        width:  responsiveWidth(90),
                        // shadowColor: "#000",
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 2,
                        // },
                        // shadowOpacity: 0.25,
                        // shadowRadius: 3.84,
                        // // marginHorizontal: responsiveScreenFontSize(0.2),
                        // elevation: 1,
                        backgroundColor: 'white',
                        borderColor: '#cecece',
                        borderWidth: responsiveScreenFontSize(0.1), 
                        alignSelf: 'center', 
                        marginVertical: responsiveScreenFontSize(2), 
                        // borderColor: '#f8f8f8', 
                        borderRadius: responsiveFontSize(1),
                        
                      }}>
                        <View style={{ height: responsiveScreenFontSize(6), width: responsiveWidth(80), alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: tablet? responsiveScreenFontSize(1.4): responsiveScreenFontSize(1.8), color: 'black' }}>Contact</Text>
                          <Text style={{ fontSize: tablet? responsiveScreenFontSize(1.4): responsiveScreenFontSize(1.8) }}>{authRed?.data?.email}</Text>
                        </View>
                        <View style={{ height: responsiveScreenFontSize(0.1), width: responsiveWidth(80), alignSelf: 'center', backgroundColor: 'grey' }} />
                        <View style={{ width: responsiveWidth(80), alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-start', marginVertical: responsiveScreenFontSize(1) }}>


                          <Text style={{ fontSize:tablet? responsiveScreenFontSize(1.4):  responsiveScreenFontSize(1.8), color: 'black' }}>Ship to</Text>
                          <Text style={{ fontSize:tablet? responsiveScreenFontSize(1.4):  responsiveScreenFontSize(1.8) }}>{`${address?.address1}, ${address?.city}, ${address?.province} ${address?.zip}, ${address?.address2}, ${address?.country}`}</Text>
                        </View>
                        <View style={{ height: responsiveScreenFontSize(0.1), width: responsiveWidth(80), alignSelf: 'center', backgroundColor: 'grey' }} />
                        <View style={{ width: responsiveWidth(80), alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-start', marginVertical: responsiveScreenFontSize(1) }}>
                          <Text style={{ fontSize:tablet? responsiveScreenFontSize(1.4):  responsiveScreenFontSize(1.8), color: 'black' }}>Method</Text>
                          <Text style={{ fontSize:tablet? responsiveScreenFontSize(1.4):  responsiveScreenFontSize(1.8) }}>{selectedShippingRate?.title}</Text>
                        </View>

                      </View>
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, i) => i.toString()}

                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setIsApiCall(true);
                            setShippingRatesApi(item.handle, brandId, () =>
                              setIsApiCall(false),
                            ).then(() => {
                              setSelectedShippingRate(item);
                            });
                          }}
                          style={styles.shipRateItem}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text>{item.title}</Text>
                            {item?.title === selectedShippingRate?.title && (
                              <CheckIcon
                                name="check"
                                size={responsiveFontSize(tablet ? 1 : 2)}
                                color={colors.themeblue}
                              />
                            )}
                          </View>
                          <Text>${item?.priceV2?.amount}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </>
              }

            </> : <Loader />
        }

      </View>
      {/* {
        shippingRates?.length > 0 && */}
      <TouchableOpacity
        onPress={() => {
          updateAttribute(brandId, eventID).then((res) => {
            // console.log(res,"=======res=======")
            if (res) {
              setOpenCartDetailWebView(true)
            }
          })
        }}
        disabled={isApiCall || invalid}
        style={{
          backgroundColor: invalid ? 'red' : colors.themeblue,
          height: responsiveHeight(6),
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {isApiCall ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet?1.25:2) }}>
            {invalid ? "Invalid zip code" : "Continue to payment"}
          </Text>
        )}
      </TouchableOpacity>
      {/* } */}

      <Toast
        visibilityTime={2000}
        config={toastConfig}
        ref={c => {
          if (c) Toast.toastInstance = c;
        }}
      />
    </View>
    // </ScrollView>
  );
}

const toastConfig = {
  error: ({ text1, props }) => (
    <View
      style={{
        paddingVertical: responsiveHeight(2),
        width: '90%',
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

const mapStateToProps = ({ shippingAddressRed, getShippingRatesRed, getShippingAddressRed, authRed }) => {
  return { shippingAddressRed, getShippingRatesRed, getShippingAddressRed, authRed };
};

export default connect(mapStateToProps, {
  ...getShippingAddress,
  ...getShippingRates,
})(ShippingInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shippingRateCont: {
    flex: 1,
    marginHorizontal: '4%',
  },
  heading: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: colors.themeblue,
    fontWeight: 'bold',
    marginVertical:responsiveScreenFontSize(0.5),
  },
  shipRateItem: {
    paddingVertical: responsiveHeight(1.8),
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: responsiveFontSize(1),
    marginVertical: responsiveHeight(0.5),
    paddingHorizontal: '2%',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },

    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    backgroundColor: 'white',
    // elevation: 2,
  },
});
