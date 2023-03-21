import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()
const Btn = ({text, call, color, loader, pS, pSText,disabled}) => {
  return (
    <TouchableOpacity
      disabled={loader || disabled ? true :disabled}
      onPress={call}
      style={[
        {
          ...styles.button,
          backgroundColor: color ? color : colors.themeblue,
        },
        pS,
        pSText,
      ]}>
      {loader ? (
        <ActivityIndicator
          size={responsiveFontSize(3)}
          color={colors.loaderWhite}
        />
      ) : (
        <Text
          style={[
            {color: colors.white, fontSize: responsiveFontSize(tablet?1.25:1.8)},
            pSText,
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: responsiveFontSize(tablet?0.5:1),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Btn;
