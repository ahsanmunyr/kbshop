// @ts-nocheck
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import BioIcon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../assets/colors/colors';

import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import MarketIcon from "react-native-vector-icons/Fontisto"
import deviceInfo from "react-native-device-info"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ReportIcon from "react-native-vector-icons/Feather"

// import styled from 'styled-components/native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useState } from 'react';
const tablet = deviceInfo.isTablet()


// const bgColors = {
//   Reports: '#c56b14',
//   Favourite: '#f37ff3',
//   Shop: '#4b458c',
//   Menu: '#2d9cdb',
// };

// const textColors = {
//   Reports: '#c56b14',
//   Favourite: '#f37ff3',
//   Shop: '#4b458c',
//   Menu: '#2d9cdb',
// };

// const Container = styled.TouchableWithoutFeedback``;

// const Background = styled(Transitioning.View)`
//   flex: auto;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//  background: ${(props) => (props.focused ? colors.themeblue : "white")};
//   color:"white";
//   border-radius: 100px;
//   margin: 6px;
// `;


// const Label = styled.Text`
//   color: white;
//   font-weight: 600;
//   margin-left: 8px;
// `;

export default function MyTabBar({
  state,
  descriptors,
  navigation,
  reset,
  setReset,
  reset2,
  setReset2,
  reset3,
  setReset3,
  reset4,
  setReset4,
  reset5,
  setReset5,
  reset6,
  setReset6,
  reset7,
  setReset7,
  dataProps,
  route
}) {
  const [change, onChange] = useState(false)
  function renderIcon(route, isFocues) {
    switch (route) {
      case 'Home':
        return (
          <Octicons
            name="home"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      case 'Trending':
        return (
          <ReportIcon name="trending-up"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      // case 'Social Store':
      //   return (
      //     <ShopIcon
      //       name="shopping-bag"
      //       size={responsiveFontSize(tablet ? 1.25 : 2.75)}
      //       color={isFocues ? 'white' : colors.lightGray}
      //     />
      //   );
      case 'Live':
        return (
          <AntDesign
            name="plus"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      case 'Cart':
        return (
          <ReportIcon
            name="shopping-cart"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      // case 'Reports':
      //   return (
      //     <ReportIcon
      //       name="file-text"
      //       size={responsiveFontSize(tablet ? 1.25 : 2.75)}
      //       color={isFocues ? colors.themeblue : colors.lightGray}
      //     />
      //   );
      // case 'Favourite':
      //   return (
      //     <FavouriteIcon
      //       name="favorite"
      //       size={responsiveFontSize(tablet ? 1.25 : 2.75)}
      //       color={isFocues ? colors.themeblue : colors.lightGray}
      //     />
      //   );
      case 'BioShop':
        return (
          <BioIcon
            name="shopping-cart"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      // case 'MarketPlace':
      //   return (
      //     <MarketIcon
      //       name="shopping-bag-1"
      //       size={responsiveFontSize(tablet ? 1.25 : 2.75)}
      //       color={isFocues ? 'white' : colors.lightGray}
      //     />
      //   );
      case 'Menu':
        return (
          <MenuIcon
            name="menu"
            size={responsiveFontSize(tablet ? 1.75 : 2.75)}
            color={isFocues ? 'white' : colors.lightGray}
          />
        );
      default:
        break;
    }
  }



  // const transition = (
  //   <Transition.Sequence>
  //     <Transition.In type="fade" durationMs={100} />
  //     <Transition.Change interpolation="easeInOut" durationMs={100} />
  //     <Transition.Out type="fade" durationMs={100} />
  //   </Transition.Sequence>
  // );

  // const ref = useRef();
  useEffect(() => {
    if (state) {
      // alert("A")
      // console.log(route, "statestatestatestate")
      state.routes.map((route, index) => {


        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        if (route.name == 'Home') {
          if (isFocused) {
            onChange(true)
            console.log("================================");
          }else{
            onChange(false)
          }
        }
      })

    }
  }, [state])


  // alert("ASd")
  return (

    <View style={{
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      height: tablet? responsiveScreenFontSize(4.5): responsiveScreenFontSize(8),
      backgroundColor: change ? 'rgba(0,0,0,0.8)' : "rgba(0,0,0,0.8)",
      // position: change ? 'absolute' : 'relative',
      
      bottom: 0,
      elevation: 0 // <-- this is the solution

    }}>
      {state.routes.map((route, index) => {
        // if (route.name == "BioShop" || route.name == "MarketPlace") {
          if (route.name == "BioShop") {
          return null
        } else {

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });


            if (!event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              // alert("done")

              if (route.name == "Trending") {

                if (isFocused) {
                  navigation.navigate(route.name, { screen: "category" })
                  setReset(!reset)
                } else {
                  navigation.navigate({ name: route.name, merge: true, params: { screen: "category" } });
                  setReset(!reset)
                }

              }
              
              // else if (route.name == "Favourite") {

              //   if (isFocused) {
              //     navigation.navigate(route.name)
              //     setReset2(!reset2)
              //   } else {
              //     navigation.navigate({ name: route.name, merge: true });
              //     setReset2(!reset2)
              //   }

              // }
              else if (route.name == "BioShop") {

                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset3(!reset3)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset3(!reset3)
                }

              }
              else if (route.name == "Live") {

                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset6(!reset6)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset6(!reset6)
                }

              }
              else if (route.name == "Cart") {

                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset6(!reset6)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset6(!reset6)
                }

              }
              // else if (route.name == "Reports") {

              //   if (isFocused) {
              //     navigation.navigate(route.name)
              //     setReset6(!reset6)
              //   } else {
              //     navigation.navigate({ name: route.name, merge: true });
              //     setReset6(!reset6)
              //   }

              // }
              // else if (route.name == "MarketPlace") {

              //   if (isFocused) {
              //     navigation.navigate(route.name)
              //     setReset4(!reset4)
              //   } else {
              //     navigation.navigate({ name: route.name, merge: true });
              //     setReset4(!reset4)
              //   }

              // }
              else if (route.name == "Live Events") {

                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset5(!reset5)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset5(!reset5)
                }

              }
              else if (route.name == "Home") {
                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset(!reset)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset(!reset)

                }
              }
              else if (route.name == "Menu") {
                if (isFocused) {
                  navigation.navigate(route.name)
                  setReset7(!reset7)
                } else {
                  navigation.navigate({ name: route.name, merge: true });
                  setReset7(!reset7)

                }
              }

              // else {
              //   navigation.navigate({ name: route.name, merge: true });
              // }
            }

          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

                padding: responsiveFontSize(0.5),
                // backgroundColor:isFocused ? "red" : "white"
              }}
            >
              {renderIcon(label, isFocused)}
              <Text style={{ color: isFocused ? 'white' : colors.gray, fontSize: responsiveFontSize(tablet ? 0.9 : 1.66), fontWeight: 'bold' }}>
                {label}
              </Text>
            </TouchableOpacity>

          );

        }
      })}
    </View>


  );
}


{/* <TouchableOpacity
key={index}
accessibilityRole="button"
accessibilityState={isFocused ? { selected: true } : {}}
accessibilityLabel={options.tabBarAccessibilityLabel}
testID={options.tabBarTestID}
onPress={onPress}
onLongPress={onLongPress}
style={{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

  padding: responsiveFontSize(0.5),
  // backgroundColor:isFocused ? "red" : "white"
}}
>
{renderIcon(label, isFocused)}
<Text style={{ color: isFocused ? '#000000' : colors.gray, fontSize: responsiveFontSize(tablet ? 0.65 : 1.3) }}>
  {label}
</Text>
</TouchableOpacity> */}


{/* <Container
onPress={() => {
  ref.current.animateNextTransition();
  onPress();
}}>
<Background
  focused={isFocused}
  label={label}
  ref={ref}
  transition={transition}>
 {renderIcon(label, isFocused)}
  {isFocused && (
    <Label label={label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Label>
  )}
</Background>
</Container> */}