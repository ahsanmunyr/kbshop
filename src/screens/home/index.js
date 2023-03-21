// @ts-nocheck
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchIcon from 'react-native-vector-icons/Feather';
import Brand from './brand/brands';
import HomeMenu from './HomeMenu';
import Influencers from './influencers/Influencers';
import { connect } from 'react-redux';
import AllCategories from './category/AllCategories';
import DropBox from '../../components/DropBox';
import BioShop from './bioshop/BioShop';
import BrandInfluencers from './category/BrandInfluencers';
import CrossIcon from 'react-native-vector-icons/Entypo';
import PostDetail from './bioshop/PostDetail';
import deviceInfo from 'react-native-device-info';
import BrandLiveEvents from './Live/BrandLiveEvents';
import LiveCycle from './Live/LiveCycle';
import LiveEvents from './Live/LiveEvents';
import Events from '../host/index'
import LiveEventCycle from './Live/LiveEventCycle';
// import Shows from './shows';
import MainIndex from './MainIndex';
import InfluencersReviews from './Live/InfluencersReviews';
import UpcomingEvents from './Live/UpcomingEvents';
import Profile from '../../screens/home/profile/Profile';

// import LiveCycle from './LiveCycle';
// import LiveEvents from './LiveEvents';

const tablet = deviceInfo.isTablet();

const { width } = Dimensions.get('window');
const head = {};

if (width > 550) head.height = 80;
const Stack = createNativeStackNavigator();
function Index({ navigation, reset }) {
  const [searchText, setSearchText] = useState('');
  const [isBio, setIsBio] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <View style={styles.imgCon}>
  //         <Image
  //           style={styles.img}
  //           resizeMode="contain"
  //           source={require('../../assets/logo.png')}
  //         />
  //       </View>
  //     ),
  //     headerStyle: head,
  //     headerTitle: props => (
  //       <View>
  //         <View style={styles.textCon}>
  //           <SearchIcon
  //             style={styles.searchIcon}
  //             name="search"
  //             color="#bdbdbd"
  //             size={responsiveFontSize(tablet ? 1.25 : 2)}
  //           />
  //           <TextInput
  //             onFocus={() => setDrop(true)}
  //             value={searchText}
  //             onChangeText={v => setSearchText(v)}
  //             placeholder="Search"
  //             style={{
  //               flex: 1,
  //               paddingVertical: 0,
  //               color: 'grey',
  //               fontSize: responsiveFontSize(tablet ? 0.8 : 1.6),
  //             }}
  //           />
  //           {searchText ? (
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setSearchText('');
  //                 setDrop(false);
  //                 Keyboard.dismiss();
  //               }}>
  //               <CrossIcon
  //                 name="cross"
  //                 size={responsiveFontSize(tablet ? 1.25 : 3)}
  //               />
  //             </TouchableOpacity>
  //           ) : null}
  //         </View>
  //       </View>
  //     ),
  //   });
  // }, [navigation, searchText]);

  const [active, setActive] = useState(2);
  const [drop, setDrop] = useState(false);

  // console.log(active, "active")

  useEffect(() => {
    setActive(1);
  }, [reset]);

  // function conditionRender() {
  //   if (active == 1) {
  //     return <Shows />;
  //   } else if (active == 2) {
  //     return <Brand />;
  //   }
  //   else if (active == 3) {
  //     return null;
  //   }
  // }
  // function RenderData() {
  //   return <>{conditionRender()}</>;
  // }

  const renderRoutes = () => {
    return (
      <>
        <Stack.Navigator
          initialRouteName="category"
          screenOptions={{ animation: 'none' }}>
          <Stack.Screen
            name="category"
            options={{ headerShown: true }}
          >
            {props => <MainIndex {...props} active={active} setActive={setActive} />}
          </Stack.Screen>
          <Stack.Screen 
          options={{ headerShown: false }}
          name="profileDetails">
            {props => (
              <Profile
                {...props}
                setIsBio={setIsBio}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="categoryDetail"
            options={{ headerShown: false }}
            component={BrandInfluencers}
          />
          <Stack.Screen
            name="brandLiveEvents"
            component={BrandLiveEvents}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="viewBioshop"
            options={{ headerShown: false }}
          >
            {props => <BioShop {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="viewPost"
            options={{ headerShown: false }}

          >
            {props => <PostDetail {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="liveEvents"
            options={{ headerShown: false }}
          >
            {props => <LiveEvents {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="hostevents"
            options={{ headerShown: false }}
          >
            {props => <Events {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="livecycle"
            options={{ headerShown: true }}
          >
            {props => <LiveCycle {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="liveeventscycle"
            options={{ headerShown: false }}
          >
            {props => <LiveEventCycle {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="upcomingEvents"
            options={{ headerShown: false }}
          >
            {props => <UpcomingEvents {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen
            name="influencerReviews"
            options={{ headerShown: false }}
          >
            {props => <InfluencersReviews {...props} setIsBio={setIsBio} />}
          </Stack.Screen>


        </Stack.Navigator>

      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {drop ? (
        <DropBox
          close={() => {
            setDrop(false);
            setSearchText('');
            Keyboard.dismiss();
          }}
          active={active}
          searchText={searchText}
        />
      ) : null}
      {/* {!isBio && <HomeMenu setActive={setActive} active={active} />} */}
      {renderRoutes()}
      {/* {!isBio && <HomeMenu setActive={setActive} active={active} />}       */}
    </View>
  );
}

function mapStateToProps({ }) {
  return {};
}

export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
  img: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(width > 550 ? 9 : 12),
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: responsiveFontSize(0.1),
    width: responsiveWidth(65),
    padding: responsiveFontSize(
      Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
    ),
    borderRadius: responsiveFontSize(5),
    backgroundColor: 'rgb(242, 242, 242)',
    marginLeft: responsiveWidth(Platform.OS == 'ios' ? (tablet ? 15 : 12) : 0),
  },
  searchIcon: {
    marginLeft: responsiveFontSize(0.4),
  },
  imgCon: {
    paddingLeft: responsiveFontSize(1),
  },
  line: {
    height: 1,
    backgroundColor: '#b8b8b8',
    marginVertical: responsiveFontSize(1),
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: 'rgb(7, 13, 46)',
  },
  headCon: {
    marginTop: responsiveFontSize(2),
    paddingHorizontal: responsiveFontSize(1),
  },
});
