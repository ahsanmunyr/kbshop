import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Video from 'react-native-video';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ShopComponent = ({
  Images,
  Impressions,
  Reach,
  Engagement,
  Like,
  Comment,
  Content,
  Date,
  Key,
  ReDirectLink,
  MediaType,
}) => {
  const [lines, onChangeLines] = React.useState(1);
  const [linesCondition, onChangeLinesCondition] = React.useState(false);
  const [pause, onSetPause] = useState(true);

  // console.log(Type);

  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };

  const ReadMore = () => {
    onChangeLines(20);
    onChangeLinesCondition(true);
  };
  const ShowLess = () => {
    onChangeLines(1);
    onChangeLinesCondition(false);
  };
  // console.log(MediaType);
  // CAROUSEL_ALBUM
  // IMAGE
  // VIDEO
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: '48%',
      }}
      onPress={() => Linking.openURL(ReDirectLink)}>
      <View Key={Key} style={styles.shopView}>
        <View style={styles.shopTop}>
          <Icon
            name="clock"
            color="gray"
            style={{right: 7}}
            size={responsiveFontSize(1.5)}
          />
          <Text style={styles.text}>{moment(Date).format('MMM Do YYYY')}</Text>
        </View>
        <View style={{width: '100%'}}>
          {MediaType == 'IMAGE' ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: Images}}
            />
          ) : MediaType == 'VIDEO' ? 
            <>
             <View style={styles.videoPlay}>
            <TouchableOpacity onPress={sexyPlay} style={styles.touch}>
              <SimpleLineIcons
                name={pause ? 'control-play' : 'control-pause'}
                size={15}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Video
          ignoreSilentSwitch="ignore"
            repeat
            paused={pause}
            playInBackground={false}
            playWhenInactive={false}
            disableFocus
            resizeMode='cover'
            source={{uri: Images}}
            style={styles.video}></Video>
            </>: MediaType == 'CAROUSEL_ALBUM' ?
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: Images}}
            />: <View  style={styles.image} />
          }
        </View>
        <View style={styles.innerImage}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name="heart-outline"
              color="black"
              size={responsiveFontSize(2)}
            />
            <Text style={styles.text}>
              {'  '}
              {Like}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name="comment-outline"
              color="black"
              size={responsiveFontSize(2)}
            />
            <Text style={styles.text}>
              {'  '}
              {Comment}
            </Text>
          </View>
        </View>
        <View style={styles.other}>
          <>
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Impressions</Text>
              <Text style={styles.text1}>{Impressions}</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Reach</Text>
              <Text style={styles.text1}>{Reach}</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Engagement</Text>
              <Text style={styles.text1}>{Engagement}</Text>
            </View>
          </>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopComponent;

const styles = StyleSheet.create({
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveWidth(10),
    width: responsiveWidth(10),
  },
  videoPlay: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    backgroundColor: '#010b40',
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 3,
    zIndex: 999,
    right: 3,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#e8e8e8',
  },
  shopView: {
    marginBottom: responsiveFontSize(0.75),
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: responsiveFontSize(1),
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: responsiveFontSize(0.5),
  },
  shopTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingBottom: responsiveFontSize(0.5),
  },
  image: {
    width: '100%',
    height: responsiveHeight(26),
    borderRadius: responsiveFontSize(0.5),
  },
  video:{
    width: '100%',
    height: responsiveHeight(26),
    borderRadius: responsiveFontSize(0.5),
  },
  innerImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(6),
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {fontWeight: '300', color: '#010b40', fontSize: 10},
  text1: {fontSize: responsiveFontSize(1.4)},
  outerTextView: {
    width: '100%',
    // backgroundColor:'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveFontSize(0.25),
  },
  other: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
});
