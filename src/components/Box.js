import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
const tablet = deviceInfo.isTablet();
export default function Box({
  name,
  img,
  influencer,
  getLayout,
  call,
  status,
  dis,
  type,
  boxWidth,
  passStyle,
  ImagePassStyle,
  imgStyle,
}) {
  function renderColor() {
    if (status == 'Pending') {
      return 'rgba(0, 0, 0, 0.36)';
    } else if (status === 'Approved') {
      return 'rgba(0, 180, 0, 0.6)';
    } else if (status === 'Rejected') {
      return 'rgba(180, 0, 0, 0.6)';
    }
  }

  function renderText() {
    if (status == 'Pending') {
      return 'Under Review';
    } else if (status == 'Rejected') {
      return 'Disapproved';
    } else {
      return status;
    }
  }

  return (
    <TouchableOpacity
      onPress={call ? call : null}
      onLayout={e => {
        getLayout ? getLayout(e.nativeEvent.layout) : null;
      }}
      style={{
        ...styles.catCon,
        width: boxWidth ? boxWidth : responsiveWidth(60),
        ...passStyle,
      }}>
      <View
        style={{
          width: responsiveWidth(tablet ? 11 : 22),
          height: responsiveFontSize(tablet ? 5 : 11),
          ...ImagePassStyle,
        }}>
        <Image style={{...styles.img, ...imgStyle}} source={img} resizeMode='contain' />
      </View>
      {name && (
        <View style={{marginLeft: responsiveFontSize(tablet ? 1 : 2)}}>
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 0.75 : 1.9),
              marginTop: responsiveFontSize(0.5),
              color: 'black',
            }}>
            {name?.length > 15 ? name.slice(0, 15) + '...' : name}
          </Text>
          {/* {dis ? <Text style={styles.text}>GET {dis} OFF</Text> : null} */}
        </View>
      )}
      {status ? (
        <View style={{...styles.con, backgroundColor: renderColor()}}>
          <Text style={styles.statusText}>{renderText()}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: responsiveWidth(tablet ? 11 : 22),
    height: responsiveFontSize(tablet ? 5 : 11),
    borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
  },
  catCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(47),
    margin: responsiveFontSize(tablet ? 0.25 : 0.5),
    borderRadius: responsiveFontSize(0.6),
  },
  con: {
    padding: responsiveFontSize(tablet ? 0.25 : 0.5),
    borderRadius: responsiveFontSize(0.25),
    position: 'absolute',
    top: responsiveFontSize(1),
    right: responsiveFontSize(1),
  },
  statusText: {
    fontSize: responsiveFontSize(tablet ? 0.6 : 1.2),
    color: 'white',
  },
  text: {
    fontWeight: '600',
    color: 'red',
    fontSize: responsiveFontSize(tablet ? 0.7 : 1.5),
    marginTop: responsiveFontSize(tablet ? 0.125 : 0.25),
  },
  disBox: {
    position: 'absolute',
    paddingHorizontal: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(tablet ? 1.5 : 3),
    paddingVertical: responsiveFontSize(0.2),
  },
});
