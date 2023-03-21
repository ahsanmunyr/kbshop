// @ts-nocheck
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import React, { useState, useLayoutEffect, useEffect,useCallback } from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import LiveBox from '../../components/LiveBox';
import colors from '../../assets/colors/colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import CrossIcon from 'react-native-vector-icons/Entypo';
import LiveEventsFilterModal from '../../components/LiveEventsFilterModal';
import LiveModal from '../../components/LiveModal';
import LiveWebModal from './liveWebModal';
import { connect } from 'react-redux';
import * as liveActions from '../../store/actions/liveEvents';
import Loader from '../../components/Loader';
import { dateInDays } from '../../utils/time';
import moment from 'moment';
import PopularBrand from '../../components/PopularBrand';
import { useNavigation } from '@react-navigation/native';
import LiveEventsFilterModalNew from '../../components/LiveEventsFilterModalNew';
import LiveBoxForVerticalView from '../../components/LiveBoxForVerticalView';
import rowFormate from '../../utils/rowFormate';
import NotFound from '../../components/NotFound';
import FilterBtn from '../../components/FilterBtn';
import LiveEventsFilterShowModal from '../../components/LiveEventsFilterShowModal';

const tablet = deviceInfo.isTablet();
const { width } = Dimensions.get('window');
const head = tablet ? { height: responsiveFontSize(3.85) } : {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Shows({
  navigation,
  getUpcommingEvents,
  upcomingEvents,
  getLiveEvents,
  getPreviousEvents,
  liveEvents,
  previousEvents,
  getPreviousEventsItem,
  authRed,
  getPerviousEventItem,
  filter,
  onChangeFilter,
  getInfluencersReviews,
  getInfluencerReviewsRed
}) {
  const nav = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [webModal, setWebModal] = useState(false);
  const [webData, setWebData] = useState({});
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [proDtLoading, setProDtLoading] = useState(false);
  const [currentChild, setCurrentChild] = useState({});
  const [allCheck, setAllCheck] = useState('');
  const [currentItem, onChangeCurrentItem] = useState(null);
  const [upCommingitems, setUpcommingItem] = useState(null);
  const [ids, onChangeIds] = useState([]);
  const [recordedPage,setRecordedPage]=useState(2)
  const [upcommingPage,setUpcommingPage]=useState(2)
  const [reviewPage,setReviewPage]=useState(2)


  const [showSelectedEventTypesEvent, setShowSelectedEventTypesEvent] =
    useState({ eventType: '', filterBy: '', catID: [] });

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);

  //   wait(500).then(() => {
  //     getAllData();
  //     setRefreshing(false);
  //   });
  // }, []);

  // console.log(showSelectedEventTypesEvent.eventType, "eventType")

  useEffect(() => {
    setRecordedPage(2)
    setUpcommingPage(2)
    setReviewPage(2)
    getAllData();
  }, []);

  useEffect(() => {
    if (ids) {
      setRecordedPage(2)
      setUpcommingPage(2)
      setReviewPage(2)
      getAllDataCat(ids);
    }
  }, [ids]);

  const filterByEventType = (type, cat, filterBy) => {
    setShowSelectedEventTypesEvent({
      ...showSelectedEventTypesEvent,
      eventType: type,
      catID: [...cat],
      filterBy
    });
  };

  function getAllData(id = []) {
    if (upcomingEvents.data?.length == 0 && previousEvents.data?.length == 0 && liveEvents.data?.length == 0) {
      setLoading(true)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    Promise.all([
      getUpcommingEvents(1, id),
      getLiveEvents(1, id),
      getPreviousEvents(1, id),
      getInfluencersReviews(1,(ids.length>0?ids[0]:null))
    ]).then(() => setLoading(false));
  }
  function getAllDataCat(id = []) {
    setLoading(true)
    Promise.all([
      getUpcommingEvents(1, id),
      getLiveEvents(1, id),
      getPreviousEvents(1, id),
      getInfluencersReviews(1,(ids.length>0?ids[0]:null))
    ]).then(() => setLoading(false));
  }

  function openWeb(data) {
    setWebData(data);
    setWebModal(true);
  }

  function renderFooterUpcomming() {
    return (
      <>
        {(upcomingEvents.total_records) > upcomingEvents.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
      </>
    );
  }
  const loadMoreUpcomming = useCallback(() => {
    // console.log(previousEvents.total_records, previousEvents.data.length)
    if (upcomingEvents.total_records> upcomingEvents.data.length) {
      console.log(upcommingPage,ids)
      getUpcommingEvents(upcommingPage, ids,null,"loadMore").then(()=>{
        setUpcommingPage(pre=>pre+1)
      })
    }
  }, [upcommingPage,upcomingEvents]);

  function renderUpcomming() {
    if (upcomingEvents.data?.length > 0) {
      return (
        <>
          <View
            style={[
              styles.headCon,
              {
                width: responsiveWidth(92),
                alignSelf: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.text}>Upcoming Events</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={upcomingEvents.data}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreUpcomming}
              ListFooterComponent={renderFooterUpcomming}
              renderItem={({ item, index }) => {
                return (
                  <LiveBox
                    item={item}
                    event={'upcoming'}
                    call={() => {
                      nav.push('upcomingEvents', {
                        data: item,
              
                        upcomming: item,
                        authRed: authRed?.data?._id,
                        list: upcomingEvents,
                        setCurrent: { ...item, upcomingEvents, index },
                        ids,
                        upcommingPage
                      });
                      setCurrentIndex(index);
                      setCurrent('upcomming');
                      setUpcommingItem(item);
                      // setModal(true);
                    }}
                    liveText={dateInDays(item.start_date, new Date())}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      );
    } else {
      return null;
    }
  }


  function renderFooterRecorded() {
    return (
      <>
        {(previousEvents.total_records) > previousEvents.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
      </>
    );
  }
  const loadMoreRecorded = useCallback(() => {
    console.log("mainrecords",previousEvents.total_records, previousEvents.data.length)
    if (previousEvents.total_records> previousEvents.data.length) {
      console.log(recordedPage,ids)
      getPreviousEvents(recordedPage, ids,null,"loadMore").then(()=>{
        setRecordedPage(pre=>pre+1)
      })
    }
  }, [recordedPage,previousEvents]);

  function renderPrevious() {
    if (previousEvents.data?.length > 0) {
      return (
        <>
          <View
            style={[
              styles.headCon,
              {
                width: responsiveWidth(92),
                alignSelf: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.text}>Recorded Events</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={previousEvents.data}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreRecorded}
              ListFooterComponent={renderFooterRecorded}
              renderItem={({ item, index }) => {
                return (
                  <LiveBox
                    item={item}
                    call={() => {
                      nav.push('livecycle', {
                        data: item,
                        id: item?._id,
                        authRed: authRed?.data?._id,
                        setCurrent: { ...item, previousEvents, index },
                        recordedPage,
                        ids
                      });
                      onChangeCurrentItem(item);
                      setCurrentIndex(index);
                      setCurrent('previous');
                    }}
                    liveText={'Recorded'}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      );
    } else {
      return null;
    }
  }

  function renderLive() {
    if (liveEvents.data?.length > 0) {
      return (
        <>
          <View
            style={[
              styles.headCon,
              {
                width: responsiveWidth(92),
                alignSelf: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.text}>Live Events</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={liveEvents.data}
              renderItem={({ item, index }) => {
                return (
                  <LiveBox
                    call={() => {
                      nav.push('liveeventscycle', {
                        data: item,
                        id: item?._id,
                        authRed: authRed?.data?._id,
                        setCurrent: { ...item, liveEvents, index },
                      });
                      onChangeCurrentItem(item);
                      setCurrent({ ...item, liveEvents, index });
                      // setModal(true);
                    }}
                    item={item}
                    event={'upcoming'}
                    liveText={'Live Now'}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      );
    } else {
      return null;
    }
  }


  function renderFooterReview() {
    return (
      <>
        {(getInfluencerReviewsRed.total_records) > getInfluencerReviewsRed.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
      </>
    );
  }

  const loadMoreReview = useCallback(() => {
    console.log(getInfluencerReviewsRed.total_records, getInfluencerReviewsRed.data.length)
    if (getInfluencerReviewsRed.total_records> getInfluencerReviewsRed.data.length) {
      console.log(reviewPage,ids)
      getInfluencersReviews(reviewPage, (ids.length>0?ids[0]:null),null,"loadMore").then(()=>{
        setReviewPage(pre=>pre+1)
      })
    }
  }, [reviewPage,getInfluencerReviewsRed]);
  
  function renderInfluencerReview() {
    if (getInfluencerReviewsRed.data?.length > 0) {
      return (
        <>
          <View
            style={[
              styles.headCon,
              {
                width: responsiveWidth(92),
                alignSelf: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.text}>Influencers Reviews</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={getInfluencerReviewsRed.data}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreReview}
              ListFooterComponent={renderFooterReview}
              renderItem={({ item, index }) => {
                // console.log(item, "itemitemitemitem")
                return (
                  <LiveBox
                    call={() => {
                      nav.push('influencerReviews', {
                        data: item,
                        id: item?._id,
                        authRed: authRed?.data?._id,
                        setCurrent: { ...item, getInfluencerReviewsRed, index },
                        reviewPage,
                        ids:(ids.length>0?ids[0]:null),
                        all:true
                      });
                      onChangeCurrentItem(item);
                      setCurrent({ ...item, getInfluencerReviewsRed, index });
                      // setModal(true);
                    }}
                    item={item}
                    event={'influencerReviews'}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      );
    } else {
      return null;
    }
  }

  function renderModal() {
    return (
      <>
        {(webModal || allCheck ? true : false) && (
          <LiveWebModal
            closeModle={() => {
              setWebModal(false);
              setAllCheck('');
            }}
            data={webData}
            currentChild={currentChild}
            proDtLoading={proDtLoading}
            visible={webModal || allCheck ? true : false}
            allCheck={allCheck}
          />
        )}
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }


  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        contentContainerStyle={[
          {
            paddingBottom: responsiveFontSize(1),
            backgroundColor: 'white',
          },
          showSelectedEventTypesEvent.eventType !== '' && { ...{ flex: 1 } },
        ]}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
        {filter && (
          <LiveEventsFilterShowModal
            closeModle={() => {
              onChangeFilter(false);
            }}
            visible={filter}
            onGetIds={onChangeIds}
            filterByEventType={filterByEventType}
            showSelectedEventTypesEvent={showSelectedEventTypesEvent}
          />
        )}

        {modal && (
          <LiveModal
            setCurrentChild={setCurrentChild}
            currentChild={currentChild}
            visible={modal}
            closeModle={() => {
              getAllData();
              setModal(false);
            }}
            previousEventItem={getPerviousEventItem}
            renderModal={renderModal}
            openWeb={openWeb}
            eventItem={currentItem}
            upcomming={upCommingitems}
            currentEvents={current}
            list={upcomingEvents}
            currentIndex={currentIndex}
            setProDtLoading={setProDtLoading}
            setAllCheck={setAllCheck}
          />
        )}

        {/* {(previousEvents?.data?.length==0 && upcomingEvents?.data?.length==0 && liveEvents?.data?.length==0 && getInfluencerReviewsRed?.data?.length==0) && (<NotFound text={"No Event At This Time. Please Check Back Later"}/>)} */}
        {
          showSelectedEventTypesEvent.eventType == '' ?
            <>
              {renderLive()}
              {renderPrevious()}
              {renderUpcomming()}
            </> :
            showSelectedEventTypesEvent.eventType == 'Live' ?
              <>
                {renderLive()}
              </> :
              showSelectedEventTypesEvent.eventType == 'Recorded' ?
                <>
                  {renderPrevious()}
                </> :
                showSelectedEventTypesEvent.eventType == 'Upcoming' ?
                  <>
                    {renderUpcomming()}
                  </> : null
        }

        {renderInfluencerReview()}

        {upcomingEvents?.data?.length==0 && liveEvents?.data?.length==0 && previousEvents?.data?.length==0 && getInfluencerReviewsRed?.data?.length==0 ?<NotFound text={"No Data Found"}/>:null }


        <View style={{ height: responsiveFontSize(2), width: '100%' }} />
      </ScrollView>
    </>
  );
}

function mapStateToProps({
  upcomingEvents,
  liveEvents,
  previousEvents,
  authRed,
  getPerviousEventItem,
  getInfluencerReviewsRed
}) {
  return {
    upcomingEvents,
    liveEvents,
    previousEvents,
    authRed,
    getPerviousEventItem,
    getInfluencerReviewsRed
  };
}

export default connect(mapStateToProps, liveActions)(Shows);

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  con: {
    width: responsiveWidth(92),
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(tablet?0.75:1),
    width: responsiveWidth(91),
    alignSelf: 'center',
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: 'rgb(7, 13, 46)',
    // fontWeight: 'bold',
  },
  headCon: {
    // paddingHorizontal: responsiveFontSize(2),
    marginTop: responsiveFontSize(tablet?0.75:1),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(65),
    justifyContent: 'flex-end',
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
  footer: {
    width: responsiveWidth(tablet ? 20 : 36),
    height: responsiveHeight(tablet ? 20 : 28),
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
});