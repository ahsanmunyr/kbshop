// @ts-nocheck
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

import React from 'react'
import {TouchableOpacity, Image,Text} from 'react-native'
// import styles from '../Style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
const tablet = deviceInfo.isTablet();
// let mutedImg = require('../assets/microphone-muted.png');
// let normalImg = require('../assets/microphone.png');

export const MuteButton = ({muted, onPress}) => {
  return (  
  <TouchableOpacity 
  style={{ flexDirection:'column', justifyContent:'space-between', alignItems:'center',paddingVertical:responsiveFontSize(0.5)}}
    onPress={() => {
      onPress();
  }}>
    <Ionicons name={muted ? 'mic-off-outline' : 'mic-outline'} color={colors.themeblue} size={responsiveFontSize(tablet? 2:2.5)}  />
    <Text style={{fontSize: responsiveFontSize(tablet? 1:1.5), color: colors.themeblue}}>{muted ? 'Mic': 'Mic'}</Text>
    {/* <Image
      style={styles.meetingButton}
      source={muted ? mutedImg : normalImg}
    /> */}
  </TouchableOpacity>
  ) 
}
