import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CategoryImageList = ({ID, Images, Name, onPressCat}) => {
  return (
    <TouchableOpacity key={ID} onPress={()=>onPressCat(Images)}>
      <View
        style={{
          // backgroundColor: 'red',
          width: responsiveHeight(11),
          height: responsiveHeight(11),
          borderRadius: responsiveFontSize(100),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e8e8e8',
          marginHorizontal: responsiveHeight(1),
        }}>
        <Image
          style={{
            width: responsiveHeight(10),
            height: responsiveHeight(10),
            borderRadius: responsiveFontSize(100),
            //  marginHorizontal: responsiveHeight(0.4)
          }}
          source={{uri: Images}}
        />
      </View>
      <Text style={{textAlign: 'center'}}>{Name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryImageList;
