import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import rowFormate from '../../../utils/rowFormate';

const SocialStore = () => {
  return (
    <View style={styles.container}>
      {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((item,i) => {
        return <View key={i} style={styles.imgCont}></View>;
      })} */}
      <FlatList
        style={{marginTop: responsiveHeight(2)}}
        showsVerticalScrollIndicator={false}
        data={rowFormate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: responsiveHeight(1),
                justifyContent: 'space-between',
              }}>
              {item.map((it, i) => {
                return (
                  <View style={styles.itemCont}>
                    <View key={i} style={styles.imgCont}></View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: responsiveFontSize(1.8),
                      }}>
                      Riley Boyfriend Straight | Waterfront
                    </Text>
                    <View style={styles.priceCont}>
                      <Text style={styles.originalPrice}>${141.0}</Text>
                      <Text style={styles.afterDiscount}>${141.0}</Text>
                    </View>
                    <Text style={styles.referralFeeStyle}>
                      {3}% Referral Fee
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={() => (
        //   <View
        //     style={{
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       width: responsiveWidth(85),
        //       marginVertical: responsiveFontSize(2),
        //       marginHorizontal: responsiveFontSize(2),
        //     }}>
        //     <Text
        //       style={{
        //         fontSize: responsiveFontSize(tablet ? 1 : 2),
        //         flexWrap: 'wrap',
        //         textAlign: 'center',
        //       }}>
        //       {'No text'}
        //     </Text>
        //   </View>
        // )}
        // ListFooterComponent={() => (
        //   <View style={{height: responsiveFontSize(25), width: '100%'}} />
        // )}
      />
    </View>
  );
};

export default SocialStore;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    marginHorizontal: '4%',
  },
  //   comp
  imgCont: {
    height: responsiveHeight(23),
    // width: '49%',
    borderRadius: responsiveFontSize(1),
    backgroundColor: 'black',
  },
  itemCont: {
    flexDirection: 'column',
    width: '49%',
  },
  priceCont: {flexDirection: 'row', justifyContent: 'flex-start'},
  originalPrice: {
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: '10%',
    fontSize: responsiveFontSize(1.8),
  },
  afterDiscount: {color: 'green', fontSize: responsiveFontSize(1.8)},
  referralFeeStyle: {
    fontSize: responsiveFontSize(1.8),
    color: 'red',
  },
});
