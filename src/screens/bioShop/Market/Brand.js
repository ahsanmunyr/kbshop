import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownComp from '../../../components/DropDownComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
import Btn from '../../../components/Btn';

const Brand = () => {
  const [isOpenBrandDrpDwn, setIsOpenBrandDrpDwn] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Comming Soon</Text>
    </View>
  )

  return (
    <ScrollView
      contentContainerStyle={styles.scrollCont}
      keyboardShouldPersistTaps="always">
      <View style={styles.cont}>
        <View
          style={[
            styles.textCont,
            {borderBottomWidth: 1, borderBottomColor: '#000000'},
          ]}>
          <Text style={{fontSize: responsiveFontSize(1.9)}}>Brand</Text>
        </View>
        <View style={styles.textCont}>
          <Text style={{fontSize: 15}}>Select Brands</Text>
        </View>
        <DropDownComp
          open={isOpenBrandDrpDwn}
          value={selectedBrands}
          items={items}
          setOpen={setIsOpenBrandDrpDwn}
          setValue={setSelectedBrands}
          placeholdertxt="Select Brands"
          searchPlaceholderTxt="Search Brands"
          style={{
            width: responsiveWidth(80),
            marginVertical: responsiveHeight(1),
          }}
          searchable={true}
          mode="BADGE"
          showBadgeDot={false}
          multiple={true}
          min={0}
          max={6}
          itemKey="key"
        />
        <Btn text="Save" pS={styles.saveBtn} call={()=>console.log("save")} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollCont: {flex: 1},
  cont: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: responsiveHeight(1.4),
  },
  textCont: {
    width: responsiveWidth(80),
    alignSelf: 'center',
    paddingVertical: responsiveHeight(1.4),
  },
  saveBtn: {
    marginVertical: responsiveHeight(1),
    width: responsiveWidth(80),
    alignSelf: 'center',
  },
});

const items = [
  {
    key: 1,
    label: 'Apple',
    value: {
      label: 'Apple',
      image:
        'https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80',
      id: 1,
    },
  },
  {
    key: 2,
    label: 'Banana',
    value: {
      label: 'Banana',
      image:
        'https://cdn.lifehack.org/wp-content/uploads/2019/10/self-image-1024x768.jpeg',
      id: 2,
    },
  },
  {
    key: 3,
    label: 'Sad',
    value: {
      label: 'Sad',
      image:
        'https://media.gettyimages.com/photos/quaideazam-picture-id184944186?s=612x612',
      id: 3,
    },
  },
  {
    key: 4,
    label: 'Cry',
    value: {
      label: 'Cry',
      image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
      id: 4,
    },
  },
  {
    key: 6,
    label: 'Smile',
    value: {
      label: 'Smile',
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      id: 6,
    },
  },
  {
    key: 7,
    label: 'Blushing',
    value: {
      label: 'Blushing',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU',
      id: 7,
    },
  },
  {
    key: 8,
    label: 'Disgust',
    value: {
      label: 'Disgust',
      image:
        'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/photos/term-bg-1-c98135712157fb21286eafd480f610f9.jpg',
      id: 8,
    },
  },
];

export default Brand;
