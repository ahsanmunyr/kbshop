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
  ActivityIndicator,
  Share,
  Alert
} from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import LiveBox from '../../../components/LiveBox';
import colors from '../../../assets/colors/colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import LiveEventsFilterModal from '../../../components/LiveEventsFilterModal';
import LiveModal from '../../../components/LiveModal';
import LiveWebModal from '../liveWebModal';
import { connect } from 'react-redux';
import * as liveActions from '../../../store/actions/liveEvents';
import * as bioActions from '../../../store/actions/bioShop';

import Loader from '../../../components/Loader';
import { dateInDays } from '../../../utils/time';
import moment from 'moment';
import PopularBrand from '../../../components/PopularBrand';
import { useNavigation } from '@react-navigation/native';
import LiveEventsFilterModalNew from '../../../components/LiveEventsFilterModalNew';
import LiveBoxForVerticalView from '../../../components/LiveBoxForVerticalView';
import rowFormate from '../../../utils/rowFormate';
import NotFound from '../../../components/NotFound';
import FilterBtn from '../../../components/FilterBtn';
import SocialStore from './SocialStore';
// import BioShopScreen from '../../bioShop/bioshop/BioShopScreen';
import BioShop from '../bioshop/BioShop';
import { useCallback } from 'react';
const tablet = deviceInfo.isTablet();
const { width } = Dimensions.get('window');
const head = tablet ? { height: responsiveFontSize(3.85) } : {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function LiveEvents({
  navigation,
  getUpcommingEvents,
  upcomingEvents,
  getLiveEvents,
  getPreviousEvents,
  liveEventsBrand,
  previousEventsBrand,
  getPreviousEventsItem,
  authRed,
  getPerviousEventItem,
  getProfileDetails,
  route,
  setIsBio,
  getInfluencersReviewsBrand,
  getInfluencerReviewsRedBrand,
  profileDetail,
  getProfileLike,
  profileAllLike
}) {
  const nav = useNavigation();
  // console.log(navigation, "navigationnavigation")
  const [refreshing, setRefreshing] = React.useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isFilterSocialStoreModal, setIsFilterSocialStoreModal] = useState(false);
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
  const [selectodTopMenu, setSelectodTopMenu] = useState("shows")
  const [onFilterLoader, setOnFilterLoader] = useState(false)
  const [showSelectedEventTypesEvent, setShowSelectedEventTypesEvent] =
    useState({ eventType: (route.params?.target) ? (route.params?.target) : '', filterBy: '', catID: [] });
  const [getInfluencerReviewApiCall, setGetInfluencerReviewApiCall] = useState(true);
  const [reviewPage, setReviewPage] = useState(2)

  const [recordedPage, setRecordedPage] = useState(2)
  const [upcommingPage, setUpcommingPage] = useState(2)

  // console.log("sadfsadf",showSelectedEventTypesEvent.eventType,route.params?.target)
  // console.log(route?.params?.data, "=========================================================");
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   // wait(2000).then(() => setRefreshing(false));

  //   wait(2000).then(() => {
  //     getAllData();
  //     setRefreshing(false);
  //   });
  // }, []);



  // useEffect(() => {
  //   getAllData();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsBio(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getProfileLike(route.params?.data?._id)
    getProfileDetails(route.params?.data?._id)
    return () => {
      setIsBio(false);
      // bioShopClear();
    };
  }, []);


  useEffect(() => {
    // if (ids.length > 0) {
    // alert(JSON.stringify(ids))
    setReviewPage(2)
    setRecordedPage(2)
    setUpcommingPage(2)
    getAllData(ids);
    // }
  }, [ids]);
  useEffect(() => {
    if (selectodTopMenu === "reviews") {
      setGetInfluencerReviewApiCall(true)
      getInfluencersReviewsBrand(1, (ids.length > 0 ? ids[0] : null), route.params?.data?._id).then(() => setGetInfluencerReviewApiCall(false))
    }
  }, [selectodTopMenu]);

  const filterByEventType = (type, cat, filterBy) => {
    setShowSelectedEventTypesEvent({
      ...showSelectedEventTypesEvent,
      eventType: type,
      catID: [...cat],
      filterBy,
    });
  };

  function getAllData(id = []) {
    setLoading(true);
    // setOnFilterLoader(true)
    if (selectodTopMenu == "reviews") {
      setGetInfluencerReviewApiCall(true)
      getInfluencersReviewsBrand(1, (ids.length > 0 ? ids[0] : null), route.params?.data?._id).then(() => setGetInfluencerReviewApiCall(false))
    }
    if (showSelectedEventTypesEvent.eventType == "Recorded") {
      getPreviousEvents(1, id, route.params.data?._id).then(() => setLoading(false))
    }
    else if (showSelectedEventTypesEvent.eventType == "Live") {
      getLiveEvents(1, id, route.params.data?._id).then(() => setLoading(false))
    }
    else if (showSelectedEventTypesEvent.eventType == "Upcoming") {
      getUpcommingEvents(1, id, route.params.data?._id).then(() => setLoading(false))
    }
    else {
      Promise.all([
        getUpcommingEvents(1, id, route.params.data?._id),
        getLiveEvents(1, id, route.params.data?._id),
        getPreviousEvents(1, id, route.params.data?._id),
      ]).then(() => setLoading(false));
    }

    // if (showSelectedEventTypesEvent.eventType === "" || showSelectedEventTypesEvent.eventType === "Live") {
    //   getLiveEvents(1, id, route.params.data?._id).then(() => {setLoading(false); setOnFilterLoader(false)})
    // }else if(showSelectedEventTypesEvent.eventType === "Recorded"){
    //   getPreviousEvents(1, id, route.params.data?._id).then(() => {setLoading(false); setOnFilterLoader(false)})
    // }else{
    //   getUpcommingEvents(1, id, route.params.data?._id).then(() => {setLoading(false); setOnFilterLoader(false)})
    // }
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
    // console.log(previousEventsBrand.total_records, previousEventsBrand.data.length)
    if (upcomingEvents.total_records > upcomingEvents.data.length) {
      console.log(upcommingPage, ids)
      getUpcommingEvents(upcommingPage, ids, route.params.data?._id, "loadMore").then(() => {
        setUpcommingPage(pre => pre + 1)
      })
    }
  }, [upcommingPage, upcomingEvents]);

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
              {/*{liveEventsBrand.data?.length == 0 &&
              previousEventsBrand.data?.length == 0 ? (
                <FilterBtn setIsFilterModal={setIsFilterModal} />
              ) : null}*/}
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={upcomingEvents.data}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <LiveBox
                      item={item}
                      event={'upcoming'}
                      call={() => {
                        nav.navigate('upcomingEvents', {
                          data: item,

                          upcomming: item,
                          authRed: authRed?.data?._id,
                          list: upcomingEvents,
                          setCurrent: { ...item, upcomingEvents, index },
                          ids,
                          upcommingPage,
                          brand_id: route.params.data?._id
                        });
                        setCurrentIndex(index);
                        setCurrent('upcomming');
                        setUpcommingItem(item);
                        // setModal(true);
                      }}
                      liveText={dateInDays(item.start_date, new Date())}
                    />
                  </>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreUpcomming}
              ListFooterComponent={renderFooterUpcomming}
            // ListFooterComponent={
            //   <View style={{ height: responsiveScreenFontSize(28) }} />
            // }
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
        {((previousEventsBrand.total_records) > previousEventsBrand.data.length) ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
      </>
    );
  }
  function renderFooterRecorded2() {

    if (showSelectedEventTypesEvent?.eventType === 'Recorded') {
      // console.log(previousEventsBrand.total_records , previousEventsBrand.data.length)
      return (
        <>
          {((previousEventsBrand.total_records) > previousEventsBrand.data.length) ? (
            <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(25), alignItems: 'flex-start' }}>
              <Text style={styles.btnText}>Loading...</Text>
              <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
            </View>
          ) : <View style={{ height: responsiveScreenFontSize(25) }} />}
        </>
      );
    } else {
      console.log(upcomingEvents.total_records, upcomingEvents.data.length)
      return (
        <>
          {((upcomingEvents.total_records) > upcomingEvents.data.length) ? (
            <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(25), alignItems: 'flex-start' }}>
              <Text style={styles.btnText}>Loading...</Text>
              <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
            </View>
          ) : <View style={{ height: responsiveScreenFontSize(25) }} />}
        </>
      );
    }

  }

  const loadMoreRecorded = useCallback(() => {
    console.log("callo", recordedPage)
    // console.log("records",previousEventsBrand.total_records, previousEventsBrand.data.length)
    if (showSelectedEventTypesEvent?.eventType === 'Recorded') {
      console.log("sdfsdf", previousEventsBrand.total_records, previousEventsBrand.data.length)
      if (previousEventsBrand.total_records > previousEventsBrand.data.length) {
        // console.log("reccc",recordedPage,ids)
        getPreviousEvents(recordedPage, ids, route.params.data?._id, "loadMore").then(() => {
          setRecordedPage(pre => pre + 1)
        })
      }
    }

    else if (showSelectedEventTypesEvent?.eventType === 'Upcoming') {
      if (upcomingEvents.total_records > upcomingEvents.data.length) {
        // console.log(recordedPage,ids)
        getUpcommingEvents(upcommingPage, ids, route.params.data?._id, "loadMore").then(() => {
          setUpcommingPage(pre => pre + 1)
        })
      }
    }

  }, [recordedPage, previousEventsBrand, upcomingEvents, upcommingPage, showSelectedEventTypesEvent]);

  const loadMoreRecorded2 = useCallback(() => {
    if (previousEventsBrand.total_records > previousEventsBrand.data.length) {
      // console.log("reccc",recordedPage,ids)
      getPreviousEvents(recordedPage, ids, route.params.data?._id, "loadMore").then(() => {
        setRecordedPage(pre => pre + 1)
      })
    }

  }, [recordedPage, previousEventsBrand]);

  function renderPrevious() {
    if (previousEventsBrand.data?.length > 0) {
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
                <Text style={styles.text}>Previous Live Events</Text>
              </View>
              {/* {liveEventsBrand.data?.length == 0 ? (
                <FilterBtn setIsFilterModal={setIsFilterModal} />
              ) : null} */}
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={previousEventsBrand.data}
              renderItem={({ item, index }) => {
                return (
                  <LiveBox
                    item={item}
                    call={() => {
                      navigation.push('livecycle', {
                        data: item,
                        id: item?._id,
                        authRed: authRed?.data?._id,
                        setCurrent: { ...item, previousEventsBrand, index },
                        brand_id: route.params.data?._id,
                        ids,
                        recordedPage
                      });
                      onChangeCurrentItem(item);
                      setCurrentIndex(index);
                      // getPreviousEventsItem(item?._id, authRed?.data?._id)
                      // setModal(true)
                      setCurrent('previous');
                    }}
                    liveText={'Recorded'}
                  />
                );
              }}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreRecorded2}
              ListFooterComponent={renderFooterRecorded}
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
    if (liveEventsBrand.data?.length > 0) {
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
              data={liveEventsBrand.data}
              renderItem={({ item, index }) => {
                return (
                  <LiveBox
                    item={item}
                    event={'upcoming'}
                    call={() => {
                      navigation.push('liveeventscycle', {
                        data: item,
                        id: item?._id,
                        authRed: authRed?.data?._id,
                        setCurrent: { ...item, liveEventsBrand, index },
                        brand_id: route.params.data?._id
                      });
                      onChangeCurrentItem(item);
                      setCurrent({ ...item, liveEventsBrand, index });
                      // setModal(true);
                    }}
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
  // if (loading) {
  //   return <Loader />;
  // }

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

  function renderFooterReview() {
    return (
      <>
        {(getInfluencerReviewsRedBrand.total_records) > getInfluencerReviewsRedBrand.data.length ? (
          <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(25), alignItems: 'flex-start' }}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(25) }} />}
      </>
    );
  }

  const loadMoreReview = useCallback(() => {
    console.log(getInfluencerReviewsRedBrand.total_records, getInfluencerReviewsRedBrand.data.length)
    if (getInfluencerReviewsRedBrand.total_records > getInfluencerReviewsRedBrand.data.length) {
      // console.log(reviewPage,ids)
      getInfluencersReviewsBrand(reviewPage, (ids.length > 0 ? ids[0] : null), route.params?.data?._id, "loadMore").then(() => {
        setReviewPage(pre => pre + 1)
      })
    }
  }, [reviewPage, getInfluencerReviewsRedBrand]);

  function renderInfluencerReviews() {
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
              <Text style={styles.text}>Influencer Reviews</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.con}>
          <FlatList
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={rowFormate(getInfluencerReviewsRedBrand.data, tablet ? 4 : 2)}
            ListEmptyComponent={() => <NotFound text={"No Review At This Time. Please Check Back Later"} />}
            ListFooterComponent={<View style={{ height: responsiveHeight(21) }} />}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: responsiveHeight(tablet ? 0.5 : 1),
                    }}>
                    {item.map((it, i) => {
                      return (
                        <LiveBox
                          passedStyle={{ width: responsiveWidth(tablet ? 22.5 : 45), height: responsiveFontSize(tablet ? 16 : 35) }}
                          key={i}
                          call={() => {
                            nav.navigate('influencerReviews', {
                              data: it,
                              id: it?._id,
                              authRed: authRed?.data?._id,
                              setCurrent: { ...it, getInfluencerReviewsRedBrand, index: (index * (tablet?4:2)) + i },
                              reviewPage,
                              ids,
                              brand_id: route.params.data?._id
                            });
                            onChangeCurrentItem(it);
                            setCurrent({ ...it, getInfluencerReviewsRedBrand, index: (index * (tablet?4:2)) + i });



                            // setModal(true);
                          }}
                          item={it}
                          event={'influencerReviews'}
                        />
                      );
                    })}
                  </View>
                </>
              );
            }}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreReview}
            ListFooterComponent={renderFooterReview}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </>
    );
  }



  return (
    <>
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}

        // style={{height: responsiveHeight(60)}}
        contentContainerStyle={[
          {
            paddingBottom: responsiveFontSize(1),
            // backgroundColor: 'white',
          },
          (showSelectedEventTypesEvent.eventType !== '' && selectodTopMenu !== "reviews") && { ...{ flex: 1 } },
        ]}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      > */}

      <View
        style={{
          height: responsiveScreenFontSize(tablet ? 6 : 10),
          width: responsiveWidth(92),
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor:"red"
        }}>
        <View
          style={{
            width: responsiveWidth(28),
            height: responsiveHeight(tablet ? 8 : 10),
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',

          }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <CrossIcon
              name="chevron-thin-left"
              color={colors.themeblue}
              size={responsiveFontSize(tablet ? 2 : 3)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('profileDetails', { ...route.params })}>
            <Image
              // resizeMode="contain"
              borderRadius={responsiveScreenFontSize(50)}
              style={{
                width: responsiveScreenFontSize(tablet ? 5 : 8),
                height: responsiveScreenFontSize(tablet ? 5 : 8),
                marginLeft: responsiveScreenFontSize(2),
                borderColor: 'gray',
                borderWidth: 0.5,
                backgroundColor: 'white'
              }}
              source={{
                uri: route?.params?.data?.profile_image_url,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{
          width: responsiveWidth(60),
          height: responsiveScreenFontSize(tablet ? 8 : 10),
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 2),
              fontWeight: 'bold'
            }}>{(route?.params?.influencer) ? 0 : profileDetail?.follows_count}</Text>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 1.4),
              fontWeight: 'bold'
            }}>Following</Text>
          </View>
          <View style={{
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
          }}>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 2),
              fontWeight: 'bold'
            }}>{(route?.params?.influencer) ? getInfluencerReviewsOne?.data[0]?.creator?.followers : profileDetail?.followers_count}</Text>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 1.4),
              fontWeight: 'bold'
            }}>Followers</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 2),
              fontWeight: 'bold'
            }}>{profileAllLike}</Text>
            <Text style={{
              fontSize: responsiveScreenFontSize(tablet ? 1 : 1.4),
              fontWeight: 'bold'
            }}>Likes</Text>
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(17),
            height: responsiveHeight(10),
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor:'blue'
          }}>
          {/* <SimpleLineIcons
            name="bell"
            color={colors.themeblue}
            size={responsiveFontSize(tablet ? 1 : 2.5)}
          /> */}
          {/* <View style={{ width: responsiveScreenFontSize(1) }} /> */}
          {/* <CrossIcon
            name="dots-three-vertical"
            color={colors.themeblue}
            size={responsiveFontSize(tablet ? 1 : 2.5)}
          /> */}
        </View>
      </View>
      <View
        style={{
          width: responsiveWidth(92),
          alignSelf: 'center',
          height: responsiveScreenFontSize(tablet ? 4 : 5),
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: responsiveWidth(65),
            height: responsiveScreenFontSize(5),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => {
            setRecordedPage(2)
            setUpcommingPage(2)
            setReviewPage(2)
            setSelectodTopMenu("shows");
            filterByEventType("", [], "");
            onChangeIds([])

            // getAllData(ids);
            getAllData();
          }}>
            <Text
              style={[
                styles.text,
                { fontWeight: "500" },
                selectodTopMenu === "shows" && {
                  textDecorationLine: 'underline',
                },
              ]}>
              Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setRecordedPage(2)
            setUpcommingPage(2)
            setReviewPage(2)
            setSelectodTopMenu("reviews")
            filterByEventType("", [], "");
            onChangeIds([])
          }}>
            <Text
              style={[styles.text, { paddingLeft: responsiveScreenFontSize(3) }, { fontWeight: "500" },
              selectodTopMenu === "reviews" && {
                textDecorationLine: 'underline',
              },
              ]}>
              Reviews
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {
            setRecordedPage(2)
            setUpcommingPage(2)
            setReviewPage(2)
            setSelectodTopMenu("socialstore")
          }}>
            <Text
              style={[styles.text, { paddingLeft: responsiveScreenFontSize(3) }, { fontWeight: "500" },
              selectodTopMenu === "socialstore" && {
                textDecorationLine: 'underline',
              },
              ]}>
              Social Store
            </Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            width: responsiveWidth(22),
            height: responsiveScreenFontSize(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (selectodTopMenu == 'shows' || selectodTopMenu == "reviews") {
                setIsFilterModal(true)
              }
              if (selectodTopMenu == 'socialstore') {
                // alert("SAD")
                setIsFilterSocialStoreModal(true)
              }
            }}
            style={{
              borderRadius: responsiveScreenFontSize(4),
              paddingHorizontal: responsiveScreenFontSize(1),
              paddingVertical: responsiveScreenFontSize(tablet ? 0.25 : 0.6),
              borderWidth: responsiveScreenFontSize(tablet ? 0.1 : 0.2),
              width: responsiveScreenFontSize(tablet ? 8 : 10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.text]}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isFilterModal && (
        // <LiveEventsFilterModal
        //   closeModle={() => {
        //     setIsFilterModal(false)
        //   }}
        //   visible={isFilterModal}
        //   onGetIds={onChangeIds}
        // />
        // Roshaan new modal
        <LiveEventsFilterModalNew
          closeModle={() => {
            setIsFilterModal(false);
          }}
          shows={selectodTopMenu == "reviews" ? false : true}
          visible={isFilterModal}
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
      {selectodTopMenu === "shows" ? (showSelectedEventTypesEvent.eventType === '' ? (
        <>
          {loading ? <View style={{ height: responsiveHeight(80) }}><Loader /></View>
            :
            <>
              {upcomingEvents?.data?.length == 0 && liveEventsBrand?.data?.length == 0 && previousEventsBrand?.data?.length == 0 ? <NotFound text={"No Data Found"} /> : (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true}

                  // style={{height: responsiveHeight(60)}}
                  contentContainerStyle={[
                    {
                      paddingBottom: responsiveFontSize(1),
                      // backgroundColor: 'white',
                    },
                    (showSelectedEventTypesEvent.eventType !== '' && selectodTopMenu !== "reviews") && { ...{ flex: 1 } },
                  ]}
                  showsVerticalScrollIndicator={false}
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
                >
                  {renderLive()}
                  {renderPrevious()}
                  {renderUpcomming()}
                </ScrollView>
              )}
            </>
          }
          {/* {renderLive()} */}
          {/* {renderPrevious()} */}
          {/* {renderUpcomming()} */}
          {/* {renderLive()}
            {renderPrevious()}
            {renderUpcomming()} */}
        </>
      ) : (
        <>
          {loading ? (<View style={{ height: responsiveHeight(80) }}><Loader /></View>) : (
            <>
              <View
                style={[
                  styles.headCon,
                  {
                    width: responsiveWidth(92),
                    alignSelf: 'center',
                  },
                ]}>
                {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.text}>
                  {showSelectedEventTypesEvent.eventType} Events
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.themeblue,
                  width: responsiveWidth(24),
                  height: responsiveScreenFontSize(5),
                  borderRadius: responsiveScreenFontSize(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setIsFilterModal(true)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.themeblue,
                      alignItems: 'center',
                      borderRadius: responsiveFontSize(1.5),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <FilterIcon
                      name="sliders"
                      color={'white'}
                      size={responsiveFontSize(tablet ? 1 : 2)}
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 1 : 2),
                        color: 'white',
                      }}>
                      {' '}
                      Filters
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
                {/* <View style={styles.line} /> */}

              </View>


              <View style={[styles.con]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={styles.text}>{showSelectedEventTypesEvent.eventType} Events</Text>
                  </View>
                </View>
                <View style={styles.line} />
                {onFilterLoader ? <Loader /> : <FlatList
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  data={
                    showSelectedEventTypesEvent?.eventType === 'Recorded'
                      ? rowFormate(previousEventsBrand.data, tablet ? 4 : 2)
                      : showSelectedEventTypesEvent?.eventType === 'Live'
                        ? rowFormate(liveEventsBrand.data, tablet ? 4 : 2)
                        : rowFormate(upcomingEvents.data, tablet ? 4 : 2)
                  }
                  renderItem={({ item, index }) => {
                    if (showSelectedEventTypesEvent?.eventType === 'Recorded') {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: responsiveHeight(tablet ? 0.5 : 1),
                          }}>
                          {item.map((it, i) => {
                            return (
                              <LiveBox
                                passedStyle={{ width: responsiveWidth(tablet ? 22.5 : 45), height: responsiveFontSize(tablet ? 16 : 35) }}
                                key={i}
                                item={it}
                                call={() => {
                                  navigation.push('livecycle', {
                                    data: it,
                                    id: it?._id,
                                    authRed: authRed?.data?._id,
                                    setCurrent: tablet ? { ...it, previousEventsBrand, index: (index * 4) + i } : { ...it, previousEventsBrand, index: (index * 2) + i },
                                    ids,
                                    recordedPage,
                                    brand_id: route.params.data?._id
                                  });
                                  onChangeCurrentItem(it);
                                  setCurrentIndex(index);
                                  // getPreviousEventsItem(item?._id, authRed?.data?._id)
                                  // setModal(true)
                                  setCurrent('previous');
                                }}
                                liveText={'Recorded'}
                              />
                              // <LiveBoxForVerticalView
                              //   item={it}
                              //   key={i}
                              //   call={() => {
                              //     navigation.navigate('livecycle', {
                              //       data: it,
                              //       id: it?._id,
                              //       authRed: authRed?.data?._id,
                              //     });
                              //     onChangeCurrentItem(it);
                              //     setCurrentIndex(i);
                              //     // getPreviousEventsItem(item?._id, authRed?.data?._id)
                              //     // setModal(true)
                              //     setCurrent('previous');
                              //   }}
                              //   liveText={'Recorded'}
                              // />
                            );
                          })}
                        </View>
                      );
                    } else if (showSelectedEventTypesEvent?.eventType === 'Live') {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: responsiveHeight(tablet ? 0.5 : 1),
                          }}>
                          {item.map((it, i) => {
                            return (
                              <LiveBox
                                passedStyle={{ width: responsiveWidth(tablet ? 22.5 : 45), height: responsiveFontSize(tablet ? 16 : 35) }}
                                key={i}
                                call={() => {
                                  navigation.push('liveeventscycle', {
                                    data: it,
                                    id: it?._id,
                                    authRed: authRed?.data?._id,
                                    setCurrent: { ...it, liveEventsBrand, index },
                                  });
                                  onChangeCurrentItem(it);
                                  setCurrent({ ...it, liveEventsBrand, i });
                                  // setModal(true);
                                }}
                                item={it}
                                event={'upcoming'}
                                liveText={'Live Now'}
                              />
                            );
                          })}
                        </View>
                      );
                    } else {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: responsiveHeight(tablet ? 0.5 : 1),
                          }}>
                          {item.map((it, i) => {
                            return (
                              <LiveBox
                                passedStyle={{ width: responsiveWidth(tablet ? 22.5 : 45), height: responsiveFontSize(tablet ? 16 : 35) }}
                                key={i}
                                item={it}
                                event={'upcoming'}
                                call={() => {
                                  setCurrentIndex(i);
                                  setCurrent('upcomming');
                                  setUpcommingItem(it);
                                  setModal(true);
                                }}
                                liveText={dateInDays(it.start_date, new Date())}
                              />
                            );
                          })}
                        </View>
                      );
                    }
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReachedThreshold={0.1}
                  onEndReached={loadMoreRecorded}
                  ListFooterComponent={renderFooterRecorded2}
                  ListEmptyComponent={() => (
                    <NotFound
                      text={
                        showSelectedEventTypesEvent.eventType === 'Recorded'
                          ? 'No Recorded Event At This Time. Please Check Back Later.'
                          : showSelectedEventTypesEvent.eventType === 'Live'
                            ? 'No Live Event At This Time. Please Check Back Later.'
                            : 'No Upcoming Event At This Time. Please Check Back Later.'
                      }
                    />
                  )}
                />}
              </View>
            </>
          )}
        </>
      )) : selectodTopMenu === "reviews" ?
        <>
          {getInfluencerReviewApiCall ?
            <View style={{ height: responsiveHeight(80) }}>
              <Loader />
            </View>
            : renderInfluencerReviews()}
        </>
        : <BioShop
          data={route?.params?.data}
          setIsFilterSocialStoreModal={setIsFilterSocialStoreModal}
          isFilterSocialStoreModal={isFilterSocialStoreModal}
        />}
      {/* <View style={{ height: responsiveFontSize(0), width: '100%' }} /> */}
      {/* </ScrollView> */}
    </>
  );
}

function mapStateToProps({
  upcomingEvents,
  liveEventsBrand,
  previousEventsBrand,
  authRed,
  getPerviousEventItem,
  getInfluencerReviewsRedBrand,
  profileDetail,
  profileAllLike
}) {
  return {
    upcomingEvents,
    liveEventsBrand,
    previousEventsBrand,
    authRed,
    getPerviousEventItem,
    getInfluencerReviewsRedBrand,
    profileDetail,
    profileAllLike
  };
}

export default connect(mapStateToProps, { ...liveActions, ...bioActions })(LiveEvents);

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  con: {
    width: responsiveWidth(92),
    alignSelf: 'center',
    // backgroundColor:"red",
    // flex:1
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(tablet ? 0.75 : 1),
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
    marginTop: responsiveFontSize(tablet ? 0.75 : 1),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    justifyContent: 'flex-end',

    height: responsiveScreenFontSize(3.5),
    borderRadius: responsiveFontSize(6),
    backgroundColor: 'rgb(242, 242, 242)',
    // marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
  },
  searchIcon: {
    // marginLeft: responsiveFontSize(0.4),
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

