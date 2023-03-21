import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    TouchableOpacity,
} from 'react-native';

import {
    responsiveWidth,
    responsiveFontSize,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Video from 'react-native-video';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinkIcon from "react-native-vector-icons/Entypo"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const Post = ({
    data,OnChangeModal,DataSet,index
}) => {
    const [pause, onSetPause] = useState(true);

    const sexyPlay = () => {
        if (pause) {
            onSetPause(false);
        } else {
            onSetPause(true);
        }
    };

    return (
        <TouchableOpacity
            onPress={()=>{
                OnChangeModal(true) 
                console.log(data, "datadatadatadatadatadatadata")
                DataSet(data)
            }}
            activeOpacity={0.8}
            style={{
                width: tablet?'24%':'48%',
                marginLeft:index?responsiveFontSize(0.4):0
            }}>
            <View style={styles.shopView}>
                <View style={styles.shopTop}>
                    <Icon
                        name="clock"
                        color="gray"
                        style={{ right: 7 }}
                        size={responsiveFontSize(tablet?0.75:1.5)}
                    />
                    <Text style={styles.text}>{moment(data.timestamp).format('MMM Do YYYY')}</Text>
                </View>
                <View style={{ width: '100%' }}>
                    {data.media_type == 'IMAGE' ? (
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: data.media_url }}
                        />
                    ) : data.media_type == 'VIDEO' ?
                        <>
                            <View style={styles.videoPlay}>
                                <TouchableOpacity onPress={sexyPlay} style={styles.touch}>
                                    <SimpleLineIcons
                                        name={pause ? 'control-play' : 'control-pause'}
                                        size={15}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                            <Video
                            ignoreSilentSwitch="ignore"
                                repeat
                                paused={pause}
                                playInBackground={false}
                                playWhenInactive={false}
                                disableFocus
                                resizeMode='cover'
                                source={{ uri: data.media_url }}
                                style={styles.video}></Video>
                        </> : data.media_type == 'CAROUSEL_ALBUM' ?
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: data.media_url }}
                            /> : <View style={styles.image} />
                    }
                </View>
                {data.linked?(
                    <View style={styles.linkCOn}>
                    <LinkIcon
                    name="link"
                    color={"white"}
                    size={responsiveFontSize(tablet?1:2)}
                    />
                    <Text style={{color:'white',fontSize:responsiveFontSize(tablet?0.75:1.5),marginLeft:responsiveFontSize(0.5)}}>LINKED</Text>
                </View>
                ):null}
            </View>
        </TouchableOpacity>
    );
};

export default Post;

const styles = StyleSheet.create({
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveWidth(10),
        width: responsiveWidth(10),
    },
    videoPlay: {
        height: responsiveWidth(tablet?5:10),
        width: responsiveWidth(tablet?5:10),
        backgroundColor: '#010b40',
        borderRadius: responsiveWidth(100),
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 3,
        zIndex: 999,
        right: 3,
    },
    shopView: {
        marginBottom: responsiveFontSize(0.75),
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        padding: responsiveFontSize(1),
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: responsiveFontSize(0.5),
    },
    shopTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingBottom: responsiveFontSize(0.5),
    },
    image: {
        width: '100%',
        height: responsiveHeight(tablet?18:26),
        borderRadius: responsiveFontSize(0.5),
    },
    video: {
        
        width: '100%',
        //  height: responsiveHeight(26),
        height: responsiveHeight(tablet?18:26),
        borderRadius: responsiveFontSize(0.5),

    },
    text:{
        fontSize:responsiveFontSize(tablet?0.65:1.5)
    },
    linkCOn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 42, 163, 0.61)',
        position:'absolute',
        right:responsiveFontSize(1.5),
        padding:responsiveFontSize(tablet?0.25:0.5),
        borderRadius:responsiveFontSize(tablet?0.25:0.5),
        bottom:responsiveFontSize(1.5)
    }
});
