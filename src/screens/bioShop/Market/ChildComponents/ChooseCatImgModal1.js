// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';
// import React from 'react';
// import colors from '../../../../assets/colors/colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// // import CrossIcon from 'react-native-vector-icons/Entypo';
// import IconCross from 'react-native-vector-icons/Entypo';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Btn from '../../../../components/Btn';

// const {width, height} = Dimensions.get('window');

// const ChooseCatImgModal1 = ({
//   isModalVisible,
//   closeModal,
//   uploadedImg,
//   setUploadedImg,
//   selectedCatForModal,
// }) => {
//   const uploadImage = async () => {
//     try {
//       const result = await launchImageLibrary();
//       if (result.didCancel !== true) {
//         setUploadedImg({
//           name: result.assets[0].fileName,
//           type: result.assets[0].type,
//           uri: result.assets[0].uri,
//         });
//       }
//     } catch (error) {
//       console.log(error, '--------------------image err');
//     }
//   };

//   return (
//     <Modal
//       animationType={'fade'}
//       transparent={true}
//       visible={isModalVisible}
//       onRequestClose={closeModal}
//       style={{flex: 1, justifyContent: 'center', elevation: 5}}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: height,
//           backgroundColor: 'rgba(0,0,0,0.7)',
//         }}>
//         <View style={{...styles.con, backgroundColor: '#ffffff'}}>
//           <View style={{...styles.btn, backgroundColor: '#ffffff'}}>
//             <TouchableOpacity
//               onPress={() => {
//                 closeModal();
//               }}>
//               <IconCross name="cross" color={colors.blue} size={25} />
//             </TouchableOpacity>
//             <View style={styles.imgCon}>
//               <Image
//                 style={styles.img}
//                 resizeMode="cover"
//                 source={{
//                   uri:
//                     uploadedImg === null
//                       ? selectedCatForModal
//                       : uploadedImg.uri,
//                 }}
//               />
//               <Btn
//                 text="Choose Category Image"
//                 pS={{
//                   width: responsiveWidth(50),
//                   marginTop: responsiveHeight(2),
//                   paddingVertical: 10,
//                 }}
//                 pSText={{fontSize: responsiveFontSize(1.7)}}
//                 call={() => {
//                   uploadImage();
//                 }}
//               />
//             </View>
//           </View>
//           {/* <View style={styles.msgCont}>
//             <Text
//               style={{
//                 fontSize: responsiveFontSize(1.8),
//                 textAlign: 'center',
//                 textTransform: 'capitalize',
//                 paddingHorizontal: responsiveFontSize(1),
//               }}>
//               Are you sure, you want to remove this item from your favourites?
//             </Text>
//           </View> */}
//           <View style={styles.btnCont}>
//             <Btn
//               text="Update"
//               call={() => {
//                 console.log('first');
//               }}
//               pS={{
//                 width: responsiveWidth(30),
//                 fontSize: responsiveFontSize(1),
//                 backgroundColor: colors.errorRed,
//               }}
//               pSText={{fontSize: responsiveFontSize(1.5)}}
//             />
//             <Btn
//               text="Cancel"
//               call={() => closeModal()}
//               pS={{width: responsiveWidth(30)}}
//               pSText={{fontSize: responsiveFontSize(1.5)}}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   con: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: width / 1.25,
//     height: responsiveHeight(33),
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//     borderRadius: 20,
//   },
//   iconCon: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btn: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     paddingRight: 10,
//     paddingVertical: 6,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   img: {
//     width: responsiveFontSize(10),
//     height: responsiveFontSize(10),
//     borderRadius: responsiveFontSize(10) / 2,
//   },
//   imgCon: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     width: '100%',
//     borderBottomWidth: 0.5,
//     padding: responsiveFontSize(1.5),
//     borderColor: 'gray',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   msgCont: {
//     marginHorizontal: responsiveFontSize(1),
//   },
//   btnCont: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingBottom: responsiveHeight(2),
//   },
// });

// export default ChooseCatImgModal1;
