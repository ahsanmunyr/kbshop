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
import DropDownComp from '../../../../components/DropDownComp';

const {width, height} = Dimensions.get('window');

const EditPreferenceModal = ({isModalVisible, closeModal,onSave}) => {
  const [weekDays, setWeekDays] = useState([
    {label: 'Sunday', value: 'sunday'},
    {label: 'Monday', value: 'monday'},
    {label: 'Tuesday', value: 'tuesday'},
    {label: 'Wednesday', value: 'wednesday'},
    {label: 'Thursday', value: 'thursday'},
    {label: 'Friday', value: 'friday'},
    {label: 'Saturday', value: 'saturday'},
  ]);
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  const [selectFirstDay, setSelectFirstDay] = useState('');
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
            style={{
              ...styles.contentContainer,
              backgroundColor: '#ffffff',
              zIndex: 9999999,
            }}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <IconCross name="cross" color={colors.blue} size={25} />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
              }}>
              <View>
                <DropDownComp
                  items={weekDays}
                  open={isOpenDrpdwn}
                  value={selectFirstDay}
                  setOpen={setIsOpenDrpdwn}
                  onSelectItem={data => setSelectFirstDay(data.value)}
                  listMode="MODAL"
                  placeholdertxt="Select Day"
                  style={{marginTop: 5, width: '80%'}}
                  dropDownContainerStyle={{
                    width: '80%',
                    alignSelf: 'center',
                    height: responsiveHeight(20),
                    zIndex: 1000,
                    elevation: 1000,
                  }}
                  textStyle={{fontSize: responsiveFontSize(1.35)}}
                />
              </View>
            </View>
          </View>
          <View style={styles.btnCont}>
            <Btn
              text="Save"
              call={() => {
                onSave("-",selectFirstDay)
                closeModal();
              }}
              pS={{
                width: responsiveWidth(30),
                fontSize: responsiveFontSize(1),
              }}
              pSText={{fontSize: responsiveFontSize(1.8)}}
            />
            <Btn
              text="Cancel"
              call={() => {
                console.log('NNNNNNNNNOOOOOOOOOOOOOOOOOO');
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

export default EditPreferenceModal;

const styles = StyleSheet.create({
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 1.25,
    height: responsiveHeight(30),
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
    // paddingRight: 10,
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
  },
});
