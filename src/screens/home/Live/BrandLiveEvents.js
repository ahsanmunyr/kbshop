// @ts-nocheck
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, Keyboard } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { responsiveWidth, responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import deviceInfo from 'react-native-device-info';
import LiveBox from '../../../components/LiveBox';
import colors from '../../../assets/colors/colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import FilterIcon from "react-native-vector-icons/FontAwesome"
import LiveEventsFilterModal from '../../../components/LiveEventsFilterModal';
import LiveModal from '../../../components/LiveModal';
import LiveWebModal from '../liveWebModal';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import * as liveActions from "../../../store/actions/liveEvents"
import Loader from '../../../components/Loader';
import { dateInDays } from '../../../utils/time';
import NotFound from '../../../components/NotFound';
const tablet = deviceInfo.isTablet();
const { width } = Dimensions.get('window');

function BrandLiveEvents({ brandName, getBrandLiveEvents, brandLiveEvents }) {
  const [isFilterModal, setIsFilterModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [webModal, setWebModal] = useState(false);
  const [webData, setWebData] = useState({});
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentChild, setCurrentChild] = useState({})
  const [proDtLoading, setProDtLoading] = useState(false)
  const [upCommingitems, setUpcommingItem] = useState(null)
  const [currentItem, onChangeCurrentItem] = useState(null)
  const [ids, onChangeIds] = useState([])

  useEffect(() => {
    getAllData(ids)
  }, [])

  function getAllData(id = []) {
    setLoading(true)
    getBrandLiveEvents(1, brandName, id).then(() => setLoading(false))
  }

  function openWeb(data) {
    setWebData(data);
    setWebModal(true);
  }

  useEffect(() => {
    if (ids.length > 0) {
      getAllData(ids)
    }
  }, [ids])

  function renderLive() {
    if (brandLiveEvents.data?.filter(it => it.event_status == "live")?.length > 0) {
      return (
        <>
          <View style={[styles.headCon, {
            width: responsiveWidth(98), alignSelf: 'center'
          }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.text}>Live Events</Text>
              </View>

              <View style={{
                backgroundColor: colors.themeblue, width: responsiveWidth(24), height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(1), alignItems: 'center', justifyContent: 'center',
              }}>

                <TouchableOpacity onPress={() => setIsFilterModal(true)} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // width: responsiveWidth(10),
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <View style={{
                    backgroundColor: colors.themeblue,
                    alignItems: 'center',
                    borderRadius: responsiveFontSize(1.5),
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <FilterIcon
                      name="sliders"
                      color={"white"}
                      size={responsiveFontSize(tablet ? 1 : 2)}
                    />
                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 2), color: 'white', }}>{' '}Filters</Text>
                  </View>

                </TouchableOpacity>

              </View>


            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={brandLiveEvents.data?.filter(it => it.event_status == "live")}
              renderItem={({ item, index }) => {
                return <LiveBox call={() => {
                  setCurrent({ ...item, liveEvents: { data: brandLiveEvents.data?.filter(it => it.event_status == "live") }, index })
                  setModal(true)
                  onChangeCurrentItem(item)
                }} item={item} liveText={"Live Now"} />
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      )
    } else {
      return <NotFound text={"No live events found"} />
    }
  }

  function renderUpcomming() {
    if (brandLiveEvents.data?.filter(it => it.event_status == "scheduled")?.length > 0) {
      return (
        <>
          <View style={[styles.headCon, {
            width: responsiveWidth(96), alignSelf: 'center'
          }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.text}>Upcoming Events</Text>
              </View>
              {
                brandLiveEvents.data?.length == 0 ?
                  <View style={{
                    backgroundColor: colors.themeblue, width: responsiveWidth(24), height: responsiveScreenFontSize(5), borderRadius: responsiveScreenFontSize(1), alignItems: 'center', justifyContent: 'center',
                  }}>

                    <TouchableOpacity onPress={() => setIsFilterModal(true)} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // width: responsiveWidth(10),
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                      <View style={{
                        backgroundColor: colors.themeblue,
                        alignItems: 'center',
                        borderRadius: responsiveFontSize(1.5),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <FilterIcon
                          name="sliders"
                          color={"white"}
                          size={responsiveFontSize(tablet ? 1 : 2)}
                        />
                        <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 2), color: 'white', }}>{' '}Filters</Text>
                      </View>

                    </TouchableOpacity>

                  </View>
                  : null

              }

            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.con}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={brandLiveEvents.data?.filter(it => it.event_status == "scheduled")}
              renderItem={({ item, index }) => {
                return <LiveBox item={item} call={() => {
                  setCurrentIndex(index)
                  setCurrent("upcomming")
                  setModal(true)
                  setUpcommingItem(item)

                }} liveText={dateInDays(item.start_date, new Date())} />
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      )
    } else {
      return null
    }
  }

  function renderModal() {
    return (
      <LiveWebModal
        currentChild={currentChild}
        proDtLoading={proDtLoading}
        closeModle={() => setWebModal(false)}
        data={webData}
        visible={webModal}
      />
    )
  }

  if (loading) {
    return <View style={{ marginTop: responsiveScreenFontSize(25) }}><Loader /></View>
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: responsiveFontSize(1), zIndex: -1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      {
        isFilterModal &&
        <LiveEventsFilterModal
          closeModle={() => {
            setIsFilterModal(false)
          }}
          visible={isFilterModal}
          onGetIds={onChangeIds}
        />
      }
      {
        modal &&

        <LiveModal
          setCurrentChild={setCurrentChild}
          currentChild={currentChild}
          visible={modal}
          closeModle={() => {
            getAllData()
            setModal(false)
          }}
          upcomming={upCommingitems}
          renderModal={renderModal}
          openWeb={openWeb}
          eventItem={currentItem}
          currentEvents={current}
          list={{ data: brandLiveEvents.data?.filter(it => it.event_status == "scheduled") }}
          currentIndex={currentIndex}
          setProDtLoading={setProDtLoading}
        />
      }

      {renderLive()}
      {/* {renderUpcomming()} */}
      <View style={{ height: responsiveScreenFontSize(30) }} />
    </ScrollView>
  )
}

function mapStateToProps({ upcomingEvents, brandLiveEvents }) {
  return { upcomingEvents, brandLiveEvents }
}

export default connect(mapStateToProps, liveActions)(BrandLiveEvents)

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  con: {
    width: responsiveWidth(92),
    alignSelf: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(1),
    width: responsiveWidth(91),
    alignSelf: 'center',
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: 'rgb(7, 13, 46)',
    fontWeight: 'bold'
  },
  headCon: {
    paddingHorizontal: responsiveFontSize(2),
    marginTop: responsiveFontSize(1),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(
      Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
    ),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
})