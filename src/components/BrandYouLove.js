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

export default function BrandYouLove({data,cat}) {

    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <View style={{marginLeft:responsiveFontSize(0)}}>
                <Text style={styles.text}>Brands You'll Love</Text>

                <View style={{width: responsiveWidth(92),alignSelf:"center"}}>
                    <FlatList
                        horizontal={true}
                        // data={imagesArray}
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={()=>{
                                        if (item.brandData.length > 0) {
                                            navigation.navigate('liveEvents', {
                                                // shopName: item.brandData[0].instagram_username,
                                                data: {...item.brandData[0],instagram_username:(item.brandData[0]?.instagram_username)?(item.brandData[0]?.instagram_username):item.brandData[0]?.pixel_id},
                                                target:"Recorded"
                                              })
                                            // if(cat){
                                            //     if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                                            //         navigation.navigate('viewBioshop', {
                                            //             // ...currentData,
                                            //             shopName: item.brandData[0].instagram_username,
                                            //             categoryName: cat.category_name,
                                            //             categoryId: item.hasOwnProperty("userParentCategoryData") ? item?.userParentCategoryData[0]?._id :  item?.categoryData[0]?._id,
                                            //             type: 'other',
                                            //             childId:item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?._id : null,
                                            //             childname:item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?.category_name : null
                                            //         });
                                            //     }else{
                                            //         navigation.navigate('viewBioshop', {
                                            //             // ...currentData,
                                            //             shopName: item.brandData[0].pixel_id,
                                            //             categoryName: cat.category_name,
                                            //             categoryId: item.hasOwnProperty("userParentCategoryData") ? item?.userParentCategoryData[0]?._id :  item?.categoryData[0]?._id,
                                            //             type: 'other',
                                            //             childId:item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?._id : null,
                                            //             childname:item.hasOwnProperty("subCategoryData") ? item?.subCategoryData[0]?.category_name : null
                                            //         });
                                            //     }
                                            // }else{
                                            //     if (item.brandData[0].hasOwnProperty("instagram_username") && item.brandData[0].instagram_username !== "") {
                                            //         navigation.navigate('viewBioshop', {
                                            //              shopName: item.brandData[0].instagram_username,
                                            //          })
                                            //  }else{
                                            //            navigation.navigate('viewBioshop', {
                                            //              shopName: item.brandData[0].pixel_id,
                                            //             })
                                            //  }
                                            // }
                                        }
                                    }}
                                    style={{
                                        // marginVertical: responsiveFontSize(1),
                                        marginBottom: responsiveFontSize(1),
                                        // paddingLeft: responsiveFontSize(1.2),
                                        width: responsiveWidth(tablet ? 35 : 60),
                                        position:"relative",
                                        marginRight: responsiveWidth(tablet ? 2 : 4.8),
                                    }}>
                                        <AutoHeightImage
                                          width={responsiveWidth(tablet ? 35 : 60)}
                                          source={{uri: item?.mobile_url}}
                                          style={{
                                            borderRadius: responsiveFontSize(
                                              tablet ? 0.75 : 1.25,
                                            ),
                                          }}
                                        />
                                            <Image source={{uri: item?.logo_url}}
                                                style={{
                                                    width:tablet ? 35 : 45,
                                                    height:tablet ? 35 : 45,
                                                    borderRadius: responsiveFontSize(50),
                                                    position:"absolute",
                                                    top:responsiveHeight(tablet ? 7 : 8.5),
                                                    left:"8%",
                                                }}  
                                            />
                                    {/* <Image
                                        source={{uri:item?.mobile_url}}
                                        style={{
                                            height: responsiveFontSize(tablet ? 17 : 17),
                                            width: responsiveWidth(tablet ? 45 : 60),
                                            borderRadius: responsiveFontSize(tablet ? 0.75 : 1.25),
                                        }}
                                    /> */}
                                    <Text style={[styles.imgTxt,{marginTop:responsiveFontSize(tablet ? 1.5 : 2.5)}]}>
                                        {item?.title}
                                    </Text>
                                    <Text style={[styles.imgTxt,{marginTop:responsiveFontSize(tablet ? 0.5 : 1)}]}>{item?.description}</Text>
                                    <View style={[styles.shopNowBtn]}>
                                        <Text style={{color:colors.themeblue,fontSize:responsiveFontSize(tablet ? 1 : 1.6)}}>Shop Now</Text>
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
      
        backgroundColor: colors.themeblue

    },
    text: {
        color: 'white',
        marginVertical: responsiveFontSize(1),
        marginLeft:responsiveFontSize(1),
        fontSize: responsiveFontSize(tablet ? 1.25 : 2),
        fontWeight: 'bold',
        paddingLeft: responsiveFontSize(1.2),
    },
    img: {

    },
    imgTxt: {
        color: 'white',
        fontSize: responsiveFontSize(tablet ? 1 : 1.7),
        //paddingLeft: responsiveFontSize(0),
        // marginTop: responsiveFontSize(1),
        // width: responsiveWidth(55),
        fontWeight: '700'
    },
    shopNowBtn:{
        backgroundColor:"white",
        position:"absolute",
        right:"5%",
        top:responsiveHeight(tablet ? 9.5 : 13),
        paddingVertical:responsiveFontSize(tablet ? 0.5 : 0.8),
        paddingHorizontal:responsiveFontSize(tablet ? 1 : 1.5),
        borderRadius: responsiveFontSize(50)
    }

})