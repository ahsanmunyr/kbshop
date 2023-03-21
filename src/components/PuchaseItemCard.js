import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import colors from '../assets/colors/colors';
import numeral from 'numeral';

const tablet = deviceInfo.isTablet();

const PuchaseItemCard = ({data}) => {
  return (
    <View style={styles.con}>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.fieldBox}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Order#:
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              {data?.order_id}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.fieldBox}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Order Date :
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              {data?.created_date}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.fieldBox}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Brand :
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              {data?.brand_name}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.fieldBox}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Actual Price :
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              ${numeral(data?.total_sale).format("0,0.00")}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.fieldBox}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Discount :
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              ${numeral(data?.discount).format("0,0.00")}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: responsiveFontSize(tablet ? 0.25 : 0.5),
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{ ...styles.fieldBox, borderBottomWidth: 0 }}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              Total Price :
            </Text>
            <Text
              style={[
                styles.text,
                ,
                {
                //   fontWeight: 'bold',
                  //   groupBy == '' || groupBy == 'campaign' ? 'bold' : null,
                },
              ]}>
              ${numeral(data?.order_totalprice).format("0,0.00")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PuchaseItemCard;

const styles = StyleSheet.create({
  con: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: responsiveFontSize(1),
    borderRadius: responsiveFontSize(tablet ? 0.25 : 0.5),
    borderColor: colors.themeblue,
    borderWidth: 0.5,
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 1 : 1.5),
  },
  header: {
    backgroundColor: colors.themeblue,
    flexDirection: 'row',
    padding: responsiveFontSize(0.75),
    borderTopLeftRadius: responsiveFontSize(0.5),
    borderTopRightRadius: responsiveFontSize(0.5),
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBox: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: responsiveFontSize(tablet ? 0.5 : 1),
    justifyContent: 'space-between',
    paddingVertical: responsiveFontSize(tablet ? 0.3 : 0.5),
    borderBottomColor: 'gray',
    borderBottomWidth: 0.75,
  },
});
