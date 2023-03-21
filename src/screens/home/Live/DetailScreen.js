// @ts-nocheck
import { View, Text,Image } from 'react-native'
import React from 'react'
import deviceInfo from 'react-native-device-info';
import {
    responsiveWidth,
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
  } from 'react-native-responsive-dimensions';
const tablet = deviceInfo.isTablet();
export default function DetailScreen({event,current }) {
  
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: responsiveFontSize(2),
    }}>
    <View
      style={{
        borderWidth: 2,
        borderColor: '#e8e8e8',
        borderRadius: responsiveWidth(100),
        padding: 2,
        backgroundColor: 'white',
      }}>
      {event?.brand_profile ? (
        <Image
          style={{
            height: responsiveWidth(tablet ? 15 : 30),
            width: responsiveWidth(tablet ? 15 : 30),
            borderRadius: responsiveWidth(100),
          }}
          resizeMode="cover"
          source={{ uri: event?.brand_profile }}
        />
      ) : null}
    </View>
    <Text
      style={{
        textAlign: 'center',
        fontWeight: '500',
        color:'black',
        fontSize: responsiveFontSize(tablet ? 0.75 : 1.8),
        marginTop: 5,
        width: responsiveWidth(90),
      }}>
      {event?.title}
    </Text>
       <Text
      style={{
        color: 'black',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: responsiveFontSize(tablet ? 0.75 : 1.5),
        marginTop: 5,
        width: responsiveWidth(80),
      }}>
      by {event?.brand_name}
    </Text>
  </View>
  )
}