import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Box from '../../../components/Box'
import { responsiveFontSize,responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import rowFormat from "../../../utils/rowFormate"
import ShareModal from "../../../components/ShareModal"
import * as homeAct from "../../../store/actions/home"
import * as InfluencerAct from "../../../store/actions/influencer"
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import PopularInfluencer from './PopularInfluencer'
import NotFound from '../../../components/NotFound'
import { useDispatch } from 'react-redux'
import Loader from '../../../components/Loader'
import colors from '../../../assets/colors/colors'
import deviceInfo from "react-native-device-info"
import SortModal from '../../../components/SortModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tablet=deviceInfo.isTablet()

const ALPHA = ["all", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


function Influencers({ allInfluencers, getAllInfluencers, popularInfluencer, getPopular }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const [currentData, setCurrentData] = useState({})
  const [shareModal, setShareModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [infLoading, setInfLoading] = useState(false);
  const [alpha, setAlpha] = useState('all');
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    Promise.all([
      getPopular("influencer", 1),
      getAllInfluencers(1),
    ]).then(() => {
      setLoading(false)
    })
    return () => {
      setLoading(true)
      // console.log("clearInfluencer")
      dispatch({ type: "clearPopularInfluencers" })
      dispatch({ type: "clearAllInfluencer" })
    }
  }, [navigation])

  const sortFunction = (sort) => {
    console.log("Sort", sort)
    dispatch({ type: "clearAllInfluencer" })
    // getAllBrands(1, item).then(() => {
    //   setBrandLoading(false);
    // });
    // dispatch({type: 'clearAllBrands'});
    // if(sort == 'all'){
    //   getAllInfluencers(1)
    // }else{
      getAllInfluencers(1, null, sort)
    // }
  }


  function renderBox({ item, index }) {
    if (index == 0) {
      return (
        <>
          <View style={styles.headCon}>
            <Text style={styles.text}>Popular Influencers</Text>
            <View style={styles.line} />
          </View>
          <View style={{width:responsiveWidth(94), alignSelf:'center'}}>
          <PopularInfluencer
            influencer={popularInfluencer}
            getAllInfluencers={getPopular}
          />
          </View>
          <View style={styles.headCon}>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
           <View><Text style={styles.text}>All Influencers</Text></View>
           <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(tablet ? 1.25 : 1.6),
                      color: colors.themeblue,
                    }}>
                    Sort
                  </Text>
                  <Ionicons
                    style={{
                      top: 1.5,
                    }}
                    name="chevron-down"
                    size={responsiveFontSize(tablet ? 1.5 : 2)}
                    color={false ? '#000000' : colors.themeblue}
                  />
                </View>
              </TouchableOpacity>
          </View>
            <View style={styles.line} />
            <FlatList
              data={ALPHA}
              contentContainerStyle={{ marginBottom: responsiveHeight(0.5) }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setInfLoading(true);
                      setAlpha(item);
                      dispatch({ type: 'clearAllInfluencer' });
                      getAllInfluencers(1, item).then(() => {
                        setInfLoading(false);
                      });
                    }}
                    style={{
                      backgroundColor:
                        item == alpha ? colors.themeblue : 'white',
                        marginHorizontal: responsiveFontSize(tablet?0.35:0.7),
                        paddingHorizontal: responsiveFontSize(tablet?1.1:2.2),
                        paddingVertical: responsiveHeight(tablet?0.6:1.1),
                        borderRadius: responsiveFontSize(tablet?1:2),
                    }}
                    key={item}>
                    <Text
                      style={{
                        color: item == alpha ? 'white' : colors.themeblue,
                        fontSize: responsiveFontSize(tablet?1:1.9),
                      }}>
                      {item?.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, i) => i.toString()}
            />
            {rowFormat(allInfluencers.data, tablet?5:1).length == 1 &&
              item[tablet?4:0]?._id != 'notFound' ? (
              <View style={{ height: responsiveHeight(15) }}>
                <Loader />
              </View>
            ) : null}
            {rowFormat(allInfluencers.data, tablet?5:1).length == 1 &&
              item[tablet?4:0]?._id == 'notFound' ? (
              <View style={{ height: responsiveHeight(15) }}>
                <NotFound text={"No Influencer Found"}/>
              </View>
            ) : null}
          </View>
        </>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row', left: 10, margin: 5  }}>
          {
            item.map((it, i) => {
              return (
                <Box
                  call={() => {
                    // setCurrentData(it)
                    // setShareModal(true)
                  navigation.navigate('viewBioshop', {shopName: it.instagram_username});

                  }}
                  boxWidth={responsiveWidth(100)-responsiveFontSize(1)}
                  key={it._id}
                  ImagePassStyle={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  backgroundColor:'white',
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  borderRadius: responsiveFontSize(0.8),
                  // left: 5
            
                }}
                  name={it.name}
                  influencer={true}
                  img={it.profile_image_url ? { uri: it.profile_image_url } : require('../../../assets/user.png')}
                />
              )
            })
          }
        </View>
      )
    }
  }

  function renderFooter() {
    return (
      <>
        {(tablet?(allInfluencers.count +3):(allInfluencers.count +1))> allInfluencers.data.length ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if (allInfluencers.count > allInfluencers.data.length) {
      getAllInfluencers(allInfluencers.pagination?.next?.page)
    }
  }, [allInfluencers.pagination?.next?.page])

  if (!loading) {
    return (
      <View style={{ flex: 1 }}>
        <ShareModal
          visible={shareModal}
          closeModle={() => setShareModal(false)}
          data={{
            image: currentData.profile_image_url,
            name: currentData.instagram_username,
            _id: currentData._id
          }}
          setShop={(name) => navigation.navigate('viewBioshop', { shopName: name })}
        />
        <FlatList
          data={rowFormat(allInfluencers.data, tablet?5:1)}
          renderItem={renderBox}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          ListEmptyComponent={<NotFound text={"No Influencer Found"}/>}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => item[0]._id}
        />
          <SortModal
            visible={modalVisible}
            closeModle={() => setModalVisible(false)}
            sortType='influencers'
            id={null}
            func={sortFunction}
            infl={true}
         />
      </View>
    )
  } else {
    return <Loader />
  }
}
function mapStateToProps({ allInfluencers, popularInfluencer }) {
  return { allInfluencers, popularInfluencer }
}

export default connect(mapStateToProps, { ...homeAct, ...InfluencerAct })(Influencers)
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
    width: responsiveWidth(93),
    alignSelf:'center'
  },
  text: {
    fontSize: responsiveFontSize(tablet?1.25:2),
    color: 'rgb(7, 13, 46)'
  },
  headCon: {
    marginTop: responsiveFontSize(2),
    paddingHorizontal: responsiveFontSize(1)
  }
})