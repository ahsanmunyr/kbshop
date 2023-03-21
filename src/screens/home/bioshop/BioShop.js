// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Items from '../../bioShop/bioshop/items';
import Items2 from '../../bioShop/bioshop/items2';
import Post from '../../bioShop/bioshop/post';
import * as actions from '../../../store/actions/bioShop';
import colors from '../../../assets/colors/colors';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import Links from '../../bioShop/bioshop/links';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';
import BackIcon from 'react-native-vector-icons/Ionicons';
import rowFormate from '../../../utils/rowFormate';
import PostModal from './PostModal';
import * as favAct from '../../../store/actions/favouriteAct';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import deviceInfo from 'react-native-device-info';
import WebWindow from '../WebWindow';
import * as subCategoryAct from '../../../store/actions/subCategoryAct';
import LiveSessionModal from '../../../components/LiveSessionModal';
import BrandLiveEvents from '../Live/BrandLiveEvents';
import DropDownComp from '../../../components/DropDownComp';
import SocialStoreFilterModal from '../../../components/SocialStoreFilterModal';
const tablet = deviceInfo.isTablet();
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const BioShopScreen = ({
  getBioShopData,
  bioShopReducer,
  getAllPost,
  getAllPostBasedOnSubCat,
  bioShopAllPosts,
  categoriesReducer,
  bioShopClear,
  navigation,
  categoriesSelected,
  addFavourite,
  deleteFavourite,
  subCategoryRed,
  getSubCategories,
  categoryDataClear,
  bioShopClearSub,
  authRed,
  data,
  setIsFilterSocialStoreModal,
  isFilterSocialStoreModal

}) => {
  const [loading, setLoading] = useState(false);
  // const [data, onChangeData] = useState(null);
  const [post, onChangePost] = useState([]);
  const [categories, onChangeCategories] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [offset, setOffset] = useState(1);
  const [offsetCat, setOffsetCat] = useState(1);
  const [offsetSubCat, setOffSubsetCat] = useState(1);
  // const [type, onChangeType] = useState(route?.params?.type);
  const [apiLoader, onChangeApiLoader] = useState(false);
  const [select, onChangeSelected] = useState('');
  const [selectSub, onChangeSelectedSub] = useState('');
  const [categoryItem, onChangeCategoryItem] = useState({});
  const [subCategoryItem, onChangeSubCategoryItem] = useState({});
  const [scrollIndex, onChangeScrollIndex] = useState(0);
  const [modal, onChangeModalState] = useState(false);
  const [objData, onChangeObjData] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [itemDetail, setitemDetail] = useState(null);
  const [catApiLoader, catOnChangeApiLoader] = useState(false);
  const [webModal, setWebModal] = useState(false);
  const [webData, setWebData] = useState({});
  const [hasMoreFalse, setHasMoreFalse] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const [value, setValue] = useState(null);
  const [categoryItemStatus, onChangeCategoryItemStatus] = useState(false)
  const [categoryItem1Status, onChangeCategoryItem1Status] = useState(false)
  const [categoryItemAllStatus, onChangeCategoryItemAllStatus] = useState(false)
  const [isShowLiveSessModal, setIsShowLiveSessModal] = useState(false)
  const [ids, onChangeIds] = useState([]);
  
  // const [eventType, setEventType] = useState('');
  // const [sortBy, onChangeSortBy] = useState('');
  const [btn, onChangeBtn] = useState(false);
  const [showSelectedEventTypesEvent, setShowSelectedEventTypesEvent] =
    useState({ eventType: '', filterBy: '', catID: [] });
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Date', value: 'date' },
    { label: 'Top Discount %', value: 'topdiscount' },
    { label: 'Referral Fee', value: 'referralfee' },
  ]);

  const [items1, setItems1] = useState([
    { label: 'Date', value: 'date' },
    { label: 'Top Discount %', value: 'topdiscount' },
    { label: 'Influencer Fee', value: 'influencerfee' },

  ]);

  const bioShop = 'private';
  const dispatch = useDispatch();
  const numColumns = tablet ? 4 : 2;


  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setIsBio(true);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    return () => {
      // setIsBio(false);
      bioShopClear();
    };
  }, []);

 

  useEffect(() => {
    onChangeBtn(false)
    // alert(currentItem)

    if(categoryItemAllStatus && !categoryItemStatus){
     
    

      let postType = currentItem == "" ? "image,campaign,video" : currentItem
      
      setLoading(true)
      setOffset(1);
      setOffsetCat(1);
      bioShopClearSub()
      onChangeSelected('ALL POSTS');
      getAllPost(
        data?.instagram_username,
        '12',
        1,
        postType,
        'shop',
        value
      ).then(() => {
        setLoading(false);
      });
    }


    if (value == 'date' && currentItem == '' && !categoryItemStatus && !categoryItemAllStatus) {
      setLoading(true)
      setOffset(1);
      setOffsetCat(1);
      bioShopClearSub()
      onChangeSelected('ALL POSTS');
      getAllPost(
        data?.instagram_username,
        '12',
        1,
        'image,campaign,video',
        'shop',
        value
      ).then(() => {
        setLoading(false);
      });
    }
 

  

    if (currentItem == 'image' && !categoryItemAllStatus) {
      // console.log(currentItem, "currentItem", value, "value")
      if (currentItem == 'image' && value != null  && !categoryItemStatus && !categoryItem1Status) {
        // alert("IMAGES")
        openPost()
      }
  
      if (value && categoryItemStatus) {

        categoryDataClear();
        onChangeApiLoader(true);
        setOffset(1);
        setOffsetCat(1);
        onChangeSelectedSub('');
        onChangeSelected(categoryItem.categoryName)
        categoriesSelected(
          categoryItem.id,
          "POSTS",
          data?.instagram_username,
          1,
          currentItem,
          value
        ).then(() => {
          onChangeApiLoader(false);
        });
      }
      // if (value && categoryItem1Status) {

      //   setOffset(1);
      //   setOffsetCat(1);
      //   onChangeApiLoader(true)
      //   categoryDataClear()
      //   getAllPostBasedOnSubCat(
      //     subCategoryItem.ShopName,
      //     subCategoryItem.childID,
      //     1,
      //     subCategoryItem.ParentID,
      //     subCategoryItem.categoryName,
      //     currentItem,
      //     value
      //   ).then(() => {
      //     onChangeApiLoader(false);
      //   });
      // }
    }



    if (currentItem == 'video' && !categoryItemAllStatus) {

      if (currentItem == 'video' && value != null && !categoryItemStatus && !categoryItem1Status) {
      
        openVideos()
      }
      
      if (value && categoryItemStatus) {
        // alert("MUBARAK video")
        categoryDataClear();
        onChangeApiLoader(true);
        setOffset(1);
        setOffsetCat(1);
        onChangeSelectedSub('');
        onChangeSelected(categoryItem.categoryName)
        categoriesSelected(
          categoryItem.id,
          "VIDEOS",
          data?.instagram_username,
          1,
          currentItem,
          value
        ).then(() => {
          onChangeApiLoader(false);
        });
      }
    //   if (value && categoryItem1Status) {
    //     setOffset(1);
    //     setOffsetCat(1);
    //     onChangeApiLoader(true)
    //     categoryDataClear()

    //     getAllPostBasedOnSubCat(
    //       subCategoryItem.ShopName,
    //       subCategoryItem.childID,
    //       1,
    //       subCategoryItem.ParentID,
    //       subCategoryItem.categoryName,
    //       currentItem,
    //       value

    //     ).then(() => {
    //       onChangeApiLoader(false);
    //     });
    //   }
    }



    if (currentItem == '' || currentItem == 'topdiscount' || currentItem == 'referralfee' && !categoryItemAllStatus) {
          // console.log(categoryItem)
      if (value && categoryItemStatus) {
        // alert(currentItem)
        // console.log(currentItem," currentItem")
        setOffset(1);
        setOffsetCat(1);
        bioShopClearSub()
        onChangeApiLoader(true)
        onChangeSelected(categoryItem.categoryName)
        categoriesSelected(
          categoryItem.id,
          categoryItem.categoryName,
          categoryItem.userName,
          1,
          currentItem,
          value
        ).then(() => {
          onChangeApiLoader(false);
        });
      }
    //   if (value && categoryItem1Status) {
    //     setOffset(1);
    //     setOffsetCat(1);
    //     onChangeApiLoader(true)
    //     categoryDataClear()

    //     getAllPostBasedOnSubCat(
    //       subCategoryItem.ShopName,
    //       subCategoryItem.childID,
    //       1,
    //       subCategoryItem.ParentID,
    //       subCategoryItem.categoryName,
    //       currentItem,
    //       value
    //       // ShopName,ID,1,ParentID,Name
    //     ).then(() => {
    //       onChangeApiLoader(false);
    //     });
    //   }
    }
  }, [value, categoryItemStatus, categoryItem1Status, currentItem, btn])



  useEffect(() => {
    catOnChangeApiLoader(true);
    getBioShopData(data?.instagram_username).then(() => {
      catOnChangeApiLoader(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    onChangeSelected('ALL POSTS');
    getAllPost(
      data?.instagram_username,
      '12',
      offset,
      'image,campaign,video',
      'shop',
    ).then(() => {
      setLoading(false);
    });
    return () => {
      bioShopClear();
    };
  }, [])



  useEffect(() => {
    if (bioShopReducer?.status) {
      onChangeCategories([
        ...bioShopReducer?.data?.menu,
        ...bioShopReducer?.data?.categories,
      ]);
    }
  }, [bioShopReducer]);

  useEffect(() => {
    if (bioShopAllPosts?.status) {
      onChangePost(bioShopAllPosts.data);
      if (bioShopAllPosts?.hasMore) {
      }
    }
  }, [bioShopAllPosts]);

  const onRefresh = React.useCallback(() => {
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function loadMoreData() {
   
    if (categoryItem?.categoryName == 'ALL POSTS') {
      // setHasMoreFalse(false)
  
      categoriesSelected(
        categoryItem.id,
        categoryItem.categoryName,
        categoryItem.userName,
        offset + 1,
        currentItem,
        value
      ).then(() => {
        setOffset(ps => {
          return ps + 1;
        });
      });
    } else {
      let postType = currentItem == "" ? "image,campaign,video" : currentItem
      getAllPost(
        data?.instagram_username,
        '12',
        offset + 1,
        postType,
        'shop',
        value
      ).then(() => {
        setOffset(ps => {
          return ps + 1;
        });
      });
    }
  }

  function renderFooter() {
    return (
      <>
        {bioShopAllPosts?.hasMore && hasMoreFalse ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
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

  function loadMoreData1() {
     
    if (subCategoryItem.subCategory) {
      getAllPostBasedOnSubCat(
        subCategoryItem.ShopName,
        subCategoryItem.childID,
        offsetSubCat + 1,
        subCategoryItem.ParentID,
        subCategoryItem.categoryName,
        currentItem,
        value
        // ShopName,ID,1,ParentID,Name
      ).then(() => {
        setOffSubsetCat(ps => {
          return ps + 1;
        });
      });
      // alert("AHSAN")
    } else {

      if(currentItem == 'image'){

        categoriesSelected(
          categoryItem.id,
          "POSTS",
          categoryItem.userName,
          offsetCat + 1,
          currentItem,
          value
        ).then(() => {
          setOffsetCat(ps => {
            return ps + 1;
          });
        });
      }else if(currentItem == 'video'){
        categoriesSelected(
          categoryItem.id,
          "VIDEOS",
          categoryItem.userName,
          offsetCat + 1,
          currentItem,
          value
        ).then(() => {
          setOffsetCat(ps => {
            return ps + 1;
          });
        });
      }else{
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

      
    }
  }

  if (loading) {
    return (
      <View style={{
        height:responsiveHeight(80), width:responsiveWidth(100)
      }}>
    <Loader />
    </View>
    )
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

  function allPostFlatlist({ item, index }) {
    // console.log(item, "=========================")
    return (
      <View
        style={{
          zIndex: -1,
          flexDirection: 'row',
          // justifyContent: tablet ? 'space-around': 'space-between',
          // alignItems:'flex-start',
          // marginLeft:
          //   item.length != 2 ? responsiveFontSize(tablet?0:0) : responsiveFontSize(0.5),

        }}
        key={index}>
        {item.map((it, i) => {
          return (
            <Post
              shopName={data?.instagram_username}
              openModal={() => {
                setDetailModal(true);
                setitemDetail({
                  ...it,
                  user: bioShopReducer.data,
                  index: index * i,
                });
              }}
              openWeb={openWeb}
              key={i}
              objectItem={it}
              index={i}
              Images={it.media_url}
              ID={it.post_id}
              RedirectLink={it.redirected_url}
              Type={it.media_type}
              Linked={it.linked}
              StartDate={it.start_date}
              EndDate={it.end_date}
              OnChangeModal={onChangeModalState}
              DataSet={onChangeObjData}
              PostType={bioShop}
              post_type={'forFollowers'}
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

  function categoryFlatlist({ item, index }) {
    return (
      <Items
        Images={item.image_url}
        Name={item.name || item.category_name}
        ID={item.id || item.category_id}
        USER={data?.instagram_username}
        ParentID={item.parent_id}
        Page={offsetCat}
        Loader={onChangeApiLoader}
        currentItem={currentItem}
        Selected={select}
        OnChangeSelected={onChangeSelected}
        OnChangeSelectedSub={onChangeSelectedSub}
        OnChangeCat={onChangeCategoryItem}
        ChangeOffset={setOffsetCat}
        ChangeOff={setOffset}
        ShopName={data?.instagram_username}
        SetHasMoreFalse={setHasMoreFalse}
        ItemValue={value}
        onChangeStatus={onChangeCategoryItemStatus}
        onChangeStatus1={onChangeCategoryItem1Status}
        sortSelect={setValue}
      />
    );
  }

  // function getAll() {
  //   setValue(null)
  //   setCurrentItem('');
  //   onChangeApiLoader(true);
  //   setOffset(1);
  //   setOffsetCat(1);
  //   onChangeSelectedSub('');
  //   setHasMoreFalse(false);
  //   getAllPost(data?.instagram_username, '12', 1, 'image,campaign,video', 'shop', 'date');
  //   onChangeSelected(categories[1].name || categories[1].category_name);
  // }

  function openVideos() {

    setCurrentItem('video');
    categoryDataClear();
    onChangeApiLoader(true);
    onChangeCategoryItemStatus(false)
    onChangeCategoryItem1Status(false)
    setOffset(1);
    setOffsetCat(1);
    onChangeSelectedSub('');
    onChangeCategoryItem({
      id: categories[3].id || categories[3].category_id,
      categoryName: categories[3].name || categories[3].category_name,
      userName: data?.instagram_username,
      PageNo: 1,
      subCategory: false,
    });
    categoriesSelected(
      categories[3].id || categories[3].category_id,
      categories[3].name || categories[3].category_name,
      data?.instagram_username,
      1,
      currentItem,
      value
    ).then(() => {
      onChangeApiLoader(false);
      // alert("ASD")
    });
    onChangeSelected(categories[3].name || categories[3].category_name);
    // setValue(null)
    // let data = {
    //   _id: categories[3].parent_id,
    //   subCategory: true,
    // };
    // getSubCategories(data);
  }

  function openPost() {
    setCurrentItem('image');
    categoryDataClear();
    onChangeApiLoader(true);
    onChangeCategoryItemStatus(false)
    onChangeCategoryItem1Status(false)
    setOffset(1);
    setOffsetCat(1);
    onChangeSelectedSub('');
    onChangeCategoryItem({
      id: categories[3]?.id || categories[3]?.category_id,
      categoryName:    'POSTS',
      userName: data?.instagram_username,
      PageNo: 1,
      subCategory: false,
      value
    });

    categoriesSelected(
      categories[3]?.id || categories[3]?.category_id,
      'POSTS',
      data?.instagram_username,
      1,
      currentItem,
      value
    ).then(() => {
      onChangeApiLoader(false);
    });

    onChangeSelected(categories[3]?.name || categories[3].category_name);
    // setValue(null)
    // let data = {
    //   _id: categories[3].parent_id,
    //   subCategory: true,
    // };
    // getSubCategories(data);
  }

  function SubcategoryFlatlist({ item, index }) {
    return (
      <Items2
        Images={item.image_url}
        Name={item.category_name || route?.params?.childname}
        ID={item._id || route?.params?.childId}
        IsActive={item.is_active}
        IsCustom={item.is_custom}
        IsFeatured={item.is_featured}
        IsSubCategory={item.is_subcategory}
        ParentID={categoryItem.id || route?.params?.categoryId}
        Page={offsetSubCat}
        currentItem={currentItem}
        Loader={onChangeApiLoader}
        ShopName={data?.instagram_username}
        Selected={selectSub}
        OnChangeSelected={onChangeSelectedSub}
        OnChangeCat={onChangeSubCategoryItem}
        ChangeOffset={setOffSubsetCat}
        ItemValue={value}
        onChangeStatus={onChangeCategoryItem1Status}
        onChangeStatus1={onChangeCategoryItemStatus}
      />
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

  function allcategoriesPost({ item, index }) {
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
              shopName={data?.instagram_username}
              openModal={() => {
                setDetailModal(true);
                setitemDetail({ ...it, user: bioShopReducer.data, index: i });
              }}
              key={i}
              openWeb={openWeb}
              index={i}
              objectItem={it}
              Images={it.media_url}
              ID={it.post_id}
              RedirectLink={it.redirected_url}
              Type={it.media_type}
              Linked={it.linked}
              StartDate={it.start_date}
              EndDate={it.end_date}
              OnChangeModal={onChangeModalState}
              DataSet={onChangeObjData}
              PostType={bioShop}
              post_type="forFollowers"
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

  const favFuntion = () => {
    if (!bioShopReducer?.data?.isFavoriteBrand) {
      addFavourite(bioShopReducer?.data?._id)
        .then(res => {
          dispatch({
            type: 'brandLike',
            payload: {
              brandLike: true,
              brandId: bioShopReducer?.data?._id,
            },
          });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      deleteFavourite(bioShopReducer?.data?._id).then(() => {
        dispatch({
          type: 'brandLike',
          payload: {
            brandLike: false,
            brandId: bioShopReducer?.data?._id,
          },
        });
      });
    }
  };

  const itemProfile = () => {
    onChangeSelected('PROFILE');
  };

  const itemLink = () => {
    onChangeApiLoader(true);
    onChangeSelected('LINKS');
    categoriesSelected(
      3333,
      'LINKS',
      data?.instagram_username,
      1,
      currentItem,
    ).then(() => {
      onChangeApiLoader(false);
    });
  };



  return (
    <SafeAreaView style={styles.container}>
      {
        isFilterSocialStoreModal &&
        <SocialStoreFilterModal
          closeModle={() => {
            setIsFilterSocialStoreModal(false);
          }}
          visible={isFilterSocialStoreModal}
          onGetIds={onChangeIds}
          setCurrentItem={setCurrentItem}
          setValue={setValue}
          categoriesOfBioShop={bioShopReducer?.data?.categories}
          showSelectedEventTypesEvent={showSelectedEventTypesEvent}
          setOffset={setOffset}
          setOffsetCat={setOffsetCat}
          setOffSubsetCat={setOffSubsetCat}
          onChangeBtn={onChangeBtn}
          ShopName={data?.instagram_username}
          onChangeCategoryItemStatus={onChangeCategoryItemStatus}
          onChangeCategoryItem={onChangeCategoryItem}
          onChangeCategoryItemAllStatus={onChangeCategoryItemAllStatus}
          // setEventType={setEventType}
          // eventType={eventType}
          // onChangeSortBy={onChangeSortBy}
          // sortBy={sortBy}
        />
      }
      {isShowLiveSessModal && <LiveSessionModal visible={isShowLiveSessModal}
        closeModle={() => setIsShowLiveSessModal(false)}
        brandName={data?.name}
        discount={bioShopReducer?.data?.promo != 'KB0' ? bioShopReducer?.data?.promo : null}
      />}
      <WebWindow
        closeModle={() => setWebModal(false)}
        data={webData}
        bioData={bioShopReducer.data || null}
        visible={webModal}
      />
      {detailModal ? (
        <PostModal
          openWeb={openWeb}
          visible={detailModal}
          closeModle={() => {
            setDetailModal(false);
            setitemDetail(null);
          }}
          cbForHeart={data => {
            const cState = {
              ...itemDetail,
              children: itemDetail.children.map(item => {
                if (item.id === data.id) {
                  return { ...item, isFavoriteChild: data.isFavoriteChild };
                } else {
                  return { ...item };
                }
              }),
            };
          }}
          select={select}
          brandLike={bioShopReducer?.data?.isFavoriteBrand}
          dis={
            bioShopReducer.data.promo != 'KB0' && bioShopReducer.data.promo
              ? `GET ${bioShopReducer.data.discount} OFF`
              : null
          }
          loadMore={select == 'ALL POSTS' ? loadMoreData : loadMoreData1}
          bioShopAllPosts={bioShopAllPosts}
          data={{ shopName: data?.instagram_username, itemDetail }}
        />
      ) : null}
      {!catApiLoader ? (
        <>
          {/* <View style={styles.listHeaderComponent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: responsiveWidth(96),
                // zIndex: 9999
              }}>
              <View
                style={{
                  width: responsiveWidth(50),
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: tablet ? '15%' : '15%',
                    marginLeft: responsiveFontSize(1),
                  }}
                  onPress={() => {
                    navigation.goBack();
                    bioShopClear();
                  }}>
                  <BackIcon
                    name="arrow-back"
                    size={responsiveFontSize(tablet ? 2.5 : 3.0)}
                  />
                </TouchableOpacity>
                <View style={{ width: '60%', marginLeft: responsiveFontSize(0) }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(tablet ? 1 : 1.5),
                      width: '100%',
                      textAlign: 'left',
                      left: 5,
                    }}>
                    {data?.name}
                  </Text>
                  {bioShopReducer?.data?.promo != 'KB0' &&
                    bioShopReducer?.data.promo ? (
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(tablet ? 0.75 : 1.25),
                        width: '60%',
                        color: 'red',
                        textAlign: 'left',
                        left: 5,
                      }}>
                      GET {bioShopReducer?.data?.discount} OFF
                    </Text>
                  ) : null}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: responsiveWidth(tablet ? 27.5 : 50),
                  right: 20,
                  // zIndex: 30,
                  // backgroundColor:'red',

                }}>
                <TouchableOpacity onPress={favFuntion} style={[styles.btn2, { width: responsiveWidth(15) }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: responsiveFontSize(tablet ? 1 : 1.25),
                    }}>
                    <FavIcon
                      name="favorite"
                      size={responsiveFontSize(tablet ? 2 : 3)}
                      color={
                        bioShopReducer?.data?.isFavoriteBrand ? 'red' : 'white'
                      }
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ top: tablet ? responsiveFontSize(2.5) : 0, width: responsiveWidth(32), zIndex: 9999 }}>
                  <DropDownComp
                    items={authRed.data.account_type == 'customer' ? items: items1}
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    onSelectItem={data => {
                      setValue(data.value)
                    }}
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
                      // height: responsiveHeight(16),
                      right: responsiveWidth(29),
                      // zIndex: 99
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: responsiveFontSize(0.5),
              marginHorizontal: responsiveFontSize(0.5),
              marginVertical: responsiveFontSize(tablet ? 0.5 : 0),
              zIndex: -1,

            }}>
            <TouchableOpacity
              onPress={getAll}
              style={{
                ...styles.btn2,
                backgroundColor: currentItem == '' ? 'black' : colors.themeblue,
              }}>
              <View
                style={{
                  width: responsiveWidth(22),
                  paddingHorizontal: responsiveFontSize(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}>
                  All
                </Text>
              </View>
            </TouchableOpacity>
       
            {
              bioShopReducer?.status ?
                <>
                  {(bioShopReducer?.data?.menu?.filter(
                    item => item.name == 'VIDEOS',
                  )).length > 0 ? (
                    <TouchableOpacity
                      onPress={openVideos}
                      style={{
                        ...styles.btn2,
                        backgroundColor:
                          currentItem == 'video' ? 'black' : colors.themeblue,
                      }}>
                      <View
                        style={{
                          width: responsiveWidth(22),
                          paddingHorizontal: responsiveFontSize(1),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                            color: 'white',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                          }}>
                          Video Posts
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </>
                : null
            }

            <TouchableOpacity onPress={() => openPost()}  style={{
                        ...styles.btn2,
                        backgroundColor:
                          currentItem == 'image' ? 'black' : colors.themeblue,
                      }}>
              <View
                style={{
                  width: responsiveWidth(22),
                  paddingHorizontal: responsiveFontSize(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}>
                  Simple Posts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (data?.name == "Kbinfluencer1") {
                setCurrentItem('live')
                onChangeSelected("Live")
                // setIsShowLiveSessModal(true)
              } else {
                setCurrentItem('live')
                onChangeSelected("Live")
              }
            }} style={{
              ...styles.btn2,
              backgroundColor: currentItem == 'live' ? 'black' : colors.themeblue,
            }}>
              <View
                style={{
                  width: responsiveWidth(22),
                  paddingHorizontal: responsiveFontSize(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(tablet ? 0.65 : 1.25),
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}>
                  Live Shopping
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

          {
            select != 'Live' ?
              <View style={{ zIndex: -1, }}>

                {/* <FlatList
                  data={categories}
                  horizontal
                  initialScrollIndex={scrollIndex || 0}
                  onScrollToIndexFailed={({ index }) => {
                    onChangeScrollIndex(index);
                  }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={categoryFlatlist}
                  keyExtractor={item => item.category_id || item.id}
                /> */}
                {select != 'PROFILE' &&
                  select != 'ALL POSTS' &&
                  select != 'LINKS' &&
                  select != 'VIDEOS' &&
                  subCategoryRed?.length > 0 && (
                    null
                    // <FlatList
                    //   data={subCategoryRed}
                    //   horizontal
                    //   ListEmptyComponent={() => (
                    //     <NotFound text="No Sub Category To Show" />
                    //   )}
                    //   // initialScrollIndex={scrollIndex || 0}
                    //   onScrollToIndexFailed={({ index }) => {
                    //     onChangeScrollIndex(index);
                    //   }}

                    //   showsHorizontalScrollIndicator={false}
                    //   // renderItem={SubcategoryFlatlist}
                    //   keyExtractor={(item, i) => i.toString()}
                    // />
                  )}
              </View> : null
          }

        </>
      ) : null}

      <View style={[styles.hr, { zIndex: -1 }]} />

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
                color: 'black',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: responsiveFontSize(tablet ? 0.75 : 2.5),
                marginTop: 5,
                width: responsiveWidth(80),
              }}>
              {data?.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                fontSize: responsiveFontSize(tablet ? 0.75 : 1.5),
                marginTop: 5,
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
              style={{ zIndex: -1 }}
              contentContainerStyle={{ zIndex: -1 }}
              showsVerticalScrollIndicator={false}
              data={rowFormate(bioShopAllPosts.data, numColumns)}
              ListFooterComponent={renderFooter()}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              ListHeaderComponentStyle={{ zIndex: -1 }}
              ListHeaderComponent={<View style={{
                height: responsiveScreenFontSize(0.5)

              }}></View>}
              ListEmptyComponent={() => <NotFound text="No Posts To Show" />}
              // refreshControl={onReFresh()}
              renderItem={allPostFlatlist}
              keyExtractor={(item, i) => i.toString()}
            />
          ) : (
            <Loader />
          )}
        </>
      ) : select == 'Live' ?
        <View style={{ zIndex: -1 }}>
          <BrandLiveEvents brandName={data?.instagram_username} />
        </View>
        :
        select == 'LINKS' ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!apiLoader ? (
              <FlatList
                key={'#'}
                showsVerticalScrollIndicator={false}
                data={categoriesReducer.data}
                numColumns={1}
                contentContainerStyle={{ alignSelf: 'center', top: 40 }}
                style={{ width: '100%' }}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
                ListEmptyComponent={() => <NotFound text="No Links To Show" />}
                renderItem={allLinksFlatlist}
                keyExtractor={item => item.post_id}
              />
            ) : (
              <Loader />
            )}
          </View>
        ) : (
          <>
            {select != 'LINKS' && select != 'ALL POSTS' && select != 'PROFILE' ? (
              <>
                {!apiLoader ? (
                  <>
                    <FlatList
                      key={'*'}
                      showsVerticalScrollIndicator={false}
                      data={rowFormate(categoriesReducer.otherData, numColumns)}
                      ListFooterComponent={renderFooter1()}
                      onEndReached={loadMoreData1}
                      // refreshControl={onReFresh()}
                      ListEmptyComponent={() => (
                        <NotFound text="No Posts To Show" />
                      )}
                      renderItem={allcategoriesPost}
                      keyExtractor={(item, i) => i.toString()}
                    />
                  </>
                ) : (
                  <Loader />
                )}
              </>
            ) : (
              <Loader />
            )}
          </>
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
    borderBottomWidth: 0.9,
    borderBottomColor: '#e8e8e8',
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
  btn2: {
    backgroundColor: colors.themeblue,
    paddingVertical: responsiveFontSize(tablet ? 0.4 : 0.75),
    justifyContent: 'center',
    borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5),
    alignItems: 'center',
    height: responsiveFontSize(tablet ? 3.25 : 4.75),
  },
});

function mapStateToProps({
  bioShopReducer,
  bioShopAllPosts,
  categoriesReducer,
  subCategoryRed,
  authRed
}) {
  return {
    bioShopReducer,
    bioShopAllPosts,
    categoriesReducer,
    subCategoryRed,
    authRed
  };
}

export default connect(mapStateToProps, {
  ...actions,
  ...favAct,
  ...subCategoryAct,
})(BioShopScreen);
