// @ts-nocheck
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Alert, Text} from 'react-native';
import {Login} from './containers/Login';
import Meeting from './containers/Meeting';
import {createMeetingRequest} from './utils/Api';
import {
  getSDKEventEmitter,
  MobileSDKEvent,
  NativeFunction,
} from './utils/Bridge';
import styles from './Style';
import Loader from '../../../components/Loader';
// import LoudSpeakers from 'react-native-loud-speaker';
const App = ({userData, info, closeModal, event_id, call}) => {
  const [isMeeting, onChangeMeeting] = useState(false);
  const [isLoading, onChangeIsLoading] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selfAttendeeId, setSeftAttendeeId] = useState('');

  useEffect(() => {
    const onMeetingStartSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingStart,
      () => {
        // alert("OnMeetingStart")
        // this.setState({ isInMeeting: true, isLoading: false });
        onChangeMeeting(true);
        onChangeIsLoading(false);
      },
    );

    const onMeetingEndSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingEnd,
      () => {
        // alert("OnMeetingEnd")
        // this.setState({ isInMeeting: false, isLoading: false });
        onChangeMeeting(false);
        onChangeIsLoading(false);
      },
    );

    const onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      message => {
        Alert.alert('SDK Error', message);
      },
    );
    return () => {
      onMeetingEndSubscription.remove();
      onMeetingStartSubscription.remove();
      onErrorSubscription.remove();
    };
  }, []);

  useEffect(() =>{
    // LoudSpeakers.open(true)
      let filterObj = info?.meeting_info?.Attendees;
      let mettingObj = info?.meeting_info?.Meeting;
      let obj = filterObj.filter(it => it.ExternalUserId == userData?.data?._id);
      setMeetingTitle(info?.event?.title);
      setSeftAttendeeId(obj[0]?.AttendeeId);
      NativeFunction.startMeeting(mettingObj, obj[0]);
  },[])

  if (!isMeeting) {
    return <Loader color={'white'} />;
  }

  return (
    <React.Fragment>
      <StatusBar />
      <SafeAreaView>
        <Meeting
          meetingTitle={meetingTitle}
          info={info}
          selfAttendeeId={selfAttendeeId}
          closeModal={closeModal}
          userId={userData?.data?._id}
          eventId={event_id}
          eventStatus={info?.event_status}
          callFunc={call}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       isInMeeting: false,
//       isLoading: false,
//       meetingTitle: '',
//       selfAttendeeId: ''
//     }
//   }

//   componentDidMount() {
//     this.onMeetingStartSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnMeetingStart, () => {
//       this.setState({ isInMeeting: true, isLoading: false });
//     });

//     this.onMeetingEndSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnMeetingEnd, () => {
//       this.setState({ isInMeeting: false, isLoading: false });
//     });

//     this.onErrorSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnError, (message) => {
//       Alert.alert("SDK Error", message);
//     });
//   }
//   // let filterObj = info?.meeting_info?.Attendees;
//   // let mettingObj = info?.meeting_info?.Meeting;
//   // let obj = filterObj.filter(it => it.ExternalUserId == userData?.data?._id);
//   // setMeetingTitle(info?.event?.title);
//   // setSeftAttendeeId(obj[0].AttendeeId);
//   // NativeFunction.startMeeting(mettingObj, obj[0]);
//   componentWillUnmount() {
//     if (this.onMeetingEndSubscription) {
//       this.onMeetingEndSubscription.remove();
//     }
//     if (this.onMeetingStartSubscription) {
//       this.onMeetingStartSubscription.remove();
//     }
//     if (this.onErrorSubscription) {
//       this.onErrorSubscription.remove();
//     }
//   }

//   initializeMeetingSession = (meetingName, userName) => {
//     this.setState({
//       isLoading: true,
//     })

//     createMeetingRequest(meetingName, userName).then(meetingResponse => {
//       this.setState({
//         meetingTitle: meetingName,
//         selfAttendeeId: meetingResponse.JoinInfo.Attendee.Attendee.AttendeeId
//       })
//       NativeFunction.startMeeting(meetingResponse.JoinInfo.Meeting.Meeting, meetingResponse.JoinInfo.Attendee.Attendee);
//     }).catch(error => {
//       Alert.alert("Unable to find meeting", `There was an issue finding that meeting. The meeting may have already ended, or your authorization may have expired.\n ${error}`);
//       this.setState({ isLoading: false });
//     });
//   }

//   renderRoute() {
//     if (this.state.isInMeeting) {
//       return <Meeting meetingTitle={this.state.meetingTitle} selfAttendeeId={this.state.selfAttendeeId} />;
//     } else {
//       return <Login isLoading={this.state.isLoading} onSubmit={(meetingName, userName) => this.initializeMeetingSession(meetingName, userName)} />;
//     }
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <StatusBar />
//         <SafeAreaView>
//           { this.renderRoute() }
//         </SafeAreaView>
//       </React.Fragment>
//     );
//   }
// }
export default App;
