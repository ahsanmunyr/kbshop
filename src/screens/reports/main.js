// @ts-nocheck
import React, {useLayoutEffect} from 'react';
import {
  View,
  useWindowDimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import colors from '../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import PurchaseScreen from './PurchaseScreen';
import ReferralScreen from './ReferralStateScreen';
import EarningScreen from './EarningScreen';
import BackIcon from 'react-native-vector-icons/Ionicons';
import deviceInfoModule from 'react-native-device-info';
import HeaderComp from './CustomChild/HeaderComp';
import ReportItem from './CustomChild/ReportItem';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import CashIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const tablet = deviceInfoModule.isTablet();



const styles = StyleSheet.create({
  contentCont: {
    flex: 1,
    paddingHorizontal: '2%',
  },
});

const renderScene = SceneMap({
  first: PurchaseScreen,
  second: ReferralScreen,
  third: EarningScreen,
});

export default function ReportsMain({ navigation }) {
  const layout = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true
    })
  }, [navigation])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Purchases' },
    { key: 'second', title: 'Referral Stats' },
    { key: 'third', title: 'Earnings' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.themeblue }}
      style={{ backgroundColor: 'white', height:responsiveScreenFontSize(10) }}
      activeColor={{ color: colors.themeblue }}
      renderIcon={({ route, focused, color }) => {
        if(route.key == 'first'){
          return (
            <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
            <MaterialIcons
              name={'shopping-bag'}
              color={focused && colors.themeblue}
              size={focused ? responsiveScreenFontSize(3): responsiveScreenFontSize(2.3) }
            />
            </View>
          )
        }
        if(route.key == 'second'){
          return (
            <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
            <Octicons
              name={'graph'}
              color={focused && colors.themeblue}
              size={focused ? responsiveScreenFontSize(2): responsiveScreenFontSize(1.5) }
            />
            </View>
          )
        }
        if(route.key == 'third'){
          return (
            <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
            <Feather
              name={'dollar-sign'}
              color={focused && colors.themeblue}
              size={focused ? responsiveScreenFontSize(3): responsiveScreenFontSize(2.3) }
            />
            </View>
          )
        }

      }}
      renderLabel={({ route, focused, color }) => (
        <View style={{ width: responsiveWidth(30), height: responsiveScreenFontSize(5), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: focused ? colors.themeblue: 'grey', marginVertical: responsiveScreenFontSize(2), fontSize: focused ? responsiveScreenFontSize(1.8) : responsiveScreenFontSize(1.5), textAlign: 'center', height: responsiveScreenFontSize(3), fontWeight: focused? '700': '400' }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
