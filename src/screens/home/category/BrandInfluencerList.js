// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  addons,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import Box from '../../../components/Box';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import rowFormat from '../../../utils/rowFormate';
import ShareModal from '../../../components/ShareModal';
import NotFound from '../../../components/NotFound';
import { useNavigation } from '@react-navigation/native';
import PopularBrands from '../brand/PopularBrands';
import rowFormate from '../../../utils/rowFormate';
import colors from '../../../assets/colors/colors';
import Loader from '../../../components/Loader';
import { useDispatch } from 'react-redux';
import deviceInfo from 'react-native-device-info';
import SortModal from '../../../components/SortModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BrandYouLove from '../../../components/BrandYouLove';
import NewPopularBrands from '../brand/NewPopularBrands';
import AutoHeightImage from 'react-native-auto-height-image';
import HotDeal from '../../../components/HotDeal';


const tablet = deviceInfo.isTablet();
const ALPHA = [
  'all',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export default function BrandInfluencerList({
  brandInfluencers,
  getBrandInfluencers,
  cat,
  popularBrands,
  getPopular,
  header,
  sortFunction,
  influencers,
  categoryBrandsYouLoveRed,
  categoryBannersRed,
  categoryFeaturedRed,
  isShowLoader,
  catState,
  hotDealRed
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState({});
  const [shareModal, setShareModal] = useState(false);
  const [alpha, setAlpha] = useState('all');
  const [brandLoading, setBrandLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function renderItem(items) {
    return items.map((it, i) => {
      return (
        <Box
          call={() => {
            if (it.promo != 'KB0' && it.promo) {
              setCurrentData({ ...it, categoryId: it._id, _id: it.user_id });
              setShareModal(true);
            } else {
              if (it?.instagram_username !== "") {
                console.log('TEM',it)

                navigation.navigate('liveEvents', {
                  data:{...it,_id:it._id,instagram_username:it?.instagram_username},
                  shopName: it?.instagram_username,
                  categoryName: cat.category_name,
                  categoryId: it._id,
                  type: 'other',
                  target:"Recorded"
                })
              } else {
                navigation.navigate('liveEvents', {
                  data:{...it,_id:it._id,instagram_username:it?.pixel_id},
                  shopName: it?.pixel_id,
                  categoryName: cat.category_name,
                  categoryId: it._id,
                  type: 'other',
                  target:"Recorded"
                })
              }
            }
          }}
          ImagePassStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            backgroundColor: 'white',
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
            marginVertical: responsiveFontSize(1),
            marginLeft: responsiveFontSize(items.length == 1 ? 1 : 0.5),
          }}
          dis={it.promo != 'KB0' && it.promo ? it.discount : null}
          boxWidth={responsiveWidth(tablet ? (items.length == 1 ? 96 : (items.length == 2 ? 48 : 32)) : 96) - responsiveFontSize(1)}
          key={it.user_id}
          name={it.name}
          img={
            it.profile_image_url
              ? { uri: it.profile_image_url }
              : require('../../../assets/user.png')
          }
        />
      );
    });
  }

  const renderHeaderMemo = useMemo(() => {
    return (
      <>
        {header()}
        {isShowLoader ?
          <View style={{ marginVertical: "5%", }}>
            <Loader />
          </View>
          :
          <>
            {!influencers ? (
              <>
                {
                  categoryBannersRed.length > 0 && <View
                    style={{
                      width: responsiveWidth(92),
                      marginVertical: responsiveFontSize(1),
                      marginTop: responsiveFontSize(2.5),
                      alignSelf: 'center'
                    }}>
                    <FlatList
                      data={categoryBannersRed}
                      horizontal={true}
                      contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      ListFooterComponent={<View style={{ width: 20 }} />}
                      style={{ left: 1 }}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              // console.log(item)
                              if (item.brandData.length > 0) {
                                if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                                  navigation.navigate('liveEvents', {
                                    // shopName: item.brandData[0].instagram_username,
                                    data: item.brandData[0],
                                    shopName: item.brandData[0].instagram_username,
                                    categoryName: cat.category_name,
                                    // categoryId: item.hasOwnProperty("userParentCategoryData") ? item?.userParentCategoryData[0]?._id : item?.categoryData[0]?._id,
                                    type: 'other',
                                    childId: item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?._id : null,
                                    childname: item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?.category_name : null,
                                    target:"Recorded"
                                  })
                                } else {
                                  navigation.navigate('liveEvents', {
                                    data: item.brandData[0],
                                    shopName: item.brandData[0].pixel_id,
                                    categoryName: cat.category_name,
                                    // categoryId: item.hasOwnProperty("userParentCategoryData") ? item?.userParentCategoryData[0]?._id : item?.categoryData[0]?._id,
                                    type: 'other',
                                    childId: item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?._id : null,
                                    childname: item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?.category_name : null,
                                    target:"Recorded"
                                  });
                                }
                              }
                            }}
                            style={{
                              marginVertical: responsiveFontSize(tablet ? 0 : 0.5),
                              width: responsiveWidth(tablet ? 45 : 80),
                              marginRight: responsiveWidth(tablet ? 2 : 4.8),
                              // backgroundColor:"red"
                            }}>
                            <AutoHeightImage
                              width={responsiveWidth(tablet ? 45 : 80)}
                              source={{ uri: item.mobile_url }}
                              style={{
                                borderRadius: responsiveFontSize(
                                  tablet ? 0.75 : 1.25,
                                ),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, i) => i.toString()}
                    />
                  </View>
                }
              </>
            ) : null}
            {!influencers ?
              (categoryFeaturedRed.length > 0 &&
                <View style={{ ...styles.headCon, marginTop: responsiveFontSize(influencers ? 1 : 0.25) }}>
                  <Text style={styles.text}>
                    Featured Brands
                  </Text>
                  <View style={styles.line} />
                </View>)
              :
              <View style={{ ...styles.headCon, marginTop: responsiveFontSize(influencers ? 1 : 0.25) }}>
                <Text style={styles.text}>
                  Top Influencers
                </Text>
                <View style={styles.line} />
              </View>
            }
            {!influencers ?
              (categoryFeaturedRed.length > 0 &&
                <View style={{ width: responsiveWidth(91), alignSelf: 'center' }}>
                  <NewPopularBrands
                    // single={true}
                    brands={categoryFeaturedRed}
                    getPopularBrands={getPopular}
                    cat={{
                      categoryName: cat.category_name,
                      categoryId: cat._id,
                      type: 'other',
                    }}
                  />
                </View>)
              :
              <View style={{ width: responsiveWidth(91), alignSelf: 'center' }}>
                <PopularBrands
                  single={true}
                  brands={popularBrands}
                  getPopularBrands={getPopular}
                  cat={{
                    categoryName: cat.category_name,
                    categoryId: cat._id,
                    type: 'other',
                  }}
                />
              </View>}
            {(categoryBrandsYouLoveRed.length > 0 && !influencers) &&
              <View style={{ marginTop: "2%" }}>
                <BrandYouLove data={categoryBrandsYouLoveRed} cat={cat} />
              </View>}
          </>
        }

        {(hotDealRed.length > 0 && !influencers) && (
          <View>
            <HotDeal data={hotDealRed} />
          </View>
        )}
        <View style={styles.headCon}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.text}>
                {cat.category_name} {!influencers ? 'Brands' : 'Influencers'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: responsiveFontSize(tablet ? 1 : 0.5),
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: responsiveFontSize(tablet ? 1 : 1.6),
                    color: colors.themeblue,
                  }}>
                  Sort
                </Text>
                <Ionicons
                  style={{
                    top: 1.5,
                  }}
                  name="chevron-down"
                  size={responsiveFontSize(tablet ? 1.5 : 2.2)}
                  color={false ? '#000000' : colors.themeblue}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>
        <View style={{ width: responsiveWidth(91), alignSelf: 'center' }}>
          <FlatList
            data={ALPHA}
            contentContainerStyle={{
              marginBottom: responsiveHeight(0.5),
              marginLeft: -4,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setBrandLoading(true);
                    setAlpha(item);
                    dispatch({ type: 'clearBrandInfluencers' });

                    getBrandInfluencers(
                      1,
                      cat._id,
                      item,
                      influencers ? 'influencer' : 'brand',
                    ).then(() => {
                      setBrandLoading(false);
                    });
                  }}
                  style={{
                    backgroundColor:
                      item == alpha ? colors.themeblue : 'white',
                    marginHorizontal: responsiveFontSize(tablet ? 0.35 : 0.7),
                    paddingHorizontal: responsiveFontSize(tablet ? 1.1 : 2.2),
                    paddingVertical: responsiveHeight(tablet ? 0.6 : 1.1),
                    borderRadius: responsiveFontSize(tablet ? 1 : 2),
                  }}
                  key={item}>
                  <Text
                    style={{
                      color: item == alpha ? 'white' : colors.themeblue,
                      fontSize: responsiveFontSize(tablet ? 1 : 1.9),
                    }}>
                    {item?.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </>
    )
  }, [alpha, catState, isShowLoader])

  function renderBox({ item, index }) {
    if (index == 0) {
      return (
        <>
          {rowFormate(brandInfluencers.data, tablet ? 3 : 1).length == 1 &&
            item[tablet ? 2 : 0]?._id != 'notFound' ? (
            <View style={{ height: responsiveHeight(15) }}>
              <Loader />
            </View>
          ) : null}
          {rowFormate(brandInfluencers.data, tablet ? 3 : 1).length == 1 &&
            item[tablet ? 2 : 0]?._id == 'notFound' ? (
            <View style={{ height: responsiveHeight(15) }}>
              <NotFound
                text={!influencers ? 'No Brand Found' : 'No Influencer Found'}
              />
            </View>
          ) : null}
        </>
      );
    } else {
      return <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{renderItem(item)}</View>;
    }
  }

  function renderFooter() {
    return (
      <>
        {(tablet ? (brandInfluencers.count + 3) : (brandInfluencers.count + 1)) > brandInfluencers.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : <View style={{ height: responsiveScreenFontSize(10) }} />}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if ((tablet ? (brandInfluencers.count + 3) : (brandInfluencers.count + 1)) > brandInfluencers.data.length) {
      getBrandInfluencers(brandInfluencers.pagination?.next?.page, cat._id,null,(cat.influencer?'influencer':'brand'));
    }
  }, [brandInfluencers.pagination?.next?.page, cat._id]);
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ShareModal
        visible={shareModal}
        closeModle={() => setShareModal(false)}
        currentData={currentData}
        call={() => {
          navigation.navigate('viewBioshop', {
            ...currentData,
            shopName: currentData.instagram_username,
            categoryName: cat.category_name,
            categoryId: currentData.categoryId,
            type: 'other',
          });
        }}
      />
      <FlatList
        data={rowFormat(brandInfluencers.data, tablet ? 3 : 1)}
        renderItem={renderBox}
        ListHeaderComponent={renderHeaderMemo}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <NotFound text={'No Brand and Influencer Found'} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, i) => item[0]._id}
      />
      <SortModal
        visible={modalVisible}
        closeModle={() => setModalVisible(false)}
        sortType="categoryBrand"
        id={null}
        func={sortFunction}
        infl={influencers}
        a={setAlpha}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
    left: responsiveFontSize(tablet ? 1 : 1.2)
  },
  headCon: {
    marginTop: responsiveFontSize(tablet ? 1 : 2),
    paddingHorizontal: responsiveFontSize(1),
  },
});
