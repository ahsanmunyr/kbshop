import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Trending from '../screens/trending';
import AuthScreens from './AuthScreen';
import LiveCycle from '../screens/home/Live/LiveCycle';
import {connect} from 'react-redux';
import LiveEvents from '../screens/home/Live/LiveEvents';
import {useState} from 'react';
import LiveEventCycle from '../screens/home/Live/LiveEventCycle';
import UpcomingEvents from '../screens/home/Live/UpcomingEvents';
import InfluencersReviews from '../screens/home/Live/InfluencersReviews';
import Profile from '../screens/home/profile/Profile';

const Stack = createNativeStackNavigator();

const TrendingRoutes = ({navigation, authRed, setReset2, reset2}) => {
  const [isBio, setIsBio] = useState(false);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!authRed.success ? (
        AuthScreens(navigation)
      ) : (
        <>
          <Stack.Screen options={{headerShown:false}} name="trends">
            {props => (
              <Trending
                {...props}
                navigation={navigation}
                reset2={reset2}
                setReset2={setReset2}
              />
            )}
          </Stack.Screen>
          <Stack.Screen options={{headerShown:false}} name="profileDetails">
            {props => (
              <Profile
                {...props}
                // navigation={navigation}
                reset2={reset2}
                setReset2={setReset2}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="liveEvents">
            {props => <LiveEvents {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen name="livecycle">
            {props => <LiveCycle {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen name="liveeventscycle" options={{headerShown: false}}>
            {props => <LiveEventCycle {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen name="upcomingEvents" options={{headerShown: false}}>
            {props => <UpcomingEvents {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
          <Stack.Screen name="influencerReviews" options={{headerShown: false}}>
            {props => <InfluencersReviews {...props} setIsBio={setIsBio} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

function mapStateToProps({authRed}) {
  return {authRed};
}

export default connect(mapStateToProps, null)(TrendingRoutes);
