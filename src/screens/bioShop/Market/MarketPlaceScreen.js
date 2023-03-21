import {View, Text, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Category from '../bioshop/Category';
import * as actions from '../../../store/actions/market';
import {connect} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Active from './Active';
import Brand from './Brand';
import Categoryy from './Category';
import Earning from './Earning';
import Expired from './Expired';
import New from './New';
import Paused from './Paused';
import Transactions from './Transactions';
import {useDispatch} from 'react-redux';
const Stack = createNativeStackNavigator();
const categories = [
  {name: 'Category', id: 1},
  {name: 'Brand', id: 2},
  {name: 'New Campaign', id: 3},
  {name: 'Active Campaign', id: 4},
  {name: 'Paused Campaign', id: 5},
  {name: 'Expired Campaign', id: 6},
  {name: 'Earning', id: 7},
  {name: 'Transactions', id: 8},
];

import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
// import CategorySetup from '../../../components/CategorySetup';

const MarketPlaceScreen = ({categoryType, navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => null;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({type: 'resetMarketTabs'});
    });

    return unsubscribe;
  }, [navigation]);

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const headerOption = {
    headerTitle: props => (
      <View style={{}}>
        <Text style={{fontSize: 20}}>{props.children}</Text>
      </View>
    ),
    transitionSpec: {
      open: config,
      close: config,
    },
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: '#efefef',
    },
    headerLeft: () => null,
    headerBackVisible: false,
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <View
        style={{
          height: responsiveHeight(8),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderBottomColor: colors.silver,
          borderBottomWidth: 1,
        }}>
        <FlatList
          horizontal
          decelerationRate={0.5}
          style={{}}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({item, index}) => (
            <Category
              Name={item.name}
              ID={item.id}
              Selected={categoryType.type}
              Navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          height: responsiveHeight(80),
          width: responsiveWidth(100),
          flex: 1,
        }}>
        <Stack.Navigator
          initialRouteName={'Category'}
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}>
          {/* <Stack.Screen options={headerOption} name="Category">
            {props => (
              <CategorySetup
                {...props}
                back={'none'}
                header={'none'}
                navigation={navigation}
              />
            )}
          </Stack.Screen> */}
          <Stack.Screen
            options={headerOption}
            name="Active Campaign"
            component={Active}
          />
          <Stack.Screen options={headerOption} name="Brand" component={Brand} />
          <Stack.Screen
            options={headerOption}
            name="Earning"
            component={Earning}
          />
          <Stack.Screen
            options={headerOption}
            name="Expired Campaign"
            component={Expired}
          />
          <Stack.Screen
            options={headerOption}
            name="New Campaign"
            component={New}
          />
          <Stack.Screen
            options={headerOption}
            name="Paused Campaign"
            component={Paused}
          />
          <Stack.Screen
            options={headerOption}
            name="Transactions"
            component={Transactions}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

function mapStateToProps({categoryType}) {
  return {
    categoryType,
  };
}

export default connect(mapStateToProps, actions)(MarketPlaceScreen);
