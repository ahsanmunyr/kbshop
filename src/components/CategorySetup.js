import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import BackIcon from "react-native-vector-icons/Ionicons"
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Btn from './Btn'
import DropDownComp from './DropDownComp';
import * as catAct from "../store/actions/category"
import * as authAct from "../store/actions/authAct"
import { connect } from 'react-redux'
import Loader from './Loader'
import { DragSortableView } from 'react-native-drag-sort'
import Toast from 'react-native-toast-message';
import CustomModal from './Modal'
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const deviceWidth = Dimensions.get('window').width
const childrenWidth = deviceWidth / 5;
const childrenHeight = deviceWidth / (tablet?7:7);
const itemWidth = 72
const itemHeight = 36
const sortWidth = deviceWidth / 1.25

function CategorySetUp({ back, editCategory, refreshAuth, header, navigation, authRed, getAllCategories, allCategories, getSelectedCategories, seletedCategories, updateCategories, getStripeProducts, stripeProducts, verifyUserCategory }) {
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [currentCat, setCurrentCat] = useState({})
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: header == "none" ? false : true
        })
    }, [navigation])
    useEffect(() => {
        Promise.all([getSelectedCategories(authRed.data._id), getStripeProducts(), getAllCategories()])
            .then(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (seletedCategories.length > 0) {
            setSelectedCategory(seletedCategories.map(it => it.parent_id))
        }
    }, [seletedCategories])

    // const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
    // const [noOfCat, setNoOfCat] = useState([
    //     { label: '3', value: 3 },
    //     { label: '6', value: 6 },
    //     { label: '12', value: 12 },
    // ]);

    const [category, setCategory] = useState("")
    //2
    const [isOpenDrpdwn2, setIsOpenDrpdwn2] = useState(false);
    const [submit, setSubmit] = useState(false)
    // const noOfSelectCat = [
    //     { label: '3', value: 3 },
    //     { label: '6', value: 6 },
    //     { label: '12', value: 12 },
    // ];
    const [SelectedCategory, setSelectedCategory] = useState([])
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [isEditState, setIsEditState] = useState(false)

    const removeCatergoryFromUi = (data)=>{
        const copyData = [...SelectedCategory];
        const filterData = copyData.filter((item,i)=>{ 
            return item !== data
        })
        setSelectedCategory([...filterData])
    }

    const onRemoveCategory = (data) => {
        const foundData = seletedCategories.find((item)=>{
            return item.parent_id === data
        })
        verifyUserCategory(foundData?.category_id,()=>removeCatergoryFromUi(data))
    }

    function renderSeletedCat() {
        var data = []
        SelectedCategory.forEach((it) => {
            if ([...allCategories.message].map(it => it.parent_id).indexOf(it) != -1) {
                data.push(allCategories.message[[...allCategories.message].map(it => it.parent_id).indexOf(it)])
            }
        })
        data = data.map(it => {
            if ([...seletedCategories].map((it) => it.parent_id).indexOf(it.parent_id) != -1) {
                // console.log("dddd", seletedCategories[[...seletedCategories].map((it) => it.parent_id).indexOf(it.parent_id)].image_url)
                return {
                    ...it,
                    image_url: seletedCategories[[...seletedCategories].map((it) => it.parent_id).indexOf(it.parent_id)].image_url
                }
            } else {
                return it
            }
        })
        // console.log("daaa", data)
        return (
            <DragSortableView
                dataSource={data}
                parentWidth={responsiveWidth(95)}
                // childrenWidth={responsiveWidth(tablet?15:23)}
                childrenWidth={responsiveWidth(tablet ? 18.75 : 23)}
                childrenHeight={childrenHeight}
                marginChildrenTop={10}
                onDragStart={() => {
                    if (!isEditState) {
                        setScrollEnabled(false)
                        setIsEditState(true)
                    } else {
                        setScrollEnabled(false)
                    }
                }}
                onDragEnd={() => setScrollEnabled(true)}
                onDataChange={(data) => {
                    setSelectedCategory(data.map(it => it.parent_id))
                }}
                onClickItem={(item, singleItem, i) => {
                    const data = seletedCategories.filter(it => {
                        if (it.parent_id == singleItem.parent_id) {
                            return it
                        }
                    })

                    if(data[0]?.category_id ){
                        setCurrentCat({ ...singleItem, category_id: data[0].category_id })
                        setModal(true)
                    }
                }}
                keyExtractor={(item, index) => item.parent_id}
                renderItem={(item) => {
                    return (
                        <View key={item.parent_id} style={styles.catItem}>
                            <Image
                                style={styles.catImg}
                                source={{ uri: item.image_url }}
                            />
                            {/* <Text style={styles.catText}>{item.category_name}</Text> */}
                        </View>
                    )
                }}

            />
        )
    }

    function onUpdateCategory() {
        setBtnLoading(true)
        const data = SelectedCategory.map(it => {
            if ([...seletedCategories].map(it => it.parent_id).indexOf(it) != -1) {

                return {
                    ...seletedCategories[[...seletedCategories].map(it => it.parent_id).indexOf(it)]
                }

            } else {
                return it
            }
        })

        const updatedData = data.map(it => {
            if ([...allCategories.message].map(it => it.parent_id).indexOf(it) != -1) {
                return {
                    ...allCategories.message[[...allCategories.message].map(it => it.parent_id).indexOf(it)],
                    category_id: allCategories.message[[...allCategories.message].map(it => it.parent_id).indexOf(it)].parent_id
                }
            } else {
                return it
            }
        })
        updateCategories(updatedData).then(() => {
            setBtnLoading(false)
            Toast.show({
                type: "success",
                text1: "Successfully updated"
            })
            getSelectedCategories(authRed.data._id)
            if (!authRed.data.category) {
                refreshAuth()
            }
        }).catch(err => {
            console.log(err)
            setBtnLoading(false)
            Toast.show({
                type: "error",
                text1: err.response.data.message
            })
        })

    }
    if (!loading) {
        return (
            <View style={{ flex: 1 }}>
                <CustomModal
                    isModalVisible={modal}
                    closeModal={() => setModal(false)}
                    data={currentCat}
                    editCategory={editCategory}
                    reload={() => getSelectedCategories(authRed.data._id)}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {back == "none" ? <View style={{ width: '20%'}}/>: (
                        <TouchableOpacity
                            style={{ width: '20%', paddingLeft: responsiveFontSize(2) }}
                            onPress={() => navigation.navigate("menu")}
                        >
                            <BackIcon  name="arrow-back" size={responsiveFontSize(tablet?2:3)} color={colors.themeblue} />
                        </TouchableOpacity>
                    )}
                    <Text style={{ color: colors.themeblue, fontWeight: 'bold', fontSize: responsiveFontSize(tablet?1.25:2.2), padding: responsiveFontSize(2), textAlign: 'center', width: '60%' }}>
                        Category Setup
                    </Text>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: 'green',
                            paddingHorizontal: responsiveFontSize(tablet?1:2),
                            paddingVertical: responsiveFontSize(0.5),
                            borderRadius: responsiveFontSize(0.5)
                        }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet?1:1.5), textAlign: 'center' }}>{seletedCategories.length}/{allCategories.category_limit}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    scrollEnabled={scrollEnabled}
                    style={styles.parentCon}>
                    <View style={{ ...styles.planCon }}>
                        <View style={styles.planItem}>
                            <Text style={{fontSize:responsiveFontSize(tablet?1:1.8)}}>Number Of Categories In {authRed.data.package} Is {allCategories.category_limit}</Text>
                        </View>
                        <DropDownComp
                            items={[...allCategories.message]?.map(it => ({ ...it, label: it.category_name, value: it.parent_id }))}
                            open={isOpenDrpdwn2}
                            value={SelectedCategory}
                            setOpen={setIsOpenDrpdwn2}
                            setValue={setSelectedCategory}
                            error={!SelectedCategory.length && submit}
                            searchable={true}
                            listMode="MODAL"
                            mode="BADGE"
                            placeholdertxt="No of Categories"
                            multiple={true}
                            itemKey="value"
                            renderBadgeItem={props => {
                                return (
                                  <TouchableOpacity
                                    onPress={()=>onRemoveCategory(props.value)}
                                    // {...props}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      backgroundColor: '#e6e6e6',
                                      padding: responsiveFontSize(0.5),
                                      borderRadius:responsiveFontSize(tablet?0.4:0.75)
                                    }}>
                                    <Text style={{marginRight:5}}>{props.label}</Text>
                                    <CancelIcon name="cancel" color={'black'} size={16} />
                                  </TouchableOpacity>
                                );
                              }}
                            min={0}
                            max={allCategories.category_limit}
                            style={{ marginTop: 5, width: responsiveWidth(92) }}
                        />
                        {renderSeletedCat()}
                        <View style={{ marginTop: responsiveFontSize(1) }}>
                            <Btn
                                text={"Save"}
                                call={onUpdateCategory}
                                loader={btnLoading}
                            />
                        </View>
                    </View>
                    {/* <View style={{ ...styles.planCon, marginTop: responsiveFontSize(1) }}>
                        <View style={styles.planItem}>
                            <Text>Buy Additional Categories</Text>
                        </View>
                        <DropDownComp
                            items={noOfCat}
                            open={isOpenDrpdwn}
                            value={category}
                            setOpen={setIsOpenDrpdwn}
                            setValue={setCategory}
                            error={!category && submit}
                            listMode="SCROLLVIEW"
                            mode="BADGE"
                            placeholdertxt="No of Categories"
                            style={{ marginTop: 5, width: responsiveWidth(92) }}
                            dropDownContainerStyle={{ width: responsiveWidth(92) }}
                            containerStyle={{ width: responsiveWidth(92) }}
                        />
                        <View style={{ marginTop: responsiveFontSize(1) }}>
                            <Btn
                                text={"Upgrade Category"}
                                call={() => alert("comming Soon")} />
                        </View>
                    </View> */}
                </ScrollView>
            </View>
        )
    } else {
        return <Loader />
    }
}

