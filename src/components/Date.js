import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import moment from "moment"
import { responsiveHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

moment.locale("en");

export default class DateChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
      
    };
  }

  setDates = (dates) => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const { startDate, endDate, displayedDate, modal } = this.state;
    return (
      <View style={styles.container}>
         <TouchableOpacity onPress={()=> this.setState({
           modal: true
         })} style={{
          height: responsiveHeight(8),
          width: responsiveScreenWidth(80),
          backgroundColor:'white',
          borderWidth: 1,
          borderRadius: 12
        }}>
        </TouchableOpacity>
 
       

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});