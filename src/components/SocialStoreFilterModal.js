// @ts-nocheck
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { connect } from 'react-redux';
import rowFormat from '../utils/rowFormate';
import NotFound from '../components/NotFound';
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import rowFormate from '../../src/utils/rowFormate';
import { ScrollView } from 'react-native-gesture-handler';
import * as catAct from '../store/actions/category';
import * as subCatAct from '../store/actions/subCategoryAct';
import * as actions from '../store/actions/bioShop';
import Hr from './hr';
import colors from '../assets/colors/colors';
import HalfBtn from './halfBtn';
import Btn from './Btn';
import Loader from './Loader';
import { useDispatch } from 'react-redux';

const tablet = deviceInfoModule.isTablet();

const SocialStoreFilterModal = ({
  categories,
  closeModle,
  visible,
  getCategories,
  getSubCategories,
  subCategoryRed,
  onGetIds,
  showSelectedEventTypesEvent,
  categoriesOfBioShop,
  authRed,
  bioShopClearSub,
  bioShopClear,
  setCurrentItem,
  setValue,
  setOffset,
  setOffsetCat,
  setOffSubsetCat,
  onChangeBtn,
  onChangeCategoryItemStatus,
  onChangeCategoryItem,
  ShopName,
  onChangeCategoryItemAllStatus
  // setEventType,
  // eventType,
  // sortBy,
  // onChangeSortBy
}) => {
  const dispatch = useDispatch();
  // console.log(categoriesOfBioShop, "categoriesOfBioShop")
  const [sortBy, onChangeSortBy] = useState('date');
  const [category, onChangeCategory] = useState([0]);
  const [categoryItems, onChangeCategoryItems] = useState({});
  const [subCategory, onChangeSubCategory] = useState([]);
  const [eventType, setEventType] = useState('all');
  const [subCategoryLoader, setSubCategoryLoader] = useState(false);
  

  const allArrayObj = [{
    category_id: 0,
    category_name: 'All',
    parent_id: 1
  }]
  let categoryArray = [...allArrayObj,...categoriesOfBioShop]
  useEffect(() => {
    //   getCategories();
    // getSubCategories()
    //   setEventType(showSelectedEventTypesEvent.eventType)
    //   onChangeCategory([...showSelectedEventTypesEvent.catID])
    //   onChangeSortBy(showSelectedEventTypesEvent.filterBy)
  }, []);


  useEffect(() => {

    if (category.length > 0) {
      setSubCategoryLoader(true)
      let data = {
        _id: category[0],
        bioShop: true
      }
      getSubCategories(data).then(() => {
        setSubCategoryLoader(false)
      })
      // console.log("category", data._id);
    }
  }, [category])

  const SelectableCatBtns = ({
    title,
    id,
    value,
    onChangeCategories,
    categories,
  }) => {
    return (
      <TouchableOpacity
        disabled={category.includes(id) ? true : false}
        onPress={() => {
          onChangeCategories(() => [id]);
          onChangeCategoryItems({
            id: id,
            name: title
          })
        }}
        key={id}
        style={[
          styles.squaredBtn,
          {
            marginVertical: responsiveFontSize(0.4),
            backgroundColor: category.includes(id) ? colors.themeblue : 'white',
          },
        ]}>
        <Text
          style={{
            fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
            color: category.includes(id) ? 'white' : colors.themeblue,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };


  const SelectableSubCatBtns = ({
    title,
    id,
    value,
    onChangeSubCategory,
    subCategory,
  }) => {
    return (
      <TouchableOpacity
        disabled={subCategory.includes(id) ? true : false}
        onPress={() => {
          onChangeSubCategory(() => [id]);
        }}
        key={id}
        style={[
          styles.squaredBtn,
          {
            marginVertical: responsiveFontSize(0.4),
            backgroundColor: subCategory.includes(id) ? colors.themeblue : 'white',
            width: responsiveScreenFontSize(16)
          },
        ]}>
        <Text
          style={{
            fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
            color: subCategory.includes(id) ? 'white' : colors.themeblue,
            textAlign: 'center'
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  function renderItem({ item, index }) {
    
    return (
      <View key={index}>
        {item.map((it, i) => (
          <SelectableCatBtns
            categories={category}
            onChangeCategories={onChangeCategory}
            value={i}
            id={it?.category_id}
            title={it?.category_name}
            key={i}
          />
        ))}
      </View>
    );
  }

  function renderItem1({ item, index }) {
    return (
      <View key={index}>
        {item.map((it, i) => (
          <SelectableSubCatBtns
            subCategory={subCategory}
            onChangeSubCategory={onChangeSubCategory}
            value={i}
            id={it._id}
            title={it.category_name}
            key={i}
          />
        ))}
      </View>
    );
  }

  function modalCloseFunc() {

    // console.log(category[0], "category")
    if (sortBy != '' || eventType != '') {
      onChangeCategoryItemAllStatus(false)
      onChangeCategoryItemStatus(false)
      let eventTypo = eventType == 'all' ? '' : eventType
      // if(category[0])
  
      if(category[0] != 0){
        if(category.length > 0){
          onChangeCategoryItemStatus(true)
          onChangeCategoryItem({
            id: categoryItems.id,
            categoryName: categoryItems.name,
            userName: ShopName,
            PageNo: 1,
            subCategory: false,
          })
          }
      }
      if(category[0] == 0){
        onChangeCategoryItemStatus(false)
        onChangeCategoryItemAllStatus(true)
        onChangeCategoryItem({
          id: categoryItems.id,
          categoryName: categoryItems.name,
          userName: ShopName,
          PageNo: 1,
          subCategory: false,
        })
       
      }
      
      setValue(sortBy)
      setCurrentItem(eventTypo)
      dispatch({ type: "CLEAR_SUB_CATGORIES" })
      bioShopClearSub()
      closeModle()
      onChangeBtn(true)
    }
  }

  let sortByCustomer = [{ name: 'Date', value: 'date' }, { name: 'Top Discount', value: 'topdiscount' }, { name: 'Referral Fee', value: 'referralfee' }]
  let sortByInfluencer = [{ name: 'Date', value: 'date' }, { name: 'Top Discount', value: 'topdiscount' }, { name: 'Influencer Fee', value: 'influencerfee' }]
  let postType = [{ name: 'All', value: 'all' }, { name: 'Simple Posts', value: 'image' }, { name: 'Video Posts', value: 'video' }]

 


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
      <View style={styles.modalCont}>
        <View style={styles.modalView}>
          <View style={styles.modalHeadCont}>
            <TouchableOpacity onPress={closeModle} style={styles.crossBtn}>
              <CrossIcon
                name="cross"
                size={responsiveFontSize(tablet ? 2 : 3)}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalBody}>
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                  color: 'rgb(7, 13, 46)',
                }}>
                Sort By
              </Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={authRed.data.account_type == 'customer' ? sortByCustomer : sortByInfluencer}
                  renderItem={({ item, i }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // if (sortBy == item.value) {
                          //   onChangeSortBy('');
                          // } else {
                            // if(item.value == 'topdiscount' || item.value == 'referralfee' || item.value == 'influencerfee' ){
                            //   // onChangeCategory()
                            //   onChangeCategory([categoryArray[0].category_id])
                            //   onChangeCategoryItems({
                            //     id: categoryArray[0].category_id,
                            //     name: categoryArray[0].category_name
                            //   })
                            //   // console.log(categoriesOfBioShop[0].category_id)
                            // }
                            onChangeSortBy(item.value);
                          // }
                        }}
                        key={i}
                        style={[
                          styles.squaredBtn,
                          {
                            backgroundColor:
                              sortBy == item.value ? colors.themeblue : 'white',
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
                            color: sortBy == item.value ? 'white' : colors.themeblue,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                  color: 'rgb(7, 13, 46)',
                }}>
                Post Type
              </Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={postType}
                  renderItem={({ item, i }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // if (eventType == item.value) {
                          //   setEventType('');
                          // } else {
                            // console.log(item.value);
                            // if(item.value == 'image' || item.value == 'video'){
                            //   // onChangeCategory()
                            //   onChangeCategory([categoryArray[0].category_id])
                            //   onChangeCategoryItems({
                            //     id: categoryArray[0].category_id,
                            //     name: categoryArray[0].category_name
                            //   })
                            //   // console.log(categoriesOfBioShop[0].category_id)
                            // }
                            setEventType(item.value);
                          // }
                        }}
                        key={i}
                        style={[
                          styles.squaredBtn,
                          {
                            backgroundColor:
                              eventType == item.value ? colors.themeblue : 'white',
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
                            color:
                              eventType == item.value ? 'white' : colors.themeblue,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                    color: 'rgb(7, 13, 46)',
                  }}>
                  Category
                </Text>
                <View style={styles.sortByCont}>
             
                  <FlatList
                    data={rowFormat(categoryArray, 3)}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => i.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<NotFound text={'No Category Found'} />}
                  />
                </View>
              {/* <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                    color: 'rgb(7, 13, 46)',
                  }}>
                  Category
                </Text>
                <View style={styles.sortByCont}>
                  <FlatList
                    data={rowFormat(categoriesOfBioShop, 3)}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => item[0].parent_id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<NotFound text={'No Category Found'} />}
                  />
                </View>
                {console.log('subCategoryRed',subCategoryRed, "subCategoryRed")}
                {
                    !subCategoryLoader ?
                    <>
                    <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                      color: 'rgb(7, 13, 46)',
                    }}>
                    Subcategories 
                  </Text>
                  <View style={styles.sortByCont}>
                    <FlatList
                      data={rowFormat(subCategoryRed, 3)}
                      renderItem={renderItem1}
                      keyExtractor={(item, i) => item[0]._id}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      ListEmptyComponent={<NotFound text={'No Subcategories Found'} />}
                    />
                  </View>
                  </>: <Loader />
                } */}

            </View>
          </ScrollView>
        </View>
        <View>
          <Hr />
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingVertical: responsiveHeight(1.5),
            }}>
            <Btn
              text={'Reset All'}
              call={() => {
                onChangeCategory([]);
                setEventType('');
                onChangeSortBy("")
              }}
              color={'#fff'}
              pS={{
                width: '38%',
                borderWidth: 0.5,
                borderColor: '#ccc',
                height: responsiveHeight(4),
              }}
              pSText={{ color: '#000' }}
            />
            <Btn
              text={'Apply'}
              call={() => {
                modalCloseFunc();
                //   onGetIds(category);
                //   filterByEventType(eventType,category,sortBy)
              }}
              pS={{
                width: '58%',
                height: responsiveHeight(4),
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

function mapStateToProps({ categories, subCategoryRed, authRed }) {
  return {
    categories,
    subCategoryRed,
    authRed
  };
}

export default connect(mapStateToProps, { ...catAct, ...subCatAct, ...actions })(
  SocialStoreFilterModal,
);

const styles = StyleSheet.create({
  btn: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(20),
    margin: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: responsiveWidth(100),
    // height: responsiveHeight(tablet ? 40 : 55),
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // padding: 25,
    // paddingVertical:25,
    paddingTop: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeadCont: {
    alignSelf: 'flex-end',
  },
  crossBtn: {
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    width: responsiveWidth(6),
  },
  modalBody: {},
  sortByCont: {
    marginVertical: responsiveHeight(1),
  },
  squaredBtn: {
    borderWidth: 1,
    borderColor: colors.themeblue,
    borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
    marginRight: responsiveFontSize(1.5),
    width: responsiveFontSize(tablet ? 8 : 12),
    height: responsiveHeight(5.5),
    paddingVertical: responsiveHeight(0.7),
    justifyContent: 'center',
    alignItems: 'center',
  },

  //   borderWidth: 1,
  //   borderColor: colors.themeblue,
  //   borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
  //   marginRight: responsiveFontSize(1),
  //   width: responsiveFontSize(tablet ? 8 : 12),
  //   height: responsiveHeight(5),
  //   paddingVertical: responsiveHeight(0.7),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginVertical: responsiveFontSize(0.4),
});
