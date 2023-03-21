// @ts-nocheck
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
  Platform, ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../assets/colors/colors';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as favAction from '../../store/actions/favouriteAct';
import * as myListAct from '../../store/actions/myListAct';
import { useIsFocused } from '@react-navigation/native';
import CrossIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/Feather';
import HomeMenu from './Menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavList from './FavList';
import BioShop from '../home/bioshop/BioShop';
import SpareList from './SpareList';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()
const { width } = Dimensions.get('window');
const head = {};

if (width > 550) head.height = 80;
const Stack = createNativeStackNavigator();

const Favourite = ({
  favouriteRed,
  getFavourites,
  deleteFavourite,
  navigation,
  reset2,
  setReset2,
  getMyList
}) => {
  const [searchText, setSearchText] = useState(null);
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
              onChangeText={v => {
                if (!v) Keyboard.dismiss();
                setSearchText(v);
              }}
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
      headerShown: true,
    });
  }, [navigation, searchText]);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isShowDelModal, setIsShowDelModal] = useState(false);
  const [selectedFavItem, setSelectedFavItem] = useState({});
  const [active, setActive] = useState(1);
  const [routeName, setRouteName] = useState('favs');
  const [isBio, setIsBio] = useState(false)


  useEffect(() => {
    // if (isFocused) {
    setIsLoading(true);
    getFavourites('').then(() => setIsLoading(false));
    setSelectedFilter('');
    setActive(0);
    if (routeName != 'favs') navigation.navigate('favs');
    // }
  }, [reset2]);

  useEffect(() => {
    if (searchText != null) {
      setIsLoading(true);
      getFavourites(selectedFilter, searchText).then(() => setIsLoading(false));
    }
  }, [searchText]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setActive(1);
      setSelectedFilter('brand');
    });

    return unsubscribe;
  }, [navigation]);
  return (

    // <TouchableWithoutFeedback onPress={() => setIsOpenDrpdwn(false)}>

      <View onPress={() => console.log('first')} style={{ flex: 1, backgroundColor:'white' }}>
        {!isBio && (
          <HomeMenu
            active={active}
            setActive={value => {
              if (value == 1) {
                navigation.navigate('favs')
                setSelectedFilter('brand');
                setActive(1);
                setIsLoading(true);
                getFavourites('brand').then(() => setIsLoading(false));
              } else if (value == 2) {
                navigation.navigate('favs')
                setSelectedFilter('influencer');
                setActive(2);
                setIsLoading(true);
                getFavourites('influencer').then(() => setIsLoading(false));
              } else {
                navigation.navigate('favs')
                setSelectedFilter('spare');
                setActive(3);
                setIsLoading(true);
                getMyList(1).then(() => setIsLoading(false));
              }
            }}
          />
        )}
        <Stack.Navigator
          screenOptions={{ animation: 'none' }}
          screenListeners={nav => setRouteName(nav.route.name)}>
          <Stack.Screen name="favs" options={{ headerShown: false }}>
            {props => {
              return selectedFilter !== 'spare' ? (
                <FavList
                  {...props}
                  isLoading={isLoading}
                  favouriteRed={favouriteRed}
                  isShowDelModal={isShowDelModal}
                  setIsShowDelModal={setIsShowDelModal}
                  selectedFavItem={selectedFavItem}
                  deleteFavourite={deleteFavourite}
                  getFavourites={getFavourites}
                  setIsLoading={setIsLoading}
                  setSelectedFavItem={setSelectedFavItem}
                  selectedFilter={selectedFilter}
                />
              ) : (
                <SpareList isLoading={isLoading} setIsLoading={setIsLoading} />
              );
            }}
          </Stack.Screen>
          <Stack.Screen
            name="bioshop"
            options={{ headerShown: false }}
          >
            {props => <BioShop {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
        </Stack.Navigator>
      
      </View>
   
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  favItemCont: {
    // borderWidth: 1,
    // borderColor: colors.silver,
    // marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(0.5),
    // borderRadius: responsiveFontSize(1),
    height: responsiveHeight(8),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textCont: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: responsiveFontSize(5),
    height: responsiveFontSize(5),
    borderRadius: responsiveFontSize(5) / 2,
  },
  text: {
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(2),
  },
  textCon2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    borderRadius: responsiveFontSize(5),
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
});

const mapStateToProps = ({ favouriteRed }) => {
  return { favouriteRed };
};

export default connect(mapStateToProps, { ...favAction, ...myListAct })(Favourite);
