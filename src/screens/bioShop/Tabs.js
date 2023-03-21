import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BioShopScreen from './BioShopScreen';
import MyPost from './MyPost';
import MarketPlaceScreen from './MarketPlaceScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Market Place"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarBounces: true,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {fontSize: 12},
        lazyLoad: true,
        tabBarPressColor:'white'
      }}>
      <Tab.Screen name="BioShop" component={BioShopScreen} />
      <Tab.Screen name="My Posts" component={MyPost} />
      <Tab.Screen name="Market Place"  component={MarketPlaceScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
