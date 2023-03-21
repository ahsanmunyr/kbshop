import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CameraIcon from 'react-native-vector-icons/AntDesign';
import GalleryIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/colors/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UpdateImgModal from '../screens/menu/basicSetup/childs/UpdateImgModal';
import deviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const tablet = deviceInfo.isTablet();

function ImageModel({
  visible,
  closeModle,
  modalCont,
}) {
  const [updatedImg, setUpdatedImg] = useState(null);
  const [isShowUpdateImgModal, setIsShowUpdateImgModal] = useState(false);
  function openCamera() {
    ImagePicker.openCamera({
      cropping:true,
      cropperCircleOverlay:true
    }).then((media)=>{
      console.log(media)
      setUpdatedImg(
        {
          ...media,
          uri:media.path,
          type:media.mime,
          fileName:media.path.slice(media.path.lastIndexOf('/')+1,media.path.length)
        }
        );
      setIsShowUpdateImgModal(true);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function openGallery() {
    ImagePicker.openPicker({
      cropping:true,
      cropperCircleOverlay:true
    }).then((media)=>{
      console.log(media)
      setUpdatedImg(
        {
          ...media,
          uri:media.path,
          type:media.mime,
          fileName:media.path.slice(media.path.lastIndexOf('/')+1,media.path.length)
        }
        );
      setIsShowUpdateImgModal(true);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={{flex: 1, justifyContent: 'center', elevation: 5}}>
      <UpdateImgModal
        isModalVisible={isShowUpdateImgModal}
        closeModal={() => {
          closeModle();
          setIsShowUpdateImgModal(false);
          setUpdatedImg(null);
        }}
        updatedImg={updatedImg}
      />
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
          },
          modalCont,
        ]}>
        <View style={styles.con}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => openCamera()}
              style={{
                marginLeft: 20,
                width: responsiveFontSize(12),
                height: responsiveFontSize(12),
                borderRadius: responsiveFontSize(0.5),
                borderColor: colors.themeblue,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CameraIcon size={50} color={colors.themeblue} name="camerao" />
              <Text style={{color: colors.themeblue}}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openGallery()}
              style={{
                marginRight: 20,
                width: responsiveFontSize(12),
                height: responsiveFontSize(12),
                borderRadius: responsiveFontSize(0.5),
                borderColor: colors.themeblue,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <GalleryIcon size={50} color={colors.themeblue} name="photo" />
              <Text style={{color: colors.themeblue}}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{...styles.btn, backgroundColor: colors.themeblue}}
            onPress={() => {
              closeModle();
            }}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  con: {
    backgroundColor: 'white',
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
    overflow:"hidden"
  },
  iconCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 15,
    // height: 40,
    paddingVertical:responsiveHeight(1),
    backgroundColor: '#7A448D',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomRightRadius: responsiveFontSize(tablet ? 1 :2),
    // borderBottomLeftRadius: responsiveFontSize(2),
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
export default ImageModel;
