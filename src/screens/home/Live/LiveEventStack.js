// @ts-nocheck

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
  Text
} from 'react-native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import deviceInfo from 'react-native-device-info';

import SearchIcon from 'react-native-vector-icons/Feather';
import FilterIcon from "react-native-vector-icons/FontAwesome"
import CrossIcon from 'react-native-vector-icons/Entypo';
import BioShopScreen from '../bioshop/BioShop';
import Events from '../../host/index'
import LiveCycle from './LiveCycle';
import LiveEventCycle from './LiveEventCycle';
import LiveEvents from './LiveEvents';
import colors from '../../../assets/colors/colors';
import ControlRoom from '../../host/ControlRoom';

const tablet = deviceInfo.isTablet();

const { width } = Dimensions.get('window');
const head = {};

if (width > 550) head.height = 80;
const Stack = createNativeStackNavigator();
export default function LiveEventStack({ navigation }) {
  console.log(navigation.state, "navigation")
  const [isBio, setIsBio] = useState(false)
  const [searchText, setSearchText] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])
  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerLeft: () => (
  //         <View style={styles.imgCon}>
  //           <Image
  //             style={styles.img}
  //             resizeMode="contain"
  //             source={require('../../../assets/logo.png')}
  //           />
  //         </View>
  //       ),
  //       headerStyle: head,
  //       headerTitle: props => 
  //       {
  //         return(
  //          <View>
  //           <View style={styles.textCon}>
  //             <TouchableOpacity 
  //             onPress={()=> navigation.navigate('hostevents')}
  //             style={{
  //               backgroundColor:colors.themeblue,
  //               height:responsiveScreenFontSize(5),
  //               width:responsiveScreenFontSize(10),
  //               justifyContent:'center',alignItems:'center', flexDirection:'row', alignItems:'center',borderRadius:responsiveScreenFontSize(1)
  //             }}>
  //                <CrossIcon
  //                   name="user"
  //                   size={responsiveFontSize(tablet ? 1.25 : 2)}
  //                   color={'white'}
  //                 />
  //               <Text style={{
  //                 color:'white'
  //               }}>{'  '}HOST</Text>
  //             </TouchableOpacity>
  //             {/* <SearchIcon
  //               style={styles.searchIcon}
  //               name="search"
  //               color="#bdbdbd"
  //               size={responsiveFontSize(tablet ? 1.25 : 2)}
  //             />
  //             <TextInput
  //               // onFocus={() => setDrop(true)}
  //               value={searchText}
  //               onChangeText={v => setSearchText(v)}
  //               placeholder="Search"
  //               style={{
  //                 flex: 1,
  //                 paddingVertical: 0,
  //                 color: 'grey',
  //                 fontSize: responsiveFontSize(tablet ? 0.8 : 1.6),
  //               }}
  //             />
  //             {searchText ? (
  //               <TouchableOpacity
  //                 onPress={() => {
  //                   setSearchText('');
  //                   // setDrop(false);
  //                   Keyboard.dismiss();
  //                 }}>
  //                 <CrossIcon
  //                   name="cross"
  //                   size={responsiveFontSize(tablet ? 1.25 : 3)}
  //                 />
  //               </TouchableOpacity>
  //             ) : null} */}
  //           </View>
  //         </View>
  //       )},
  //     });
  //   }, [navigation, searchText]);

  return (
    <Stack.Navigator
      initialRouteName="liveEvents"
      screenOptions={{ animation: 'none' }}>
      <Stack.Screen
        name="liveEvents"
        component={LiveEvents}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="hostevents"
        component={Events}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="livecycle"
          options={{ headerShown: false }}
        >
          {props => <LiveCycle {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="liveeventcycle"
          options={{ headerShown: false }}
        >
          {props => <LiveEventCycle {...props} />}
        </Stack.Screen>
      <Stack.Screen
        name="bioShaap"
        options={{ headerShown: false }}

      >
        {props => <BioShopScreen {...props} setIsBio={setIsBio} />}
      </Stack.Screen>
      <Stack.Screen name="controlRoom">
        {props => <ControlRoom {...props} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  con: {
    width: responsiveWidth(92),
    alignSelf: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(1),
    width: responsiveWidth(91),
    alignSelf: 'center',
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: 'rgb(7, 13, 46)',
    fontWeight: 'bold'
  },
  headCon: {
    // paddingHorizontal: responsiveFontSize(2),
    marginTop: responsiveFontSize(1),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: '#e3e3e3',
    // borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(
      Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
    ),
    // borderRadius: responsiveFontSize(5),
    // backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
    justifyContent: 'flex-end'
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
})