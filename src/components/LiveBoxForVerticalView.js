import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';

const tablet = deviceInfo.isTablet();

const LiveBoxForVerticalView = ({liveText, call, item, event, authRed, passedStyle}) => {
  return (
    <TouchableOpacity onPress={call}>
      <ImageBackground
        style={{...styles.con,...passedStyle}}
        resizeMode={
          item?.banner ===
          'https://static.konnect.bio/eventdefaultbanner/banner.png'
            ? 'contain'
            : 'cover'
        }
        source={
          item
            ? {uri: item.banner, cache: 'only-if-cached'}
            : require('../assets/picture.webp')
        }>
        {event == 'upcoming' && (
          <>
            {item?.discount !== undefined &&
            item?.discount !== '' &&
            item?.discount !== '0%' &&
            item?.discount !== 'undefined' ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  width: responsiveWidth(14),
                  height: responsiveScreenFontSize(3),
                  borderRadius: responsiveScreenFontSize(3),
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: responsiveScreenFontSize(1.2),
                    fontWeight: 'bold',
                  }}>
                  {item?.discount} Off
                </Text>
              </View>
            ) : null}
          </>
        )}

        <View style={styles.overlay} />
        <View style={styles.liveCon}>
          <Text style={styles.liveText}>{liveText}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.head}>
            {item ? item.title : 'FASHION FAIR MAKEUP RELAUNCHING'}
          </Text>
          <View style={styles.bottom}>
            <Image
              style={{
                width: tablet ? 30 : 20,
                height: tablet ? 30 : 20,
                borderRadius: tablet ? 30 : 20,
              }}
              source={
                item
                  ? {uri: item.brand_profile, cache: 'only-if-cached'}
                  : require('../assets/logo22new.png')
              }
            />
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(tablet ? 0.65 : 1.2),
                marginLeft: responsiveFontSize(0.5),
              }}>
              {item ? item?.brand_name : 'DL1961'}
            </Text>
          </View>
        </View>
        {authRed.data.account_type == 'customer' ? (
          <>
            {event == 'upcoming' && (
              <>
                {item?.referral_percent !== 'undefined' &&
                item?.referral_percent !== '' &&
                item?.referral_percent !== '0' ? (
                  <View
                    style={{
                      width: responsiveWidth(20),
                      height: responsiveScreenFontSize(6),
                      position: 'absolute',
                      bottom: -30,
                      right: -1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: responsiveScreenFontSize(1.2),
                        fontWeight: 'bold',
                      }}>
                      {item?.referral_percent}% Referral Fee
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </>
        ) : (
          <>
            {event == 'upcoming' && (
              <>
                {item?.influencer_percent != undefined &&
                item?.influencer_percent != 'undefined' &&
                item?.influencer_percent !== '' &&
                item?.influencer_percent !== '0' ? (
                  <View
                    style={{
                      width: responsiveWidth(25),
                      height: responsiveScreenFontSize(6),
                      position: 'absolute',
                      bottom: -28,
                      right: -1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: responsiveScreenFontSize(1.2),
                        fontWeight: 'bold',
                      }}>
                      {item?.influencer_percent}% Influencer Fee
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

function mapStateToProps({authRed}) {
  return {authRed};
}

export default connect(mapStateToProps, null)(LiveBoxForVerticalView);

const styles = StyleSheet.create({
  con: {
    width: responsiveWidth(tablet ? 20 : 45),
    height: responsiveHeight(tablet ? 20 : 34),
    marginRight: responsiveFontSize(tablet ? 0.5 : 1),
    backgroundColor: colors.themeblue,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  liveText: {
    color: 'white',
    fontSize: responsiveFontSize(tablet ? 0.5 : 1),
    fontWeight: 'bold',
  },
  liveCon: {
    backgroundColor: colors.themeblue,
    padding: responsiveFontSize(0.25),
    width: responsiveWidth(tablet ? 8 : 16),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveFontSize(tablet ? 0.3 : 0.8),
    margin: responsiveFontSize(0.5),
  },
  head: {
    marginTop: responsiveHeight(8),
    color: 'white',
    fontWeight: 'bold',
    margin: responsiveFontSize(0.5),
    textTransform: 'uppercase',
    fontSize : responsiveFontSize(tablet ? 1 : 1.2)
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: responsiveFontSize(0.5),
    marginVertical: responsiveFontSize(0.75),
  },
});
