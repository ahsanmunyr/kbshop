import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { FlatList } from 'react-native-gesture-handler';
import deviceInfo from 'react-native-device-info';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';

const tablet = deviceInfo.isTablet();

export default function HotDeal({ data }) {

    const navigation = useNavigation();
    return (
        <View style={styles.main}>
            <View>
                <Text style={styles.text}>Hot Deals</Text>
                <View
                    style={{
                        height: 1,
                        backgroundColor: '#b8b8b8',
                        marginVertical: responsiveFontSize(1),
                        width: responsiveWidth(91),
                        alignSelf: 'center'
                    }}
                ></View>
                <View
                    style={{
                        width: responsiveWidth(91),
                        marginTop: responsiveFontSize(0.5),
                        alignSelf: 'center'
                    }}
                >
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        // data={imagesArray}
                        data={data}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={{ 
                                        marginRight: responsiveFontSize(2),
                                        position:"relative",
                                        width: responsiveWidth(tablet ? 35 : 55),
                                    }}
                                    onPress={()=>{
                                            if (item.brandData.length > 0) {
                                                navigation.navigate('liveEvents', {
                                                    // shopName: item.brandData[0].instagram_username,
                                                    data: {...item.brandData[0],instagram_username:(item.brandData[0]?.instagram_username)?(item.brandData[0]?.instagram_username):item.brandData[0]?.pixel_id},
                                                    target:"Recorded"
                                                  })
                                                // if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                                                // navigation.navigate('viewBioshop', {
                                                //     shopName: item.brandData[0].instagram_username,
                                                // })
                                                // }else{
                                                // navigation.navigate('viewBioshop', {
                                                //     shopName: item.brandData[0].pixel_id,
                                                // })
                                                // } 
                                            }
                                        }}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            width: responsiveWidth(tablet ? 35 : 55),
                                            // backgroundColor:"black",
                                        }}>
                                        <AutoHeightImage
                                            width={responsiveWidth(tablet ? 35 : 55)}
                                            source={{ uri: item?.mobile_url }}
                                            style={{
                                                borderRadius: responsiveFontSize(
                                                    tablet ? 0.75 : 1.25,
                                                ),
                                            }}
                                        />
                                        {/* <Image
                                            source={{uri:item?.mobile_url}}
                                            style={{
                                                borderRadius: responsiveFontSize(1),
                                                height: responsiveFontSize(tablet ? 17 : 11),
                                                width: responsiveWidth(tablet ? 45 : 48),
                                            }}
                                        /> */}
                                    </View>
                                    <Text style={[styles.imgTxt,{marginTop:responsiveFontSize(tablet ? 1.5 : 2.5)}]}>
                                        {item?.title}
                                    </Text>
                                    <Text style={[styles.imgTxt,{marginTop:responsiveFontSize(tablet ? 0.5 : 0.8)}]}>
                                        {item?.description}
                                    </Text>

                                    <View style={[styles.shopNowBtn]} 
                                        // onPress={()=>{
                                        //     if (item.brandData.length > 0) {
                                        //         if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                                        //         navigation.navigate('viewBioshop', {
                                        //             shopName: item.brandData[0].instagram_username,
                                        //         })
                                        //         }else{
                                        //         navigation.navigate('viewBioshop', {
                                        //             shopName: item.brandData[0].pixel_id,
                                        //         })
                                        //         } 
                                        //     }
                                        // }}
                                    >
                                        <Text style={{ color: colors.themeblue,fontSize:responsiveFontSize(tablet ? 1 : 1.6) }}>Shop Now</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}

                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    main: {

        marginTop: responsiveFontSize(1)

    },
    text: {
        // color: 'black',
        // margin: responsiveFontSize(1),
        // paddingLeft: responsiveFontSize(1),
        // fontSize: responsiveFontSize(2),
        // fontWeight: 'bold',
        marginTop: responsiveFontSize(1),
        fontSize: responsiveFontSize(tablet ? 1.25 :2),
        color: 'rgb(7, 13, 46)',
        paddingLeft: responsiveFontSize(2)

    },
    img: {

    },
    imgTxt: {
        color: 'black',
        fontSize: responsiveFontSize(tablet ? 1 : 1.7),
        // marginHorizontal:responsiveFontSize(1),
        // paddingLeft: responsiveFontSize(0.5),
        // marginTop: responsiveFontSize(1),
        // width: responsiveWidth(55),
        fontWeight: '700'
    },
    shopNowBtn: {
        backgroundColor: "white",
        position: "absolute",
        right: "7%",
        top: responsiveHeight(tablet ? 10 : 10.5),
        paddingVertical: responsiveFontSize(tablet ? 0.5 : 0.8),
        paddingHorizontal: responsiveFontSize(tablet ? 1 : 1.5),
        borderRadius: responsiveFontSize(50),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }

})