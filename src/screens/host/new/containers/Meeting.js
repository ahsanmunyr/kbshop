// @ts-nocheck
import React, { useCallback, useRef } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import styles from '../Style';
import {
  NativeFunction,
  getSDKEventEmitter,
  MobileSDKEvent,
  MeetingError,
} from '../utils/Bridge';
import { RNVideoRenderView } from '../components/RNVideoRenderView';
import { MuteButton } from '../components/MuteButton';
import { CameraButton } from '../components/CameraButton';
import { HangOffButton } from '../components/HangOffButton';
import { AttendeeItem } from '../components/AttendeeItem';
import rowFormate from '../../../../utils/rowFormate';
// import LoudSpeaker from 'react-native-loud-speaker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Loader from '../../../../components/Loader';
import * as liveEvent from '../../../../store/actions/liveEvents';
import {connect} from 'react-redux';
import colors from '../../../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
const tablet = deviceInfo.isTablet();
// Maps attendee Id to attendee Name
const attendeeNameMap = {};

class Meeting extends React.Component {
  constructor() {
    super();
    this.state = {
      attendees: [],
      videoTiles: [],
      mutedAttendee: [],
      selfVideoEnabled: true,
      meetingTitle: '',
      screenShareTile: null,
      selectedTile: "",
      someCondition: false
    };
  }

  componentDidMount() {
    // LoudSpeaker.open(true)
    /**
     * Attendee Join and Leave handler
     */

    NativeFunction.setCameraOn(true)
    this.onAttendeesJoinSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesJoin,
      ({ attendeeId, externalUserId }) => {
        if (!(attendeeId in attendeeNameMap)) {

          // The externalUserId will be a format such as c19587e7#Alice
          attendeeNameMap[attendeeId] = externalUserId.split('#')[1];
        }
        this.setState(oldState => ({
          ...oldState,
          attendees: oldState.attendees.concat([attendeeId]),
        }));
      },
    );

