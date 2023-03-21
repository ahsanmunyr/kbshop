import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
export default function PostDetail({route}) {
  const navigation = useNavigation();
  console.log('route', route.params);
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{width: '20%', paddingLeft: responsiveFontSize(2)}}
          onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={responsiveFontSize(3)} />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2),
            padding: responsiveFontSize(2),
            textAlign: 'center',
            width: '60%',
          }}>
          {'Khols'}
        </Text>
        <View style={{width: '20%'}} />
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1}}>
          {route.params?.mediaType == 'VIDEO' ? (
            <TouchableOpacity
              disabled={pause}
              onPress={() => onSetPause(true)}
              style={{}}>
              {pause ? (
                <View style={styles.videoPlay}>
                  <TouchableOpacity onPress={sexyPlay} style={styles.touch}>
                    <SimpleLineIcons
                      name={pause ? 'control-play' : 'control-pause'}
                      size={15}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              <Video
              ignoreSilentSwitch="ignore"
                repeat
                resizeMode="cover"
                paused={pause}
                playInBackground={false}
                playWhenInactive={false}
                disableFocus
                source={{uri: route.params?.url}}
                style={{width: '100%', height: responsiveHeight(60)}}></Video>
            </TouchableOpacity>
          ) : route.params?.mediaType == 'IMAGE' ||
            route.params?.mediaType == 'CAROUSEL_ALBUM' ? (
            <Image
              source={{uri: route.params?.url}}
              resizeMode={'cover'}
              style={{width: '100%', flex: 3}}
            />
          ) : null}
          <View style={styles.con2}>
            <View style={{flex: 1, width: '50%'}}>
              {route.params?.mediaType == 'IMAGE' ||
              route.params?.mediaType == 'CAROUSEL_ALBUM' ? (
                <Image
                  source={{uri: route.params?.url}}
                  resizeMode={'cover'}
                  style={{
                    width: '100%',
                    flex: 1,
                    borderBottomLeftRadius: responsiveFontSize(2.2),
                  }}
                />
              ) : route.params?.mediaType == 'VIDEO' ? (
                <Video
                  repeat
                  ignoreSilentSwitch="ignore"
                  resizeMode="cover"
                  paused={true}
                  playInBackground={false}
                  playWhenInactive={false}
                  disableFocus
                  source={{uri: route.params?.url}}
                  style={{
                    width: '100%',
                    flex: 1,
                    borderBottomLeftRadius: responsiveFontSize(2.2),
                  }}></Video>
              ) : null}
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => {
                  Share.open({
                    title: data.shopName,
                    url: route.params?.redirected_url,
                  })
                    .then(res => {
                      console.log(res, 'RES');
                      closeModle();
                    })
                    .catch(err => {
                      err && console.log(err);
                    });
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ShareIcon
                    name="share"
                    size={responsiveFontSize(2)}
                    color="gray"
                  />
                  <Text
                    style={{
                      marginLeft: responsiveFontSize(1),
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    SHARE
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn2}>
                <View style={{flexDirection: 'row'}}>
                  <FavIcon
                    name="favorite"
                    size={responsiveFontSize(2)}
                    color="gray"
                  />
                  <Text
                    style={{
                      marginLeft: responsiveFontSize(1),
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    FAVOURITE
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.btn2, borderBottomWidth: 0}}
                onPress={() => {
                  Linking.openURL(route.params?.redirected_url);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ShopIcon
                    name="shopping-cart"
                    size={responsiveFontSize(2)}
                    color="gray"
                  />
                  <Text
                    style={{
                      marginLeft: responsiveFontSize(1),
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    SHOP
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: responsiveFontSize(0.5),
    justifyContent: 'space-between',
  },
  btn: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
