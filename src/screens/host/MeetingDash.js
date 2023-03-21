// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeFunction,
  getSDKEventEmitter,
  MobileSDKEvent,
  MeetingError,
} from './utils/Bridge';
import {RNVideoRenderView} from './components/RNVideoRenderView';
import rowFormate from '../../utils/rowFormate';
import {MuteButton} from './components/MuteButton';
import {CameraButton} from './components/CameraButton';
import {HangOffButton} from './components/HangOffButton';

const attendeeNameMap = {};

export default function MeetingDash({selfAttendeeId, closeModal}) {
  const [state, setState] = useState({
    attendees: [],
    videoTiles: [],
    mutedAttendee: [],
    selfVideoEnabled: false,
    meetingTitle: '',
    screenShareTile: null,
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const onAttendeesJoinSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesJoin,
      ({attendeeId, externalUserId}) => {
        if (!(attendeeId in attendeeNameMap)) {
          // The externalUserId will be a format such as c19587e7#Alice
          attendeeNameMap[attendeeId] = externalUserId.split('#')[1];
        }
        setState(preState => ({
          ...preState,
          attendees: preState.attendees.concat([attendeeId]),
        }));
      },
    );
    const onAttendeesLeaveSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesLeave,
      ({attendeeId}) => {
        setState(preState => ({
          ...preState,
          attendees: preState.attendees.filter((attendeeToCompare => attendeeId != attendeeToCompare)),
        }));
      },
    );
    const onAttendeesMuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesMute,
      attendeeId => {
        setState(preState => ({
          ...preState,
          mutedAttendee: preState.mutedAttendee.concat([attendeeId]),
        }));
      },
    );
    const onAttendeesUnmuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesUnmute,
      attendeeId => {
        setState(preState => ({
          ...preState,
          mutedAttendee: preState.mutedAttendee.filter(
            attendeeToCompare => attendeeId != attendeeToCompare,
          ),
        }));
      },
    );
    const onAddVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAddVideoTile,
      (tileState, ar) => {
        if (tileState.isScreenShare) {
          setState(preState => ({
            ...preState,
            screenShareTile: tileState.tileId,
          }));
        } else {
          setVideos(preState => [...preState, tileState.tileId]);
          setState(preState => ({
            ...preState,
            // videoTiles: preState.videoTiles.concat(tileState.tileId),
            selfVideoEnabled: tileState.isLocal
              ? true
              : preState.selfVideoEnabled,
          }));
          // for (let i = 0; i <= videos.length; i++) {
          //   let obj = videos[i];
          //   console.log(obj, 'obj');
          //   if (obj == tileState.tileId) {
          //   } else {
          //     setVideos(preState => [...preState, tileState.tileId]);
          //     setState(preState => ({
          //       ...preState,
          //       // videoTiles: preState.videoTiles.concat(tileState.tileId),
          //       selfVideoEnabled: tileState.isLocal
          //         ? true
          //         : preState.selfVideoEnabled,
          //     }));
          //   }
          // }
        }
      },
    );
    const onRemoveVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnRemoveVideoTile,
      tileState => {
        if (tileState.isScreenShare) {
          setState(preState => ({
            ...preState,
            screenShareTile: null,
          }));
        } else {
          setVideos(preState =>
            preState.filter(
              tileIdToCompare => tileIdToCompare != tileState.tileId,
            ),
          );
          setState(preState => ({
            ...preState,
            // videoTiles: preState.videoTiles.filter(tileIdToCompare => tileIdToCompare != tileState.tileId),
            selfVideoEnabled: tileState.isLocal
              ? false
              : preState.selfVideoEnabled,
          }));
        }
      },
    );
    const onDataMessageReceivedSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnDataMessageReceive,
      dataMessage => {
        const str = `Received Data message (topic: ${dataMessage.topic}) ${dataMessage.data} from ${dataMessage.senderAttendeeId}:${dataMessage.senderExternalUserId} at ${dataMessage.timestampMs} throttled: ${dataMessage.throttled}`;
        console.log(str);
        NativeFunction.sendDataMessage(dataMessage.topic, str, 1000);
      },
    );
    const onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      errorType => {
        switch (errorType) {
          case MeetingError.OnMaximumConcurrentVideoReached:
            Alert.alert(
              'Failed to enable video',
              'maximum number of concurrent videos reached!',
            );
            break;
          default:
            Alert.alert('Error', errorType);
            break;
        }
      },
    );
    return () => {
      onAttendeesJoinSubscription.remove();
      onAttendeesLeaveSubscription.remove();
      onAttendeesMuteSubscription.remove();
      onAttendeesUnmuteSubscription.remove();
      onAddVideoTileSubscription.remove();
      onRemoveVideoTileSubscription.remove();
      onDataMessageReceivedSubscription.remove();
      onErrorSubscription.remove();
    };
  }, []);

  // console.log(rowFormate(videos, 2));
  const currentMuted = state.mutedAttendee.includes(selfAttendeeId);
  return (
    <View style={[styles.container, {backgroundColor: 'black'}]}>
      <View style={[styles.videoContainer]}>
        {rowFormate(videos, 2).map(item => {
          return (
            <View
              style={{
                flexDirection: 'row',
                height: rowFormate(videos, 2).length > 1 ? '50%' : '100%',
              }}>
              {item.map((it, index) => {
                return (
                  <RNVideoRenderView
                    style={[
                      styles.video,
                      {
                        flex:
                          rowFormate(videos, 2).length == 1 && item.length == 1
                            ? 1
                            : 0.5,
                      },
                    ]}
                    key={index}
                    tileId={it}
                    resizeMode="cover"
                  />
                );
              })}
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <MuteButton
          muted={currentMuted}
          onPress={() => NativeFunction.setMute(!currentMuted)}
        />
        <CameraButton
          disabled={state.selfVideoEnabled}
          onPress={() => NativeFunction.setCameraOn(!state.selfVideoEnabled)}
        />
        <HangOffButton
          onPress={() => {
            NativeFunction.stopMeeting();
            closeModal();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // height: '95%',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    marginBottom: 25,
    marginTop: 10,
    color: 'grey',
  },
  videoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    // flexWrap:'wrap',
    // overflow: 'hidden',
  },
  video: {
    width: '50%',
    // margin: '1%',
    // aspectRatio: 16 / 12,
  },
  screenShare: {
    width: '45%',
    margin: '1%',
    aspectRatio: 16 / 12,
  },
  attendeeList: {
    flex: 1,
    width: '80%',
  },
  attendeeContainer: {
    fontSize: 20,
    margin: 5,
    padding: 5,
    height: 30,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  attendeeMuteImage: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  inputBox: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: '50%',
    padding: 10,
    color: 'black',
  },
  meetingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
