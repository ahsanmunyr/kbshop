import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackIcon from "react-native-vector-icons/Ionicons"
import LocationIcon from "react-native-vector-icons/Entypo"
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import InputField from '../../components/InputField';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import ZipIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FollowersIcon from 'react-native-vector-icons/FontAwesome5';
import * as countryStateCityAct from '../../store/actions/countryStateCityAct';
import * as instaAct from '../../store/actions/instagram';
import { connect } from "react-redux";
import DropDownComp from '../../components/DropDownComp';
import Loader from '../../components/Loader'
import Btn from '../../components/Btn'
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

function InfluencerApplication({
  get_countries,
  countryStateCityRed,
  get_states,
  get_cities,
  influencerApplication,
  authRed
}) {
  const navigation = useNavigation()
  const [fields, setFields] = useState({
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    no_of_followers: "",
    zip: ""

  })
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  // country
  const [isCountryDrpdwnOpen, setIsCountryDrpdwnOpen] = useState(false);
  // state
  const [isStateDrpdwnOpen, setIsStateDrpdwnOpen] = useState(false);
  const [isStateApiCall, setIsStateApiCall] = useState(false);
  // city
  const [isCityDrpdwnOpen, setIsCityDrpdwnOpen] = useState(false);
  const [isCityApiCall, setIsCityApiCall] = useState(false);

  useEffect(() => {
    setLoading(true)
    const {instagram_username,country,city,state,zip}=authRed.data
    get_countries().then(() => {
      setFields({
        country,
        state,
        city,
        zip
      })
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    // setFields({ ...fields, city: "", state: "" })
    if (fields.country !== '') {
      setIsStateApiCall(true);
      get_states(fields.country).then(() => {
        setIsStateApiCall(false);
      });
    }
  }, [fields.country]);

  useEffect(() => {
    if (fields.state !== '') {
      setIsCityApiCall(true);
      get_cities(fields.country, fields.state).then(() => {
        setIsCityApiCall(false);
      });
    }
  }, [fields.state]);

  function onSubmit(){
    // console.log(fields)
    setSubmit(true)
    if(fields.name && fields.address && fields.country && ( (!(countryStateCityRed.states.length>0)) || fields.state)  && ((!(countryStateCityRed.cities.length>0)) || fields.city) && fields.no_of_followers>=1000){
      setBtnLoading(true)
      influencerApplication(fields).then(()=>{
        setBtnLoading(false)
      })
    }
  }


  if(!loading){
    return (
      <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ width: '20%', paddingLeft: responsiveFontSize(2) }}
            onPress={() => navigation.goBack()}
          >
            <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} />
          </TouchableOpacity>
          <Text style={{ color: colors.themeblue, fontWeight: 'bold', fontSize: responsiveFontSize(tablet?1.25:2.2), padding: responsiveFontSize(2), textAlign: 'center', width: '60%' }}>
            Influencer Application
          </Text>
          <View style={{ width: '20%' }} />
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
        keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fieldsCon}>
            <View>
              <InputField
                error={!fields.name && submit}
                getValue={v => setFields({ ...fields, name: v })}
                value={fields.name}
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
                placeHolder="Instagram ID"
                color="grey"
              />
            </View>
            <View style={styles.drop}>
              <DropDownComp
                items={countryStateCityRed.countries}
                open={isCountryDrpdwnOpen}
                value={fields.country}
                setOpen={setIsCountryDrpdwnOpen}
                onSelectItem={data => {
                  // console.log(data)
                  setFields({ ...fields, country: data.value,state:"",city:"" })
                }
                }
                error={!fields.country && submit}
                placeholdertxt="Select country"
                searchable={true}
              />
            </View>
            {fields.country !== '' &&
              countryStateCityRed.states.length > 0 &&
              (isStateApiCall ? (
                <View style={{ marginTop: responsiveHeight(5) }}>
                  <Loader />
                </View>
              ) : (
                <View style={styles.drop}>
                  <DropDownComp
                    items={countryStateCityRed.states}
                    open={isStateDrpdwnOpen}
                    value={fields.state}
                    setOpen={setIsStateDrpdwnOpen}
                    error={
                      countryStateCityRed.states.length > 0
                        ? !fields.state && submit
                        : false
                    }
                    onSelectItem={data => setFields({ ...fields, state: data.value })}
                    placeholdertxt="Select state"
                    searchable={true}
                  />
                </View>
              ))}
            {fields.state !== '' &&
              (isCityApiCall ? (
                <View style={{ marginTop: responsiveHeight(5) }}>
                  <Loader />
                </View>
              ) : (
                <View style={styles.drop}>
                  <DropDownComp
                    items={countryStateCityRed.cities}
                    open={isCityDrpdwnOpen}
                    value={fields.city}
                    setOpen={setIsCityDrpdwnOpen}
                    onSelectItem={data => setFields({ ...fields, city: data.value })}
                    searchable={true}
                    error={!((!(countryStateCityRed.cities.length>0)) || fields.city) && submit}
                    placeholdertxt="Select city"
                  />
                </View>
              ))}
            <View>
              <InputField
                // error={!fields.zip && submit}
                getValue={v => setFields({ ...fields, zip: v })}
                value={fields.zip}
                icon={() => {
                  return (
                    <ZipIcon
                      name="text-box-multiple"
                      color={colors.themeblue}
                      size={20}
                    />
                  );
                }}
                password={false}
                placeHolder="Zip/Postal Code (Optional)"
                color="grey"
              />
            </View>
            <View>
              <InputField
                error={!fields.address && submit}
                getValue={v => setFields({ ...fields, address: v })}
                value={fields.address}
                columns={4}
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
                placeHolder="Address"
                color="grey"
              />
            </View>
          </View>
          <View style={styles.fieldsCon}>
            <View>
              <InputField
                error={!(fields.no_of_followers>=1000) && submit}
                getValue={v => setFields({ ...fields, no_of_followers: v })}
                value={fields.no_of_followers}
                keyboardType="number"
                icon={() => {
                  return (
                    <FollowersIcon
                      name="users"
                      color={colors.themeblue}
                      size={18}
                    />
                  );
                }}
                password={false}
                placeHolder="No of Followers"
                color="grey"
              />
            </View>
            <View style={{marginTop:responsiveFontSize(2)}}>
              <Btn
                text={"Submit Application"}
                call={() => {
                  onSubmit()
                }}
                loader={btnLoading}
              />
            </View>
            </View>
        </ScrollView>
      </View>
    )
  }else{
    return<Loader/>
  }
}

const mapStateToProps = ({ countryStateCityRed ,authRed}) => {
  return { countryStateCityRed,authRed };
};


export default connect(mapStateToProps, {...countryStateCityAct,...instaAct})(InfluencerApplication)
const styles = StyleSheet.create({
  fieldsCon: {
    width: '90%'
  },
  drop: {
    marginVertical: 5
  }
})