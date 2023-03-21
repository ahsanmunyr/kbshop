// @ts-nocheck
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';
import Loader from '../../components/Loader';
import {connect, useDispatch} from 'react-redux';
import * as liveEvents from '../../store/actions/liveEvents';
import LiveHostModal from './LiveHostModal';

import LandscapeComponent from './LandscapeComponent';
import deviceInfoModule from 'react-native-device-info';

const tablet = deviceInfoModule.isTablet();
const ControlRoom = ({
  navigation,
  route,
  getIsHostEventLive,
  hostEventLiveRed,
}) => {
  const [loading, setLoading] = useState(false);
  const [isEventLive, setIsEventLive] = useState(false);
  const [change, setChange] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    setLoading(true);
    getIsHostEventLive(route.params.event_id).then(() => {
      setLoading(false);
    });
    return () => {
      dispatch({type: 'CLEAR_HOST_EVENT_LIVE_RED'});


   
    };
  }, []);

  useEffect(() => {
 
    if (hostEventLiveRed.hasOwnProperty('meeting_info')) {
      setIsEventLive(true);
    }

  }, [hostEventLiveRed]);



  if (!loading) {
    return (
      <View style={{flex: 1}}>
       
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: '20%', paddingLeft: responsiveFontSize(2)}}
            onPress={() => navigation.navigate('live')}>
            <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} />
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
            Control Room
          </Text>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        <View style={styles.con}>
          {isEventLive ? (
            <>
            
    
              <LiveHostModal
                visible={isEventLive}
                eventID={route?.params?.event_id}
                closeModle={() => navigation.navigate('live')}
                meetingData={hostEventLiveRed}
              />
            </>
          ) : (
            <Text style={{fontSize:responsiveFontSize(tablet?1:1.75)}}>Event has not started yet.</Text>
          )}
        </View>
      </View>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = ({hostEventLiveRed}) => {
  return {hostEventLiveRed};
};

export default connect(mapStateToProps, liveEvents)(ControlRoom);

const styles = StyleSheet.create({
  con: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: responsiveFontSize(1),
    paddingTop: responsiveHeight(0.5),
    justifyContent: 'center',
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
});
