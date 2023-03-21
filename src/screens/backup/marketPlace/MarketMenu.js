import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import CatIcon from "react-native-vector-icons/MaterialIcons"
import MarketIcon from "react-native-vector-icons/Fontisto"
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import CampaignIcon from "react-native-vector-icons/MaterialIcons"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

export default function MarketMenu({setActive,active}) {
    const navigation=useNavigation()
    return (
        <View>
            <View style={styles.mainCon}>
                <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==1?"rgb(7, 13, 46)":"white"}}
                onPress={()=>{
                    setActive(1)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'category' }],
                        });
                }}
                >
                    <CatIcon
                        name='category'
                        color={active==1?"white":"gray"}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==1?"white":"rgb(7, 13, 46)"}}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==2?"rgb(7, 13, 46)":"white"}}
                onPress={()=>{
                    setActive(2)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'brands' }],
                        });
                }}
                >
                    <CatIcon
                        name='branding-watermark'
                        color={active==2?"white":"gray"}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==2?"white":"rgb(7, 13, 46)"}}>Brands</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{...styles.con,backgroundColor:active==3?"rgb(7, 13, 46)":"white"}}
                onPress={()=>{
                    setActive(3)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'active' }],
                        });
                }}
                >
                    <CampaignIcon
                        name='campaign'
                        color={active==3?"white":"gray"}
                        size={responsiveFontSize(tablet?2:4)}
                    />
                    <Text style={{...styles.text,color:active==3?"white":"rgb(7, 13, 46)"}}>Active</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: responsiveFontSize(tablet?1:2),
        marginTop:responsiveFontSize(1)
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

        backgroundColor:'white',
        width:responsiveWidth(28),
        justifyContent:'center',
        alignItems:'center',
        padding:responsiveFontSize(1),
        borderRadius:responsiveFontSize(0.5)
    },
    mainCon:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:responsiveFontSize(1)
    }
})