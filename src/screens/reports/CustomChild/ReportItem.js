import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PurchasesIcons from 'react-native-vector-icons/FontAwesome5';
import deviceInfoModule from 'react-native-device-info';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';

const tablet = deviceInfoModule.isTablet();

const ReportItem = props => {
  return (
    <TouchableOpacity style={styles.container}>
      {props.children}
      <View style={styles.content}>
        <Text style={{color: 'black', fontSize: responsiveFontSize(tablet ? 1.3 : 2.4)}}>
          ${props.amount}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: responsiveFontSize(tablet ? 1.2 : 1.8),
            // fontWeight: '500',
          }}>
          {props.title.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: responsiveHeight(tablet ? 1 : 1.5),
    borderRadius: responsiveFontSize(0.5),
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(tablet ? 0.3 : 0.5),
    borderColor: '#cecece',
    borderWidth: 1,
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: 'black',
  },
});
