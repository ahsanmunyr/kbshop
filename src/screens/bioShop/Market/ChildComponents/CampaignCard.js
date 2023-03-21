// import React, {useState} from 'react';
// import {StyleSheet, Text, View, Image} from 'react-native';

// import {
//   responsiveWidth,
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import Btn from '../../../../components/Btn';

// const CampaignCard = ({data, onPressSelectCampaign}) => {
//   return (
//     <View style={styles.cardCont}>
//       <View style={{width: '80%'}}>
//         <Text style={styles.productHd}>{data?.campaign_name}</Text>
//       </View>
//       <Image
//         style={styles.image}
//         resizeMode="cover"
//         source={{uri: data?.media_url}}
//       />
//       <View style={styles.contentCont}>
//         <DetailComp title="Brand" value={data?.brand_name} />
//         <DetailComp title="Category" value={data?.category_name} />
//         <DetailComp title="Campaign Type" value={data?.campaign_type} />
//         <DetailComp
//           title="Commission / 100 CLicks"
//           value={`$${data?.commission}`}
//         />
//         <DetailComp title="Start Date" value={`${data?.start_date}`} />
//         <DetailComp title="End Date" value={`${data?.end_date}`} />
//         <Btn
//           text={'Select Campaign'}
//           pS={{height: responsiveHeight(3)}}
//           pSText={{fontSize: responsiveFontSize(1.3)}}
//           call={() => onPressSelectCampaign()}
//         />
//       </View>
//     </View>
//   );
// };

// const DetailComp = ({title, value}) => {
//   return (
//     <View style={styles.outerTextView}>
//       <Text style={styles.text}>{title}</Text>
//       <Text style={styles.text}>{value}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cardCont: {
//     margin: 2,
//     marginLeft:3,
//     backgroundColor: 'white',
//     width: responsiveWidth(48.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     paddingTop: responsiveHeight(1),
//     paddingBottom: responsiveHeight(1),
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 2,
//   },
//   image: {
//     width: responsiveWidth(40),
//     height: responsiveWidth(40),
//     borderRadius: 12,
//   },
//   productHd: {
//     color: '#010b40',
//     fontSize: responsiveFontSize(1.5),
//   },
//   text: {
//     color: '#010b40',
//     fontSize: responsiveFontSize(1.3),
//   },
//   outerTextView: {
//     width: responsiveWidth(40),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   contentCont: {
//     width: responsiveWidth(40),
//     marginTop: 5,
//     marginBottom: 5,
//   },
// });

// export default CampaignCard;

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions
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
import Btn from '../../../../components/Btn';
import colors from '../../../../assets/colors/colors';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet() 
const {width}=Dimensions.get('window')

const ShopComponent = ({data, onPressSelectCampaign,marginLeft}) => {
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
    <View
      style={{
        width: tablet?'32%':'48%',
        marginLeft:marginLeft
      }}>
      <View style={styles.shopView}>
        <View style={styles.shopTop}>
          {/* <Icon
            name="clock"
            color="gray"
            style={{ right: 7 }}
            size={responsiveFontSize(1.5)}
          /> */}
          <Text style={styles.text}>{data?.campaign_name}</Text>
        </View>
        <View style={{width: '100%'}}>
          {/* {MediaType == 'IMAGE' ? ( */}
          {true ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: data?.media_url}}
            />
          ) : MediaType == 'VIDEO' ? (
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
                resizeMode="cover"
                source={{uri: Images}}
                style={styles.video}></Video>
            </>
          ) : MediaType == 'CAROUSEL_ALBUM' ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: Images}}
            />
          ) : (
            <View style={styles.image} />
          )}
        </View>
        {/* <View style={styles.innerImage}>
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
        </View> */}
        <View style={styles.other}>
          <>
            <View style={styles.hr} />
            {/* <View style={styles.outerTextView}>
              <Text style={styles.text1}>Brand</Text>
              <Text style={styles.text1}>{data?.brand_name}</Text>
            </View> */}
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Category</Text>
              <Text style={styles.text1}>{data?.category_name}</Text>
            </View>
            <View style={styles.hr} />
            {/* <View style={styles.outerTextView}>
              <Text style={styles.text1}>Campaign Type</Text>
              <Text style={styles.text1}>{data?.campaign_type}</Text>
            </View> */}
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Commission</Text>
              <Text style={styles.text1}>{data?.commission}%</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>Start Date</Text>
              <Text style={styles.text1}>{data?.start_date}</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.outerTextView}>
              <Text style={styles.text1}>End Date</Text>
              <Text style={styles.text1}>{data?.end_date}</Text>
            </View>
            <Btn
              text={data?.is_linked && data?.is_active ? 'Campaign Added' : 'Campaign Available'}
              pS={{height: responsiveHeight(3)}}
              pSText={[
                {fontSize: responsiveFontSize(tablet?0.8:1.3)},
                data?.is_linked && data?.is_active?{backgroundColor: colors.gray}:null,
              ]}
              disabled={data?.is_linked && data?.is_active ? true : false}
              call={() =>
                // data?.is_linked ? console.log('first') :
                onPressSelectCampaign()
              }
            />
            {/* <Btn
              text={'Campaign Available'}
              pS={{height: responsiveHeight(3)}}
              pSText={[
                {fontSize: responsiveFontSize(1.3)},
              ]}
              call={() =>
                // data?.is_linked ? console.log('first') :
                onPressSelectCampaign()
              }
            /> */}
          </>
        </View>
      </View>
    </View>
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
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingBottom: responsiveFontSize(0.5),
  },
  image: {
    width: '100%',
    height: responsiveHeight(width>550?30:26),
    borderRadius: responsiveFontSize(0.5),
  },
  video: {
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
  text: {
    fontWeight: '300',
    color: '#010b40',
    fontSize: responsiveFontSize(tablet?1:1.5),
  },
  text1: {fontSize: responsiveFontSize(tablet?0.75:1.4)},
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
