// @ts-nocheck
import { View, Text, StatusBar, SafeAreaView, Platform, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, ScrollView, AppState ,Dimensions} from 'react-native'
import React, { useState, useRef, useMemo, useCallback, useLayoutEffect } from 'react'
import Video from 'react-native-video'
import { connect } from 'react-redux';
import colors from '../../../assets/colors/colors';
import { responsiveScreenHeight, responsiveWidth, responsiveFontSize, responsiveScreenFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Loader from '../../../components/Loader';
import deviceInfo from 'react-native-device-info';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as liveActions from "../../../store/actions/liveEvents"
import * as liveEvents from '../../../store/actions/liveEvents';
import * as liveChatAct from '../../../store/actions/liveChatAct';
import IconCross from 'react-native-vector-icons/Entypo';
import { useEffect } from 'react';
import ShopModal from './ChildComponent/ShopModal';
import ChatModal from './ChildComponent/ChatModal';
import ShareModal from './ChildComponent/ShareModal';
import Share from 'react-native-share';
import config from '../../../config/config';
import * as kbslyShort from '../../../store/actions/kbsly';
import IVSPlayer from 'amazon-ivs-react-native-player';
import { FloatingHeart } from 'react-native-floating-heart';
import Octicons from "react-native-vector-icons/Octicons"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const tablet = deviceInfo.isTablet();

export function RenderPost({
  index,
  item,
  activeTag,
  // onSetPause,
  // pause,
  current,
  flatRef,
  authRed,
  kbslyShortenURL,
  createChatToken,
  navigation,
  flatLayout,
  like,
  likeGet,
}) {

  const [loading, setLoading] = useState(false)
  const [shopModal, onChangeShopModal] = useState(false);
  const [chatModal, onChangeChatModal] = useState(false);
  const [shareModal, onChangeShareModal] = useState(false);
  const [hidden, onChangeHidden] = useState(false);
  const [above, onChangeAbove] = useState(false)
  const [data, onChangeData] = useState(null);
  const [playerState, setPlayerState] = useState('');
  const [currentChild, setCurrentChild] = useState({});
  const videoPlayer = useRef()
  const [heartCount, setHeartCount] = useState(0);
  const [mute, setMute] = useState(false)
  const [pause, onSetPause] = useState(false);
  const [controlShare, setControlShare] = useState(false)
  const [apiHeartCount, setApiHeartCount] = useState(null);
  const tabHeight = useBottomTabBarHeight()

  const addHeart = () => {
    let newCount = heartCount + 1;
    setHeartCount(newCount++);
    likeGet(item?._id).then((res) => {
      // console.log(res, "SSSS")
      setApiHeartCount(res)
    })
  }
  useEffect(() => {
    console.log(videoPlayer, "videoPlayer")
  }, [])

  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };

  const appState = useRef(AppState.currentState);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState === "background") {
  //       console.log('App has come to the foreground!');
  //       onSetPause(true)
  //     }else{
  //       onSetPause(false)
  //     }
  //     console.log('AppState', appState.current,"--",nextAppState);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    likeGet(item?._id).then((res) => {
      // console.log(res, "SSSS")
      setApiHeartCount(res)
    })
    if (item._id == current?._id) {
      if (!controlShare) {
        // alert("SAD")
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (nextAppState === "background") {
            console.log('App has come to the foreground!');
            onSetPause(true)
            // onChangeControlShare(false)
          }
          // else {


          //   onSetPause(false)
          // }
          // console.log('AppState', appState.current,"--",nextAppState);
        });

        return () => {
          subscription.remove();
        };
      }
    }

  }, [controlShare, current]);

  return (

    <View key={index} style={{
      width: responsiveWidth(100),
      height: flatLayout.height,
    }}>
      {
        shopModal &&
        <ShopModal
          opens={shopModal}
          influencerShop={false}
          // openWeb={openWeb}
          setControlShare={setControlShare}
          onChangeHid={onChangeHidden}
          hid={hidden}
          flatLayout={flatLayout}
          currentChild={currentChild}
          setCurrentChild={setCurrentChild}
          index={index} portrait={onChangeAbove} data={data} close={onChangeShopModal}
        />
      }

      {
        chatModal ?
          <ChatModal
          influencer={false}
          title={'Comments'}
          flatLayout={flatLayout}
            opens={chatModal} index={index} data={data} onChangeHid={onChangeHidden} close={onChangeChatModal} portrait={onChangeAbove}
          /> : null
      }


      {
        playerState == "Ended" ? (
          <View style={{ backgroundColor: 'black', 
          justifyContent: 'center', alignItems: 'center', 
          zIndex: 11, height: responsiveScreenFontSize(100), 
          width: '100%' }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(3.5), fontWeight: 'bold', textAlign: 'center' }}>Live session ended</Text>
          </View>
        ) : (
          <>
            {(item.index == current.index || item.index == current.index - 1 || item.index == current.index + 1) ? (
              
              <IVSPlayer
                liveLowLatency={true}
                onData={qualities => {
                  console.log(qualities);
                }}
                muted={mute}
                resizeMode={(item?.orientation == undefined || item?.orientation != 'portrait') ? "aspectFit" : "aspectFill"}
                paused={(item._id == current?._id) ? pause : true}
                autoQualityMode={true}
                onError={error => {
                  console.log(error, 'onError');
                }}
                ref={videoPlayer}
                onPlayerStateChange={(state) => {
                  console.log("state", state)
                  setPlayerState(state)
                }}
                maxBitrate={850000}
                progressInterval={0}
                onTextCue={textCue => {
                  console.log(textCue, 'onTextCue');
                }}
                onTextMetadataCue={textMetadataCue => {
                  console.log(textMetadataCue, 'textMetadataCue');
                }}
                initialBufferDuration={0.1}
                style={[{
                  width: '100%',
                  // marginTop:(item?.orientation == undefined || item?.orientation != 'portrait') && above ? (tabHeight/2): 0,
                  // height: (item?.orientation == undefined || item?.orientation != 'portrait') && above ? responsiveWidth(56.25) : responsiveHeight(100)
                  // flex:1
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // backgroundColor: 'black',
                },
                (item?.orientation == undefined || item?.orientation != 'portrait') && above ? { height:Dimensions.get('window').width/(16/9) } : { flex: 1 }
                ]}
                streamUrl={item?.playbackUrl}
              />
            ) : (
              <View style={{ width: '100%', height:flatLayout.height-Dimensions.get('window').width/(16/9), backgroundColor: 'black' }} />
            )}
          </>
        )
      }



      {
        (item?.orientation == undefined || item?.orientation != 'portrait') && above &&
        <View style={{ height: flatLayout.height - Dimensions.get('window').width/(16/9) }} />
      }


      <TouchableOpacity style={styles.floatShopBtn} onPress={() => {
        if (item?._id == current?._id) {

          onChangeData(item)
          onChangeShopModal(true)
          onChangeHidden(true)
        }
        if (item?.orientation == undefined || item?.orientation != 'portrait') {
          onChangeAbove(true)
        }


      }} >
         <Text style={{color:'white',fontSize:responsiveFontSize(tablet? 0.8: 1.5)}}>SHOP</Text>
        {/* <Entypo
          name={'shop'}
          size={tablet ? responsiveScreenFontSize(2) : responsiveScreenFontSize(3)}
          color="white"
        /> */}
      </TouchableOpacity>

      {/* {
        !chatModal ?
          <TouchableOpacity style={styles.floatShopBtn1} onPress={() => {
            onChangeChatModal(true)
            onChangeData(item)
            createChatToken(item?._id)
            onChangeHidden(true)
          }} >
            <Text style={{
              color: 'black', fontWeight: '700'
            }}>Open Chat</Text>
          </TouchableOpacity> :
          null
      } */}

      <TouchableOpacity
        style={{ ...styles.floatShopBtn2, top: responsiveHeight(11) }}
        onPress={() => {
          onSetPause(true)
          // console.log("item",item)
          navigation.navigate('liveEvents', {
            data: { _id: item?.brand_id, profile_image_url: item?.brand_profile, instagram_username: item.instagram_username ? item.instagram_username : item.pixel_id },
            target: "Live"
          })
        }}
      >
        <Image source={{ uri: item?.brand_profile }} style={{
          width: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
          height: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
          borderRadius: responsiveHeight(6.5) / 2,
          borderWidth: responsiveScreenFontSize(0.1),
          borderColor: 'white',
        }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.floatShopBtn2, top: responsiveHeight(19) }}
        onPress={() => setMute(!mute)}
      >
        <Octicons
          name={mute ? 'mute' : 'unmute'}
          size={tablet ? responsiveScreenFontSize(2) : responsiveScreenFontSize(3)}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.floatShopBtn2, bottom: responsiveHeight(tablet? 19: 16) }} onPress={() => {
        onChangeChatModal(true)
        onChangeData(item)
        createChatToken(item?._id)
        onChangeHidden(true)
        if (item?.orientation == undefined || item?.orientation != 'portrait') {
          onChangeAbove(true)
        }
      }} >
        <Ionicons
          name={'chatbubble-ellipses'}
          size={tablet ? responsiveScreenFontSize(2) : responsiveScreenFontSize(4)}
          color="white"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.floatShopBtn1} onPress={() => {
        if (item?._id == current?._id) {
          onChangeData(item)
          // createChatToken(item?._id)
          onChangeChatModal(true)
        }
        if (item?.orientation == undefined || item?.orientation != 'portrait') {
          // onChangeAbove(true)
        }

      }} >
        <Ionicons
          name={'chatbox'}
          size={responsiveScreenFontSize(3)}
          color="white"
        />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.floatShopBtn2} onPress={() => {
        setControlShare(true)
        kbslyShortenURL(`${config.base_url_for_KBSLY}/live-event/${item?._id}/${item?.instagram_username || item?.pixel_id}?origin=home&pixel_id=${authRed?.data?.pixel_id}&publisher_id=${authRed?.data?._id}&advertiser_id=${item?.brand_id}&category_id=${item?.category_id}&event_id=${item?._id}&roiEvent=true&brand=1&event=eventshare`)
          .then((res) => {
            if (res?.message) {
              Share.open({
                title: item?.brand_name?.toString(),
                url: res?.message,
              })
                .then(res => {
                  console.log(res, "share btn")
                })
                .catch(err => {
                  setControlShare(false)
                  err && console.log(err);
                })
            }
          })
      }} >
        <FontAwesome
          name={'share'}
          size={tablet ? responsiveScreenFontSize(2) : responsiveScreenFontSize(3)}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatShopBtn3} onPress={() => {
        addHeart()
        like(item?._id, item?.brand_id)
      }} >
        <Entypo
          name={'heart'}
          size={tablet ? responsiveScreenFontSize(2) : responsiveScreenFontSize(4)}
          color="red"
        />
                <Text style={{ color: 'white' }}>{apiHeartCount}</Text>
      </TouchableOpacity>

      <View style={{
             position: 'absolute',
             top: responsiveHeight(tablet ? 4: 4),
             // width: responsiveWidth(4),
             height: responsiveScreenFontSize(tablet? 2:3),
             borderRadius: responsiveScreenFontSize(3),
             paddingHorizontal: responsiveScreenFontSize(2),
             left: responsiveScreenFontSize(3),
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: 'red'
      }}>
        <Text style={{ color: 'white', 
        fontSize: tablet ? responsiveScreenFontSize(1.2) : responsiveScreenFontSize(1.7) }}>Live</Text>
      </View>

      <View style={{
        position: 'absolute',
        top: responsiveHeight(tablet ? 4 : 3.5),
        width: responsiveWidth(tablet ? 12 : 20),
        height: responsiveScreenFontSize(tablet? 2: 3),
        borderRadius: responsiveScreenFontSize(3),
        paddingHorizontal: responsiveScreenFontSize(1),
        right: responsiveScreenFontSize(tablet? 5: 8),
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexDirection: 'row'
      }}>
        <MaterialIcons
          name={'remove-red-eye'}
          size={responsiveScreenFontSize(tablet? 1:2)}
          color="white"
        />
        <Text style={{ color: 'white', fontSize: responsiveScreenFontSize(tablet ? 1 : 1.7) }}>3.5k</Text>
      </View>
      <TouchableOpacity style={{
                 position: 'absolute',
                 top: responsiveScreenFontSize(2.5),
                 right: responsiveScreenFontSize(1),
                 justifyContent: 'center',
                 alignItems: 'center',
                 zIndex:1
      }}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <View style={{

          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Entypo
            name={'cross'}
            size={tablet ? responsiveScreenFontSize(3) : responsiveScreenFontSize(5)}
            color="white"
          />
        </View>
      </TouchableOpacity>
      {
        !hidden &&
        <View style={{
          position: 'absolute',
          top: responsiveScreenFontSize(tablet? 8:12),
          width: responsiveWidth(tablet? 60: 80),
          // height: responsiveScreenFontSize(13),
          borderTopRightRadius: responsiveScreenFontSize(10),
          borderBottomRightRadius: responsiveScreenFontSize(10),
          paddingVertical: responsiveScreenFontSize(1),
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex:1
        }}>
          <View style={{
                     width: responsiveWidth(tablet? 60: 80),
            justifyContent: 'flex-start',
            alignItems: 'center',
            // height: responsiveScreenFontSize(13),
            flexDirection: 'row',
            alignSelf: 'center'
          }}>
            {/* <Image source={{ uri: item?.brand_profile }} style={{
              width: responsiveWidth(15),
              height: responsiveWidth(15),
              borderRadius: responsiveScreenFontSize(50)
            }} /> */}
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', paddingHorizontal: responsiveScreenFontSize(1), width: responsiveWidth(65) }}>
              <Text style={{
                color: 'white', fontWeight: 'bold', fontSize: responsiveScreenFontSize(tablet? 1.2: 1.8)
              }}>{item?.brand_name}</Text>
              <Text numberOfLines={3}
                style={{
                  color: 'white', fontWeight: '400', fontSize: responsiveScreenFontSize(tablet? 0.8:1.5)
                }}>{item?.title}</Text>
            </View>
          </View>
        </View>
      }

      {/* {
        !chatModal &&
          <TouchableOpacity style={styles.floatShopBtn1} onPress={() => {
            onChangeChatModal(true)
            onChangeData(item)
            createChatToken(item?._id)
            onChangeHidden(true)
          }} >
            <Text style={{
              color: 'black', fontWeight: '700'
            }}>Open Chats</Text>
          </TouchableOpacity> 
      } */}
      <FloatingHeart count={heartCount} />
    </View>

  )
}

