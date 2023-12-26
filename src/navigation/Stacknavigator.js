import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import routes from '../constants/routes';
import Tabnavigator from './Tabnavigator';

const Stack = createStackNavigator();

const Stacknavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }} initialRouteName={routes.homescreen}>
            <Stack.Screen name={routes.homescreen} component={Tabnavigator} />
        </Stack.Navigator>
    )
}

export default Stacknavigator

const styles = StyleSheet.create({})