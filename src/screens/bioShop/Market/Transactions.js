import {View, ScrollView, StyleSheet,Text} from 'react-native';
import React from 'react';
import TransactionCard from './ChildComponents/TransactionCard';
import {FlatList} from 'react-native-gesture-handler';
import NotFound from '../../../components/NotFound';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Transactions = () => {

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Comming Soon</Text>
    </View>
  )
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({item, index}) => <TransactionCard />}
          horizontal={false}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={NotFound}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default Transactions;