    this.onAttendeesLeaveSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesLeave,
      ({ attendeeId }) => {
        this.setState(oldState => ({
          ...oldState,
          attendees: oldState.attendees.filter(
            attendeeToCompare => attendeeId != attendeeToCompare,
          ),
        }));
      },
    );

    /**
     * Attendee Mute & Unmute handler
     */
    this.onAttendeesMuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesMute,
      attendeeId => {
        this.setState(oldState => ({
          ...oldState,
          mutedAttendee: oldState.mutedAttendee.concat([attendeeId]),
        }));
      },
    );

    this.onAttendeesUnmuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesUnmute,
      attendeeId => {
        this.setState(oldState => ({
          ...oldState,
          mutedAttendee: oldState.mutedAttendee.filter(
            attendeeToCompare => attendeeId != attendeeToCompare,
          ),
        }));
      },
    );

    /**
     * Video tile Add & Remove Handler
     */
    this.onAddVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAddVideoTile,
      tileState => {
        // tileState.attendeeId
        const currentAttendeeInfo =
          this.props.info?.meeting_info?.Attendees.filter(
            it => it.ExternalUserId == this.props.userId,
          );
        const user = currentAttendeeInfo[0]?.AttendeeId == tileState.attendeeId;
        if (tileState.isScreenShare) {
          this.setState(oldState => ({
            ...oldState,
            screenShareTile: tileState.tileId,
          }));
        } else {

          const test = this.props.info?.meeting_info?.Attendees.filter(
            it => it.ExternalUserId == this.props.userId,
          );
          if (this.state.videoTiles.length == 0 && !tileState.tileId) {
            setTimeout(() => this.setState({someCondition: true}), 10000);
          }
          this.setState(oldState => ({
            ...oldState,
            videoTiles: [...oldState.videoTiles, tileState.tileId],
            selectedTile:
              this.props.info?.meeting_info?.Attendees.filter(
                it => it.ExternalUserId == this.props.userId,
              )[0]?.AttendeeId == tileState.attendeeId
                ? tileState.tileId
                : oldState.selectedTile,
            selfVideoEnabled: tileState.isLocal
              ? true
              : oldState.selfVideoEnabled,
          }));
        }
      },
    );

    this.onRemoveVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnRemoveVideoTile,
      tileState => {
        // alert("OnRemoveVideoTile")
        if (tileState.isScreenShare) {
          this.setState(oldState => ({
            ...oldState,
            screenShareTile: null,
          }));
        } else {
          this.setState(oldState => ({
            ...oldState,
            videoTiles: oldState.videoTiles.filter(
              tileIdToCompare => tileIdToCompare != tileState.tileId,
            ),
            selfVideoEnabled: tileState.isLocal
              ? false
              : oldState.selfVideoEnabled,
          }));
        }
      },
    );

    /**
     * Data message handler
     */
    this.onDataMessageReceivedSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnDataMessageReceive,
      dataMessage => {
        const str = `Received Data message (topic: ${dataMessage.topic}) ${dataMessage.data} from ${dataMessage.senderAttendeeId}:${dataMessage.senderExternalUserId} at ${dataMessage.timestampMs} throttled: ${dataMessage.throttled}`;
        // console.log(str);
        NativeFunction.sendDataMessage(dataMessage.topic, str, 1000);
      },
    );



    this.onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      errorType => {
        console.log(errorType, "errorTypeerrorTypeerrorTypeerrorType");
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
  }

  componentWillUnmount() {
    if (this.onAttendeesJoinSubscription) {
      this.onAttendeesJoinSubscription.remove();
    }
    if (this.onAttendeesLeaveSubscription) {
      this.onAttendeesLeaveSubscription.remove();
    }
    if (this.onAttendeesMuteSubscription) {
      this.onAttendeesMuteSubscription.remove();
    }
    if (this.onAttendeesUnmuteSubscription) {
      this.onAttendeesUnmuteSubscription.remove();
    }
    if (this.onAddVideoTileSubscription) {
      this.onAddVideoTileSubscription.remove();
    }
    if (this.onRemoveVideoTileSubscription) {
      this.onRemoveVideoTileSubscription.remove();
    }
    if (this.onDataMessageReceivedSubscription) {
      this.onDataMessageReceivedSubscription.remove();
    }
    if (this.onMeetingEndSubscription) {
      this.onMeetingEndSubscription.remove();
    }
    if (this.onErrorSubscription) {
      this.onErrorSubscription.remove();
    }
  }

  onOpen = () => {
    // LoudSpeaker.open(true);
  };

  onAbout = () => {
    // LoudSpeaker.about()
    //   .then(data => {
    //     console.log(data);
    //     // alert(data)
    //   })
    //   .catch(e => {
    //     alert(e);
    //   });
  };



  render() {
    const currentMuted = this.state.mutedAttendee.includes(
      this.props.selfAttendeeId,
    );


    if(
      this.state.videoTiles.length == 0 && this.state.someCondition
      ){
      return (
        <View style={{backgroundColor:'black', flex: 1, justifyContent:'center', alignItems:'center', marginTop: responsiveFontSize(tablet? 30: 40), flexDirection:'column'}}>
          <View style={{height: responsiveFontSize(10), width: '100%'}}>
            <Text style={{color:'white', fontSize: responsiveFontSize(tablet ? 3 : 4), textAlign:'center'}}>Meeting is ended</Text>
          </View>
          <View
              style={{
                width: '20%',
                height: responsiveFontSize(tablet ? 3 : 4),
                backgroundColor: 'red',
                borderRadius: responsiveFontSize(0.5),
                justifyContent:"center"
              }}>
              <TouchableOpacity
                onPress={() => {
                  NativeFunction.stopMeeting();
                  this.props.closeModal();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: responsiveFontSize(4),
                }}>
                <Text style={{ color: 'white' }}>Exit</Text>
              </TouchableOpacity>
            </View>

        </View>
      )
    }

    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'flex-start', backgroundColor: 'black'},
        ]}>
        <View style={styles.videoContainer}>

          <View style={{flex: 1, width: '100%'}} />
          <View
            style={{
              bottom: responsiveFontSize(6.5),
              flexDirection: 'column',
              width: responsiveWidth(100),
            }}>
            {this.state.videoTiles?.length > 0 ? (
              <>
                {this.state.videoTiles.map((tileId, i) => {
                  if (this.state.selectedTile == tileId) {
                    // console.log(this.state.selectedTile, '!==', tileId);
                    return (
                      <View
                        style={[
                          {
                            width: responsiveWidth(100),
                            height:  this.state.videoTiles.length > 1
                            ? responsiveHeight(55.5)
                            : responsiveHeight(tablet? 78.1:76.5),
                            zIndex: 1,
                          },
                          this.state.selectedTile != tileId && {bottom: 0},
                          // this.state.selectedTile != tileId && {left: 0},
                          this.state.selectedTile != tileId && {zIndex: 99},
                        ]}
                        key={tileId}>
                        <TouchableOpacity onPress={() => {}} key={tileId}>
                          <RNVideoRenderView
                            style={{
                              width: responsiveWidth(100),
                              height:
                                this.state.videoTiles.length > 1
                                  ? responsiveHeight(55.5)
                                  : responsiveHeight(tablet? 78.1:76.5),
                            }}
                            tileId={tileId}
                            key={tileId}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
                <View
                  style={{
                    height: responsiveFontSize(tablet? 15.1:20.2),
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    backgroundColor:"black"
                  }}>
                  {this.state.videoTiles.map((tileId, i) => {
                    if (this.state.selectedTile !== tileId) {
                      console.log(this.state.selectedTile, '!==', tileId);
                      return (
                        <View
                          style={[
                            {
                              width: responsiveWidth(33.33),
                              height: responsiveFontSize(tablet? 22:25),
                              backgroundColor:"black"
                              // position: 'absolute',
                              // zIndex: 2,
                              // bottom: 0,
                              // zIndex: 99,
                            },
                          ]}
                          key={tileId}>
                          <TouchableOpacity onPress={() => {}} key={tileId}>
                            <RNVideoRenderView
                              style={{
                                width: responsiveWidth(33.33),
                                height: responsiveFontSize(tablet? 22:25),
                              }}
                              tileId={tileId}
                              key={tileId}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  })}
                </View>
              </>
            ) : (
              <Text style={styles.subtitle}>
                No one is sharing video at this moment
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            height: tablet? responsiveHeight(5): responsiveHeight(6.5),
            zIndex:9999,
            flexDirection:'row',justifyContent:'space-around',
            alignItems:'center'
          }}>
        
            <MuteButton
              muted={currentMuted}
              onPress={() => NativeFunction.setMute(!currentMuted)}
            />
            <CameraButton
              disabled={this.state.selfVideoEnabled}
              onPress={() => {
                if (this.state.selfVideoEnabled) {
                  NativeFunction.setCameraOn(false);
                } else {
                  NativeFunction.setCameraOn(true);
                }
              }}
            />
            {this.props.authRed.data?.account_type == 'brand'
              ? this.props?.info?.event?.event_status !== 'live' && (
                  <View
                    style={{
                      width: '20%',
                      height: responsiveFontSize(4),
                      backgroundColor: 'red',
                      borderRadius: responsiveFontSize(0.5),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props
                          .go_live(this.props.eventId)
                          .then(() =>
                            this.props.getIsHostEventLive(this.props.eventId),
                          );
                        // alert("go live")
                        // NativeFunction.stopMeeting();
                        // this.props.closeModal();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: responsiveFontSize(4),
                      }}>
                      <Text style={{color: 'white'}}>Go Live</Text>
                    </TouchableOpacity>
                  </View>
                )
              : null}
            <View
              style={{
                width: '20%',
                height: tablet? responsiveHeight(4): responsiveFontSize(4),
                backgroundColor: 'red',
                borderRadius: responsiveFontSize(0.5),
              }}>
              <TouchableOpacity
                onPress={() => {
                  // this.createTwoButtonAlert();
                    // alert("COMING SOON")
                  NativeFunction.stopMeeting();
                  this.props.closeModal();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: tablet? responsiveHeight(4): responsiveFontSize(4),
                }}>
                <Text style={{color: 'white',fontSize:tablet? responsiveFontSize(1.2):responsiveFontSize(1.8)}}>
                Leave
                  {/* {this.props.authRed.data?.account_type == 'brand'
                    ? 'Exit'
                    : 'Leave'} */}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '20%',
                height: tablet? responsiveHeight(4): responsiveFontSize(4),
                backgroundColor: colors.themeblue,
                borderRadius: responsiveFontSize(0.5),
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.callFunc()
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: tablet? responsiveHeight(4): responsiveFontSize(4),
                }}>
                <Text style={{color: 'white',fontSize:tablet? responsiveFontSize(1.2):responsiveFontSize(1.8)}}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
      
        </View>
      </View>
    );
  }
}


const mapStateToProps = ({authRed}) => {
  return {authRed};
};

export default connect(mapStateToProps, liveEvent)(Meeting);

