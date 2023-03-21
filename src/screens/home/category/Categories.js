import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NotFound from '../../../components/NotFound'
import deviceInfo from "react-native-device-info"
// import { Shadow } from 'react-native-neomorph-shadows';
import colors from '../../../assets/colors/colors'
import rowFormate from '../../../utils/rowFormate'

const tablet = deviceInfo.isTablet()



function Categories({ categories, getPopularCategories,influencer }) {
  const navigation = useNavigation()
  const [boxLayout, setBoxLayout] = useState({})
  function renderCategory({ item, index }) {
    return (
      <View>
        {
          item.map((item, i) => {
            return (
              <View key={i} style={{ width: responsiveWidth(tablet?43/2:41.7) }}>
                <TouchableOpacity
                  onLayout={(e) => setBoxLayout(e.nativeEvent.layout)}
                  onPress={() => navigation.navigate('categoryDetail', {...item,influencer,})}
                  style={{...styles.catCon,alignItems:index==0?'flex-start':'center'}}>
                  <ImageBackground
                    imageStyle={{ borderRadius: responsiveFontSize(0.5),borderWidth:1,
                      borderColor:"#ccc", }}
                    style={styles.img} source={{ uri: item.image_url }}
                  >
                    {/* <Shadow
                      inner={true}
                      style={{
                        borderRadius: responsiveFontSize(tablet?0.25:0.5),
                        shadowOffset: { width: 50, height: -15 },
                        shadowOpacity: 0.5,
                        shadowColor: "black",
                        shadowRadius: 30,
                        width: responsiveWidth(tablet ? 20 : 40),
                        height: responsiveFontSize(tablet ? 5 : 10)
                      }}
                    > */}
                      {/* <Text style={styles.text}>{item.category_name}</Text> */}
                    {/* </Shadow> */}

                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )
  }

  function renderFooter() {
    return (
      <>
        {categories.count > categories.data.length ? (
          <View style={{ ...styles.footer, height: boxLayout.height }}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if (categories.count > categories.data.length) {
      getPopularCategories("category", categories.pagination?.next?.page)
    }
  }, [])

  return (
    <View style={{width:'92%',alignSelf:'center'}}>
      <FlatList
        data={rowFormate(categories.data,2)}
        renderItem={renderCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => i.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<NotFound text={"No Category Found"} />}

      />
    </View>
  )
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, null)(Categories)

const styles = StyleSheet.create({
  img: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // backgroundColor: 'white',
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // borderWidth:1,
    // borderColor:"black",
    borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
    
    width: responsiveWidth(tablet ? 20 : 40),
    height: responsiveFontSize(tablet ? 5 : 10)
  },
  catCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveWidth(tablet?1.6:4),
    borderRadius: responsiveFontSize(tablet?0.25:0.5),
    // backgroundColor:'red'
  },
  text: {
    position: 'absolute',
    zIndex: 3,
    bottom: responsiveFontSize(0.25),
    left: responsiveFontSize(0.75),
    fontSize: responsiveFontSize(tablet ? 0.9 : 1.75),
    color: 'white',
    fontWeight: '800'

  },
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