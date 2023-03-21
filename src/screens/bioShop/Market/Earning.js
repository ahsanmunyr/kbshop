import {View, ScrollView, Text, StyleSheet} from 'react-native';
import React from 'react';
import EarningCard from './ChildComponents/EarningCard';
import PendingAmountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CoinsIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../assets/colors/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Earning = () => {

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Comming Soon</Text>
    </View>
  )
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.cont}>
        <EarningCard
          title={'Total Earning'}
          value={0}
          icon={
            <CoinsIcon
              name="coins"
              color={"#223150"}
              size={responsiveFontSize(2.5)}
            />
          }
        />
        <EarningCard
          title={'Pending Amount'}
          value={0}
          icon={
            <PendingAmountIcon
              name="database-clock"
              color={"#223150"}
              size={responsiveFontSize(2.5)}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Earning;
