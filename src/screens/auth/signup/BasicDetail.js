// @ts-nocheck
import { View, Text, StyleSheet, ScrollView, Image, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import InputField from '../../../components/InputField';
import colors from '../../../assets/colors/colors';
import MailIcon from 'react-native-vector-icons/Fontisto';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import PassIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Btn from '../../../components/Btn';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import DropDownComp from '../../../components/DropDownComp';
import { connect, useDispatch } from 'react-redux';
import validateEmail from '../../../utils/validateEmail';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()

const BasicDetail = ({ userData, getValue, setUserData, onSignUp }) => {
  const emailRef = useRef();
  const [gender, setGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);
  const passwordRef = useRef();
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowPass, setisShowPass] = useState(false);
  const [isShowCPass, setisShowCPass] = useState(false);
  const [passErr, setPassErr] = useState('');
  const [isApiCall, setIsApiCall] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const onFinish = () => {
    setIsSubmit(true);
    // onSignUp(setIsApiCall);
    if (!userData.nickName || !userData.firstName || !userData.lastName) {
      // console.log('Nick Name and gender is required');
      console.log('Name feilds are required');
      Toast.show({
        type: 'error',
        text1: 'Name feilds are required',
      });
    } else if (!validateEmail(userData.email)) {
      console.log('Kindly provide a valid email address');
      Toast.show({
        type: 'error',
        text1: 'Kindly provide a valid email address',
      });
    } 
    // else if (!userData.zipCode) {
    //   console.log('Zip Code is required');
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Zip Code is required',
    //   });
    // } 
    else if (!userData.password || userData.password !== userData.confirmPassword) {
      console.log("Password and confirm password doesn't match.");
      Toast.show({
        type: 'error',
        text1: "Password and confirm password doesn't match.",
      });
      // setPassErr("Password and confirm password doesn't match.");
    } else if (userData.password === userData.confirmPassword 
      // && userData.zipCode 
      && validateEmail(userData.email) && userData.nickName.length > 2 && userData.firstName.length > 2 && userData.lastName.length > 2) {
      // console.log("CALL API")
      setIsSubmit(false);
      onSignUp(setIsApiCall);
    } else {
      console.log("Something is wrong")
      Toast.show({
        type: 'error',
        text1: "Something went wrong",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      {/* <Header title="Sign Up" /> */}
      <ScrollView
        contentContainerStyle={styles.containerScroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ backgroundColor: 'white' }}
        keyboardShouldPersistTaps="always">
        <View style={styles.imgCont}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../../assets/logo.png')}
          />
        </View>
        <View style={styles.cont}>
          <View style={styles.inputCont}>
            {/* <Text style={styles.subHd}>Create An Account</Text> */}
            <InputField
              error={!userData.nickName && isSubmit}
              getValue={v => getValue('nickName', v)}
              value={userData.nickName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Nick Name"
              color={colors.themeblue}
            />
            <InputField
              error={!userData.firstName && isSubmit}
              getValue={v => getValue('firstName', v)}
              value={userData.firstName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.75: 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="First Name"
              color={colors.themeblue}
            />
            <InputField
              error={!userData.lastName && isSubmit}
              getValue={v => getValue('lastName', v)}
              value={userData.lastName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Last Name"
              color={colors.themeblue}
            />
            <InputField
              error={!validateEmail(userData.email) && isSubmit}
              getValue={v => getValue('email', v)}
              innerRef={emailRef}
              value={userData.email}
              icon={() => {
                return (
                  <MailIcon name="email" color={colors.themeblue} size={responsiveFontSize(tablet ? 1.75: 2.2)} />
                );
              }}
              smallCaps={true}
              password={false}
              placeHolder="Email"
              color={colors.themeblue}
            />
            {/* <InputField
              error={!userData.zipCode && isSubmit}
              getValue={v => getValue('zipCode', v)}
              value={userData.zipCode}
              returnKeyType="next"
              keyboardType={'number'}
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <EyeIcon
                    name="address"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 2.1 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Zip code"
              color={colors.themeblue}
            /> */}
            <InputField
              inputType="password"
              error={!userData.password && isSubmit}
              returnKeyType="next"

              getValue={v => getValue('password', v)}
              icon={() => {
                return (
                  <PassIcon
                    name="lock"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ?1.75: 2.2)}
                  />
                );
              }}
              password={!isShowPass}
              placeHolder="Password"
              color={colors.themeblue}
              value={userData.password}
              smallCaps={true}
              rightIcon={() => {
                if (isShowPass) {
                  return (
                    <EyeIcon
                      name="eye"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                    />
                  );
                } else {
                  return (
                    <EyeIcon
                      name="eye-with-line"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                    />
                  );
                }
              }}
              onPressRghtIcon={() => setisShowPass(prev => !prev)}
            />
            <InputField
              inputType="password"
              error={!userData.confirmPassword && isSubmit}
              getValue={v => getValue('confirmPassword', v)}
              innerRef={passwordRef}
              icon={() => {
                return (
                  <PassIcon
                    name="lock"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                  />
                );
              }}
              password={!isShowCPass}
              placeHolder="Confirm Password"
              color={colors.themeblue}
              smallCaps={true}
              value={userData.confirmPassword}
              rightIcon={() => {
                if (isShowCPass) {
                  return (
                    <EyeIcon
                      name="eye"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.75 : 2.2)}
                    />
                  );
                } else {
                  return (
                    <EyeIcon
                      name="eye-with-line"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.75: 2.2)}
                    />
                  );
                }
              }}
              onPressRghtIcon={() => setisShowCPass(prev => !prev)}
            />
          </View>
          <View style={{ ...styles.btnCont, zIndex: (isOpenDrpdwn && Platform.OS == "ios") ? -5 : 1 }}>
            <Btn text="Register"
              loader={isApiCall}
              call={
                () => {
                  // onNext()
                  onFinish();
                  dispatch({ type: 'clearAuth' });
                  setPassErr('');
                }
              } />
          </View>
        </View>
        {/* <View style={{height:responsiveScreenFontSize(15),  backgroundColor:'red'}} /> */}
      </ScrollView>
      {/* <View style={{height:responsiveScreenFontSize(15),  backgroundColor:'red'}} /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(100),
  },
  cont: {
    alignItems: 'center',
  },
  btnCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
    height: responsiveHeight(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(5),
  },
  subHd: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
  },
  // dropCont: {
  //   width: responsiveWidth(90),
  // },
  imgCont: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:responsiveScreenFontSize(1),
    // position: 'absolute',
    // top: 0,
    // backgroundColor:"red"
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(4),
    alignSelf: 'center',
  },
});

export default connect(null, null)(BasicDetail);
