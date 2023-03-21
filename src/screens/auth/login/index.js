// @ts-nocheck
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import InputField from '../../../components/InputField';
import MailIcon from 'react-native-vector-icons/Fontisto';
import PassIcon from 'react-native-vector-icons/Feather';
import EyeIcon from 'react-native-vector-icons/Entypo';
import Btn from '../../../components/Btn';
import colors from '../../../assets/colors/colors';
import { connect } from 'react-redux';
import * as authActions from '../../../store/actions/authAct';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const {width}=Dimensions.get('window')
const checkStyle={}

if(Platform.OS=="ios" && width<=550) {
  checkStyle.transform=[{scaleX:0.7},{scaleY:0.7}]
}

const Login = ({ navigation, login, authRed }, props) => {
  const password=useRef()
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [submit, setSubmit] = useState(false);
  const [isShowPass, setisShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(true)

  function getValue(k, v) {
    setFields(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  }

  function onLogin() {
    setSubmit(true);
    if (fields.password && fields.email) {
      setLoading(true);
      login(fields.password, fields.email,Platform.OS).then(() => {
        if(toggleCheckBox){
          AsyncStorage.setItem("cred", JSON.stringify(fields))
        }else{
          AsyncStorage.setItem("cred", "")
        }
        setLoading(false)
      });
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFields({ email: '', password: '' });
      AsyncStorage.getItem("cred").then((res)=>{
        if(res)setFields(JSON.parse(res))
      })
      setSubmit(false);
      dispatch({ type: 'clearAuth' });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex:1, backgroundColor:'white',}}
    >
      <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../../../assets/logo.png')}
      />
      <View style={styles.inputCont}>
        {/* <Text style={{color:colors.themeblue, fontSize:responsiveScreenFontSize(1.5)}}>Email</Text> */}
        <InputField
          error={!fields.email && submit}
          returnKeyType="next"
          onSubmitEditing={()=>{
            password.current.focus()
          }}
          getValue={v => getValue('email', v)}
          icon={() => {
            return <MailIcon name="email" color={colors.themeblue} size={responsiveFontSize(tablet?1.75:2.2)} />;
          }}
          password={false}
          value={fields.email}
          placeHolder="Email"
          smallCaps={true}
          color={colors.themeblue}
        />
        <InputField
          inputType="password"
          innerRef={password}
          error={!fields.password && submit}
          getValue={v => getValue('password', v)}
          icon={() => {
            return <PassIcon name="lock" color={colors.themeblue} size={responsiveFontSize(tablet?1.75:2.2)} />;
          }}
          password={!isShowPass}
          placeHolder="Password"
          smallCaps={true}
          color={colors.themeblue}
          value={fields.password}
          rightIcon={() => {
            if (isShowPass) {
              return <EyeIcon name="eye" color={colors.themeblue} size={responsiveFontSize(tablet?1.75:2.2)} />;
            } else {
              return (
                <EyeIcon
                  name="eye-with-line"
                  color={colors.themeblue}
                  size={responsiveFontSize(tablet?1.75:2.2)}
                />
              );
            }
          }}
          onPressRghtIcon={() => setisShowPass(prev => !prev)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,marginTop:responsiveHeight(tablet?2:1)}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              tintColors={{ true: colors.themeblue, false: 'gray' }}
              onFillColor={colors.themeblue}
              boxType="square"
              disabled={false}
              style={checkStyle}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{ marginLeft: responsiveFontSize(0.5),fontSize:responsiveFontSize(tablet?1.25:1.9) }}>Remember me</Text>
          </View>
          <TouchableOpacity style={{ width: responsiveWidth(tablet?30:30),justifyContent:'flex-end', alignItems:'flex-end' }} onPress={() => navigation.navigate('forgetpassword')}>
            <Text style={{ color: colors.themeblue,fontSize:responsiveFontSize(tablet?1.25:1.9) }}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      {authRed?.message ? (
        <Text style={{ color: 'red',fontSize:responsiveFontSize(tablet?2:1.9),maxWidth:'90%',alignSelf:'center',marginTop:responsiveFontSize(1)}}>{authRed.message}</Text>
      ) : null}
      <View style={styles.btnCont}>
        <Btn text="Login" call={() => onLogin()} loader={loading} />
        {/* <Btn
          text="Sign Up"
          call={() => {
            // navigation.navigate('signup');
            navigation.navigate('auth');
          }}
        /> */}
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(78),
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(4),
  },
  inputCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(10),
  },
  btnCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(6),
    height: responsiveHeight(12),
    justifyContent: 'space-between',
  },
});

function mapStateToProps({ authRed }) {
  return { authRed };
}

export default connect(mapStateToProps, authActions)(Login);
