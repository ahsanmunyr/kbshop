import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import * as catAct from "../../../store/actions/category"
import BackIcon from "react-native-vector-icons/Ionicons"
import { connect, useDispatch } from 'react-redux'
import * as homeAct from "../../../store/actions/home"
import React, { useEffect, useState } from 'react'
import BrandInfluencerList from './BrandInfluencerList'
import Loader from '../../../components/Loader'
import BioShop from '../bioshop/BioShop'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import deviceInfo from "react-native-device-info"
import { FlatList } from 'react-native-gesture-handler'
// import { Shadow } from 'react-native-neomorph-shadows';
import * as bannersCoversAct from '../../../store/actions/bannersCoversAct';
import * as subCategoryAct from '../../../store/actions/subCategoryAct';
import * as categoryBannerAct from '../../../store/actions/categoryBannerAct';
import * as categoryFeaturedAct from '../../../store/actions/categoryFeaturedAct';
import * as categoryBrandYouLoveAct from '../../../store/actions/categoryBrandYouLoveAct';

import colors from '../../../assets/colors/colors'
import BrandFilterModal from '../../../components/BrandFilterModal'

const tablet = deviceInfo.isTablet()


function BrandInfluencers({ dataP, filter1, onChangeFilter1, hotDealRed, getHotDealsCovers, getBrandInfluencers, brandInfluencers, navigation, popularBrands, getPopular, popularInfluencer, brandYouLoveRed, categoryBrandsYouLoveRed, getBrandYouLoveCovers, getCategoryBrandsYouLove, getBannersCovers, getCategoryBanners, bannerCoversRed, categoryBannersRed, getFeaturedCovers, getCategoryFeatured, featuredBrandsRed, categoryFeaturedRed, getSubCategories, subCategoryRed }) {
    const [loading, setLoading] = useState(true)
    const [shopName, setShopName] = useState("")
    const [viewDetail, setViewDetail] = useState(false)
    const [isApiCalled, setIsApiCalled] = useState(false)
    const [subCatName, setSubCatName] = useState("")
    const [ids, onChangeIds] = useState([]);
    const [catName, setCatName] = useState([]);

    const [showSelectedEventTypesEvent, setShowSelectedEventTypesEvent] =
        useState({ eventType: '', filterBy: '', catID: [] });


    const filterByEventType = (type, cat, filterBy) => {
        setShowSelectedEventTypesEvent({
            ...showSelectedEventTypesEvent,
            eventType: type,
            catID: [...cat],
            filterBy
        });
    };
    const dispatch = useDispatch()
    useEffect(() => {
        if (categoryBrandsYouLoveRed.length == 0 && categoryFeaturedRed.length == 0 && brandInfluencers?.data.length == 0 && hotDealRed.length == 0) {
            setLoading(true)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        Promise.all([
            getBrandInfluencers(1, dataP._id, null, (dataP.influencer ? 'influencer' : 'brand')),
            // getPopular((dataP.influencer ? 'influencer' : 'brand'), 1, dataP._id),
            getCategoryBrandsYouLove(dataP._id, 'category'),
            getCategoryBanners(dataP._id, 'category'),
            getCategoryFeatured(dataP._id, 'category'),
            // getSubCategories(dataP),
            getHotDealsCovers()
        ])
            .then(() => { setLoading(false); })
        return () => {
            dispatch({ type: "clearBrandInfluencers" })
            dispatch({ type: "clearFeaturedBrands" })
            dispatch({ type: "CLEAR_SUB_CATGORIES" })
            setSubCatName("")
        }
    }, [])

    useEffect(() => {
        if (ids.length > 0) {
            dispatch({ type: 'clearBrandInfluencers' });
            setLoading(true)
            Promise.all([
                getBrandInfluencers(1, ids[0], null, (dataP.influencer ? 'influencer' : 'brand')),
                // getPopular((dataP.influencer ? 'influencer' : 'brand'), 1, ids[0]),
                getCategoryBrandsYouLove(ids[0], 'category'),
                getCategoryBanners(ids[0], 'category'),
                getCategoryFeatured(ids[0], 'category'),
                // getSubCategories({...dataP,_id:ids[0]}),
                getHotDealsCovers()
            ])
            .then(() => { setLoading(false); })
        }
    }, [ids])

    useEffect(() => {
        setSubCatName(subCategoryRed[0]?.category_name)
    }, [subCategoryRed])

    const sort = (sort) => {
        dispatch({ type: "clearBrandInfluencers" })
        if (sort == 'all') {
            getBrandInfluencers(1, dataP._id, null, (dataP.influencer ? 'influencer' : 'brand'))
        } else {
            getBrandInfluencers(1, dataP._id, null, ((dataP.influencer ? 'influencer' : 'brand')), sort)
        }
    }

    function renderItem({ item }) {
        return (
            <View key={item._id} style={{ width: responsiveWidth(tablet ? 22.5 : 37.5), marginLeft: 0, paddingLeft: 0, marginRight: 8 }}>
                <TouchableOpacity
                    onPress={() => {
                        setIsApiCalled(true);
                        setSubCatName(item?.category_name)
                        dispatch({ type: "CLEAR_CATEGORY_BANNERS" })
                        dispatch({ type: "CLEAR_CATEGORY_BRANDS_YOU_LOVE" })
                        dispatch({ type: "CLEAR_CATEGORY_FEATURED" })
                        item.category_name.includes("All") ? Promise.all([
                            getCategoryBanners(dataP._id, 'category'),
                            getCategoryBrandsYouLove(dataP._id, 'category'),
                            getCategoryFeatured(dataP._id, 'category'),
                        ]).then(() => { setIsApiCalled(false) }) :
                            Promise.all([
                                getCategoryBanners(item._id, 'subcategory'),
                                getCategoryBrandsYouLove(item._id, 'subcategory'),
                                getCategoryFeatured(item._id, 'subcategory')
                            ]).then(() => { setIsApiCalled(false) })
                    }}
                    style={[styles.catCon, subCatName === item?.category_name && { borderColor: colors.themeblue, borderWidth: 1 }]}>
                    <ImageBackground
                        imageStyle={{
                            borderRadius: responsiveFontSize(0.5), backgroundColor: 'gray', borderWidth: 1,
                            borderColor: "#ccc",
                        }}
                        style={styles.img}
                        source={{ uri: item?.image_url }}
                    >
                        {/* <Shadow
                            inner={true}
                            style={{
                                borderRadius: responsiveFontSize(0.5),
                                shadowOffset: { width: 50, height: -15 },
                                shadowOpacity: 0.5,
                                shadowColor: "black",
                                shadowRadius: 30,
                                width: responsiveWidth(tablet ? 22 : 37),
                                height: responsiveFontSize(tablet ? 5 : 10)
                            }}
                        >
                            <Text style={styles.text2}>{item?.category_name}</Text>
                        </Shadow> */}

                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeader() {
        return (
            <>
                {/* <View style={{...styles.headCon,marginTop:0}}>
                    <Text style={styles.text}>{dataP.category_name}
                    {subCatName && (subCatName.includes("All") ? "" : ` - ${subCatName}`)}
                    </Text>
                    <View style={styles.line} />
                </View>
                <View style={{width:responsiveWidth(91), alignSelf:'center', alignItems:'center'}}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}

                    contentContainerStyle={{paddingLeft: 0 , marginLeft: 0}}
                    data={subCategoryRed}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => i.toString()}
                />
                </View> */}
            </>
        )
    }

    function renderBrandInfluencers() {
        if (!loading) {
            return (
                <>
                    {
                        filter1 &&
                        <BrandFilterModal
                            closeModle={() => {
                                onChangeFilter1(false);
                            }}
                            visible={filter1}
                            onGetIds={(dID,cName)=>{
                                setCatName(cName)
                                onChangeIds(dID)
                            }}
                            filterByEventType={filterByEventType}
                            showSelectedEventTypesEvent={showSelectedEventTypesEvent}
                        />
                    }

                    <BrandInfluencerList
                        header={renderHeader}
                        cat={{...dataP,category_name:ids.length>0?catName:dataP.category_name}}
                        catState={subCatName}
                        brandInfluencers={brandInfluencers}
                        getBrandInfluencers={getBrandInfluencers}
                        popularBrands={dataP.influencer ? popularInfluencer : popularBrands}
                        getPopular={getPopular}
                        sortFunction={sort}
                        influencers={dataP.influencer}
                        categoryBrandsYouLoveRed={categoryBrandsYouLoveRed}
                        categoryBannersRed={categoryBannersRed}
                        categoryFeaturedRed={categoryFeaturedRed}
                        isShowLoader={isApiCalled}
                        hotDealRed={hotDealRed}
                    />
                </>
            )
        } else {
            return <Loader />
        }
    }
    return (
        <View style={styles.con}>
            {renderBrandInfluencers()}
        </View>
    )
}

function mapStateToProps({ brandInfluencers, popularBrands, popularInfluencer,
    categoryBrandsYouLoveRed,
    categoryBannersRed,
    categoryFeaturedRed,
    subCategoryRed, hotDealRed }) {
    return {
        brandInfluencers, popularBrands, popularInfluencer,
        categoryBrandsYouLoveRed,
        categoryBannersRed,
        categoryFeaturedRed,
        subCategoryRed, hotDealRed
    }
}

export default connect(mapStateToProps, { ...catAct, ...homeAct, ...bannersCoversAct, ...subCategoryAct, ...categoryBannerAct, ...categoryFeaturedAct, ...categoryBrandYouLoveAct })(BrandInfluencers)
const styles = StyleSheet.create({
    con: {
        flex: 1
    },
    line: {
        height: 1,
        backgroundColor: '#b8b8b8',
        marginVertical: responsiveFontSize(1),
        width: responsiveWidth(91),
        alignSelf: 'center'
    },
    text: {
        fontSize: responsiveFontSize(tablet ? 1.25 : 2),
        color: 'rgb(7, 13, 46)',
        textTransform: 'capitalize',
        left: responsiveFontSize(tablet ? 1 : 1)
    },
    headCon: {
        marginTop: responsiveFontSize(tablet ? 1 : 2),
        paddingHorizontal: responsiveFontSize(1)
    },
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
        borderRadius: responsiveFontSize(tablet ? 0.4 : 0.8),
        width: responsiveWidth(tablet ? 22 : 37),
        height: responsiveFontSize(tablet ? 5 : 10)
    },
    catCon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveFontSize(0.6),
    },
    text2: {
        position: 'absolute',
        zIndex: 3,
        bottom: responsiveFontSize(0.25),
        left: responsiveFontSize(0.75),
        fontSize: responsiveFontSize(tablet ? 0.75 : 1.75),
        color: 'white',
        fontWeight: '800'

    },
})