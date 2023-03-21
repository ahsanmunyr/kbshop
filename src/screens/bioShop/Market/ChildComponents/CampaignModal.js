import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import CrossIcon from 'react-native-vector-icons/Entypo';
import IconCross from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Btn from '../../../../components/Btn';
import { connect } from 'react-redux';
import * as campaignsAct from '../../../../store/actions/campaignsAct';
import Toast from "react-native-toast-message"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet() 
const { width, height } = Dimensions.get('window');

const CampaignModal = ({ isModalVisible, closeModal, data, add_campaign ,active_inactive_campaign}) => {
  console.log(data, 'campaign modal');
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
      style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <View style={{ ...styles.con, backgroundColor: '#ffffff' }}>
          <View style={{ ...styles.btn, backgroundColor: '#ffffff' }}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet?2:3)} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{ uri: data?.media_url }}
              />
              <Text style={{ margin: responsiveFontSize(tablet?0.5:1) ,fontSize:responsiveFontSize(tablet?0.8:1.6)}}>
                {data?.campaign_name}
              </Text>
            </View>
          </View>
          <View style={styles.msgCont}>
            <Text
              style={{
                fontSize: responsiveFontSize(tablet?0.75:1.5),
                textAlign: 'center',
                textTransform: 'capitalize',
                paddingHorizontal: responsiveFontSize(1),
              }}>
              Are You Sure You Want To Add This Campaign?
            </Text>
          </View>
          <View style={styles.btnCont}>
            <Btn
              text="Yes"
              call={() => {
                data?.is_linked && !(data.is_active)?
                active_inactive_campaign(
                  data.campaign_id,
                  false,
                  (err)=>{
                    Toast.show({
                      type: 'error',
                      text1: err,
                    });
                  }
                )
                :
                add_campaign(data, (err) => {
                  Toast.show({
                    type: 'error',
                    text1: err,
                  })
                })
                closeModal()
              }}
              pS={{
                width: responsiveWidth(tablet?20:30),
                fontSize: responsiveFontSize(1),
              }}
              pSText={{ fontSize: responsiveFontSize(tablet?0.75:1.5) }}
            />
            <Btn
              text="No"
              call={() => closeModal()}
              pS={{
                width: responsiveWidth(tablet?20:30),
                backgroundColor: colors.errorRed,
              }}
              pSText={{ fontSize: responsiveFontSize(tablet?0.75:1.5) }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    borderRadius: 20,
  },
  iconCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingVertical: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  img: {
    width: responsiveFontSize(tablet?5:10),
    height: responsiveFontSize(tablet?5:10),
    borderRadius: responsiveFontSize(10) / 2,
  },
  imgCon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    borderBottomWidth: 0.5,
    padding: responsiveFontSize(1.5),
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgCont: {
    marginHorizontal: responsiveFontSize(1),
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: responsiveHeight(2),
  },
});

export default connect(null, campaignsAct)(CampaignModal);
