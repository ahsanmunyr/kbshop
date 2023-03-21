// @ts-nocheck
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import * as actions from '../../../store/actions/bioShop';
import { connect } from 'react-redux';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()

const Items2 = ({ 
  Images,
  Name,
  ID,
  categoryDataClear,
  // ParentData,
  IsActive,
  IsCustom,
  IsFeatured,
  IsSubCategory,
  OnChangeSelected,
  Selected,
  getAllPostBasedOnSubCat,
  OnChangeCat,
  ParentID,
  ChangeOffset,
  Loader,
  ShopName,
  currentItem,
  ItemValue,
  onChangeStatus,
  onChangeStatus1

}) => {
  return (

    // <View style={{ paddingTop: 2.5}}>
      <TouchableOpacity
        style={{ 
          // paddingTop: 2.5,
          // marginVertical:2.5,
          paddingVertical:responsiveFontSize(0.6)}}
        onPress={() => {
          categoryDataClear()
          Loader(true);
          onChangeStatus(true)
          onChangeStatus1(false)
          ChangeOffset(1)
          OnChangeCat({ 'ShopName': ShopName, 
          'ParentID': ParentID,
          'childID': ID, 
          'categoryName': Name, 
           'PageNo': 1, subCategory: true,
           value: ItemValue })
           OnChangeSelected(Name)
          // OnChangeSelected(Name)
          // categoriesSelected(ID, Name, USER, 1).then(() => {
          //   Loader(false);
          // });
          getAllPostBasedOnSubCat(ShopName,ID,1,ParentID,Name,currentItem, ItemValue ).then(()=>{
            Loader(false);
          })
        }}>
        <View key={ID} style={{}}>
          <View
            style={{
              shadowColor:Selected.toLowerCase() == Name.toLowerCase() ? "#000": null,
              shadowOffset: Selected.toLowerCase() == Name.toLowerCase() ? {
                width: 2,
                height: 2,
              }: {
                width: 0,
                height: 0,
              },
              borderWidth: Selected.toLowerCase() == Name.toLowerCase() ? responsiveFontSize(0.01): 1,
              borderColor: Selected.toLowerCase() == Name.toLowerCase() ? '#010b40' : '#ccc',
              // shadowOpacity: Selected.toLowerCase() == Name.toLowerCase() ? 0.25: 0,
              // shadowRadius: Selected.toLowerCase() == Name.toLowerCase() ? 3.84: 0,
              borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
              elevation: Selected.toLowerCase() == Name.toLowerCase() ? 9: 0,
              // paddingHorizontal: 4,
              backgroundColor:'white',
              // margin: 5
              //borderWidth: 1,
              //padding: 1,
              // paddingHorizontal: 4,
              marginHorizontal: 5,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              // elevation: 5,
              //borderRadius: 0,
              //borderColor: Selected.toLowerCase() == Name.toLowerCase() ? '#010b40' : '#e8e8e8',
              //width: responsiveWidth(tablet?7.5:17),
              //height: responsiveWidth(tablet?7.5:20),
            }}>
            {Images ? (
              <Image
                resizeMode="cover"
                source={{ uri: Images }}
                style={{

                  borderWidth: 1,
                  borderColor: Selected.toLowerCase() == Name.toLowerCase() ? '#010b40' : 'white',
                  width: Selected.toLowerCase() == Name.toLowerCase() ? responsiveWidth(tablet ? 11.5 : 18.5):responsiveWidth(tablet ? 11 : 18),
                  height: Selected.toLowerCase() == Name.toLowerCase() ? responsiveWidth(tablet ? 6.5 : 10.5): responsiveWidth(tablet ? 6 : 10),
                  borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5)
                  // borderColor: '#e8e8e8',
                  // width: responsiveWidth(tablet ? 7 : 18),
                  // height: responsiveWidth(tablet ? 7 : 10),
                  // borderRadius: responsiveFontSize(1)
                }}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={{ backgroundColor: 'white' }}
                source={require('../../../assets/user.png')}
              />
            )}



          </View>

          {/* <View style={{ alignSelf: 'center', top: 2, width: tablet ? 85 : 70, }}>
            <Text style={{ fontSize: responsiveFontSize(tablet ? 0.7 : 1), fontWeight: 'bold', textAlign:'center' }}>{Name}</Text>
          </View> */}

        </View>
      </TouchableOpacity>

    // </View>
  );
};
export default connect(null, actions)(Items2);