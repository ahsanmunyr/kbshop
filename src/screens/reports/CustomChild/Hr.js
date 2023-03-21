import {StyleSheet, View} from 'react-native';
import React from 'react';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';

const Hr = () => {
  return <View style={styles.line} />;
};

export default Hr;

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: responsiveScreenFontSize(0.05),
    backgroundColor: 'grey',
    marginVertical: responsiveScreenFontSize(0.7),
  },
});
