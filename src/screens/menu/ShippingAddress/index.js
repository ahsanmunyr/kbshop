import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import colors from '../../../assets/colors/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/FontAwesome5';
import deviceInfoModule from 'react-native-device-info';
import ShippingAddressCard from '../../../components/ShippingAddressCard';
import {connect} from 'react-redux';
import AddressForm from './AddressForm';
import * as getShippingAddress from '../../../store/actions/shippingAddressAct';
import NotFound from '../../../components/NotFound';
import Loader from '../../../components/Loader';

const tablet = deviceInfoModule.isTablet();

const ShippingAddress = ({
  navigation,
  header,
  getShippingAddress,
  shippingAddressRed,
  setDefaultAddress,
  deleteShippingAddress,
}) => {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [addEditAddress, setAddEditAddress] = useState(null);
  const [updateAddressItem, setUpdateAddressItem] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: header == 'none' ? false : true,
    });
  }, [navigation]);

  useEffect(() => {
    setIsApiCall(true);
    getShippingAddress().then(() => {
      setIsApiCall(false);
    });
  }, []);

  useEffect(() => {
    setShippingAddresses(shippingAddressRed);
  }, [shippingAddressRed]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ScrollView style={{ flex: 1, backgroundColor: 'white' }} nestedScrollEnabled={true}> */}
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.headerCont}>
          <TouchableOpacity
            style={styles.headLeftComp}
            onPress={() =>
              addEditAddress === null
                ? navigation.navigate('menu')
                : setAddEditAddress(null)
            }>
            <BackIcon
              name="arrow-back"
              size={responsiveFontSize(tablet ? 2 : 3)}
              color={colors.themeblue}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {addEditAddress === 'add'
              ? 'Add Address'
              : addEditAddress === 'edit'
              ? 'Update Address'
              : 'Shipping Address'}
          </Text>
          {addEditAddress !== 'add' && addEditAddress !== 'edit' ? (
            <TouchableOpacity
              style={styles.headRightComp}
              onPress={() => setAddEditAddress('add')}>
              <PlusIcon
                name="plus"
                size={responsiveFontSize(tablet ? 1 : 1.5)}
                color={colors.white}
                style={{marginRight: '2%'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(tablet ? 1 : 1.5),
                  textAlign: 'center',
                }}>
                Add Address
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{paddingVertical: responsiveFontSize(1)}} />
          )}
        </View>
        <View style={styles.cardParentCont}>
          {addEditAddress === 'add' || addEditAddress === 'edit' ? (
            <AddressForm onBack={() => {setAddEditAddress(null); setUpdateAddressItem(null)}} actionType={addEditAddress} data={updateAddressItem} />
          ) : isApiCall ? (
            <Loader />
          ) : (
            <FlatList
              data={shippingAddresses}
              renderItem={({item, index}) => (
                <ShippingAddressCard
                  onPressCard={() =>
                    setDefaultAddress(item?._id, getShippingAddress)
                  }
                  onEdit={() => {setAddEditAddress('edit'); setUpdateAddressItem(item)}}
                  // onEdit={() =>
                  //   navigation.navigate('updateShippingAddress', {data: item})
                  // }
                  onDelete={id => deleteShippingAddress(id, getShippingAddress)}
                  address={item}
                />
              )}
              keyExtractor={(item, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <View style={{height: responsiveScreenFontSize(10)}} />
              }
              ListEmptyComponent={() => (
                <NotFound text={'Shipping Address not available'} />
              )}
            />
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({shippingAddressRed}) => {
  return {shippingAddressRed};
};

export default connect(mapStateToProps, getShippingAddress)(ShippingAddress);

const styles = StyleSheet.create({
  // header Style
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
  headLeftComp: {
    paddingHorizontal: responsiveFontSize(tablet ? 1 : 1),
  },
  headerTitle: {
    color: colors.themeblue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(tablet ? 1.25 : 2.2),
    padding: responsiveFontSize(2),
    textAlign: 'center',
  },
  headRightComp: {
    backgroundColor: 'green',
    paddingHorizontal: responsiveFontSize(tablet ? 0.7 : 1),
    paddingVertical: responsiveFontSize(tablet ? 0.7 : 1),
    borderRadius: responsiveFontSize(0.5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // main container
  cardParentCont: {marginHorizontal: '3%', flex: 1},
});
