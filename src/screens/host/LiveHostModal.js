// @ts-nocheck
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  SafeAreaProvider,
  AppState,
  BackHandler,
  Platform,
  findNodeHandle,
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import MicroPhone from 'react-native-vector-icons/FontAwesome';
import SwapCameraIcon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../assets/colors/colors';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';
import * as favAct from '../../store/actions/favouriteAct';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import * as myListAct from '../../store/actions/myListAct';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import * as urlShortnerAct from '../../store/actions/urlShortnerAct';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import config from '../../config/config';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';
import Host from './Host';
import Clipboard from '@react-native-community/clipboard';


import {
  NativeFunction,
  getSDKEventEmitter,
  MobileSDKEvent,
  MeetingError,
} from './utils/Bridge';
import App from './new/App';

const Spinner = () => (
  <View style={{ margin: 10 }}>
    <ActivityIndicator size="large" style={s.spinner} />
  </View>
);

const Button = ({ onPress, title }) => (
  <TouchableOpacity style={s.button} onPress={onPress}>
    <Text style={s.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const tablet = deviceInfo.isTablet();

const LiveHostModal = ({ visible, closeModle, data, meetingData, authRed, eventID }) => {
  const [activeTag, setActiveTag] = useState(0);
  const [mirror, setMirror] = useState(false);
  const [mute, setMute] = useState(false);

  const flatRef = useRef();

  const [isReadyToDisplay, setIsReadyToDisplay] = useState(true);
  const [front, setFront] = useState('front');
  const stateStatus = 'CONNECTED'; // temporary
  const isConnecting = stateStatus === 'CONNECTING';
  const isConnected = stateStatus === 'CONNECTED';
  const isDisconnected = stateStatus === 'DISCONNECTED';

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  const callBottomSheet = () => {
    console.log("callBottomSheet")
  }


  const requestPermissions = async () => {
    if (Platform.OS == 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };
  useLayoutEffect(() => {
    return () => {
      NativeFunction.stopMeeting();
    };
  }, []);

  const isStartButtonVisible = isDisconnected;

  function renderItem(item, index, data) {
    console.log(item, 'item');
    return (
      <View
        style={{
          flexDirection: 'row',
          width: responsiveWidth(96.5),
          marginHorizontal: responsiveFontSize(0.75),
          marginVertical: responsiveFontSize(0.75),
          backgroundColor: 'white',
          borderRadius: responsiveFontSize(0.5),
          padding: responsiveFontSize(0.5),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{ width: tablet ? responsiveWidth(20): responsiveWidth(25), alignItems: 'center' }}>
          <Image
            source={{
              uri: item?.mediaUrl,
            }}
            resizeMode={'cover'}
            style={{
              width: '100%',
              flex: 1,
              borderRadius: responsiveFontSize(tablet?0.25:0.5),
            }}
          />
        </View>
        <View
          style={{
            width: tablet ? responsiveWidth(75) : responsiveWidth(70),
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(1),

          }}>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', 
          height: tablet? responsiveHeight(15): responsiveFontSize(20),  }}>
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: responsiveFontSize(tablet ? 1.25 : 1.8),
                  minHeight: responsiveHeight(7.2),
                }}>
                {item.ProductName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(0.4),
                width: '100%',
              }}>
            
                <Text style={{ color: 'green',fontSize: tablet? responsiveFontSize(1.25): responsiveFontSize(2) }}>${item.productAmount}</Text>
        
              {/* <Text style={{fontSize: responsiveFontSize(tablet ? 1 : 1.8)}}>
                {item.ProductSku}
              </Text> */}
              <TouchableOpacity
                onPress={() => { Clipboard.setString(item?.ProductUrl) }}
                style={{
                   justifyContent: 'center', alignItems: 'center',
                  backgroundColor: colors.themeblue, borderRadius: responsiveFontSize(tablet?0.5:1),
                  paddingHorizontal:responsiveScreenHeight(2),
                  paddingVertical:responsiveScreenHeight(tablet?0.75:1.2)
                }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: tablet? responsiveFontSize(1.25): responsiveFontSize(2) }}>Copy URL</Text>
              </TouchableOpacity>
              {/* <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                <Text style={{color: 'green'}}>${item.productAmount}</Text>
              </Text> */}
            </View>
          </View>
        </View>
      </View>
    );
  }

  const onChangeItemBottom = useCallback(({ viewableItems }) => {
    setActiveTag(viewableItems[0]?.index);
  }, []);

  function renderBottomItem(data) {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem(item, index, data)}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        ref={flatRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  // const closeMeeting = (cb) => {
  //   closeModle();
  //     console.log("CLOSE MEETING")
  //     cb()
  // }




  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={closeModle}
        visible={visible}
        supportedOrientations={['landscape']}
        style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: height,
              backgroundColor: 'rgba(0,0,0,0.35)',
            }}>
            <View style={{ ...styles.con, backgroundColor: 'white' }}>
              <View
                style={{
                  // ...styles.btn,
                  zIndex: 1,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  backgroundColor: 'rgba(0,0,0,0)',
                }}>
                <TouchableOpacity
                  style={{
                    padding: responsiveFontSize(0.5),
                    borderRadius: responsiveFontSize(0.5),
                  }}
                  onPress={() => {
                    // closeMeeting();
                    NativeFunction.stopMeeting();
                    closeModle();
             
                  }}>
                  <IconCross
                    name="cross"
                    color={'white'}
                    size={responsiveFontSize(tablet ? 2 : 3)}
                  />
                </TouchableOpacity>
              </View>
              {
                meetingData.event_status == 'live' &&
                <View style={{
                   borderRadius: responsiveFontSize(0.5), zIndex: 1,
                  position: 'absolute',
                  right: responsiveFontSize(2),
                  top: 10,
                  paddingHorizontal:responsiveFontSize(2),
                  paddingVertical:responsiveFontSize(0.5),
                  backgroundColor: 'red',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={{ color: 'white', fontSize: tablet? responsiveScreenHeight(1.2): responsiveFontSize(1.8), textAlign: 'center' }} >Live</Text>
                </View>
              }
              <View style={{ flex: 1, width: responsiveWidth(100) }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: tablet? 4: 3.25 }}>
                    <View
                      style={{
                        flex: 1,
                        // width: responsiveWidth(100),
                        backgroundColor: 'black',
                      }}>
                      {visible && (
                        <>
                          {isReadyToDisplay ? (
                            <>
                              {/* code from github repo */}
                              <App userData={authRed} event_id={eventID} call={callBottomSheet} info={meetingData} closeModal={closeModle} />
                              {/* <Host userData={authRed} info={meetingData} closeModal={closeModle} /> */}
                            </>
                          ) : (
                            <Text style={{ color: 'white' }}>loading</Text>
                          )}
                        </>
                      )}
                    </View>
                  </View>

                  <View style={{ ...styles.con2 }}>
                    {renderBottomItem(meetingData?.event?.products)}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

    </>
  );
};

