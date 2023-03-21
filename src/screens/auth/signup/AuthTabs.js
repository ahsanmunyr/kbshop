// @ts-nocheck
import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from '../../../assets/colors/colors';
import signup from '.';
import login from '../login';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfoModule from 'react-native-device-info';
const tablet = deviceInfoModule.isTablet();

const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => {
  //   const route = useRoute();
  const [authRouteName, setAuthRouteName] = useState('Welcome Back');

  return (
    <>
      {/* <View style={styles.topLogoCont}>
        <Text style={styles.hd}>{authRouteName}</Text> */}
        {/* <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../../assets/logo.png')}
        /> */}
      {/* </View> */}
      <Tab.Navigator
        initialRouteName="sign_in"
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colors.themeblue,
          tabBarBounces: true,
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {fontSize: responsiveFontSize(tablet?1.25:2.1),textTransform:"capitalize", fontWeight:'500'},
          lazyLoad: true,
          tabBarPressColor: colors.bgDefault,
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.themeblue,
          },
        }}>
        <Tab.Screen
          name="sign_in"
          component={login}
          options={{tabBarLabel: 'Login'}}
          // listeners={{
          //   tabPress: e => {
          //     if (e.target.includes('sign_in')) {
          //       setAuthRouteName('Welcome Back');
          //     }
          //   },
          //   state: e => {
          //     if (e.data.state.index === 0) {
          //       setAuthRouteName('Welcome Back');
          //     }
          //   },
          // }}
        />
        <Tab.Screen
          name="sign_up"
          component={signup}
          options={{tabBarLabel: 'Sign Up'}}
          listeners={{
            tabPress: e => {
              if (e.target.includes('sign_up')) {
                setAuthRouteName('Create An Account');
              }
            },
            state: (e) => {
              // Do something with the state
              if (e.data.state.index === 1) {
                setAuthRouteName('Create An Account');
              }
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor:'white'
  },
  hd: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: colors.themeblue,
  },
  topLogoCont: {
    paddingVertical: responsiveHeight(2),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(4),
    marginTop: responsiveHeight(1.5),
  },
});

export default AuthTabs;
