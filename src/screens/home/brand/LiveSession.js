
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  Platform
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
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';
import * as favAct from '../../../store/actions/favouriteAct';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import * as myListAct from '../../../store/actions/myListAct';
import deviceInfo from 'react-native-device-info';
import AutoHeightImage from 'react-native-auto-height-image';
import * as urlShortnerAct from '../../../store/actions/urlShortnerAct';
import Loader from '../../../components/Loader';
import Toast from 'react-native-toast-message';
import config from '../../../config/config';
import {
  IAudioStats,
  StateStatusUnion,
  IBroadcastSessionError,
  IVSBroadcastCameraView,
  IIVSBroadcastCameraView
} from 'amazon-ivs-react-native-broadcast';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';

const SessionReadyStatus1 = {
  None: 'NONE',
  Ready: 'READY',
  NotReady: 'NOT_READY',
}

const { None, NotReady, Ready } = SessionReadyStatus1;
const { rtmpsUrl, streamKey } = config

const INITIAL_BROADCAST_STATE_STATUS = 'INVALID'
const INITIAL_STATE = {
  readyStatus: None,
  stateStatus: INITIAL_BROADCAST_STATE_STATUS,
};
const INITIAL_META_DATA_STATE = {
  audioStats: {
    rms: 0,
    peak: 0,
  },
  streamQuality: 0,
  networkHealth: 0,
};
const VIDEO_CONFIG = {
  width: 720,
  height: 1280,
  bitrate: 700000,
  targetFrameRate: 30,
  keyframeInterval: 2,
  isBFrames: true,
  isAutoBitrate: true,
  maxBitrate: 8500000,
  minBitrate: 1500000,
}
const AUDIO_CONFIG = {
  bitrate: 160000,
  channels: 2
}
const Spinner = () => <View style={{ margin: 10 }}><ActivityIndicator size="large" style={s.spinner} /></View>;

