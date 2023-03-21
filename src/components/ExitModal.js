import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconSuccess from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import colors from '../assets/colors/colors';
import {responsiveFontSize, responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import deviceInfo from "react-native-device-info"
import Btn from './Btn';
const tablet=deviceInfo.isTablet()
const {width, height} = Dimensions.get('window');
function ExitModal({visible, closeModle,}) {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={{flex: 1, justifyContent: 'center', elevation: 5}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <View style={{...styles.con, backgroundColor: colors.white}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <IconSuccess name="warning" color={colors.themeblue} size={responsiveFontSize(5)} />
            <Text
              style={{
                color: 'gray',
                marginTop: responsiveFontSize(2),
                textAlign: 'center',
                width: '90%',
                fontSize: responsiveFontSize(tablet?0.75:1.5)
              }}>
                  Your data won't be saved! {'\n'} Are you sure you want to quit this process?
              </Text>
          </View>
          <View style={{
            flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'100%', bottom: 20
          }}>
              <Btn
              text="Cancel"
              call={() => closeModle()}
              pS={{width: responsiveWidth(tablet?20:30)}}
              pSText={{fontSize: responsiveFontSize(tablet?0.75:1.5)}}
            />
              <Btn
              text="Yes"
              call={() => {
                closeModle();
                navigation.goBack();
              }}
              pS={{width: responsiveWidth(tablet?20:30),backgroundColor:colors.errorRed}}
              pSText={{fontSize: responsiveFontSize(tablet?0.75:1.5)}}
            />
          </View>
         
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(tablet?50:80),
    height: responsiveHeight(35),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: responsiveFontSize(1),
  },
  iconCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
  
  height: 40,    width: responsiveWidth(tablet?15:25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveFontSize(tablet?0.4:0.75),
  },
  btnText: {
    color: 'white',
    // fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(tablet?0.75:1.5),
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 2,
  },
  icon: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#001441',
    width: '18%',
    height: '18%',
    borderRadius: '18%' / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ExitModal;
