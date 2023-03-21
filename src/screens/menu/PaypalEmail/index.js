import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,BackHandler
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import InputField from '../../../components/InputField';
import Btn from '../../../components/Btn';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';
import {connect} from 'react-redux';
import * as authAct from '../../../store/actions/authAct';
import Toast from 'react-native-toast-message';
import deviceInfo from "react-native-device-info"
import ExitModal from '../../../components/ExitModal';

const tablet=deviceInfo.isTablet()
const {width} = Dimensions.get('window');

const index = ({navigation, back, updatePaypalEmail, refreshAuth, authRed}) => {
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isShowExitModal, setIsShowExitModal] = useState(false);
  const {data} = authRed;

  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  useEffect(() => {
    if (data.hasOwnProperty('paypal_email')) {
      setPaypalEmail(data?.paypal_email);
    }
  }, []);
  const onSaveBtn = () => {
    if (!paypalEmail) {
      console.log('email is req');
    } else {
      setIsApiCall(true);
      updatePaypalEmail(paypalEmail).then(async() => {
        refreshAuth()
        setIsApiCall(false);
        Toast.show({
          type:"success",
          text1:"Successfully Saved"
        })
      });
    }
  };



  const onBack= ()=>{
    console.log(data?.paypal_email,"OOOOOOOOOOOOOO")
    if (data.hasOwnProperty('paypal_email')) {
      if(data?.paypal_email === paypalEmail){
        navigation.navigate('menu')
      }else{
        setIsShowExitModal(true)
        return true
      } 
    }else{
      navigation.navigate('menu')
    }
  }

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBack
    );

    return () => backHandler.remove();
},[paypalEmail,data,navigation, isShowExitModal])

  return (
    <View style={styles.container}>
      <ExitModal visible={isShowExitModal} closeModle={() => setIsShowExitModal(false)} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {back == 'none' ? (
          <View style={{width: '20%'}} />
        ) : (
          <TouchableOpacity
            style={{width: '20%', paddingLeft: responsiveFontSize(1)}}
            onPress={() =>  onBack()}>
            <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} color={colors.themeblue}/>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: colors.themeblue,
            fontWeight: 'bold',
            fontSize: responsiveFontSize(tablet?1.25:2.2),
            padding: responsiveFontSize(2),
            textAlign: 'center',
            width: '60%',
          }}>
          Paypal Email
        </Text>
        <View style={{width: '20%'}} />
      </View>
      <InputField
        error={!paypalEmail && isSubmit}
        getValue={v => setPaypalEmail(v)}
        value={paypalEmail}
        placeHolder="Enter Paypal Email"
        color="grey"
        passedStyle={{paddingLeft: width * 0.03}}
      />
      <View style={styles.btnContainer}>
        <Btn
          pS={{marginVertical: responsiveHeight(1),width:"48.5%"}}
          text={'Save'}
          loader={isApiCall}
          call={() => {
            setIsSubmit(true);
            onSaveBtn();
          }}
        />
        <Btn
          pS={{marginVertical: responsiveHeight(1),width:"48.5%"}}
          text={'Exit'}
          disabled={isApiCall}
          call={() => {
            onBack()
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({authRed}) => {
  return {authRed};
};

export default connect(mapStateToProps, authAct)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal: '2%'
  },
  btnContainer:{
    // backgroundColor:"red",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  }
});
