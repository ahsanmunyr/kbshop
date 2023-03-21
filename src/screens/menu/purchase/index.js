import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as purchaseAct from '../../../store/actions/purchaseAct';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import colors from '../../../assets/colors/colors';
import BackIcon from 'react-native-vector-icons/Ionicons';
import NotFound from '../../../components/NotFound';
import PuchaseItemCard from '../../../components/PuchaseItemCard';
import Loader from '../../../components/Loader';
import moment from 'moment';
import Btn from '../../../components/Btn';
import DateTimePicker from 'react-native-modal-datetime-picker';

const tablet = deviceInfo.isTablet();

const Purchase = ({purchasesRed, getPurchases, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  // Filter
  const [filter, setFilter] = useState({
    startDate: moment().startOf('month'),
    endDate: moment(),
  });
  // Date picker
  const [isShowStartDatePicker, setIsShowStartDatePicker] = useState(false);
  const [isShowEndDatePicker, setIsShowEndDatePicker] = useState(false);
  // Set filter
  const getValue = (k, v) => {
    setFilter({...filter, [k]: v});
  };
  // onchange in date picker
  const onChangeStartDate = selectedDate => {
    setIsShowStartDatePicker(false);
    getValue('startDate', moment(selectedDate).format('YYYY-MM-DD'));
  };
  const onChangeEndDate = selectedDate => {
    setIsShowEndDatePicker(false);
    getValue('endDate', moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    // console.log(
    //   moment(filter.startDate).format('YYYY-MM-DD'),
    //   '___________',
    //   moment(filter.endDate).format('YYYY-MM-DD'),
    // );
    getPurchases(
      pageNo,
      moment(filter.startDate).format('YYYY-MM-DD'),
      moment(filter.endDate).format('YYYY-MM-DD'),
    ).then(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onPressSearch = () => {
    setLoading(true);
    getPurchases(
      pageNo,
      moment(filter.startDate).format('YYYY-MM-DD'),
      moment(filter.endDate).format('YYYY-MM-DD'),
    ).then(() => setLoading(false));
  };

  return (
    <>
      <View style={{flex: 1, padding: responsiveFontSize(tablet ? 0.5 : 1), backgroundColor:'white'}}>
        <View style={styles.hdCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate('menu')}
            style={styles.backBtn}>
            <BackIcon
              name="arrow-back"
              style={{right: 10}}
              size={responsiveFontSize(tablet ? 2 : 3)}
              color={colors.themeblue}
            />
          </TouchableOpacity>
          <Text style={styles.hd}>Purchases</Text>
        </View>
        <View style={styles.filterCont}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(tablet ? 0.75 : 1.35),
                marginBottom: '4%',
              }}>
              Start Date
            </Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setIsShowStartDatePicker(true)}>
              <Text
                style={{fontSize: responsiveFontSize(tablet ? 0.75 : 1.35), color:colors.themeblue, fontWeight:'bold'}}>
                {moment(filter.startDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(tablet ? 0.75 : 1.35),
                marginBottom: '4%',
              }}>
              End Date
            </Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setIsShowEndDatePicker(true)}>
              <Text
                style={{fontSize: responsiveFontSize(tablet ? 0.75 : 1.35), color:colors.themeblue, fontWeight:'bold'}}>
                {moment(filter.endDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            text={'Search'}
            pS={styles.filterBtn}
            pSText={styles.filterBtnTxt}
            call={onPressSearch}
          />
        </View>
        {loading ? (
          <View
            style={{
              marginTop: responsiveHeight(5),
            }}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={purchasesRed?.data}
            renderItem={({item}) => <PuchaseItemCard data={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={() => <NotFound text={'No Data Found'} />}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadMore()}
            // ListFooterComponent={renderFooter}
          />
        )}
        <DateTimePicker
          isVisible={isShowStartDatePicker}
          testID="dateTimePicker"
          value={new Date(filter.startDate)}
          mode="date"
          is24Hour={true}
          onConfirm={onChangeStartDate}
          onCancel={() => setIsShowStartDatePicker(false)}
        />
        <DateTimePicker
          isVisible={isShowEndDatePicker}
          testID="dateTimePicker"
          value={new Date(filter.endDate)}
          mode="date"
          is24Hour={true}
          onConfirm={onChangeEndDate}
          onCancel={() => setIsShowEndDatePicker(false)}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({purchasesRed}) => {
  return {purchasesRed};
};

export default connect(mapStateToProps, purchaseAct)(Purchase);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },
  hdCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: responsiveHeight(2.5),
    left: responsiveFontSize(2),
  },
  hd: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2.2),
    color: colors.themeblue,
    fontWeight: 'bold',
  },
  filterCont: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  datePicker: {
    backgroundColor: '#f5f5f5',
    padding: 6,
    height: responsiveHeight(5.3),
    borderRadius: responsiveFontSize(0.5),
    elevation: 2,
    width: responsiveWidth(30),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  filterBtn: {
    width: responsiveWidth(32),
    height: responsiveHeight(5.5),
  },
  filterBtnTxt: {
    fontSize: responsiveFontSize(1.2),
  },
});
