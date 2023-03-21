import {
  View,
  useWindowDimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/Ionicons';
import deviceInfoModule from 'react-native-device-info';
import colors from '../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const tablet = deviceInfoModule.isTablet();

const HeaderComp = ({onBackPress, title, onFilterPress}) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onBackPress} style={{padding: 5}}>
            <BackIcon
              style={[
                // {marginLeft: responsiveFontSize(1)},
                // tablet && styles.iconWidth,
              ]}
              name="arrow-back"
              size={responsiveFontSize(tablet ? 1.5 : 2.5)}
              color={colors.themeblue}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onFilterPress(true)}
          style={styles.filterBtn}>
          <Text style={{
            // fontWeight:'500',
            fontSize: responsiveFontSize(tablet ? 1.2 : 2),
            color: 'rgb(7, 13, 46)',
          }}>Filter</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2.3),
    color: 'black',
    marginLeft: '2%',
  },
  iconWidth: {
    width: '4%',
  },
  filterBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: responsiveFontSize(1),
    borderRadius: responsiveScreenFontSize(5),
    borderColor: 'rgb(7, 13, 46)',
    borderWidth: 1,
    width: tablet ? "20%" : '25%',
    height: responsiveHeight(tablet ? 3 : 4),
    marginRight: '3%',
  },
});
