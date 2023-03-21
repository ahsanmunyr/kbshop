// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { CommonActions } from '@react-navigation/native';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import ShopIcon from 'react-native-vector-icons/Entypo';
import EarningIcon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import PurchasesIcon from 'react-native-vector-icons/FontAwesome5';
import InfluencerSetupIcon from 'react-native-vector-icons/FontAwesome';
import PayoutIcons from 'react-native-vector-icons/MaterialIcons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import BalanceIcon from 'react-native-vector-icons/Fontisto';
// import LogoutIcon from 'react-native-vector-icons/AntDesign';
import AddressIcon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/Octicons';
import { connect } from 'react-redux';
import colors from '../assets/colors/colors';
import InfluencerIcon from 'react-native-vector-icons/Entypo';
import UpDownIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as authAct from '../store/actions/authAct';
import deviceInfo from "react-native-device-info";
import EventIcon from "react-native-vector-icons/MaterialIcons"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import CashIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import LiveSessionModal from '../screens/home/brand/LiveSession';

const tablet = deviceInfo.isTablet()

function CustomDrawerContent({ logOut, authRed }) {
  const navigation = useNavigation();
  const [settingOpen, setSettingOpen] = useState(false);
  const [infSetOpen, setInfSetOpen] = useState(false);
  const [live, setLive] = useState(false)

  const [isProfilesettingOpen, setIsProfilesettingOpen] = useState(false)


  function renderInfSetUp() {
    return (
      <View style={{ paddingLeft: responsiveFontSize(4) }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('categorySetup')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Category Setup</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('connectionSetup')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Connection Setup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('paypalEmail')}
          style={styles.settingDetailsItem}>
          {/* <Text style={styles.text}>Paypal Email (Receive Payments)</Text> */}
          <Text style={styles.text}>Payment Setup</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function renderSettingDetails() {
    return (
      <View style={styles.settingDetails}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('basicSetup')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Basic Setup</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          // ahsan 22/12/22 bioShop change thats why personal bioshop disable

          onPress={() => {
            // navigation.navigate('BioShop')
            alert("Coming Soon...")
          }
          }
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Bioshop</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            // navigation.navigate('MarketPlace')
            alert('Coming Soon...')
          }}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>MarketPlace</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => setLive(true)}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>GoLive</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('host')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Host</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setInfSetOpen(!infSetOpen)}
          style={{ ...styles.settingDetailsItem, flexDirection: 'row' }}
        >
          <Text style={styles.text}>Setup</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <UpDownIcon
              style={{
                // marginLeft: responsiveFontSize(1),
                marginRight: responsiveFontSize(tablet ? 0.75 : 0.5)
              }}
              name={infSetOpen ? 'up' : 'down'}
              size={responsiveFontSize(tablet ? 1.5 : 2.5)}
              color={false ? '#000000' : colors.themeblue}
            />
          </View>
        </TouchableOpacity>
        {infSetOpen ? renderInfSetUp() : null}
        {/* <TouchableOpacity style={styles.settingDetailsItem}>
          <Text>Subscription Setup</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderSettingOpions() {
    return (
      <View style={styles.settingDetails}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('chat')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Chat</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('basicSetup')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('changePassword')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('delete')}
          style={styles.settingDetailsItem}>
          <Text style={styles.text}>Delete Account</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.settingDetailsItem}
          onPress={() => navigation.navigate("shippingAddress")}>
          <Text
            style={styles.text}>
            Shipping Address
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  // console.log(authRed.data.name, "authRed.data");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* {live && <LiveSessionModal
        visible={live}
        closeModle={() => setLive(false)}
      />} */}
      <StatusBar backgroundColor={"transparent"} barStyle='dark-content' />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between', width: responsiveWidth(92),
        // height: responsiveScreenFontSize(10),
        alignItems: 'center', alignSelf: 'center',
      }}>
        {/* <Text style={{
          fontSize: responsiveScreenFontSize(3.8),
          color: colors.themeblue,
          textTransform: 'capitalize',
          fontWeight: '900',
          width: '70%',
          // backgroundColor:'red'
        }}>
          {authRed.data.name}
        </Text>
        <TouchableOpacity onPress={() => {
          logOut().then(() => { });
        }}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
          }}>
            <EventIcon
              style={[{
                // marginLeft: responsiveFontSize(1),
              }, tablet && styles.iconWidth]}
              name="logout"
              size={responsiveFontSize(tablet ? 1.5 : 4)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text style={{ color: colors.themeblue, fontSize: responsiveScreenFontSize(2), fontWeight: '600' }}>Logout</Text>
          </View>
        </TouchableOpacity> */}
        <Text style={{fontSize:responsiveFontSize(tablet ? 1.3 : 2),color:"black"}}>Menu</Text>
        <TouchableOpacity onPress={() => {
          logOut().then(() => { });
        }}>
          <Text style={{fontSize:responsiveFontSize(tablet ? 1.3 : 2),color:"black",justifyContent:"flex-end"}}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{
        width: responsiveWidth(96),
        height: responsiveScreenFontSize(20),
        // backgroundColor:'red'
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center'
      }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('purchase');
          }}
          activeOpacity={0.8}>
          <View style={{
            width: responsiveWidth(28), height: responsiveScreenFontSize(14), backgroundColor: '#f5f5f5',
            borderRadius: responsiveScreenFontSize(1.5), justifyContent: 'space-around', alignItems: 'center', paddingVertical: responsiveScreenFontSize(2.8)
          }}>

            <PurchasesIcon
              style={[{
                // marginLeft: responsiveFontSize(1)
              }, tablet && styles.iconWidth]}
              name="money-check"
              size={responsiveFontSize(tablet ? 1.5 : 3)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.themeblue,
                fontSize: responsiveFontSize(tablet ? 1 : 1.7),
              }}>
              Purchases
            </Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('contactus');
        }} activeOpacity={0.8}>
          <View style={{
            width: responsiveWidth(28), height: responsiveScreenFontSize(14), backgroundColor: '#f5f5f5',
            borderRadius: responsiveScreenFontSize(1.5), justifyContent: 'space-around', alignItems: 'center', paddingVertical: responsiveScreenFontSize(3)
          }}>

            <EventIcon
              style={[{
                // marginLeft: responsiveFontSize(1)
              }, tablet && styles.iconWidth]}
              name="contact-support"
              size={responsiveFontSize(tablet ? 1.5 : 4)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                // marginLeft: responsiveFontSize(1),
                fontWeight: 'bold',
                color: colors.themeblue,
                fontSize: responsiveFontSize(tablet ? 1 : 1.7),
              }}>
              Contact Us
            </Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          // navigation.navigate('Shop');
          alert("Coming soon...")
        }} activeOpacity={0.8}>
          <View style={{
            width: responsiveWidth(28), height: responsiveScreenFontSize(14), backgroundColor: '#f5f5f5',
            borderRadius: responsiveScreenFontSize(1.5), justifyContent: 'space-around', alignItems: 'center', paddingVertical: responsiveScreenFontSize(3)
          }}>
            <ShopIcon
              style={[{}, tablet && styles.iconWidth]}
              name="shopping-bag"
              size={responsiveFontSize(tablet ? 1.5 : 3.4)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.themeblue,
                fontSize: responsiveFontSize(tablet ? 1 : 1.7),
              }}>
              Shop
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('favMenu');
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <HomeIcon
          style={[{ marginLeft: responsiveFontSize(1) }, tablet && styles.iconWidth]}
          name="heart"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={colors.themeblue}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(2),
            fontSize: responsiveFontSize(tablet ? 1 : 2),
            color: colors.themeblue,
            fontWeight: 'bold'
          }}>
          Favourite
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('reportsMenu');
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <View style={styles.iconCont}>
          <SettingsIcon
            style={[tablet && styles.iconWidth]}
            name="settings"
            size={responsiveFontSize(tablet ? 1.5 : 2.5)}
            color={colors.themeblue}
          />
        </View>
        <Text
          style={styles.menuItemText}>
          Dashboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('basicSetup');
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <View style={styles.iconCont}>
          <ProfileIcon
            style={[tablet && styles.iconWidth]}
            name="feed-person"
            size={responsiveFontSize(tablet ? 1.5 : 2.5)}
            color={colors.themeblue}
          />
        </View>
        <Text
          style={styles.menuItemText}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("shippingAddress")
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <View style={styles.iconCont}>
          <AddressIcon
            style={[ tablet && styles.iconWidth]}
            name="pushpin"
            size={responsiveFontSize(tablet ? 1.5 : 2.5)}
            color={colors.themeblue}
          />
        </View>
        <Text
          style={styles.menuItemText}>
          Shipping Addresses
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('balance')
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <PayoutIcons
          style={[{ marginLeft: responsiveFontSize(1) }, tablet && styles.iconWidth]}
          name="payment"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={colors.themeblue}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(2),
            fontSize: responsiveFontSize(tablet ? 1.25 : 2),
            color: colors.themeblue,
            fontWeight: 'bold'
          }}>
          Payout
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
          onPress={() => navigation.navigate('paypalEmail')}
          style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
          {/* <Text style={styles.text}>Paypal Email (Receive Payments)</Text> */}
          <View style={styles.iconCont}>
            <PurchasesIcon
              style={[ tablet && styles.iconWidth]}
              name="money-check"
              size={responsiveFontSize(tablet ? 1.8 : 2.8)}
              color={colors.themeblue}
            />
          </View>
          <Text style={styles.menuItemText}>Payment Method</Text>
        </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('purchases')
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <View style={styles.iconCont}>
          <PurchasesIcon
            style={[tablet && styles.iconWidth]}
            name="money-check"
            size={responsiveFontSize(tablet ? 1.5 : 2.5)}
            color={colors.themeblue}
          />
        </View>
        <Text
          style={styles.menuItemText}>
          Purchases
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('reffferral_sales')
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
          <View style={styles.iconCont}>
              <CashIcon
                style={[tablet && styles.iconWidth]}
                name="account-cash"
                size={responsiveFontSize(tablet ? 1.8 : 2.5)}
                color={colors.themeblue}
              />
          </View>
        <Text
          style={styles.menuItemText}>
          Referral Sales
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('earnings')
          alert("In Progress")
        }}
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
          <View style={styles.iconCont}>
            <FontAwesomeIcon
                style={[tablet && styles.iconWidth]}
                name="hand-holding-usd"
                size={responsiveFontSize(tablet ? 1.8 : 2.8)}
                color={colors.themeblue}
              />
          </View>
        <Text
          style={styles.menuItemText}>
          Earnings
        </Text>
      </TouchableOpacity>
     
      {/* <TouchableOpacity
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}
        onPress={() => {
          navigation.navigate('purchase');
        }}>
        <PurchasesIcon
          style={[{ marginLeft: responsiveFontSize(1) }, tablet && styles.iconWidth]}
          name="money-check"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={colors.themeblue}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(2),
            fontSize: responsiveFontSize(tablet ? 1.25 : 2),
            color: colors.themeblue,
            fontWeight: 'bold'
          }}>
          Purchases
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("shippingAddress");
        }}>
        <ShippingAddIcon
          style={[{
            marginLeft: responsiveFontSize(1)
          }, tablet && styles.iconWidth]}
          name="address-card"
          size={responsiveFontSize(tablet ? 1.5 : 2)}
          color={false ? '#000000' : colors.lightGray}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(1),
            fontSize: responsiveFontSize(tablet ? 1 : 1.6),
          }}>
          Shipping Address
        </Text>
      </TouchableOpacity> */}
       {/* {authRed.data?.account_type == 'customer' ? (
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('BioShop');
            alert("Coming Soon...")
          }}
          style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
          <InfluencerIcon
            style={[{
              marginLeft: responsiveFontSize(1),
            }, tablet && styles.iconWidth]}
            name="user"
            size={responsiveFontSize(tablet ? 1.5 : 2.6)}
            color={false ? '#000000' : colors.themeblue}
          />
          <Text
            style={{
              marginLeft: responsiveFontSize(2),
              fontSize: responsiveFontSize(tablet ? 1 : 2),
              color: colors.themeblue,
              fontWeight: 'bold'
            }}>
            Become an influencer
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('earning');
            }}
            style={styles.item}>
            <EarningIcon
              style={[{
                marginLeft: responsiveFontSize(1),
              }, tablet && styles.iconWidth]}
              name="money-check-alt"
              size={responsiveFontSize(tablet ? 1.5 : 2)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                marginLeft: responsiveFontSize(2),
                fontSize: responsiveFontSize(tablet ? 1 : 2),
                color: colors.themeblue,
                fontWeight: 'bold'
              }}>
              Earning Reports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('balance')
            }}>
            <BalanceIcon
              style={[{
                marginLeft: responsiveFontSize(1)
              }, tablet && styles.iconWidth]}
              name="wallet"
              size={responsiveFontSize(tablet ? 1.5 : 2.5)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                marginLeft: responsiveFontSize(2),
                fontSize: responsiveFontSize(tablet ? 1 : 2),
                color: colors.themeblue,
                fontWeight: 'bold'
              }}>
              Balance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSettingOpen(!settingOpen)}
            style={styles.item}>
            <InfluencerSetupIcon
              style={[{
                marginLeft: responsiveFontSize(1),
              }, tablet && styles.iconWidth]}
              name="gears"
              size={responsiveFontSize(tablet ? 1.5 : 2.5)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                marginLeft: responsiveFontSize(2),
                fontSize: responsiveFontSize(tablet ? 1 : 2),
                color: colors.themeblue,
                fontWeight: 'bold'
              }}>
              Influencer Section
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <UpDownIcon
                style={{
                  marginLeft: responsiveFontSize(1),
                  marginRight: responsiveFontSize(1)
                }}
                name={settingOpen ? 'up' : 'down'}
                size={responsiveFontSize(tablet ? 1.5 : 2.5)}
                color={false ? '#000000' : colors.themeblue}
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('events')
            }}>
            <EventIcon
              style={[{
                marginLeft: responsiveFontSize(1)
              }, tablet && styles.iconWidth]}
              name="event"
              size={responsiveFontSize(tablet ? 1.5 : 2.5)}
              color={false ? '#000000' : colors.themeblue}
            />
            <Text
              style={{
                marginLeft: responsiveFontSize(2),
                fontSize: responsiveFontSize(tablet ? 1 : 2),
                color: colors.themeblue,
                fontWeight: 'bold'
              }}>
              Event Hosting
            </Text>
            </TouchableOpacity> commment
        </>
      )}  */}
      {/* {settingOpen ? renderSettingDetails() : null}
      <TouchableOpacity
        onPress={() => setIsProfilesettingOpen(!isProfilesettingOpen)}
        style={styles.item}>
        <SettingIcon
          style={[{
            marginLeft: responsiveFontSize(1),
          }, tablet && styles.iconWidth]}
          name="settings"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={false ? '#000000' : colors.themeblue}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(2),
            fontSize: responsiveFontSize(tablet ? 1 : 2),
            color: colors.themeblue,
            fontWeight: 'bold'
          }}>
          Settings
        </Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <UpDownIcon
            style={{
              marginLeft: responsiveFontSize(1),
              marginRight: responsiveFontSize(1)
            }}
            name={isProfilesettingOpen ? 'up' : 'down'}
            size={responsiveFontSize(tablet ? 1.5 : 2.5)}
            color={false ? '#000000' : colors.themeblue}
          />
        </View>
      </TouchableOpacity>
      {isProfilesettingOpen ? renderSettingOpions() : null} */}
      {/* <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('events')
        }}>
        <EventIcon
          style={[{
            marginLeft: responsiveFontSize(1)
          }, tablet && styles.iconWidth]}
          name="event"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={false ? '#000000' : colors.themeblue}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(2),
            fontSize: responsiveFontSize(tablet ? 1 : 2),
            color:colors.themeblue,
            fontWeight:'bold'
          }}>
          Event Hosting
        </Text>
      </TouchableOpacity> */}
      {authRed?.success ? (
        null
        // <TouchableOpacity
        //   style={styles.item}
        //   onPress={() => {
        //     // navigation.reset({
        //     //   index: 0,
        //     //   routes: [{ name: 'Home' }],
        //     // })
        //     // navigation.reset({
        //     //   index: 1,
        //     //   routes: [
        //     //     { name: 'Menu' }
        //     //   ],
        //     // })
        //     // logOut().then(() => { });
        //     navigation.navigate('contactus');
        //     // navigation.navigate("Home",{screen:'category'})
        //   }}>
        //   <LogoutIcon
        //     style={[{
        //       marginLeft: responsiveFontSize(1)
        //     }, tablet && styles.iconWidth]}
        //     name="customerservice"
        //     size={responsiveFontSize(tablet ? 1.5 : 2.5)}
        //     color={false ? '#000000' : colors.lightGray}
        //   />
        //   <Text
        //     style={{
        //       marginLeft: responsiveFontSize(1),
        //       fontSize: responsiveFontSize(tablet ? 1 : 1.6),
        //     }}>
        //     Contact Us
        //   </Text>
        // </TouchableOpacity>
      ) : null}
      {authRed?.success ? (
        null
        // <TouchableOpacity
        //   style={styles.item}
        //   onPress={() => {
        //     // navigation.reset({
        //     //   index: 0,
        //     //   routes: [{ name: 'Home' }],
        //     // })
        //     // navigation.reset({
        //     //   index: 1,
        //     //   routes: [
        //     //     { name: 'Menu' }
        //     //   ],
        //     // })
        //     logOut().then(() => { });
        //     // navigation.navigate("Home",{screen:'category'})
        //   }}>
        //   <LogoutIcon
        //     style={[{
        //       marginLeft: responsiveFontSize(1)
        //     }, tablet && styles.iconWidth]}
        //     name="logout"
        //     size={responsiveFontSize(tablet ? 1.5 : 2.5)}
        //     color={false ? '#000000' : colors.lightGray}
        //   />
        //   <Text
        //     style={{
        //       marginLeft: responsiveFontSize(1),
        //       fontSize: responsiveFontSize(tablet ? 1 : 1.6),
        //     }}>
        //     Logout
        //   </Text>
        // </TouchableOpacity>
      ) : null}

      {/* <TouchableOpacity
      disabled
        style={{ ...styles.item, marginTop: responsiveFontSize(0.25) }}>
        <VerIcon
          style={{
            marginLeft: responsiveFontSize(1),
          }}
          name="versions"
          size={responsiveFontSize(tablet ? 1.5 : 2.5)}
          color={false ? '#000000' : colors.lightGray}
        />
        <Text
          style={{
            marginLeft: responsiveFontSize(1),
            fontSize: responsiveFontSize(tablet ? 1 : 1.6),
            color:'gray'
          }}>
          App version {deviceInfo.getVersion()}
        </Text>
      </TouchableOpacity> */}
      <View style={{ flex: 1, justifyContent: 'flex-end',marginBottom:"3%" }}>
        <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.8), color: 'gray', textAlign: 'center' }}> © <Text>2022 KonnectBio Inc. | All rights reserved</Text></Text>
        <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.8), color: 'gray', textAlign: 'center' }}> App version {deviceInfo.getVersion()}</Text>
      </View>
    </View>
  );
}

function mapStateToProps({ authRed }) {
  return { authRed };
}

export default connect(mapStateToProps, { ...authAct })(CustomDrawerContent);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveFontSize(tablet ? 0.25 : 0.5),
    // height: responsiveHeight(6.5),
    paddingVertical: responsiveFontSize(tablet ? 1 : 2),
    backgroundColor: 'white',
    marginTop: responsiveFontSize(tablet ? 0.125 : 0.25),
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#001441'
  },
  settingDetails: {
    backgroundColor: 'white',
    paddingLeft: responsiveFontSize(6),
  },
  settingDetailsItem: {
    padding: responsiveFontSize(tablet ? 0.5 : 1),
    color: colors.themeblue, fontWeight: '300'
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 0.85 : 1.8),
    color: colors.themeblue, fontWeight: '300'
  },
  iconWidth: {
    // width: "4%",
  },
  iconCont:{
    // backgroundColor:"red",
    width:tablet ? "10%" : "10%",
    justifyContent:"center",
    alignItems:"center"
  },
  menuItemText:{
    marginLeft: "1%",
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: colors.themeblue,
    // fontWeight: 'bold'
  }
});