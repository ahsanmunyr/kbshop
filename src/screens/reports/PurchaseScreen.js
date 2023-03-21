// @ts-nocheck
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import deviceInfo from 'react-native-device-info';
import colors from '../../assets/colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import NotFound from '../../components/NotFound';
import Item from './CustomChild/Item';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import numeral from 'numeral';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FilterModal from './CustomChild/FilterModal';
import * as getCustomerPurchaseListAct from "../../store/actions//getCustomerPurchaseListAct"
import ItemDetailModal from './CustomChild/ItemDetailModal';
import {
    responsiveWidth,
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';
const tablet = deviceInfo.isTablet();


const PurchaseScreen = ({ purchaseListRed, getCustomerPurchaseList }) => {
    const [purchaseList, onChangePurchaseList] = useState(null)
    const [purchaseSummary, onChangePurchaseSummary] = useState(null)
    const [loader, onChangeLoader] = useState(false)
    const [groupBy, onChangeGroupBy] = useState('none')
    const [itemData, onChangeItemData] = useState(null)
    // const [show, setShow] = useState(false);
    // const [show1, setShow1] = useState(false);
    const [filterModal, onChangeFilterModal] = useState(false);
    const [itemDetailsModal, onChangeItemDetailsModal] = useState(false);
    // const [startDate, onChangeStartDate] = useState(new Date());
    // const [startDate1, onChangeStartDate1] = useState(new Date());


    function renderItem({ item, index }) {
        return (
            <Item
                data={item}
                index={index}
                onSetmodalOpen={onChangeItemDetailsModal}
                group={groupBy} 
                modalOpen={itemDetailsModal}
                setData={onChangeItemData}
            />
        )
    }

    useEffect(() => {
        let startdate = moment(new Date()).format('YYYY-MM-DD')
        let enddate = moment(new Date()).format('YYYY-MM-DD')
        // console.log(startdate, enddate)
        filter(25,startdate, enddate, 'all', 'none')
        
    }, [])

    useEffect(() => {
        if (purchaseListRed?.data) {
            onChangePurchaseList(purchaseListRed?.data)
            onChangePurchaseSummary(purchaseListRed?.summary[0])
        }

    }, [purchaseListRed])

    const filter = (limit, startDate, endDate, socialStore, groupBy) => {
        onChangeGroupBy(groupBy)
        onChangeLoader(true)
     
            getCustomerPurchaseList(limit, startDate, endDate, socialStore, groupBy).then(() => {
                onChangeLoader(false)
            })
        
      
    }

    


    function renderFooter() {
        return (
            <>
              {
                        purchaseSummary &&
                        <>
                             <View style={{
                    // height: responsiveScreenFontSize(30),
                    width: '87%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    marginVertical: responsiveHeight(0.5),
                    borderWidth: responsiveFontSize(0.1),
                    borderRadius: responsiveFontSize(0.5),
                    paddingHorizontal: "2%", paddingVertical: responsiveHeight(1.5)
                }} >
                    <View 
                    // style={{ width: '100%', height: responsiveScreenFontSize(26), alignSelf: 'center', flexDirection: 'column' }}
                    >
                        <View style={{}}>
                            <Text style={{ fontWeight: '900', fontSize: responsiveFontSize(tablet ? 1.3 : 3), color: 'black' }}>Summary</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Orders</Text>
                            <Text>{purchaseSummary?.order_count}</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Price</Text>
                            <Text>${numeral(purchaseSummary?.total_sale).format("0,0.00")}</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Total Discount</Text>
                            <Text>${numeral(purchaseSummary?.discount).format("0,0.00")}</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Total Amount Paid</Text>
                            <Text>${numeral(purchaseSummary?.order_totalprice).format("0,0.00")}</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Cashback Amount</Text>
                            <Text>${numeral(purchaseSummary?.cashback_amount).format("0,0.00")}</Text>
                        </View>
                        <View style={{ width: '100%', height: responsiveHeight(0.05), backgroundColor: 'grey', marginVertical: responsiveScreenFontSize(0.7) }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Total Quantity</Text>
                            <Text>{purchaseSummary?.total_qty}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: responsiveScreenFontSize(30) }}></View>
                        </>
                        
                    }
           
            </>
        )
    }

    if (loader) {
        return (
            <Loader />
        )
    }

    return (
        <View style={{ flex: 1 }}>
         
            {
                filterModal &&
                <FilterModal open={filterModal} functionOfFilter={filter} close={onChangeFilterModal} />
            }
            {
                itemDetailsModal&&
                <ItemDetailModal data={itemData} open={itemDetailsModal} close={onChangeItemDetailsModal}  />
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                data={purchaseList}
                ListFooterComponent={renderFooter()}
                ItemSeparatorComponent={() =>
                    <View style={{ height: responsiveScreenFontSize(0.05), backgroundColor: 'grey', width: '100%', }}></View>
                }
                ListHeaderComponent={
                    <>
                  
                    <View style={{
                        // height: responsiveScreenFontSize(7),
                        paddingVertical: responsiveHeight(1.5),
                        width: '100%',
                        backgroundColor: colors.themeblue,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: '6%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>S.#</Text>
                            </View>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>{
                                groupBy == 'category' ? "Category": groupBy == 'brand'? 'Brand': 'Order Date'
                                }</Text>
                            </View>
                            <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                              {console.log(groupBy, "groupBy")}
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>{
                                    groupBy == 'none' ||  groupBy == null ? 'Order#': "No. Of Orders"
                                
                                }</Text>
                            </View>
                            <View style={{ width: '16%', justifyContent: 'center', alignItems: 'flex-start', }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>Source</Text>
                            </View>
                            {
                                groupBy == 'none' ?
                                <View style={{ width: '15%', justifyContent: 'center', alignItems: 'flex-start', }}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>Brand</Text>
                                </View>: null
                            }
                           
                            <View style={{ width: '7%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),}}>Qty</Text>
                            </View>
                        </View>
                    </View>
                    </>
                }
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <NotFound text="No Data" />
                )}
                keyExtractor={(item, i) => i.toString()}
            />
          
            <TouchableOpacity style={styles.filterCont} onPress={() => {
                onChangeFilterModal(true)
                // alert("TT")
                }}>
                <View style={styles.filterSubCont}>
                    <Text style={styles.filterBtnText}>Filter</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    datePicker: {
        backgroundColor: 'white',
        width: responsiveWidth(40),
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
    filterCont:{
      height: responsiveFontSize(8),
      width: responsiveFontSize(8),
      borderRadius: responsiveFontSize(50),
      position: 'absolute',
      bottom: "6%", 
      right: 20, 
    },
    filterSubCont:{
      height: responsiveFontSize(tablet ? 5.5 : 8),
      width: responsiveFontSize(tablet ? 5.5 : 8),
      borderRadius: responsiveFontSize(50),
      backgroundColor: colors.themeblue,
      justifyContent: 'center', alignItems: 'center'
    },
    filterBtnText:{
      color: 'white', 
      textAlign: 'center', 
      // fontWeight: '900', 
      fontSize: responsiveFontSize(tablet ? 1.3 : 2)
    }
});
function mapStateToProps({ purchaseListRed }) {
    return {
        purchaseListRed
    };
}

export default connect(mapStateToProps, { ...getCustomerPurchaseListAct })(PurchaseScreen);

