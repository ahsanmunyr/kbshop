import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as brandAct from "../../../store/actions/brand"
import Box from '../../../components/Box'
import Loader from '../../../components/Loader'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import NotFound from '../../../components/NotFound'
import rowFormate from '../../../utils/rowFormate'
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

function UserBrand({ userBrand, getUserBrands, navigation,setActive,reset4,active }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        console.log("call")
        getUserBrands()
            .then(() => setLoading(false))
            const unsubscribe = navigation.addListener('focus', () => {
                setActive(2)
                setLoading(true)
                getUserBrands()
                    .then(() => setLoading(false))
              });
          
              return unsubscribe;
    }, [navigation,reset4,active])


    function renderBox({ item, index }) {
        return (
            <View style={{ flexDirection: 'row' }}>
                {item.map((it, i) => {
                    // console.log(it.profile_image_url,"IMAG=E")
                    return (
                        <Box
                            call={() => navigation.push('campaigns', { id: it.brand_id, name: it.brand_name, image:it.profile_image_url  })}
                            key={it.brand_id}
                            name={it.brand_name}
                            dis={it.website_discount}
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
                                left: 5
                            
                                }}
                            boxWidth={responsiveWidth(tablet
                                ? item.length == 1
                                  ? 96
                                  : item.length == 2
                                  ? 48
                                  : 32
                                : 96,)-responsiveFontSize(1)}
                            img={
                                it.profile_image_url
                                    ? { uri: it.profile_image_url }
                                    : require('../../../assets/user.png')
                            }
                            // influencer={true}
                        />
                    );
                })}
            </View>
        );
    }
    if (!loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headCon1}>
                    <Text style={styles.text1}>My Brands</Text>
                    <View style={styles.line1} />
                </View>
                <FlatList
                    data={rowFormate(userBrand, tablet?5:1)}
                    renderItem={renderBox}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<NotFound text={"No brand available at this time. Please check back later"}/>}
                    keyExtractor={(item, i) => item[0].brand_id}
                />
            </View>
        )
    } else {
        return <Loader />
    }
}

function mapStateToProps({ userBrand }) {
    return { userBrand }
}
export default connect(mapStateToProps, brandAct)(UserBrand)
const styles = StyleSheet.create({
    btnText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#b8b8b8',
        marginVertical: responsiveFontSize(1),
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: 'rgb(7, 13, 46)',
    },
    headCon: {
        marginTop: responsiveFontSize(2),
        paddingHorizontal: responsiveFontSize(1),
    },
    line1: {
        height: 1,
        backgroundColor: '#b8b8b8',
        marginVertical: responsiveFontSize(1)
    },
    text1: {
        fontSize: responsiveFontSize(tablet?1.25:2),
        color: 'rgb(7, 13, 46)'
    },
    headCon1: {
        // marginTop: responsiveFontSize(2),
        paddingHorizontal: responsiveFontSize(1)
    }
})