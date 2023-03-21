import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const tablet = deviceInfoModule.isTablet();

const DataRow = ({name, value}) => {
  return (
    <View style={styles.cont}>
      <Text style={{fontSize: tablet ? responsiveFontSize(1.2) : responsiveFontSize(1.5)}}>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default DataRow;

const styles = StyleSheet.create({
  cont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
