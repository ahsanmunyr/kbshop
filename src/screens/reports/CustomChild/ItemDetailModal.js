// @ts-nocheck
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import colors from '../../../assets/colors/colors';
import DropDownComp from '../../../components/DropDownComp';
import Btn from '../../../components/Btn';

const tablet = deviceInfoModule.isTablet();

const ItemDetailModal = ({ opens, close, data }) => {
    console.log(data, "=========================");


    function renderItem({ item, index }) {
        return (
            <View key={index} style={{
                width: responsiveWidth(92),
                height: responsiveScreenFontSize(5),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: responsiveScreenFontSize(1), borderTopLeftRadius: responsiveScreenFontSize(1), borderTopRightRadius: responsiveScreenFontSize(1)
            }}>
                <Text style={{ fontSize: responsiveScreenFontSize(2), width: responsiveWidth(30), textAlign: 'left', left: responsiveScreenFontSize(1.5) }}>
                    13168
                </Text>
                <Text style={{ fontSize: responsiveScreenFontSize(2), width: responsiveWidth(20), textAlign: 'center' }}>
                    1
                </Text>
                <Text style={{ fontSize: responsiveScreenFontSize(2), width: responsiveWidth(20), textAlign: 'center' }}>
                    $159
                </Text>
            </View>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            style={{
                flex: 1,
                justifyContent: 'center',
                elevation: 5,
            }}
            onRequestClose={close}
            statusBarTranslucent={true}
            visible={opens}>
            <View style={styles.modalCont}>
                <View style={styles.modalView}>
                    <View style={{
                        width: responsiveWidth(88),
                        height: responsiveScreenFontSize(5),
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        alignSelf: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '60%'
                        }}>
                            <Text style={{
                                color: colors.themeblue,
                                fontSize: responsiveScreenFontSize(3)
                            }}>Order Details</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                close(false);
                            }}>
                            <CrossIcon
                                name="cross"
                                color={'#010b40'}
                                size={responsiveFontSize(tablet ? 2 : 3)}
                            />

                        </TouchableOpacity>
                    </View>


                    <View style={{ width: '100%', height: responsiveScreenFontSize(0.05), backgroundColor: '#b8b8b8', marginVertical: responsiveScreenFontSize(0.7), zIndex: -1 }} />
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', alignSelf: 'center', height: responsiveScreenFontSize(5)
                    }}>
                        <Text style={{ color: 'black', fontSize: responsiveScreenFontSize(2), fontWeight: 'bold' }}>#{data?.order_id}</Text>
                        <Text>{moment(data?.created_date).format('MMMM Do YYYY')} from Online Store</Text>
                    </View>
                    <View style={{
                        alignSelf: 'center', minHeight: responsiveScreenFontSize(10), maxHeight: responsiveScreenFontSize(22), marginVertical: responsiveScreenFontSize(1),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        backgroundColor: 'white', borderRadius: responsiveScreenFontSize(1)
                    }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{ height: responsiveScreenFontSize(0.1), width: responsiveWidth(92), backgroundColor: 'grey' }}></View>
                                )
                            }}
                            data={[1, 2, 3]}
                            style={{

                            }}
                            ListHeaderComponent={
                                <View style={{
                                    backgroundColor: colors.themeblue,
                                    width: responsiveWidth(92),
                                    height: responsiveScreenFontSize(5),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: responsiveScreenFontSize(1), borderTopLeftRadius: responsiveScreenFontSize(1), borderTopRightRadius: responsiveScreenFontSize(1)
                                }}>
                                    <Text style={{ color: 'white', fontSize: responsiveScreenFontSize(2), fontWeight: 'bold', width: responsiveWidth(30), textAlign: 'center' }}>
                                        Product SKU
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: responsiveScreenFontSize(2), fontWeight: 'bold', width: responsiveWidth(20), textAlign: 'center' }}>
                                        Quantity
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: responsiveScreenFontSize(2), fontWeight: 'bold', width: responsiveWidth(20), textAlign: 'center' }}>
                                        Amount
                                    </Text>
                                </View>
                            }
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    </View>
                    <View style={{
                        borderWidth: 1,
                        width: responsiveWidth(92),
                        // height: responsiveScreenFontSize(15), 
                        borderRadius: responsiveScreenFontSize(1),
                        borderColor: '#f5f5f5',
                        alignSelf: 'center',
                        paddingHorizontal: responsiveScreenFontSize(1),
                        paddingVertical: responsiveScreenFontSize(1),
                        marginVertical: responsiveScreenFontSize(1), flexDirection: 'column', justifyContent: 'space-between',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        backgroundColor: 'white',
                    }}>
                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'column', }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    Subtotal       <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                        2 item</Text></Text>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    2</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    Discount</Text>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    $3242</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    Total</Text>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    $435</Text>
                            </View>


                            <View style={{ width: '100%', height: responsiveScreenFontSize(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    Paid by customer</Text>
                                <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center' }}>
                                    2</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: responsiveScreenFontSize(0.05), backgroundColor: '#b8b8b8', marginVertical: responsiveScreenFontSize(0.7), zIndex: -1 }} />
                    <View style={{ height: responsiveScreenFontSize(12), width: '100%', alignSelf: 'center', justifyContent: 'center', zIndex: -1 }}>


                        <Btn text="Close" call={() => {
                            close(false);
                        }} />
                    </View>
                    <View style={{ height: responsiveScreenFontSize(4) }} />
                </View>

            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    btn: {
        height: responsiveFontSize(4),
        width: responsiveFontSize(20),
        margin: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        width: responsiveWidth(100),
        backgroundColor: 'white',
        height: responsiveScreenFontSize(80),
        borderRadius: responsiveScreenFontSize(1),
        paddingTop: 15,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeadCont: {
        alignSelf: 'flex-end',
    },
    crossBtn: {
        alignItems: 'flex-end',
        width: responsiveWidth(6),
    },
    modalBody: {},
    sortByCont: {
        marginVertical: responsiveHeight(1),
    },
    datePicker: {
        backgroundColor: 'white',
        width: responsiveWidth(40),
        height: responsiveHeight(4.5),
        borderRadius: responsiveFontSize(0.5),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        justifyContent: 'center',
    },
});

function mapStateToProps({ }) {
    return {

    };
}

export default connect(mapStateToProps, null)(ItemDetailModal);
