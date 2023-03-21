import { StyleSheet, Text, View } from 'react-native'
// import Favourite from "../../src/screens/favorite"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AuthScreens from './AuthScreen';
import { connect } from 'react-redux';
const Stack = createNativeStackNavigator();

function FavouriteRoutes({navigation,authRed,setReset2,reset2}) {
    return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        {!authRed.success?AuthScreens(navigation):(
          <Stack.Screen name='favourite'>
            {props=><Favourite {...props} navigation={navigation} reset2={reset2} setReset2={setReset2}/>}
            </Stack.Screen>
        )}
      </Stack.Navigator>
    )
  }

  function mapStateToProps({authRed}){
    return{authRed}
  }

  export default connect(mapStateToProps)(FavouriteRoutes)

const styles = StyleSheet.create({})