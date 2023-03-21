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
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import Box from '../../../components/Box';
import ShareModal from '../../../components/ShareModal';
import {useNavigation} from '@react-navigation/native';
import rowFormate from '../../../utils/rowFormate';
import NotFound from '../../../components/NotFound';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();
function PopuplarBrands({brands, getPopularBrands, single, cat}) {
  const navigation = useNavigation();
  const [boxLayout, setBoxLayout] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [shareModal, setShareModal] = useState(false);
  function renderCategory({item, index}) {
    if (single) {
      return (
        <View onLayout={e => setBoxLayout(e.nativeEvent.layout)}>
          <Box
            key={item._id}
            call={() => {
              if (item.promo != 'KB0' ? item.discount : null) {
                setCurrentData(item);
                setShareModal(true);
              } else {
                if (cat) {
                  navigation.navigate('viewBioshop', {
                    shopName: item.instagram_username?item.instagram_username:item.pixel_id,
                    categoryName: cat.categoryName,
                    categoryId: item.categoryId,
                  });
                } else {
                  navigation.navigate('viewBioshop', {
                    shopName:  item.instagram_username?item.instagram_username:item.pixel_id,
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
              elevation: 5,
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
            dis={item.promo != 'KB0' ? item.discount : null}
            getLayout={e => e}
            name={item.name}
            img={
              item.profile_image_url
                ? {uri: item.profile_image_url}
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
                dis={it.promo != 'KB0' ? it.discount : null}
                call={() => {
                  if (it.promo != 'KB0' && it.promo) {
                    setCurrentData(it);
                    setShareModal(true);
                  } else {
                    if (cat) {
                      navigation.navigate('viewBioshop', {
                        shopName: it.instagram_username,
                        ...cat,
                      });
                    } else {
                      navigation.navigate('viewBioshop', {
                        shopName: it.instagram_username,
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
                  elevation: 5,
                  backgroundColor: 'white',
                  height: responsiveWidth(tablet ? 12 : 28),
                  width: responsiveWidth(tablet ? 30 : 65),
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderRadius: 7,
                  paddingLeft: 12,

                  bottom: 0,
                }}
                boxWidth={responsiveWidth(80)}
                getLayout={e => e}
                name={it.name}
                img={
                  it.profile_image_url
                    ? {uri: it.profile_image_url}
                    : require('../../../assets/user.png')
                }
              />
            );
          })}
          <View style={{height: 10}}></View>
        </View>
      );
    }
  }

  function renderFooter() {
    return (
      <>
        {brands.count > brands.data.length ? (
          <View style={{...styles.footer, height: boxLayout.height}}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{marginLeft: 8}} />
          </View>
        ) : (
          <View style={{width: 20}} />
        )}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if (brands.count > brands.data.length) {
      getPopularBrands('brand', brands.pagination?.next?.page);
    }
  }, [brands.pagination?.next?.page]);

  return (
    <View>
      <ShareModal
        visible={shareModal}
        closeModle={() => setShareModal(false)}
        currentData={currentData}
        call={() => {
          if (cat) {
            console.log('aa', cat);
            navigation.navigate('viewBioshop', {
              ...currentData,
              shopName: currentData.instagram_username,
              categoryName: cat.categoryName,
              categoryId: currentData.categoryId,
            });
          } else {
            navigation.navigate('viewBioshop', {
              ...currentData,
              shopName: currentData.instagram_username,
            });
          }
        }}
      />
      <FlatList
        data={single ? brands.data : rowFormate(brands.data, 2)}
        renderItem={renderCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => (single ? item._id : item[0]._id)}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<NotFound text={'No top influencer Found'} />}
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
