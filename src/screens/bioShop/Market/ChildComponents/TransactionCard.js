import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../../../../assets/colors/colors';

const TransactionCard = () => {
  return (
    <View style={styles.cardCont}>
      <DataRow label={'Brand'} value={`Marvel`} />
      <DataRow label={'Campaign'} value={`test 2`} />
      <DataRow label={'Category'} value={`FOOD`} />
      <DataRow label={'Start Date'} value={`2022-03-21`} />
      <DataRow label={'End Date'} value={`2023-03-21`} />
      <DataRow label={'Type'} value={`Clicks`} />
      <DataRow label={'Rate / 1000 Clicks'} value={`$${5.0}`} />
      <DataRow label={'Rate / Click'} value={`$${0.005}`} />
      <DataRow label={'Clicks'} value={`6`} />
      <DataRow label={'Impressions'} value={`86`} />
      <DataRow label={'CTR'} value={`6.98%`} />
      <DataRow label={'Earned'} value={`$${0.03}`} />
    </View>
  );
};
const DataRow = ({label, value}) => {
  return (
    <View style={styles.rowCont}>
      <Text style={styles.textContent}>{label}</Text>
      <Text style={styles.textContent}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardCont: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderRadius: responsiveFontSize(0.75),
    borderWidth: 1,
    borderColor: colors.silver,
    marginTop: responsiveHeight(1.4),
    padding: 10,
    alignSelf:"center",
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowCont: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    paddingVertical: responsiveHeight(1),
  },
  textContent:{
      fontSize:responsiveFontSize(1.6)
  }
});

export default TransactionCard;
