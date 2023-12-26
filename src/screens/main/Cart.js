import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderTitle } from '@react-navigation/elements'
import colors from '../../constants/colors'
import Backbutton from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-vector-icons/Entypo';
import routes from '../../constants/routes';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { editProductsData, getAllProducts } from '../../store/slice';
import { useNavigation } from '@react-navigation/native';

const Cart = (props) => {

    const { navigation } = props;
    const navigate = useNavigation()
    const dispatch = useDispatch();
    const cartProducts = useSelector(getAllProducts);

    const [cartItems, setCartItems] = useState([])
    const [sum, setSum] = useState(0)
    const [delivery, setDelivery] = useState(2)

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                height: 80,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderTopWidth: 0,
                backgroundColor: colors.greySoft,
            }
        });
    }, [navigation]);

    useEffect(() => {
        if (cartProducts) {
            let data = cartProducts.filter((item) => item.count > 0)
            const subTotal = data.reduce((accumulator, current) => {
                const currentItem = current.price * current.count
                return accumulator + currentItem;
            }, 0);
            setSum(subTotal)
            setCartItems(data)
        }
    }, [cartProducts])


    const increaseCount = (item) => {
        let data = [...cartProducts]
        const increase = data.find((i) => i.id === item.id)
        const index = data.findIndex((i) => i.id === item.id)
        if (increase && increase.count > 0) {
            const add = { ...increase, count: increase.count + 1 }
            data.splice(index, 1, add);
            dispatch(editProductsData(data))
        }
    }

    const decreaseCount = (item) => {
        let data = [...cartProducts]
        const decrease = data.find((i) => i.id === item.id)
        const index = data.findIndex((i) => i.id === item.id)
        if (decrease && decrease.count >= 0) {
            const remove = { ...decrease, count: decrease.count - 1 }
            data.splice(index, 1, remove);
            dispatch(editProductsData(data))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <Backbutton style={styles.backbuttonimage} name='chevron-back' size={25} color={colors.primary} onPress={() => navigation.navigate(routes.dashboard)}></Backbutton>
                <HeaderTitle style={styles.backlabel}>Shopping Cart ({cartItems && cartItems.length})</HeaderTitle>
            </View>
            {
                cartItems && cartItems.length > 0 && <ScrollView style={{ height: 150 }} showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {
                        cartItems && cartItems.map((item, index) => {
                            return <View style={styles.homeoption}>
                                <View style={styles.coursecontentgrid}>
                                    <View>
                                        <Image resizeMode='contain' style={styles.courseimage} source={{
                                            uri: item.thumbnail
                                        }}></Image>
                                    </View>
                                    <View style={styles.coursecontent1}>
                                        <Text style={styles.courseheading}>{item.title}</Text>
                                        <Text style={styles.courserating}>${item.price}</Text>
                                    </View>
                                </View>
                                <View style={styles.coursecontent2}>
                                    <ActionButton style={styles.backbuttonimage} name='minus' size={20} color={colors.primary} onPress={() => decreaseCount(item)}></ActionButton>
                                    <Text style={{ marginHorizontal: 5 }}>{item.count}</Text>
                                    <ActionButton style={styles.backbuttonimage} name='plus' size={20} color={colors.primary} onPress={() => increaseCount(item)}></ActionButton>
                                </View>
                            </View>
                        })
                    }
                </ScrollView>
            }
            {
                cartItems.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20, color: colors.grey }}>Cart is Empty</Text></View>
            }
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'column', paddingHorizontal: 15, backgroundColor: colors.greySoft, paddingVertical: 15, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 15 }}>
                        <Text style={styles.courseheading}>SubTotal</Text>
                        <Text style={styles.courserating}>${sum}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 15 }}>
                        <Text style={styles.courseheading}>Delivery</Text>
                        <Text style={styles.courserating}>${cartItems && cartItems.length > 0 ? delivery : 0}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 15 }}>
                        <Text style={styles.courseheading}>Total</Text>
                        <Text style={styles.courserating}>${cartItems && cartItems.length > 0 ? sum + delivery : 0}</Text>
                    </View>
                    <Button style={styles.buttonsstyle} mode="contained" textColor={colors.white} buttonColor={colors.primary}>Proceed to Checkout</Button>
                </View>
            </View>
            <View style={{ height: 30 }}></View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    headercontainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 15
    },

    backlabel: {
        marginLeft: 15
    },

    backbuttonimage: {
        padding: 5,
        textAlign: "center",
        backgroundColor: colors.greySoft,
        borderRadius: 20,
    },

    homeoption: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: colors.secondary,
        flexDirection: "row",
    },

    coursecontentgrid: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexShrink: 1,
        flex: 1,
    },

    courseimage: {
        width: 60,
        height: 60,
    },

    coursecontent1: {
        paddingLeft: 10,
        paddingTop: 5,
        flexShrink: 1,
    },

    courseheading: {
        fontSize: 15,
        color: colors.black
    },

    courserating: {
        color: colors.black
    },

    coursecontent2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonsstyle: {
        borderRadius: 15,
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10
    },
})