import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import BackIcon from "react-native-vector-icons/Ionicons"
import colors from '../../../assets/colors/colors'
import Btn from '../../../components/Btn'
import DelModal from '../../../components/DeleteModal';
import * as authAct from "../../../store/actions/authAct"
import { connect } from 'react-redux'
import Toast from "react-native-toast-message"
import Loader from '../../../components/Loader'

function Delete({ navigation,authRed,deleteAccount,logOut}) {
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false)
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    if(!loading){
        return (
            <View style={{flex:1, backgroundColor:'white',}}>
                <DelModal
                title={"Are You Sure You Want To Delete This Account?"}
                title2={"You won't be able to revert this!"}
                closeModal={()=>setModal(false)}
                visible={modal}
                selectedItem={{
                    _id:authRed.data._id,
                    name:authRed.data.name,
                    profile_url:authRed.data.profile_url
                }}
                deleteFav={(id)=>{
                    setLoading(true)
                    deleteAccount(id).then((res)=>{
                        console.log(id)
                        console.log(res.data)
                        logOut()
                        setLoading(false)
                    }).catch((err)=>{
                        Toast.show({
                            type:'error',
                            text1:err?.response?.data?.message
                        })
                    })
                    setModal(false)
                }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: '20%', paddingLeft: responsiveFontSize(2) }}
                        onPress={() => navigation.navigate("menu")}
                    >
                        <BackIcon name="arrow-back" size={responsiveFontSize(3)} color={colors.themeblue} />
                    </TouchableOpacity>
                    <Text style={{ color: colors.themeblue, fontWeight: 'bold', fontSize: responsiveFontSize(2), padding: responsiveFontSize(2), textAlign: 'center', width: '60%' }}>
                        Delete Account
                    </Text>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} />
                </View>
                <View style={styles.con}>
                    <Image
                        source={require('../../../assets/delete.png')}
                        style={styles.img}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Are You Sure You Want Delete Your Account?</Text>
                    <Text style={styles.text}>This Action Is Not Reversible And It Will Remove All Your Data From Our Servers.</Text>
                    <Text style={{ ...styles.text, fontStyle: 'italic' }}>For Support Please Contact support@konnect.bio .</Text>
                    <Btn
                        text={"Yes Delete My Account"}
                        color="red"
                        call={()=>setModal(true)}
                        pS={{marginTop:responsiveFontSize(2),width:'50%'}}
                    />
                </View>
            </View>
        )
    }else{
        return <Loader/>
    }
}

function mapStateToProps({authRed}){
    return{authRed}
}

export default connect(mapStateToProps,authAct)(Delete)
const styles = StyleSheet.create({
    con: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveFontSize(1)
    },
    img: {
        width: responsiveFontSize(20),
        height: responsiveFontSize(20)
    },
    title: {
        marginTop:responsiveFontSize(3),
        fontSize: responsiveFontSize(2),
        color: 'red'
    },
    text: {
        textAlign: 'center',
        marginTop: responsiveFontSize(0.5)
    }
})