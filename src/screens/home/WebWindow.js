import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  SafeAreaView
  
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../assets/colors/colors';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('window');
import {useHeaderHeight} from '@react-navigation/elements';
import BackIcon from 'react-native-vector-icons/Ionicons';
import deviceInfo from 'react-native-device-info';
import AnDesignIcon from "react-native-vector-icons/AntDesign"
import MaterIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"

const tablet = deviceInfo.isTablet();
function WebWindow({visible, closeModle, data, bioData}) {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [WebNavState,setWebNavState]=useState({})
  const webViewRef=useRef()

  return (
    <Modal
      animationType="slide"
      onRequestClose={()=>{
        if(WebNavState.canGoBack){
          webViewRef.current.goBack()
        }else{
          closeModle()
        }
      }}
      visible={visible}
      style={{flex: 1, justifyContent: 'center', elevation: 5}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'whtie'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'whtie',
          }}>
          <View style={{...styles.con, backgroundColor: 'whtie', flex: 1}}>
            <View style={{...styles.btn, backgroundColor: 'whtie'}}>
              <TouchableOpacity
                onPress={() => {
                  closeModle();
                }}>
                <BackIcon
                  name="arrow-back"
                  color={'black'}
                  size={responsiveFontSize(tablet ? 2 : 3)}
                />
              </TouchableOpacity>
              <View style={{left: 20, width: '50%'}}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: responsiveFontSize(tablet ? 1.2 : 2.2),
                    width: '100%',
                    textAlign: 'left',
                    left: 5,
                  }}>
                  {bioData?.name}
                </Text>
                {bioData?.promo != 'KB0' && bioData?.promo ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                      width: '60%',
                      color: 'red',
                      textAlign: 'left',
                      left: 5,
                    }}>
                    GET {bioData?.discount} OFF
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: '100%',
              }}>
              <WebView
              style={{flex:1}}
              containerStyle={{flex:1}}
                source={{uri: data.redirectLink}}
                mediaPlaybackRequiresUserAction={true}
                startInLoadingState={true}
                ref={webViewRef}
                onNavigationStateChange={(navState)=>{
                  console.log("myustat",navState)
                  setWebNavState(navState)
                }}
              />
            </View>
            <View style={{width:'100%',backgroundColor:'white',flexDirection:'row',paddingVertical:responsiveFontSize(tablet?0.75:1)}}>
                <TouchableOpacity 
                disabled={!WebNavState.canGoBack}
                onPress={()=>{
                  webViewRef.current.goBack()
                }}
                style={{marginLeft:responsiveFontSize(tablet?2:4)}}>
                  <MaterIcon color={WebNavState.canGoBack?"black":"gray"} name="arrow-back-ios" size={responsiveFontSize(tablet?2.5:3.5)}/>
                </TouchableOpacity>
                <TouchableOpacity 
                disabled={!WebNavState.canGoForward}
                onPress={()=>webViewRef.current.goForward()}
                style={{marginLeft:responsiveFontSize(tablet?2:4)}}>
                  <MaterIcon color={WebNavState.canGoForward?"black":"gray"} name="arrow-forward-ios" size={responsiveFontSize(tablet?2.5:3.5)}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>webViewRef.current.reload()}
                style={{marginLeft:responsiveFontSize(tablet?2:4)}}>
                  <MaterIcon color={"black"} name="refresh" size={responsiveFontSize(tablet?2.5:4)}/>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps, null)(WebWindow);

const styles = StyleSheet.create({
  con: {
    alignItems: 'center',
    width: responsiveWidth(100),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    height: responsiveHeight(8),
  },
  title: {
    fontSize: responsiveFontSize(tablet ? 1.25 : 2),
    color: colors.themeblue,
    paddingLeft: responsiveFontSize(2),
  },
});
