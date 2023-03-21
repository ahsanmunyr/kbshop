// @ts-nocheck
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,

  responsiveWidth
} from 'react-native-responsive-dimensions';
import deviceInfo from 'react-native-device-info';
import colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const tablet = deviceInfo.isTablet();

const HostEventComp = ({title, start_date, banner, prodHost, onPressEvent}) => {
  useEffect(() => {}, []);

  return (
    <>
         
      <TouchableOpacity onPress={() => onPressEvent()} style={styles.eventBox}>
        {/* <View
          style={{
            paddingVertical: responsiveHeight(0.5),
            paddingHorizontal: '2%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 0.75 : 1.9),
              color: '#162b4c',
            }}>
            {title}
          </Text>
          <TimeDate
            data={moment(start_date).format('YYYY-MM-DD')}
            isDate={true}
          />
        </View> */}
        <View style={styles.content}>
          <View style={{
                 width:tablet? responsiveWidth(25): responsiveWidth(35),
                 height: tablet? responsiveHeight(18): responsiveHeight(20),
                 alignSelf: 'center',
               
                 borderTopLeftRadius: responsiveFontSize(tablet?0.5:1),
                 borderBottomLeftRadius: responsiveFontSize(tablet?0.5:1),
                 backgroundColor: '#010b40',
                 justifyContent:'center',alignItems:'center'
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 140,
              height: tablet? responsiveHeight(12): responsiveHeight(15),
              // top: 10,  
              justifyContent:'center',
              alignItems:"center",
              alignSelf: 'center',
              borderRadius: responsiveFontSize(tablet?0.5:1),
              backgroundColor: '#010b40',
            }}
            source={{
              uri: banner,
            }}
          />
          </View>
          <View style={styles.info}>
          <Text
            style={{
              fontSize: responsiveFontSize(tablet ? 1 : 1.9),
              color: '#162b4c',
              marginTop:responsiveFontSize(tablet?0.25:0.5)
            }}>
            {title}
          </Text>
       
            <View
              style={{
                height: responsiveHeight(15),
                // marginTop: 2,
                // backgroundColor:'red',
                justifyContent:'flex-start',
                paddingTop: responsiveFontSize(1),
                width: responsiveWidth(55)
              }}>
              {prodHost.map((item, i) => {
                return (
                  <View key={i}>
                    {item?.producer == 1 && (
                      <TextWithIcon
                        label="Producer"
                        value={item?.user_name}
                        icon="user"
                      />
                    )}
                    {item?.primary && (
                      <TextWithIcon
                        label="Primary"
                        value={item?.user_name}
                        icon="user"
                      />
                    )}
                    {item?.host1 && (
                      <TextWithIcon
                        label="Host1"
                        value={item?.user_name}
                        icon="user"
                      />
                    )}
                    {item?.host2 && (
                      <TextWithIcon
                        label="Host2"
                        value={item?.user_name}
                        icon="user"
                      />
                    )}
                    {item?.host3 && (
                      <TextWithIcon
                        label="Host3"
                        value={item?.user_name}
                        icon="user"
                      />
                    )}
                  </View>
                );
              })}
            </View>
            <View style={styles.timeCont}>
            <TimeDate
            data={moment(start_date).format('YYYY-MM-DD')}
            isDate={true}
          />
              <TimeDate data={moment(start_date).format('hh:mm A')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const TimeDate = ({data, isDate = false}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon
        color={'#162b4c'}
        name={isDate ? 'calendar' : 'clock-o'}
        size={responsiveFontSize(tablet?1.25:2)}
      />
      <Text
        style={{
          marginLeft: tablet?'3%':'2%',
          color: '#162b4c',
          fontSize: responsiveFontSize(tablet ? 0.9 : 1.5),
        }}>
        {data}
      </Text>
    </View>
  );
};

const TextWithIcon = ({label, value, icon}) => {
  return (
    <View style={styles.iconText}>
      <Icon color={'#162b4c'} name={icon} size={responsiveFontSize(tablet?1.5:2)} />
      <Text style={styles.text}>
        {label} : {value}
      </Text>
    </View>
  );
};

export default HostEventComp;

const styles = StyleSheet.create({
  eventBox: {
    width: tablet? responsiveWidth(95): responsiveWidth(90),
    borderRadius: responsiveFontSize(tablet?0.5:1),
    backgroundColor: 'white',
    marginBottom: tablet?'1.5%':'3%',
  
    alignContent: 'center',
    alignSelf: 'center',
    borderColor: colors.silver,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    // paddingHorizontal: '2%',
  },
  text: {
    fontSize: responsiveFontSize(tablet ? 0.9 : 1.5),
    color: '#162b4c',
    marginBottom: responsiveHeight(0.2),
    marginLeft: tablet?'2%':'1%',
  },
  content: {
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(1),
    paddingRight: '2%',

  },
  cover: {
    width: '30%',
    height: responsiveHeight(18),
    alignSelf: 'center',
    borderRadius: responsiveFontSize(0.5),
    backgroundColor: '#010b40',
  },
  info: {
    // width: '64%',
    // flexDirection: 'column',
    paddingLeft: '2%',
  },
  timeCont: {
    height: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    // marginRight: 10,
    paddingHorizontal:responsiveFontSize(1),
    position: 'absolute', bottom: responsiveFontSize(0.5),
    width: tablet? responsiveWidth(64): responsiveWidth(54),
    left: 6, 
    // backgroundColor:'red'
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