const Button = ({ onPress, title }) => (
  <TouchableOpacity style={s.button} onPress={onPress}>
    <Text style={s.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const children1 = [{ "ProductName": "Vaughn Trucker | Aspen Mid", "ProductSku": "11362", "ProductUrl": "https://www.dl1961.com/products/vaughn-trucker-aspen-mid?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1", "coordinates": [[Object]], "id": "4be7d9b4-d8cc-4beb-8c27-7704b1482b2f", "imgid": 76143, "isFavoriteChild": false, "media_url": "https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11362_VAUGHN_ASPENMID_027.jpg?v=1657557447", "productAmount": "158.00", "productCategory": ["62b6fed85dc7524f880aed88"], "productDesc": "Vaughn is a vintage-inspired classic trucker jacket that’s neat at the shoulders and straight through the body.", "productPromoCodeDscs": "0%", "productPromoCodePromo": "KB0", "skuDataOther": "" }, { "ProductName": "Sean Shirt Jacket | Dark Rinse", "ProductSku": "11365", "ProductUrl": "https://www.dl1961.com/products/sean-shirt-jacket-dark-rinse?roiEvent=true&pixel_id=900000000&publisher_id=62445d2e6ca1dd9c2398e299&advertiser_id=61d373de54c7db79889ecd2e&post_id=62ec06951a93a79e5b0f9ef2&brand=1", "coordinates": [[Object]], "id": "1584a030-b4b4-459a-be96-c513cab26db6", "imgid": 78324, "isFavoriteChild": false, "media_url": "https://cdn.shopify.com/s/files/1/2397/3099/products/220316_DL1961_FW22_11365_SEANSHIRTJACKET_DARKRINSE_1033.jpg?v=1657557593", "productAmount": "168.00", "productCategory": ["62b6fed85dc7524f880aed88"], "productDesc": "Sean is a long sleeve shirt jacket with a boxy fit, featuring a button front closure and front patch pockets.", "productPromoCodeDscs": "0%", "productPromoCodePromo": "KB0", "skuDataOther": "" }]
const tablet = deviceInfo.isTablet();


const toastConfig = {
  error: ({ text1, props }) => (
    <View
      style={{
        paddingVertical: responsiveHeight(1),
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: responsiveFontSize(0.75),
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: 'tomato',
      }}>
      <Text
        style={{
          paddingHorizontal: responsiveFontSize(3),
          fontSize: responsiveFontSize(1.5),
          fontWeight: 'bold',
          color: '#000000',
        }}>
        {text1}
      </Text>
    </View>
  ),
};

function LiveSessionModal({
  visible,
  closeModle,
  bioShopReducer,
  data,
  addFavourite,
  addToMyList,
  bioShopAllPosts,
  loadMore,
  categoriesReducer,
  select,
  dis,
  openWeb,
  deleteFavourite,
  removeItemMyList,
  brandLike,
  cbForHeart,
  authRed,
  urlShortner,
  brandName,
  discount,
}) {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [current, setCurrent] = React.useState({});
  const [scroll, setScroll] = useState(0);
  const [initialIndex, setInitialIndex] = useState(0);
  const [tagsData, setTagsData] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [isShareApi, setIsShareApi] = useState(false);
  const [pause, onSetPause] = React.useState(false);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isSession, setIsSession] = useState(true);
  const [mirror, setMirror] = useState(false)
  const [mute, setMute] = useState(false)

  const [counter, setCounter] = useState(4)
  const [playerState, setPlayerState] = useState("")
  const videoPlayer = useRef();


  const flatRef = useRef();
  const dispatch = useDispatch();
  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };

  const cameraViewRef = useRef(null);

  const [{ stateStatus, readyStatus }, setState] = useState(INITIAL_STATE);

  const [{ audioStats, networkHealth, streamQuality }, setMetaData] = useState(INITIAL_META_DATA_STATE);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [front, setFront] = useState("front")

  const isConnecting = stateStatus === 'CONNECTING';
  const isConnected = stateStatus === 'CONNECTED';
  const isDisconnected = stateStatus === 'DISCONNECTED';

  const requestPermissions = async () => {
    if (Platform.OS == "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  useEffect(() => {

    (async () => {
      try {
        await requestPermissions();
      } finally {
        setIsReadyToDisplay(true);
      }
    })();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        cameraViewRef.current?.stop();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (readyStatus === NotReady) {
      Alert.alert(
        'Sorry, something went wrong :(',
        'Broadcast session is not ready. Please try again.'
      );
    }
  }, [readyStatus]);

  const onIsBroadcastReadyHandler = useCallback(
    (isReady) =>
      setState(currentState => ({
        ...currentState,
        readyStatus: isReady ? Ready : NotReady,
      })),
    []
  );

  const onBroadcastStateChangedHandler = useCallback(
    (status) =>
      setState(currentState => ({
        ...currentState,
        stateStatus: status,
      })),
    []
  );

  const onBroadcastAudioStatsHandler = useCallback(
    (stats) =>
      // setMetaData(currentState => ({
      //   ...currentState,
      //   audioStats: {
      //     ...currentState.audioStats,
      //     ...stats,
      //   },
      // })),
      []
  );
  const onBroadcastQualityChangedHandler = useCallback(
    (quality) =>
      // setMetaData(currentState => ({
      //   ...currentState,
      //   streamQuality: quality,
      // })),
      []
  );
  const onNetworkHealthChangedHandler = useCallback(
    (health) =>
      // setMetaData(currentState => ({
      //   ...currentState,
      //   networkHealth: health,
      // })),
      []
  );

  const onBroadcastErrorHandler = useCallback(
    (exception) =>
      console.log('Broadcast session error: ', exception),
    []
  );

  const onErrorHandler = useCallback(
    (errorMessage) =>
      console.log('Internal module error: ', errorMessage),
    []
  );

  const onMediaServicesWereLostHandler = useCallback(
    () => console.log('The media server is terminated.'),
    []
  );

  const onMediaServicesWereResetHandler = useCallback(
    () => console.log('The media server is restarted.'),
    []
  );

  const onPressPlayButtonHandler = useCallback(
    () => cameraViewRef.current?.start(),
    []
  );


  const onPressStopButtonHandler = useCallback(
    () => cameraViewRef.current?.stop(),
    []
  );

  const onPressSwapCameraButtonHandler = useCallback(
    // () => cameraViewRef.current?.swapCamera(),
    () => {
      alert(front == "front" ? "back" : "front")
      setFront(front == "front" ? "back" : "front")
    },
    []
  );

  const isStartButtonVisible =
    isDisconnected || stateStatus === INITIAL_BROADCAST_STATE_STATUS;

  function renderItem(item, index, data) {
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
        <View style={{ width: tablet ? '17%' : '30%', alignItems: 'center' }}>
          <Image
            source={{
              uri: item.media_url,
            }}
            resizeMode={'cover'}
            style={{
              width: '100%',
              flex: 1,
              borderRadius: responsiveFontSize(0.5),
            }}
          />
        </View>
        <View
          style={{
            width: tablet ? '83%' : '70%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(1),
          }}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                minHeight: responsiveHeight(7.2),
              }}>
              {item.ProductName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(0.4),
              }}>
              <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.8) }}>
                {item.ProductSku}

              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                }}>
                <Text
                  style={{ color: 'green' }}>
                  ${item.productAmount}
                </Text>
              </Text>
            </View>
          </View>
          {/* <View style={styles.btnSquareCont}>
            <TouchableOpacity
              style={{ ...styles.btnSquare }}
              onPress={() => {
                // closeModle();
                openWeb({
                  ...item,
                  redirectLink: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ShopIcon
                  name="shopping-cart"
                  size={responsiveFontSize(tablet ? 1.25 : 2)}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.5),
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: responsiveFontSize(1)
                  }}>
                  Buy Now
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSquare}
              onPress={() => {
                setIsShareApi(true)
                urlShortner(`${item?.ProductUrl}&c_id=${authRed?.data?._id}`).then((res) => {
                  if (res?.message) {

                    Share.open({
                      title: item.ProductSku?.toString(),
                      url: res?.message,
                    })
                      .then(res => {
                        // console.log(res, 'RES');
                        closeModle();
                        setLikeChildItems(0);
                      })
                      .catch(err => {
                        err && console.log(err);
                      });
                  } else {
                    alert("Something went wrong")
                  }
                  setIsShareApi(false)
                })
                // Share.open({
                //   title: data?.instagram_username,
                //   url: `${item?.ProductUrl}&c_id=${authRed?.data?._id}`,
                // })
                //   .then(res => {
                //     console.log(res, 'RES');
                //     closeModle();
                //   })
                //   .catch(err => {
                //     err && console.log(err);
                //   });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isShareApi ?
                  <Loader size={2} color="#FFFFFF" /> :
                  <>
                    <ShareIcon
                      name="share"
                      size={responsiveFontSize(tablet ? 1.25 : 2)}
                      color="white"
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.5),
                        color: 'white',
                        textAlign: 'center',
                        marginLeft: responsiveFontSize(1)
                      }}>
                      SHARE
                    </Text>
                  </>
                }
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }

  const onChangeItemBottom = useCallback(({ viewableItems }) => {
    setActiveTag(viewableItems[0]?.index);
  }, []);

  console.log("check render")
  function renderBottomItem(data) {
    return (
      <FlatList
        data={children1}
        renderItem={({ item, index }) => renderItem(item, index, data)}
        keyExtractor={(item, i) => i.toString()}
        pagingEnabled={true}
        ref={flatRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onChangeItemBottom}
      />
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={closeModle}
      visible={visible}
      style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: height,
            backgroundColor: 'rgba(0,0,0,0.35)',
            // paddingTop: headerHeight,
            // paddingBottom: responsiveHeight(7.25),
          }}>
          <View style={{ ...styles.con, backgroundColor: 'white' }}>
            <View style={{ ...styles.btn, zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0)', }}>
              <TouchableOpacity
                style={{ padding: responsiveFontSize(0.5), borderRadius: responsiveFontSize(0.5) }}
                onPress={() => {
                  closeModle();
                }}>
                <IconCross
                  name="cross"
                  color={'white'}
                  size={responsiveFontSize(tablet ? 2 : 3)}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: responsiveWidth(100) }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 3.25 }}>
                  <View style={{ flex: 1, width: responsiveWidth(100), backgroundColor: 'black' }}>
                    {
                      visible && (
                        <>
                          {isReadyToDisplay ? (
                            <>
                              <View style={{ position: 'absolute', zIndex: 1, bottom: 1, width: "100%", }}>
                                {readyStatus === None ? (
                                  <Spinner />
                                ) : (
                                  readyStatus === Ready && (
                                    <>
                                      <View style={s.topContainer}>
                                        <View style={s.topButtonContainer}>
                                          {/* <Button
                                            title="Toggle mirroring"
                                            onPress={() => {
                                              setMirror(!mirror)
                                            }}
                                          /> */}
                                          {/* <Button
                                            title="Toggle Mute"
                                            onPress={() => {
                                              setMute(!mute)
                                            }}
                                          />
                                          <Button
                                            title="Swap"
                                            onPress={() => {
                                              setFront(front == "front" ? "back" : "front")
                                            }}
                                          /> */}
                                          {(isStartButtonVisible || isConnecting) && (
                                            <>
                                              {isStartButtonVisible && (
                                                <Button
                                                  title="Start"
                                                  onPress={onPressPlayButtonHandler}
                                                />
                                              )}
                                              {isConnecting && <Spinner />}
                                            </>
                                          )}
                                          {isConnected && (
                                            <Button title="End" onPress={onPressStopButtonHandler} />
                                          )}
                                        </View>
                                        <View style={s.contBottomRight}>
                                          {/* <Button
                                            title="Toggle Mute"
                                            onPress={() => {
                                              setMute(!mute)
                                            }}
                                          /> */}
                                          <TouchableOpacity
                                            style={s.muteUnmuteMic}
                                            onPress={() => {
                                              setMute(!mute)
                                            }}
                                          >
                                            {mute ?
                                              <MicroPhone
                                                name="microphone-slash"
                                                color={'white'}
                                                size={responsiveFontSize(tablet ? 1 : 2)}
                                              />
                                              :
                                              <MicroPhone
                                                name="microphone"
                                                color={'white'}
                                                size={responsiveFontSize(tablet ? 1 : 2)}
                                              />}
                                          </TouchableOpacity>
                                          {/* <Button
                                            title="Swap"
                                            onPress={() => {
                                              setFront(front == "front" ? "back" : "front")
                                            }}
                                          /> */}
                                          <TouchableOpacity
                                            style={s.muteUnmuteMic}
                                            onPress={() => {
                                              setFront(front == "front" ? "back" : "front")
                                            }}
                                          >
                                            <SwapCameraIcon
                                              name="camera-reverse"
                                              color={'white'}
                                              size={responsiveFontSize(tablet ? 1 : 2)}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                      </View>

                                      {/* {(isStartButtonVisible || isConnecting) && (
                                          <View style={s.middleContainer}>
                                            {isStartButtonVisible && (
                                              <Button
                                                title="Start"
                                                onPress={onPressPlayButtonHandler}
                                              />
                                            )}
                                            {isConnecting && <Spinner />}
                                          </View>
                                        )} */}
                                      <View style={s.bottomContainer}>
                                        {/* <View style={s.metaDataContainer}>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Peak ${audioStats.peak?.toFixed(
                                              2
                                            )}, Rms: ${audioStats.rms?.toFixed(2)}`}</Text>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Stream quality: ${streamQuality}`}</Text>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Network health: ${networkHealth}`}</Text>
                                          </View> */}
                                      </View>
                                    </>
                                  )
                                )}
                              </View>
                              <IVSBroadcastCameraView
                                ref={cameraViewRef}
                                style={s.cameraView}
                                rtmpsUrl={rtmpsUrl}
                                streamKey={streamKey}
                                videoConfig={VIDEO_CONFIG}
                                isMuted={mute}
                                audioConfig={AUDIO_CONFIG}
                                onError={onErrorHandler}
                                onBroadcastError={onBroadcastErrorHandler}
                                onIsBroadcastReady={onIsBroadcastReadyHandler}
                                onBroadcastAudioStats={onBroadcastAudioStatsHandler}
                                onNetworkHealthChanged={onNetworkHealthChangedHandler}
                                onBroadcastStateChanged={onBroadcastStateChangedHandler}
                                onBroadcastQualityChanged={onBroadcastQualityChangedHandler}
                                onMediaServicesWereLost={onMediaServicesWereLostHandler}
                                onMediaServicesWereReset={onMediaServicesWereResetHandler}
                                cameraPosition={front}
                                isCameraPreviewMirrored={mirror}
                                cameraPreviewAspectMode="fill"
                                {...(__DEV__ && {
                                  logLevel: 'debug',
                                  sessionLogLevel: 'debug',
                                })}
                              />
                              {isConnected && <View style={{ position: 'absolute', top: responsiveFontSize(1), left: responsiveFontSize(1),    padding: 8,backgroundColor: '#FF5C5C',borderRadius: 8, }}><Text style={s.liveText}>LIVE</Text></View>}
                              {/* 
                              <Modal
                                visible
                                transparent
                                animationType="fade"
                                supportedOrientations={['landscape', 'portrait']}
                              >
                                <SafeAreaProvider>
                                  {readyStatus === None ? (
                                    <Spinner />
                                  ) : (
                                    readyStatus === Ready && (
                                      <SafeAreaView style={s.primaryContainer}>
                                        <View style={s.topContainer}>
                                          <View style={s.topButtonContainer}>
                                            <Button
                                              title="Swap"
                                              onPress={onPressSwapCameraButtonHandler}
                                            />
                                            {isConnected && (
                                              <Button title="Stop" onPress={onPressStopButtonHandler} />
                                            )}
                                          </View>
                                        </View>
                                        {(isStartButtonVisible || isConnecting) && (
                                          <View style={s.middleContainer}>
                                            {isStartButtonVisible && (
                                              <Button
                                                title="Start"
                                                onPress={onPressPlayButtonHandler}
                                              />
                                            )}
                                            {isConnecting && <Spinner />}
                                          </View>
                                        )}
                                        <View style={s.bottomContainer}>
                                          <View style={s.metaDataContainer}>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Peak ${audioStats.peak?.toFixed(
                                              2
                                            )}, Rms: ${audioStats.rms?.toFixed(2)}`}</Text>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Stream quality: ${streamQuality}`}</Text>
                                            <Text
                                              style={s.metaDataText}
                                            >{`Network health: ${networkHealth}`}</Text>
                                          </View>
                                          {isConnected && <Text style={s.liveText}>LIVE</Text>}
                                        </View>
                                      </SafeAreaView>
                                    )
                                  )}
                                </SafeAreaProvider>
                              </Modal> */}
                            </>
                          ) : (
                            <Text>loading</Text>
                          )}
                        </>
                      )
                    }
                  </View>
                </View>
                <View style={{ ...styles.con2, flex: 1 }}>
                  {renderBottomItem(data)}
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <Toast
          visibilityTime={2000}
          config={toastConfig}
          ref={c => {
            if (c) Toast.toastInstance = c;
          }}
          onHide={() => closeModle()}
        /> */}
      </SafeAreaView>
    </Modal>
  );
}

