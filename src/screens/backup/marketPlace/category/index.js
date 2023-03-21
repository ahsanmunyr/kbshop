import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize ,responsiveWidth} from 'react-native-responsive-dimensions'
import Loader from '../../../components/Loader'
import { connect } from 'react-redux'
import NotFound from '../../../components/NotFound'
import * as catAct from "../../../store/actions/category"
import rowFormate from '../../../utils/rowFormate'
import deviceInfo from "react-native-device-info"
// import { Shadow } from 'react-native-neomorph-shadows';

const tablet=deviceInfo.isTablet()

function Category({ navigation, authRed, seletedCategories, getSelectedCategories }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getSelectedCategories(authRed.data._id)
            .then(() => setLoading(false))
    }, [])

    function renderItems(item) {
        return item.map((it, i) => {
            return (
                <View key={i} style={{ width: responsiveWidth(tablet?24:48)}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('categeryBrands', { id: it.parent_id, category_name: it.category_name,category_id:it.category_id })}
                        style={styles.catCon}>
                        <ImageBackground
                        imageStyle={{borderRadius:responsiveFontSize(0.5),borderWidth:1,
                            borderColor:"#ccc",}}
                            style={styles.img} source={{ uri: it.image_url }}
                        >
                            {/* <Shadow
                                inner={true}
                                style={{
                                            borderRadius: responsiveFontSize(tablet?0.25:0.5),
                                            shadowOffset: { width: 50, height: -15 },
                                            shadowOpacity: 0.5,
                                            shadowColor: "black",
                                            shadowRadius: 30,
                                            width: responsiveWidth(tablet ?22 : 44),
                                            height: responsiveFontSize(tablet ? 5 : 10)
                                }}
                            > */}
                                {/* <Text style={styles.text}>{it.category_name}</Text> */}
                            {/* </Shadow> */}

                        </ImageBackground>
                    </TouchableOpacity>
                </View>)
        })
    }
    function renderCategory({ item, index }) {

        return (
            <View key={index} style={{ flexDirection: 'row' }}>
                {renderItems(item)}
            </View>
        )
    }

    console.log(seletedCategories)

    if (!loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headCon1}>
                    <Text style={styles.text1}>My Categories</Text>
                    <View style={styles.line1} />
                </View>
                <FlatList
                    data={rowFormate(seletedCategories, tablet?4:2)}
                    renderItem={renderCategory}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, i) => item[0].category_id}
                    ListEmptyComponent={<NotFound text={"No Category Found"}/>}
                />
            </View>
        )
    } else {
        return <Loader />
    }
}

function mapStateToProps({ authRed, seletedCategories }) {
    return { authRed, seletedCategories }
}
export default connect(mapStateToProps, catAct)(Category)

const styles = StyleSheet.create({
    img: {
        width: responsiveWidth(tablet ? 22 : 44),
        height: responsiveFontSize(tablet ? 5 : 10),
        // borderWidth:1,
        // borderColor:"#ccc",
        borderRadius: responsiveFontSize(0.5)
    },
    catCon: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        marginBottom: responsiveWidth(3),
        borderRadius: responsiveFontSize(0.5)
    },
    text: {
        position:'absolute',
        zIndex:3,
        bottom:responsiveFontSize(0.25),
        left:responsiveFontSize(0.75),
        fontSize: responsiveFontSize(tablet ? 0.75 : 1.75),
        color: 'white',
        fontWeight: '800'

    },
    line: {
        height: 1,
        backgroundColor: '#b8b8b8',
        marginVertical: responsiveFontSize(1)
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
        paddingHorizontal: responsiveFontSize(tablet?1:1.25)
    }
})