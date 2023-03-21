// @ts-nocheck
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from "../assets/colors/colors"
import deviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const tablet = deviceInfo.isTablet();

function LiveBox({ liveText, call, item, event, authRed, passedStyle }) {
    return (
        <TouchableOpacity onPress={call}>
            <ImageBackground

                style={[styles.con,passedStyle]}
                resizeMode={item?.banner === 'https://static.konnect.bio/eventdefaultbanner/banner.png' ? 'contain' : 'cover'}
                source={item ? { uri: item.banner} : require('../assets/picture.webp')
                }
            >
                {
                    event == "upcoming" &&
                    <>
                        {
                            item?.discount !== undefined && item?.discount !== '' && item?.discount !== '0%' &&  item?.discount !== 'undefined'  ?
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    // width: tablet? responsiveWidth(10): responsiveWidth(14),
                                    paddingHorizontal: responsiveFontSize(tablet?0.5:1),
                                    height:tablet? responsiveScreenFontSize(1.25): responsiveScreenFontSize(1.9),
                                    borderRadius: responsiveScreenFontSize(3),
                                    position: "absolute", top:tablet? responsiveFontSize(0.25): responsiveFontSize(0.5),
                                    right: 5, justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'red', fontSize: tablet? responsiveScreenFontSize(0.75): responsiveScreenFontSize(1.2),
                                        fontWeight: 'bold'
                                    }}>{item?.discount} Off</Text>
                                </View> : null
                        }
                    </>
                }

                <View style={styles.overlay} />
                {
                    event != 'influencerReviews'?
                    <View style={styles.liveCon}>
                    <Text style={styles.liveText}>{liveText}</Text>
                    </View>:
                      <View style={styles.influencerCon}>
                        <FontAwesome
                            name={'play'}
                            size={responsiveScreenFontSize(tablet?0.6:1)}
                            color={'white'}
                            style={{
                         
                            }}
              />
                      <Text style={styles.liveText}>56.7K</Text>
                      </View>
              
                }
        
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={styles.head}>{item ? item.title : "FASHION FAIR MAKEUP RELAUNCHING"}</Text>
                    <View style={styles.bottom}>
                        <View style={{
                            justifyContent:'center',alignItems:'center',
                            width: responsiveHeight(tablet ? 3 : 4.3),
                            height:responsiveHeight(tablet ? 3 : 4.3),
                            borderRadius: responsiveScreenFontSize(50),
                            borderWidth: 1,borderColor: 'white'
                        }}>
                        <Image
                        // resizeMode='contain'
                            style={{
                                width: responsiveHeight(tablet ? 3 : 4.2),
                                height:responsiveHeight(tablet ? 3 : 4.2),
                                borderRadius: responsiveScreenFontSize(50)
                            }}
                            source={event=='influencerReviews'?(item?.influencer?.profile_image_url !== "" ? {uri:item?.influencer?.profile_image_url} : 
                            require('../assets/user.png')
                            ):{ uri: item?.brand_profile || item?.brand?.profile_image_url}}
                        />
                        </View>
                        <Text style={{width: tablet ? responsiveWidth(20): responsiveWidth(25), color: 'white', fontSize: responsiveFontSize(tablet ? 0.75 : 1.2), marginLeft: responsiveFontSize(0.5), fontWeight:'700' }}>{event=='influencerReviews'?item?.influencer?.name:(item?.brand_name || item?.brand?.brand_name)}</Text>
                    </View>
                </View>
                {
                    authRed.data.account_type == 'customer' ?
                        <>
                            {

                                event == "upcoming" &&
                                <>
                                    {
                                        item?.referral_percent !== 'undefined' && item?.referral_percent !== '' && item?.referral_percent !== '0' ?
                                            <View style={{

                                                width: responsiveWidth(20),
                                                height: responsiveScreenFontSize(6),
                                                position: "absolute", bottom: tablet? -responsiveFontSize(5):  -35,
                                                right: tablet? -responsiveFontSize(2): responsiveFontSize(0.25), justifyContent: 'space-between', alignItems: 'center', flexDirection: "column"
                                            }}>
                                                
                                                <Text style={{
                                                    color: 'white', fontSize: tablet? responsiveScreenFontSize(0.6):  responsiveScreenFontSize(1),
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item?.referral_percent}% Referral Fee
                                                </Text>
                                            </View> : null
                                    }
                                </>

                            }
                        </> :
                        <>
                            {

                                event == "upcoming" &&
                                <>
                                    {
                                        item?.influencer_percent != undefined && item?.influencer_percent != 'undefined'  && item?.influencer_percent !== '' && item?.influencer_percent !== '0' ?
                                            <View style={{

                                                width: responsiveWidth(20),
                                                height: responsiveScreenFontSize(6),
                                                position: "absolute", bottom: tablet? -responsiveFontSize(5):  -35,
                                                right: tablet? -responsiveFontSize(2): responsiveFontSize(0.25), justifyContent: 'space-between', alignItems: 'center', flexDirection: "column"
                                            }}>
                                                {/* {console.log(item?.influencer_percent , "===============================")} */}
                                                <Text style={{
                                                     color: 'white', fontSize: tablet? responsiveScreenFontSize(0.6):  responsiveScreenFontSize(1),
                                                     fontWeight: 'bold'
                                                }}>
                                                    {item?.influencer_percent}% Influencer Fee
                                                </Text>
                                            </View> : null
                                    }
                                </>

                            }
                        </>
                }

            </ImageBackground>
        </TouchableOpacity>
    )
}



function mapStateToProps({ authRed }) {
    return { authRed };
}

export default connect(mapStateToProps, null)(LiveBox);


const styles = StyleSheet.create({
    con: {
        width: responsiveFontSize(tablet ? 10.5 : 18),
        height: responsiveFontSize(tablet ? 17  : 29),
        marginRight: responsiveFontSize(tablet ? 0.5 : 1),
        backgroundColor: colors.themeblue
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    liveText: {
        color: 'white',
        fontSize: responsiveFontSize(tablet ? 0.6 : 1),
        fontWeight:'bold'
    },
    liveCon: {
        backgroundColor: colors.themeblue,
        padding: responsiveFontSize(0.25),
        width: responsiveWidth(tablet ? 10 : 16),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveFontSize(tablet ? 0.7 : 0.8),
        margin: responsiveFontSize(tablet?0.3:0.5),
        
    },
    influencerCon: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: responsiveFontSize(0.25),
        width: responsiveWidth(tablet ? 9 : 12),
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: responsiveFontSize(tablet ? 1 : 0.8),
        margin: responsiveFontSize(tablet?0.3:0.5),
        flexDirection:'row'
    },
    head: {
        marginTop: responsiveHeight(8),
        color: 'white',
        fontWeight: 'bold',
        margin: responsiveFontSize(0.5),
        textTransform: 'uppercase',
        fontSize: tablet? responsiveFontSize(0.85): responsiveFontSize(1.5)
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: responsiveFontSize(0.5),
        marginVertical: responsiveFontSize(0.75)
    }
})