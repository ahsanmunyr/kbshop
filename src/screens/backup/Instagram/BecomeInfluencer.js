import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Btn from '../../components/Btn'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import deviceInfo from "react-native-device-info"






import DateTimePicker from 'react-native-modal-datetime-picker';

const tablet = deviceInfo.isTablet()

function BecomeInfluencer({ authRed, header, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: header == "none" ? false : true
    })
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: responsiveFontSize(2), backgroundColor:'white' }}>

      
      <View>

        <Image
          source={require('../../assets/influencer.png')}
          style={{ width: responsiveWidth(tablet ? 30 : 40), height: responsiveHeight(30) }}
          resizeMode="contain"
        />
      </View>
      <View style={{ width: '100%' }}>
        <Text style={styles.text}>
          When you become an influencer, you will be able to participate
          in campaigns offered by brands and earn commissions. If you
          have at least <Text style={{ fontWeight: 'bold' }}>1000</Text> followers you can qualify to became an
          influencer.
        </Text>
      </View>
      <View style={{ width: '100%', marginVertical: responsiveFontSize(1) }}>
        <Text style={{ textTransform: 'capitalize', fontSize: responsiveFontSize(tablet ? 1.25 : 1.8), fontWeight: 'bold' }}>
          Application Status: {authRed.data.became_influencer === "pending" ? "Under Review" : authRed.data.became_influencer}
        </Text>
      </View>
      {/* <View style={{ width: '100%', marginTop: responsiveFontSize(1) }}>
        <Btn
          text={"Become An Influencer"}
          disabled={authRed.data.became_influencer == "pending" ? true : false}
          // call={()=>navigation.navigate("connectionSetup")}
          call={() => navigation.navigate("influencerApplication")}
          color={authRed.data.became_influencer == "pending" ? "#D3D3D3" : null}
        />
      </View> */}
    </View>
  )
}

function mapStateToProps({ authRed }) {
  return { authRed }
}
export default connect(mapStateToProps)(BecomeInfluencer)
const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: "justify",
    lineHeight: responsiveFontSize(tablet ? 1.7 : 2),
    marginVertical: responsiveFontSize(1),
    fontSize: responsiveFontSize(tablet ? 1.25 : 1.6)
  }, 


})