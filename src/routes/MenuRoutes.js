// @ts-nocheck
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthScreens from './AuthScreen';
import {connect} from 'react-redux';
import Menu from '../screens/menu';
import Shop from "../screens/home"
import ConnectionSetup from '../components/ConnectionSetup';
// import CategorySetup from '../components/CategorySetup';
import Earning from '../screens/bioShop/Earning/Index';
import Delete from '../screens/menu/delete';
import BasicSetup from '../screens/menu/basicSetup';
import PaypalEmail from '../screens/menu/PaypalEmail';
import ChangePassword from '../screens/menu/changePassword/index'
import ContactUs from '../screens/menu/contactus/index'
import Balance from '../screens/menu/balance/index'
import Purchase from '../screens/menu/purchase';
import BioshopRoutes from "../routes/BioShopRoutes"
// import MarketPlace from '../screens/marketPlace'
import ShippingAddress from '../screens/menu/ShippingAddress';
import Host from '../screens/host/Host';
import MainIndex from "../screens/host/index"
import ControlRoom from '../screens/host/ControlRoom';
import ReportsMain from '../screens/reports/main';
import Reports from '../screens/reports';
import PurchaseScreen from '../screens/reports/PurchaseScreen';
import ReferralStateScreen from '../screens/reports/ReferralStateScreen';
import EarningScreen from '../screens/reports/EarningScreen';
// import FavouriteRoutes from './FavouriteRoutes';

const Stack = createNativeStackNavigator();

function MenuRoutes({navigation, authRed}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="menu">
        {props => <Menu {...props} navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="shop">
        {props => <Shop {...props} navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="connectionSetup">
        {props => <ConnectionSetup {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="basicSetup">
        {props => <BasicSetup {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="paypalEmail">
        {props => <PaypalEmail {...props} navigation={navigation} />}
      </Stack.Screen>
      {/* <Stack.Screen name="categorySetup">
        {props => (
          <CategorySetup {...props} navigation={navigation} header="none" />
        )}
      </Stack.Screen> */}
      <Stack.Screen name="shippingAddress">
        {props => (
          <ShippingAddress {...props} navigation={navigation} header="none" />
        )}
      </Stack.Screen>
      <Stack.Screen name="earning">
        {props => <Earning {...props} navigation={navigation} header="none" />}
      </Stack.Screen>
      <Stack.Screen name="delete">
        {props => <Delete {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="events">
        {props => <MainIndex {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="changePassword">
        {props => <ChangePassword {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="contactus">
        {props => <ContactUs {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="balance">
        {props => <Balance {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="purchase">
        {props => <Purchase {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="host">
        {props => <Host {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="controlRoom">
        {props => <ControlRoom {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="reportsMenu">
        {props => <Reports {...props} navigation={navigation} />}
      </Stack.Screen>
      {/* <Stack.Screen name="favMenu">
        {props => <FavouriteRoutes {...props} navigation={navigation} />}
      </Stack.Screen> */}
      {/* ReportsMain */}
      <Stack.Screen name="purchases">
        {props => <PurchaseScreen {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="reffferral_sales">
        {props => <ReferralStateScreen {...props} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="earnings">
        {props => <EarningScreen {...props} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function mapStateToProps({authRed}) {
  return {authRed};
}

export default connect(mapStateToProps)(MenuRoutes);

const styles = StyleSheet.create({});
