// @ts-nocheck
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable,
    Alert,
    Image, Dimensions, TextInput, ScrollView,Keyboard
} from 'react-native';
import React, { useCallback, useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import HomeMenu from './HomeMenu';
import SearchIcon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import colors from '../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
import Brands from './brand/brands';
import Influencers from './influencers/Influencers';
import Shows from './Shows';
import CrossIcon from 'react-native-vector-icons/Entypo';
import BrandInfluencers from './category/BrandInfluencers';

const tablet = deviceInfo.isTablet();
const { width } = Dimensions.get('window');

const head = {};
if (width > 550) head.height = 80;

function MainIndex({
  navigation,
  active,
  setActive
}) {
    // const [active, setActive] = useState(1);
    const [filter, onChangeFilter] = useState(false)
    const [filter1, onChangeFilter1] = useState(false)
    const [searchText, setSearchText] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={styles.imgCon}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={require('../../assets/logo.png')}
              />
            </View>
          ),
          headerTitle: props => (
            <View>
              <View style={styles.textCon}>
                <SearchIcon
                  style={styles.searchIcon}
                  name="search"
                  color="#bdbdbd"
                  size={responsiveFontSize(tablet ? 1 : 2)}
                />
                <TextInput
                  // onFocus={() => 
                  //   setDrop(true)
                  // }
                  value={searchText}
                  onChangeText={v => setSearchText(v)}
                  placeholder="Search"
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                    color: 'grey',
                    fontSize: responsiveFontSize(tablet ? 0.75 : 1.6),
                  }}
                />
                {searchText ? (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                      // setDrop(false);
                      Keyboard.dismiss();
                    }}>
                    <CrossIcon
                      name="cross"
                      size={responsiveFontSize(tablet ? 1.25 : 3)}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ),
        });
      }, [navigation, searchText]);

      // console.log(active,"active")

     function renderComponent(){
        if(active == 1){
            return(
                <Shows filter={filter} onChangeFilter={onChangeFilter} />
            )
        }
        else if(active == 2){
          // 6191eb41d4e4b5c44013cd4f
            return(
              // <Brands filter={filter} onChangeFilter={onChangeFilter} />
              <BrandInfluencers dataP={{category_name:"All",_id:"all",influencer:false}} filter1={filter1} onChangeFilter1={onChangeFilter1}/>

                // <BrandInfluencers dataP={{category_name:"Sports",_id:"6209e1695800fadc9655a71c",influencer:false}} filter1={filter1} onChangeFilter1={onChangeFilter1}/>
            )
        }else if(active == 3){
            return(
              <View/>
            )
        }
     }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HomeMenu setActive={setActive} active={active} filter={onChangeFilter} filter1={onChangeFilter1} />
            {renderComponent()}
        </View >
    );

}

export default MainIndex

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
      width: tablet? responsiveWidth(70): responsiveWidth(65),
      padding: responsiveFontSize(
        Platform.OS == 'ios' ? (tablet ? 0.5 : 0.75) : 0.25,
      ),
      borderRadius: responsiveFontSize(5),
      backgroundColor: 'rgb(242, 242, 242)'
    },
    searchIcon: {
      marginLeft: responsiveFontSize(0.4),
    },
    imgCon: {
      paddingRight: responsiveFontSize(2)
    },
    line: {
      // height: 1,
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
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    btnText: {
      color: 'black',
      fontSize: 15,
      textAlign: 'center',
    },
    line: {
      height: 1,
      backgroundColor: '#b8b8b8',
      marginVertical: responsiveFontSize(1),
      width: responsiveWidth(91),
      alignSelf: 'center',
    },
    text: {
      fontSize: responsiveFontSize(tablet ? 1.25 : 2),
      color: 'rgb(7, 13, 46)',
      left: responsiveFontSize(0.5),
    },
    headCon: {
      paddingHorizontal: responsiveFontSize(1.6),
      marginTop: responsiveFontSize(1),
      marginBottom: responsiveHeight(1.5)
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
      width: responsiveWidth(100),
      height: responsiveHeight(40),
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 35,
  
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: responsiveFontSize(2.5),
      fontWeight: '900',
      color: 'black',
    },
  });