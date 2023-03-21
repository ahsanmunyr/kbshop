import { StyleSheet } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as authAct from "../store/actions/authAct"
import Loader from '../components/Loader';
import Tabs from './Tabs';
const MyTheme = {
  dark:false,
  colors: {
    ...DefaultTheme.colors,
    // card:'#a2a725',
    // background:'white',
  }
};
//   const darkTheme = {
//     ...DarkTheme,
//     colors: {
//       ...DarkTheme.colors,
//       card:'#a2a725',
//       background:'#404040',
//       text:'#ffffff'
//     }
//   };

  function Routes({logOut,setUser}) {


  const [loading,setLoading]=useState(true)
  
  function showMessage(){
    alert("Session Expire")
  }

  useEffect(()=>{
    setUser(logOut, () => setLoading(false),showMessage)
  },[])

  return (
    <NavigationContainer 
    linking={{
      prefixes: ['konnect.bio://','https://konnect.bio/'],
      config:{
        screens:{
          Home:{
            screens:{
              viewBioshop:'/:shopName',
            }
          }
        }
      }
    }}
 
    theme={MyTheme}>
      {!loading?<Tabs/>:<Loader/>}
    </NavigationContainer>
  );

}

function mapStateToProps({}){
  return {}
}

export default connect(mapStateToProps,{...authAct})(Routes)

const styles = StyleSheet.create({});