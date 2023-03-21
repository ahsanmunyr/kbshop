import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import ShippingMenu from "../../../menu/ShippingAddress/AddressForm"
import BackIcon1 from 'react-native-vector-icons/Ionicons';
import deviceInfo from 'react-native-device-info';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../../assets/colors/colors';


const tablet = deviceInfo.isTablet();

export default function Shipping({ setShippingPage,cb}) {
  return (
    <View style={{ flex: 1,margin:responsiveFontSize(1) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: responsiveFontSize(1),marginBottom:responsiveFontSize(1) }}>
        <TouchableOpacity
          onPress={() => setShippingPage("")}
          style={{ paddingRight: responsiveFontSize(2) }}>
          <BackIcon1
            name="arrow-back"
            color={'black'}
            size={responsiveFontSize(tablet ? 2 : 3)}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: responsiveFontSize(2), color: colors.themeblue, fontWeight: 'bold' }}>Add shipping address</Text>
      </View>
      <ShippingMenu cb={cb}/>
    </View>
  )
}

const styles = StyleSheet.create({})