function mapStateToProps({ authRed }) {
  return { authRed };
}

export default connect(mapStateToProps, {
  ...myListAct,
  ...favAct,
  ...urlShortnerAct,
})(LiveHostModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  con: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 20,
  },
  iconCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(242, 242, 242)',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingRight: responsiveFontSize(1.2),
    paddingVertical: responsiveFontSize(1),
    // borderTopLeftRadius: responsiveFontSize(2.2),
    // borderTopRightRadius: responsiveFontSize(2.2)
  },
  icon: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#001441',
    width: '18%',
    height: '18%',
    borderRadius: '18%' / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    borderBottomWidth: 0.5,
    padding: responsiveFontSize(1.5),
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    paddingRight: responsiveFontSize(2),
  },
  con2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(242, 242, 242)',
    justifyContent: 'space-between',
    width: '100%',
    // flexDirection: 'row',
    // backgroundColor: 'rgb(242, 242, 242)',
    // justifyContent: 'space-between',
    // width: responsiveWidth(45),
    // borderBottomLeftRadius:responsiveFontSize(2.2),
    // borderBottomRightRadius:responsiveFontSize(2.2),
  },
  btn2: {
    // backgroundColor:"gray",
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(tablet ? 0.4 : 0.75),
    width: '90%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
  },
  btnSquareCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: tablet ? '30%' : '45%',
  },
  btnSquare: {
    backgroundColor: colors.themeblue,
    width: '49%',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
    padding: responsiveFontSize(tablet ? 0.5 : 1),
  },
  videoPlay: {
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: '#010b40',
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    position: 'absolute',
    // top: '50%',
    alignSelf: 'center',
    top: responsiveHeight(26),
    left: responsiveWidth(42),

    zIndex: 999,
    // right: 3,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveWidth(10),
    width: responsiveWidth(10),
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  text: {
    fontWeight: '600',
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  disBox: {
    position: 'absolute',
    height: responsiveHeight(5),
    width: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(3),
    paddingVertical: responsiveFontSize(0.2),
  },
  tagCont: {
    width: responsiveWidth(tablet ? 4 : 8),
    height: responsiveWidth(tablet ? 4 : 8),
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
    borderRadius: responsiveWidth(tablet ? 2 : 4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errCont: {
    backgroundColor: '#000',
    width: tablet ? '75%' : '100%',
    height: responsiveHeight(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errMsg: {
    textAlign: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(2.5),
  },
});

const s = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButtonContainer: {
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    margin: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  metaDataContainer: {
    flex: 1,
  },
  metaDataText: {
    color: '#ffffff',
  },
  liveText: {
    color: '#ffffff',
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  primaryContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  contBottomRight: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    // backgroundColor:"red"
  },
  muteUnmuteMic: {
    // backgroundColor:"blue",
    margin: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
    // paddingVertical:10,
    width: 40,
    height: 40,
    // width:50,
    borderRadius: 60,
  },
});
