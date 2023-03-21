import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import React from 'react';
import * as actions from '../../../store/actions/market';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Category = ({Name, Selected, typeCheck}) => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        typeCheck(Name);
        Navigation.push(Name);
      }}>
      <View
        style={Selected == Name ? styles.container : styles.containerCondition}>
        <Text style={Selected == Name ? styles.text : styles.textCondition}>
          {Name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: responsiveHeight(1),
    backgroundColor: '#223150',
    borderRadius: responsiveFontSize(3),
    padding: responsiveFontSize(1),
    borderColor: 'white',

    paddingHorizontal: responsiveFontSize(3),
  },
  containerCondition: {
    alignItems: 'center',
    margin: responsiveHeight(1),
    backgroundColor: 'white',
    borderRadius: responsiveFontSize(3),
    padding: responsiveFontSize(1),
    borderColor: '#223150',
    paddingHorizontal: responsiveFontSize(3),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
  textCondition: {
    color: '#223150',
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default connect(null, actions)(Category);
