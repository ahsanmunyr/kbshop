import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';
import DownArrwIcon from 'react-native-vector-icons/Ionicons';
import CancelIcon from "react-native-vector-icons/MaterialIcons"
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet()

const DropDownComp = ({
  items,
  // setItems,
  open,
  value,
  setOpen,
  setValue = () => {
    return;
  },
  style,
  dropDownContainerStyle,
  containerStyle,
  listMode = 'MODAL',
  searchable = false,
  onSelectItem = () => {
    return;
  },
  placeholdertxt,
  searchPlaceholderTxt,
  mode = 'SIMPLE',
  badgeDotColors = 'white',
  error = false,
  showBadgeDot = false,
  multiple = false,
  min = 0,
  max = 1,
  itemKey,
  renderBadgeItem,
  textStyle,
  tickIconStyle,
  disable
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      // setItems={setItems}
      
      onSelectItem={item => {
        onSelectItem(item);
      }}
      disabled={disable}
      ArrowDownIconComponent={({style}) =>
        error ? (
          <ErrorIcon name="error" color={colors.errorRed} size={responsiveFontSize(tablet?1.25:2)} />
        ) : (
          <DownArrwIcon name="chevron-down-sharp" size={responsiveFontSize(tablet?1.25:2)} />
        )
      }
      style={[
        {
          alignSelf: 'center',
          borderColor: colors.silver,
          height: responsiveHeight(6),
          minHeight: 10,
          width: responsiveWidth(90),
          borderRadius: responsiveFontSize(tablet?0.4:0.75),
          borderWidth: 1,
        },
        style,
      ]}
      containerStyle={[
        {width: responsiveWidth(90), alignSelf: 'center'},
        containerStyle,
      ]}
        
      dropDownContainerStyle={[
        {
          backgroundColor: colors.white,
          borderColor: colors.silver,
          borderTopWidth: 0,
          borderStartWidth: 1,
          borderEndWidth: 1,
          borderBottomWidth: 1,
          width: responsiveWidth(90),
        },
        dropDownContainerStyle,
      ]}
      placeholderStyle={{
        color: colors.gray,
      }}
      placeholder={placeholdertxt || 'All'}
      searchPlaceholder={searchPlaceholderTxt || 'Search ...'}
      textStyle={[
        {
          fontSize: responsiveFontSize(tablet?1.25:1.7),
          color: colors.gray,
        },
        textStyle,
      ]}
      closeIconStyle={{
        height: responsiveHeight(3),
        width: responsiveWidth(5),
      }}
      searchContainerStyle={{
        borderBottomColor: colors.silver,
      }}
      searchTextInputStyle={{
        borderColor: colors.silver,
      }}
      scrollViewProps={{keyboardShouldPersistTaps: 'handled', nestedScrollEnabled:true}}
      flatListProps={{keyboardShouldPersistTaps: 'always'}}
      searchPlaceholderTextColor="grey"
      listParentContainerStyle={{
        height: responsiveHeight(4),
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
      }}
      closeOnBackPressed={true}
      disableBorderRadius={true}
      
      listMode={listMode}
      searchable={searchable}
      badgeDotColors={badgeDotColors}
      mode={mode}
      showBadgeDot={showBadgeDot}
      multiple={multiple}
      min={min}
      max={max}
      {...(itemKey && {itemKey: itemKey})}
      badgeStyle={{
        flexDirection: 'row-reverse',
      }}
      {...(renderBadgeItem && {renderBadgeItem: renderBadgeItem})}
      {...(tickIconStyle && {tickIconStyle: tickIconStyle})}
    />
  );
};

export default DropDownComp;
