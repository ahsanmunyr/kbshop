// @ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
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
import { connect } from 'react-redux';
import * as dashboardAct from '../../store/actions/dashboardAct'
import { useEffect } from 'react';
import FilterModal from './CustomChild/FilterModal';
import moment from 'moment';
import numeral from 'numeral';

const tablet = deviceInfoModule.isTablet();

function Dashboard({navigation, getDashboardData, dashboardRed}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [share_purchases, setShare_purchases] = useState([])
  const [shop_purchases, setShop_purchases] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    filter(null, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), null, null)
  }, [])

  useEffect(() => {
    setShop_purchases([...dashboardRed?.shop_purchases])
    setShare_purchases([...dashboardRed?.share_purchases])
  }, [dashboardRed])
  
  
  const filter = (pageNo, from_date, to_date, source, sort_by) => {
    getDashboardData(from_date, to_date)
  };

  return (
    <>
    {isFilterModalOpen && 
    <FilterModal open={isFilterModalOpen} functionOfFilter={filter} close={setIsFilterModalOpen} isDashboardFilter={true} />}
      <View
        style={{
          flex: 1,
        }}>
        <HeaderComp
          onBackPress={() => navigation.navigate('menu')}
          title="Dashboard"
          onFilterPress={setIsFilterModalOpen}
        />
        <ScrollView style={styles.contentCont}>
          <Text style={{fontSize: responsiveFontSize(tablet ? 1.25 : 2.2), color: 'black'}}>
            Shopping Details
          </Text>
          <ReportItem amount={shop_purchases.length > 0  ? numeral(shop_purchases[0]?.total_sale).format("0,0.00") : '0.00'} title={'Total Amount'}>
            <FontAwesomeIcon
              style={[tablet && styles.iconWidth]}
              name="shopping-bag"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={shop_purchases.length > 0  ? numeral(shop_purchases[0]?.discount).format("0,0.00") : '0.00'} title={'Discounts'}>
            <FontAwesomeIcon
              style={[tablet && styles.iconWidth]}
              // name="hand-holding-usd"
              name="percentage"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={shop_purchases.length > 0  ? numeral(shop_purchases[0]?.order_totalprice).format("0,0.00") : '0.00'} title={'AMOUNT PAID'}>
            <CashIcon
              style={[tablet && styles.iconWidth]}
              name="account-cash"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={shop_purchases.length > 0  ? numeral(shop_purchases[0]?.cashback_amount).format("0,0.00") :'0.00'} title={'CASHBACK'}>
            <CashIcon
              style={[tablet && styles.iconWidth]}
              name="cash-refund"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <Text style={{fontSize: responsiveFontSize(tablet ? 1.25 : 2.2), color: 'black',marginVertical:responsiveHeight(1.5)}}>
            Referral Details
          </Text>
          <ReportItem amount={'0.00'} title={'TOTAL SALES'}>
            <FontAwesomeIcon
              style={[tablet && styles.iconWidth]}
              name="shopping-bag"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={'0.00'} title={'FEE EARNED'}>
            <FontAwesomeIcon
              style={[tablet && styles.iconWidth]}
              name="percentage"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={'0.00'} title={'AMOUNT PAID'}>
            <CashIcon
              style={[tablet && styles.iconWidth]}
              name="cash-refund"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
          <ReportItem amount={'0.00'} title={'BALANCE'}>
            <FontAwesomeIcon
              style={[tablet && styles.iconWidth]}
              name="hand-holding-usd"
              size={responsiveFontSize(tablet ? 2.5 : 4.5)}
              color={colors.themeblue}
            />
          </ReportItem>
        </ScrollView>
      </View>
    </>
  );
}
const mapStateToProps = ({dashboardRed}) => {
  return { dashboardRed }
}
export default connect(mapStateToProps,dashboardAct)(Dashboard)

const styles = StyleSheet.create({
  contentCont: {
    flex: 1,
    paddingHorizontal: '2%',
  },
});

// const renderScene = SceneMap({
//   first: PurchaseScreen,
//   second: ReferralScreen,
//   third: EarningScreen,
// });

// export default function Reports({ navigation }) {
//   const layout = useWindowDimensions();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: true
//     })
//   }, [navigation])

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'first', title: 'Purchases' },
//     { key: 'second', title: 'Referral Stats' },
//     { key: 'third', title: 'Earnings' },
//   ]);

//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{ backgroundColor: colors.themeblue }}
//       style={{ backgroundColor: 'white', height:responsiveScreenFontSize(10) }}
//       activeColor={{ color: colors.themeblue }}
//       renderIcon={({ route, focused, color }) => {
//         if(route.key == 'first'){
//           return (
//             <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
//             <MaterialIcons
//               name={'shopping-bag'}
//               color={focused && colors.themeblue}
//               size={focused ? responsiveScreenFontSize(3): responsiveScreenFontSize(2.3) }
//             />
//             </View>
//           )
//         }
//         if(route.key == 'second'){
//           return (
//             <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
//             <Octicons
//               name={'graph'}
//               color={focused && colors.themeblue}
//               size={focused ? responsiveScreenFontSize(2): responsiveScreenFontSize(1.5) }
//             />
//             </View>
//           )
//         }
//         if(route.key == 'third'){
//           return (
//             <View style={{width: responsiveScreenFontSize(4), height: responsiveScreenFontSize(3), justifyContent:'center', alignItems:'center'}}>
//             <Feather
//               name={'dollar-sign'}
//               color={focused && colors.themeblue}
//               size={focused ? responsiveScreenFontSize(3): responsiveScreenFontSize(2.3) }
//             />
//             </View>
//           )
//         }

//       }}
//       renderLabel={({ route, focused, color }) => (
//         <View style={{ width: responsiveWidth(30), height: responsiveScreenFontSize(5), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ color: focused ? colors.themeblue: 'grey', marginVertical: responsiveScreenFontSize(2), fontSize: focused ? responsiveScreenFontSize(1.8) : responsiveScreenFontSize(1.5), textAlign: 'center', height: responsiveScreenFontSize(3), fontWeight: focused? '700': '400' }}>
//             {route.title}
//           </Text>
//         </View>
//       )}
//     />
//   );

//   return (
//     <TabView
//       renderTabBar={renderTabBar}
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//     />
//   );
// }
