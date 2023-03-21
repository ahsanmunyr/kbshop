import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Btn from './Btn';
import colors from '../assets/colors/colors';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const userImg = require('../assets/user-without-bg.png');

const CustomImagePickerNPreview = ({onPress, defaultImg}) => {
  return (
    <View style={styles.imgCont}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={defaultImg || userImg}
      />
      <Btn
        text="Change"
        pS={styles.passedStyleBtn}
        pSText={{paddingBottom: responsiveHeight(0.3),fontSize:responsiveFontSize(tablet?1:1.6)}}
        call={onPress}
      />
    </View>
  );
};

export default CustomImagePickerNPreview;

const styles = StyleSheet.create({
  passedStyleBtn: {
    position: 'absolute',
    height: responsiveHeight(4),
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 0,
  },
  imgCont: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveFontSize(100),
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  img: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveFontSize(100),
    alignSelf: 'center',
  },
});