function mapStateToProps({ bioShopAllPosts, categoriesReducer, authRed, bioShopReducer }) {
  return { bioShopAllPosts, categoriesReducer, authRed, bioShopReducer };
}

export default connect(mapStateToProps, {
  ...myListAct,
  ...favAct,
  ...urlShortnerAct,
})(LiveSessionModal);

const styles = StyleSheet.create({
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
    // borderBottomLeftRadius:responsiveFontSize(2.2),
    // borderBottomRightRadius:responsiveFontSize(2.2),
  },
  btn2: {
    // backgroundColor:"gray",
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(tablet ? 0.4 : 0.75),
    // width: '90%',
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
    backgroundColor: "#000",
    width: tablet ? '75%' : '100%',
    height: responsiveHeight(65),
    justifyContent: "center",
    alignItems: "center"
  },
  errMsg: {
    textAlign: "center",
    color: "#fff",
    fontSize: responsiveFontSize(2.5)
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
    color: '#ffffff'
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
    alignSelf: "flex-end",
    flexDirection: 'row',
    // backgroundColor:"red"
  },
  muteUnmuteMic: {
    // backgroundColor:"blue",
    margin: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    justifyContent: "center",
    alignItems: 'center',
    // paddingHorizontal: 15,
    // paddingVertical:10,
    width: 40,
    height: 40,
    // width:50,
    borderRadius: 60,
  }
});

