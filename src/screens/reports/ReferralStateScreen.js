import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import NotFound from '../../components/NotFound';
import Item from './CustomChild/Item';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';
import numeral from 'numeral';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FilterModal from './CustomChild/FilterModal';
import ItemDetailModal from './CustomChild/ItemDetailModal';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import * as reportAct from '../../store/actions/ReportsAct';
import Hr from './CustomChild/Hr';
import DataRow from './CustomChild/DataRow';
import {color} from 'react-native-reanimated';
import deviceInfoModule from 'react-native-device-info';

const tablet = deviceInfoModule.isTablet();

const ListHeaderItem = ({value}) => {
  return <Text style={styles.headerItemText}>{value}</Text>;
};

function ReferralScreen({get_referral_stats, referralStatsRed}) {
  const [pageNo, setPageNo] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    let from_date = moment().subtract(16
      , 'd').format('YYYY-MM-DD');
    let to_date = moment().format('YYYY-MM-DD');
    filter(pageNo, from_date, 'share', 'all', to_date);
  }, []);

  const filter = (pageNo, from_date, to_date, source, sort_by) => {
    // console.log({pageNo, from_date, sort_by, source, to_date},"filteconsole ")
    // 25,startdate,enddate,'all','none'
    get_referral_stats(pageNo, from_date, sort_by, source, to_date);
  };

  useEffect(() => {
    setSummaryData(referralStatsRed.summary[0]);
    setDataList(referralStatsRed.data);
  }, [referralStatsRed]);

  const renderFooter = () => {
    return (
      <View style={styles.summaryCont}>
        <View
          style={{
            width: '100%',
            // height: responsiveScreenFontSize(26),
            alignSelf: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontWeight: '900',
              fontSize: responsiveScreenFontSize(tablet ? 1.3 : 3),
              color: 'black',
            }}>
            Summary
          </Text>
          <Hr />
          <DataRow name={'Shares'} value={summaryData?.shares} />
          <Hr />
          <DataRow name={'Views'} value={summaryData?.views} />
          <Hr />
          <DataRow name={'Order'} value={summaryData?.order_count} />
          <Hr />
          <DataRow name={'Quantity'} value={summaryData?.total_qty} />
          <Hr />
          <DataRow
            name={'Price'}
            value={`$${numeral(summaryData?.total_sale).format('0,0.00')}`}
          />
          <Hr />
          <DataRow
            name={'Total Discount'}
            value={`$${numeral(summaryData?.discount).format('0,0.00')}`}
          />
          <Hr />
          <DataRow
            name={'Total Amount Paid'}
            value={`$${numeral(summaryData?.order_totalprice).format(
              '0,0.00',
            )}`}
          />
          <Hr />
          <DataRow
            name={'Total Referral Commission'}
            value={numeral(summaryData?.customer_commission).format('0,0.00')}
          />
        </View>
      </View>
    );
  };
  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // onSetmodalOpen(!modalOpen);
        }}
        style={{
          width: '100%',
          // height: responsiveScreenFontSize(6),
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.listItem,
            {
              width: '7%',
            },
          ]}>
          <Text
            style={[
              styles.listItemText,
              {
                textAlign: 'center',
              },
            ]}>
            {index + 1}
          </Text>
        </View>
        <View
          style={[
            styles.listItem,
            {
              width: '20%',
            },
          ]}>
          <Text style={styles.listItemText}>
            {'post' in item
              ? item?.postcategory?.category_name
              : item?.eventcategory?.category_name}
          </Text>
        </View>
        <View
          style={[
            styles.listItem,
            {
              width: '15%',
            },
          ]}>
          <Text style={styles.listItemText}>{item?.order_count}</Text>
        </View>
        <View
          style={[
            styles.listItem,
            {
              width: '16%',
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={styles.listItemText}>
            {'post' in item ? 'Social Store' : 'Event'}
            {/* {data?.event == 'eventshop' ? 'Event' : 'Social Store'} */}
          </Text>
        </View>
        <View
          style={[
            styles.listItem,
            {
              width: '15%',
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={styles.listItemText}>
            {'post' in item ? item?.postbrand?.name : item?.eventbrand?.name}
          </Text>
        </View>
        <View
          style={[
            styles.listItem,
            {
              width: '7%',
            },
          ]}>
          <Text style={styles.listItemText}>{item?.total_qty}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <>
      {
        isFilterModalOpen &&
        <FilterModal open={isFilterModalOpen} functionOfFilter={filter} close={setIsFilterModalOpen} isReferralStatusFilter={true} />
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataList}
        ListFooterComponent={renderFooter()}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={
          <>
            <View style={styles.headerCont}>
              {[
                {name: 'S.#', width: '6%'},
                {name: 'Category', width: '20%'},
                {name: 'No. Of Orders', width: '15%'},
                {name: 'Source', width: '16%'},
                {name: 'Brand', width: '15%'},
                {name: 'Qty', width: '16%'},
              ].map((item, i) => (
                <View key={i} style={[styles.headerItem, {width: item.width}]}>
                  <ListHeaderItem value={item.name} />
                </View>
              ))}
            </View>
          </>
        }
        renderItem={renderItem}
        ListEmptyComponent={() => <NotFound text="No Data" />}
        keyExtractor={(item, i) => i.toString()}
      />
      <TouchableOpacity 
        style={styles.filterCont}  
        onPress={() => {
            setIsFilterModalOpen(true)
        }}
      >
        <View style={styles.filterSubCont}>
          <Text style={styles.filterBtnText}>Filter</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  headerCont: {
    width: '100%',
    paddingVertical: responsiveHeight(0.5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.themeblue,
  },
  headerItem: {
    // height: responsiveScreenFontSize(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCont: {
    width: '87%',
    backgroundColor: 'white',
    alignSelf: 'center',
    // marginVertical: responsiveScreenFontSize(0.5),
    // borderWidth: responsiveScreenFontSize(0.1),
    // borderRadius: responsiveScreenFontSize(1),
    // paddingHorizontal: responsiveScreenFontSize(1.5),
    // paddingVertical: responsiveScreenFontSize(1.5),
    marginVertical: responsiveHeight(0.5),
    borderWidth: responsiveFontSize(0.1),
    borderRadius: responsiveFontSize(0.5),
    paddingHorizontal: "2%",
    paddingVertical: responsiveHeight(1.5),
  },
  itemSeparator: {
    height: responsiveHeight(0.05),
    backgroundColor: 'grey',
    width: '100%',
  },
  headerItemText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),
    // fontWeight: '800',
  },
  listItem: {
    // height: responsiveScreenFontSize(6),
    paddingVertical:responsiveHeight(tablet ? 1 : 1.8),
    justifyContent: 'center',
    alignItems: tablet ? 'flex-start' : 'center',
    // backgroundColor:"red"
  },
  listItemText: {
    fontSize: responsiveFontSize(tablet ? 1 : 1.5),
    color: colors.themeblue,
    fontWeight: '300',
    textAlign: 'left',
  },
  filterCont:{
    height: responsiveFontSize(8),
    width: responsiveFontSize(8),
    borderRadius: responsiveFontSize(50),
    position: 'absolute',
    bottom: "6%", 
    right: 20, 
  },
  filterSubCont:{
    height: responsiveFontSize(tablet ? 5.5 : 8),
    width: responsiveFontSize(tablet ? 5.5 : 8),
    borderRadius: responsiveFontSize(50),
    backgroundColor: colors.themeblue,
    justifyContent: 'center', alignItems: 'center'
  },
  filterBtnText:{
    color: 'white', 
    textAlign: 'center', 
    // fontWeight: '900', 
    fontSize: responsiveFontSize(tablet ? 1.3 : 2)
  }
});

const mapStateToProps = ({referralStatsRed}) => {
  return {
    referralStatsRed,
  };
};

export default connect(mapStateToProps, reportAct)(ReferralScreen);
