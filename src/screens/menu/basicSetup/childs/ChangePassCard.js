import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Cards from './Card';
import Btn from '../../../../components/Btn';
import InputField from '../../../../components/InputField';
import colors from '../../../../assets/colors/colors';
import PassIcon from 'react-native-vector-icons/Feather';
import EyeIcon from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/changePassword';
import Header from '../../../auth/Header';
import deviceInfo from 'react-native-device-info';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ExitModal from '../../../../components/ExitModal';
import Toast from 'react-native-toast-message';
const tablet = deviceInfo.isTablet();

const {width} = Dimensions.get('window');

const ChangePassCard = ({passwordChange, authRed}) => {
  const [isShowPass, setisShowPass] = useState(false);
  const [isShowNewPass, setIsShowNewPass] = useState(false);
  const [isShowCnfrmPass, setIsShowCnfrmPass] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isShowExitModal, setIsShowExitModal] = useState(false);
  const [changePasswordDetail, setChangePasswordDetail] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });
  const navigation = useNavigation();

  const getPassDetailValue = (k, v) => {
    setChangePasswordDetail(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  };
  const onSavePassword = () => {
    setIsSubmit(true);
    if (!changePasswordDetail.oldPass || !changePasswordDetail.newPass) {
      console.log('All fields required');
    } else if (
      changePasswordDetail.newPass !== changePasswordDetail.confirmPass
    ) {
      alert("New Password and confirm password doesn't match.");
    } else {
      setIsApiCall(true);
      if (changePasswordDetail.oldPass === changePasswordDetail.newPass) {
        Toast.show({
          type: 'error',
          text1:
            'Your new password cannot be the same as your current password',
        });
        setIsApiCall(false);
        setisShowPass(false);
        setIsShowNewPass(false);
        setIsShowCnfrmPass(false);
        setIsSubmit(false);
        setChangePasswordDetail({
          oldPass: '',
          newPass: '',
          confirmPass: '',
        });
      } else {
        passwordChange(
          authRed.data._id,
          changePasswordDetail.oldPass,
          changePasswordDetail.newPass,
        )
          .then(res => {
            setIsApiCall(false);
            setisShowPass(false);
            setIsShowNewPass(false);
            setIsShowCnfrmPass(false);
            setIsSubmit(false);
            setChangePasswordDetail({
              oldPass: '',
              newPass: '',
              confirmPass: '',
            });
            // navigation.goBack()
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack,
    );

    return () => backHandler.remove();
  }, [changePasswordDetail, navigation, isShowExitModal]);

  const onBack = () => {
    if (
      !changePasswordDetail.oldPass &&
      !changePasswordDetail.newPass &&
      !changePasswordDetail.confirmPass
    ) {
      navigation.goBack();
    } else {
      setIsShowExitModal(true);
      return true;
    }
  };

  return (
    <>
      {/* <Cards title="Change Password"> */}
      <View style={styles.hdCont}>
        <TouchableOpacity onPress={() => onBack()} style={styles.backBtn}>
          <BackIcon
            name="arrow-back"
            size={responsiveFontSize(tablet ? 2 : 3)}
            color={colors.themeblue}
          />
        </TouchableOpacity>
        <Text style={styles.hd}>Change Password</Text>
      </View>
      <View style={styles.container}>
        <ExitModal
          visible={isShowExitModal}
          closeModle={() => setIsShowExitModal(false)}
        />
        <InputField
          inputType="password"
          error={!changePasswordDetail.oldPass && isSubmit}
          getValue={v => getPassDetailValue('oldPass', v)}
          icon={() => {
            return <PassIcon name="lock" color={colors.themeblue} size={20} />;
          }}
          password={!isShowPass}
          placeHolder="Enter Old Password"
          color="grey"
          value={changePasswordDetail.oldPass}
          rightIcon={() => {
            if (isShowPass) {
              return <EyeIcon name="eye" color={colors.themeblue} size={20} />;
            } else {
              return (
                <EyeIcon
                  name="eye-with-line"
                  color={colors.themeblue}
                  size={20}
                />
              );
            }
          }}
          onPressRghtIcon={() => setisShowPass(prev => !prev)}
        />
        <InputField
          inputType="password"
          error={!changePasswordDetail.newPass && isSubmit}
          getValue={v => getPassDetailValue('newPass', v)}
          icon={() => {
            return <PassIcon name="lock" color={colors.themeblue} size={20} />;
          }}
          password={!isShowNewPass}
          placeHolder="Enter New Password"
          color="grey"
          value={changePasswordDetail.newPass}
          rightIcon={() => {
            if (isShowNewPass) {
              return <EyeIcon name="eye" color={colors.themeblue} size={20} />;
            } else {
              return (
                <EyeIcon
                  name="eye-with-line"
                  color={colors.themeblue}
                  size={20}
                />
              );
            }
          }}
          onPressRghtIcon={() => setIsShowNewPass(prev => !prev)}
        />
        <InputField
          inputType="password"
          error={!changePasswordDetail.confirmPass && isSubmit}
          getValue={v => getPassDetailValue('confirmPass', v)}
          icon={() => {
            return <PassIcon name="lock" color={colors.themeblue} size={20} />;
          }}
          password={!isShowCnfrmPass}
          placeHolder="Enter Confirm Password"
          color="grey"
          value={changePasswordDetail.confirmPass}
          rightIcon={() => {
            if (isShowCnfrmPass) {
              return <EyeIcon name="eye" color={colors.themeblue} size={20} />;
            } else {
              return (
                <EyeIcon
                  name="eye-with-line"
                  color={colors.themeblue}
                  size={20}
                />
              );
            }
          }}
          onPressRghtIcon={() => setIsShowCnfrmPass(prev => !prev)}
        />
        <View style={styles.btnContainer}>
          <Btn
            text="Save"
            loader={isApiCall}
            pS={{marginVertical: responsiveHeight(1), width: '48.5%'}}
            call={() => onSavePassword()}
          />
          <Btn
            pS={{marginVertical: responsiveHeight(1), width: '48.5%'}}
            text={'Exit'}
            disabled={isApiCall}
            call={() => {
              onBack();
            }}
          />
        </View>
      </View>
      {/* </Cards> */}
    </>
  );
};

const mapStateToProps = ({authRed}) => {
  return {authRed};
};

export default connect(mapStateToProps, actions)(ChangePassCard);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  btnContainer: {
    // backgroundColor:"red",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hdCont: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    position: 'relative',
    backgroundColor:'white'
  },
  hd: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2.2),
    color: colors.themeblue,
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    top: responsiveHeight(2.5),
    left: responsiveFontSize(2),
  },
});
