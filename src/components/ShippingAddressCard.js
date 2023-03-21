import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import CheckIcon from 'react-native-vector-icons/FontAwesome5';
import deviceInfoModule from 'react-native-device-info';

const tablet = deviceInfoModule.isTablet();

const ShippingAddressCard = ({
  onPressCard,
  onEdit,
  onDelete,
  address,
  cardCont,
  isShowBtns = true,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPressCard}
        style={[styles.shipCardCont, cardCont]}>
        <View
          style={{
            width: responsiveScreenWidth(70),
            paddingVertical: responsiveScreenFontSize(tablet ? 0.3 : 1),
          }}>
          <Text
            style={{fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8), color: 'black'}}>
            Name:
          </Text>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8),
            }}>{`${address?.firstName} ${address?.lastName}`}</Text>
          <Text
            style={{fontSize: responsiveScreenFontSize(tablet ? 1.2: 1.8), color: 'black'}}>
            Address:
          </Text>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', width:responsiveScreenWidth(26) }}> */}
          <Text style={{fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8)}}>
            {`${address?.address1}`}{' '}
            {address?.address2 !== '' && address?.address2 && (
              <Text style={{fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8)}}>{`${address?.address2}`} </Text>
            )}
          </Text>
          {/* {(address?.address2 !== "" && address?.address2) && <Text>{`${address?.address2}`} </Text>} */}
          <Text style={{fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8)}}>
            {`${address?.country}, ${address?.province}`}{' '}
            <Text style={{fontSize: responsiveScreenFontSize(tablet ? 1.25 : 1.8)}}>{address?.city}</Text>
          </Text>
          {/* <Text> {address?.city}</Text> */}
          {/* </View> */}
          {isShowBtns && (
            <View style={styles.cardBtnCont}>
              <TouchableOpacity
                onPress={onEdit}
                style={{...styles.crdBtn, backgroundColor: colors.themeblue}}>
                <Text style={{color: 'white'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>onDelete(address._id)}
                style={{
                  ...styles.crdBtn,
                  backgroundColor: colors.themeblue,
                  marginLeft: '2%',
                }}>
                <Text style={{color: 'white'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {address?.is_default && (
            <CheckIcon
              name="check"
              size={responsiveFontSize(tablet ? 1.5 : 2)}
              color={colors.themeblue}
              style={{right: 0}}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ShippingAddressCard;

const styles = StyleSheet.create({
  crdBtn: {
    paddingHorizontal: '8%',
    paddingVertical: responsiveHeight(0.5),
    borderRadius: responsiveFontSize(0.5),
  },
  shipCardCont: {
    borderWidth: 1,
    borderColor: '#cecece',
    backgroundColor: 'white',
    borderRadius: responsiveFontSize(1),
    // paddingVertical: responsiveHeight(1.4),
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  cardBtnCont: {
    flexDirection: 'row',
    paddingVertical: responsiveScreenFontSize(1),
  },
});
