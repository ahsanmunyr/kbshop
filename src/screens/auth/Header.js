import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.hdCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <BackIcon
            name="arrow-back"
            size={responsiveFontSize(tablet?2.3:3)}
            color={colors.themeblue}
          />
        </TouchableOpacity>
        <Text style={styles.hd}>{title}</Text>
        {/* <Text style={styles.hd}>---------------------------Sign up</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  hdCont: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    position: 'relative',
    backgroundColor:'white'
  },
  hd: {
    fontSize: responsiveFontSize(tablet?2.1:2.2),
    color: colors.themeblue,
    fontWeight:'bold'
  },
  backBtn: {
    position: 'absolute',
    top: responsiveHeight(2.5),
    left: responsiveFontSize(2),
  },
});

export default Header;
