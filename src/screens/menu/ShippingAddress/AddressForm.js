// @ts-nocheck
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import InputField from '../../../components/InputField';
import DropDownComp from '../../../components/DropDownComp';
import * as countryStateCityAct from '../../../store/actions/countryStateCityAct';
import Loader from '../../../components/Loader';
import Btn from '../../../components/Btn';
import * as getShippingAddress from '../../../store/actions/shippingAddressAct';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddressForm = ({
  countryStateCityRed,
  get_countries,
  get_states,
  get_cities,
  createShippingAddress,
  getShippingAddress,
  cb,
  onBack = () => {
    console.log('work');
  },
  actionType,
  data,
  updateShippingAddress,
}) => {
  // country
  const [isCountryDrpdwnOpen, setIsCountryDrpdwnOpen] = useState(false);
  const [isCountryApiCall, setIsCountryApiCall] = useState(true);
  // state
  const [isStateDrpdwnOpen, setIsStateDrpdwnOpen] = useState(false);
  const [isStateApiCall, setIsStateApiCall] = useState(false);
  // city
  const [isCityDrpdwnOpen, setIsCityDrpdwnOpen] = useState(false);
  const [isCityApiCall, setIsCityApiCall] = useState(false);

  const [shippingAddressDetail, setShippingAddressDetail] = useState({
    fname: '',
    lname: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    company: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSubtmit, setIsSubtmit] = useState(false);

  function getValue(k, v) {
    setShippingAddressDetail(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  }

  useEffect(() => {
    if (actionType === 'edit') {
      console.log(data, 'OOOOOOOOOOOOOOOOOOOOOOO');
      getValue('fname', data?.firstName);
      getValue('lname', data?.lastName);
      getValue('country', data?.country);
      // getValue('province', data?.province);
      // getValue('city', data?.city);
      getValue('address1', data?.address1);
      getValue('address2', data?.address2);
      getValue('zipCode', data?.zip);
      getValue('phone', data?.phone);
      getValue('company', data?.company);
    }
  }, []);

  useEffect(() => {
    get_countries().then(() => {
      setIsCountryApiCall(false);
      getValue('country', 'US');
    });
  }, []);

  useEffect(() => {
    getValue('city', '');
    getValue('province', '');
    if (shippingAddressDetail.country !== '') {
      setIsStateApiCall(true);
      get_states(shippingAddressDetail.country).then(() => {
        actionType === 'edit' && getValue('province', data?.province);
        setIsStateApiCall(false);
      });
    }
  }, [shippingAddressDetail.country]);

  useEffect(() => {
    if (shippingAddressDetail.province !== '') {
      setIsCityApiCall(true);
      get_cities(
        shippingAddressDetail.country,
        shippingAddressDetail.province,
      ).then(() => {
        actionType === 'edit' && getValue('city', data?.city);
        setIsCityApiCall(false);
      });
    }
  }, [shippingAddressDetail.province]);

  const onSubmitAddress = () => {
    setIsSubtmit(true);
    if (
      shippingAddressDetail.fname !== '' &&
      shippingAddressDetail.lname !== '' &&
      shippingAddressDetail.address1 !== '' &&
      shippingAddressDetail.country !== '' &&
      // shippingAddressDetail.city !== '' &&
      // shippingAddressDetail.province !== '' &&
      shippingAddressDetail.zipCode !== '' &&
      shippingAddressDetail.phone !== ''
    ) {
      if (countryStateCityRed.states.length > 0) {
        if (shippingAddressDetail.province !== '') {
          if (countryStateCityRed.cities.length > 0) {
            if (shippingAddressDetail.city !== '') {
              setIsSaving(true);
              // console.log('CHalala city');
              if (actionType !== 'edit') {
                createShippingAddress(
                  shippingAddressDetail,
                  getShippingAddress,
                ).then(() => {
                  if (cb) {
                    cb().then(() => {
                      setIsSaving(false);
                    });
                  } else {
                    onBack();
                  }
                });
              } else {
                updateShippingAddress(
                  {...shippingAddressDetail, address_id: data._id},
                  getShippingAddress,
                ).then(() => {
                  if (cb) {
                    cb().then(() => {
                      setIsSaving(false);
                    });
                  } else {
                    onBack();
                  }
                });
              }
            }
          } else {
            setIsSaving(true);
            // console.log('CHalala stat');
            if (actionType !== 'edit') {
              createShippingAddress(
                shippingAddressDetail,
                getShippingAddress,
              ).then(() => {
                if (cb) {
                  cb().then(() => {
                    setIsSaving(false);
                  });
                } else {
                  onBack();
                }
              });
            } else {
              updateShippingAddress(
                {...shippingAddressDetail, address_id: data._id},
                getShippingAddress,
              ).then(() => {
                if (cb) {
                  cb().then(() => {
                    setIsSaving(false);
                  });
                } else {
                  onBack();
                }
              });
            }
          }
        }
      } else {
        setIsSaving(true);
        if (actionType !== 'edit') {
          createShippingAddress(shippingAddressDetail, getShippingAddress).then(
            () => {
              if (cb) {
                cb().then(() => {
                  setIsSaving(false);
                });
              } else {
                onBack();
              }
            },
          );
        } else {
          updateShippingAddress(
            {...shippingAddressDetail, address_id: data._id},
            getShippingAddress,
          ).then(() => {
            if (cb) {
              cb().then(() => {
                setIsSaving(false);
              });
            } else {
              onBack();
            }
          });
        }
      }

      // setIsSaving(true);
      // console.log("CHalala")
      // createShippingAddress(shippingAddressDetail, getShippingAddress).then(
      //   () => {
      //     if (cb) {
      //       cb().then(() => {
      //         setIsSaving(false);
      //       });
      //     } else {
      //       onBack();
      //     }
      //   },
      // );
    } else {
      console.log('err');
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <InputField
          error={!shippingAddressDetail.fname && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('fname', v)}
          password={false}
          value={shippingAddressDetail.fname}
          placeHolder="First Name"
          smallCaps={true}
          color="grey"
        />
        <InputField
          error={!shippingAddressDetail.lname && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('lname', v)}
          password={false}
          value={shippingAddressDetail.lname}
          placeHolder="Last Name"
          smallCaps={true}
          color="grey"
        />
        <InputField
          error={!shippingAddressDetail.address1 && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('address1', v)}
          password={false}
          value={shippingAddressDetail.address1}
          placeHolder="Address 1"
          smallCaps={true}
          color="grey"
        />
        <InputField
          returnKeyType="next"
          getValue={v => getValue('address2', v)}
          password={false}
          value={shippingAddressDetail.address2}
          placeHolder="Address 2 (Optional)"
          smallCaps={true}
          color="grey"
        />
        {/* <InputField
          error={!shippingAddressDetail.country && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('country', v)}
          password={false}
          value={shippingAddressDetail.country}
          placeHolder="Country"
          smallCaps={true}
          color="grey"
        /> */}
        {/* for future work */}
        {isCountryApiCall ? (
          <Loader />
        ) : (
          <View
            style={[
              styles.dropCont,
              {zIndex: 99999999, marginVertical: responsiveScreenFontSize(0.7)},
            ]}>
            <DropDownComp
              items={countryStateCityRed.countries}
              open={isCountryDrpdwnOpen}
              value={shippingAddressDetail.country}
              setOpen={setIsCountryDrpdwnOpen}
              onSelectItem={data => getValue('country', data.value)}
              error={!shippingAddressDetail.country && isSubtmit}
              placeholdertxt="Select country"
              searchable={true}
              style={{width: '100%'}}
              containerStyle={{width: '100%'}}
            />
          </View>
        )}
        {/* <InputField
          error={!shippingAddressDetail.province && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('province', v)}
          password={false}
          value={shippingAddressDetail.province}
          placeHolder="State"
          smallCaps={true}
          color="grey"
        /> */}
        {shippingAddressDetail.country !== '' &&
          countryStateCityRed.states.length > 0 &&
          (isStateApiCall ? (
            // <View style={{marginTop: responsiveHeight(5)}}>
            <Loader />
          ) : (
            // </View>
            <View
              style={[
                styles.dropCont,
                {
                  zIndex: 9999999,
                  marginVertical: responsiveScreenFontSize(0.7),
                },
              ]}>
              <DropDownComp
                items={countryStateCityRed.states}
                open={isStateDrpdwnOpen}
                value={shippingAddressDetail.province}
                setOpen={setIsStateDrpdwnOpen}
                error={
                  countryStateCityRed.states.length > 0
                    ? !shippingAddressDetail.province && isSubtmit
                    : false
                }
                onSelectItem={data => getValue('province', data.value)}
                placeholdertxt="Select state"
                searchable={true}
                style={{width: '100%'}}
                containerStyle={{width: '100%'}}
              />
            </View>
          ))}
        {/* <InputField
          error={!shippingAddressDetail.city && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('city', v)}
          password={false}
          value={shippingAddressDetail.city}
          placeHolder="City"
          smallCaps={true}
          color="grey"
        /> */}
        {shippingAddressDetail.province !== '' &&
          countryStateCityRed.cities.length > 0 &&
          (isCityApiCall ? (
            <View style={{marginTop: responsiveHeight(5)}}>
              <Loader />
            </View>
          ) : (
            <View
              style={[
                styles.dropCont,
                {marginVertical: responsiveScreenFontSize(0.7)},
              ]}>
              <DropDownComp
                items={countryStateCityRed.cities}
                open={isCityDrpdwnOpen}
                value={shippingAddressDetail.city}
                setOpen={setIsCityDrpdwnOpen}
                onSelectItem={data => getValue('city', data.value)}
                searchable={true}
                error={
                  countryStateCityRed.cities.length > 0
                    ? !shippingAddressDetail.city && isSubtmit
                    : false
                }
                placeholdertxt="Select city"
                style={{width: '100%'}}
                containerStyle={{width: '100%'}}
              />
            </View>
          ))}
        <InputField
          error={!shippingAddressDetail.zipCode && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('zipCode', v)}
          password={false}
          value={shippingAddressDetail.zipCode}
          placeHolder="Zip"
          smallCaps={true}
          color="grey"
        />
        <InputField
          error={!shippingAddressDetail.phone && isSubtmit}
          returnKeyType="next"
          //   onSubmitEditing={()=>{
          //     password.current.focus()
          //   }}
          getValue={v => getValue('phone', v)}
          password={false}
          value={shippingAddressDetail.phone}
          placeHolder="Phone"
          keyboardType="number"
          smallCaps={true}
          color="grey"
        />
        <InputField
          returnKeyType="next"
          getValue={v => getValue('company', v)}
          password={false}
          value={shippingAddressDetail.company}
          placeHolder="Company (Optional)"
          smallCaps={true}
          color="grey"
        />
        <View style={{height: responsiveScreenFontSize(1)}} />
        <Btn
          text="Save"
          call={() => {
            onSubmitAddress();
            // console.log(shippingAddressDetail);
          }}
          loader={isSaving}
        />
        {/* <View style={{height:responsiveScreenFontSize(10)}} /> */}
      </KeyboardAwareScrollView>
      <View style={{height: responsiveScreenFontSize(30)}} />
    </ScrollView>
  );
};

const mapStateToProps = ({countryStateCityRed}) => {
  return {countryStateCityRed};
};

export default connect(mapStateToProps, {
  ...getShippingAddress,
  ...countryStateCityAct,
})(AddressForm);

const styles = StyleSheet.create({
  dropCont: {
    width: '100%',
    marginTop: responsiveHeight(1),
  },
});
