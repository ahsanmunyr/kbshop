import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CrossIcon from 'react-native-vector-icons/Entypo';

const CustomModal = props => {
  const {
    isModalVisible,
    setIsModalVisible,
    modalWidth = 90,
    headerShown = true,
    title = 'title prop',
    showCrossIcon = true,
    animationType = 'slide',
    closeModal,
  } = props;

  const __closeModal = () => {
    closeModal();
  };
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={__closeModal}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {width: responsiveWidth(modalWidth)}]}>
          {headerShown && (
            <View style={[styles.modalHeadCont, {width: '100%'}]}>
              <Text style={styles.modalTitle}>{title}</Text>
              {showCrossIcon && (
                <TouchableOpacity
                  style={styles.closeBtnHd}
                  onPress={__closeModal}>
                  <CrossIcon name="cross" size={responsiveFontSize(2.7)} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.modalBodyCont}>
            {props.children}
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: 'black',
  },
  modalHeadCont: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.8),
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    position: 'relative',
  },
  modalTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: colors.themeblue,
  },
  closeBtnHd: {
    position: 'absolute',
    right: responsiveWidth(1.5),
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: responsiveFontSize(0.75),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalBodyCont: {
    paddingVertical: responsiveHeight(3),
  },
});

export default CustomModal;
