import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity,Platform } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Sale from './Sale'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { connect, useDispatch } from 'react-redux'
import * as campAct from "../../../store/actions/campaignsAct"
import Loader from "../../../components/Loader"
import { FlatList } from 'react-native-gesture-handler'
import NotFound from "../../../components/NotFound"
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Btn from '../../../components/Btn'
import DropDownComp from '../../../components/DropDownComp'
import moment from 'moment';
import deviceInfo from "react-native-device-info"
import colors from '../../../assets/colors/colors'
import BackIcon from 'react-native-vector-icons/Ionicons';

const tablet=deviceInfo.isTablet()
function Earning({ sales, getSales }) {
  const [loading, setLoading] = useState(true)
  // dropdown
  const [groupByOptions, setGroupByOptions] = useState([
    { label: 'Summary', value: 'influencer' },
    { label: 'Detailed', value: '' },
    { label: 'Date', value: 'date' },
    { label: 'Campaign', value: 'campaign' },
    { label: 'Brand', value: 'brand' },
  ]);
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  // Date picker
  const [isShowStartDatePicker, setIsShowStartDatePicker] = useState(false);
  const [isShowEndDatePicker, setIsShowEndDatePicker] = useState(false);
  // Filter
  const [filter, setFilter] = useState({
    startDate: moment().startOf("month"),
    endDate: moment(),
    groupBy: "influencer"
  })
  // Set filter
  const getValue = (k, v) => {
    setFilter({ ...filter, [k]: v });
  }
  // onchange in date picker
  const onChangeStartDate = (selectedDate) => {
    setIsShowStartDatePicker(false);
    getValue("startDate", moment(selectedDate).format("YYYY-MM-DD"));
  };
  const onChangeEndDate = (selectedDate) => {
    setIsShowEndDatePicker(false);
    getValue("endDate", moment(selectedDate).format("YYYY-MM-DD"));
  };

  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    getSales(1, filter.groupBy, moment(filter.startDate).format("YYYY-MM-DD"), moment(filter.endDate).format("YYYY-MM-DD"))
      .then(() => setLoading(false))
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true)
      dispatch({ type: "clearAllSales" })
    });

    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    return () => dispatch({ type: "clearAllSales" })
  }, [])

  const onPressSearch = () => {
    dispatch({ type: "clearAllSales" });
    setLoading(true)
    getSales(1, filter.groupBy, moment(filter.startDate).format("YYYY-MM-DD"), moment(filter.endDate).format("YYYY-MM-DD"))
      .then(() => setLoading(false))
  }
  const onPressRefresh = () => {
    dispatch({ type: "clearAllSales" });
    getValue("startDate", moment().format("YYYY-MM-DD"));
    getValue("endDate", moment().add(5, "d").format("YYYY-MM-DD"));
    getValue('groupBy', "")
    setLoading(true)
    getSales(1, "", moment().format("YYYY-MM-DD"), moment().add(5, "d").format("YYYY-MM-DD"))
      .then(() => setLoading(false))
  }

  function renderFooter() {
    return (
      <>
        {sales.totalCount > sales.message.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if (sales.totalCount > sales.message.data.length) {
      getSales(sales.pagination?.next?.page, "all", "2021-08-10", "2022-08-10")
    }
  }, [sales.pagination?.next?.page]);

  return (
    <>
      <View style={styles.hdCont}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <BackIcon
            name="arrow-back"
            style={{right: 10}} 
            size={responsiveFontSize(tablet ? 2 : 3)}
            color={colors.themeblue}
          />
        </TouchableOpacity>
        <Text style={styles.hd}>Earnings</Text>
      </View>
      <View style={{ flex: 1, padding: responsiveFontSize(tablet?0.5:1),width: tablet?'93.5%':'94%',alignSelf:'center' }}>
        <View style={styles.filterCont}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(tablet?0.75:1.35),
                marginBottom:"4%"
              }}>
              Start Date
            </Text>
            <TouchableOpacity style={styles.datePicker} onPress={() => setIsShowStartDatePicker(true)}>
              <Text style={{ fontSize: responsiveFontSize(tablet?0.75:1.35) }}>
                {moment(filter.startDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(tablet?0.75:1.35),
                marginBottom:"4%"
              }}>
              End Date
            </Text>
            <TouchableOpacity style={styles.datePicker} onPress={() => setIsShowEndDatePicker(true)}>
              <Text style={{ fontSize: responsiveFontSize(tablet?0.75:1.35) }}>
                {moment(filter.endDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet?0.75:1.35),marginBottom:"4%",marginLeft:responsiveFontSize(tablet?0.25:0.5) }}>
              Group By
            </Text>
            <DropDownComp
              items={groupByOptions}
              open={isOpenDrpdwn}
              value={filter.groupBy}
              setOpen={setIsOpenDrpdwn}
              onSelectItem={data => getValue('groupBy', data.value)}
              listMode="SCROLLVIEW"
              placeholdertxt="Gender"
              style={{ width: responsiveWidth(25),height:responsiveHeight(5.5) }}
              containerStyle={{ width: responsiveWidth(25) }}
              dropDownContainerStyle={{ width: responsiveWidth(25) }}
              textStyle={{ fontSize: responsiveFontSize(tablet?0.75:1.3) }}
              tickIconStyle={{
                width: responsiveFontSize(1.4),
                height: responsiveFontSize(1.4),
              }}
            />
          </View>
          <Btn text={"Search"} pS={styles.filterBtn} pSText={styles.filterBtnTxt} call={onPressSearch} />
        </View>
        {loading ? <Loader /> : (
          <FlatList
            style={{zIndex:(isOpenDrpdwn && Platform.OS=="ios")?-5:1}}
            data={sales?.message?.data}
            renderItem={({ item }) => <Sale data={item} groupBy={filter.groupBy} />}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={<NotFound text={"No Transaction Found"}/>}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            onEndReached={loadMore}
            ListFooterComponent={renderFooter}
          />
        )}
          <DateTimePicker
            isVisible={isShowStartDatePicker}
            testID="dateTimePicker"
            value={new Date(filter.startDate)}
            mode="date"
            is24Hour={true}
            onConfirm={onChangeStartDate}
            onCancel={()=>setIsShowStartDatePicker(false)}

          />
          <DateTimePicker
          isVisible={isShowEndDatePicker}
            testID="dateTimePicker"
            value={new Date(filter.endDate)}
            mode="date"
            is24Hour={true}
            onConfirm={onChangeEndDate}
            onCancel={()=>setIsShowEndDatePicker(false)}
          />
      </View>
    </>
  )
}

function mapStateToProps({ sales }) {
  return { sales }
}
export default connect(mapStateToProps, campAct)(Earning)
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
  filterCont: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    // backgroundColor: "red"
  },
  filterBtn: {
    width: "15%",
    height: responsiveHeight(5.5)
  },
  filterBtnTxt: {
    fontSize: responsiveFontSize(1.2)
  },
  datePickerBtn: {
    backgroundColor: 'white',
    padding: 6,
    height: responsiveHeight(5.45),
    borderRadius: responsiveFontSize(0.5),
    elevation: 2,
  },
  datePicker: {
    backgroundColor: 'white',
    padding: 6,
    height: responsiveHeight(5.3),
    borderRadius: responsiveFontSize(0.5),
    elevation: 2,
    width: responsiveWidth(23),
    justifyContent:"center",
  },
  hdCont: {
    width: tablet?'93.5%':'94%',
    alignSelf:'center',
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
})