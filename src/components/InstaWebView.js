import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'
import IconCross from "react-native-vector-icons/Entypo"
import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from "../assets/colors/colors"
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import Loader from './Loader';
import { URL } from 'react-native-url-polyfill';
const { width, height } = Dimensions.get('window')
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()
function InstaWebView({ visible, closeModle, data }) {
    const navigation = useNavigation()
    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={closeModle}
            visible={visible}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', height: height, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View style={{ ...styles.con, backgroundColor: "white" }}>
                    <View style={{ ...styles.btn, backgroundColor: "white" }}>
                        <Text style={styles.title}>Connect Instagram</Text>
                        <TouchableOpacity onPress={() => {
                            closeModle()
                        }}>
                            <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet?2:3)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                    }}>
                        <WebView
                            source={{ uri: data.url }}
                            renderLoading={()=><Loader />}
                            startInLoadingState={true}
                            onNavigationStateChange={(navState) => {
                                if (navState.url) {
                                    const url = new URL(navState.url)
                                    if (url.origin == 'https://app.kbshop.com') {
                                        data.getCode(url.searchParams.get('code'))
                                        closeModle()
                                    }
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

function mapStateToProps({ }) {
    return {}
}

export default connect(mapStateToProps, null)(InstaWebView);


const styles = StyleSheet.create({
    con: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: responsiveWidth(100),
        height: responsiveHeight(80),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 20,
    },
    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingVertical: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        fontSize: responsiveFontSize(tablet?1.25:2),
        color: colors.themeblue,
        paddingLeft: responsiveFontSize(2)
    }
})