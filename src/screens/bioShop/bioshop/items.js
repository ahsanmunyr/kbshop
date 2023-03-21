import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import * as actions from '../../../store/actions/bioShop';
import {connect} from 'react-redux';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import * as subCategoryAct from '../../../store/actions/subCategoryAct';
const tablet = deviceInfo.isTablet();

const Items = ({
  ID,
  Name,
  Images,
  USER,
  Page,
  Loader,
  categoriesSelected,
  Selected,
  OnChangeSelected,
  OnChangeCat,
  bioShopPostClear,
  categoryDataClear,
  ChangeOffset,
  ChangeOff,
  getSubCategories,
  ParentID,
  OnChangeSelectedSub,
  getAllPost,
  ShopName,
  SetHasMoreFalse,
  currentItem,
  privateBio,
  ItemValue,
  onChangeStatus,
  onChangeStatus1,
  sortSelect
}) => {
  // console.log(ParentID, "SelectedSelectedSelectedSelectedSelectedSelected")
  return (
    <>
    {
      Name != 'LINKS' && Name != 'PROFILE' && (privateBio?true:(Name !="ALL POSTS")) && Name !="VIDEOS" ?
    
    <View style={{paddingTop:responsiveFontSize(0.3)}}>
      <TouchableOpacity
        onPress={() => {
          if (Name != 'ALL POSTS' && Name != 'LINKS' && Name != 'PROFILE') {
            categoryDataClear();
            sortSelect(null)
          }

          Loader(true);
          ChangeOff(1);
          ChangeOffset(1);
          OnChangeSelectedSub('');
          onChangeStatus(true)
          onChangeStatus1(false)
          // if(Name == 'VIDEOS'){
          //   getAllPost(
          //     ShopName,
          //     '20',
          //     1,
          //     'video',
          //     'shop',
          //   )
          // }


          if (Name == 'ALL POSTS') {
            SetHasMoreFalse(false)
            getAllPost(ShopName, '20', 1, 'image,campaign,video', 'shop', ItemValue);
          } else {
            OnChangeCat({
              id: ID,
              categoryName: Name,
              userName: USER,
              PageNo: 1,
              subCategory: false,

            });
            // alert(ItemValue)
            categoriesSelected(ID, Name, USER, 1,currentItem, ItemValue).then(() => {
              
              Loader(false);
             
            });
          }

          OnChangeSelected(Name);
          if (Name != 'ALL POSTS' && Name != 'LINKS' && Name != 'PROFILE') {
            let data = {
              _id: ParentID,
              subCategory: true,
            };

            getSubCategories(data);
          }
        }}>
        <View key={ID} style={{}}>
          <View
            style={{
              shadowColor:
                Selected.toLowerCase() == Name.toLowerCase() ? '#000' : null,
              shadowOffset:
                Selected.toLowerCase() == Name.toLowerCase()
                  ? {
                      width: 2,
                      height: 2,
                    }
                  : {
                      width: 0,
                      height: 0,
                    },
              borderWidth:
                Selected.toLowerCase() == Name.toLowerCase()
                  ? responsiveFontSize(0.01)
                  : 1,
              borderColor:
                Selected.toLowerCase() == Name.toLowerCase()
                  ? '#010b40'
                  : '#ccc',
              // shadowOpacity:
              //   Selected.toLowerCase() == Name.toLowerCase() ? 0.25 : 0,
              // shadowRadius:
              //   Selected.toLowerCase() == Name.toLowerCase() ? 3.84 : 0,
              borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5),
              // elevation: Selected.toLowerCase() == Name.toLowerCase() ? 9 : 0,
              // paddingHorizontal: 4,
              backgroundColor: 'white',
              margin: 5,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              // elevation: 5,
              // backgroundColor:"red"
              //borderColor: Selected.toLowerCase() == Name.toLowerCase() ? '#010b40' : '#e8e8e8',
              //width: responsiveWidth(tablet?7.5:17),
              //height: responsiveWidth(tablet?7.5:20),
            }}>
            {Images ? (
              <Image
                resizeMode="cover"
                source={{uri: Images}}
                style={{
                  borderWidth: 1,

                  //backgroundColor: 'white',
                  borderColor:
                    Selected.toLowerCase() == Name.toLowerCase()
                      ? '#010b40'
                      : 'white',
                  width:
                    Selected.toLowerCase() == Name.toLowerCase()
                      ? responsiveWidth(tablet ? 15.5 : 25.5)
                      : responsiveWidth(tablet ? 15 : 25),
                  height:
                    Selected.toLowerCase() == Name.toLowerCase()
                      ? responsiveWidth(tablet ? 10.5 : 15.5)
                      : responsiveWidth(tablet ? 10 : 15),
                  borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5)
                }}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={{backgroundColor: 'white'}}
                source={require('../../../assets/user.png')}
              />
            )}
          </View>
          {/* <View style={{alignSelf: 'flex-start', marginHorizontal: 10}}>
            <Text
              style={{
                fontSize: responsiveFontSize(tablet ? 0.6 : 1),
                fontWeight: 'bold',
              }}>
              {Name}
            </Text>
          </View> */}
          {/* {
          Selected.toLowerCase() == Name.toLowerCase() ?
          <Text style={{fontSize: responsiveFontSize(tablet?0.6:1.2), textAlign: 'center', fontWeight: 'bold', color: '#010b40'}}>{Name}</Text>:
          <Text style={{fontSize: responsiveFontSize(tablet?0.6:1.2), textAlign: 'center'}}>{Name}</Text>
        } */}
        </View>
      </TouchableOpacity>
    </View>: null
    }
    </>
  );
};
export default connect(null, {...actions, ...subCategoryAct})(Items);