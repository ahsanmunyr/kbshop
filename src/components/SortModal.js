import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert, Dimensions
} from 'react-native';
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as catAct from "../store/actions/category"
import colors from '../assets/colors/colors';
import { connect } from 'react-redux';
import RadioButtonRN from 'radio-buttons-react-native';
import deviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');
import CloseIcon from "react-native-vector-icons/MaterialIcons"
const tablet = deviceInfo.isTablet();


const SortModal = ({ visible, closeModle, sortType, getBrandInfluencers, id, func, infl, a }) => {
  const [checked, setChecked] = useState(0);


  const apply = () => {
    func(checked)
    a('all')
    closeModle()
    // if(sortType === 'categoryBrand'){
    //   if(checked == '0'){
    //     getBrandInfluencers(1, id, null, 'brand' )
    //   }else{
    //     getBrandInfluencers(1, id, null, 'brand',  checked)
    //   }
    // }

  }

  const data = [
    {
      label: "Top Discount",
      value: "all"
    },
    {
      label: "Alphabetical: A to Z",
      value: 1
    },
    {
      label: "Alphabetical: Z to A",
      value: -1
    }
  ]
  const data2 = [
    {
      label: "Alphabetical: A to Z",
      value: 1
    },
    {
      label: "Alphabetical: Z to A",
      value: -1
    }
  ]

  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{
        flex: 1,
        justifyContent: 'center',
        elevation: 5,
      }}
      onRequestClose={closeModle}
      statusBarTranslucent={true}
      visible={visible}>
   

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View style={{flexDirection:'row'}}> */}
              <Text style={styles.modalText}>Sort</Text>
              
            <View
              style={{
                width: responsiveWidth(80),
                // height: responsiveHeight(15),
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  width: '100%'
                }}
              >
                <RadioButtonRN
                  animationTypes={['pulse']}
                  box={false}
                  initial={1}
                  data={infl ? data2 : data}
                  activeColor={colors.themeblue}
                  selectedBtn={(e) => setChecked(e.value)}
                  textStyle={{ fontSize: responsiveFontSize(tablet ? 0.9 : 1.5) }}
                />
              </View>
            </View>
            <View
              style={{
                width: responsiveWidth(80),
                height: responsiveHeight(8),
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                onPress={() => {
                  apply()
                  // closeModle()
                }}
                style={{
                  backgroundColor: colors.themeblue,
                  width: responsiveWidth(76),
                  height: responsiveHeight(4.5),
                  borderRadius: 25,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: responsiveFontSize(tablet ? 1 : 2),
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
   
    </Modal>
  );
}
function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, catAct)(SortModal)


const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(1),
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: 'rgb(7, 13, 46)',
  },
  headCon: {
    marginTop: responsiveFontSize(tablet ? 1 : 2),
    paddingHorizontal: responsiveFontSize(1),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    // margin: 20,
    width: responsiveWidth(100),
    height: responsiveHeight(tablet ? 30 : 40),
    backgroundColor: 'white',
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: responsiveFontSize(tablet ? 1.5 : 2.5),
    fontWeight: '900',
    color: 'black',
  },
});
