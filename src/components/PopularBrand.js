// @ts-nocheck
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from "../assets/colors/colors"
import deviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
const tablet = deviceInfo.isTablet();

function PopularBrand({ liveText, data, call,index}) {

    return (
        <TouchableOpacity 
        onPress={call}
        key={index}
        >
            <ImageBackground
                style={styles.con}
                source={data ? { uri: data.banner,
                    cache: 'only-if-cached'  } : require('../assets/picture.webp')
                }
            >
                

                <View style={styles.overlay} />
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {/* <Text style={styles.head}>{data ? data.title : "FASHION FAIR MAKEUP RELAUNCHING"}</Text> */}
                    <View style={styles.bottom}>
                        <Image
                            resizeMode='contain'
                            style={{
                                width: tablet ? responsiveHeight(5) : responsiveHeight(3),
                                height: tablet ?  responsiveHeight(5) : responsiveHeight(3),
                                borderRadius: tablet ?  responsiveHeight(50) : responsiveHeight(50)
                            }}
                            source={data.avatar ? { uri: data.avatar, 
                                cache: 'only-if-cached'  } : require('../assets/logo22new.png')}
                        />
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(tablet ? 0.65 : 1.2), marginLeft: responsiveFontSize(0.5) }}>{data.title}</Text>
                    </View>
                </View>
              

            </ImageBackground>
        </TouchableOpacity>
    )
}



function mapStateToProps({ authRed }) {
    return { authRed };
}

export default connect(mapStateToProps, null)(PopularBrand);


const styles = StyleSheet.create({
    con: {
        width: responsiveWidth(tablet ? 20 : 45),
        height: responsiveHeight(tablet ? 20 : 34),
        marginRight: responsiveFontSize(tablet ? 0.5 : 1),
        backgroundColor: colors.themeblue
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    liveText: {
        color: 'white',
        fontSize: responsiveFontSize(tablet ? 0.5 : 1),
        fontWeight:'bold'
    },
    liveCon: {
        backgroundColor: colors.themeblue,
        padding: responsiveFontSize(0.25),
        width: responsiveWidth(tablet ? 8 : 16),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveFontSize(tablet ? 0.3 : 0.8),
        margin: responsiveFontSize(0.5),
        
    },
    head: {
        marginTop: responsiveHeight(8),
        color: 'white',
        fontWeight: 'bold',
        margin: responsiveFontSize(0.5),
        textTransform: 'uppercase'
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: responsiveFontSize(0.5),
        marginHorizontal:responsiveScreenFontSize(1),
        marginVertical: responsiveFontSize(1)
    }
})