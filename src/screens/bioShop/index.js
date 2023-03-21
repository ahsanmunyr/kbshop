import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchIcon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import BioMenu from './BioMenu';
import MyPost from './mypost/MyPost';
import BioShopScreen from './bioshop/BioShopScreen';
import MarketPlaceScreen from './Market/MarketPlaceScreen';
import Instagram from './instagram';
import Earning from './Earning/Index';
import CrossIcon from 'react-native-vector-icons/Entypo';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();
const {width} = Dimensions.get('window');
const head = {};

if (width > 550) head.height = 80;
const Stack = createNativeStackNavigator();

function Index({navigation, reset3}) {
  const [searchText, setSearchText] = useState();

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
                fontSize: responsiveFontSize(tablet ? 0.8 : 1.6),
              }}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  // setDrop(false)
                  Keyboard.dismiss();
                }}>
                <CrossIcon
                  name="cross"
                  size={responsiveFontSize(tablet ? 1.25 : 3)}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ),
      headerShown: true,
    });
  }, [navigation, searchText]);

  useEffect(() => {
    setActive(2);
    navigation.reset({
      index: 0,
      routes: [{name: 'bioshop'}],
    });
  }, [reset3]);

  const [active, setActive] = useState(0);

  return (
    <View style={{flex: 1}}>
      <BioMenu active={active} setActive={setActive} />
      <Stack.Navigator screenOptions={{animation: 'none'}}>
        <Stack.Screen
          name="bioshop"
          component={BioShopScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="marketPlace"
          options={{headerShown: false}}
          component={Earning}
        />
        <Stack.Screen
          name="myPost"
          options={{headerShown: false}}
          component={Instagram}
        />
      </Stack.Navigator>
    </View>
  );
}

function mapStateToProps({categories}) {
  return {categories};
}

export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
  img1: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
  textCon2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(
      Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
    ),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
  },
});
