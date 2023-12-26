import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from "../screens/main/Categories";
import Favourite from "../screens/main/Favourite";
import More from "../screens/main/More"
import routes from '../constants/routes';
import Homebutton from 'react-native-vector-icons/MaterialCommunityIcons';
import Categorybutton from 'react-native-vector-icons/MaterialIcons';
import Wishbutton from 'react-native-vector-icons/Ionicons';
import Morebutton from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import Homestacknavigator from './Homestacknavigator';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function Tabnavigator() {

    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: colors.orange,
                tabBarActiveBackgroundColor: colors.greySoft,
                tabBarStyle: {
                    height: 80,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopWidth: 0,
                    backgroundColor: colors.greySoft,
                }
            }} initialRouteName={routes.mainscreen}>
                <Tab.Screen
                    listeners={{
                        tabPress: (e) => {
                            setActive1(true);
                            setActive2(false);
                            setActive3(false);
                            setActive4(false);
                        },
                    }}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View style={{ flexDirection: "column", alignItems: "center", overflow: 'visible' }}>
                                {
                                    active1 === true ? <ImageBackground source={require("../../assets/background.png")} resizeMode='contain' style={styles.activebackground}>
                                        <Homebutton style={{ marginTop: 15 }} name='home-minus-outline' size={40} color={color}></Homebutton>
                                        {(<Text></Text>)}</ImageBackground> : <><Homebutton style={styles.iconbackground} name='home-minus-outline' size={30} color={color}></Homebutton>
                                        <Text style={styles.selectedtab}>Home</Text></>
                                }
                            </View>
                        ),
                    }} name={routes.mainscreen} component={Homestacknavigator} />
                <Tab.Screen listeners={{
                    tabPress: (e) => {
                        setActive1(false);
                        setActive2(true);
                        setActive3(false);
                        setActive4(false);
                    },
                }} options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ flexDirection: "column", alignItems: "center", overflow: 'visible' }}>
                            {
                                active2 === true ? <ImageBackground source={require("../../assets/background.png")} resizeMode='contain' style={styles.activebackground}>
                                    <Categorybutton style={{ marginTop: 15 }} name='category' size={40} color={color}></Categorybutton>
                                    {(<Text></Text>)}</ImageBackground> : <><Categorybutton style={styles.iconbackground} name='category' size={30} color={color}></Categorybutton>
                                    <Text style={styles.selectedtab}>Categories</Text></>
                            }
                        </View>
                    ),
                }} name={routes.categories} component={Categories} />
                <Tab.Screen listeners={{
                    tabPress: (e) => {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                    },
                }} options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ flexDirection: "column", alignItems: "center", overflow: 'visible' }}>
                            {
                                active3 === true ? <ImageBackground source={require("../../assets/background.png")} resizeMode='contain' style={styles.activebackground}>
                                    <Wishbutton style={{ marginTop: 20 }} name='heart' size={40} color={color}></Wishbutton>
                                    {(<Text></Text>)}</ImageBackground> : <><Wishbutton style={styles.iconbackground} name='heart-outline' size={30} color={color}></Wishbutton>
                                    <Text style={styles.selectedtab}>Favourite</Text></>
                            }
                        </View>
                    ),
                }} name={routes.favourite} component={Favourite} />
                <Tab.Screen listeners={{
                    tabPress: (e) => {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(true);
                    },
                }} options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ flexDirection: "column", alignItems: "center", overflow: 'visible' }}>
                            {
                                active4 === true ? <ImageBackground source={require("../../assets/background.png")} resizeMode='contain' style={styles.activebackground}>
                                    <Morebutton style={{ marginTop: 20 }} name='more-vertical' size={40} color={color}></Morebutton>
                                    {(<Text></Text>)}</ImageBackground> : <><Morebutton style={styles.iconbackground} name='more-vertical' size={30} color={color}></Morebutton>
                                    <Text style={styles.selectedtab}>More</Text></>
                            }
                        </View>
                    ),
                }} name={routes.more} component={More} />
            </Tab.Navigator>
        </View>
    );
}

export default Tabnavigator

const styles = StyleSheet.create({
    selectedtab: {
        color: colors.black,
    },

    iconbackground: {
        color: colors.black,
    },
    activebackground: {
        position: "absolute",
        bottom: -20,
        padding: 15,
        borderRadius: 30,
    }
})