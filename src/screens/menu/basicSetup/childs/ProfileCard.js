// @ts-nocheck
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  StatusBar
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Btn from '../../../../components/Btn';
import HalfBtn from '../../../../components/halfBtn';
import InputField from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';
import colors from '../../../../assets/colors/colors';
import MailIcon from 'react-native-vector-icons/Fontisto';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import PassIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import CustomImagePickerNPreview from '../../../../components/CustomImagePickerNPreview';
import ImageModal from '../../../../components/ImageModel';
import DropDownComp from '../../../../components/DropDownComp';
import {connect, useDispatch} from 'react-redux';
import * as countryStateCityAct from '../../../../store/actions/countryStateCityAct';
import * as authAct from '../../../../store/actions/authAct';
import Loader from '../../../../components/Loader';
import deviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';
import ExitModal from '../../../../components/ExitModal';
const tablet = deviceInfo.isTablet();

const {width} = Dimensions.get('window');
const userImg = require('../../../../assets/user-without-bg.png');

const ProfileCard = ({
  authRed,
  countryStateCityRed,
  get_countries,
  get_states,
  get_cities,
  editUserInfo,
  refreshAuth,
}) => {
  // console.log(authRed.data, "=================")
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const bio = useRef();
  const emailRef = useRef();
  // dropdown
  const [gender, setGender] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);
  const navigation = useNavigation();
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  // country
  const [isCountryDrpdwnOpen, setIsCountryDrpdwnOpen] = useState(false);
  const [isCountryApiCall, setIsCountryApiCall] = useState(true);
  // state
  const [isStateDrpdwnOpen, setIsStateDrpdwnOpen] = useState(false);
  const [isStateApiCall, setIsStateApiCall] = useState(false);
  // city
  const [isCityDrpdwnOpen, setIsCityDrpdwnOpen] = useState(false);
  const [isCityApiCall, setIsCityApiCall] = useState(false);
  // Profile
  const [isUpdateApiCall, setIsUpdateApiCall] = useState(false);
  const [userData, setUserData] = useState({
    profileImg: '',
    name: '',
    nickName: '',
    firstName: '',
    lastName:'',
    zipCode: '',
    bio: '',
    email: '',
    gender: 'male',
    selectedCountry: '',
    selectedState: '',
    selectedCity: '',
  });
  const [submitProfileData, setSubmitProfileData] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const getValue = (k, v) => {
    setUserData(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  };

  const dispatch = useDispatch();

  const check = () => {
    // console.log("dfsdfsadfsadfsdf",userData)
    if (
      userData.nickName === authRed.data.nick_name &&
      userData.firstName === authRed.data.first_name &&
      userData.lastName === authRed.data.last_name &&
      userData.zipCode === authRed.data.zip
      // userData.bio === authRed.data.bio  &&
      // userData.profileImg === authRed.data.profile_image_url &&
      // userData.gender === authRed.data.gender &&
      // userData.selectedCountry === authRed.data.country &&
      // userData.selectedState === authRed.data.state &&
      // userData.selectedCity === authRed.data.city 
    ) {
      navigation.goBack();
    } else {
      setExitModal(true);
      return true
    }
  };


  useEffect(()=>{
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        check
      );
  
      return () => backHandler.remove();
  },[userData,authAct,exitModal,navigation])

  useEffect(() => {
    get_countries().then(() => setIsCountryApiCall(false));
  }, []);

  useEffect(() => {
    setUserData({
      ...userData,
      profileImg: authRed.data.profile_image_url,
      name: authRed.data.name,
      email: authRed.data.email,
      gender: authRed.data.gender,
      nickName: authRed.data.nick_name,
      firstName: authRed.data.first_name,
      lastName:authRed.data.last_name,
      zipCode: authRed.data.zip,
      bio: authRed.data.bio,
      selectedCountry: authRed.data.country,
      selectedState: authRed.data.state,
      selectedCity: authRed.data.city,
    });
  }, [authRed]);

  useEffect(() => {
    if (userData.selectedCountry !== '') {
      setIsStateApiCall(true);
      dispatch({type: 'CLEAR_CITY'});
      get_states(userData.selectedCountry).then(() => {
        setIsStateApiCall(false);
      });
    }
  }, [userData.selectedCountry]);

  useEffect(() => {
    if (userData.selectedState !== '') {
      setIsCityApiCall(true);
      get_cities(userData.selectedCountry, userData.selectedState).then(() => {
        setIsCityApiCall(false);
      });
    }
  }, [userData.selectedState]);

  const onPressSaveBtn = () => {
    if (
      userData.nickName === '' ||
      userData.email === '' ||
      userData.firstName === '' ||
      userData.lastName === '' ||
      userData.zipCode === ''
    ) {
      console.log('all filed required');
    } else {
     
     
        setIsUpdateApiCall(true);
        const user_updated_data = new FormData();
         user_updated_data.append('nick_name', userData.nickName);
        user_updated_data.append('email', userData.email);
        user_updated_data.append('first_name', userData.firstName);
        user_updated_data.append('last_name', userData.lastName);
        user_updated_data.append('zip', userData.zipCode);
        // user_updated_data.append('name', userData.name);
        // user_updated_data.append('bio', userData.bio);
        // user_updated_data.append('email', userData.email);
        // user_updated_data.append('gender', userData.gender);
        // user_updated_data.append('country', userData.selectedCountry);
        // user_updated_data.append('state', userData.selectedState);
        // user_updated_data.append('city', userData.selectedCity);
        editUserInfo(user_updated_data, ()=>refreshAuth()).then(() => {
          setIsUpdateApiCall(false);
        });
      
    }
  };

  // useEffect(() => {
  //   return () =>  alert("SAD")
  // }, [navigation]);


  return (
    <>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={colors.themeblue} barStyle='light-content'  /> */}
        <View style={styles.hdCont}>
          <TouchableOpacity onPress={() => check()} style={styles.backBtn}>
            <BackIcon
              name="arrow-back" 
              style={{right: 10}}
              size={responsiveFontSize(tablet ? 2 : 3)}
              color={colors.themeblue}
            />
          </TouchableOpacity>
          <Text style={styles.hd}>Profile Information</Text>
          {/* <Text style={styles.hd}>---------------------------Sign up</Text> */}
        </View>
        <ExitModal visible={exitModal} closeModle={() => setExitModal(false)} />
        {/* <CustomImagePickerNPreview
          onPress={() => {
            setIsImgModalOpen(true);
          }}
          defaultImg={
            userData.profileImg === '' ? userImg : {uri: userData?.profileImg}
          }
        /> */}
        {/* <View
          style={{
            paddingVertical: responsiveFontSize(1),
            width: '90%',
            alignSelf: 'center',
            top: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: responsiveFontSize(tablet ? 1 : 1.5),
              color: 'gray',
              fontWeight: 'bold',
            }}>
            ID# {authRed?.data?.pixel_id}
          </Text>
        </View> */}
        <View style={styles.inputContainer}>
        <InputField
              error={!userData.nickName && submitProfileData}
              getValue={v => getValue('nickName', v)}
              value={userData.nickName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.25 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Nick Name"
              color="grey"
            />
            <InputField
              error={!userData.firstName && submitProfileData}
              getValue={v => getValue('firstName', v)}
              value={userData.firstName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.25 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="First Name"
              color="grey"
            />
            <InputField
              error={!userData.lastName && submitProfileData}
              getValue={v => getValue('lastName', v)}
              value={userData.lastName}
              returnKeyType="next"
              // onSubmitEditing={()=>emailRef.current.focus()}
              icon={() => {
                return (
                  <PersonIcon
                    name="person"
                    color={colors.themeblue}
                    size={responsiveFontSize(tablet ? 1.25 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Last Name"
              color="grey"
            />
          {/* <InputField
            error={!userData.name && submitProfileData}
            getValue={v => getValue('name', v)}
            value={userData.name}
            placeHolder="Enter Name"
            returnKeyType={'next'}
            // onSubmitEditing={() => {
            //   bio.current.focus();
            // }}
            color="grey"
            passedStyle={{paddingLeft: width * 0.03}}
          /> */}
          {/* <TextArea
            getValue={v => getValue('bio', v)}
            value={userData.bio}
            innerRef={bio}
            placeholder="Enter Bio"
            returnKeyType={'next'}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          /> */}
          <InputField
            error={!userData.email && submitProfileData}
            getValue={v => getValue('email', v)}
            value={userData.email}
            placeHolder="Enter Email"
            color="grey"
            icon={() => {
              return (
                <MailIcon name="email" color={colors.themeblue} size={responsiveFontSize(tablet ? 1.25 : 2.2)} />
              );
            }}
            innerRef={emailRef}
            passedStyle={{paddingLeft: width * 0.03}}
            editable={false}
          />
             <InputField
              error={!userData.zipCode && submitProfileData}
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
                    size={responsiveFontSize(tablet ? 1.25 : 2.2)}
                  />
                );
              }}
              password={false}
              placeHolder="Zip code"
              color="grey"
            />
          {/* <View style={{zIndex: 99999}}>
            <DropDownComp
              items={gender}
              open={isOpenDrpdwn}
              value={userData.gender}
              setOpen={setIsOpenDrpdwn}
              onSelectItem={data => getValue('gender', data.value)}
              error={!userData.gender && submitProfileData}
              textStyle={{paddingLeft: tablet ? width * 0.022 : width * 0.01}}
              listMode="SCROLLVIEW"
              placeholdertxt="Gender"
              style={{
                marginVertical: 5,
                width: responsiveWidth(94),
                zIndex: 99999,
              }}
              dropDownContainerStyle={{
                width: responsiveWidth(94),
                alignSelf: 'center',
              }}
            />
          </View>
          {isCountryApiCall ? (
            <View style={{height: responsiveHeight(10)}}>
              <Loader />
            </View>
          ) : (
            <DropDownComp
              items={countryStateCityRed.countries}
              open={isCountryDrpdwnOpen}
              value={userData.selectedCountry}
              setOpen={setIsCountryDrpdwnOpen}
              onSelectItem={data => {
                getValue('selectedCountry', data.value);
                getValue('selectedState', '');
                getValue('selectedCity', '');
              }}
              error={!userData.selectedCountry && submitProfileData}
              placeholdertxt="Select country"
              searchable={true}
              textStyle={{paddingLeft: tablet ? width * 0.022 : width * 0.01}}
              style={{
                marginVertical: 5,
                width: responsiveWidth(94),
              }}
            />
          )}
          {userData.selectedCountry !== '' &&
            countryStateCityRed.states.length > 0 &&
            (isStateApiCall ? (
              <View style={{marginTop: responsiveHeight(5)}}>
                <Loader />
              </View>
            ) : (
              <DropDownComp
                items={countryStateCityRed.states}
                open={isStateDrpdwnOpen}
                value={userData.selectedState}
                setOpen={setIsStateDrpdwnOpen}
                error={
                  countryStateCityRed.states.length > 0
                    ? !userData.selectedState && submitProfileData
                    : false
                }
                onSelectItem={data => {
                  getValue('selectedState', data.value);
                  getValue('selectedCity', '');
                }}
                placeholdertxt="Select state"
                searchable={true}
                textStyle={{paddingLeft: tablet ? width * 0.022 : width * 0.01}}
                style={{
                  marginVertical: 5,
                  width: responsiveWidth(94),
                  zIndex: 999,
                }}
              />
            ))}
          {userData.selectedState !== '' &&
            countryStateCityRed.cities.length > 0 &&
            (isCityApiCall ? (
              <View style={{marginTop: responsiveHeight(5)}}>
                <Loader />
              </View>
            ) : (
              <DropDownComp
                items={countryStateCityRed.cities}
                open={isCityDrpdwnOpen}
                value={userData.selectedCity}
                setOpen={setIsCityDrpdwnOpen}
                onSelectItem={data => getValue('selectedCity', data.value)}
                searchable={true}
                error={
                  countryStateCityRed.cities.length > 0
                    ? !userData.selectedCity && submitProfileData
                    : false
                }
                placeholdertxt="Select city"
                textStyle={{paddingLeft: tablet ? width * 0.022 : width * 0.01}}
                style={{
                  marginVertical: 5,
                  width: responsiveWidth(94),
                  zIndex: 99,
                }}
              />
            ))}
        </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal:responsiveScreenFontSize(1)
          }}>
          <HalfBtn
            pS={{marginVertical: responsiveHeight(1)}}
            text={'Save'}
            loader={isUpdateApiCall}
            call={() => {
              setSubmitProfileData(true);
              onPressSaveBtn();
            }}
          />
          <HalfBtn
            pS={{marginVertical: responsiveHeight(1)}}
            text={'Exit'}
            loader={null}
            call={() => {
              check()
            }}
          />
        </View>
        <ImageModal
          visible={isImgModalOpen}
          closeModle={() => setIsImgModalOpen(false)}
          modalCont={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        />
      </View>
      <View style={{height: 120}}></View>
    </>
  );
};

const mapStateToProps = ({countryStateCityRed, authRed}) => {
  return {countryStateCityRed, authRed};
};

export default connect(mapStateToProps, {...countryStateCityAct, ...authAct})(
  ProfileCard,
);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: responsiveHeight(1),
        paddingHorizontal: '3%',
  },
  container: {
    // height: responsiveHeight(85),
    width: '100%',
    // paddingHorizontal: '3%',
    backgroundColor:'white',
    justifyContent: 'center',
  },
  headerCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hdCont: {
    width: responsiveWidth(100),
    // backgroundColor:colors.themeblue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    position: 'relative',
    // borderBottomLeftRadius: responsiveScreenFontSize(1),
    // borderBottomRightRadius: responsiveScreenFontSize(1)
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
