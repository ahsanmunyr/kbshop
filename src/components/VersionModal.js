import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native';
import IconSuccess from 'react-native-vector-icons/Octicons';
import { useTheme } from '@react-navigation/native'
import colors from '../assets/colors/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import IconCross from "react-native-vector-icons/Entypo"
import Btn from './Btn';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const { width, height } = Dimensions.get('window');
function VersionModal({ visible, closeModle, title, reDirect }) {
    // const {colors} = useTheme();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                <View style={{ ...styles.con, backgroundColor: colors.white }}>
                    <View style={{ width: '95%', alignItems: 'flex-end', marginTop: responsiveFontSize(1) }}>
                        <TouchableOpacity onPress={() => {
                            closeModle()
                        }}>
                            <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet ? 2 : 3)} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                        <IconSuccess name="versions" color={colors.themeblue} size={responsiveFontSize(5)} />
                        <Text
                            style={{
                                color: 'black',
                                marginTop: responsiveFontSize(2),
                                textAlign: 'center',
                                fontSize: responsiveFontSize(tablet?1.5:2),
                                fontWeight: 'bold',
                                width: '90%',
                            }}>
                            New Version Available
                        </Text>
                        <Text
                            style={{
                                color: 'gray',
                                marginTop: 5,
                                textAlign: 'center',
                                fontSize: responsiveFontSize(tablet?1:1.5),
                                width: '90%',
                            }}>
                            There is a newer version available for download! please update the app by visiting the {Platform.OS == "ios" ? "Apple Store" : "Play Store"}
                        </Text>
                    </View>
                    <View style={{ width: '90%', marginBottom: responsiveFontSize(1.5) }}>
                        <Btn
                        call={()=>{
                            if(Platform.OS=="ios"){
                                Linking.openURL('https://apps.apple.com/us/app/kbshop/id1618762939')
                            }else{
                                Linking.openURL('https://play.google.com/store/apps/details?id=com.konnectbio1961')
                            }
                        }}
                        text={"Update"}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    con: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: responsiveWidth(tablet?50:70),
        height: responsiveHeight(tablet?40:35),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: responsiveFontSize(tablet?0.5:1),
    },
    iconCon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginTop: 15,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: responsiveFontSize(1),
        borderBottomLeftRadius: responsiveFontSize(1),
    },
    btnText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 2,
    },
    icon: {
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#001441',
        width: '18%',
        height: '18%',
        borderRadius: '18%' / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default VersionModal;
