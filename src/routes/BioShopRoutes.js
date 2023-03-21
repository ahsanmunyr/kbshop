import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import BioShop from '../screens/bioShop/index';
import AuthScreens from './AuthScreen';
// import BecomeInfluencer from '../screens/Instagram/BecomeInfluencer';
import ConnectionSetup from '../components/ConnectionSetup';
// import InfluencerApplication from '../screens/Instagram/InfluencerApplication';
import * as authAct from "../store/actions/authAct"
// import CategorySetup from '../components/CategorySetup';
const Stack = createNativeStackNavigator();

function BioShopRoutes({ authRed, navigation, refreshAuth, reset3 }) {

    useEffect(() => {
        if (authRed.data?.became_influencer == "pending") {
            refreshAuth()
        }

    }, [reset3])

    function renderData() {
        if (!authRed.success) {
            return AuthScreens(navigation)
        } else {
            // if (authRed.data.package_id && authRed.data.instagram_username) {

            if (authRed.data.package_id) {
                if (authRed.data.category) {
                    return (
                        <Stack.Screen name='bioShop'>
                            {props => <BioShop {...props} navigation={navigation} reset3={reset3} />}
                        </Stack.Screen>
                    )
                } 
                // else {
                //     return (
                //         <Stack.Screen name='categorySetup'>
                //             {props => <CategorySetup {...props} navigation={navigation} header={"none"}  back={"none"}/>}
                //         </Stack.Screen>
                //     )
                // }
            } else {
                return (
                    <>
                        {authRed.data.account_type == "customer" ? (
                            <>
                                {/* <Stack.Screen name='becameInfluencer'>
                                    {props => <BecomeInfluencer {...props} navigation={navigation} header={"none"} />}
                                </Stack.Screen> */}
                                {/* {
                                    (authRed.data.became_influencer == "new" || authRed.data.became_influencer == "rejected") ? <Stack.Screen name='influencerApplication' component={InfluencerApplication} /> : null
                                } */}
                            </>
                        ) : null}
                        <Stack.Screen name='connectionSetup'>
                            {props=><ConnectionSetup {...props} navigation={navigation} back={"none"}/>}
                        </Stack.Screen>
                    </>
                )
            }
        }
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {renderData()}
        </Stack.Navigator>
    )
}

function mapStateToProps({ authRed }) {
    return { authRed }
}

export default connect(mapStateToProps, authAct)(BioShopRoutes)

const styles = StyleSheet.create({})