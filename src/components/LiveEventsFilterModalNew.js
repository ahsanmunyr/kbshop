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
import Hr from './hr';
import colors from '../assets/colors/colors';
import HalfBtn from './halfBtn';
import Btn from './Btn';

const tablet = deviceInfoModule.isTablet();

const LiveEventsFilterModalNew = ({
  categories,
  closeModle,
  visible,
  getCategories,
  getSubCategories,
  subCategoryRed,
  onGetIds,
  filterByEventType,
  showSelectedEventTypesEvent,
  shows
}) => {
  const [sortBy, onChangeSortBy] = useState('');
  const [category, onChangeCategory] = useState([]);
  const [eventType, setEventType] = useState('');
  useEffect(() => {
    getCategories();
    // getSubCategories()
    setEventType(showSelectedEventTypesEvent.eventType)
    onChangeCategory([...showSelectedEventTypesEvent.catID])
    onChangeSortBy(showSelectedEventTypesEvent.filterBy)
  }, []);

  const SelectableBtns = ({
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

  function renderItem({ item, index }) {
    return (
      <View key={index}>
        {item.map((it, i) => (
          <SelectableBtns
            categories={category}
            onChangeCategories={onChangeCategory}
            value={i}
            id={it._id}
            title={it.category_name}
            key={i}
          />
        ))}
      </View>
    );
  }
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
          <View style={[{ ...styles.modalHeadCont }, { flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
            {shows ? (
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                  color: 'rgb(7, 13, 46)',
                }}>
                Event Type
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                  color: 'rgb(7, 13, 46)',
                }}>
                Category
              </Text>
            )}
            <TouchableOpacity onPress={closeModle} style={styles.crossBtn}>
              <CrossIcon
                name="cross"
                size={responsiveFontSize(tablet ? 2 : 3)}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalBody}>
              {shows && (
                <>
                  <View style={styles.sortByCont}>
                    <FlatList
                      data={['Live', 'Recorded', 'Upcoming']}
                      renderItem={({ item, i }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              if (eventType == item) {
                                setEventType('');
                              } else {
                                setEventType(item);
                              }
                            }}
                            key={i}
                            style={[
                              styles.squaredBtn,
                              {
                                backgroundColor:
                                  eventType == item ? colors.themeblue : 'white',
                              },
                            ]}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
                                color:
                                  eventType == item ? 'white' : colors.themeblue,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item, i) => i.toString()}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View></>
              )}


              {/* <Text
                style={{
                  fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                  color: 'rgb(7, 13, 46)',
                }}>
                Filter By
              </Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={['BRAND', 'INFLUENCER']}
                  renderItem={({item, i}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (sortBy == item) {
                            onChangeSortBy('');
                          } else {
                            onChangeSortBy(item);
                          }
                        }}
                        key={i}
                        style={[
                          styles.squaredBtn,
                          {
                            backgroundColor:
                              sortBy == item ? colors.themeblue : 'white',
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(tablet ? 0.8 : 1.5),
                            color: sortBy == item ? 'white' : colors.themeblue,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View> */}
              <View style={styles.sortByCont}>
                <FlatList
                  data={rowFormat(categories, 3)}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => item[0]._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<NotFound text={'No Category Found'} />}
                />
              </View>
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
                // setEventType('');
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
                closeModle();
                // if(category.length>0){
                onGetIds(category)
                // }else{
                //   onGetIds
                // }
                filterByEventType(eventType, category, sortBy)
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

function mapStateToProps({ categories, subCategoryRed }) {
  return {
    categories,
    subCategoryRed,
  };
}

export default connect(mapStateToProps, { ...catAct, ...subCatAct })(
  LiveEventsFilterModalNew,
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
    paddingTop: tablet ? responsiveHeight(0.7) : 25,
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
    height: responsiveHeight(5),
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
