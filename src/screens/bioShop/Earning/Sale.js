import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import numeral from "numeral"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

export default function Sale({ data, groupBy }) {
    return (
        <View style={styles.con}>
            {/* <View style={styles.header}>
                <View style={{ ...styles.box, width: '10%' }}>
                    <Text style={{ ...styles.text, color: 'white' }}>1)</Text>
                </View>
                <View style={{ ...styles.box, width: '80%' }}>
                    <Text style={{ ...styles.text, color: 'white' }}>ORDER# {data.order_id}</Text>
                </View>
            </View> */}
            <View style={{ width: '100%', padding: responsiveFontSize(tablet?0.25:0.5) }}>
                {data.campaign_name ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.fieldBox}>
                            <Text style={[styles.text, { fontWeight: (groupBy == "" || groupBy == "campaign") ? "bold" : null }]}>Campaign Name :</Text>
                            <Text style={[styles.text, , { fontWeight: (groupBy == "" || groupBy == "campaign") ? "bold" : null }]}>{data.campaign_name}</Text>
                        </View>
                    </View>
                ) : null}
                {data.advertiser_name ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.fieldBox}>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "brand" ? "bold" : null }}>Brand Name :</Text>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "brand" ? "bold" : null }}>{data.advertiser_name}</Text>
                        </View>
                    </View>
                ) : null}
                {data.influencer_name && groupBy=="influencer" ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.fieldBox}>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "influencer" ? "bold" : null }}>Influencer :</Text>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "influencer" ? "bold" : null }}>{data.influencer_name}</Text>
                        </View>
                    </View>
                ) : null}
                {data.created_date ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.fieldBox}>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "date" ? "bold" : null }}>Date :</Text>
                            <Text style={{ ...styles.text, fontWeight: groupBy == "date" ? "bold" : null }}>{data.created_date}</Text>
                        </View>
                    </View>
                ) : null}
                {data.order_id ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.fieldBox}>
                            <Text style={styles.text}>Order# : </Text>
                            <Text style={styles.text}>{data.order_id}</Text>
                        </View>
                    </View>
                ) : null}
                {data.total_qty == 0 || data.total_qty ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ ...styles.fieldBox }}>
                            <Text style={styles.text}>Quantity :</Text>
                            <Text style={styles.text}>{numeral(data.total_qty).format("0,0")}</Text>
                        </View>
                    </View>
                ) : null}
                {data.total_sale == 0 || data.total_sale ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ ...styles.fieldBox }}>
                            <Text style={styles.text}>Gross Sales :</Text>
                            <Text style={styles.text}>${numeral(data.total_sale).format("0,0.00")}</Text>
                        </View>
                    </View>
                ) : null}
                {data.order_totalprice == 0 || data.order_totalprice ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ ...styles.fieldBox }}>
                            <Text style={styles.text}>Net Sales :</Text>
                            <Text style={styles.text}>${numeral(data.order_totalprice).format("0,0.00")}</Text>
                        </View>
                    </View>
                ) : null}
                {data.influencer_commission == 0 || data.influencer_commission ? (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ ...styles.fieldBox, borderBottomWidth: 0 }}>
                            <Text style={styles.text}>Commission Earn :</Text>
                            <Text style={styles.text}>${numeral(data.influencer_commission).format("0,0.00")}</Text>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    con: {
        backgroundColor: "white",
        width: '98%',
        alignSelf:'center',
        marginBottom: responsiveFontSize(1),
        borderRadius: responsiveFontSize(tablet?0.25:0.5),
        borderColor: colors.themeblue,
        borderWidth: 0.5
    },
    text: {
        fontSize: responsiveFontSize(tablet?1:1.5)
    },
    header: {
        backgroundColor: colors.themeblue,
        flexDirection: 'row',
        padding: responsiveFontSize(0.75),
        borderTopLeftRadius: responsiveFontSize(0.5),
        borderTopRightRadius: responsiveFontSize(0.5)
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldBox: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: responsiveFontSize(tablet?0.5:1),
        justifyContent: 'space-between',
        paddingVertical: responsiveFontSize(tablet?0.3:0.5),
        borderBottomColor: 'gray',
        borderBottomWidth: 0.75
    }
})