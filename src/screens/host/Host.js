// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Alert, Text, View} from 'react-native';
import {
  getSDKEventEmitter,
  MobileSDKEvent,
  NativeFunction,
} from './utils/Bridge';
import Loader from '../../components/Loader';
import MeetingDash from './MeetingDash';
import {useNavigation} from '@react-navigation/native';

function Host({userData, info, closeModal}) {
  const [meeting, setMeeting] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selfAttendeeId, setSeftAttendeeId] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const onMeetingStartSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingStart,
      () => {
        setMeeting(true);
      },
    );

    const onMeetingEndSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingEnd,
      () => {
        // alert('meeting end');
      },
    );

    const onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      message => {
        Alert.alert('SDK Error', message);
      },
    );

    let filterObj = info?.meeting_info?.Attendees;
    let mettingObj = info?.meeting_info?.Meeting;
    let obj = filterObj.filter(it => it.ExternalUserId == userData?.data?._id);
    setMeetingTitle(info?.event?.title);
    setSeftAttendeeId(obj[0].AttendeeId);
    NativeFunction.startMeeting(mettingObj, obj[0]);
    console.log('hellow');

    const unsubscribe = navigation.addListener('blur', () => {
      onMeetingStartSubscription.remove();
      onMeetingEndSubscription.remove();
      onErrorSubscription.remove();
  
    });

    return unsubscribe;
    // return () => {
    //   onMeetingStartSubscription.remove()
    //   onMeetingEndSubscription.remove()
    //   onErrorSubscription.remove()
    //   alert('rem')
    // }
  }, [navigation]);

  if (!meeting) {
    return <Loader color={'white'} />;
  }

  return (
    <MeetingDash meetingTitle={meetingTitle} selfAttendeeId={selfAttendeeId} closeModal={closeModal} />
  );
}

export default Host;
