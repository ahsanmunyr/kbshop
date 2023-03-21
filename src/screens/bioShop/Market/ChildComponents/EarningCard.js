import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../../../../assets/colors/colors';

const {width, height} = Dimensions.get('window');

const EarningCard = ({title, value, icon}) => {
  return (
    <View style={styles.cardCont}>
      <View
        style={{
          flexDirection: 'row',
          width: '30%',
          justifyContent: 'space-between',
          alignItems:"center",
        }}>
        {icon}
        <Text style={styles.amount}>{`$${value}`}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardCont: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(13),
    width: '48%',
    borderRadius: responsiveFontSize(0.75),
    borderWidth: 1,
    borderColor: colors.silver,
    marginTop: responsiveHeight(1.4),
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
  title: {
    fontWeight: '700',
    color: colors.themeblue,
    fontSize: responsiveFontSize(1.9),
    marginTop:responsiveHeight(1)
  },
  amount: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.9),
  },
});

export default EarningCard;
