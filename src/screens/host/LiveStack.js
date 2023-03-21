// @ts-nocheck
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
// import AuthScreens from './AuthScreen';
import {connect} from 'react-redux';
import Events from './../host/index'
import ControlRoom from './../host/ControlRoom';

// import FavouriteRoutes from './FavouriteRoutes';

const Stack = createNativeStackNavigator();

function LiveStack({navigation, authRed}) {
  return (
    <Stack.Navigator initialRouteName='live' screenOptions={{headerShown: false}}>
      <Stack.Screen name="live">
        {props => <Events {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="controlRooms">
        {props => <ControlRoom {...props} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function mapStateToProps({authRed}) {
  return {authRed};
}

export default connect(mapStateToProps)(LiveStack);

const styles = StyleSheet.create({});
