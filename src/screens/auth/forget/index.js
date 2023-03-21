import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import InputField from '../../../components/InputField';
import MailIcon from 'react-native-vector-icons/Fontisto';
import Btn from '../../../components/Btn';
import colors from '../../../assets/colors/colors';
import {connect} from 'react-redux';
import * as authActions from '../../../store/actions/authAct';
import Header from '../Header';
import SuccessModal from '../../../components/succesModal';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()
const ForgetPassword = ({navigation, forget_password}) => {
  const [email, setEmail] = useState('');
  const [isApiCall, setIsApiCall] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [model, setModel] = useState(false);
  const [data, setData] = useState({});

  const _onSubmit = () => {
    setIsSubmit(true);
    if (email === '') {
      console.log('Email is required');
    } else {
      setIsApiCall(true);
      setData({});
      forget_password(email).then(res => {
        res.success ? setModel(true) : null;
        setData(res);
        setIsApiCall(false);
      });
    }
  };

  return (
    <>
      <Header title="Forget Password" />
      <View style={styles.container}>
        {data.success ? (
          <SuccessModal
            title={data.message}
            visible={model}
            closeModle={() => setModel(false)}
            reDirect={() => navigation.goBack()}
          />
        ) : null}
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 10, left: 10}}>
          <BackIcon name="chevron-back" color={colors.themeblue} size={30} />
        </TouchableOpacity> */}
        {/* <View> */}
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../../assets/logo.png')}
        />
        {/* </View> */}
        <View style={styles.inputCont}>
          <InputField
            error={!email && isSubmit}
            getValue={v => setEmail(v)}
            icon={() => {
              return (
                <MailIcon name="email" color={colors.themeblue} size={responsiveFontSize(tablet?2.1:2.2)} />
              );
            }}
            password={false}
            placeHolder="Email"
            color="grey"
          />
        </View>
        {data.success == false ? (
          <View>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: 'red',
                width: '100%',
                textAlign: 'center',
              }}>
              {data.message}
            </Text>
          </View>
        ) : null}
        <View style={styles.btnCont}>
          <Btn text="Submit" call={() => _onSubmit()} loader={isApiCall} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(4),
  },
  inputCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(8),
  },
  btnCont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(8),
    height: responsiveHeight(12),
    justifyContent: 'space-between',
  },
  hd: {
    fontSize: responsiveFontSize(4),
    color: colors.themeblue,
  },
});

export default connect(null, authActions)(ForgetPassword);
