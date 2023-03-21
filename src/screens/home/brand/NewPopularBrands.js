import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import Box from '../../../components/Box';
import ShareModal from '../../../components/ShareModal';
import {useNavigation} from '@react-navigation/native';
import rowFormate from '../../../utils/rowFormate';
import NotFound from '../../../components/NotFound';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();
function PopuplarBrands({brands, single, cat}) {
  const navigation = useNavigation();
  const [boxLayout, setBoxLayout] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [shareModal, setShareModal] = useState(false);

  function newRenderCategory({item}) {
    if (single) {
      return (
        <View onLayout={e => setBoxLayout(e.nativeEvent.layout)}>
          <Box
            key={item._id}
            call={() => {
              // console.log(cat);
              // alert("opi")
              if (
                item.brandData[0].hasOwnProperty('discount') &&
                item.brandData[0].hasOwnProperty('promo')
              ) {
                if (
                  item.brandData[0].promo != 'KB0'
                    ? item.brandData[0].discount
                    : null
                ) {
                  let customObj = {};
                  customObj['_id'] = item?.hasOwnProperty(
                    'userParentCategoryData',
                  )
                    ? item?.userParentCategoryData[0]?._id
                    : item?.categoryData[0]?._id;
                  customObj['brand_name'] = item?.brandData[0]?.name;
                  item.brandData[0].hasOwnProperty('discount') &&
                    (customObj['discount'] = item?.brandData[0]?.discount);
                  customObj['instagram_username'] =
                    item?.brandData[0]?.instagram_username;
                  customObj['name'] = item?.brandData[0]?.name;
                  customObj['pixel_id'] = item?.brandData[0]?.pixel_id;
                  customObj['profile_image_url'] =
                    item?.brandData[0]?.profile_image_url;
                  customObj['childId'] = item.hasOwnProperty('subCategoryData')
                    ? item?.subCategoryData[0]?._id
                    : null;
                  customObj['childname'] = item.hasOwnProperty(
                    'subCategoryData',
                  )
                    ? item?.subCategoryData[0]?.category_name
                    : null;
                  item.brandData[0].hasOwnProperty('promo') &&
                    (customObj['promo'] = item?.brandData[0]?.promo);

                  setCurrentData(customObj);
                  setShareModal(true);
                } else {
                  if (cat) {
                    navigation.navigate('viewBioshop', {
                      shopName:
                        item.brandData[0].instagram_username !== ''
                          ? item.brandData[0].instagram_username
                          : item.brandData[0].pixel_id,
                      categoryName: cat.categoryName,
                      categoryId: item?.hasOwnProperty('userParentCategoryData')
                        ? item?.userParentCategoryData[0]?._id
                        : item?.categoryData[0]?._id,
                      childId: item.hasOwnProperty('subCategoryData')
                        ? item?.subCategoryData[0]?._id
                        : null,
                      childname: item.hasOwnProperty('subCategoryData')
                        ? item?.subCategoryData[0]?.category_name
                        : null,
                    });
                  } else {
                    navigation.navigate('viewBioshop', {
                      shopName:
                        item.brandData[0].instagram_username !== ''
                          ? item.brandData[0].instagram_username
                          : item.brandData[0].pixel_id,
                    });
                  }
                }
              } else {
                if (cat) {
                  navigation.navigate('viewBioshop', {
                    shopName:
                      item.brandData[0].instagram_username !== ''
                        ? item.brandData[0].instagram_username
                        : item.brandData[0].pixel_id,
                    categoryName: cat.categoryName,
                    categoryId: item?.hasOwnProperty('userParentCategoryData')
                      ? item?.userParentCategoryData[0]?._id
                      : item?.categoryData[0]?._id,
                    childId: item.hasOwnProperty('subCategoryData')
                      ? item?.subCategoryData[0]?._id
                      : null,
                    childname: item.hasOwnProperty('subCategoryData')
                      ? item?.subCategoryData[0]?.category_name
                      : null,
                  });
                } else {
                  navigation.navigate('viewBioshop', {
                    shopName:
                      item.brandData[0].instagram_username !== ''
                        ? item.brandData[0].instagram_username
                        : item.brandData[0].pixel_id,
                  });
                }
              }
            }}
            passStyle={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
              backgroundColor: 'white',
              height: responsiveWidth(tablet ? 12 : 28),
              width: responsiveWidth(tablet ? 30 : 65),
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderRadius: 7,
              paddingLeft: 12,
              marginLeft: 2,
              margin: 10,
            }}
            ImagePassStyle={{
              borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
            }}
            dis={
              item.brandData[0].hasOwnProperty('discount') &&
              item.brandData[0].hasOwnProperty('promo')
                ? item.brandData[0].promo != 'KB0'
                  ? item.brandData[0].discount
                  : null
                : null
            }
            getLayout={e => e}
            name={item.brandData[0]?.brand_name}
            img={
              item?.brandData[0]?.profile_image_url
                ? {uri: item?.brandData[0]?.profile_image_url}
                : require('../../../assets/user.png')
            }
          />
        </View>
      );
    } else {
      return (
        <View
          style={{left: -3}}
          onLayout={e => setBoxLayout(e.nativeEvent.layout)}>
          {item.map(it => {
            return (
              <Box
                key={it._id}
                dis={
                  it.brandData[0]?.hasOwnProperty('discount') &&
                  it.brandData[0]?.hasOwnProperty('promo')
                    ? it.brandData[0].promo != 'KB0'
                      ? it.brandData[0].discount
                      : null
                    : null
                }
                call={() => {
                  navigation.navigate('liveEvents', {
                    // shopName: item.brandData[0].instagram_username,
                    data: {
                      ...it.brandData[0],
                      instagram_username:(it.brandData[0]?.instagram_username)?(it.brandData[0]?.instagram_username):it.brandData[0]?.pixel_id,
                    },
                    target:"Recorded"
                  })
                  // if (
                  //   it.brandData[0].hasOwnProperty('discount') &&
                  //   it.brandData[0].hasOwnProperty('promo')
                  // ) {
                  //   if (
                  //     it.brandData[0].promo != 'KB0'
                  //       ? it.brandData[0].discount
                  //       : null
                  //   ) {
                  //     let customObj = {};
                  //     customObj['_id'] = it?._id;
                  //     customObj['brand_name'] = it?.brandData[0]?.name;
                  //     it.brandData[0].hasOwnProperty('discount') &&
                  //       (customObj['discount'] = it?.brandData[0]?.discount);
                  //     customObj['instagram_username'] =
                  //       it?.brandData[0]?.instagram_username;
                  //     customObj['name'] = it?.brandData[0]?.name;
                  //     customObj['pixel_id'] = it?.brandData[0]?.pixel_id;
                  //     customObj['profile_image_url'] =
                  //       it?.brandData[0]?.profile_image_url;
                  //     it.brandData[0].hasOwnProperty('promo') &&
                  //       (customObj['promo'] = it?.brandData[0]?.promo);
                  //     setCurrentData(customObj);
                  //     setShareModal(true);
                  //   } else {
                  //     if (cat) {
                  //       navigation.navigate('viewBioshop', {
                  //         shopName:
                  //           it.brandData[0].instagram_username !== ''
                  //             ? it.brandData[0].instagram_username
                  //             : it.brandData[0].pixel_id,
                  //         categoryName: cat.categoryName,
                  //         categoryId: item._id,
                  //       });
                  //     } else {
                  //       navigation.navigate('viewBioshop', {
                  //         shopName:
                  //           it.brandData[0].instagram_username !== ''
                  //             ? it.brandData[0].instagram_username
                  //             : it.brandData[0].pixel_id,
                  //       });
                  //     }
                  //   }
                  // } else {
                  //   if (cat) {
                  //     navigation.navigate('viewBioshop', {
                  //       shopName:
                  //         it.brandData[0].instagram_username !== ''
                  //           ? it.brandData[0].instagram_username
                  //           : it.brandData[0].pixel_id,
                  //       categoryName: cat.categoryName,
                  //       categoryId: item._id,
                  //     });
                  //   } else {
                  //     navigation.navigate('viewBioshop', {
                  //       shopName:
                  //         it.brandData[0].instagram_username !== ''
                  //           ? it.brandData[0].instagram_username
                  //           : it.brandData[0].pixel_id,
                  //     });
                  //   }
                  // }
                }}
                passStyle={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  backgroundColor: 'white',
                  height: responsiveWidth(tablet ? 12 : 20),
                  width: responsiveWidth(tablet ? 30 : 35),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  // paddingLeft: 12,
                  bottom: 0,
                }}
                ImagePassStyle={{
                  width: responsiveWidth(tablet ? 11 : 20),
                  height: responsiveFontSize(tablet ? 5 : 5),
                  justifyContent:"center",
                  alignItems:"center",
                  alignSelf:"center"
                }}
                imgStyle={{
                  width: responsiveWidth(tablet ? 11 : 22),
                  height: responsiveFontSize(tablet ? 5 : 8),
                }}
                boxWidth={responsiveWidth(80)}
                getLayout={e => e}
                // name={it?.brandData[0]?.brand_name}
                img={{uri: it?.brandData[0]?.profile_image_url}}
              />
            );
          })}
        </View>
      );
    }
  }

  return (
    <View style={{marginBottom: responsiveHeight(1)}}>
      {shareModal && (
        <ShareModal
          visible={shareModal}
          closeModle={() => setShareModal(false)}
          currentData={currentData}
          call={() => {
            if (cat) {
              navigation.navigate('viewBioshop', {
                ...currentData,
                shopName:
                  currentData?.instagram_username !== ''
                    ? currentData?.instagram_username
                    : currentData?.pixel_id,
                categoryName: cat?.categoryName,
                categoryId: currentData?._id,
                childId: currentData?.childId,
                childname: currentData?.childname,
              });
            } else {
              navigation.navigate('viewBioshop', {
                ...currentData,
                shopName:
                  currentData?.instagram_username !== ''
                    ? currentData?.instagram_username
                    : currentData?.pixel_id,
              });
            }
          }}
        />
      )}
      <FlatList
        data={single ? brands : rowFormate(brands, 2)}
        renderItem={newRenderCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => i.toString()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<NotFound text={'No Featured Brand Found'} />}
      />
    </View>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, null)(PopuplarBrands);

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
});
