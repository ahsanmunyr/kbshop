// @ts-nocheck
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import deviceInfo from 'react-native-device-info';
import colors from '../../assets/colors/colors';

const tablet = deviceInfo.isTablet();

export default function HomeMenu({setActive, active, filter, filter1}) {

  const navigation = useNavigation();
  return (
    <View style={styles.parentContainer}>
      <View style={styles.mainCon}>
      <TouchableOpacity
          style={{
            ...styles.con,
          }}
          onPress={() => {
            setActive(1);
            // navigation.navigate('category');
          }}>
            <View
            
            style={{
              borderBottomColor: 'rgb(7, 13, 46)',
              borderBottomWidth: active == 1 ? 1 : 0,
            }}>
            <Text
            style={{
              ...styles.text,
              fontWeight:'500',
              color: 'rgb(7, 13, 46)'
            }}>
            Shows
          </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.con,
          }}
          onPress={() => {
            setActive(2);
            // navigation.navigate('category');
          }}>
            <View
            
            style={{
              borderBottomColor: 'rgb(7, 13, 46)',
              borderBottomWidth: active == 2 ? 1 : 0,
            }}>
            <Text
            style={{
              ...styles.text,
              fontWeight:'500',
              color: 'rgb(7, 13, 46)'
            }}>
            Brands
          </Text>
            </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            ...styles.con,
          }}
          onPress={() => {
            setActive(3);
            // navigation.navigate('category');
          }}>
          <Text
            style={{
              ...styles.text,
              color: 'rgb(7, 13, 46)',
              borderBottomColor: 'rgb(7, 13, 46)',
              borderBottomWidth: active == 3 ? 1 : 0,
            }}>
            Influencers
          </Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => {
          if(active == 1){
            filter(true)
          }
          if(active == 2){
            filter1(true)
          }
        }}>
        <Text
          style={{
            ...styles.text,
            fontWeight:'500',
            fontSize: responsiveFontSize(tablet ? 1.2 : 2),
            color: 'rgb(7, 13, 46)',
          }}>
          Filters
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    alignSelf:'center', width:responsiveWidth(96)
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1.28 : 2),
    fontWeight: 'bold',
  },
  mainCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: responsiveFontSize(tablet?0.5:1),
    // backgroundColor:"red"
    
  },
  con: {
    // width: responsiveWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveFontSize(1),
    // borderRadius: responsiveScreenFontSize(1.5),
    // backgroundColor:"blue"
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
    marginRight:"3%"
  },
});
