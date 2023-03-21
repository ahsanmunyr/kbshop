// @ts-nocheck
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler,

} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Btn from '../../../../components/Btn';
import HalfBtn from '../../../../components/halfBtn';
import InputField from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';
import colors from '../../../../assets/colors/colors';
import Toast from 'react-native-toast-message';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import CustomImagePickerNPreview from '../../../../components/CustomImagePickerNPreview';
import ImageModal from '../../../../components/ImageModel';
import DropDownComp from '../../../../components/DropDownComp';
import { connect, useDispatch } from 'react-redux';
import * as contactUs from '../../../../store/actions//contactus';
import Loader from '../../../../components/Loader';
import deviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import ExitModal from '../../../../components/ExitModal';



const tablet = deviceInfo.isTablet();

const { width } = Dimensions.get('window');

const ContactUsCard = ({ authRed, contactUs }) => {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isUpdateApiCall, setIsUpdateApiCall] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [userData, setUserData] = useState({
    subject: '',
    message: '',
  });
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const getValue = (k, v) => {
    setUserData(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  };
  const check = () => {

    if (
      userData.message === '' &&
      userData.subject === ''
    ) {
      navigation.goBack();
    } else {
      setExitModal(true);
      return true
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      check
    );

    return () => backHandler.remove();
  }, [userData, exitModal, navigation])

  const onPressSaveBtn = () => {
    setIsUpdateApiCall(true);
    if (userData.message === '' && userData.subject === '') {
      Toast.show({
        type: 'info',
        text1: 'Please fill the complete form, before submitting',
      });
      setIsUpdateApiCall(false);

    } else if (userData.subject === '') {
      Toast.show({
        type: 'info',
        text1: 'Please fill the complete form, before submitting',
      });
      setIsUpdateApiCall(false);

    } else if (userData.message === '') {
      Toast.show({
        type: 'info',
        text1: 'Please fill the complete form, before submitting',
      });
      setIsUpdateApiCall(false);

    } else {
      contactUs(userData.subject, userData.message)
        .then(res => {
          console.log(res?.data);
          setUserData({
            subject: '',
            message: '',
          });
          setIsUpdateApiCall(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };



  return (
    <>
      <View style={styles.container}>

        <View style={styles.hdCont}>
          <TouchableOpacity onPress={() => check()} style={styles.backBtn}>
            <BackIcon
              name="arrow-back"
              style={{ right: 10 }}
              size={responsiveFontSize(tablet ? 2 : 3)}
              color={colors.themeblue}
            />
          </TouchableOpacity>
          <Text style={styles.hd}>Contact Us</Text>
        </View>
        <ExitModal visible={exitModal} closeModle={() => setExitModal(false)} />

        <View style={styles.inputContainer}>
          <InputField
            error={null}
            getValue={v => getValue('subject', v)}
            value={userData.subject}
            placeHolder="Subject"
            maxL={50}
            color="grey"
            passedStyle={{ paddingLeft: width * 0.03, borderRadius:responsiveFontSize(1),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor:'white',   elevation: 5, }}
          />
          <TextArea
            getValue={v => getValue('message', v)}
            value={userData.message}
            maxL={300}
            placeholder="Message"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <HalfBtn
            pS={{ marginVertical: responsiveHeight(1) }}
            text={'Submit'}
            loader={isUpdateApiCall}
            call={() => {
              // setSubmitProfileData(true);
              onPressSaveBtn();
            }}
          />
          <HalfBtn
            pS={{ marginVertical: responsiveHeight(1) }}
            text={'Exit'}
            loader={null}
            call={() => {
              check()
            }}
          />
        </View>





      </View>
    </>




  );
};

const mapStateToProps = ({ authRed }) => {
  return { authRed };
};

export default connect(mapStateToProps, contactUs)(ContactUsCard);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: responsiveHeight(4),
  },
  container: {
    // height: responsiveHeight(85),
    width: '100%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
    backgroundColor:'white'


  },
  headerCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hdCont: {
    // width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    position: 'relative',
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



