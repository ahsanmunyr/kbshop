import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../../../../assets/colors/colors'
import Btn from '../../../../components/Btn'
import BackIcon1 from 'react-native-vector-icons/Ionicons';
import deviceInfo from 'react-native-device-info';


const tablet = deviceInfo.isTablet();


export default function ShippingMethod({setShippingPage}) {

    function renderAddress({ item, index }) {
        return (
            <TouchableOpacity style={{ width: responsiveWidth(35), borderWidth: 1, borderColor: 'lightgray', borderRadius: responsiveFontSize(0.5), margin: responsiveFontSize(1), padding: responsiveFontSize(1.5), backgroundColor: index == 0 ? colors.themeblue : "white" }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: index == 0 ? "white" : "gray" }}>150 Columbus Avenue PH3B New York, 10023 New York</Text>
            </TouchableOpacity>
        )
    }

    function renderShippingMethod(item, index) {
        return (
            <TouchableOpacity key={index} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: responsiveFontSize(0.5), paddingVertical: responsiveFontSize(1), borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
                <View style={{ width: '15%', alignItems: 'center' }}>
                    <View
                        style={{ backgroundColor: index == 0 ? colors.themeblue : "white", borderColor: index == 0 ? colors.themeblue : "gray", borderWidth: 1, width: responsiveFontSize(2.5), height: responsiveFontSize(2.5), borderRadius: responsiveFontSize(1.5) }}
                    />
                </View>
                <View style={{ width: '65%' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.35), color: 'black' }}>UPS Ground Residential (3-5 Business Days)</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.35), color: 'gray' }}>(1 business days)</Text>

                </View>
                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.5), color: 'black' }}>$17.89</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row',alignItems:'center',paddingLeft: responsiveFontSize(1)}}>
                <TouchableOpacity
                    onPress={() =>setShippingPage("") }
                    style={{ paddingRight: responsiveFontSize(2) }}>
                    <BackIcon1
                        name="arrow-back"
                        color={'black'}
                        size={responsiveFontSize(tablet ? 2 : 3)}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: responsiveFontSize(2), color: colors.themeblue, fontWeight: 'bold' }}>Shipping</Text>
            </View>
            <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: responsiveFontSize(0.5), margin: responsiveFontSize(1) }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: colors.themeblue }}>Contact</Text>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: 'gray' }}>email@gmail.com</Text>
            </View>
            <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: responsiveFontSize(0.5), margin: responsiveFontSize(1) }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: colors.themeblue }}>Shipt to</Text>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: 'gray' }}>121 Varick Street, New York NY 10013, United States</Text>
            </View>
            <View style={{ padding: responsiveFontSize(0.5), margin: responsiveFontSize(1), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: colors.themeblue }}>More Addresses</Text>
                <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: responsiveFontSize(0.5) }}>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.25), paddingVertical: responsiveFontSize(0.5), paddingHorizontal: responsiveFontSize(1) }}>Add new address</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={[1, 1, 1, 1, 1, 1]}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={renderAddress}
            />
            <View style={{ padding: responsiveFontSize(0.5), margin: responsiveFontSize(1), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: colors.themeblue }}>Shipping method</Text>
            </View>
            <View style={{ borderColor: 'lightgray', borderWidth: 1, margin: responsiveFontSize(1), backgroundColor: 'white', borderRadius: responsiveFontSize(0.5) }}>
                {
                    [1, 1, 1, 1, 1, 1].map((item, index) => {
                        return renderShippingMethod(item, index)
                    })
                }
            </View>
            <View style={{ margin: responsiveFontSize(0.5) }}>
                <Btn
                    text={"Continue Payment"}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})