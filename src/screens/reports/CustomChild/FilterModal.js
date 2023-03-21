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
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import colors from '../../../assets/colors/colors';
import DropDownComp from '../../../components/DropDownComp';
import Btn from '../../../components/Btn';
const tablet = deviceInfoModule.isTablet();

const FilterModal = ({ opens, close, functionOfFilter,isReferralStatusFilter = false, isDashboardFilter = false }) => {
    const [filters, setFilters] = useState({})
    const [sortBy, onChangeSortBy] = useState('')
    const [category, onChangeCategory] = useState([])
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [startDate, onChangeStartDate] = useState(new Date());
    const [startDate1, onChangeStartDate1] = useState(new Date());


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'All', value: 'all' },
        { label: 'Social Store', value: 'store' },
        { label: 'Event', value: 'event' },
    ]);

    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        { label: 'None', value: 'none' },
        { label: 'Date', value: 'date' },
        { label: 'Category', value: 'category' },
        { label: 'Brand', value: 'brand' },

    ]);
    const sortByItems = [
        { label: 'Shares', value: 'share' },
        { label: 'Views', value: 'view' },
        { label: 'Price', value: 'grosssale' },
        { label: 'Amount Price', value: 'netsale' },
    ]

    useEffect(() => {
        
    }, [])


    const search = () => {
        let startdate = moment(startDate).format('YYYY-MM-DD')
        let enddate = moment(startDate1).format('YYYY-MM-DD')
        if(value == null && value1 == null){
            console.log("1")
            functionOfFilter(25,startdate,enddate,'all',isReferralStatusFilter ? sortByItems[0].value : 'none')
        }else if(value == null && value1 != null){
            console.log("2")
            functionOfFilter(25,startdate,enddate,'all',value1)
        }else if(value != null && value1 == null){
            console.log("3")
            functionOfFilter(25,startdate,enddate,value,isReferralStatusFilter ? sortByItems[0].value :'none')
        }else if(value1 != null  && value1  != null){
            console.log("4")
            functionOfFilter(25,startdate,enddate,value, value1)
        }else{
            console.log("end")
        }
       
        
        
        close(false);
    }

    const reset = () => {
        setValue1(null)
        setValue(null)
        onChangeStartDate(new Date())
        onChangeStartDate1(new Date())
    }

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


    return (
        <Modal
            animationType="fade"
            transparent={true}
            style={{
                flex: 1,
                justifyContent: 'center',
                elevation: 5,
            }}
            onRequestClose={close}
            statusBarTranslucent={true}
            visible={opens}>
            <View style={styles.modalCont}>
                <View style={styles.modalView}>
                    <View style={{ 
                        width: '100%', 
                        // height: responsiveScreenFontSize(5), 
                        justifyContent: 'space-between', 
                        // alignItems: 'flex-end', 
                        flexDirection: 'row',
                        alignItems:"center"
                    }}>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            width: tablet ? "20%" :'25%' 
                        }}>
                            <Text style={{ 
                                color: colors.themeblue, 
                                fontSize: responsiveFontSize(tablet ? 2 : 2.5)}}>Filter</Text>
                            <FilterIcon
                                name="sliders"
                                color={colors.themeblue}
                                size={responsiveFontSize(tablet ? 2 : 3)}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                close(false);
                            }}>
                            <CrossIcon
                                name="cross"
                                color={'#010b40'}
                                size={responsiveFontSize(tablet ? 2 : 3)}
                            />

                        </TouchableOpacity>
                    </View>
                    <View>
                        {!isDashboardFilter && <View style={{
                            // height: responsiveScreenFontSize(10),
                            width: '98%', 
                            alignSelf: 'center', 
                            // backgroundColor: 'red', 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginVertical:responsiveScreenFontSize(1)
                        }}>
                            <View style={{

                            }}>
                                {/* <Text
                                    style={{
                                        color: 'black',
                                        fontSize: responsiveFontSize(2),
                                        bottom: 5,
                                    }}>
                                    Source
                                </Text> */}
                                <View style={{ 
                                    // top: tablet ? responsiveFontSize(2.5) : 0, 
                                    width: responsiveWidth(40), 
                                    zIndex: 9999,
                                    }}>
                                    <DropDownComp
                                        items={items}
                                        open={open}
                                        value={value}
                                        setOpen={setOpen}
                                        onSelectItem={data => {
                                            setValue(data.value)
                                        }}
                                        listMode="SCROLLVIEW"
                                        ShowsVerticalScrollIndicator={false}
                                        textStyle={{
                                            fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),
                                        }}
                                        placeholdertxt={'Source'}
                                        style={{
                                            width: responsiveWidth(40),
                                            paddingLeft: 10,
                                        }}
                                        containerStyle={{}}
                                        dropDownContainerStyle={{
                                            width: responsiveWidth(40),
                                            right: responsiveWidth(25),
                                        }}
                                    />
                                </View>
                            </View>
                            <View>
                                {/* <Text
                                    style={{
                                        color: 'black',
                                        fontSize: responsiveFontSize(2),
                                        bottom: 5,
                                    }}>
                                    Group By
                                </Text> */}
                                <View style={{ 
                                    // top: tablet ? responsiveFontSize(2.5) : 0, 
                                    width: responsiveWidth(40), 
                                    zIndex: 9999 }}>
                                    {isReferralStatusFilter ?
                                    <DropDownComp
                                        items={sortByItems}
                                        open={open1}
                                        value={value1}
                                        setOpen={setOpen1}
                                        onSelectItem={data => {
                                            setValue1(data.value)
                                        }}
                                        listMode="SCROLLVIEW"
                                        ShowsVerticalScrollIndicator={false}
                                        textStyle={{
                                            fontSize: responsiveFontSize(tablet ? 1.3 : 1.8),
                                        }}
                                        placeholdertxt={"Sort By"}
                                        style={{
                                            width: responsiveWidth(40),
                                            paddingLeft: 10,
                                        }}
                                        containerStyle={{}}
                                        dropDownContainerStyle={{
                                            width: responsiveWidth(40),
                                            // height: responsiveHeight(16),
                                            right: responsiveWidth(25),
                                        }}
                                    />
                                    : <DropDownComp
                                        items={items1}
                                        open={open1}
                                        value={value1}
                                        setOpen={setOpen1}
                                        onSelectItem={data => {
                                            setValue1(data.value)
                                        }}
                                        listMode="SCROLLVIEW"
                                        ShowsVerticalScrollIndicator={false}
                                        textStyle={{
                                            fontSize: responsiveFontSize(tablet ? 1 : 1.8),
                                        }}
                                        placeholdertxt={'Group By'}
                                        style={{
                                            width: responsiveWidth(40),
                                            paddingLeft: 10,
                                        }}
                                        containerStyle={{}}
                                        dropDownContainerStyle={{
                                            width: responsiveWidth(40),
                                            // height: responsiveHeight(16),
                                            right: responsiveWidth(25),
                                        }}
                                    />}
                                </View>
                            </View>
                        </View>}
                        <View style={{
                            // height: responsiveScreenFontSize(10),
                            zIndex: -1,
                            width: '98%', 
                            alignSelf: 'center', 
                            // backgroundColor: 'red', 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            paddingBottom:responsiveHeight(0.5),
                            paddingTop: !isDashboardFilter ? 0 : responsiveHeight(2)
                        }}>
                            <View style={{

                            }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: responsiveFontSize(tablet ? 1.3 : 2),
                                        bottom: 5,
                                    }}>
                                    Start Date
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShow(true)}
                                    style={styles.datePicker}>
                                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1.3 : 1.8) }}>
                                        {moment(startDate).format('YYYY-MM-DD')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: responsiveFontSize(tablet ? 1.3 : 2),
                                        bottom: 5,
                                    }}>
                                    End Date
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShow1(true)}
                                    style={styles.datePicker}>
                                    <Text style={{ fontSize: responsiveFontSize(tablet ? 1.3 : 1.8) }}>
                                        {moment(startDate1).format('YYYY-MM-DD')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View style={{ width: '100%', height: responsiveScreenFontSize(0.05), backgroundColor: '#b8b8b8', marginVertical: responsiveScreenFontSize(0.7), zIndex: -1 }} />
                    <View style={{
                        height:responsiveHeight(tablet ? 15 : 12), 
                        width:'100%', 
                        alignSelf:'center', 
                        justifyContent:'space-around', 
                        zIndex: -1,
                    }}>

                    <Btn text="Search" call={()=> search()} />
                    <Btn text="Reset"  call={()=> {
                        reset()
                    }}  />
                    </View>
                    <View style={{height:responsiveHeight(tablet ? 1 : 2)}} />
                </View>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    isVisible={show}
                    mode="date"
                    maximumDate={startDate1}
                    is24Hour={true}
                    onConfirm={onChange}
                    onCancel={() => setShow(false)}
                />

                <DateTimePicker
                    isVisible={show1}
                    testID="dateTimePicker1"
                    value={startDate1}
                    // minimumDate={startDate}
                    maximumDate={startDate1}
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
        backgroundColor: 'white',
        // height: responsiveScreenFontSize(50),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingTop: 15,
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
        alignItems: 'flex-end',
        width: responsiveWidth(6),
    },
    modalBody: {},
    sortByCont: {
        marginVertical: responsiveHeight(1),
    },
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
});

function mapStateToProps({ }) {
    return {

    };
}

export default connect(mapStateToProps, null)(FilterModal);
