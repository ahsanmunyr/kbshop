
// @ts-nocheck
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Pressable
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
import FontAwesome from "react-native-vector-icons/FontAwesome"
import colors from '../../../../assets/colors/colors';

const tablet = deviceInfoModule.isTablet();

const ShareModal = ({ opens, close, portrait, index}) => {
    useEffect(() => {

    }, [])

    return (

        <Modal
        key={index}
            animationType="fade"
            transparent={true}
            style={{
                flex: 1,
                justifyContent: 'center',
                elevation: 5,

            }}
            onRequestClose={() => {
                portrait(false)
                close(false)
            }}
            statusBarTranslucent={true}
            visible={opens}>

            <View style={styles.modalCont}>
                <TouchableWithoutFeedback onPress={() => {
                    portrait(false)
                    close(false)
                }}>
                    <View style={styles.modalViews}></View>
                </TouchableWithoutFeedback>
                <View style={styles.modalView}>
                    <View style={{
                        width: '100%',
                        height: responsiveScreenFontSize(5),
                        justifyContent: 'space-between',
                        alignItems: 'flex-end', flexDirection: 'row'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '50%' }}>
                            <FontAwesome
                                name="share-square-o"
                                color={colors.themeblue}
                                size={responsiveFontSize(tablet ? 1 : 3)}
                            />
                            <Text style={{ color: colors.themeblue, fontSize: responsiveScreenFontSize(3), fontWeight: 'bold' }}>{'  '}Share</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                portrait(false)
                                close(false);
                            }}>
                            <CrossIcon
                                name="cross"
                                color={'#010b40'}
                                size={responsiveFontSize(tablet ? 2 : 3)}
                            />

                        </TouchableOpacity>
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
        // justifyContent: '',
        // alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalView: {
        width: responsiveWidth(100),
        backgroundColor: 'white',
        height: responsiveScreenFontSize(40),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
    modalViews: {
        width: responsiveWidth(100),
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: responsiveScreenFontSize(60),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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

export default connect(mapStateToProps, null)(ShareModal);

