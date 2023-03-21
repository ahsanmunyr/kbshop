// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent, findNodeHandle} from 'react-native';
import {NativeFunction} from '../utils/Bridge';

export class RNVideoRenderView extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      NativeFunction.bindVideoView(findNodeHandle(this), this.props.tileId);
    });
    
  }

  componentWillUnmount() {

    NativeFunction.unbindVideoView(this.props.tileId);
  }

  render() {

    return  <RNVideoRenderViewNative {...this.props} />;
  }
}

RNVideoRenderView.propTypes = {
  /**
   * A int value to identifier the Video view, will be used to bind video stream later
   */
  tileId: PropTypes.number,
};

var RNVideoRenderViewNative = requireNativeComponent(
  'RNVideoView',
  RNVideoRenderView,
);