// onPress={() => {
//     Share.open({
//         title:'BioShop',
//         url: `https://konnect.bio/${data.name}`
//     }).then((res) => {
//         console.log(res, "RES");
//         closeModle()

//       })
//       .catch((err) => {
//         err && console.log(err);
//       });
// }}












// import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
// import {
//   Text,
//   Modal,
//   View,
//   Alert,
//   AppState,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   TouchableOpacityProps,

// } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import config from '../../../config/config';
// import {
//   IAudioStats,
//   StateStatusUnion,
//   IBroadcastSessionError,
//   IVSBroadcastCameraView,
//   IIVSBroadcastCameraView
// } from 'amazon-ivs-react-native-broadcast';
// import { RNCamera } from 'react-native-camera';
// import { PermissionsAndroid } from 'react-native';

// const SessionReadyStatus1 = {
//   None: 'NONE',
//   Ready: 'READY',
//   NotReady: 'NOT_READY',
// }
// const { None, NotReady, Ready } = SessionReadyStatus1;
// const {rtmpsUrl,streamKey}=config

// const INITIAL_BROADCAST_STATE_STATUS = 'INVALID'
// const INITIAL_STATE = {
//   readyStatus: None,
//   stateStatus: INITIAL_BROADCAST_STATE_STATUS,
// };
// const INITIAL_META_DATA_STATE = {
//   audioStats: {
//     rms: 0,
//     peak: 0,
//   },
//   streamQuality: 0,
//   networkHealth: 0,
// };
// const VIDEO_CONFIG = {
//   width: 1920,
//   height: 1080,
//   bitrate: 700000,
//   targetFrameRate: 60,
//   keyframeInterval: 2,
//   isBFrames: true,
//   isAutoBitrate: true,
//   maxBitrate: 8500000,
//   minBitrate: 1500000,
// }
// const AUDIO_CONFIG = {
//   bitrate: 128000,
// }
// const Spinner = () => <ActivityIndicator size="large" style={s.spinner} />;