function LiveEventCycle({likeGet, like, route, getPerviousEventItem, getPreviousEventsItem, liveEvents, liveEventsBrand, getProducts, authRed, kbslyShortURL, createChatToken, navigation, setIsBio }) {


  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  // const [pause, onSetPause] = useState(false);
  const [open, onSetOpen] = useState(false);
  const [current, setCurrent] = useState({});
  const [scroll, setScroll] = useState(0);
  const [initialIndex, setInitialIndex] = useState(0);
  const [tagsData, setTagsData] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [flatLayout, setFlatLayout] = useState({ width: 0, height: 0 })


  const flatRef = useRef();

  useEffect(() => {

    return () => {
    }
  }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsBio(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => {
      setIsBio(false);
    };
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])


  const onChangeItem = useCallback(({ viewableItems, changed }) => {
    if (viewableItems[0]?.item) {
      setCurrent({ ...viewableItems[0]?.item, index: viewableItems[0]?.index });
      getProducts(viewableItems[0]?.item._id)
    }
  }, []);

  const getItemLayout = (data, index) => {
    return {
      length: flatLayout.height,
      offset: flatLayout.height * index,
      index,
    };
  };


  if (apiLoader && loading) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'
      }}>
        <StatusBar
          animated={true}
          backgroundColor='black'
          barStyle={'light-content'}
          showHideTransition={'fade'}
        />
        <Loader color={'white'} />
      </View>
    )
  } else {
    return (


      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',

      }}>
        <StatusBar
          animated={true}
          backgroundColor='black'
          barStyle={'light-content'}
          showHideTransition={'fade'}
        />
        <View
          onLayout={(e) => {
            setFlatLayout(e.nativeEvent.layout)
          }}
          style={{ flex: 1, width: responsiveWidth(100), justifyContent: 'center', }}>
          {flatLayout.height ? (
            <FlatList
              data={(route?.params?.brand_id) ? liveEventsBrand?.data : liveEvents?.data}
              scrollEnabled
              keyboardShouldPersistTaps='handled'
              initialScrollIndex={route?.params?.setCurrent?.index}
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, backgroundColor: "black" }}
              getItemLayout={getItemLayout}
              onViewableItemsChanged={onChangeItem}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}

              pagingEnabled={true}


              renderItem={({ item, index }) => (
                <RenderPost
                  current={current}
                  index={index}
                  item={{ ...item, index }}
                  activeTag={activeTag}
                  flatLayout={flatLayout}
                  // onSetPause={onSetPause}
                  // pause={pause}
                  flatRef={flatRef}
                  authRed={authRed}
                  kbslyShortenURL={kbslyShortURL}
                  createChatToken={createChatToken}
                  navigation={navigation}
                  like={like}
                  likeGet={likeGet}
                />
              )}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, id) => id.toString()}
            />
          ) : null}
        </View>
      </View>



    )
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  videoPlay: {
    height: responsiveWidth(tablet ? 5 : 15),
    width: responsiveWidth(tablet ? 5 : 15),
    // backgroundColor: '#010b40',
    opacity: 0.8,
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    // top: 3,
    top: responsiveFontSize(45.5),
    position: 'absolute',
    zIndex: 99,
    // right: 3,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',

    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: colors.themeblue, borderRadius: responsiveFontSize(50)
  },
  floatShopBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: responsiveScreenFontSize(50),
    width: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    height: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: responsiveScreenFontSize(0.1),
    borderColor: 'white',
    right: tablet ? "2%" : "3%",
    bottom: responsiveHeight(tablet ? 32 : 32),
    justifyContent: 'center',
    zIndex: 1
  },
  floatShopBtn1: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: responsiveScreenFontSize(50),
    // width: responsiveHeight(6.5),
    paddingHorizontal: responsiveScreenFontSize(2),
    height: responsiveHeight(3),
    backgroundColor: 'white',
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: responsiveScreenFontSize(0.1),
    borderColor: 'white',
    left: "3%",
    bottom: "8%",
    justifyContent: 'center',
    zIndex: 1
  },
  floatShopBtn2: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: responsiveScreenFontSize(50),
    width: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    height: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: responsiveScreenFontSize(0.1),
    borderColor: 'white',
    right: tablet ? "2%" : "3%",
    bottom: responsiveHeight(tablet ? 12 : 8),
    justifyContent: 'center',
    zIndex: 1

  },

  floatShopBtn3: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    height: tablet ? responsiveHeight(5) : responsiveHeight(6.5),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: tablet ? "2%" : "3%",
    bottom: responsiveHeight(tablet ? 25.5 : 24 ),
    justifyContent: 'center',
    zIndex: 1
  },

});

function mapStateToProps({ upcomingEvents, liveEvents, liveEventsBrand, previousEvents, authRed, getPerviousEventItem, hostEventLiveRed }) {
  return { upcomingEvents, liveEvents, liveEventsBrand, previousEvents, authRed, getPerviousEventItem, hostEventLiveRed }
}

export default connect(mapStateToProps, { ...liveActions, ...liveEvents, ...kbslyShort, ...liveChatAct })(LiveEventCycle)