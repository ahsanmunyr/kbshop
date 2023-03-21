import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
import ContactUsCard from '../basicSetup/childs/ContactUsCard';

const index = ({ navigation }) => {

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [navigation])
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            <ContactUsCard />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  };
  
  export default index;
  
  const styles = StyleSheet.create({
    cardCont: {
      flex: 1,
      marginHorizontal: '3%',
      marginVertical: '1%',
    },
    contentView: {
      marginTop: responsiveHeight(1),
    },
    hd: {
      color: colors.themeblue,
      fontSize: responsiveFontSize(2),
      fontWeight: '500',
    },
    cardHd: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.silver,
      marginBottom: responsiveHeight(2),
    },
  });
  