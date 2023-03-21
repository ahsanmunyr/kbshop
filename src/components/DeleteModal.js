import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import {connect} from 'react-redux';
import * as favAct from '../store/actions/favouriteAct';
import Btn from './Btn';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const {width, height} = Dimensions.get('window');

function DeleteModal({insta,visible, closeModal, selectedItem,deleteFav,title,title2}) {
  
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
        <View style={{...styles.con, backgroundColor: '#ffffff'}}>
          <View style={{...styles.btn, backgroundColor: '#ffffff'}}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet?2:3)} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.img}
                source={
                  insta?insta:(
                    selectedItem.profile_image_url
                    ? {uri: selectedItem.profile_image_url}
                    : require('../assets/user.png')
                  )
                }
              />
              <Text style={{margin: responsiveFontSize(1),fontSize:responsiveFontSize(tablet?0.8:1.6)}}>
                {selectedItem.name}
              </Text>
            </View>
          </View>
          <View style={styles.msgCont}>
            <Text style={{fontSize: responsiveFontSize(tablet?0.75:1.5),textAlign:'center',textTransform:'capitalize',paddingHorizontal:responsiveFontSize(1)}}>
              {title?title:"Are you sure, you want to remove this item from your favourites?"}
            </Text>
            {title2?<Text style={{fontSize: responsiveFontSize(tablet?0.75:1.5),textAlign:'center',textTransform:'capitalize',paddingHorizontal:responsiveFontSize(1),marginVertical:responsiveFontSize(0.5)}}>{title2}</Text>:null}
          </View>
          <View style={styles.btnCont}>
            <Btn
              text={insta?"Disconnect":"Delete"}
              call={() => {deleteFav(selectedItem?._id)}}
              pS={{
                width: responsiveWidth(tablet?20:30),
                fontSize: responsiveFontSize(1),
                backgroundColor: colors.errorRed,
              }}
              pSText={{fontSize: responsiveFontSize(tablet?0.75:1.5)}}
            />
            <Btn
              text="Cancel"
              call={() => closeModal()}
              pS={{width: responsiveWidth(tablet?20:30)}}
              pSText={{fontSize: responsiveFontSize(tablet?0.75:1.5)}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteModal;

const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(tablet?50:80),
    height: responsiveHeight(40),
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
    // borderColor:'lightgray',
    // borderWidth:1
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
