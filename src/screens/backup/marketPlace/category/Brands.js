import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import * as catAct from "../../../store/actions/category"
import { connect } from 'react-redux'
import Loader from '../../../components/Loader'
import rowFormate from '../../../utils/rowFormate'
import NotFound from '../../../components/NotFound'
import Box from '../../../components/Box'
import BackIcon from "react-native-vector-icons/Ionicons"
import ActionModal from '../../../components/ActionModal'
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet() 

function Brands({ route, getCatbrands, CatBrands, navigation, sendReqToBrand }) {
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [currentData, setCurrentData] = useState({})
    useEffect(() => {
        getCatbrands(route.params.id)
            .then(() => setLoading(false))
    }, [])

    function renderItem(items) {
        return items.map((it, i) => {
            console.log(it)
            return (
                <Box
                    call={() => {
                        if (it.status=="") {
                            setCurrentData({
                                id: it.brand_id,
                                img: it.profile_image_url,
                                name: it.brand_name
                            })
                            setModal(true)
                        } 
                        else if(it.status=="Approved") {
                            navigation.push('campaigns', { id: it.brand_id, name: it.brand_name,category_id:route.params.category_id ,parent_id:route.params.id })
                        }
                    }}
                    key={it._id}
                    name={it.brand_name}
                    ImagePassStyle={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        backgroundColor: 'white',
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderRadius: responsiveFontSize(tablet?0.4:0.8),
                        marginVertical: responsiveFontSize(1),
                        marginLeft: responsiveFontSize(it.length==1?1:0.5),
                      }}
                      boxWidth={responsiveWidth(tablet?(it.length==1?96:32):96) - responsiveFontSize(1)}
                    // influencer={true}
                    img={it.profile_image_url ? { uri: it.profile_image_url } : require('../../../assets/user.png')}
                    status={it.status}
                />
            )
        })
    }

    function renderBox({ item, index }) {

        return (
            <View style={{ flexDirection: 'row' }}>
                {renderItem(item)}
            </View>
        )

    }
    if (!loading) {
        return (
            <View style={{ flex: 1 }}>
                <ActionModal
                    call={() => {
                        setLoading(true)
                        sendReqToBrand(currentData.id).then(() => {
                            getCatbrands(route.params.id)
                                .then(() => setLoading(false))
                                .catch((err)=>{
                                    console.log(err.response.data)
                                })
                        }).catch(err=>{
                            console.log(err.response.data)
                        })
                    }}
                    isModalVisible={modal}
                    data={currentData}
                    closeModal={() => setModal(false)}
                    title={"Need To Be Approved By Brand. Please Request Participation."}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: '20%', paddingLeft: responsiveFontSize(2) }}
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(tablet?1.25:2), padding: responsiveFontSize(2), textAlign: 'center', width: '60%' }}>{route.params?.category_name}</Text>
                    <View style={{ width: '20%' }} />
                </View>
                <FlatList
                    data={rowFormate(CatBrands, tablet?3:1)}
                    renderItem={renderBox}
                    onEndReachedThreshold={0.1}
                    ListEmptyComponent={() => <NotFound text={"No Brand Found"}/>}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, i) => item[0]._id}
                />
            </View>
        )
    } else {
        return <Loader />
    }
}

function mapStateToProps({ CatBrands }) {
    return { CatBrands }
}

export default connect(mapStateToProps, catAct)(Brands)

const styles = StyleSheet.create({
    btnText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#b8b8b8',
        marginVertical: responsiveFontSize(1)
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: 'rgb(7, 13, 46)',
        textTransform: 'capitalize'
    },
    headCon: {
        marginTop: responsiveFontSize(tablet?1.25:2),
        paddingHorizontal: responsiveFontSize(1)
    }
})