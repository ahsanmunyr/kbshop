import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/myPost';
import { connect } from 'react-redux';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ShopComponent from './shopComponent';
import rowFormate from '../../../utils/rowFormate';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';
import colors from '../../../assets/colors/colors';

const { height, width } = Dimensions.get('window');
const MyPost = ({ getPosts, getPostReducer, getPostShopReducer, getPostShop }) => {
  const [loading, setLoading]=useState(true)
  useEffect(() => {
    setLoading(true)
    Promise.all([getPosts(),getPostShop()])
    .then(()=>setLoading(false))
  }, []);

  function renderItem({ item, index }) {
    return (
      <View style={{...styles.item,justifyContent:item.length==2?"space-evenly":"flex-start",marginLeft:item.length!=2?responsiveFontSize(0.6):0}} key={item[0].id}>
        {item.map((it, i) => {
          return (
            <ShopComponent
              key={it.id}
              Images={it.media_url}
              Impressions={it.insights[1].impressions}
              Reach={it.insights[2].reach}
              Engagement={it.insights[0].engagement}
              Like={it.like_count}
              Comment={it.comments_count}
              Content={it.caption || null}
              Date={it.timestamp}
              ReDirectLink={it.permalink}
              MediaType={it.media_type}
            />
          );
        })}
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.main}>
        <View
          style={{
            // height: responsiveHeight(50),
            width: responsiveWidth(100),
            justifyContent: 'center',

            alignItems: 'center',
          }}>
          <View style={styles.underMain}>
            {getPostShopReducer?.message?.profile_picture_url ? (
              <Image

                style={{ backgroundColor: 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: 100 }}
                source={{ uri: getPostShopReducer?.message?.profile_picture_url }}
              />
            ) : (
              <Image

                style={{ backgroundColor: 'white', width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: 100 }}
                source={require('../../../assets/user.png')}
              />
            )}
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'column',
                height: responsiveHeight(10),
                // width: responsiveWidth(50),
              }}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: responsiveWidth(50),
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: '700',
                    color: '#010b40',
                  }}>
                  {getPostShopReducer?.message?.name}

                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: responsiveWidth(50),
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    fontWeight: '700',
                    color: '#010b40',
                  }}>
                  Biography:
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    width: responsiveWidth(38),
                  }}>
                  {getPostShopReducer?.message?.bio}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: responsiveWidth(50),
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    fontWeight: '700',
                    color: '#010b40',
                  }}>
                  Website:
                </Text>
                <Text
                  onPress={() => Linking.openURL(getPostShopReducer?.message?.website)}
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    width: responsiveWidth(38),
                    color: 'blue',
                  }}> {getPostShopReducer?.message?.website.length > 20 ? getPostShopReducer?.message?.website.slice(0, 20) + "..." : getPostShopReducer?.message?.website}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.post,backgroundColor:colors.themeblue}}>
            <View style={styles.underPost}>
              <View style={styles.underPostChild}>
                <Text
                  style={{ fontSize:responsiveFontSize(2), fontWeight: '400', color: 'white' }}>
                  {getPostShopReducer?.message?.media_count}
                </Text>
                <Text
                  style={{
                    fontSize:responsiveFontSize(1.5),
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  Posts
                </Text>
              </View>
              <View style={styles.underPostChild}>
                <Text
                  style={{ fontSize:responsiveFontSize(2), fontWeight: '400', color: 'white' }}>
                  {getPostShopReducer?.message?.followers_count}
                </Text>
                <Text
                  style={{
                    fontSize:responsiveFontSize(1.5),
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  Followers
                </Text>
              </View>
              <View style={styles.underPostChild}>
                <Text
                  style={{ fontSize:responsiveFontSize(2), fontWeight: '400', color: 'white' }}>
                  {getPostShopReducer?.message?.follows_count}
                </Text>
                <Text
                  style={{
                    fontSize:responsiveFontSize(1.5),
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  Following
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  
  if(!loading){
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={rowFormate(getPostReducer.message.data, 2)}
          ListHeaderComponent={renderHeader()}
          key={'-'}
          ListHeaderComponentStyle={{
            width: responsiveWidth(100),
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom:responsiveFontSize(4),
          }}
          ListEmptyComponent={<NotFound/>}
          contentContainerStyle={{ width: responsiveWidth(100), alignItems: 'flex-start', }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return item[0].id;
          }}
        />
      </SafeAreaView>
    );
  }else{
    return <Loader/>
  }
};

function mapStateToProps({ getPostReducer, getPostShopReducer }) {
  return { getPostReducer, getPostShopReducer };
}

export default connect(mapStateToProps, actions)(MyPost);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  post: {
    borderRadius: responsiveFontSize(2.1),
    width: responsiveWidth(85),
    height: responsiveHeight(8),
    alignSelf: 'center',
    backgroundColor: 'white',
    top: responsiveHeight(4),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  underPost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    alignSelf: 'center',
  },
  underPostChild: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: responsiveHeight(5.5),
    width: responsiveWidth(20),
  },
  logo: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  main: {
    width: responsiveWidth(95),
    padding: responsiveFontSize(1),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveFontSize(2.1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  underMain: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    top: 10,
  },
  item:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    // marginVertical:responsiveFontSize(1.)
  }
});
