import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CategoryImageList from './ChildComponents/CategoryImageList';
import Btn from '../../../components/Btn';
import DropDownComp from '../../../components/DropDownComp';
import ChangeCatImgModal from '../../../components/CustomModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
const Categoryy = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value, setValue] = useState([]);
  const [items1, setItems1] = useState([
    {key: 1, label: '3', value: '3'},
    {key: 2, label: '6', value: '6'},
    {key: 3, label: '12', value: '12'},
  ]);
  const [items, setItems] = useState([
    {
      key: 1,
      label: 'Apple',
      value: {
        label: 'Apple',
        image:
          'https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        id: 1,
      },
    },
    {
      key: 2,
      label: 'Banana',
      value: {
        label: 'Banana',
        image:
          'https://cdn.lifehack.org/wp-content/uploads/2019/10/self-image-1024x768.jpeg',
        id: 2,
      },
    },
    {
      key: 3,
      label: 'Sad',
      value: {
        label: 'Sad',
        image:
          'https://media.gettyimages.com/photos/quaideazam-picture-id184944186?s=612x612',
        id: 3,
      },
    },
    {
      key: 4,
      label: 'Cry',
      value: {
        label: 'Cry',
        image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
        id: 4,
      },
    },
    {
      key: 6,
      label: 'Smile',
      value: {
        label: 'Smile',
        image:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
        id: 6,
      },
    },
    {
      key: 7,
      label: 'Blushing',
      value: {
        label: 'Blushing',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU',
        id: 7,
      },
    },
    {
      key: 8,
      label: 'Disgust',
      value: {
        label: 'Disgust',
        image:
          'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/photos/term-bg-1-c98135712157fb21286eafd480f610f9.jpg',
        id: 8,
      },
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCatForModal, setSelectedCatForModal] = useState('');
  const [uploadedImg, setUploadedImg] = useState(null);

  const onPressCategrory = img => {
    setSelectedCatForModal(img);
    setIsModalVisible(true);
  };

  const uploadImage = async () => {
    try {
      const result = await launchImageLibrary();
      if (result.didCancel !== true) {
        setUploadedImg({
          name: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.log(error, '--------------------image err');
    }
  };

  const onUploadCatergory = () => {
    setIsModalVisible(false);
    setUploadedImg(null);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
          top: responsiveFontSize(2),
        }}>
        <View
          style={{
            width: responsiveWidth(100),
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: responsiveHeight(100),
          }}>
          <View
            style={{
              width: responsiveWidth(90),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: 'white',
              zIndex: 0,
              elevation: 5,
            }}>
            <View
              style={{
                width: responsiveWidth(80),
                alignItems: 'flex-start',
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1.4),
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
              }}>
              <Text style={{fontSize: 15}}>Buy Additional Categories</Text>
            </View>
            <View
              style={{
                width: responsiveWidth(80),
                alignItems: 'flex-start',
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1),
              }}>
              <Text style={{fontSize: 15}}>No. of Category</Text>
            </View>
            <View
              style={{
                width: responsiveWidth(80),
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1),
              }}>
              <DropDownComp
                items={items1}
                open={open1}
                value={value1}
                setOpen={setOpen1}
                onSelectItem={data => setValue1(data.value)}
                placeholdertxt="Select No. of Category"
                style={{width: responsiveWidth(80)}}
              />
            </View>
            <View style={{height: responsiveHeight(10)}}></View>
            <Btn text="Update Category" pS={styles.saveBtn} />
          </View>
          <View
            style={{
              width: responsiveWidth(90),
              marginVertical: responsiveHeight(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: 'white',
              elevation: 5,
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: responsiveWidth(80),
                alignItems: 'flex-start',
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1.4),
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
              }}>
              <Text style={{fontSize: 15}}>
                Number Of Categories In Influencer Plan Is 3
              </Text>
            </View>
            <View
              style={{
                width: responsiveWidth(80),
                alignItems: 'flex-start',
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1),
              }}>
              <Text style={{fontSize: 15}}>Add Category</Text>
            </View>
            <View
              style={{
                width: responsiveWidth(80),
                alignItems: 'center',
                alignSelf: 'center',
                paddingVertical: responsiveHeight(1),
              }}>
              <DropDownComp
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                placeholdertxt="Select Category"
                searchPlaceholderTxt="Search Category"
                style={{width: responsiveWidth(80)}}
                searchable={true}
                mode="BADGE"
                showBadgeDot={false}
                multiple={true}
                min={0}
                max={6}
                itemKey="key"
                renderBadgeItem={props => {
                  console.log(props.onPress, 'know');
                  return (
                    <TouchableOpacity
                      {...props}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'silver',
                        padding: responsiveFontSize(0.3),
                        borderRadius:responsiveFontSize(0.75)
                      }}>
                      <Text style={{marginRight:5}}>{props.value.label}</Text>
                      <CancelIcon name="cancel" color={'#223150'} size={16} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // height: responsiveHeight(14),
                width: responsiveWidth(80),
                alignSelf: 'center',
              }}>
              <FlatList
                data={value}
                horizontal
                // style={{backgroundColor:'red'}}
                decelerationRate={0.5}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <CategoryImageList
                    Images={item.image}
                    ID={item.id}
                    Name={item.label}
                    onPressCat={onPressCategrory}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <View
              style={{
                marginVertical: responsiveHeight(1),
                width: responsiveWidth(30),
                alignSelf: 'center',
              }}>
              <Btn text="Save" pS={styles.saveBtn} />
            </View>
          </View>
        </View>
      </View>
      {isModalVisible && (
        <ChangeCatImgModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title="Edit Custom Category"
          closeModal={() => {
            setUploadedImg(null);
            setIsModalVisible(false);
          }}>
          <View style={styles.modalContent}>
            <Image
              style={{
                width: responsiveHeight(15),
                height: responsiveHeight(15),
                borderRadius: responsiveFontSize(100),
              }}
              resizeMode="cover"
              source={{
                uri:
                  uploadedImg === null ? selectedCatForModal : uploadedImg.uri,
              }}
            />
            <Btn
              text="Choose Category Image"
              pS={{
                width: responsiveWidth(50),
                marginTop: responsiveHeight(2),
              }}
              pSText={{fontSize: responsiveFontSize(1.7)}}
              call={() => {
                uploadImage();
              }}
            />
            <Btn
              text="Update Category"
              pS={{
                width: responsiveWidth(80),
                marginTop: responsiveHeight(2),
              }}
              pSText={{fontSize: responsiveFontSize(1.7)}}
              call={() => {
                onUploadCatergory();
              }}
            />
          </View>
        </ChangeCatImgModal>
      )}
      <View style={{height: responsiveHeight(10)}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    marginVertical: responsiveHeight(1),
    width: responsiveWidth(80),
    alignSelf: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Categoryy;