function mapStateToProps({ authRed, allCategories, seletedCategories, stripeProducts }) {
    return { authRed, allCategories, seletedCategories, stripeProducts }
}

export default connect(mapStateToProps, { ...catAct, ...authAct })(CategorySetUp)

const styles = StyleSheet.create({
    planCon: {
        backgroundColor: 'white',
        borderRadius: responsiveFontSize(0.5),
        padding: responsiveFontSize(1),
    },
    parentCon: {
        paddingHorizontal: responsiveFontSize(1),
    },
    title: {
        fontSize: responsiveFontSize(2),
        color: 'black'
    },
    planItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: responsiveFontSize(1.25),
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    catCon: {
        marginTop: responsiveFontSize(1),
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    catItem: {
        // padding: responsiveFontSize(1),
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        margin: 5,
        // marginVertical:5,
        // marginHorizontal:responsiveWidth(tablet ? 0 : 3),
        borderWidth:1,
        borderColor:"#ccc",
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5)
    },
    catImg: {
        // width: responsiveFontSize(tablet?4:7),
        // height: responsiveFontSize(tablet?4:7),
        // borderRadius: responsiveFontSize(3.5)
        borderWidth: 1,
        borderColor:'white',
        width: responsiveWidth(tablet ? 15 : 20),
        height: responsiveWidth(tablet ? 10 : 13),
        borderRadius: responsiveFontSize(tablet ? 0.35 : 0.5)
    },
    catText: {
        fontSize: responsiveFontSize(tablet?0.75:1.2),
        marginTop: responsiveFontSize(0.25)
    }
})