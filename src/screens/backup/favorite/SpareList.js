import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Btn from '../../components/Btn';
import colors from '../../assets/colors/colors';
import NotFound from '../../components/NotFound';
import { connect } from 'react-redux';
import * as myListAct from '../../store/actions/myListAct';
import Loader from '../../components/Loader';
import Video from 'react-native-video';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PostModal from '../home/bioshop/PostModal2';
import deviceInfo from "react-native-device-info"
import WebWindow from '../home/WebWindow';

const tablet = deviceInfo.isTablet()
const SpareList = ({
  myListRed,
  getMyList,
  isLoading,
  removeItemMyList,
  setIsLoading,
  removeParentFavouritePost
}) => {
  const [pause, onSetPause] = useState(true);
  const [detailModal, setDetailModal] = useState(false);
  const [itemDetail, setitemDetail] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);
  const [webModal, setWebModal] = useState(false)
  const [webData, setWebData] = useState({})
  const sexyPlay = () => {
    if (pause) {
      onSetPause(false);
    } else {
      onSetPause(true);
    }
  };

  useEffect(() => {
    onSetPause(true);
    return () => {
      onSetPause(false);
    };
  }, []);

  const loadMore = useCallback(() => {
    if (myListRed?.count > myListRed.data.length) {
      getMyList(myListRed.pagination?.next?.page);
    }
  }, [myListRed?.pagination?.next?.page]);

  function renderFooter() {
    if (myListRed?.count > myListRed.data.length) {
      return (
        <>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        </>
      );
    }
    return (
      <View style={{ height: responsiveFontSize(10) }}></View>
    );
  }
  function onRemoveItem(id) {
    removeParentFavouritePost(id).then(() => {
      setIsLoading(true);
      getMyList(1).then(() => setIsLoading(false));
    });
  }

  const SpareListItem = ({ data }) => {
    return (
      <View style={styles.cont}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTxt}>{data.name}</Text>
            {data.promo != "KB0" && data.promo ? <Text style={{ color: 'red', fontSize: responsiveFontSize(tablet ? 0.65 : 1.25), marginLeft: responsiveWidth(tablet ? 1 : 2) }}>GET {data.discount} OFF</Text> : null}
          </View>
        </View>
        <View style={styles.listCard}>
          <View style={{ flex: tablet ? 0.6 : 1 }}>
            {data?.postData?.media_type == 'IMAGE' ||
              data?.postData?.media_type == 'CAROUSEL_ALBUM' ? (
              <Image
                source={{ uri: data?.postData?.media_url }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : data?.postData?.media_type == 'VIDEO' ? (
              <>
                <Video
                  ignoreSilentSwitch="ignore"
                  repeat
                  resizeMode="cover"
                  paused={true}
                  playInBackground={false}
                  playWhenInactive={false}
                  disableFocus
                  source={{ uri: data?.postData?.media_url }}
                  style={styles.image}></Video>
              </>
            ) : (
              <View style={styles.image} />
            )}
          </View>
          <View style={styles.detailCont}>
            <View style={{
              flex: tablet ? 3.25 : 0.70
            }} >
              <Text numberOfLines={4} style={[styles.prodName, tablet && { maxWidth: "95%" }]}>{data?.postData?.caption}</Text>
            </View>
            <View style={styles.btnCont}>
              <Btn
                text="Remove"
                call={() => onRemoveItem(data.post_id)}
                pS={[styles.btn, { backgroundColor: colors.errorRed }]}
                pSText={styles.btnText}
              />
              <Btn
                text="View"
                call={() => {
                  setDetailModal(true);
                  setitemDetail(data);
                  setOtherDetails({
                    name: data.name,
                    image: data.image_url,
                  });
                }}
                pS={{ ...styles.btn, marginTop: responsiveFontSize(tablet ? 0.5 : 1) }}
                pSText={styles.btnText}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };


  function openWeb(data) {
    setWebData(data)
    setWebModal(true)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <WebWindow
            closeModle={() => setWebModal(false)}
            bioData={myListRed.data || null}
            data={webData}
            visible={webModal}
          />
          <PostModal
            visible={detailModal}
            closeModle={() => {
              setDetailModal(false);
              setitemDetail(null);
              setOtherDetails(null);
            }}
            openWeb={openWeb}
            data={{
              image: otherDetails?.image,
              shopName: otherDetails?.name,
              itemDetail: itemDetail?.postData,
              data: itemDetail
            }}
            fav={true}
            cbForHeart={(data, prntDtata) => {
              const cState = {
                ...itemDetail, postData: {
                  ...itemDetail.postData, children: itemDetail.postData.children.map((item) => {
                    if (item.id === data.id) {
                      return { ...item, isFavoriteChild: data.isFavoriteChild }
                    } else {
                      return { ...item }
                    }
                  })
                }
              }
              setitemDetail({ ...cState })
            }}
            cbForBrandHeart={(brand_id, isBrandFav) => {
              const copiedState = { ...itemDetail, isFavoriteBrand: isBrandFav }
              setitemDetail({ ...copiedState })
            }}
          />
          <FlatList
            data={myListRed.data}
            renderItem={({ item }) => <SpareListItem data={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={() => <NotFound text={'No Data Found'} />}
            onEndReachedThreshold={0.1}
            onEndReached={() => loadMore()}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = ({ myListRed }) => ({ myListRed });

export default connect(mapStateToProps, myListAct)(SpareList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '2.5%',
    backgroundColor: 'white'
  },
  cont: {
    backgroundColor: '#f5f5f5',
    marginVertical: responsiveHeight(1),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: responsiveFontSize(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width:responsiveWidth(92),
    alignSelf:'center',
    elevation: 5,
    
  },
  listCard: {
    height: responsiveHeight(9),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsiveFontSize(0.5),
    paddingLeft: 5,
    flex: 1
  },
  image: {
    width: responsiveHeight(tablet ? 6 : 8),
    height: responsiveHeight(tablet ? 6 : 8),
    borderRadius: 5,
    // alignSelf: 'center'
  },
  detailCont: {
    marginHorizontal: '1%',
    // marginVertical: responsiveHeight(0.5),
    flexDirection: 'row',
    flex: 4,
    // height:responsiveHeight(8),
    justifyContent: "space-around",
  },
  prodName: {
    fontSize: responsiveFontSize(tablet ? 0.7 : 1.4),
    textAlign: "left",
  },
  prodDescptn: {
    fontSize: responsiveFontSize(1.6),
  },
  btnCont: {
    // height:responsiveHeight(8),
    justifyContent: 'space-between',
    // width: responsiveWidth(15),
    flex: tablet ? 0.75 : 0.25

  },
  btn: {
    height: responsiveHeight(tablet ? 2.5 : 3.5),
    width: '100%',
  },
  btnText: {
    fontSize: responsiveFontSize(tablet ? 0.75 : 1.5),
  },
  videoPlay: {
    height: responsiveWidth(9),
    width: responsiveWidth(9),
    backgroundColor: '#010b40',
    borderRadius: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 9,
    zIndex: 999,
    right: 9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '1.5%',
    borderBottomColor: colors.silver,
    borderBottomWidth: 0.75,
    paddingVertical: responsiveHeight(0.8),
  },
  headerImage: {
    width: responsiveHeight(tablet ? 2 : 4),
    height: responsiveHeight(tablet ? 2 : 4),
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  headerTxt: {
    marginLeft: responsiveWidth(tablet ? 1 : 2),
    fontWeight: '700',
    fontSize: responsiveFontSize(tablet ? 0.75 : 1.5),
  },
});
