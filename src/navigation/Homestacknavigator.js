import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import routes from '../constants/routes';
import Dashboard from '../screens/main/Dashboard';
import Cart from '../screens/main/Cart';
import ProductDetails from '../screens/main/ProductDetails';

const Stack = createStackNavigator();

const Homestacknavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }} initialRouteName={routes.dashboard}>
            <Stack.Screen name={routes.dashboard} component={Dashboard} />
            <Stack.Screen name={routes.cart} component={Cart} />
            <Stack.Screen name={routes.productdetails} component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default Homestacknavigator

const styles = StyleSheet.create({})