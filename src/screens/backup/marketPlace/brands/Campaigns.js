import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import New from '../../bioShop/Market/New';
import DropDownComp from '../../../components/DropDownComp';
import Btn from '../../../components/Btn';
import {connect, useDispatch} from 'react-redux';
import * as brandCatAct from '../../../store/actions/brandCatAct';
import * as campaignsAct from '../../../store/actions/campaignsAct';
import Loader from '../../../components/Loader';
import deviceInfo from "react-native-device-info"
import * as catAct from "../../../store/actions/category"

const tablet=deviceInfo.isTablet() 
function Campaigns({
  route,
  navigation,
  getCategories,
  brandCatRed,
  getCampaigns,
  getSelectedCategories,
  authRed,
  seletedCategories
}) {
  const [sortValue, setSortValue] = useState([
    {label: 'Date', value: 'date'},
    {label: 'Commission', value: 'commission'},
  ]);
  const [isSortDropDwn, setIsSortDropDwn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSlectCatDropDwn, setIsSlectCatDropDwn] = useState(false);
  const [loader, setLoader] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    sort_by: 'date',
  });

  const dispatch = useDispatch();

  const getSelectedFilter = (k, v) => {
    setSelectedFilters({...selectedFilters, [k]: v});
  };
  useEffect(() => {
    getCategories(route.params?.id);
    return () => {
      dispatch({type: 'CLEAR_BRAND_CAT'});
    };
  }, []);



  // useEffect(() => {
  //   if(brandCatRed.categories.length>0){
  //     setCategories(brandCatRed.categories);
  //     console.log(brandCatRed.categories,"brandCatRed.categories")
  //     console.log(route.params.parent_id,route.params.category_id)
  //     setSelectedFilters({...selectedFilters,category:route.params.parent_id})
  //   }
  // }, [brandCatRed.categories]);

  useEffect(() => {
      getSelectedCategories(authRed.data._id)
  }, []);
  // console.log(seletedCategories,"=====seletedCategories====")
  useEffect(() => {
    if(seletedCategories.length>0){
      const seletedCategoriesUpdatedData = seletedCategories.map(item => {
        console.log(item)
        return {label: item.category_name, value: item.category_id};
      });
      seletedCategoriesUpdatedData.unshift({label: 'All', value: 'all'});
      console.log({seletedCategoriesUpdatedData})
      setCategories([...seletedCategoriesUpdatedData]);
      setSelectedFilters({...selectedFilters,category:route.params.parent_id})
    }
  }, [seletedCategories]);

  const data = {
    id: route.params.id,
    // category_id: route.params.category_id,
    category_id:route.params.category_id?route.params.category_id:selectedFilters.category,
    sortBy: selectedFilters.sort_by,
  };

  const onSearch = () => {
    setLoader(true);
    dispatch({type: 'clearCampaignData'});
    // console.log(route.params.category_id,"---")
    getCampaigns(
      'marketplace',
      1,
      route.params.id,
      // route.params.category_id?"all":route.params.category_id,
      route.params.category_id?route.params.category_id:selectedFilters.category,
      selectedFilters.sort_by,
      // selectedFilters.sort_by,
    ).then(() => setLoader(false));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
        <TouchableOpacity
          style={{width: tablet?'7.5%':'10%', marginLeft: responsiveFontSize(1)}}
          onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} />
        </TouchableOpacity>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
        {/* <Image    style={{width: 30, height: 30, borderRadius: 100}} resizeMode="cover" source={{uri: route.params.image}} /> */}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: responsiveFontSize(tablet?1.25:1.5),
            padding: responsiveFontSize(tablet?1:2),
            textAlign: 'left',
            width: '60%',
            paddingLeft:"4%",
          }}>
          {route.params?.name}
        </Text>
        </View>
        
        {/* <View style={{width: '20%'}} /> */}
      </View>
      <View style={styles.filterBar}>
        {!route.params.category_id?(
                  <View>
                  <DropDownComp
                    items={categories}
                    open={isSlectCatDropDwn}
                    value={selectedFilters.category}
                    setOpen={setIsSlectCatDropDwn}
                    onSelectItem={data => getSelectedFilter('category', data.value)}
                    listMode="MODAL"
                    placeholdertxt="All"
                    disable={route.params.hasOwnProperty('category_id')}
                    style={{width: responsiveWidth(40),height:responsiveHeight(4.9)}}
                    containerStyle={{width: responsiveWidth(40)}}
                    dropDownContainerStyle={{width: responsiveWidth(40)}}
                    textStyle={{fontSize: responsiveFontSize(1.5)}}
                  />
                  </View>
        ):null}
        <View style={{zIndex: 9999999}}>
          <DropDownComp
            items={sortValue}
            open={isSortDropDwn}
            value={selectedFilters.sort_by}
            setOpen={setIsSortDropDwn}
            onSelectItem={data => setSelectedFilters({...selectedFilters,'sort_by':data.value})}
            listMode="SCROLLVIEW"
            placeholdertxt="Sort by"
            style={{width: responsiveWidth(route.params.category_id?75:35),height:responsiveHeight(4.9)}}
            containerStyle={{width: responsiveWidth(route.params.category_id?75:35)}}
            dropDownContainerStyle={{width: responsiveWidth(route.params.category_id?75:35)}}
            // textStyle={{fontSize: responsiveFontSize(tablet?1:1.5)}}
            tickIconStyle={{
              width: responsiveFontSize(1.4),
              height: responsiveFontSize(1.4),
            }}
          />
        </View>
        <View style={{width:"20%"}}>
        <Btn text={'Search'} call={() => onSearch()} pS={{width: '100%',height:responsiveHeight(4.7)}} />
        </View>
      </View>
      <New data={data} loader={loader} />
      {/* {isApiCall ? <Loader /> : <New data={data} />} */}
    </View>
  );
}

const mapStateToProps = ({brandCatRed,authRed,seletedCategories}) => ({brandCatRed,authRed,seletedCategories});

export default connect(mapStateToProps, {...catAct,...brandCatAct, ...campaignsAct,})(
  Campaigns,
);

const styles = StyleSheet.create({
  filterBar: {
    marginHorizontal: '1.5%',
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:"red",
    alignContent:"center",
    paddingBottom:responsiveHeight(1)
  },
});
