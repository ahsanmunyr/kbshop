import {View, Text} from 'react-native';
import React from 'react';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Hr = () => {
  return (
    <View
      style={{
        width: responsiveWidth(100),
        height: 2,
        backgroundColor: '#e8e8e8',
      }}
    />
  );
};

export default Hr;
