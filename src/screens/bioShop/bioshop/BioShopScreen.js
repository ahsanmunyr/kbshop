// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Items from './items';
import Post from './post';
import * as actions from '../../../store/actions/bioShop';
import { connect } from 'react-redux';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import colors from "../../../assets/colors/colors"
import Links from './links';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';
import { FlatList } from 'react-native-gesture-handler';
import CustomModal from '../../../components/BioShopModal';
import rowFormate from '../../../utils/rowFormate';
import deviceInfo from 'react-native-device-info';
import WebWindow from '../../home/WebWindow';
import FavIcon from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import * as subCategoryAct from '../../../store/actions/subCategoryAct';
import DropDownComp from '../../../components/DropDownComp';
const tablet = deviceInfo.isTablet();
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const BioShopScreen = ({
  getBioShopData,
  bioShopReducer,
  getAllPost,
  bioShopAllPosts,
  categoriesReducer,
  bioShopClear,
  navigation,
  authRed,
  categoriesSelected,
  getSubCategories,
  categoryDataClear,
  bioShopClearSub,
  subCategoryRed
}) => {


  const [loading, setLoading] = useState(false);
  const [data, onChangeData] = useState(null);
  const [post, onChangePost] = useState([]);
  const [categories, onChangeCategories] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [offset, setOffset] = useState(1);
  const [offsetSubCat, setOffSubsetCat] = useState(1);
  const [modal, onChangeModalState] = useState(false);
  const [selectSub, onChangeSelectedSub] = useState('');
  const [objData, onChangeObjData] = useState({});
  const [categoryItem, onChangeCategoryItem] = useState({});
  const [apiLoader, onChangeApiLoader] = useState(false);
  const [offsetCat, setOffsetCat] = useState(1);
  const [select, onChangeSelected] = useState('');
  const [webModal, setWebModal] = useState(false);
  const [webData, setWebData] = useState({});
  const [currentItem, setCurrentItem] = useState('');
  const [categoryItemStatus, onChangeCategoryItemStatus] = useState(false)
  const [categoryItem1Status, onChangeCategoryItem1Status] = useState(false)
  const [subCategoryItem, onChangeSubCategoryItem] = useState({});
  const bioShop = 'personal';
  const numColumns = tablet ? 5 : 2;
  const [hasMoreFalse, setHasMoreFalse] = useState(true)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Date', value: 'date' },
    { label: 'Top Discount %', value: 'topdiscount' },
    { label: 'Referral Fee', value: 'referralfee' },
    { label: 'Influencer Fee', value: 'influencerfee' },

  ]);
  const handle = (authRed?.data?.instagram_username) ? (authRed?.data?.instagram_username) : (authRed?.data?.pixel_id)

  useEffect(() => {
    onChangeSelected('ALL POSTS');
    setLoading(true);
    Promise.all([
      getBioShopData(handle),
      getAllPost(
        handle,
        '12',
        1,
        'image,campaign,video',
        'shop',
        value
      ),
    ]).then(() => setLoading(false));
    return () => {
      bioShopClear();
    };
  }, []);


  // useEffect(()=>{
  //   onChangeApiLoader(true);
  //   categoriesSelected(
  //     categoryItem.id,
  //     categoryItem.categoryName,
  //     categoryItem.userName,
  //      1,
  //   ).then(() => {
  //     onChangeApiLoader(false)
  //   });

  // },[categoryItem])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bioShopClear();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (bioShopReducer?.status) {
      onChangeData(bioShopReducer.data);

      onChangeCategories([
        ...bioShopReducer?.data?.menu,
        ...bioShopReducer?.data?.categories,
      ]);
    }
  }, [bioShopReducer]);

  useEffect(() => {
    if (bioShopAllPosts?.status) {
      onChangePost(bioShopAllPosts.data);
    }
  }, [bioShopAllPosts]);

  const onRefresh = React.useCallback(() => {
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function loadMoreData() {
    getAllPost(
      handle,
      '12',
      offset + 1,
      'image,campaign,video',
      'shop',
      value
    ).then(() => {
      setOffset(ps => {
        return ps + 1;
      });
    });
  }

  function renderFooter() {
    return (
      <>
        {bioShopAllPosts?.hasMore ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }



  function loadMoreData1() {
    categoriesSelected(
      categoryItem.id,
      categoryItem.categoryName,
      categoryItem.userName,
      offsetCat + 1,
      currentItem,
      value
    ).then(() => {
      setOffsetCat(ps => {
        return ps + 1;
      });
    });
  }

  function renderFooter1() {
    return (
      <>
        {categoriesReducer?.hasMore ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  function onReFresh() {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        titleColor="#f54749"
        tintColor="#f54749"
        progressBackgroundColor="white"
        style={{}}
      />
    );
  }

  function categoriesFlatlist({ item, index }) {
    return (
      <Items
        privateBio={true}
        Images={item.image_url}
        Name={item.name || item.category_name}
        ID={item.id || item.category_id}
        USER={handle}
        Page={offsetCat}
        Loader={onChangeApiLoader}
        OnChangeSelectedSub={onChangeSelectedSub}
        Selected={select}
        OnChangeSelected={onChangeSelected}
        OnChangeCat={onChangeCategoryItem}
        ChangeOffset={setOffsetCat}
        ChangeOff={setOffset}
        ShopName={handle}
        SetHasMoreFalse={setHasMoreFalse}
        ItemValue={value}
        onChangeStatus={onChangeCategoryItemStatus}
        onChangeStatus1={onChangeCategoryItem1Status}
        sortSelect={setValue}
      />
    );
  }

  function allPostFlatlist({ item, index }) {
    return (
      <View
        style={{
          zIndex: -1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft:
            item.length != 2 ? responsiveFontSize(0) : responsiveFontSize(0.5),

        }}
        key={index}>
        {item.map((it, i) => {
          return (
            <Post
              key={i}
              index={i}
              objectItem={it}
              Images={it.media_url}
              openWeb={openWeb}
              ID={it.post_id}
              RedirectLink={it.redirected_url}
              Type={it.media_type}
              Linked={it.linked}
              StartDate={it.start_date}
              EndDate={it.end_date}
              OnChangeModal={onChangeModalState}
              DataSet={onChangeObjData}
              post_type={it.post_type}
              PostType={bioShop}
              Promo={it.promo}
              Discount={it.discount}
              Children={it?.children}
              Fav={it?.isFavorite}
            />
          );
        })}
      </View>
    );
  }

  function allLinksFlatlist({ item, index }) {
    return (
      <Links
        ID={item.post_id}
        RedirectLink={item.redirected_url}
        Name={item.caption}
      />
    );
  }

  function categoryAllPostFlatlist({ item, index }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft:
            item.length != 2 ? responsiveFontSize(0) : responsiveFontSize(0.2),
        }}
        key={index}>
        {item.map((it, i) => {
          return (
            <Post
              key={i}
              openWeb={openWeb}
              Images={it.media_url}
              objectItem={it}
              ID={it.post_id}
              RedirectLink={it.redirected_url}
              Type={it.media_type}
              index={i}
              Linked={it.linked}
              StartDate={it.start_date}
              EndDate={it.end_date}
              OnChangeModal={onChangeModalState}
              DataSet={onChangeObjData}
              PostType={bioShop}
              post_type={it.post_type}
              Promo={it.promo}
              Discount={it.discount}
              Children={it?.children}
              Fav={it?.isFavorite}
            />
          );
        })}
      </View>
    );
  }

  function openWeb(data) {
    setWebData(data);
    setWebModal(true);
  }

  const itemProfile = () => {
    onChangeSelected("PROFILE")
  }

  const itemLink = () => {
    onChangeApiLoader(true)
    onChangeSelected("LINKS")
    categoriesSelected(3333, 'LINKS', handle, 1).then(() => {
      onChangeApiLoader(false)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebWindow
        closeModle={() => setWebModal(false)}
        data={webData}
        bioData={bioShopReducer.data || null}
        visible={webModal}
      />
      {modal && (
        <CustomModal
          ModalState={modal}
          openWeb={openWeb}
          ChangeModalState={onChangeModalState}
          obj={objData}
          categories={bioShopReducer?.data?.categories}
          cat={categoryItem}
        />
      )}
      {!loading ? (
        <>
          <View style={styles.listHeaderComponent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: responsiveWidth(91),
                // backgroundColor:'blue',
                height: 50

              }}>
              <View
                style={{
                  // width: responsiveWidth(50),
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>

                <View style={{ marginLeft: responsiveFontSize(1) }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(tablet ? 1 : 1.5),
                      width: '100%',
                      textAlign: 'left',
                      left: 5,
                    }}>
                    {handle}
                  </Text>
                  {bioShopReducer?.data?.promo != "KB0" && bioShopReducer?.data.promo ? (
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(tablet ? 0.75 : 1.25),
                        width: '60%',
                        color: 'red',
                        textAlign: 'left',
                        left: 5,
                      }}
                    >GET {bioShopReducer?.data?.discount} OFF</Text>
                  ) : null}
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(tablet ? 31 : 52.5), }}>

                <TouchableOpacity onPress={itemProfile} style={styles.btn2}>
                  <View style={{ width: responsiveWidth(tablet ? 18 : 27), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FavIcon name='person' size={responsiveFontSize(tablet ? 1 : 2)} color={'white'} />
                    <Text
                      style={{

                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                        color: 'white',
                        textAlign: 'center'
                      }}>
                      {'  '}Profile
                    </Text>
                  </View>

                </TouchableOpacity>

                {/* <TouchableOpacity onPress={itemLink} style={styles.btn2}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Entypo name='link' size={responsiveFontSize(tablet ? 1 : 2)} color={'white'} />
                    <Text
                      style={{

                        fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                        color: 'white',
                        textAlign: 'center'
                      }}>
                      {'  '}Links
                    </Text>
                  </View>
                </TouchableOpacity> */}
                <View style={{ top: tablet ? responsiveFontSize(2.5) : 0, width: responsiveWidth(32), zIndex: 9999 }}>
                  <DropDownComp
                    items={items}
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    onSelectItem={data => {
                      // console.log(data, "Asdasd")
                      setValue(data.value)
                      // console.log(data)
                      // setCategory(data.value);
                      // setCategoryData(data);
                      // // setSubCatShow(true)
                      // setIsSubOpenDrpdwn(false);
                      // subCategoryFunction(data);
                    }}
                    // error={!category && submit}
                    listMode="SCROLLVIEW"
                    ShowsVerticalScrollIndicator={false}
                    textStyle={{
                      fontSize: responsiveFontSize(tablet ? 1 : 1.35),
                    }}
                    placeholdertxt="Sort By"
                    style={{
                      width: responsiveWidth(32),
                      paddingLeft: 10,
                      // zIndex: 99
                    }}
                    containerStyle={{}}
                    dropDownContainerStyle={{
                      width: responsiveWidth(32),
                      height: responsiveHeight(16),
                      right: responsiveWidth(29),
                      // zIndex: 99
                    }}
                  />
                </View>


              </View>
            </View>
          </View>
          <View style={{ marginTop: responsiveFontSize(0.5) }}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={categoriesFlatlist}
              keyExtractor={item => item.category_id || item.id}
            />
          </View>
          <View style={styles.hr} />
          {select == 'PROFILE' ? (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: responsiveFontSize(2),
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#e8e8e8',
                    borderRadius: responsiveWidth(100),
                    padding: 2,
                    backgroundColor: 'white',
                  }}>

                  {data?.profile_image_url ? (
                    <Image
                      style={styles.mainImage}
                      resizeMode="cover"
                      source={{ uri: data?.profile_image_url }}
                    />
                  ) : null}
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '400',
                    width: responsiveWidth(80),
                  }}>
                  {data?.bio}
                </Text>
              </View>
            </ScrollView>
          ) : select == 'ALL POSTS' ? (
            <>
              {!loading ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={rowFormate(bioShopAllPosts.data, numColumns)}
                  ListFooterComponent={renderFooter()}
                  onEndReached={loadMoreData}
                  refreshControl={onReFresh()}
                  renderItem={allPostFlatlist}
                  ListEmptyComponent={() => (
                    <NotFound text="No Posts To Show" />
                  )}
                  keyExtractor={(item, i) => i.toString()}
                />
              ) : (
                <Loader />
              )}
            </>
          ) : select == 'LINKS' ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {!apiLoader ? (
                <FlatList
                  key={'#'}
                  showsVerticalScrollIndicator={false}
                  data={categoriesReducer.data}
                  numColumns={1}
                  contentContainerStyle={{ alignSelf: 'center', top: 40 }}
                  style={{ width: '100%' }}
                  ListEmptyComponent={() => (
                    <NotFound text="No Links To Show" />
                  )}
                  ItemSeparatorComponent={() => {
                    return <View style={{ height: 15 }} />;
                  }}
                  renderItem={allLinksFlatlist}
                  keyExtractor={item => item.post_id}
                />
              ) : (
                <Loader />
              )}
            </View>
          ) : (
            <>
              {select != 'LINKS' &&
                select != 'ALL POSTS' &&
                select != 'PROFILE' ? (
                <>
                  {!apiLoader ? (
                    <FlatList
                      key={'*'}
                      showsVerticalScrollIndicator={false}
                      ListFooterComponent={renderFooter1()}
                      onEndReached={loadMoreData1}
                      data={rowFormate(categoriesReducer.otherData, numColumns)}
                      ListEmptyComponent={() => (
                        <NotFound text="No Posts To Show" />
                      )}
                      refreshControl={onReFresh()}
                      renderItem={categoryAllPostFlatlist}
                      keyExtractor={(item, i) => i.toString()}
                    />
                  ) : (
                    <Loader />
                  )}
                </>
              ) : (
                <Loader />
              )}
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainImage: {
    height: responsiveWidth(tablet ? 15 : 30),
    width: responsiveWidth(tablet ? 15 : 30),
    borderRadius: responsiveWidth(100),
  },
  listHeaderComponent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: responsiveFontSize(1),
    bottom: 4,
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 3,
    backgroundColor: 'white',
    borderColor: '#e6e6e6',
  },
  hr: {
    marginTop: responsiveFontSize(0.5),
    width: responsiveWidth(100),
    height: 2,
    backgroundColor: '#e8e8e8',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    width: '60%',
    textAlign: 'center',
  },
  image: {
    backgroundColor: 'white',
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 100,
  },
  btn2: {
    width: responsiveWidth(tablet ? 15 : 18),
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(tablet ? 0.4 : 0.75),
    justifyContent: 'center',
    borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5),
    height: responsiveFontSize(tablet ? 3.25 : 4.75),
    alignItems: 'center'
  },
});

function mapStateToProps({
  bioShopReducer,
  bioShopAllPosts,
  categoriesReducer,
  authRed,
  subCategoryRed,
}) {
  return {
    bioShopReducer,
    bioShopAllPosts,
    categoriesReducer,
    authRed,
    subCategoryRed,
  };
}

export default connect(mapStateToProps, {
  ...actions,
  ...subCategoryAct,
})(BioShopScreen);
