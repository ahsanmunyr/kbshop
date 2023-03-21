// @ts-nocheck
import React, {useRef, useState} from 'react';
import InputField from '../../../components/InputField';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Btn from '../../../components/Btn';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import PassIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from '../Header';
import {connect, useDispatch} from 'react-redux';
import deviceInfo from 'react-native-device-info';
// import SuccessModal from '../../../components/succesModal';

const tablet = deviceInfo.isTablet();

const PasswordDetail = ({
  userData,
  getValue,
  onSignUp,
  authRed,
  setUserData,
}) => {
  const passwordRef = useRef();
  const [isShowPass, setisShowPass] = useState(false);
  const [isShowCPass, setisShowCPass] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [passErr, setPassErr] = useState('');
  // const [isSignUpSuccessModal, setIsSignUpSuccessModal] = useState(false);
  // const [responseMsg, setResponseMsg] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onFinish = () => {
    setIsSubmit(true);
    if (!userData.password || userData.password !== userData.confirmPassword) {
      // console.log("Password and confirm password doesn't match.");
      setPassErr("Password and confirm password doesn't match.");
    } else {
      // onSignUp(setIsApiCall, setIsSignUpSuccessModal, setResponseMsg);
      onSignUp(setIsApiCall);
    }
  };

  return (
    <>
      <Header title="Sign Up" />
      <ScrollView
        contentContainerStyle={styles.containerScroll}
        showsVerticalScrollIndicator={false}
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
              inputType="password"
              error={!userData.password && isSubmit}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              getValue={v => getValue('password', v)}
              icon={() => {
                return (
                  <PassIcon
                    name="lock"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                  />
                );
              }}
              password={!isShowPass}
              placeHolder="Password"
              color="grey"
              value={userData.password}
              smallCaps={true}
              rightIcon={() => {
                if (isShowPass) {
                  return (
                    <EyeIcon
                      name="eye"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                    />
                  );
                } else {
                  return (
                    <EyeIcon
                      name="eye-with-line"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.5 : 2.2)}
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
                    size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                  />
                );
              }}
              password={!isShowCPass}
              placeHolder="Confirm Password"
              color="grey"
              smallCaps={true}
              value={userData.confirmPassword}
              rightIcon={() => {
                if (isShowCPass) {
                  return (
                    <EyeIcon
                      name="eye"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                    />
                  );
                } else {
                  return (
                    <EyeIcon
                      name="eye-with-line"
                      color={colors.themeblue}
                      size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                    />
                  );
                }
              }}
              onPressRghtIcon={() => setisShowCPass(prev => !prev)}
            />

            {/* <InputField
              getValue={v => getValue('zipCode', v)}
              value={userData.zipCode}
              icon={() => {
                return (
                  <LocationIcon
                    name="location"
                    color={colors.themeblue}
                    size={20}
                  />
                );
              }}
              password={false}
              placeHolder="Zipcode - Optional"
              color="grey"
            /> */}
            {/* <InputField
              getValue={v => getValue('referredBy', v)}
              value={userData.referredBy}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={20}
                  />
                );
              }}
              password={false}
              placeHolder="Referred By - Optional"
              color="grey"
            /> */}
          </View>
          {/* {console.log(authRed?.message,"TTTTTTTTTTTTTTTTTTTTT")} */}
          {authRed?.message && (
            <Text style={{color: colors.errorRed}}>{authRed?.message}</Text>
          )}
          {passErr !== '' && (
            <Text style={{color: colors.errorRed}}>{passErr}</Text>
          )}
          <View style={styles.btnCont}>
            <Btn
              text="Previous"
              call={() => {
                setUserData({
                  ...userData,
                  password: '',
                  confirmPassword: '',
                });
                dispatch({type: 'clearAuth'});
                navigation.goBack();
              }}
              pS={{width: responsiveWidth(40)}}
            />
            <Btn
              text="Finish"
              call={() => {
                dispatch({type: 'clearAuth'});
                setPassErr('');
                onFinish();
              }}
              pS={{width: responsiveWidth(40)}}
              loader={isApiCall}
            />
          </View>
        </View>
      </ScrollView>
      {/* <SuccessModal
        visible={isSignUpSuccessModal}
        closeModle={() => setIsSignUpSuccessModal(false)}
        title={responseMsg}
        reDirect={() => {
          navigation.navigate('auth_basic_detail');
          navigation.navigate('sign_in');
          setUserData({
            ...userData,
            userName: '',
            email: '',
            gender: '',
            selectedCountry: 'US',
            selectedState: '',
            selectedCity: '',
            password: '',
            confirmPassword: '',
          });
        }}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(70),
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
    fontSize: responsiveFontSize(1.9),
    color: 'black',
  },
  dropCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(1),
  },
  imgCont: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(4),
    alignSelf: 'center',
  },
});

const mapStateToProps = ({authRed}) => {
  return {authRed};
};

export default connect(mapStateToProps, null)(PasswordDetail);
