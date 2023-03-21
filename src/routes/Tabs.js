// @ts-nocheck
import { StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Home from "../../src/screens/home"
import AntDesign from "react-native-vector-icons/AntDesign"
import BioIcon from "react-native-vector-icons/FontAwesome"
import MenuIcon from "react-native-vector-icons/Entypo"
import ReportIcon from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import CustomTabComp from "../components/CustomTabComp"
// import FavouriteRoutes from './FavouriteRoutes';
import BioShopRoutes from './BioShopRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux'
import AuthScreens from './AuthScreen'
import MenuRoutes from './MenuRoutes'
// import MarketPlace from '../screens/marketPlace'
import MarketIcon from "react-native-vector-icons/Fontisto"
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';
import * as authAct from "../store/actions/authAct"
import PushNotification from "react-native-push-notification";
import VersionModal from '../components/VersionModal'
import Konnect from '../config/konnect'
import DeviceInfo from "react-native-device-info"
import Octicons from "react-native-vector-icons/Octicons"
import LiveEvents from '../screens/home/Live/LiveEvents'
import Reports from '../screens/reports'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDrawerContent from '../components/CustomDrawer'
import LiveEventStack from '../screens/home/Live/LiveEventStack'
import Cart from '../screens/cart/cart'
import Blank from '../screens/Blank'
import LiveStack from '../screens/host/LiveStack'
// import Trending from '../screens/trending'
import TrendingRoutes from './TrendingRoutes'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs({ navigation, authRed, saveLocation }) {


  const [reset, setReset] = useState(false)
  const [reset2, setReset2] = useState(false)
  const [reset3, setReset3] = useState(false)
  const [reset4, setReset4] = useState(false)
  const [reset5, setReset5] = useState(false)

  const [reset6, setReset6] = useState(false)
  const [reset7, setReset7] = useState(false)
  const [versionModal, setVersionModal] = useState(false)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: "channel-id",
        channelName: "My channel",
        message: remoteMessage.notification.body,
        playSound: true,
        title: remoteMessage.notification.title,
        priority: 'high',
        soundName: 'default',

      })
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    if (authRed?.success) {
      requestUserPermission()
      getLocation()
    }
  }, [authRed.success])

  useEffect(() => {
    getVersion()
  }, [])

  async function getVersion() {
    Konnect.post(`/v1/mobile/category/getAllCriteria`).then(res => {
      if (res.data?.data[0].version != DeviceInfo.getVersion()) {
        setVersionModal(true)
      }
    }).catch(err => {
      console.log("err", err.response.data)
    })
  }

  async function getLocation() {

    if (Platform.OS == "ios") {
      const req = await Geolocation.requestAuthorization("whenInUse");
      if (req == "granted") {
        getPoints()
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "KonnectBio would like to access your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted == "granted") {
        getPoints()
      }
    }
  }


  function getPoints() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        saveLocation(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging()
        .subscribeToTopic('konnectBio')
        .then(() => console.log('Subscribed to topic!'));
      const token = await messaging().getToken()
      console.log(token)
    }
  }

  if (authRed?.success) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <VersionModal
          visible={versionModal}
          closeModle={() => setVersionModal(false)}
          title="versiosn"
        />
        <Tab.Navigator

          screenOptions={{
            // @ts-ignore


            tabBarActiveTintColor: "rgb(7, 13, 46)",
            tabBarLabelStyle: {
              marginBottom: 5,

            },
            unmountOnBlur: true
          }}
          initialRouteName="Home"
          tabBar={props => <CustomTabComp
            dataProps={props}
            reset={reset}
            setReset={setReset} {...props}
            reset2={reset2}
            setReset2={setReset2}
            reset3={reset3}
            setReset3={setReset3}
            reset4={reset4}
            setReset4={setReset4}
            reset5={reset5}
            setReset5={setReset5}
            reset6={reset6}
            setReset6={setReset6}
            reset7={reset7}
            setReset7={setReset7}
          />}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ color }) => <Octicons
                name="home" size={22} color={color} />,
            }}
          >
            {(props) => <Home {...props} reset={reset} />}
          </Tab.Screen>
          <Tab.Screen
            name="Trending"
            options={{
              tabBarIcon: ({ color }) => <ReportIcon name="trending-up" size={22} color={color} />,
            }}
          >
            {/* {(props) => <Trending {...props} reset5={reset5} />} */}
            {(props) => <TrendingRoutes {...props} reset5={reset5} setReset5={setReset5} />}
          </Tab.Screen>

          <Tab.Screen
            name="Live"
            options={{
              tabBarIcon: ({ color }) => <AntDesign
                name="plus" size={22} color={color} />,
            }}
          >
            {(props) => <LiveStack {...props} reset6={reset6} />}
          </Tab.Screen>
          {/* <Tab.Screen
          name="Reports"
          options={{
            tabBarIcon: (({ color }) => <ReportIcon name='file-text' size={22} color={color} />)
          }}
        >
          {props => <Reports reset6={reset6} {...props} />}
        </Tab.Screen> */}
          {/* <Tab.Screen
            name="Cart"
            options={{
              tabBarIcon: (({ color }) => <ReportIcon name='shopping-cart' size={22} color={color} />)
            }}
          >
            {(props) => <Cart {...props} reset2={reset2} setReset2={setReset2} />}
          </Tab.Screen> */}
          {/* <Tab.Screen
            name="Favourite"
            options={{
              tabBarIcon: (({ color }) => <FavouriteIcon name='favorite' size={22} color={color} />)
            }}
          >
            {(props) => <FavouriteRoutes {...props} reset2={reset2} setReset2={setReset2} />}
          </Tab.Screen> */}
          <>
            <Tab.Screen
              name="BioShop"
              options={{
                tabBarIcon: (({ color }) => <BioIcon name='shopping-cart' size={22} color={color} />)
              }}
            >
              {props => <BioShopRoutes reset3={reset3} {...props} />}
            </Tab.Screen>


            <Tab.Screen
              name="Menu"
              component={MenuRoutes}
              options={{
                tabBarIcon: (({ color }) => <MenuIcon name='menu' size={22} color={color} />)
              }}
            />





            {/* {authRed.data.account_type == "influencer"  && authRed.data.category ? (
          <Tab.Screen
            name="MarketPlace"
            options={{
              tabBarIcon: (({ color }) => <MarketIcon name='shopping-bag-1' size={22} color={color} />)
            }}
          >
            {props => <MarketPlace {...props} reset4={reset4} setReset4={setReset4} />}
          </Tab.Screen>
        ) : null} */}
          </>


        </Tab.Navigator>
      </SafeAreaView>
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {AuthScreens()}
      </Stack.Navigator>
    )
  }
}

function mapStateToProps({ authRed }) {
  return { authRed }
}

export default connect(mapStateToProps, authAct)(Tabs)

const styles = StyleSheet.create({})