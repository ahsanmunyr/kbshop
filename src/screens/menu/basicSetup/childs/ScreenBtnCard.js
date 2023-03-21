import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import Cards from './Card';
import Btn from '../../../../components/Btn';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ImageModal from '../../../../components/ImageModel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UpdateImgModal from './UpdateImgModal';
import CustomImagePickerNPreview from '../../../../components/CustomImagePickerNPreview';
import ResetScreenBtnModal from './ResetScreenBtnModal';

const ScreenBtnCard = () => {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isShowUpdateImgModal, setIsShowUpdateImgModal] = useState(false);
  const [updatedImg, setUpdatedImg] = useState(null);
  const [typeForModal, setTypeForModal] = useState(null);
  const [isShowResetModal, setIsShowResetModal] = useState(false);
  //   screen button
  const [screenBtnImgs, setscreenBtnImgs] = useState({
    btn1: '',
    btn2: '',
    btn3: '',
  });
  const getScreenBtnValue = (k, v) => {
    setscreenBtnImgs(pS => {
      return {
        ...pS,
        [k]: v,
      };
    });
  };

  //   genenral
  const onSaveUpdateImg = () => {
    if (typeForModal === 'screenBtn1') {
      getScreenBtnValue('btn1', updatedImg);
    } else if (typeForModal === 'screenBtn2') {
      getScreenBtnValue('btn2', updatedImg);
    } else if (typeForModal === 'screenBtn3') {
      getScreenBtnValue('btn3', updatedImg);
    }
  };

  function openCamera() {
    launchCamera({mediaType: 'photo'}, media => {
      if (!media.didCancel) {
        setUpdatedImg(media.assets[0]);
        setIsShowUpdateImgModal(true);
        setIsImgModalOpen(false);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  function openGallery() {
    launchImageLibrary({mediaType: 'photo'}, media => {
      if (!media.didCancel) {
        setUpdatedImg(media.assets[0]);
        setIsShowUpdateImgModal(true);
        setIsImgModalOpen(false);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <Cards title="Screen Button">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: responsiveFontSize(1),
          }}>
          <CustomImagePickerNPreview
            onPress={() => {
              setIsImgModalOpen(true);
              setTypeForModal('screenBtn1');
            }}
            defaultImg={screenBtnImgs.btn1}
          />
          <CustomImagePickerNPreview
            onPress={() => {
              setIsImgModalOpen(true);
              setTypeForModal('screenBtn2');
            }}
            defaultImg={screenBtnImgs.btn2}
          />
          <CustomImagePickerNPreview
            onPress={() => {
              setIsImgModalOpen(true);
              setTypeForModal('screenBtn3');
            }}
            defaultImg={screenBtnImgs.btn3}
          />
        </View>
        <Btn
          text="Reset All"
          call={() => {
            setIsShowResetModal(true);
          }}
        />
      </Cards>
      {isImgModalOpen && (
        <ImageModal
          visible={isImgModalOpen}
          closeModle={() => setIsImgModalOpen(false)}
          modalCont={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          goToCamera={openCamera}
          goToGallery={openGallery}
        />
      )}
      {isShowUpdateImgModal && (
        <UpdateImgModal
          isModalVisible={isShowUpdateImgModal}
          closeModal={() => {
            setIsShowUpdateImgModal(false);
            setUpdatedImg(null);
          }}
          onSaveUpdateImg={onSaveUpdateImg}
          selectedImg={updatedImg}
        />
      )}
      {isShowResetModal && (
        <ResetScreenBtnModal
          isModalVisible={isShowResetModal}
          closeModal={() => {
            setIsShowResetModal(!isShowResetModal);
          }}
          onReset={() => {
            console.log('RESET');
            setscreenBtnImgs({
              btn1: '',
              btn2: '',
              btn3: '',
            });
          }}
        />
      )}
    </>
  );
};

export default ScreenBtnCard;

const styles = StyleSheet.create({});
