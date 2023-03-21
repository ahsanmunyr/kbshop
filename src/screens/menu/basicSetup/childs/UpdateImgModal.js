// @ts-nocheck
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import Btn from '../../../../components/Btn';
import colors from '../../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import * as authAct from '../../../../store/actions/authAct';
import deviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const tablet = deviceInfo.isTablet();

const UpdateImgModal = ({
  isModalVisible,
  closeModal,
  updatedImg,
  editUserInfo,
  refreshAuth,
}) => {
  const [isApiCall, setisApiCall] = useState(false);

  const onSaveUpdateImg = () => {
    let file = {
      uri: updatedImg?.uri,
      name: updatedImg?.fileName,
      type: updatedImg?.type,
    };
    setisApiCall(true);
    const user_updated_img = new FormData();
    user_updated_img.append('image', file);
    editUserInfo(user_updated_img, () => {
      refreshAuth();
      setisApiCall(false);
      closeModal();
    });
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
      style={{flex: 1, justifyContent: 'center', elevation: 8}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <View style={{...styles.con, backgroundColor: '#ffffff'}}>
          <View
            style={{...styles.contentContainer, backgroundColor: '#ffffff'}}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet?2:4)} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{uri: updatedImg?.uri}}
              />
            </View>
          </View>
          <View style={styles.btnCont}>
            <Btn
              text="Save"
              call={() => {
                onSaveUpdateImg();
              }}
              loader={isApiCall}
              pS={{
                width: responsiveWidth(30),
                fontSize: responsiveFontSize(1),
              }}
              pSText={{fontSize: responsiveFontSize(1.8)}}
            />
            <Btn
              text="Cancel"
              call={() => {
                closeModal();
              }}
              pS={{
                width: responsiveWidth(30),
                backgroundColor: colors.errorRed,
              }}
              pSText={{fontSize: responsiveFontSize(1.8)}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default connect(null, authAct)(UpdateImgModal);

const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 1.25,
    height: responsiveHeight(tablet?31:30),
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
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingVertical: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgCon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: responsiveFontSize(10),
    height: responsiveFontSize(10),
    borderRadius: responsiveFontSize(10) / 2,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: responsiveHeight(2),
  },
});
