// @ts-nocheck
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  ImageBackground,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize
} from 'react-native-responsive-dimensions';
import Video from 'react-native-video';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import CustomModal from '../../../components/BioShopModal';
import { useNavigation } from '@react-navigation/native';
import deviceInfo from 'react-native-device-info';
import { createThumbnail } from "react-native-create-thumbnail";
import numeral from 'numeral';
const tablet = deviceInfo.isTablet();

const Post = ({
  ID,
  Images,
  RedirectLink,
  Type,
  Linked,
  StartDate,
  EndDate,
  OnChangeModal,
  DataSet,
  PostType,
  post_type,
  shopName,
  openModal,
  Promo,
  Discount,
  openWeb,
  Children,
  Fav,
  index,
  webOpen,
  authRed,
  objectItem
}) => {
  const [pause, onSetPause] = useState(true);
  const [videoThumbnail, onChangeVideoThumbnail] = useState(null)
  const navigation = useNavigation();
  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };

  // console.log(objectItem, "=====================================================");

  const discountPercent = (percent, actualAmount) => {
    let num = percent.replace(/[^0-9]/g, '');
    return ((num / 100) * actualAmount).toFixed(2);
  };



  useEffect(() => {
    if (Type == 'VIDEO') {
      createThumbnail({
        url: Images,
        timeStamp: 0,
        format: "jpeg",
        cacheName: ID?.toString()
      })
        .then(response => {
          onChangeVideoThumbnail(response)
          // console.log({ response })
        })
        .catch(err => console.log({ err }));
    }
    onSetPause(true);
    return () => {
      onSetPause(false);
    };
  }, []);

  const ModalData = {
    id: ID,
    url: Images,
    redirectLink: `${RedirectLink}&c_id=${authRed?.data?._id}`,
    mediaType: Type,
    favPost: Fav,
    linked: Linked,
    startDate: StartDate,
    endDate: EndDate,
    post_type: post_type,
    shopName,
  };
  return (
    <View style={{ flexDirection: 'column', paddingHorizontal:responsiveFontSize(tablet? 0.19: 0.15)  }}>
      <>
        {Type == 'IMAGE' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (ModalData.post_type == 'campaign') {
                openWeb(ModalData);
              } else if (ModalData.post_type == 'forFollowers') {
                if (Children?.length > 0) {
                  openModal();
                } else {
                  openWeb(ModalData);
                }
              } else {
                OnChangeModal(true);
                DataSet(ModalData);
              }
            }}
            style={{
              ...styles.post,
              marginLeft: index == 0 ? 0 : responsiveFontSize(tablet? 0:0.13),
            }}>
            <Image
              source={{ uri: Images }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : Type == 'VIDEO' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (ModalData.post_type == 'campaign') {
                // Linking.openURL(ModalData.redirectLink);
                openModal(ModalData);
              } else if (ModalData.post_type == 'forFollowers') {
                if (Children?.length > 0) {
                  openModal();
                } else {
                  openWeb(ModalData);
                  // Linking.openURL(ModalData.redirectLink);
                  // alert("NO CHILDER FOUND")
                }
                // openModal();
              } else {
                OnChangeModal(true);
                DataSet(ModalData);
              }
            }}
            style={{
              ...styles.post,
              marginLeft: index == 0 ? 0 : responsiveFontSize(tablet? 0:0.13),
            }}>
            <View style={styles.videoPlay}>
              <TouchableOpacity disabled onPress={sexyPlay} style={styles.touch}>
                <SimpleLineIcons
                  name={pause ? 'control-play' : 'control-pause'}
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: videoThumbnail?.path }}
              style={styles.image}
              resizeMode="cover"
            />
            {/* <Video
            repeat
            resizeMode="cover"
            paused={true}
            playInBackground={false}
            playWhenInactive={false}
            disableFocus
            poster={Images}
            hideShutterView={true}
            // onBuffer={(e)=> {e.isBuffering} }
            // onBuffer={null}
          //  onPlaybackRateChange='0'
            source={{uri: Images}}
            ignoreSilentSwitch="ignore"
            style={styles.image}></Video> */}
          </TouchableOpacity>
        ) : Type == 'CAROUSEL_ALBUM' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (ModalData.post_type == 'campaign') {
                // Linking.openURL(ModalData.redirectLink);
                openModal(ModalData);
              } else if (ModalData.post_type == 'forFollowers') {
                if (Children?.length > 0) {
                  openModal();
                } else {
                  openWeb(ModalData);
                  // Linking.openURL(ModalData.redirectLink);
                  // alert("NO CHILDER FOUND")
                }
                // openModal();
              } else {
                OnChangeModal(true);
                DataSet(ModalData);
              }
            }}
            style={{
              ...styles.post,
              marginLeft: index == 0 ? 0 : responsiveFontSize(tablet? 0:0.13),
            }}>
            <Image
              source={{ uri: Images }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.image} />
        )}

      </>
      <View style={{
    height: responsiveWidth(tablet ? 15 : 22.9),
    width: responsiveWidth(tablet ? 24 : 48.7),
        // backgroundColor:'red',
        marginVertical: tablet? responsiveScreenFontSize(0.5): responsiveScreenFontSize(0.5),
        // flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{ width:tablet? responsiveWidth(24): responsiveScreenFontSize(24), paddingLeft:tablet? null: responsiveScreenFontSize(1), }}>
          <Text
            numberOfLines={3}
            style={{
              fontWeight: '400',
              fontSize: tablet? responsiveFontSize(1): responsiveFontSize(1.4),
              // padding: responsiveFontSize(0.5),
              textAlign: 'left',
              color: 'rgba(0,0,0,.85)'
              // width: '60%',
            }}>
            {objectItem?.children[0]?.ProductName}
          </Text>

          {
            authRed.data.account_type == 'customer' ?
              <>
                {
                  objectItem?.children[0]?.hasOwnProperty("referral_percent") === true && objectItem?.children[0]?.referral_percent !== '' ?
                    <Text
                      numberOfLines={4}
                      style={{
                        fontWeight: 'bold',
                        fontSize: tablet? responsiveFontSize(1): responsiveFontSize(1.5),

                        textAlign: 'left',
                        color: 'red'
                        // width: '60%',
                      }}>
                      {objectItem?.children[0]?.referral_percent + "% Referral Fee"}


                    </Text> : null
                }
              </> :
              <>
                {
                  objectItem?.children[0]?.hasOwnProperty("influencerFee") === true && objectItem?.children[0]?.influencerFee !== '' ?
                    <Text

                      style={{
                        fontWeight: 'bold',
                        fontSize: tablet? responsiveFontSize(1): responsiveFontSize(1.5),

                        textAlign: 'left',
                        color: 'orange'
                        // width: '60%',
                      }}>
                      {objectItem?.children[0]?.influencerFee + "% Influencer Fee"}
                    </Text> : null
                }
              </>
          }

          {/* {
          objectItem?.children[0]?.hasOwnProperty("referral_percent") === true && objectItem?.children[0]?.referral_percent !== '' ?
            <Text
              numberOfLines={4}
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),

                textAlign: 'left',
                color: 'red'
                // width: '60%',
              }}>
                 {objectItem?.children[0]?.referral_percent+"% Referral Fee"} 
                 
             
            </Text>: null
          } */}

          {/* {
          objectItem?.children[0]?.hasOwnProperty("influencerFee") === true && objectItem?.children[0]?.influencerFee !== '' ?
            <Text

              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),

                textAlign: 'left',
                color: 'orange'
                // width: '60%',
              }}>
              {objectItem?.children[0]?.influencerFee+"% Influencer Fee"}
            </Text>:null
          }  */}

          <View style={{ width: responsiveScreenFontSize(22), flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveScreenFontSize(1) }}>
            <Text
              style={{
                color: 'green',
                fontSize: responsiveFontSize(tablet ? 1 : 1.5),
                fontWeight: '700'
              }}>
              {objectItem?.children[0]?.productPromoCodePromo !== 'KB0' && (
                <Text
                  style={{ color: 'red', textDecorationLine: 'line-through', fontWeight: '700', fontSize: responsiveFontSize(tablet ? 1 : 1.5), }}>
                  ${numeral(objectItem?.children[0]?.productAmount).format('0.00') + ' '}
                </Text>
              )}
              {objectItem?.children[0]?.productPromoCodePromo === 'KB0'
                ? `$${numeral(objectItem?.children[0]?.productAmount).format('0.00')}`
                : objectItem?.children[0]?.productPromoCodeDscs?.includes('%')
                  ? `$${numeral(
                    objectItem?.children[0]?.productAmount -
                    discountPercent(
                      objectItem?.children[0]?.productPromoCodeDscs,
                      objectItem?.children[0]?.productAmount,
                    ),
                  ).format('0.00')}  `
                  : `$${numeral(
                    objectItem?.children[0]?.productAmount -
                    objectItem?.children[0]?.productPromoCodeDscs?.replace(/[^0-9]/g, ''),
                  ).format('0.00')}  `}

            </Text>
            {/* <Text

              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),

                textAlign: 'left',
                color: 'green'
                // width: '60%',
              }}>
              $855.00
            </Text>
            <Text

              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),
                textDecorationLine: 'line-through',
                textAlign: 'left',
                color: 'red'
                // width: '60%',
              }}>
              $950.00
            </Text> */}
          </View>
        </View>
        {/* <View style={{width:responsiveScreenFontSize(10.5), backgroundColor:'blue',height:responsiveScreenFontSize(5)}}>

      </View> */}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  post: {
    marginBottom: responsiveFontSize(0.5),
    marginHorizontal: tablet? responsiveFontSize(0): responsiveFontSize(0.4),
    // backgroundColor: 'red',
    zIndex: 10,
  },
  image: {
    height: responsiveWidth(tablet ? 25.5 : 48.9),
    width: responsiveWidth(tablet ? 24.2 : 48.7),
    borderRadius: tablet? responsiveScreenFontSize(0.5): responsiveScreenFontSize(1.5)
  },
  videoPlay: {
    height: responsiveWidth(tablet ? 5 : 10),
    width: responsiveWidth(tablet ? 5 : 10),
    backgroundColor: '#010b40',
    opacity: 0.7,
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    // top: 3,
    top: tablet? responsiveFontSize(4.9): responsiveFontSize(9.5),
    position: 'absolute',
    zIndex: 99,
    // right: 3,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveWidth(10),
    width: responsiveWidth(10),
  },
  text: {
    fontWeight: '600',
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  disBox: {
    position: 'absolute',
    paddingHorizontal: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(3),
    paddingVertical: responsiveFontSize(0.2),
  },
});
function mapStateToProps({ authRed }) {
  return {
    authRed,
  };
}

export default connect(mapStateToProps, null)(Post);