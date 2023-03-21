// @ts-nocheck
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/colors/colors';
import deviceInfo from "react-native-device-info"

const tablet = deviceInfo.isTablet()

const InputField = ({
  maxL,
  placeHolder,
  icon,
  getValue,
  password,
  keyboardType,
  defaultValue,
  color,
  error,
  innerRef,
  returnKeyType,
  value,
  columns,
  onSubmitEditing,
  smallCaps = false,
  inputType = 'default',
  rightIcon = () => {
    return;
  },
  onPressRghtIcon = () => {
    return;
  },
  passedStyle,
  editable = true
}) => {
  return (
    <View style={{ ...styles.container, alignItems: columns ? "flex-start" : "center", }}>
      {icon ? <View style={{ position: 'absolute', left: responsiveFontSize(2), marginHorizontal: responsiveWidth(0), marginTop: columns ? responsiveFontSize(1) : 0,zIndex: 999 }}>{icon()}</View> : null}
      {inputType !== 'password' ? (
        <>
          <TextInput
            // defaultValue={defaultValue ? defaultValue : null}
            maxLength={maxL}
            value={value}
            onSubmitEditing={() => onSubmitEditing ? onSubmitEditing() : null}
            ref={innerRef ? innerRef : null}
            returnKeyType={returnKeyType ? returnKeyType : "default"}
            keyboardType={keyboardType === 'number' ? 'number-pad' : 'default'}
            secureTextEntry={password ? true : false}
            autoCapitalize={smallCaps ? "none" : null}
            onChangeText={v => getValue(v)}
            multiline={columns ? true : false}
            numberOfLines={columns ? columns : null}
            textAlignVertical={columns ? "top" : null}
            placeholder={placeHolder}
            placeholderTextColor={color}
            style={[{ ...styles.input, color: color, borderColor: color }, passedStyle, { paddingLeft: icon ? responsiveWidth(tablet ? 12 : 10) : responsiveWidth(tablet ? 1.75 : 3) }]}
            editable={editable}
          />
          {error ? (
            <View style={{ position: 'absolute', right: 5, marginHorizontal: responsiveWidth(1) }}>
              <ErrorIcon name="error" color={colors.errorRed} size={responsiveFontSize(tablet ? 1.75 : 2)} />
            </View>
          ) : null}
        </>
      ) : (
        <>
          <TextInput
            // defaultValue={defaultValue ? defaultValue : null}
            value={value}
            returnKeyType={returnKeyType ? returnKeyType : "default"}
            onSubmitEditing={() => onSubmitEditing ? onSubmitEditing() : null}
            ref={innerRef ? innerRef : null}
            keyboardType={keyboardType === 'number' ? 'number-pad' : 'default'}
            secureTextEntry={password ? true : false}
            autoCapitalize={smallCaps ? "none" : null}
            onChangeText={v => getValue(v)}
            placeholder={placeHolder}
            placeholderTextColor={color}
            style={{ ...styles.input, color: color, borderColor: color, paddingLeft: icon ? responsiveWidth(tablet ? 12 : 10) : responsiveWidth(tablet ? 1.75 : 3) }}
          />
          {error ? (
            <View style={{ position: 'absolute', right: 10, marginHorizontal: responsiveWidth(1) }}>
              <ErrorIcon name="error" color={colors.errorRed} size={responsiveFontSize(tablet ? 2 : 2)} />
            </View>
          ) : null}
          {value !== null && value.length > 0 && (
            <TouchableOpacity
              onPress={onPressRghtIcon}
              style={{ position: 'absolute', right: 10, marginHorizontal: responsiveWidth(1) }}>
              {rightIcon()}
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: responsiveFontSize(0.75),
    borderWidth: 1,
    borderColor: colors.silver,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    backgroundColor:'white',
    borderRadius:tablet?responsiveScreenFontSize(0.3): responsiveScreenFontSize(1),
    // elevation: 2,

  },
  input: {
    flex: 1,
    // paddingTop: responsiveHeight(1.5),
    // paddingBottom: responsiveHeight(1.5),
    color:colors.themeblue,
    paddingVertical: responsiveHeight(Platform.OS == "ios" ? (tablet ? 1.5 : 1.75) : 1.5),
    paddingRight: responsiveWidth(9),
    fontSize: responsiveFontSize(tablet ? 1.25 : 1.9),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor:'white',
    borderRadius:responsiveScreenFontSize(tablet?0.3:1),
    // elevation: 2,
    // marginRight:responsiveWidth(10),
    // backgroundColor:"skyblue"
  },
  // input: {
  //   borderBottomWidth: 1,
  //   flex: 1,
  //   paddingTop: responsiveHeight(1.5),
  //   paddingRight: 10,
  //   paddingBottom: responsiveHeight(1.5),
  //   paddingLeft: responsiveWidth(8),
  // },
});

export default InputField;
