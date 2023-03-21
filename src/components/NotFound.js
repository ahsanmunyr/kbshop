import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()
export default function NotFound({text}) {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:responsiveFontSize(2),marginHorizontal:responsiveFontSize(2),zIndex: -1,}}>
      {/* <Image  resizeMode='contain' style={{width: 300, height:300}} source={require('./../assets/posts/nodata.png')} /> */}
      <Text style={{fontSize:responsiveFontSize(tablet?1:2), textAlign:'center'}}>{text?text:"Not Found"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})