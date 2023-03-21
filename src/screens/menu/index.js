// @ts-nocheck
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import CustomDrawer from '../../components/CustomDrawer'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import CrossIcon from "react-native-vector-icons/Entypo"
import SearchIcon from "react-native-vector-icons/Feather"
import { useIsFocused } from '@react-navigation/native';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()

const { width } = Dimensions.get('window')
const head = {};

if (width > 550) head.height = 80
export default function Menu({ navigation }) {
  const [searchText, setSearchText] = useState("")
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require("../../assets/logo.png")} />
        </View>
      ),
      headerStyle: head,
      headerTitle: props => (
        <View>
          <View
            style={styles.textCon}>
            <SearchIcon
              style={styles.searchIcon}
              name='search'
              color="#bdbdbd"
              size={responsiveFontSize(tablet ? 1.5 : 2)}
            />
            <TextInput
              // onFocus={() => setDrop(true)}
              // onBlur={() => setDrop(false)}
              value={searchText}
              onChangeText={v => setSearchText(v)}
              placeholder='Search'
              style={{
                flex: 1,
                paddingVertical: 0,
                color: 'grey',
                fontSize: responsiveFontSize(tablet ? 1.2 : 1.6)
              }}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText("")
                  // setDrop(false)
                  Keyboard.dismiss()
                }}
              >
                <CrossIcon
                  name="cross"
                  size={responsiveFontSize(tablet ? 1.25 : 3)}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ),
      headerShown: true
    });
  }, [isFocused, searchText])
  return (
    <ScrollView style={{  backgroundColor:'white' }} contentContainerStyle={{flex:1}}>
      <View style={{ flex: 1, backgroundColor:'white' }}>
        <CustomDrawer />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: tablet? responsiveWidth(70): responsiveWidth(65),
    padding: responsiveFontSize(Platform.OS == "ios" ? (tablet ? 0.5 : 0.75) : 0.25),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == "ios" ? (tablet ? 15 : 12) : 0)
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(2),
    // paddingRight: responsiveFontSize(2),
  }
})