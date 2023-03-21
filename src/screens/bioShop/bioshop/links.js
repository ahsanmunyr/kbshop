import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import React from 'react';
import * as actions from '../../../store/actions/bioShop';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';

const Links = ({ID, Name, RedirectLink}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (RedirectLink) {
          Linking.openURL(RedirectLink);
        } else {
          alert('No Link To Show');
        }
      }}
      style={styles.button}>
      <Text style={styles.buttonText}>{Name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: responsiveWidth(65),
    height: responsiveHeight(5),
    backgroundColor: '#185887',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});

export default connect(null, actions)(Links);
