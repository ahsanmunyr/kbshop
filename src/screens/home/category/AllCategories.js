import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import rowFormat from "../../../utils/rowFormate"
import * as catAct from "../../../store/actions/category"
import * as homeAct from "../../../store/actions/home"
import ShareModal from "../../../components/ShareModal"
import { useNavigation } from '@react-navigation/native'
import Categories from './Categories'
import NotFound from '../../../components/NotFound'
import Loader from '../../../components/Loader'
import { useDispatch } from 'react-redux'
import deviceInfo from "react-native-device-info"
// import { Shadow } from 'react-native-neomorph-shadows';
import colors from '../../../assets/colors/colors'

const tablet = deviceInfo.isTablet()

function AllCategories({ categories, popularCategories, getPopular, getCategories, influencer }) {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoading(true)
        Promise.all([
            getCategories(),
            getPopular("category", 1)
        ]).then(() => {
            setLoading(false)
        })
        return () => {
            setLoading(true)
            dispatch({ type: "clearPopularCategories" })
            dispatch({ type: "clearAllCategories" })
        }
    }, [navigation])

    function renderItems(item) {
        return(
            <View style={{flexDirection:'row',justifyContent: tablet ? "flex-start" :'space-between',width:'92%',alignSelf:'center',marginBottom:responsiveWidth(tablet?1.6:4)}}>
            {
                item.map((it, i) => {
                    return (
                            <TouchableOpacity
                                key={it._id}
                                onPress={() => navigation.navigate('categoryDetail', { ...it, influencer })}
                                style={[styles.catCon,tablet && {marginLeft: i % 4 === 0 ? 0 : "1.5%"}]}
                                >
                                <ImageBackground
                                imageStyle={{borderRadius:responsiveFontSize(0.5)}}
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
                    )
                })
            }
        </View>
        )
    }
    function renderCategory({ item, index }) {
        if (index == 0) {
            return (
                <>
                    <View style={styles.headCon1}>
                        <Text style={styles.text1}>Popular Categories</Text>
                        <View style={styles.line1} />
                    </View>
                    <Categories
                        influencer={influencer}
                        categories={popularCategories}
                        getPopularCategories={getPopular}
                    />
                    <View style={styles.headCon1}>
                        <Text style={styles.text1}>All Categories</Text>
                        <View style={styles.line1} />
                    </View>
                    <>
                        {renderItems(item)}
                    </>
                </>
            )
        } else {
            return (
                <>
                    {renderItems(item)}
                </>
            )
        }
    }

    if (!loading) {

        return (
            <View style={{ flex: 1, backgroundColor:'white'}}>
                <FlatList
                    data={rowFormat(categories, tablet ? 4 : 2)}
                    renderItem={renderCategory}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{height:responsiveFontSize(10)}} />}
                    keyExtractor={(item, i) => item[0]._id}
                    ListEmptyComponent={<NotFound text={"No Category Found"} />}
                />
            </View>
        )
    } else {
        return <Loader />
    }
}

function mapStateToProps({ categories, popularCategories }) {
    return { categories, popularCategories }
}

export default connect(mapStateToProps, { ...catAct, ...homeAct })(AllCategories)

const styles = StyleSheet.create({
    img: {
        width: responsiveWidth(tablet ? 22 : 44),
        height: responsiveFontSize(tablet ? 5 : 10)
    },
    catCon: {
        // shadowColor: '#000',
        //           shadowOffset: {
        //             width: 0,
        //             height: 2,
        //           },
        //           backgroundColor: 'white',
        //           shadowOpacity: 0.25,
        //           shadowRadius: 3.84,
        //           elevation: 5,
        borderWidth:1,
        borderColor:"#ccc",
                  borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   borderRadius: responsiveFontSize(tablet?0.25:0.5)
    },
    text: {
        position:'absolute',
        zIndex:3,
        bottom:responsiveFontSize(0.25),
        left:responsiveFontSize(tablet?0.5:0.75),
        fontSize: responsiveFontSize(tablet ? 0.9 : 1.75),
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
        fontSize: responsiveFontSize(tablet ? 1.25 : 2),
        color: 'rgb(7, 13, 46)'
    },
    headCon1: {
        paddingHorizontal: responsiveFontSize(2.1)
    }
})