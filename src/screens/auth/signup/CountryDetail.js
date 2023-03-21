import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Btn from '../../../components/Btn';
import {useNavigation} from '@react-navigation/native';
import Header from '../Header';
import DropDownComp from '../../../components/DropDownComp';
import {connect} from 'react-redux';
import * as countryStateCityAct from '../../../store/actions/countryStateCityAct';
import Loader from '../../../components/Loader';

const CountryDetail = ({
  userData,
  getValue,
  get_countries,
  countryStateCityRed,
  get_states,
  get_cities,
  setUserData,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  // country
  const [isCountryDrpdwnOpen, setIsCountryDrpdwnOpen] = useState(false);
  const [isCountryApiCall, setIsCountryApiCall] = useState(true);
  // state
  const [isStateDrpdwnOpen, setIsStateDrpdwnOpen] = useState(false);
  const [isStateApiCall, setIsStateApiCall] = useState(false);
  // city
  const [isCityDrpdwnOpen, setIsCityDrpdwnOpen] = useState(false);
  const [isCityApiCall, setIsCityApiCall] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    get_countries().then(() => {
      setIsCountryApiCall(false);
      getValue('selectedCountry', "US")
    });
  }, []);
  
  useEffect(() => {
    getValue('selectedCity', '');
    getValue('selectedState', '');
    if (userData.selectedCountry !== '') {
      setIsStateApiCall(true);
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

  const onNext = () => {
    setIsSubmit(true);
    if (!userData.selectedCountry && !isCountryApiCall) {
      console.log('Kindly select country');
    } else if (countryStateCityRed.states.length > 0 && !isStateApiCall) {
      if (!userData.selectedState) {
        console.log('Kindly select state');
      } else if (countryStateCityRed.cities.length > 0 && !isCityApiCall) {
        if (!userData.selectedCity) {
          console.log('kindly select city');
        } else {
          navigation.navigate('auth_password_detail');
        }
      } else {
        navigation.navigate('auth_password_detail');
      }
    } 
    // else {
    //   navigation.navigate('auth_password_detail');
    // }
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
            {isCountryApiCall ? (
              <Loader />
            ) : (
              <>
                {/* <Text style={styles.subHd}>Create An Account</Text> */}
                <View style={[styles.dropCont, {zIndex: 99999999}]}>
                  <DropDownComp
                    items={countryStateCityRed.countries}
                    open={isCountryDrpdwnOpen}
                    value={userData.selectedCountry}
                    setOpen={setIsCountryDrpdwnOpen}
                    onSelectItem={data =>
                      getValue('selectedCountry', data.value)
                    }
                    error={!userData.selectedCountry && isSubmit}
                    placeholdertxt="Select country"
                    searchable={true}
                  />
                </View>
              </>
            )}
            {userData.selectedCountry !== '' &&
              countryStateCityRed.states.length > 0 &&
              (isStateApiCall ? (
                <View style={{marginTop: responsiveHeight(5)}}>
                  <Loader />
                </View>
              ) : (
                <View style={[styles.dropCont, {zIndex: 9999999}]}>
                  <DropDownComp
                    items={countryStateCityRed.states}
                    open={isStateDrpdwnOpen}
                    value={userData.selectedState}
                    setOpen={setIsStateDrpdwnOpen}
                    error={
                      countryStateCityRed.states.length > 0
                        ? !userData.selectedState && isSubmit
                        : false
                    }
                    onSelectItem={data => getValue('selectedState', data.value)}
                    placeholdertxt="Select state"
                    searchable={true}
                  />
                </View>
              ))}
            {userData.selectedState !== '' &&
              countryStateCityRed.cities.length > 0 &&
              (isCityApiCall ? (
                <View style={{marginTop: responsiveHeight(5)}}>
                  <Loader />
                </View>
              ) : (
                <View style={[styles.dropCont]}>
                  <DropDownComp
                    items={countryStateCityRed.cities}
                    open={isCityDrpdwnOpen}
                    value={userData.selectedCity}
                    setOpen={setIsCityDrpdwnOpen}
                    onSelectItem={data => getValue('selectedCity', data.value)}
                    searchable={true}
                    error={
                      countryStateCityRed.cities.length > 0
                        ? !userData.selectedCity && isSubmit
                        : false
                    }
                    placeholdertxt="Select city"
                  />
                </View>
              ))}
          </View>
          <View style={styles.btnCont}>
            <Btn
              text="Previous"
              call={() => {
                setUserData({
                  ...userData,
                  selectedCountry: '',
                  selectedState: '',
                  selectedCity: '',
                });
                navigation.goBack();
              }}
              pS={{width: responsiveWidth(40)}}
            />
            <Btn
              text="Next"
              call={() => {
                onNext();
              }}
              pS={{width: responsiveWidth(40), backgroundColor: '#000000'}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(70),
    // backgroundColor:"red"
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

const mapStateToProps = ({countryStateCityRed}) => {
  return {countryStateCityRed};
};

export default connect(mapStateToProps, countryStateCityAct)(CountryDetail);
