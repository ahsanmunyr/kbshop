import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const Card = props => {
  return (
    <View style={styles.cardCont}>
      <View style={styles.contentView}>
        <View style={styles.cardHd}>
          <Text style={styles.hd}>{props.title}</Text>
          {props.rightIcon}
        </View>
        <View>{props.children}</View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardCont: {
    flex: 1,
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
  contentView: {
    backgroundColor: colors.white,
    borderRadius: responsiveFontSize(0.75),
    marginTop: responsiveHeight(1),
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hd: {
    color: colors.themeblue,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.silver,
    // marginBottom: responsiveHeight(2),
  },
  cardHd:{
    // backgroundColor:"red",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    marginBottom: responsiveHeight(2),
  }
});
