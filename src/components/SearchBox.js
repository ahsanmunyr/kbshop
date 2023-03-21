import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import colors from '../assets/colors/colors';

const SearchBox = ({
  isOpenDropDown,
  setIsOpenDropDown,
  selectedValue,
  setSelectedValue,
  placeHolder,
  searchPlaceHolder,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Banana1', value: 'banana1'},
    {label: 'Banana2', value: 'banana2'},
    {label: 'Banana3', value: 'banana3'},
    {label: 'Banana4', value: 'banana4'},
    {label: 'Banana5', value: 'banana5'},
    {label: 'Banana6', value: 'banana6'},
    {label: 'Banana7', value: 'banana7'},
  ]);

  useEffect(() => {
    // console.log(value, '-----------');
  }, [value]);
  DropDownPicker.setMode("BADGE");
  return (
    <>
      <DropDownPicker
        disabled
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        zIndex={9999999}
        searchable={true}
        multiple={true}
        placeholder={placeHolder || 'Change'}
        searchPlaceholder={searchPlaceHolder || 'Search...'}
        listParentContainerStyle={{
          zIndex: 9999999,
        }}
        style={{
          backgroundColor: 'crimson',
          // zIndex: 999999999,
          borderRadius:responsiveFontSize(5)
        }}
        searchContainerStyle={{
          borderBottomColor: '#dfdfdf',
        }}
        badgeColors={[colors.lightThemeBlue]}
        badgeDotColors={[colors.errorRed]}
        badgeTextStyle={{
            color:"#ffffff"
          }}
      />
    </>
  );
};

export default SearchBox;
