import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

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
import deviceInfo from 'react-native-device-info';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Dollar from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Loader from '../../../../components/Loader';
import Konnect from '../../../../config/konnect';
const tablet = deviceInfo.isTablet();

const {width} = Dimensions.get('window');

const Balance = ({authRed}) => {
  const navigation = useNavigation();
  const [loader, onChangeLoader] = useState(false);
  const [data, onChangeData] = useState(null);

  const apiCall = async () => {
    onChangeLoader(true);
    try {
      const res = await Konnect.get(
        `/v1/userdashboard/receive/influencerearning`,
      );
      console.log(res?.data);
      if (res?.data?.success) {
        onChangeData(res?.data?.message);
        onChangeLoader(false);
      } else {
        onChangeLoader(false);
      }
    } catch (err) {
      console.log(err.response,"---");
      onChangeLoader(false);
    }
  };
// console.log({authRed})
  useEffect(() => {
    apiCall();
  }, []);

  if (loader) {
    return (
      <View
        style={{
          height: responsiveHeight(100),
          width: responsiveWidth(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size={responsiveFontSize(4)}
          color={colors.themeblue}
        />
      </View>
    );
  }

  return (
    <View style={{}}>
      {/* <Cards title="Change Password"> */}
      <View style={styles.hdCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <BackIcon
            name="arrow-back"
            size={responsiveFontSize(tablet ? 2 : 3)}
            color={colors.themeblue}
          />
        </TouchableOpacity>
        <Text style={styles.hd}>Balance</Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          width: responsiveWidth(90),
          height: responsiveHeight(10),
          backgroundColor: 'white',
          flexDirection: 'row',
          borderRadius: 8,
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center', left: 30}}>
          <Dollar
            name="wallet"
            size={responsiveFontSize(tablet ? 4 : 5)}
            color={colors.themeblue}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            flexDirection: 'column',
            right: 30,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 1.5 : 2.8),
              color: 'black',
              fontWeight: '600',
              textAlign: 'right',
            }}>
            {data}
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 1.25 : 1.8),
              color: 'grey',
              fontWeight: '300',
            }}>
            YOUR BALANCE
          </Text>
        </View>
      </View>
      <View style={{height: 100}}></View>
    </View>
  );
};

const mapStateToProps = ({authRed}) => {
  return {authRed};
};

export default connect(mapStateToProps, actions)(Balance);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },
  btnContainer: {

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
