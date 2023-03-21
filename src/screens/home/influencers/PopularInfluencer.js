import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import Box from '../../../components/Box'
import ShareModal from "../../../components/ShareModal"
import { useNavigation } from '@react-navigation/native'
import NotFound from '../../../components/NotFound'

function PopuplarBrands({ influencer, getAllInfluencers }) {

  const navigation=useNavigation()
  const [boxLayout, setBoxLayout] = useState({})
  const [currentData, setCurrentData] = useState({})
  const [shareModal, setShareModal] = useState(false)

  function renderInfluencer({ item, index }) {
    return (
      <Box
        call={() => {
          // setCurrentData(item)
          // setShareModal(true)
          navigation.navigate('viewBioshop', {shopName: item.instagram_username,});

        }}
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
                  marginVertical: 10,
               
                }}
                passStyle={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  backgroundColor: 'white',
                  height: responsiveWidth(28),
                  width: responsiveWidth(65),
                  alignItems:'center',
                  justifyContent:'flex-start',
                  borderRadius: 7,
                  paddingLeft: 12,
                  marginLeft: 2,
                  // left: 10,
                  margin: 10
                }}
        getLayout={(e) => setBoxLayout(e)}
        name={item.instagram_username}
        img={item.profile_image_url ? { uri: item.profile_image_url } : require('../../../assets/user.png')}
        influencer={true}
      />
    )
  }

  function renderFooter() {
    return (
      <>
        {influencer.count > influencer.data.length ? (
          <View style={{ ...styles.footer, height: boxLayout.height }}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  const loadMore=useCallback(()=>{
    if (influencer.count > influencer.data.length) {
      getAllInfluencers("influencer", influencer.pagination?.next?.page)
    }
  },[influencer.pagination?.next?.page])

  return (
    <View>
      <ShareModal
        visible={shareModal}
        closeModle={() => setShareModal(false)}
        data={{
          image: currentData.profile_image_url,
          name: currentData.instagram_username,
          _id: currentData._id
        }}
        setShop={(name)=>navigation.navigate('viewBioshop',{shopName:name})}
      />
      <FlatList
        data={influencer.data}
        renderItem={renderInfluencer}
        horizontal={true}
        decelerationRate={0.5}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => i.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        ListEmptyComponent={<NotFound text={"No Popular Influencer Found"}/>}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, null)(PopuplarBrands)

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
})