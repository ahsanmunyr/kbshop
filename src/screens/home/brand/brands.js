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
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Box from '../../../components/Box';
import rowFormat from '../../../utils/rowFormate';
import ShareModal from '../../../components/ShareModal';
import { useNavigation } from '@react-navigation/native';
import * as brandAct from '../../../store/actions/brand';
import * as homeAct from '../../../store/actions/home';
import * as bioShop from '../../../store/actions/bioShop';
import * as bannersCoversAct from '../../../store/actions/bannersCoversAct';
import { connect } from 'react-redux';
import PopularBrands from './PopularBrands';
import NotFound from '../../../components/NotFound';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import colors from '../../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
import SortModal from '../../../components/SortModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BrandYouLove from '../../../components/BrandYouLove';
import HotDeal from '../../../components/HotDeal';
import NewPopularBrands from './NewPopularBrands';
import AutoHeightImage from 'react-native-auto-height-image';
import WebWindow from '../WebWindow';
import config from '../../../config/config'

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

function Brands({
  header,
  allBrands,
  getAllBrands,
  popularBrands,
  getPopular,
  bioShopClear,
  getBannersCovers,
  bannerCoversRed,
  getFeaturedCovers,
  featuredBrandsRed,
  getBrandYouLoveCovers,
  brandYouLoveRed,
  getHotDealsCovers,
  hotDealRed,
  reset
}) {
  const navigation = useNavigation();
  const [currentData, setCurrentData] = useState({});
  const [shareModal, setShareModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brandLoading, setBrandLoading] = useState(false);
  const [alpha, setAlpha] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    bioShopClear();
    if (bannerCoversRed.length == 0 && featuredBrandsRed.length == 0 && brandYouLoveRed.length == 0) {
      setLoading(true)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    Promise.all([
      getPopular('brand', 1),
      getAllBrands(1),
      getBannersCovers(),
      getFeaturedCovers(),
      getBrandYouLoveCovers(),
      getHotDealsCovers(),
    ]).then(() => {
      setLoading(false);
    })

    return () => {
      setLoading(true);
      dispatch({ type: 'clearFeaturedBrands' });
      dispatch({ type: 'clearAllBrands' });
    };
  }, [navigation]);

  const sortFunction = sort => {
    // console.log('Sort', sort);
    dispatch({ type: 'clearAllBrands' });
    setAlpha('all');
    if (sort == 'all') {
      getAllBrands(1, null);
    } else {
      getAllBrands(1, null, sort);
    }
  };

  const renderHeaderMemo = useMemo(() => {
    return (
      <>
        {bannerCoversRed.length > 0 && (
          <View
            style={{
              width: responsiveWidth(92),
              marginVertical: responsiveFontSize(1),
              marginTop: responsiveFontSize(0.5),
              alignSelf: 'center',
            }}>
            <FlatList
              data={bannerCoversRed}
              horizontal={true}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              ListFooterComponent={<View style={{ width: 20 }} />}
              style={{ left: 1 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    if (item.brandData.length > 0) {
                      if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                        navigation.navigate('liveEvents', {
                          // shopName: item.brandData[0].instagram_username,
                          data: item.brandData[0]


                        })
                      } else {
                        navigation.navigate('liveEvents', {
                          // shopName: item.brandData[0].pixel_id,
                          data: item.brandData[0]
                        })
                      }
                    }
                  }}
                    style={{
                      marginVertical: responsiveFontSize(tablet ? 0 : 0.5),
                      width: responsiveWidth(tablet ? 50 : 80),
                      marginRight: responsiveWidth(tablet ? 2 : 4.8),
                    }}>
                    <AutoHeightImage
                      width={responsiveWidth(tablet ? 50 : 80)}
                      source={{ uri: item?.mobile_url }}
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
        )}
        {featuredBrandsRed.length > 0 && (
          <>
            <View style={styles.headCon}>
              <Text style={styles.text}>Featured Brands</Text>
              <View style={styles.line} />
            </View>
            <View
              style={{
                width: responsiveWidth(91),
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <NewPopularBrands
                brands={featuredBrandsRed}
                getPopularBrands={getPopular}
              />
            </View>
          </>
        )}

        {brandYouLoveRed.length > 0 && (
          <View>
            <BrandYouLove data={brandYouLoveRed} />
          </View>
        )}

        {hotDealRed.length > 0 && (
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
              <Text style={styles.text}>All Brands</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                      dispatch({ type: 'clearAllBrands' });
                      getAllBrands(1, item).then(() => {
                        setBrandLoading(false);
                      });
                    }}
                    style={{
                      backgroundColor:
                        item == alpha ? colors.themeblue : 'white',
                      marginHorizontal: responsiveFontSize(
                        tablet ? 0.35 : 0.7,
                      ),
                      paddingHorizontal: responsiveFontSize(
                        tablet ? 1.1 : 2.2,
                      ),
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
        </View>
      </>
    )
  }, [alpha, loading])

  function renderBox({ item, index }) {
    if (index == 0) {
      return (
        <>
          {rowFormat(allBrands.data, tablet ? 3 : 1).length == 1 &&
            item[tablet ? 2 : 0]?._id != 'notFound' ? (
            <View style={{ height: responsiveHeight(15) }}>
              <Loader />
            </View>
          ) : null}
          {rowFormat(allBrands.data, tablet ? 3 : 1).length == 1 &&
            item[tablet ? 2 : 0]?._id == 'notFound' ? (
            <View style={{ height: responsiveHeight(15) }}>
              <NotFound text={'No Brand Found'} />
            </View>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
            {item.map((it, i) => {
              return (
                <Box
                  call={() => {
                    if (it.promo != 'KB0' && it.promo) {
                      setCurrentData(it);
                      setShareModal(true);
                    } else {
                      if (it?.instagram_username !== "") {
                        navigation.navigate('liveEvents', {
                          data: it,
                        })
                      } else {
                        navigation.navigate('liveEvents', {
                          data: it,
                        })
                      }
                      bioShopClear();
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
                    marginLeft: responsiveFontSize(item.length == 1 ? 1 : 0.5),
                  }}
                  boxWidth={
                    responsiveWidth(
                      tablet
                        ? item.length == 1
                          ? 96
                          : item.length == 2
                            ? 48
                            : 32
                        : 96,
                    ) - responsiveFontSize(1)
                  }
                  key={it._id}
                  name={it.brand_name}
                  dis={it.hasOwnProperty("promo") && it.hasOwnProperty("discount") ?
                    it.promo != 'KB0' && it.promo ? it.discount : null
                    :
                    null}
                  img={
                    it.profile_image_url
                      ? { uri: it.profile_image_url }
                      : require('../../../assets/user.png')
                  }
                />
              );
            })}

          </View>
        </>
      );
    }
  }

  function renderFooter() {
    // alert(JSON.stringify({a:allBrands.count,b:allBrands.data.length })) brandLoading
    return (
      <>
        {((tablet ? (allBrands.count + 3) : (allBrands.count + 1))) > allBrands.data.length ? (
          <>
            {
              brandLoading ?
                <View style={styles.footer}>
                  <Text style={styles.btnText}>Loading...</Text>
                  <ActivityIndicator color="black" style={{ marginLeft: 8 }} />

                </View> : <View style={{ height: responsiveScreenFontSize(5) }} />
            }
          </>
        ) : <View style={{ height: responsiveFontSize(15) }}></View>}
        <View style={{ height: responsiveFontSize(5) }}></View>
      </>
    );
  }

  const loadMore = useCallback(() => {

    if (((tablet ? (allBrands.count + 3) : (allBrands.count + 1))) > allBrands.data.length) {
      // setBrandLoading(true);
      getAllBrands(allBrands.pagination?.next?.page).then(() => {
        setBrandLoading(false);
      })
    }
  }, [allBrands.pagination?.next?.page]);

  if (!loading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {shareModal && <ShareModal
          visible={shareModal}
          closeModle={() => setShareModal(false)}
          currentData={currentData}
          call={() => {
            navigation.navigate('viewBioshop', {
              shopName: currentData?.instagram_username !== "" ?
                currentData?.instagram_username :
                currentData?.pixel_id,
              ...currentData,
            });
            bioShopClear();
          }}
        />}
        <FlatList
          ListHeaderComponent={renderHeaderMemo}
          data={rowFormat(allBrands.data, tablet ? 3 : 1)}
          renderItem={renderBox}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NotFound text="No Brand Found" />}
          keyExtractor={(item, i) => item[0]._id}
        />

        <SortModal
          visible={modalVisible}
          closeModle={() => setModalVisible(false)}
          sortType="brand"
          id={null}
          func={sortFunction}
          infl={false}
          a={setAlpha}
        />

      </View>
    );
  } else {
    return <Loader />;
  }
}
function mapStateToProps({
  allBrands,
  popularBrands,
  bannerCoversRed,
  featuredBrandsRed,
  brandYouLoveRed,
  hotDealRed,
}) {
  return {
    allBrands,
    popularBrands,
    bannerCoversRed,
    featuredBrandsRed,
    brandYouLoveRed,
    hotDealRed,
  };
}

export default connect(mapStateToProps, {
  ...brandAct,
  ...homeAct,
  ...bioShop,
  ...bannersCoversAct,
})(Brands);

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'
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