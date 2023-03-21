import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()

const FavItem = ({ item, onDelete, setSelectedItem, onSelect }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.favItemCont}
      // onPress={() => navigation.push('bioshop',{shopName:item.instagram_username})}
      onPress={onSelect}
    >
      {/* <Image
        style={styles.img}
        resizeMode="cover"
        source={
          item.profile_image_url
            ? {uri: item.profile_image_url}
            : require('../../assets/user.png')
        }
      /> */}
      <View style={styles.textCont}>
        <View>
          <Text style={styles.text}>{item.name}</Text>
          {item.promo != "KB0" && item.promo ? <Text style={{ color: 'red', fontSize: responsiveFontSize(tablet ? 0.65 : 1.25), marginLeft: responsiveWidth(2) }}>GET {item.discount} OFF</Text> : null}
        </View>
        <TouchableOpacity
          style={{ marginRight: responsiveFontSize(1) }}
          onPress={() => {
            onDelete(true);
            setSelectedItem(item);
          }}
          hitSlop={{
            top: responsiveHeight(1),
            bottom: responsiveHeight(1),
            left: responsiveWidth(3),
            right: responsiveWidth(3),
          }}>
          <DelIcon
            name="delete"
            color={colors.errorRed}
            size={responsiveFontSize(tablet ? 1.5 : 2.75)}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FavItem;

const styles = StyleSheet.create({
  favItemCont: {
    // borderWidth: 1,
    // borderColor: colors.silver,
    // marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(0.5),
    // borderRadius: responsiveFontSize(1),
    // height: responsiveHeight(8),
    marginVertical:responsiveScreenFontSize(1),
    paddingVertical: responsiveHeight(tablet ? 0.75 : 1.5),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: responsiveWidth(92), alignSelf: 'center',
    borderRadius: responsiveScreenFontSize(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,

  },
  textCont: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: responsiveFontSize(tablet ? 2.5 : 5),
    height: responsiveFontSize(tablet ? 2.5 : 5),
    borderRadius: responsiveFontSize(5) / 2,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 0.9 : 1.7),
    marginLeft: responsiveWidth(2),
    color: colors.themeblue,
    fontWeight: '700'
  },
  textCon2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(0.25),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  img1: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(12),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
});
