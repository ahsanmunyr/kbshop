import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import BioIcon from 'react-native-vector-icons/FontAwesome';
import MyPostIcon from 'react-native-vector-icons/MaterialIcons';
import EarningIcon from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();
export default function BioMenu({setActive, active}) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.mainCon}>
        <TouchableOpacity
          style={{
            ...styles.con,
            backgroundColor: active == 1 ? 'rgb(7, 13, 46)' : 'white',
          }}
          onPress={() => {
            setActive(1);
            navigation.push('myPost');
          }}>
          <MyPostIcon
            name="perm-media"
            color={active == 1 ? 'white' : 'gray'}
            size={responsiveFontSize(tablet ? 2 : 4)}
          />
          <Text
            style={{
              ...styles.text,
              color: active == 1 ? 'white' : 'rgb(7, 13, 46)',
            }}>
            My Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.con,
            backgroundColor: active == 2 ? 'rgb(7, 13, 46)' : 'white',
          }}
          onPress={() => {
            setActive(2);
            navigation.push('bioshop');
          }}>
          <BioIcon
            name="shopping-cart"
            color={active == 2 ? 'white' : 'gray'}
            size={responsiveFontSize(tablet ? 2 : 4)}
          />
          <Text
            style={{
              ...styles.text,
              color: active == 2 ? 'white' : 'rgb(7, 13, 46)',
            }}>
            BioShop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.con,
            backgroundColor: active == 3 ? 'rgb(7, 13, 46)' : 'white',
          }}
          onPress={() => {
            setActive(3);
            navigation.push('marketPlace');
          }}>
          <EarningIcon
            name="database"
            color={active == 3 ? 'white' : 'gray'}
            size={responsiveFontSize(tablet ? 2 : 4)}
          />
          <Text
            style={{
              ...styles.text,
              color: active == 3 ? 'white' : 'rgb(7, 13, 46)',
            }}>
            Earning
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: responsiveFontSize(tablet ? 1 : 2),
    marginTop: responsiveFontSize(1),
  },
  con: {
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,

    backgroundColor: 'white',
    width: responsiveWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveFontSize(1),
    borderRadius: responsiveFontSize(0.5),
  },
  mainCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: responsiveFontSize(1),
  },
});
