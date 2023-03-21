import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import colors from '../../../assets/colors/colors'
import deviceInfoModule from 'react-native-device-info';

const tablet = deviceInfoModule.isTablet();

export default function Item({ data, index, group, onSetmodalOpen, modalOpen,setData }) {
    return (
        <TouchableOpacity key={index} 
            onPress={()=>{
                // onSetmodalOpen(!modalOpen)
                setData(data)
            }}
        style={{
            width: '100%',
            height: responsiveScreenFontSize(6)
        }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ width: '7%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), color: colors.themeblue, fontWeight: '300', textAlign: 'center' }}>{index + 1}</Text>
                </View>
                <View style={{ width: '20%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), color: colors.themeblue, fontWeight: '300', textAlign: 'left' }}>{
                        group == 'date' ? data?.created_date : group == 'category' ? data?.category_name
                            : group == 'brand' ? data?.brand_name : data?.created_date}</Text>
                </View>

                <View style={{ width: '15%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), color: data?.order_id && 'blue', fontWeight: '300', textAlign: 'left' }}>{data?.order_id ? data?.order_id : data?.order_count
                    }</Text>
                </View>
                <View style={{ width: '16%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontSize:responsiveFontSize(tablet ? 1 : 1.5), color: colors.themeblue, fontWeight: '300', textAlign: 'left' }}>{data?.event == "eventshop" ? "Event" : "Social Store"}</Text>
                </View>
                {
                    group == 'none' ?
                        <View style={{ width: '15%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), color: colors.themeblue, fontWeight: '300', textAlign: 'left' }}>{data?.brand_name}</Text>
                        </View> : null
                }

                <View style={{ width: '7%', paddingVertical:responsiveHeight(tablet ? 1 : 1.8), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1 : 1.5), color: colors.themeblue, fontWeight: '300', textAlign: 'left' }}>{data?.total_qty}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}