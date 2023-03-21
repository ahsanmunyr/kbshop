// @ts-nocheck
import {View, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import LiveHostModal from './LiveHostModal';

export default function LandscapeComponent({visible, closeModle, meetingData}) {

  return (
    <LiveHostModal
      visible={visible}
      closeModle={closeModle}
      meetingData={meetingData}
    />
  );
}
