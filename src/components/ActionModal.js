import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
  } from 'react-native';
  import React from 'react';
  import colors from '../assets/colors/colors';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import IconCross from 'react-native-vector-icons/Entypo';
  import Btn from './Btn';
  import {connect} from 'react-redux';
  
  const {width, height} = Dimensions.get('window');
  
  const ActionModal = ({isModalVisible, closeModal, data, call,title}) => {
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
            <View style={{...styles.btn, backgroundColor: '#ffffff'}}>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}>
                <IconCross name="cross" color={colors.blue} size={25} />
              </TouchableOpacity>
              <View style={styles.imgCon}>
                <Image
                  style={styles.img}
                  resizeMode="cover"
                  source={{uri: data?.img}}
                />
                <Text style={{margin: responsiveFontSize(1)}}>
                  {data?.name}
                </Text>
              </View>
            </View>
            <View style={styles.msgCont}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  paddingHorizontal: responsiveFontSize(1),
                }}>
                {title}
              </Text>
            </View>
            <View style={styles.btnCont}>
              <Btn
                text="Yes"
                call={() => {
                  call()
                  closeModal()
                }}
                pS={{
                  width: responsiveWidth(30),
                  fontSize: responsiveFontSize(1),
                }}
                pSText={{fontSize: responsiveFontSize(1.8)}}
              />
              <Btn
                text="No"
                call={() => closeModal()}
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
  
  const styles = StyleSheet.create({
    con: {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width / 1.25,
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
      width: responsiveFontSize(10),
      height: responsiveFontSize(10),
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
  
  export default connect(null, null)(ActionModal);