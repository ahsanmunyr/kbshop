import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import BackIcon from "react-native-vector-icons/Ionicons"
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Btn from './Btn'
import InstaWebView from './InstaWebView'
import * as instaAct from "../store/actions/instagram"
import * as authAct from "../store/actions/authAct"
import Toast from "react-native-toast-message"
import { connect } from 'react-redux'
import DelModal from './DeleteModal';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

function ConnectionSetup({ back, getInstagramUrl, getInstaToken, authRed,refreshAuth ,disconnectInstaGram,navigation}) {
    const [modal, setModal] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false)
    const [disModal,setDisModal]=useState(false)
    const [url, setUrl] = useState("")
    const [code, setCode] = useState("")

    useLayoutEffect(()=>{
        navigation.setOptions({ headerShown: false })
    },[navigation])
    useEffect(() => {
        setbtnLoading(true)
        getInstagramUrl().then((res) => {
            setUrl(res.data)
            setbtnLoading(false)
        })
    }, [])

    useEffect(() => {
        function showError(mes){
            Toast.show({
                type:"error",
                text1:mes
            })
        }
        if (code) {
            setbtnLoading(true)
            getInstaToken(code, authRed.data?.email, authRed.data?._id,showError)
                .then(() => {
                    refreshAuth().then(()=>{
                        setbtnLoading(false)
                    })
                })
        }
    }, [code])

    function onConnect() {
        setModal(true)
    }
    function onDisconnect() {
        setDisModal(true)
    }
    return (
        <View>
            <InstaWebView
                visible={modal}
                closeModle={() => setModal(false)}
                data={{
                    url: url,
                    getCode: (v) => setCode(v)
                }}
            />
            <DelModal
            visible={disModal}
            title={`Are you sure you want to disconnect @${authRed.data?.instagram_username} account from Konnect.bio?`}
            // title2={"This will remove all your content from our platform. This action is not reversible."}
            closeModal={()=>setDisModal(false)}
            selectedItem={{
                _id:authRed.data._id,
                name:authRed.data.instagram_username
            }}
            insta={require('../assets/insta.png')}
            deleteFav={(id)=>{
                setbtnLoading(true)
                disconnectInstaGram(id).then(()=>{
                    refreshAuth().then(()=>{
                        setbtnLoading(false)
                    })
                })
                setDisModal(false)
            }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {back == "none" ? <View style={{ width: '20%'}}/> : (
                    <TouchableOpacity
                        style={{ width: '20%', paddingLeft: responsiveFontSize(2) }}
                        onPress={() => navigation.navigate("menu")}
                    >
                        <BackIcon name="arrow-back" size={responsiveFontSize(tablet?2:3)} color={colors.themeblue} />
                    </TouchableOpacity>
                )}
                <Text style={{ color: colors.themeblue, fontWeight: 'bold', fontSize: responsiveFontSize(tablet?1.25:2.2), padding: responsiveFontSize(2), textAlign: 'center', width: '60%' }}>
                    Connection Setup
                </Text>
                <View style={{ width: '20%' }} />
            </View>
            <ScrollView style={styles.parentCon}>
                <View style={styles.planCon}>
                    <Text style={styles.title}>Manage Plan</Text>
                    <View style={styles.planItem}>
                        <Text style={styles.myText}>Current Plan</Text>
                        <Text style={styles.myText}>Influencer</Text>
                    </View>
                    <View style={styles.planItem}>
                        <Text style={styles.myText}>Categories Included</Text>
                        <Text style={styles.myText}>6</Text>
                    </View>
                    <View style={styles.planItem}>
                        <Text style={styles.myText}>Links Included</Text>
                        <Text style={styles.myText}>3</Text>
                    </View>
                    <View style={styles.planItem}>
                        <Text style={styles.myText}>Monitor Hashags</Text>
                        <Text style={styles.myText}>0</Text>
                    </View>
                    <View style={styles.planItem}>
                        <Text style={styles.myText}>Monitor Profiles</Text>
                        <Text style={styles.myText}>0</Text>
                    </View >
                </View>
                <View style={{ ...styles.planCon, marginTop: responsiveFontSize(1) }}>
                    <View style={styles.instaTitleCon}>
                        <Text style={styles.title}>Instagram Connection</Text>
                        <Text style={{ ...styles.connectSign, backgroundColor: authRed.data?.instagram_username ? "green" : "red",borderRadius:responsiveFontSize(tablet?0.4:0.75 )}}>{authRed.data?.instagram_username ? "Connected" : "Not Connected"}</Text>
                    </View>
                    {authRed.data?.instagram_username ? (
                        <View style={{ marginVertical: responsiveFontSize(0.75) }}>
                            <Text style={styles.myText}>Connected Status: <Text style={{ color: 'green' ,fontSize:responsiveFontSize(tablet?1:1.5)}}>@{authRed.data?.instagram_username}</Text></Text>
                        </View>
                    ) : null}
                    <View style={{ marginTop: responsiveFontSize(1) }}>
                        <Btn
                            text={authRed.data?.instagram_username ? "Disconnect Instagram" : "Connect Instagram"}
                            call={authRed.data?.instagram_username ? onDisconnect : onConnect}
                            loader={btnLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

function mapStateToProps({ authRed }) {
    return { authRed }
}

export default connect(mapStateToProps, {...instaAct,...authAct})(ConnectionSetup)

const styles = StyleSheet.create({
    planCon: {
        backgroundColor: 'white',
        borderRadius: responsiveFontSize(0.5),
        padding: responsiveFontSize(1.5)
    },
    parentCon: {
        paddingHorizontal: responsiveFontSize(1)
    },
    title: {
        fontSize: responsiveFontSize(tablet?1.25:2),
        color: 'black'
    },
    planItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: responsiveFontSize(tablet?0.75:1.25),
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    instaTitleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    connectSign: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: responsiveFontSize(tablet?0.9:1.5),
        padding: responsiveFontSize(tablet?0.25:0.5),
        borderRadius: responsiveFontSize(0.5),
        paddingHorizontal: responsiveFontSize(1)
    },
    myText:{
        fontSize:responsiveFontSize(tablet?0.9:1.5),
        color:'gray'
    }
})