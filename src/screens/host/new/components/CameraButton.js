// @ts-nocheck
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

import React from 'react'
import {TouchableOpacity, Image, Text} from 'react-native'
import styles from '../Style';
import Feather from 'react-native-vector-icons/MaterialIcons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../../assets/colors/colors';
import deviceInfo from 'react-native-device-info';
const tablet = deviceInfo.isTablet();
let videoDisabledImg = require('../assets/video-disabled.png');
let videoImg = require('../assets/video.png');

export const CameraButton = ({disabled, onPress}) => {
  return (  
  <TouchableOpacity 
  style={{ flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}
    onPress={() => {
      onPress();
  }}>
        <Feather name={disabled ? 'videocam-off' : 'videocam'} color={colors.themeblue} size={responsiveFontSize(tablet?2: 2.5)}  />
    <Text style={{fontSize: tablet? responsiveFontSize(1): responsiveFontSize(1.5), color: colors.themeblue}}>{disabled ? 'Video-Off': 'Video'}</Text>
    {/* <Image
      style={styles.meetingButton}
      source={disabled ? videoDisabledImg : videoImg}
    /> */}
  </TouchableOpacity>
  ) 
}
