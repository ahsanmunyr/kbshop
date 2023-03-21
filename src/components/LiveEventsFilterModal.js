// @ts-nocheck
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { connect } from 'react-redux';
import rowFormat from "../utils/rowFormate"
import NotFound from '../components/NotFound'
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import rowFormate from '../../src/utils/rowFormate';
import { ScrollView } from 'react-native-gesture-handler';
import * as catAct from "../store/actions/category"
import * as subCatAct from "../store/actions/subCategoryAct"
import Hr from './hr';
import colors from '../assets/colors/colors';
import HalfBtn from './halfBtn'
import Btn from './Btn';

const tablet = deviceInfoModule.isTablet();

const LiveEventsFilterModal = ({ categories, closeModle, visible, getCategories, getSubCategories, subCategoryRed, onGetIds }) => {
  const [filters, setFilters] = useState({
    sortBy: "",
    category: "",
    subCategory: "",
    brand: ""
  })

  const [sortBy, onChangeSortBy] = useState('BRAND')
  const [category, onChangeCategory] = useState([])
  useEffect(() => {
    getCategories()
    // getSubCategories()
  }, [])
  console.log(category, "category")

  var array = [

  ]
  // console.log(subCategoryRed, "subCategoryRed")
  // function CategoryItem({ item }) {
  //   return (
  //     <View>
  //       {item.map((it, i) => (
  //         <SelectableBtns key={i} title={it.name}/>
  //       ))}
  //     </View>
  //   );
  // }

  // function SubCategoryItem({ item }) {
  //   return (
  //     <View>
  //       {item.map((it, i) => (
  //         <SelectableBtns key={i} title={it.name}/>
  //       ))}
  //     </View>
  //   );
  // }\
  // console.log(categories, "categories=======")

  const SelectableBtns = ({ title, id, value, onChangeCategories, categories }) => {
    
    let categoryCheck = categories.filter((it, i)=>{
        if(it === id){
          return it
        }
    })

    console.log(categoryCheck[0], "categoryCheck")
    return (
     
      <TouchableOpacity
        disabled={categoryCheck[0] == id ? true : false}
        onPress={() => {
          // if(id){

          // }
          // if(categories.length < 0){

          // }

          
          // array.push(id)
          
          onChangeCategories(oldCategories => [id,...oldCategories])

      
      
        // let a = categories?.filter((it, i) => {
        //     console.log(it, "==", id, "it == idit == idit == id")
        //     if (it == id) {
        //       //  onChangeCategories((oldCategories) =>
        //       //   oldCategories.filter((it) => it !== id)
        //       // )
        //      return console.log(it, "Mojood hai")
        //     } else {
        //      return  console.log(it, "Mojood ni")
        //       //  onChangeCategories(oldCategories => {
        //       //   [id, ...oldCategories]
        //       // })

        //     }
        //   })
          // console.log(a, "aaaaa")
          //  console.log(categories, "++++++++++++++++++")

          // onChangeCategories(oldCategories => {

          //   [id, ...oldCategories]
          // })

          //  console.log(a, "ALREADY")
          // onChangeCategories(oldCategories => [id,...oldCategories])

        }}
        key={id}
        style={{
          borderWidth: 1,
          borderColor: colors.themeblue,
          borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
          marginRight: responsiveFontSize(1),
          width: responsiveFontSize(tablet ? 8 : 12),
          height: responsiveHeight(5),
          marginVertical: responsiveFontSize(0.4),
          paddingVertical: responsiveHeight(0.7),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:categoryCheck[0] == id ? colors.themeblue : "white"
        }}>
        <Text style={{ fontSize: responsiveFontSize(tablet ? 0.8 : 1.5), color: categoryCheck[0] == id ? "white" : colors.themeblue }}>{title}</Text>
      </TouchableOpacity>
      // <TouchableOpacity
      //   key={key}
      //   onPress={() => getSubCategories(id)}
      //   style={{
      //     borderWidth: 1,
      //     borderColor: '#ccc',
      //     borderRadius: responsiveFontSize(0.5),
      //     marginRight: responsiveFontSize(1.5),
      //     marginBottom: responsiveHeight(1),
      //     width: responsiveFontSize(13),
      //     paddingVertical: responsiveHeight(0.7),
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //   }}>
      //   <Text style={{ fontSize: responsiveFontSize(1.5) }}>{title}</Text>
      // </TouchableOpacity>
    )
  }

  function renderItem({ item, index }) {
    return (
      <View key={index}>
        {item.map((it, i) => (
          <SelectableBtns categories={category} onChangeCategories={onChangeCategory} value={i} id={it._id} title={it.category_name} />
        ))}
      </View>
    );
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{
        flex: 1,
        justifyContent: 'center',
        elevation: 5,
      }}
      onRequestClose={closeModle}
      statusBarTranslucent={true}
      visible={visible}>
      <View style={styles.modalCont}>

        <View style={styles.modalView}>

          <View style={styles.modalHeadCont}>
            <TouchableOpacity onPress={closeModle} style={styles.crossBtn}>
              <CrossIcon name="cross" size={responsiveFontSize(tablet ? 2 : 3)} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalBody}>
              <Text style={{
                fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                color: 'rgb(7, 13, 46)'
              }}>Sort By</Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={['BRAND']}
                  renderItem={({ item, i }) => {
                    // console.log(sortBy, "==", item, "sortBy == item")

                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (sortBy == item) {
                            onChangeSortBy('')
                          } else {
                            onChangeSortBy(item)
                          }
                        }
                        }
                        key={i}
                        style={{
                          borderWidth: 1,
                          borderColor: colors.themeblue,
                          borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
                          marginRight: responsiveFontSize(1.5),
                          width: responsiveFontSize(tablet ? 8 : 12),
                          height: responsiveHeight(5),
                          paddingVertical: responsiveHeight(0.7),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: sortBy == item ? colors.themeblue : 'white'
                        }}>

                        <Text style={{ fontSize: responsiveFontSize(tablet ? 0.8 : 1.5), color: sortBy == item ? 'white' : colors.themeblue }}>{item}</Text>
                      </TouchableOpacity>
                    )


                  }}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <Text style={{
                fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                color: 'rgb(7, 13, 46)',
              }}>Category</Text>
              <View style={styles.sortByCont}>
                {/* <FlatList
                  data={rowFormate(
                    [
                      { name: 'BEAUTY' },
                      { name: 'BOOKS' },
                      { name: 'BAGS' },
                      { name: 'CLOTHING' },
                      { name: 'BEAUTY' },
                      { name: 'BOOKS' },
                      { name: 'BAGS' },
                      { name: 'CLOTHING' },
                      { name: 'BEAUTY' },
                      { name: 'BOOKS' },
                      { name: 'BAGS' },
                      { name: 'CLOTHING' },
                    ],
                    3,
                  )}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                /> */}

                <FlatList
                  data={rowFormat(categories, 3)}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => item[0]._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<NotFound text={"No Category Found"} />}

                />



              </View>
              {/* <Text style={{
                fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                color: 'rgb(7, 13, 46)',
              }}>Sub Category</Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={rowFormate(subCategoryRed,3)}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => item[0]._id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<NotFound text={"No SubCategory Found"} />}
                />
              </View> */}
              {/* <Text style={{
                fontSize: responsiveFontSize(tablet ? 1.25 : 2),
                color: 'rgb(7, 13, 46)',
              }}>Brand</Text>
              <View style={styles.sortByCont}>
                <FlatList
                  data={rowFormate(
                    [
                      { name: 'DL1961' },
                      { name: 'Judith' },
                      { name: 'Warp Weft' },
                      { name: 'ASOS' },
                      { name: 'MACYs' },
                      { name: 'Addida' },
                      { name: 'Nike' },
                      { name: 'Primark' },
                      { name: 'KOHLs' },
                      { name: 'Walmart' },
                      { name: 'Target' },
                      { name: 'Ebay' },
                    ],
                    3,
                  )}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>  */}

            </View>
          </ScrollView>
        </View>
        <View>
          <Hr />
          <View style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingVertical: responsiveHeight(1)
          }}>
            <Btn
              text={"Reset All"}
              call={() => onChangeCategory([])}
              color={"#fff"}
              pS={{
                width: "38%",
                borderWidth: 0.5,
                borderColor: "#ccc",
                height: responsiveHeight(4)
              }}
              pSText={{ color: "#000" }}
            />
            <Btn
              text={"Apply"}
              call={() => {
                closeModle()
                onGetIds(category)
              
              }}
              pS={{
                width: "58%",
                height: responsiveHeight(4)
              }}
            />
          </View>
        </View>

      </View>

    </Modal>
  );
};

// const SelectableBtns = ({ title }) => {
//   return (
//     <TouchableOpacity
//       style={{
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: responsiveFontSize(tablet?0.25:0.5),
//         marginRight: responsiveFontSize(1.5),
//         marginBottom: responsiveHeight(1),
//         width: responsiveFontSize(tablet?8:11),
//         paddingVertical: responsiveHeight(0.7),
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text style={{ fontSize: responsiveFontSize(tablet?0.8:1.5),color:'gray' }}>{title}</Text>
//     </TouchableOpacity>
//   )
// }

const styles = StyleSheet.create({
  btn: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(20),
    margin: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: responsiveWidth(100),
    // height: responsiveHeight(tablet ? 40 : 55),
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // padding: 25,
    // paddingVertical:25,
    paddingTop: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeadCont: {
    alignSelf: 'flex-end',
  },
  crossBtn: {
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    width: responsiveWidth(6),
  },
  modalBody: {},
  sortByCont: {
    marginVertical: responsiveHeight(1),
  },
});

function mapStateToProps({ categories, subCategoryRed }) {
  return {
    categories,
    subCategoryRed
  };
}

export default connect(mapStateToProps, { ...catAct, ...subCatAct })(LiveEventsFilterModal);
