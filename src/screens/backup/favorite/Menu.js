import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import CatIcon from "react-native-vector-icons/MaterialIcons"
import InfIcon from "react-native-vector-icons/Entypo"
import SpareIcon from "react-native-vector-icons/Entypo"
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import deviceInfo from "react-native-device-info"
import colors from '../../assets/colors/colors'

const tablet=deviceInfo.isTablet()

export default function HomeMenu({setActive,active}) {
    return (
        <View>
            <View style={styles.mainCon}>
            <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==3?"rgb(7, 13, 46)":"#f5f5f5"}}
                onPress={()=>{
                    // alert("comming soon")
                    setActive(3)
                }}
                >
                    <SpareIcon
                        name='images'
                        color={active==3?"white":colors.themeblue}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==3?"white":"rgb(7, 13, 46)"}}>My List</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==1?"rgb(7, 13, 46)":"#f5f5f5"}}
                onPress={()=>{
                    setActive(1)
                }}
                >
                    <CatIcon
                        name='branding-watermark'
                        color={active==1?"white":colors.themeblue}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==1?"white":"rgb(7, 13, 46)"}}>Brands</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==2?"rgb(7, 13, 46)":"#f5f5f5"}}
                onPress={()=>{
                    setActive(2)
                }}
                >
                    <InfIcon
                        name='users'
                        color={active==2?"white":colors.themeblue}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==2?"white":"rgb(7, 13, 46)"}}>Influencers</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: responsiveFontSize(tablet?1:2),
        marginTop:responsiveFontSize(1),
        fontWeight:'bold'
    },
    con: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,

        // backgroundColor:'white',
        // width:responsiveWidth(28),
        justifyContent:'center',
        alignItems:'center',
        padding:responsiveFontSize(1),
        borderRadius:responsiveFontSize(1.5),
        width: responsiveWidth(28), height: responsiveScreenFontSize(14)
    },
    mainCon:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:responsiveFontSize(1)
    }
})