import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import IconCross from 'react-native-vector-icons/Entypo';
import {
    responsiveWidth,
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import * as instaAct from '../store/actions/instagram';
import { connect } from 'react-redux';
import * as actions from '../store/actions/bioShop';
import colors from '../assets/colors/colors';
import Toast from 'react-native-toast-message';
import deviceInfo from "react-native-device-info"
import TitleIcon from "react-native-vector-icons/MaterialCommunityIcons"
import InputField from './InputField';
import Btn from './Btn';
import AddMediaPicker from "./AddMediaPicker"
import AutoHeightImage from 'react-native-auto-height-image';
import Video from 'react-native-video';
const tablet = deviceInfo.isTablet()

const AddGalleryModal = ({
    visible,
    closeModal,
    addMedia,
    reloadData
}) => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(false)
    const [video, setVideo] = useState(false)
    const [uploadMediaType, setUploadMediaType] = useState("IMAGE")
    const [mediaPicker, setMediaPicker] = useState(false)
    const [loading,setLoading]=useState(false)
    const [submit,setSubmit]=useState(false)

    function onUpload() {
        setSubmit(true)
        if (uploadMediaType === "IMAGE") {
            if(image){
                setLoading(true)
                let file = {
                    uri: image?.uri,
                    name: image?.fileName,
                    type: image?.type,
                  };
        
                const formData=new FormData()
                formData.append('title',title)
                formData.append('image',file)
                formData.append('media_type',"IMAGE")
                // console.log(file)
                addMedia(formData,(res)=>{
                    Toast.show({type:'success',text1:res?.message})
                    setLoading(false)
                    setTitle("")
                    setImage(false)
                    setVideo(false)
                    setSubmit(false)
                    closeModal(false)
                    reloadData()
                },()=>{
                    setTitle("")
                    setImage(false)
                        setVideo(false)
                    setSubmit(false)
                    setLoading(false)
                })
            }
        }else{
            if(video){
                setLoading(true)
                let file = {
                    uri: video?.uri,
                    name: video?.fileName,
                    type: video?.type,
                  };
        
                const formData=new FormData()
                formData.append('title',title)
                formData.append('image',file)
                formData.append('media_type',"VIDEO")
                // console.log(file)
                addMedia(formData,(res)=>{
                    Toast.show({type:'success',text1:res?.message})
                    setLoading(false)
                    setTitle("")
                    setImage(false)
                    setVideo(false)
                    setSubmit(false)
                    closeModal(false)
                    reloadData()
                },()=>{
                    setTitle("")
                    setImage(false)
                    setVideo(false)
                    setSubmit(false)
                    setLoading(false)
                })
            }
        }
        
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}
            onRequestClose={() => {
                closeModal(false);
                setLoading(false)
                setTitle("")
                setImage(false)
                setVideo(false)
                setSubmit(false)
            }}>
            <AddMediaPicker
                visible={mediaPicker}
                closeModle={() => {
                    setMediaPicker(false);
                    //     setTitle("")
                }}
                setImage={uploadMediaType === "IMAGE" ? setImage : setVideo}
                mediaType={uploadMediaType}
            />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ ...styles.btn, backgroundColor: "white" }}>
                        <Text style={styles.title}>Upload Media</Text>
                        <TouchableOpacity 
                        onPress={() => {
                            closeModal()
                            setLoading(false)
                            setTitle("")
                            setImage(false)
                            setVideo(false)
                            setSubmit(false)
                        }}>
                            <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet ? 2 : 3)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '90%' }}>
                        <InputField
                            value={title}
                            // error={submit && !title?true:false}
                            getValue={setTitle}
                            placeHolder="Media Title"
                            color={"gray"}
                            icon={() => {
                                return (
                                    <TitleIcon name="subtitles-outline" color={colors.themeblue} size={responsiveFontSize(tablet ? 1.25 : 2.2)} />
                                )
                            }}
                        />
                        {image || video ? (
                            <View>
                                <View style={{position:'absolute',right:responsiveFontSize(1),top:responsiveFontSize(1),zIndex:1}}>
                                    <TouchableOpacity
                                    style={{backgroundColor:'rgba(255,255,255,0.5)',borderRadius:responsiveFontSize(0.5)}}
                                    onPress={()=>{setImage(false); setVideo(false)}}
                                    >
                                        <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet ? 2 : 3)} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    uploadMediaType === "IMAGE" ? 
                                    <AutoHeightImage
                                        source={{ uri: image.uri }}
                                        width={responsiveWidth(tablet ? 76.5 : 74.4)}
                                        style={{ borderRadius: responsiveFontSize(tablet ? 0.4 : 0.75), marginBottom: responsiveFontSize(0.5) }}
                                    /> 
                                    :
                                    <Video
                                        repeat
                                        resizeMode="cover"
                                        // paused={pause}
                                        ignoreSilentSwitch="ignore"
                                        playInBackground={false}
                                        playWhenInactive={false}
                                        disableFocus
                                        source={{uri: video.uri}}
                                        style={{width: '100%', 
                                            height: responsiveHeight(40),
                                            marginBottom: responsiveFontSize(0.5),
                                            borderRadius: responsiveFontSize(tablet ? 0.4 : 0.75)}}>
                                    </Video>
                                }
                            </View>
                        ) : (
                            <>
                                {/* For image */}
                                <View style={{ marginVertical: responsiveFontSize(1), borderColor:submit && !image?'red': 'lightgray', borderRadius: responsiveFontSize(tablet ? 0.4 : 0.75), borderWidth: 1, padding: responsiveFontSize(1) }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }}>Upload your image</Text>
                                    <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.25), marginVertical: responsiveFontSize(0.5) }}>PNG, JPG, SVG & GIF Files Are Allowed</Text>
                                    <Btn
                                        call={() => {
                                            setMediaPicker(true)
                                            setUploadMediaType("IMAGE")
                                            setTitle("Post")
                                        }}
                                        text={"Upload Image"}
                                    />
                                </View>
                                <Text style={{textAlign:"center"}}>OR</Text>
                                {/* For video */}
                                <View style={{ marginVertical: responsiveFontSize(1), borderColor:submit && !video?'red': 'lightgray', borderRadius: responsiveFontSize(tablet ? 0.4 : 0.75), borderWidth: 1, padding: responsiveFontSize(1) }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }}>Upload your video</Text>
                                    <Text style={{ color: 'gray', fontSize: responsiveFontSize(1.25), marginVertical: responsiveFontSize(0.5) }}>MP4 Files Are Allowed</Text>
                                    <Btn
                                        call={() => {
                                            setMediaPicker(true)
                                            setUploadMediaType("VIDEO")
                                            setTitle("Video")
                                        }}
                                        text={"Upload Video"}
                                    />
                                    </View>
                            </>
                        )}

                        <View>
                            <Btn
                                loader={loading}
                                call={onUpload}
                                text={"Save Media"}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        opacity: 1,
        width: responsiveScreenWidth(90),
        minHeight: responsiveScreenHeight(55),
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingVertical: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        fontSize: responsiveFontSize(tablet ? 1.25 : 2),
        color: colors.themeblue,
        paddingLeft: responsiveFontSize(2)
    }
});

function mapStateToProps({ authRed }) {
    return {
        authRed,
    };
}

export default connect(mapStateToProps, instaAct)(AddGalleryModal);