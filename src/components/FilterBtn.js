import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    responsiveFontSize,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();

const FilterBtn = ({setIsFilterModal}) => {
  return (
    <View style={styles.btncont}>
      <TouchableOpacity
        onPress={() => setIsFilterModal(true)}
        style={styles.subCont}>
        <View style={styles.btnView}>
          <FilterIcon
            name="sliders"
            color={'white'}
            size={responsiveFontSize(tablet ? 1 : 2)}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 1 : 2),
              color: 'white',
            }}>
            {' '}
            Filters
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterBtn;

const styles = StyleSheet.create({
  btncont: {
    backgroundColor: colors.themeblue,
    width: responsiveWidth(24),
    height: responsiveScreenFontSize(5),
    borderRadius: responsiveScreenFontSize(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCont: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnView: {
    backgroundColor: colors.themeblue,
    alignItems: 'center',
    borderRadius: responsiveFontSize(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
