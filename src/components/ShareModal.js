import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Linking,Platform } from 'react-native'
import BackIcon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from "../assets/colors/colors"
import { connect } from 'react-redux';
import * as favAct from "../store/actions/favouriteAct"
import Btn from './Btn';
import {useHeaderHeight} from "@react-navigation/elements"
const { width, height } = Dimensions.get('window')
function NotifyModel({ visible, closeModle, call ,currentData}) {
    // console.log("sdfddf",call())
    const navigation = useNavigation()
    const header=useHeaderHeight()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModle}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, backgroundColor: 'white', paddingTop:Platform.OS=="ios"?responsiveHeight(4):0 }}>
                <View style={{ ...styles.con}}>
                    <View style={{ ...styles.btn, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                        <TouchableOpacity onPress={() => {
                            closeModle()
                        }}>
                            <BackIcon name="arrow-back" color={colors.blue} size={responsiveFontSize(3)} />
                        </TouchableOpacity>
                        <View style={{ left: 15, flexDirection: 'column' }}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{ fontWeight: '700'}}>{currentData?.name}</Text>
                            </View>
                            {currentData?.promo!="KB0" && currentData?.promo?(
                            <Text style={{ fontSize: 12, color: 'red', fontWeight: '600' }}>GET {currentData?.discount} OFF</Text>
                            ):null}
                        </View>
                    </View>

                </View>
                <View style={{ alignItems: 'center', flex: 1, marginTop: responsiveHeight(3)}}>
                    <Image style={{ width: responsiveWidth(45), height: responsiveHeight(5) }} resizeMode='contain' source={require('./../assets/logo.png')} />
                    <Text style={{ fontWeight: '900', color: 'black', fontSize: responsiveFontSize(2) }}>{currentData?.name}</Text>
                    <View
                        style={{ marginTop: responsiveHeight(4), backgroundColor: colors.themeblue, width: responsiveWidth(40), height: responsiveWidth(40), borderRadius: responsiveHeight(40) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '800', color: 'white', fontSize: responsiveFontSize(5) }}>{currentData?.discount}</Text>
                        <Text style={{ fontWeight: '800', color: 'white', fontSize: responsiveFontSize(4) }}>OFF</Text>
                    </View>
                    <Text style={{ fontWeight: '800', color: 'green', fontSize: responsiveFontSize(3.5), marginTop: responsiveHeight(1) }}>Activated!</Text>
                    <View style={{ flex: 1, width: responsiveWidth(90), justifyContent: 'flex-end', paddingBottom: responsiveHeight(5) }}>
                        <Btn
                            text={"Got it"}
                            call={()=>{
                                call()
                                closeModle()
                            }}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    )
}

function mapStateToProps({ authRed }) {
    return { authRed }
}

export default connect(mapStateToProps, favAct)(NotifyModel);


const styles = StyleSheet.create({
    con: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        // height: responsiveFontSize(100),
        borderRadius: 20,
        // position: 'absolute', top: 0
    },
    iconCon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: responsiveFontSize(2),
        paddingVertical: responsiveFontSize(1.2),
    },
    icon: {
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#001441',
        width: '18%',
        height: '18%',
        borderRadius: '18%' / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})