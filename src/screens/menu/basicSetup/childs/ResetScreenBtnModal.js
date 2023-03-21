import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import Btn from '../../../../components/Btn';
import colors from '../../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');

const ResetScreenBtnModal = ({isModalVisible, closeModal,onReset}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
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
          <View
            style={{...styles.contentContainer, backgroundColor: '#ffffff'}}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <IconCross name="cross" color={colors.blue} size={25} />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                textAlignVertical: 'center',
                marginTop: responsiveHeight(2),
                fontSize:responsiveFontSize(1.7)
              }}>
              Are you sure? You want to reset images
            </Text>
          </View>
          <View style={styles.btnCont}>
            <Btn
              text="Yes, Reset Default"
              call={() => {
                onReset();
                closeModal();
              }}
              pS={{
                width: '40%',
                fontSize: responsiveFontSize(1),
              }}
              pSText={{fontSize: responsiveFontSize(1.7)}}
            />
            <Btn
              text="Cancel"
              call={() => {
                // console.log('NNNNNNNNNOOOOOOOOOOOOOOOOOO');
                closeModal();
              }}
              pS={{
                width: '40%',
                backgroundColor: colors.errorRed,
              }}
              pSText={{fontSize: responsiveFontSize(1.7)}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResetScreenBtnModal;

const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 1.25,
    height: responsiveHeight(20),
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
  //   imgCon: {
  //     width: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   img: {
  //     width: responsiveFontSize(10),
  //     height: responsiveFontSize(10),
  //     borderRadius: responsiveFontSize(10) / 2,
  //   },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: responsiveHeight(2),
    // backgroundColor:"blue"
  },
});
