import { StyleSheet, Text, View, TouchableOpacity, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import * as homeAct from "../store/actions/home"
import { connect, useDispatch } from 'react-redux'
import Loader from './Loader'
import CrossIcon from "react-native-vector-icons/Entypo"
import NotFound from './NotFound'
import { useNavigation } from '@react-navigation/native'
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

function DropBox({ searhList, active, searchText, getSearchList,close}) {
    const navigation=useNavigation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoading(true)
        if (active == 1) {
            getSearchList("category", searchText, 1).then(() => setLoading(false))
        }
        else if (active == 2) {
            getSearchList("brand", searchText, 1).then(() => setLoading(false))
        } else {
            getSearchList("influencer", searchText, 1).then(() => setLoading(false))
        }
    }, [searchText])

    function renderList() {
        return (
            <FlatList
            keyboardShouldPersistTaps="handled"
                data={searhList.data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={()=>{
                                if(active==1){
                                    navigation.navigate('categoryDetail',{...item})
                                    close()
                                }else{
                                    navigation.navigate('viewBioshop',{shopName:item.instagram_username})
                                    close()
                                }
                            }}
                            key={item._id}
                            style={styles.box}>
                                <Image
                                style={styles.img}
                                source={active == 1 ? (item.image_url?{uri:item.image_url}:require('../assets/user.png')) : (item.profile_image_url?{uri:item.profile_image_url}:require('../assets/user.png'))}
                                />
                            <Text style={{fontSize:responsiveFontSize(tablet?0.75:1.6)}}>{active == 1 ? item.category_name : item.brand_name?item.brand_name:item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, i) => item._id}
                ListEmptyComponent={()=><NotFound/>}
            />
        )
    }
    return (
        <View style={styles.dropdown}>
            {!loading ? renderList() : <Loader />}
            <View style={styles.footer}>
                <TouchableOpacity
                onPress={close}
                >
                    <CrossIcon
                        name="cross"
                        size={responsiveFontSize(tablet?1.25:3)}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function mapStateToProps({ searhList }) {
    return { searhList }
}
export default connect(mapStateToProps, { ...homeAct })(DropBox)

const styles = StyleSheet.create({
    dropdown: {
        height: responsiveHeight(tablet?25:35),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderBottomRightRadius: responsiveFontSize(2),
        borderBottomLeftRadius: responsiveFontSize(2),
        backgroundColor: 'white',
        // paddingBottom: responsiveFontSize(4),
        width: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    box: {
        borderBottomColor: '#b8b8b8',
        padding: responsiveFontSize(tablet?0.5:1),
        borderBottomWidth: 0.5,
        flexDirection:'row',
        alignItems:'center'
    },
    footer:{
        padding:responsiveFontSize(1),
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:responsiveFontSize(tablet?1.75:3.5),
        height:responsiveFontSize(tablet?1.75:3.5),
        borderRadius:responsiveFontSize(3.5)/2,
        marginRight:responsiveFontSize(1)
    }
})