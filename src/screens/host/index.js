// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  findNodeHandle,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';
import * as liveEvents from '../../store/actions/liveEvents';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';
import HostEventComp from '../../components/HostEventComp';
import {useRef} from 'react';
import deviceInfoModule from 'react-native-device-info';

import {SafeAreaView} from 'react-native-safe-area-context';

const tablet = deviceInfoModule.isTablet();

function Events({navigation, hostEventRed, getAllHostEvents}) {
  const [modal, setModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventStatus, setEventStatus] = useState('scheduled');
  const refrenec = useRef();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
    getEvents(eventStatus)
  }, [navigation]);





  const getEvents =(status)=>{
    setLoading(true)
    getAllHostEvents(status).then(() => {
      setLoading(false);
    });
  }


  useEffect(() => {
    setEvents(hostEventRed.data);
  }, [hostEventRed.data]);

  // if (!loading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
        <View ref={refrenec} style={{flex: 1}}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: '20%', paddingLeft: responsiveFontSize(2)}}
              onPress={() => navigation.goBack()}>
              <BackIcon name="arrow-back" color={colors.themeblue} size={responsiveFontSize(tablet ? 2 : 3)} />
            </TouchableOpacity>
            <Text
              style={{
                color: colors.themeblue,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                padding: responsiveFontSize(2),
                textAlign: 'center',
                width: '60%',
              }}>
              Events
            </Text>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View> */}
          <View style={styles.con}>
            <View
              style={{
                width: '97%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: responsiveHeight(0.8),
              }}>
              <TouchableOpacity
                onPress={() => {setEventStatus('scheduled'); getEvents("scheduled")}}
                style={[
                  styles.filterBtn,
                  eventStatus === 'scheduled' && styles.activeFilterBtn,
                ]}>
                <Text
                  style={
                    [eventStatus === 'scheduled' && {color: colors.themeblue},{fontSize:responsiveFontSize(tablet?1.25:2)}]
                  }>
                  Scheduled
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {setEventStatus('live'); getEvents("live")}}
                style={[
                  styles.filterBtn,
                  eventStatus === 'live' && styles.activeFilterBtn,
                ]}>
                <Text
                  style={[eventStatus === 'live' && {color: colors.themeblue},{fontSize:responsiveFontSize(tablet?1.25:2)}]}>
                  Live
                </Text>
              </TouchableOpacity>
            </View>
            {loading ? <Loader /> :<FlatList
              data={events}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, i) => i.toString()}
              ListEmptyComponent={() => <NotFound text={'No Events'} />}
              renderItem={({item, index}) => {
                return (
                  <HostEventComp
                    title={item?.event?.title}
                    start_date={item?.event?.start_date}
                    banner={item?.event?.banner}
                    prodHost={item?.event?.hosts}
                    onPressEvent={() => {
                      navigation.navigate('controlRooms', {
                        event_id: item?.event?._id,
                      });
                    }}
                  />
                );
              }}
            />}
          </View>
        </View>
      </SafeAreaView>
    );
  // } else {
  //   return <Loader />;
  // }
}

function mapStateToProps({hostEventRed}) {
  return {hostEventRed};
}

export default connect(mapStateToProps, liveEvents)(Events);
const styles = StyleSheet.create({
  con: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: responsiveFontSize(1),
    paddingTop: responsiveHeight(0.5),
  },
  img: {
    width: responsiveFontSize(20),
    height: responsiveFontSize(20),
  },
  title: {
    marginTop: responsiveFontSize(3),
    fontSize: responsiveFontSize(2),
    color: 'red',
  },
  text: {
    textAlign: 'center',
    marginTop: responsiveFontSize(0.5),
  },
  filterBtn: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: responsiveHeight(0.8),
    // borderRadius:responsiveFontSize(0.5)
  },
  activeFilterBtn: {
    borderBottomWidth: 1,
    borderColor: colors.themeblue,
  },
});
