import { StyleSheet, Text, View } from 'react-native'
import Login from "../screens/auth/login"
import SignUp from "../screens/auth/signup"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AuthTabs from '../screens/auth/signup/AuthTabs';
import ForgetPassword from '../screens/auth/forget'

const Stack = createNativeStackNavigator();
export default function AuthScreens(navigation) {
  return (
    <>
      <Stack.Screen name="auth">
        {props => {
          return <AuthTabs {...props} />
        }}
      </Stack.Screen>
      {/* <Stack.Screen name="login">
        {props => {
          if (navigation) {
            return <Login {...props} navigation={navigation} />
          } else {
            return <Login {...props} />
          }
        }}
      </Stack.Screen> */}

      {/* <Stack.Screen name="signup">
        {props => {
          if (navigation) {
            return <SignUp {...props} navigation={navigation} />
          } else {
            return <SignUp {...props} />
          }
        }}
      </Stack.Screen> */}
      {/* remove from this */}
      <Stack.Screen name="forgetpassword">
        {props => {
          return <ForgetPassword {...props} />
        }}
      </Stack.Screen>
      {/* to this and comment below tag*/}
    </>
  );
}

const styles = StyleSheet.create({})