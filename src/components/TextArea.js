import { StyleSheet, TextInput, Dimensions } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()
const { width } = Dimensions.get('window');

const TextArea = ({ getValue, value, numberOfLines, placeholder, style, returnKeyType, onSubmitEditing, innerRef }) => {
  return (
    <>
      <TextInput
        multiline
        numberOfLines={numberOfLines || 4}
        onChangeText={v => getValue(v)}
        value={value}
        onSubmitEditing={() => {
          onSubmitEditing ? onSubmitEditing() : null
        }}
        returnKeyType={returnKeyType ? returnKeyType : 'default'}
        ref={innerRef ? innerRef : null}
        placeholder={placeholder || 'Enter ...'}
        placeholderTextColor={colors.gray}
        style={[styles.txtarea, style]}
      />
    </>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  txtarea: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.silver,
    borderRadius: responsiveFontSize(tablet ? 0.4 : 1),
    backgroundColor: 'white',
    textAlignVertical: 'top',
    paddingLeft: width * 0.03,
    fontSize: responsiveFontSize(tablet ? 1.25 : 1.6),
    color: "gray",
    minHeight: responsiveHeight(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});