// const Button = ({ onPress, title }) => (
//   <TouchableOpacity style={s.button} onPress={onPress}>
//     <Text style={s.buttonText}>{title}</Text>
//   </TouchableOpacity>
// );

// const LiveSession = ({visible}) => {
//   const cameraViewRef = useRef(null);

//   const [{ stateStatus, readyStatus }, setState] = useState(INITIAL_STATE);

//   const [{ audioStats, networkHealth, streamQuality }, setMetaData] = useState(INITIAL_META_DATA_STATE);
//   const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

//   const isConnecting = stateStatus === 'CONNECTING';
//   const isConnected = stateStatus === 'CONNECTED';
//   const isDisconnected = stateStatus === 'DISCONNECTED';

//   const requestPermissions = async () => {
//     await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     ]);
//   };

//   useEffect(() => {

//     (async () => {
//       try {
//         await requestPermissions();
//       } finally {
//         setIsReadyToDisplay(true);
//       }
//     })();

//     const subscription = AppState.addEventListener('change', nextAppState => {
//       if (nextAppState === 'background') {
//         cameraViewRef.current?.stop();
//       }
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (readyStatus === NotReady) {
//       Alert.alert(
//         'Sorry, something went wrong :(',
//         'Broadcast session is not ready. Please try again.'
//       );
//     }
//   }, [readyStatus]);

//   const onIsBroadcastReadyHandler = useCallback(
//     (isReady) =>
//       setState(currentState => ({
//         ...currentState,
//         readyStatus: isReady ? Ready : NotReady,
//       })),
//     []
//   );

//   const onBroadcastStateChangedHandler = useCallback(
//     (status) =>
//       setState(currentState => ({
//         ...currentState,
//         stateStatus: status,
//       })),
//     []
//   );

//   const onBroadcastAudioStatsHandler = useCallback(
//     (stats) =>
//       setMetaData(currentState => ({
//         ...currentState,
//         audioStats: {
//           ...currentState.audioStats,
//           ...stats,
//         },
//       })),
//     []
//   );
//   const onBroadcastQualityChangedHandler = useCallback(
//     (quality) =>
//       setMetaData(currentState => ({
//         ...currentState,
//         streamQuality: quality,
//       })),
//     []
//   );
//   const onNetworkHealthChangedHandler = useCallback(
//     (health) =>
//       setMetaData(currentState => ({
//         ...currentState,
//         networkHealth: health,
//       })),
//     []
//   );

//   const onBroadcastErrorHandler = useCallback(
//     (exception) =>
//       console.log('Broadcast session error: ', exception),
//     []
//   );

//   const onErrorHandler = useCallback(
//     (errorMessage) =>
//       console.log('Internal module error: ', errorMessage),
//     []
//   );

//   const onMediaServicesWereLostHandler = useCallback(
//     () => console.log('The media server is terminated.'),
//     []
//   );

//   const onMediaServicesWereResetHandler = useCallback(
//     () => console.log('The media server is restarted.'),
//     []
//   );

//   const onPressPlayButtonHandler = useCallback(
//     () => cameraViewRef.current?.start(),
//     []
//   );


//   const onPressStopButtonHandler = useCallback(
//     () => cameraViewRef.current?.stop(),
//     []
//   );

//   const onPressSwapCameraButtonHandler = useCallback(
//     () => cameraViewRef.current?.swapCamera(),
//     []
//   );

//   const isStartButtonVisible =
//     isDisconnected || stateStatus === INITIAL_BROADCAST_STATE_STATUS;

//   return (
//     <Modal
//     visible={true}
//     onRequestClose
//     transparent
//     animationType="fade"
//     >
//       {/* <RNCamera 
//       whiteBalance={"incandescent"}
//       style={{display:"none"}}
//       exposure={1}
//       useNativeZoom={true}
//       mirrorImage={true}
//       /> */}
//       <>
//       {isReadyToDisplay ? (
//         <>
//           <IVSBroadcastCameraView
//             ref={cameraViewRef}
//             style={s.cameraView}
//             rtmpsUrl={rtmpsUrl}
//             streamKey={streamKey}
//             videoConfig={VIDEO_CONFIG}
//             audioConfig={AUDIO_CONFIG}
//             onError={onErrorHandler}
//             onBroadcastError={onBroadcastErrorHandler}
//             onIsBroadcastReady={onIsBroadcastReadyHandler}
//             onBroadcastAudioStats={onBroadcastAudioStatsHandler}
//             onNetworkHealthChanged={onNetworkHealthChangedHandler}
//             onBroadcastStateChanged={onBroadcastStateChangedHandler}
//             onBroadcastQualityChanged={onBroadcastQualityChangedHandler}
//             onMediaServicesWereLost={onMediaServicesWereLostHandler}
//             onMediaServicesWereReset={onMediaServicesWereResetHandler}
//             {...(__DEV__ && {
//               logLevel: 'debug',
//               sessionLogLevel: 'debug',
//             })}
//           />

//           <Modal
//             visible
//             transparent
//             animationType="fade"
//             supportedOrientations={['landscape', 'portrait']}
//           >
//             <SafeAreaProvider>
//               {readyStatus === None ? (
//                 <Spinner />
//               ) : (
//                 readyStatus === Ready && (
//                   <SafeAreaView style={s.primaryContainer}>
//                     <View style={s.topContainer}>
//                       <View style={s.topButtonContainer}>
//                         <Button
//                           title="Swap"
//                           onPress={onPressSwapCameraButtonHandler}
//                         />
//                         {isConnected && (
//                           <Button title="Stop" onPress={onPressStopButtonHandler} />
//                         )}
//                       </View>
//                     </View>
//                     {(isStartButtonVisible || isConnecting) && (
//                       <View style={s.middleContainer}>
//                         {isStartButtonVisible && (
//                           <Button
//                             title="Start"
//                             onPress={onPressPlayButtonHandler}
//                           />
//                         )}
//                         {isConnecting && <Spinner />}
//                       </View>
//                     )}
//                     <View style={s.bottomContainer}>
//                       <View style={s.metaDataContainer}>
//                         <Text
//                           style={s.metaDataText}
//                         >{`Peak ${audioStats.peak?.toFixed(
//                           2
//                         )}, Rms: ${audioStats.rms?.toFixed(2)}`}</Text>
//                         <Text
//                           style={s.metaDataText}
//                         >{`Stream quality: ${streamQuality}`}</Text>
//                         <Text
//                           style={s.metaDataText}
//                         >{`Network health: ${networkHealth}`}</Text>
//                       </View>
//                       {isConnected && <Text style={s.liveText}>LIVE</Text>}
//                     </View>
//                   </SafeAreaView>
//                 )
//               )}
//             </SafeAreaProvider>
//           </Modal>
//         </>
//       ) : (
//         <Text>loading</Text>
//       )}
//     </>
//     </Modal>
//   );
// };

// const s = StyleSheet.create({
//   spinner: {
//     flex: 1,
//   },
//   topContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   topButtonContainer: {
//     flexDirection: 'row',
//   },
//   middleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   bottomContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   button: {
//     marginHorizontal: 8,
//   },
//   buttonText: {
//     padding: 8,
//     borderRadius: 8,
//     fontSize: 20,
//     color: '#ffffff',
//     backgroundColor: 'rgba(128, 128, 128, 0.4)',
//   },
//   metaDataContainer: {
//     flex: 1,
//   },
//   metaDataText: {
//     color: '#ffffff',
//   },
//   liveText: {
//     color: '#ffffff',
//     padding: 8,
//     backgroundColor: '#FF5C5C',
//     borderRadius: 8,
//   },
//   cameraView: {
//     flex:1,
//     backgroundColor: '#000000',
//   },
//   primaryContainer: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'space-between',
//   },
// });

// export default LiveSession;