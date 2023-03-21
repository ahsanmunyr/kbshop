// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
// import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import IconCross from 'react-native-vector-icons/Entypo';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropDownComp from './DropDownComp';
import moment from 'moment';
import Video from 'react-native-video';
import {connect, useDispatch} from 'react-redux';
import Konnect from '../config/konnect';
import Loader from './Loader';
import {useNavigation} from '@react-navigation/native';
import * as actions from '../store/actions/bioShop';
import Toast from 'react-native-toast-message';
import deviceInfo from 'react-native-device-info';
import * as subCategoryFatch from '../store/actions/subCategoryDropDownAct';
const tablet = deviceInfo.isTablet();

const CustomModal = ({
  ModalState,
  ChangeModalState,
  obj,
  authRed,
  categories,
  getAllPost,
  getBioShopData,
  bioShopPostClear,
  categoriesSelected,
  openWeb,
  cat,
  getSubCategoriesDropDown,
}) => {
  console.log(obj, "openWebopenWebopenWebopenWebopenWebopenWeb")
  const [url, onChangeUrl] = useState('');
  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  const [isOpenSubDrpdwn, setIsSubOpenDrpdwn] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [subCatShow, setSubCatShow] = useState(false);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [show1, setShow1] = useState(false);
  const [brand, showBrand] = useState(false);
  const [dataCa, setCategoryData] = useState({});
  const [loadingBtn, onChangeLoadingBtn] = useState(false);
  const [loadingBtn1, onChangeLoadingBtn1] = useState(false);
  const [brandValue, setBrandValue] = useState('');
  const [isOpenDrpdwnBrand, setIsOpenDrpdwnBrand] = useState(false);
  const noOfCat = categories?.map((i, key) => ({
    label: i.category_name,
    value: i.category_id,
    pid: i.parent_id,
  }));
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [data, onChangeData] = useState({});
  const [category, setCategory] = useState('');
  const [suBcategory, setSubCategory] = useState('');
  const [loading, onChangeLoading] = useState(false);

  const [startDate, onChangeStartDate] = useState(new Date());
  const [startDate1, onChangeStartDate1] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  );

  const onChange1 = selectedDate => {
    const currentDate = selectedDate;
    setShow1(false);
    onChangeStartDate1(currentDate);
  };

  const onChange = selectedDate => {
    const currentDate = selectedDate;
    setShow(false);
    onChangeStartDate(currentDate);
  };

  async function getData() {
    onChangeLoading(true);
    await Konnect.get(`/v1/posts/retrieve/${obj.id}`).then(res => {
      if (res?.data?.success) {
        onChangeData(res?.data?.message);
        onChangeStartDate(new Date(res.data.message.start_date));
        onChangeStartDate1(new Date(res.data.message.end_date));
        onChangeUrl(res.data.message.redirected_url);
        onChangeLoading(false);
        onChangeLoadingBtn(false);
        setCategory(res?.data?.message?.categories[0]?.category_id);
        setSubCategory(res?.data?.message?.sub_categories[0]?.sub_category_id);
        getSubCategoriesDropDown(
          res?.data?.message?.categories[0]?.parent_id,
        ).then(array => {
          if (array) {
            setSubCatShow(true);
            const noOfSubCat = array?.map((i, key) => ({
              label: i.sub_category_name,
              value: i.sub_category_id,
            }));
            setSubCategoryArray(noOfSubCat);
          }
        });
      }
    });
  }

  const subCategoryFunction = data => {
    // console.log(data.value, "=====================================")
    getSubCategoriesDropDown(data.pid)
      .then(array => {
        setSubCatShow(true);
        console.log(array, '==============array=======================');
        if (array) {
          const noOfSubCat = array?.map((i, key) => ({
            label: i.sub_category_name,
            value: i.sub_category_id,
          }));
          // console.log(noOfSubCat, "==================ahsansanasdnasndasndasndasndasd===============")
          setSubCategoryArray(noOfSubCat);
        }
      })
      .catch(Err => {
        console.log(Err);
      });
  };

  useEffect(() => {
    if (obj?.linked) {
      getData();
    }
  }, []);


  const updatePost = async () => {
    try {
      onChangeLoadingBtn(true);
      const val = {
        categories: [category],
        end_date: startDate1,
        post_type: obj.mediaType,
        start_date: startDate,
        redirected_url: url,
        sub_categories: [suBcategory],
      };
      await Konnect.put(`/v1/posts/revise/${obj.id}`, val)
        .then(res => {
          if (res.data.success) {
            Toast.show({
              type: 'success',
              text1: res.data.message,
            });
            onChangeLoadingBtn(false);
            ChangeModalState(false);
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
          });
          onChangeLoadingBtn(false);
          ChangeModalState(false);
        });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
      });
      onChangeLoadingBtn(false);
      ChangeModalState(false);
    }
  };

  const removePost = async () => {
    try {
      onChangeLoadingBtn1(true);
      await Konnect.delete(`/v1/posts/remove/${obj.id}`)
        .then(res => {
          // console.log(res.data.data)
          if (res.data.success) {
            dispatch({type: 'removeItem', payload: obj.id});
            // apiCallAgain();

            Toast.show({
              type: 'success',
              text1: res.data.message,
            });
            // alert(res.data.message);
            ChangeModalState(false);
            onChangeLoadingBtn1(false);
          }
        })
        .catch(err => {
          console.log(err);
          ChangeModalState(false);
          onChangeLoadingBtn1(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
          });
        });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
      });
      ChangeModalState(false);
      onChangeLoadingBtn1(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ModalState}
      style={{flex: 1, justifyContent: 'center', elevation: 5}}
      statusBarTranslucent={true}
      onRequestClose={() => {
        ChangeModalState(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{flex: 1, width: responsiveWidth(85)}}>
                <>
                  <View style={styles.top}>
                    <View style={styles.headerComponent}>
                      <Text
                        style={{
                          color: 'black',
                          textAlign: 'left',
                          fontSize: responsiveFontSize(tablet ? 1.8 : 1.6),
                        }}>
                        {obj.linked ? 'Edit Post' : 'Add Post'}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: responsiveFontSize(1.35),
                        }}>
                        Updated on{' '}
                        {moment(data.updated_at).format('MMM DD YYYY')}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        ChangeModalState(false);
                      }}>
                      <IconCross
                        name="cross"
                        color={'#010b40'}
                        size={responsiveFontSize(tablet ? 2 : 3)}
                      />
                    </TouchableOpacity>
                  </View>
                  {obj.linked && (
                    <View style={styles.mainSmallContainers}>
                      <View style={styles.outerSmallContainer}>
                        <View style={styles.smallContainer}>
                          <View style={styles.innerSmallContainer}>
                            <Icon
                              name="eye-outline"
                              color={'white'}
                              size={responsiveFontSize(2.8)}
                            />
                            <View style={{}}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: responsiveFontSize(1.35),
                                }}>
                                {data.post_views}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.smallContainer}>
                          <View style={styles.innerSmallContainer}>
                            <Icon1
                              color={'white'}
                              name="hand-pointer"
                              size={responsiveFontSize(2.8)}
                            />
                            <View style={{}}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: responsiveFontSize(1.35),
                                }}>
                                {data.post_clicks}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.smallContainer}>
                          <View style={styles.innerSmallContainer}>
                            <Icon1
                              color={'white'}
                              name="handshake"
                              size={responsiveFontSize(2.8)}
                            />
                            <View style={{}}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: responsiveFontSize(1.35),
                                }}>
                                {data.ctr}%
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.smallContainer}>
                          <View style={styles.innerSmallContainer}>
                            <Icon1
                              color={'white'}
                              name="dollar-sign"
                              size={responsiveFontSize(2.8)}
                            />
                            <View style={{}}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: responsiveFontSize(1.35),
                                }}>
                                $0.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  <View style={styles.mainImage}>
                    <View style={styles.imageContainer}>
                      {obj.mediaType == 'VIDEO' ? (
                        <Video
                          ignoreSilentSwitch="ignore"
                          resizeMode="cover"
                          paused={true}
                          playInBackground={false}
                          playWhenInactive={false}
                          disableFocus
                          source={{uri: obj.url}}
                          style={styles.image}></Video>
                      ) : (
                        <Image
                          style={styles.image}
                          resizeMode="cover"
                          source={{uri: obj.url}}
                        />
                      )}
                    </View>
                    <View style={styles.textMain}>
                      {obj?.mediaType == 'VIDEO' ? null : (
                        <View>
                          <TextInput
                            value={url}
                            keyboardType="default"
                            onChangeText={v => onChangeUrl(v)}
                            placeholder={'Enter URL'}
                            textContentType="URL"
                            style={styles.textInputStyle}
                          />
                        </View>
                      )}
                      <View style={{zIndex: 30}}>
                        <DropDownComp
                          items={noOfCat}
                          open={isOpenDrpdwn}
                          value={category}
                          setOpen={setIsOpenDrpdwn}
                          onSelectItem={data => {
                            setCategory(data.value);
                            setCategoryData(data);

                            setIsSubOpenDrpdwn(false);
                            subCategoryFunction(data);
                          }}
                          error={!category && submit}
                          listMode="SCROLLVIEW"
                          ShowsVerticalScrollIndicator={false}
                          textStyle={{
                            fontSize: responsiveFontSize(tablet ? 1 : 1.35),
                          }}
                          placeholdertxt="Select Category"
                          style={{
                            marginTop: obj?.mediaType == 'VIDEO' ? 0: 5,
                            width: responsiveWidth(50),
                            paddingLeft: 10,
                          }}
                          dropDownContainerStyle={{
                            width: responsiveWidth(50),
                            height: responsiveHeight(20),
                            right: responsiveWidth(20),
                            color: 'black',
                          }}
                        />
                      </View>
                      {obj.mediaType == 'VIDEO' ? (
                        <View style={{zIndex: 20}}>
                          {obj?.linked ||
                            subCatShow ? (
                              <DropDownComp
                                items={subCategoryArray}
                                open={isOpenSubDrpdwn}
                                value={suBcategory}
                                setOpen={setIsSubOpenDrpdwn}
                                onSelectItem={data => {
                                  setIsOpenDrpdwn(false);
                                  setSubCategory(data.value);
                                  if (obj.mediaType == 'VIDEO') {
                                    showBrand(true);
                                  }
                                  // setCategory(data.value);
                                  // setCategoryData(data);
                                }}
                                error={!suBcategory && submit}
                                listMode="SCROLLVIEW"
                                ShowsVerticalScrollIndicator={false}
                                textStyle={{
                                  fontSize: responsiveFontSize(
                                    tablet ? 1 : 1.35,
                                  ),
                                }}
                                placeholdertxt="Select Subcategory"
                                style={{
                                  width: responsiveWidth(50),
                                  zIndex: 20,
                                  top: 5,
                                }}
                                dropDownContainerStyle={{
                                  width: responsiveWidth(50),
                                  zIndex: 20,
                                  alignSelf: 'center',
                                  // height: responsiveHeight(20),
                                  // left: responsiveWidth(20),
                                }}
                              />
                            ):null}
                        </View>
                      ) : null}
                    </View>
                  </View>
                  {obj?.linked || subCatShow ? (
                    <>
                      {obj.mediaType != 'VIDEO' ? (
                        <View
                          style={[
                            styles.mainSmallContainersSubs,
                            {zIndex: 20},
                          ]}>
                          <DropDownComp
                            items={subCategoryArray}
                            open={isOpenSubDrpdwn}
                            value={suBcategory}
                            setOpen={setIsSubOpenDrpdwn}
                            onSelectItem={data => {
                              setIsOpenDrpdwn(false);
                              setSubCategory(data.value);
                              if (obj.mediaType == 'VIDEO') {
                                showBrand(true);
                              }
                              // setCategory(data.value);
                              // setCategoryData(data);
                            }}
                            error={!suBcategory && submit}
                            listMode="SCROLLVIEW"
                            ShowsVerticalScrollIndicator={false}
                            textStyle={{
                              fontSize: responsiveFontSize(tablet ? 1 : 1.35),
                            }}
                            placeholdertxt="Select Subcategory"
                            style={{
                              marginTop: 5,
                              width: responsiveWidth(80),
                              zIndex: 20,

                              // paddingLeft: 10,
                            }}
                            dropDownContainerStyle={{
                              width: responsiveWidth(80),
                              alignSelf: 'center',
                              // height: responsiveHeight(20),
                              // left: responsiveWidth(20),
                            }}
                          />
                        </View>
                      ) : null}
                    </>
                  ) : null}
                  {brand && obj.mediaType == 'VIDEO' ? (
                    <View
                      style={[styles.mainSmallContainersSubs, {zIndex: 10}]}>
                      <DropDownComp
                        items={[]}
                        open={isOpenDrpdwnBrand}
                        value={brandValue}
                        setOpen={setIsOpenDrpdwnBrand}
                        onSelectItem={data => {}}
                        error={!brandValue && submit}
                        listMode="SCROLLVIEW"
                        ShowsVerticalScrollIndicator={false}
                        textStyle={{
                          fontSize: responsiveFontSize(tablet ? 1 : 1.35),
                        }}
                        placeholdertxt="Select Brand"
                        style={{
                          marginTop: 5,
                          width: responsiveWidth(80),

                          zIndex: 10,
                          // paddingLeft: 10,
                        }}
                        dropDownContainerStyle={{
                          width: responsiveWidth(80),
                          alignSelf: 'center',
                          // height: responsiveHeight(20),
                          // left: responsiveWidth(20),
                        }}
                      />
                    </View>
                  ) : null}
                  <View
                    style={{
                      zIndex: isOpenDrpdwn && Platform.OS == 'ios' ? -5 : 1,
                    }}>
                    <View style={styles.imageCon}>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: responsiveFontSize(1.35),
                            bottom: 5,
                          }}>
                          Start Date
                        </Text>
                        <TouchableOpacity
                          onPress={() => setShow(true)}
                          style={styles.datePicker}>
                          <Text style={{fontSize: responsiveFontSize(1.35)}}>
                            {moment(startDate).format('YYYY-MM-DD')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: responsiveFontSize(1.35),
                            bottom: 5,
                          }}>
                          End Date
                        </Text>
                        <TouchableOpacity
                          onPress={() => setShow1(true)}
                          style={styles.datePicker}>
                          <Text style={{fontSize: responsiveFontSize(1.35)}}>
                            {moment(startDate1).format('YYYY-MM-DD')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.topButton}>
                      <TouchableOpacity
                        // onPress={updatePost}
                        onPress={
                          obj.mediaType != 'VIDEO'
                            ? updatePost
                            : () => alert('COMING SOON')
                        }
                        style={styles.buttons}>
                        {loadingBtn ? (
                          <Loader color={'white'} />
                        ) : (
                          <Text
                            style={{
                              color: 'white',
                              fontSize: responsiveFontSize(1.35),
                            }}>
                            UPDATE
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={obj.mediaType == 'VIDEO' ? true : false}
                        onPress={() => {
                          // console.log(url)
                          const regex =
                            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                          if (regex.test(url)) {
                            if (
                              url.includes('https://') ||
                              url.includes('http://')
                            ) {
                              // Linking.openURL(url);
                              ChangeModalState(false);
                              openWeb({redirectLink: url});
                            } else {
                              ChangeModalState(false);
                              openWeb({redirectLink: url});
                              // Linking.openURL('https://'+url);
                            }
                          } else {
                            alert('Invalid');
                          }
                        }}
                        style={styles.buttons}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: responsiveFontSize(1.35),
                          }}>
                          TEST
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButton}>
                      <TouchableOpacity
                        onPress={() => {
                          ChangeModalState(false);
                        }}
                        style={styles.buttons}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: responsiveFontSize(1.35),
                          }}>
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={removePost}
                        style={styles.buttons}>
                        {loadingBtn1 ? (
                          <Loader color={'white'} />
                        ) : (
                          <Text
                            style={{
                              color: 'white',
                              fontSize: responsiveFontSize(1.35),
                            }}>
                            REMOVE
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              </ScrollView>
            </>
          )}
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          isVisible={show}
          mode="date"
          
          is24Hour={true}
          onConfirm={onChange}
          onCancel={() => setShow(false)}
        />

        <DateTimePicker
          isVisible={show1}
          testID="dateTimePicker1"
          value={startDate1}
          minimumDate={startDate}
          mode="date"
          is24Hour={true}
          onCancel={() => setShow1(false)}
          onConfirm={onChange1}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  top: {
    justifyContent: 'space-between',
    top: 0,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red',
    alignSelf: 'center',
    width: responsiveWidth(80),
  },
  textMain: {
    width: responsiveWidth(50),
    marginVertical: 5,
    left: 10,
    flexDirection: 'column',
  },
  textInputStyle: {
    width: responsiveWidth(50),
    backgroundColor: 'white',
    borderRadius: responsiveFontSize(0.6),
    paddingLeft: 10,
    fontSize: tablet ? responsiveFontSize(1) : responsiveFontSize(1.6),
    // elevation: 2,
    borderColor: 'grey',
    borderWidth: 0.6,
    height: responsiveHeight(5.7),
  },
  mainImage: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignItems: 'flex-start',
    height: responsiveHeight(15),
    alignSelf: 'center',
    marginTop: 5,
  },
  imageCon: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignItems: 'center',
    height: responsiveHeight(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  datePicker: {
    backgroundColor: 'white',
    width: responsiveWidth(36),
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
  buttons: {
    backgroundColor: '#010b40',
    width: responsiveWidth(37),
    height: responsiveHeight(4.6),
    borderRadius: responsiveFontSize(0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButton: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignItems: 'center',
    height: responsiveHeight(6),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignItems: 'flex-start',
    height: responsiveHeight(6),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 5,
  },
  innerSmallContainer: {
    // top: 5,
    justifyContent: 'center',
    // left: 5,
    flexDirection: 'column-reverse',
    // justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(18),
  },
  bottomInnerComponent: {
    flexDirection: 'row',
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: responsiveHeight(4),
    width: responsiveWidth(38),
    left: 5,
  },
  headerComponent: {
    width: responsiveWidth(50),
    // height: responsiveHeight(12),
    left: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  // middleComponent: {
  //   width: responsiveWidth(90),
  //   height: responsiveHeight(10),
  //   // backgroundColor:'yellow',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor:'green'
  // },
  imageContainer: {
    width: responsiveHeight(13),
    height: responsiveHeight(13),
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  image: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: 10,
  },
  mainSmallContainers: {
    width: responsiveWidth(80),
    height: responsiveHeight(10),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  outerSmallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // margin: 10,
    width: responsiveWidth(82),
  },
  smallContainer: {
    backgroundColor: '#010b40',
    width: responsiveWidth(18),
    height: responsiveHeight(8),

    borderRadius: responsiveFontSize(0.5),

    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    // elevation: 2,
  },
  touchableSmallContainer: {
    backgroundColor: 'white',
    width: responsiveWidth(22),
    height: responsiveHeight(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor: 'black',
    // opacity: 0.9,
  },
  modalView: {
    opacity: 1,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(55),
    margin: 10,
    // justifyContent:'center',
    // alignContent:'center',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
function mapStateToProps({authRed}) {
  return {
    authRed,
  };
}

export default connect(mapStateToProps, {...actions, ...subCategoryFatch})(
  CustomModal,
);
