import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, Linking } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import colors from '../../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import * as liveActions from '../../../store/actions/liveEvents';
import * as bioActions from '../../../store/actions/bioShop';
import Feather from 'react-native-vector-icons/Feather';
import LiveEventsFilterModalNew from '../../../components/LiveEventsFilterModalNew';
import Loader from '../../../components/Loader';
import BioShop from '../bioshop/BioShop';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import rowFormate from '../../../utils/rowFormate';
import NotFound from '../../../components/NotFound';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign"

const tablet = deviceInfo.isTablet();
function Profile({
    navigation,
    route,
    getProfileLike,
    //actions
    getUpcommingEvents,
    getLiveEvents,
    getPreviousEvents,
    getInfluencersReviewsBrand,
    getProfileDetails,
    getInfluencersReviewsOne,
    //reducers
    upcomingEvents,
    liveEventsBrand,
    previousEventsBrand,
    authRed,
    getInfluencerReviewsRedBrand,
    profileDetail,
    bioShopReducer,
    getBioShopData,
    getInfluencerReviewsOne,
    profileAllLike,
    liveEvents
}) {
    // const route = {
    //     params: {
    //         data: {
    //             _id: "61d373de54c7db79889ecd2e",
    //             instagram_username: profileDetail?.username
    //         }
    //     }
    // }
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const [showSelectedEventTypesEvent, setShowSelectedEventTypesEvent] = useState({ eventType: (route.params?.target) ? (route.params?.target) : 'Live', filterBy: '', catID: [] });
    const [reviewPage, setReviewPage] = useState(2)
    const [recordedPage, setRecordedPage] = useState(2)
    const [upcommingPage, setUpcommingPage] = useState(2)
    const [mainLoading, setMainLoading] = useState(true)
    const [ids, onChangeIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterModal, setIsFilterModal] = useState(false);
    const [isFilterSocialStoreModal, setIsFilterSocialStoreModal] = useState(false);



    useEffect(() => {
        // console.log("dd", route.params.data)
        setMainLoading(true)
        if (!(route.params?.influencer)) {
            getBioShopData(route.params?.data?.instagram_username)
            getProfileLike(route.params?.data?._id)
            getProfileDetails(route.params?.data?._id)
                .then(() => setMainLoading(false))
        } else {
            setMainLoading(false)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        if (showSelectedEventTypesEvent.eventType == "Recorded") {
            getPreviousEvents(1, ids, route.params.data?._id)
                .then(() => setLoading(false))
        }
        else if (showSelectedEventTypesEvent.eventType == "Upcomming") {
            getUpcommingEvents(1, ids, route.params.data?._id)
                .then(() => setLoading(false))
        }
        else if (showSelectedEventTypesEvent.eventType == "Live") {
            getLiveEvents(1, ids, route.params.data?._id)
                .then(() => setLoading(false))
        }
        else if (showSelectedEventTypesEvent.eventType == "Reviews") {
            if (route.params?.influencer) {
                getInfluencersReviewsOne(1, (ids.length>0?ids[0]:null), route.params?.data?._id,null,route.params?.brand_id,route.params.data?.is_id)
                    .then(() => setLoading(false))
            } else {
                getInfluencersReviewsBrand(1, (ids.length>0?ids[0]:null), route.params.data?._id)
                    .then(() => setLoading(false))
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "Store") {
            setLoading(false)
        }
    }, [showSelectedEventTypesEvent])

    function header() {
        return (
            <>
                <View style={styles.imgCon}>
                    <Image
                        style={styles.headerImg}
                        source={{ uri: route.params?.data?.profile_image_url }}
                    />
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${profileDetail?.username}`)}><Text style={{ ...styles.name, marginTop: responsiveHeight(1), fontWeight: 'normal' }}>@{(route?.params?.influencer) ? getInfluencerReviewsOne?.data[0]?.creator?.instagram_username : profileDetail?.username}</Text></TouchableOpacity>
                </View>
                <View style={styles.countCon}>
                    <View style={styles.countBox}>
                        <Text style={styles.counts}>{(route?.params?.influencer) ? 0 : profileDetail?.follows_count}</Text>
                        <Text style={styles.countText}>Following</Text>
                    </View>
                    <View style={styles.countBox}>
                        <Text style={styles.counts}>{(route?.params?.influencer) ? getInfluencerReviewsOne?.data[0]?.creator?.followers : profileDetail?.followers_count}</Text>
                        <Text style={styles.countText}>Followers</Text>
                    </View>
                    <View style={styles.countBox}>
                        <Text style={styles.counts}>{profileAllLike}</Text>
                        <Text style={styles.countText}>Likes</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerBtn}>
                    <Text style={{ ...styles.name, color: 'white' }}>Follow</Text>
                </TouchableOpacity>
                <Text style={styles.headerDes}>
                    {bioShopReducer?.data?.bio}
                </Text>
                <View style={{ width: '100%' }}>
                    <ScrollView contentContainerStyle={{ minWidth: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.listHeaderCon}>
                            {!(route?.params?.influencer) && (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowSelectedEventTypesEvent(pre => ({ ...pre, eventType: 'Live' }))
                                            setRecordedPage(2)
                                            setUpcommingPage(2)
                                            setReviewPage(2)
                                            onChangeIds([])
                                        }}
                                        style={{ ...styles.listHeaderItem, borderBottomColor: showSelectedEventTypesEvent.eventType == "Live" ? colors.themeblue : "gray", borderBottomWidth: showSelectedEventTypesEvent.eventType == "Live" ? 1 : 0 }}>
                                        <MaterialIcons
                                            name="live-tv"
                                            size={responsiveFontSize(tablet?1:2)}
                                            color={showSelectedEventTypesEvent.eventType == "Live" ? colors.themeblue : "gray"}
                                        />
                                        <Text style={{ ...styles.listHeaderText, color: showSelectedEventTypesEvent.eventType == "Live" ? colors.themeblue : "gray" }}>Live</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowSelectedEventTypesEvent(pre => ({ ...pre, eventType: 'Recorded' }))
                                            setRecordedPage(2)
                                            setUpcommingPage(2)
                                            setReviewPage(2)
                                            onChangeIds([])
                                        }}
                                        style={{ ...styles.listHeaderItem, borderBottomColor: showSelectedEventTypesEvent.eventType == "Recorded" ? colors.themeblue : "gray", borderBottomWidth: showSelectedEventTypesEvent.eventType == "Recorded" ? 1 : 0 }}>
                                        <MaterialCommunityIcons
                                            name="record-circle-outline"
                                            size={responsiveFontSize(tablet?1:2)}
                                            color={showSelectedEventTypesEvent.eventType == "Recorded" ? colors.themeblue : "gray"}
                                        />
                                        <Text style={{ ...styles.listHeaderText, color: showSelectedEventTypesEvent.eventType == "Recorded" ? colors.themeblue : "gray" }}>Recorded</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowSelectedEventTypesEvent(pre => ({ ...pre, eventType: 'Upcomming' }))
                                            setUpcommingPage(2)
                                            setRecordedPage(2)
                                            setReviewPage(2)
                                            onChangeIds([])
                                        }}
                                        style={{ ...styles.listHeaderItem, borderBottomColor: showSelectedEventTypesEvent.eventType == "Upcomming" ? colors.themeblue : "Upcomming", borderBottomWidth: showSelectedEventTypesEvent.eventType == "Upcomming" ? 1 : 0 }}>
                                        <AntDesign
                                            name="notification"
                                            size={responsiveFontSize(tablet?1:2)}
                                            color={showSelectedEventTypesEvent.eventType == "Upcomming" ? colors.themeblue : "gray"}
                                        />
                                        <Text style={{ ...styles.listHeaderText, color: showSelectedEventTypesEvent.eventType == "Upcomming" ? colors.themeblue : "gray" }}>Upcomming</Text>
                                    </TouchableOpacity>
                                </>
                            )}

                            <TouchableOpacity
                                onPress={() => {
                                    setShowSelectedEventTypesEvent(pre => ({ ...pre, eventType: 'Reviews' }))
                                    setRecordedPage(2)
                                    setUpcommingPage(2)
                                    setReviewPage(2)
                                    onChangeIds([])
                                }}
                                style={{ ...styles.listHeaderItem, borderBottomColor: showSelectedEventTypesEvent.eventType == "Reviews" ? colors.themeblue : "gray", borderBottomWidth: showSelectedEventTypesEvent.eventType == "Reviews" ? 1 : 0 }}>
                                <MaterialIcons
                                    name="stars"
                                    size={responsiveFontSize(tablet?1:2)}
                                    color={showSelectedEventTypesEvent.eventType == "Reviews" ? colors.themeblue : "gray"}
                                />
                                <Text style={{ ...styles.listHeaderText, color: showSelectedEventTypesEvent.eventType == "Reviews" ? colors.themeblue : "gray" }}>Reviews</Text>
                            </TouchableOpacity>
                            {/* {!(route?.params?.influencer) && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowSelectedEventTypesEvent(pre => ({ ...pre, eventType: 'Store' }))
                                        setUpcommingPage(2)
                                        setRecordedPage(2)
                                        setReviewPage(2)
                                        onChangeIds([])
                                    }}
                                    style={{ ...styles.listHeaderItem, borderBottomColor: showSelectedEventTypesEvent.eventType == "Store" ? colors.themeblue : "Store", borderBottomWidth: showSelectedEventTypesEvent.eventType == "Store" ? 1 : 0 }}>
                                    <MaterialCommunityIcons
                                        name="store"
                                        size={responsiveFontSize(2)}
                                        color={showSelectedEventTypesEvent.eventType == "Store" ? colors.themeblue : "gray"}
                                    />
                                    <Text style={{ ...styles.listHeaderText, color: showSelectedEventTypesEvent.eventType == "Store" ? colors.themeblue : "gray" }}>Social Store</Text>
                                </TouchableOpacity>
                            )} */}
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }

    function onRenderItem(item, pIndex, index) {
        if (showSelectedEventTypesEvent.eventType == "Live") {
            navigation.push('liveeventscycle', {
                data: item,
                id: item?._id,
                authRed: authRed?.data?._id,
                setCurrent: { ...item, liveEvents, index: (pIndex * (tablet?4:1)) + index },
            });
        }
        else if (showSelectedEventTypesEvent.eventType == "Recorded") {
            navigation.push('livecycle', {
                data: item,
                id: item?._id,
                authRed: authRed?.data?._id,
                setCurrent: { ...item, previousEventsBrand, index: (pIndex * (tablet?4:1)) + index },
                ids,
                recordedPage,
                brand_id: route.params.data?._id
            });
        }
        else if (showSelectedEventTypesEvent.eventType == "Upcomming") {
            navigation.push('upcomingEvents', {
                data: item,
                upcomming: item,
                authRed: authRed?.data?._id,
                list: upcomingEvents,
                setCurrent: { ...item, upcomingEvents, index: (pIndex * (tablet?4:1)) + index },
                ids,
                upcommingPage
            });
        }
        else if (showSelectedEventTypesEvent.eventType == "Reviews") {
            navigation.push('influencerReviews', {
                data: item,
                id: item?._id,
                authRed: authRed?.data?._id,
                setCurrent: { ...item, getInfluencerReviewsRedBrand, index: (pIndex * (tablet?4:1)) + index },
                reviewPage,
                ids:ids,
                brand_id: route.params.data?._id,
                influencer:route.params?.influencer,
                dataRoute:route.params
            });
        }
    }

    function renderItem({ item, index }) {
        return (
            <View style={{ ...styles.item, justifyContent: (tablet?(item.length > 3):(item.length > 2)) ? "space-between" : "flex-start" }}>
                {item.map((itSub, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onRenderItem(itSub, index, i)}
                            key={itSub._id} style={{ width: tablet?'24.77%':'33%', height: responsiveHeight(tablet?28:24), marginTop: responsiveWidth(tablet?0.25:0.66), marginLeft: (i == 1 && (tablet?(item.length < 4):(item.length < 3))) ? responsiveWidth(0.4) : 0 ,backgroundColor:colors.themeblue}}>
                            <Image
                                source={{ uri: itSub.banner }}
                                style={{...styles.itemImg,height:responsiveHeight(tablet?28:24)}}
                            />
                            <View style={{ position: 'absolute', top: responsiveHeight(0.5), right: responsiveWidth(1.5), flexDirection: 'row' }}>
                                <Entypo
                                    name="controller-play"
                                    size={responsiveFontSize(tablet?1:2)}
                                    color="white"
                                />
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet?0.75:1.5), marginLeft: responsiveWidth(1) }}>95.6k</Text>
                            </View>
                            <View style={{ position: 'absolute', bottom: responsiveHeight(0.5), right: responsiveWidth(1.5), flexDirection: 'row' }}>
                                <Entypo
                                    name="heart"
                                    size={responsiveFontSize(tablet?1:2)}
                                    color="red"
                                />
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet?0.75:1.5), marginLeft: responsiveWidth(1) }}>{itSub.likes}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const filterByEventType = (type, cat, filterBy) => {
        setUpcommingPage(2)
        setRecordedPage(2)
        setShowSelectedEventTypesEvent({
            ...showSelectedEventTypesEvent,
            eventType: type,
            catID: [...cat],
            filterBy,
        });
    };

    function getDataList() {
        if (showSelectedEventTypesEvent.eventType == "Recorded") {
            return rowFormate(previousEventsBrand.data, tablet?4:3)
        }
        else if (showSelectedEventTypesEvent.eventType == "Live") {
            return rowFormate(liveEventsBrand.data, tablet?4:3)
        }
        else if (showSelectedEventTypesEvent.eventType == "Upcomming") {
            return rowFormate(upcomingEvents.data, tablet?4:3)
        }
        else if (showSelectedEventTypesEvent.eventType == "Reviews") {
            if (route.params?.influencer) {
                return rowFormate(getInfluencerReviewsOne.data, tablet?4:3)
            } else {
                return rowFormate(getInfluencerReviewsRedBrand.data, tablet?4:3)
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "Store") {
            // return rowFormate(previousEventsBrand.data, tablet?4:3)
            return []
        }
    }

    function renderFooter() {
        if (showSelectedEventTypesEvent.eventType == "Recorded") {
            return (
                <>
                    {((previousEventsBrand.total_records) > previousEventsBrand.data.length) && (
                        <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(15), alignItems: 'flex-start' }}>
                            <Text style={styles.btnText}>Loading...</Text>
                            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                        </View>
                    )}
                </>
            );
        }
        else if (showSelectedEventTypesEvent.eventType == "Upcomming") {
            return (
                <>
                    {((upcomingEvents.total_records) > upcomingEvents.data.length) && (
                        <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(15), alignItems: 'flex-start' }}>
                            <Text style={styles.btnText}>Loading...</Text>
                            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                        </View>
                    )}
                </>
            );
        }
        else if (showSelectedEventTypesEvent.eventType == "Live") {
            return (
                <>
                    {((liveEventsBrand.total_records) > liveEventsBrand.data.length) && (
                        <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(15), alignItems: 'flex-start' }}>
                            <Text style={styles.btnText}>Loading...</Text>
                            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                        </View>
                    )}
                </>
            );
        }
        else if (showSelectedEventTypesEvent.eventType == "Reviews") {
            if(route?.params?.influencer){
                return (
                    <>
                        {((getInfluencerReviewsOne.total_records) > getInfluencerReviewsOne.data.length) && (
                            <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(15), alignItems: 'flex-start' }}>
                                <Text style={styles.btnText}>Loading...</Text>
                                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                            </View>
                        )}
                    </>
                );
            }else{
                return (
                    <>
                        {((getInfluencerReviewsRedBrand.total_records) > getInfluencerReviewsRedBrand.data.length) && (
                            <View style={{ ...styles.footer, width: responsiveWidth(100), height: responsiveHeight(15), alignItems: 'flex-start' }}>
                                <Text style={styles.btnText}>Loading...</Text>
                                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                            </View>
                        )}
                    </>
                );
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "store") {
            return null
        }
        else {
            return null
        }
    }

    const loadMore = useCallback(() => {
        if (showSelectedEventTypesEvent.eventType == "Recorded") {
            if (previousEventsBrand.total_records > previousEventsBrand.data.length) {
                getPreviousEvents(recordedPage, ids, route.params.data?._id, "loadMore").then(() => {
                    setRecordedPage(pre => pre + 1)
                })
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "Upcomming") {
            if (upcomingEvents.total_records > upcomingEvents.data.length) {
                getUpcommingEvents(upcommingPage, ids, route.params.data?._id, "loadMore").then(() => {
                    setUpcommingPage(pre => pre + 1)
                })
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "Live") {
            
        }
        else if (showSelectedEventTypesEvent.eventType == "Reviews") {
            if(route?.params?.influencer){
                if (getInfluencerReviewsOne.total_records > getInfluencerReviewsOne.data.length) {
                    getInfluencersReviewsOne(reviewPage, ids.length>0?ids[0]:null, route.params.data?._id, "loadMore",route.params?.brand_id,route.params.data?.is_id).then(() => {
                        setReviewPage(pre => pre + 1)
                    })
                }
            }else{
                if (getInfluencerReviewsRedBrand.total_records > getInfluencerReviewsRedBrand.data.length) {
                    getInfluencersReviewsBrand(reviewPage, (ids.length>0?ids[0]:null), route.params.data?._id, "loadMore").then(() => {
                        setReviewPage(pre => pre + 1)
                    })
                }
            }
        }
        else if (showSelectedEventTypesEvent.eventType == "store") {
        }

    }, [recordedPage, previousEventsBrand, upcommingPage, upcomingEvents, getInfluencerReviewsRedBrand, liveEventsBrand,reviewPage,getInfluencerReviewsOne,getInfluencerReviewsRedBrand]);

    if (mainLoading) {
        return <Loader />
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerCOn}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerLeft}>
                    <CrossIcon
                        name="chevron-thin-left"
                        color={colors.themeblue}
                        size={responsiveFontSize(tablet ? 1.75 : 3)}
                    />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={{...styles.name,textAlign:'center'}}>{(route?.params?.influencer) ? getInfluencerReviewsOne?.data[0]?.influencer?.name : profileDetail?.name}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={{ paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5) }}>
                        <SimpleLineIcons
                            name="bell"
                            color={colors.themeblue}
                            size={responsiveFontSize(tablet ? 1.75 : 3)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (showSelectedEventTypesEvent.eventType == "Store") {
                                setIsFilterSocialStoreModal(true)
                            } else {
                                setIsFilterModal(true)
                            }
                        }}
                        style={{ paddingRight: responsiveWidth(3), paddingVertical: responsiveHeight(1.5) }}>
                        <CrossIcon
                            name="dots-three-vertical"
                            color={colors.themeblue}
                            size={responsiveFontSize(tablet ? 1.75 : 3)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <>
                    {header()}
                    <Loader />
                </>
            ) : (
                <>
                    {
                        showSelectedEventTypesEvent.eventType == "Store" ? (
                            <>
                                {header()}
                                {(route?.params?.influencer) ? (
                                    <NotFound text={"No Data Found"} />
                                ) : (
                                    <BioShop
                                        data={route.params?.data}
                                        setIsFilterSocialStoreModal={setIsFilterSocialStoreModal}
                                        isFilterSocialStoreModal={isFilterSocialStoreModal}
                                    />
                                )}
                            </>
                        ) : (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={getDataList()}
                                ListHeaderComponent={header()}
                                // contentContainerStyle={{flex:1}}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={loadMore}
                                ListFooterComponent={renderFooter}
                                onEndReachedThreshold={0.1}
                                ListEmptyComponent={<NotFound text={"No Data Found"} />}
                            />
                        )
                    }
                </>
            )}
            {isFilterModal && (
                <LiveEventsFilterModalNew
                    closeModle={() => {
                        setIsFilterModal(false);
                    }}
                    visible={isFilterModal}
                    onGetIds={onChangeIds}
                    filterByEventType={filterByEventType}
                    showSelectedEventTypesEvent={showSelectedEventTypesEvent}
                />
            )}
        </View>
    )
}

function mapStateToProps({
    upcomingEvents,
    liveEventsBrand,
    previousEventsBrand,
    authRed,
    getInfluencerReviewsRedBrand,
    profileDetail,
    bioShopReducer,
    getInfluencerReviewsOne,
    profileAllLike,
    liveEvents
}) {
    return {
        upcomingEvents,
        liveEventsBrand,
        previousEventsBrand,
        authRed,
        getInfluencerReviewsRedBrand,
        profileDetail,
        bioShopReducer,
        getInfluencerReviewsOne,
        profileAllLike,
        liveEvents
    }
}

export default connect(mapStateToProps, { ...liveActions, ...bioActions })(Profile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerCOn: {
        width: '100%',
        flexDirection: 'row'
    },
    name: {
        color: 'black',
        fontSize: responsiveFontSize(tablet?1.25:2),
        fontWeight: '500'
    },
    headerLeft: {
        width: '25%',
        paddingLeft: responsiveWidth(3),
        paddingVertical: responsiveHeight(1.5)
    },
    headerCenter: {
        width: '50%',
        justifyContent: 'center',
        alignItems: "center",
    },
    headerRight: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerImg: {
        width: responsiveFontSize(tablet?5:10),
        height: responsiveFontSize(tablet?5:10),
        borderRadius: responsiveFontSize(5),
        borderColor: 'gray',
        borderWidth: 0.5
    },
    imgCon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    counts: {
        color: 'black',
        fontSize: responsiveFontSize(tablet?1.5:2),
        fontWeight: '500'
    },
    countText: {
        fontSize: responsiveFontSize(tablet?1.25:1.5)
    },
    countBox: {
        width: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'green'
    },
    countCon: {
        width: '60%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: responsiveHeight(1)
    },
    headerBtn: {
        backgroundColor: '#fc054b',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveHeight(0.5),
        borderRadius: responsiveFontSize(0.5),
        alignSelf: 'center',
        marginTop: responsiveHeight(1)
    },
    headerDes: {
        fontSize: responsiveFontSize(tablet?0.8:1.5),
        color: 'black',
        width: '70%',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: responsiveFontSize(1)
    },
    listHeaderCon: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginTop: responsiveHeight(1),
        flexDirection: 'row'
    },
    listHeaderItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveFontSize(tablet?0.25:1),
        width: responsiveWidth(tablet?25:33.33)
    },
    listHeaderText: {
        marginLeft: responsiveFontSize(0.5),
        fontSize: responsiveFontSize(tablet?1:1.85)
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemImg: {
        width: '100%',
        height: responsiveWidth(50)
    },
    footer: {
        width: responsiveWidth(tablet ? 20 : 36),
        height: responsiveHeight(tablet ? 20 : 28),
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
})