import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard, Platform, Dimensions } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import MarketMenu from './MarketMenu'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CategorySetup from "../../components/CategorySetup"
import UserBrand from "./brands/index"
import Active from '../bioShop/Market/Active';
import Category from "./category/index"
import CrossIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Brands from './category/Brands';
import Campaigns from './brands/Campaigns';
import { useEffect } from 'react';
import deviceInfo from "react-native-device-info"


const tablet = deviceInfo.isTablet()

const { width } = Dimensions.get('window')
const head = {};

if (width > 550) head.height = 80
const Stack = createNativeStackNavigator()
function MarketPlace({ navigation, reset4, setReset4 }) {
  const [active, setActive] = useState(2)

  const [searchText, setSearchText] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.imgCon}>
          <Image
            style={styles.img1}
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
        </View>
      ),
      headerStyle: head,
      headerTitle: props => (
        <View>
          <View style={styles.textCon2}>
            <SearchIcon
              style={styles.searchIcon}
              name="search"
              color="#bdbdbd"
              size={responsiveFontSize(tablet ? 1.25 : 2)}
            />
            <TextInput
              // onFocus={() => setDrop(true)}
              // onBlur={() => setDrop(false)}
              value={searchText}
              onChangeText={v => setSearchText(v)}
              placeholder="Search"
              style={{
                flex: 1,
                paddingVertical: 0,
                color: 'grey',
                fontSize: responsiveFontSize(tablet ? 0.8 : 1.6)
              }}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  // setDrop(false)
                  Keyboard.dismiss();
                }}>
                <CrossIcon name="cross" size={responsiveFontSize(tablet ? 1.25 : 3)} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ),
      headerShown: true
    });
  }, [navigation, searchText]);

  useEffect(() => {
    setActive(2)
    navigation.navigate("brands")
  }, [reset4])

  return (
    <View style={{ flex: 1 }}>
      <MarketMenu active={active} setActive={setActive} />
      <View style={{flex:1,paddingHorizontal:responsiveFontSize(1)}}>
        <Stack.Navigator
          initialRouteName='brands'
          screenOptions={{ animation: 'none' }}
        >
          <Stack.Screen
            name="category"
            options={{ headerShown: false }}
            component={Category}
          />
          <Stack.Screen
            name='brands'
            options={{ headerShown: false, }}
          >
            {props => <UserBrand {...props} setActive={setActive} reset4={reset4} />}
          </Stack.Screen>
          <Stack.Screen
            name='active'
            options={{ headerShown: false }}
            component={Active}
          />
          <Stack.Screen
            name='categeryBrands'
            options={{ headerShown: false }}
            component={Brands}
          />
          <Stack.Screen
            name='campaigns'
            options={{ headerShown: false }}
            component={Campaigns}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MarketPlace
const styles = StyleSheet.create({
  textCon2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(Platform.OS == "ios" ? (tablet ? 0.5 : 0.75) : 0.25),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == "ios" ? (tablet ? 15 : 12) : 0)
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  img1: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
})