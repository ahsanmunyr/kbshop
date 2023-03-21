import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import {
    responsiveWidth,
    responsiveFontSize,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get("window");
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = ({ children, styles }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        
        toValue: 1,
        duration: 250,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
        
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 70],
  });

  return (
    <View
      style={{
        backgroundColor: "#c2c2c2",
        borderColor: "#b0b0b0",
        // height: responsiveWidth(33), width: responsiveWidth(33),
        borderRadius:12,
        // left: 100,
      }}
    >
        <View style={{height: responsiveWidth(33), width: responsiveWidth(33),}}>
        <AnimatedLG
            colors={["#c9c9c9", "#c9c9c9", "#c9c9c9", "#c9c9c9"]}
            start={{ x: 1, y: -1 }}
            end={{ x: -1, y: 1 }}
            style={{
                height: responsiveWidth(32), width: responsiveWidth(20), borderRadius:12,
              ...StyleSheet.absoluteFill,
            transform: [{ translateX: translateX }],
            }}
        />
          {children}
        </View>
     
    </View>
  );
};
export default Skeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});