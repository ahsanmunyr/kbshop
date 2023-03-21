import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import colors from '../assets/colors/colors';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  // import CrossIcon from 'react-native-vector-icons/Entypo';
  import IconCross from 'react-native-vector-icons/Entypo';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import Btn from '../components/Btn';
  import ImageModel from './categoryImagePicker';
  import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
  import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()
  const {width, height} = Dimensions.get('window');
  
  const ChooseCatImgModal = ({
    isModalVisible,
    closeModal,
    data,
    editCategory,
    reload
  }) => {
  
  
    const [modal,setModal]=useState(false)
    const [img,setImg]=useState("")
  
    function openCamera(){
      ImagePicker.openCamera({
        cropping:true,
        cropperCircleOverlay:true
      }).then((media)=>{
        // console.log(media)
        setImg(
          {
            ...media,
            uri:media.path,
            type:media.mime,
            fileName:media.path.slice(media.path.lastIndexOf('/')+1,media.path.length)
          }
          );
          setModal(false);
      })
      .catch(err => {
        console.log(err);
      });
      // launchCamera({mediaType:'photo'},(media)=>{
      //   if(!media.didCancel){
      //     setImg(media.assets[0])
      //     setModal(false)
      //   }
      // }).catch((err)=>{
      //   console.log(err)
      // })
  }
  function openGallary(){
    ImagePicker.openPicker({
      cropping:true,
      cropperCircleOverlay:true
    }).then((media)=>{
      console.log(media)
      setImg(
        {
          ...media,
          uri:media.path,
          type:media.mime,
          fileName:media.path.slice(media.path.lastIndexOf('/')+1,media.path.length)
        }
        );
        setModal(false);
    })
    .catch(err => {
      console.log(err);
    });
      // launchImageLibrary({mediaType:'photo'},(media)=>{
      //   if(!media.didCancel){
      //     setImg(media.assets[0])
      //     setModal(false)
      //   }
      // }).catch((err)=>{
      //   console.log(err)
      // })
  }
  
  
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={()=>{
          closeModal()
          setImg("")
        }}
        style={{flex: 1, justifyContent: 'center', elevation: 5}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <ImageModel
          closeModle={()=>setModal(false)}
          visible={modal}
          modalCont={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          goToCamera={openCamera}
          goToGallery={openGallary}
          />
          <View style={{...styles.con, backgroundColor: '#ffffff'}}>
            <View style={{...styles.btn}}>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                  setImg("")
                }}>
                <IconCross name="cross" color={colors.blue} size={responsiveFontSize(tablet?2:4)} />
              </TouchableOpacity>
              <View style={styles.imgCon}>
                <Image
                  style={styles.img}
                  resizeMode="cover"
                  source={{uri:img?img.uri:data?.image_url}}
                />
                <Text style={{marginTop:responsiveFontSize(1)}}>{data.category_name}</Text>
              </View>
            </View>
            <View style={styles.btnCont}>
              <Btn
                text="Update"
                call={() => {
                  editCategory({...data,img},()=>{
                    Toast.show({
                      type: "success",
                      text1: "Successfully updated"
                    })
                    reload()
                  }).then(()=>{
                  }).catch(err=>{
                    console.log(err?.response?.data)
                  })
                  closeModal()
                }}
                disabled={!img}
                pS={{
                  width: '30%',
                  fontSize: responsiveFontSize(1),
                }}
                pSText={{fontSize: responsiveFontSize(1.5)}}
              />
              <Btn
                  text="Upload"
                  pS={{
                    width: '30%',
                  }}
                  pSText={{fontSize: responsiveFontSize(1.5)}}
                  call={() => {
                    setModal(true)
                  }}
                />
              <Btn
                text="Cancel"
                call={() => {
                  closeModal()
                  setImg("")
                }}
                pS={{width: '30%',backgroundColor:'gray'}}
                pSText={{fontSize: responsiveFontSize(1.5)}}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    con: {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width / 1.25,
      height: responsiveHeight(tablet?31:30),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      borderRadius: 20,
    },
    iconCon: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 10,
      paddingVertical: 6,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    img: {
      width: responsiveFontSize(tablet?7:10),
      height: responsiveFontSize(tablet?7:10),
      borderRadius: responsiveFontSize(10) / 2,
    },
    imgCon: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:responsiveFontSize(2)
    },
    item: {
      width: '100%',
      borderBottomWidth: 0.5,
      padding: responsiveFontSize(1.5),
      borderColor: 'gray',
      flexDirection: 'row',
      alignItems: 'center',
    },
    msgCont: {
      marginHorizontal: responsiveFontSize(1),
    },
    btnCont: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '90%',
      paddingBottom: responsiveHeight(2),
    },
  });
  
  export default ChooseCatImgModal;