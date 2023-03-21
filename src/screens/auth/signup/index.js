// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as authAct from '../../../store/actions/authAct';
import BasicDetail from './BasicDetail';
import CountryDetail from './CountryDetail';
import PasswordDetail from './PasswordDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Platform,KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

const Signup = ({signUp,navigation}) => {
  const [userData, setUserData] = useState({
    nickName:'',
    firstName: '',
    lastName:'',
    userName: '',
    email: '',
    gender: '',
    selectedCountry: 'US',
    selectedState: '',
    selectedCity: '',
    password: '',
    confirmPassword: '',
    device:Platform.OS,
    // zipCode: '',
    // referredBy: '',
  });
  const getValue = (k, v) => {
    setUserData({...userData, [k]: v});
  };

  // const onSignUp = (apiCall,setIsModal,setResponseMsg) => {
  //   apiCall(true);
  //   signUp(userData, (res_msg) => {
  //     apiCall(false);
  //     setResponseMsg(res_msg);
  //   }).then(()=>setIsModal(true));
  // };

 
  const onSignUp = (apiCall) => {
    // console.log(userData, "userDatauserDatauserData")
    apiCall(true);
    // alert("AS")
    signUp(userData, () => apiCall(false))
  };
  // name: data?.firstName + " " + data.lastName,
  // nick_name: data.nickName,
  // first_name: data.firstName,
  // last_name: data.lastName,
  // email: data.email,
  // zip: data.zipCode,
  // gender: data.gender,
  // country: data.country,
  // state: data.state,
  // city: data.city,
  // password: data.password,
  // device: "web",
  // coming_from_app: false,
  // brand: process.env.REACT_APP_BRAND_ID
  // useEffect(()=>{
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setUserData({email:"",password:"",userName:"",confirmPassword:""})
  //     setIsSubmit(false)
  //     dispatch({type:"clearAuth"})
  //   });

  //   return unsubscribe;
  // },[navigation])

  return (
    // <KeyboardAvoidingView
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    // style={{flex:1, backgroundColor:'white',}}
    // >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen name="auth_basic_detail">
          {props => (
            <BasicDetail {...props} userData={userData} getValue={getValue} onSignUp={onSignUp}   setUserData={setUserData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="auth_country_detail">
          {props => (
            <CountryDetail
              {...props}
              userData={userData}
              getValue={getValue}
              setUserData={setUserData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="auth_password_detail">
          {props => (
            <PasswordDetail
              {...props}
              userData={userData}
              getValue={getValue}
              onSignUp={onSignUp}
              setUserData={setUserData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    // {/* </KeyboardAvoidingView> */}
  );
};

export default connect(null, authAct)(Signup);
