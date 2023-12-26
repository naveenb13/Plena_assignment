import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../constants/colors'
import { HeaderTitle } from '@react-navigation/elements'
import Cartbutton from 'react-native-vector-icons/SimpleLineIcons';
import Wishbutton from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-vector-icons/Entypo';
import { Searchbar } from 'react-native-paper'
import Carouselitem from '../../components/Carouselitem'
import DropDownPicker from 'react-native-dropdown-picker';
import routes from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { editProductsData, getAllProducts, productsData, selectProductsLoading } from '../../store/slice';

const Dashboard = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const productsLoading = useSelector(selectProductsLoading);

    useEffect(() => {
        dispatch(productsData())
    }, [dispatch])

    const [delOpen, setDelOpen] = useState(false);
    const [delValue, setDelValue] = useState("Green Way 3000, Sylhet");
    const [delItems, setDelItems] = useState([
        { label: 'Green Way 3000, Sylhet', value: 'Green Way 3000, Sylhet' },
    ]);

    const [timeOpen, setTimeOpen] = useState(false);
    const [timeValue, setTimeValue] = useState("1 Hour");
    const [timeItems, setTimeItems] = useState([
        { label: '1 Hour', value: '1 Hour' },
    ]);

    const removewish = (id, index) => {
        let data = [...products]
        const checkFav = data.find((item) => item.id === id)
        if (checkFav && checkFav.favourite) {
            const remove = { ...checkFav, favourite: false }
            data.splice(index, 1, remove);
            dispatch(editProductsData(data))
        } else {
            const add = { ...checkFav, favourite: true }
            data.splice(index, 1, add);
            dispatch(editProductsData(data))
        }
    }

    const addToCart = (item, index) => {
        let data = [...products]
        const checkCart = data.find((i) => i.id === item.id)
        if (checkCart && !checkCart.cart || checkCart && checkCart.count === 0) {
            const add = { ...checkCart, count: 1 }
            data.splice(index, 1, add);
            dispatch(editProductsData(data))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.headercontainer}>
                    <View style={styles.headerleft}>
                        <HeaderTitle style={styles.backlabel}>Hey, Rahul</HeaderTitle>
                    </View>
                    <TouchableOpacity style={styles.headerright} onPress={() => navigation.navigate(routes.cart)}>
                        <Cartbutton name='handbag' size={25} color={colors.white} ></Cartbutton>
                        <Text style={{ backgroundColor: colors.orange, color: colors.white, paddingHorizontal: 7, paddingVertical: products && products.filter((item) => item.count > 0).length >= 10 ? 5 : 2, position: 'absolute', bottom: 10, borderRadius: 20, left: products && products.filter((item) => item.count > 0).length >= 10 ? 5 : 10 }}>{products && products.filter((item) => item.count > 0).length}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchcontainer}>
                    <Searchbar
                        style={styles.searchbox}
                        placeholder="Search Products or store"
                        iconColor={colors.silver}
                        placeholderTextColor={colors.silver}
                    />
                </View>
                <View style={styles.promotionheader}>
                    <View style={{ flexDirection: 'column', flexBasis: '60%', }}>
                        <Text style={styles.promotionheading}>DELIVERY TO</Text>
                        <DropDownPicker
                            open={delOpen}
                            value={delValue}
                            items={delItems}
                            setOpen={setDelOpen}
                            setValue={setDelValue}
                            setItems={setDelItems}
                            arrowIconStyle={{ tintColor: delOpen ? colors.black : colors.white }}
                            style={{
                                minHeight: 10,
                                borderWidth: delOpen ? 1 : 0,
                                backgroundColor: delOpen ? colors.white : colors.primary,
                                paddingLeft: delOpen ? 5 : 0,
                            }}
                            textStyle={{
                                color: delOpen ? colors.black : colors.white,
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', flexBasis: '10%', }}></View>
                    <View style={{ flexDirection: 'column', flexBasis: '30%', }}>
                        <Text style={styles.promotionheading}>WITHIN</Text>
                        <DropDownPicker
                            open={timeOpen}
                            value={timeValue}
                            items={timeItems}
                            setOpen={setTimeOpen}
                            setValue={setTimeValue}
                            setItems={setTimeItems}
                            arrowIconStyle={{ tintColor: timeOpen ? colors.black : colors.white }}
                            style={{
                                minHeight: 10,
                                borderWidth: timeOpen ? 1 : 0,
                                backgroundColor: timeOpen ? colors.white : colors.primary,
                                paddingLeft: timeOpen ? 5 : 0,
                            }}
                            textStyle={{
                                color: timeOpen ? colors.black : colors.white,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Carouselitem />
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.courseheader}>
                    <Text style={styles.productheading}>Recommended</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {
                        productsLoading ? <ActivityIndicator size="large" style={{ marginTop: 20 }} color={colors.primary} /> : <View style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            {
                                products && products.map((item, index) => {
                                    return <TouchableOpacity style={{
                                        backgroundColor: colors.greySoft,
                                        flexBasis: '45%',
                                        paddingVertical: 10,
                                        paddingHorizontal: 5,
                                        marginTop: 15,
                                        marginRight: index % 2 === 1 ? 0 : 10,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: colors.secondary,
                                        height: 200
                                    }} onPress={() => navigation.navigate(routes.productdetails, { itemId: item.id, data: item, ind: index })}>
                                        <View style={{ position: 'absolute', top: 10, left: 5, zIndex: 1 }}>
                                            <Wishbutton onPress={() => removewish(item.id, index)} name={item.favourite === true ? "heart" : "heart-outline"} size={20} color={item.favourite === true ? colors.red : colors.black}></Wishbutton>
                                        </View>
                                        <View>
                                            <Image style={styles.courseimage} resizeMode='contain' source={{
                                                uri: item.thumbnail
                                            }}></Image>
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={styles.coursecontent1}>
                                                    <Text style={{ fontWeight: 'bold', color: colors.black }}>${item.price}</Text>
                                                </View>
                                                <View style={styles.coursecontent2}>
                                                    {
                                                        item.count && item.count > 0 ? <Text style={{ color: colors.white, fontSize: 10, backgroundColor: colors.primary, borderRadius: 5, padding: 3 }}>Added</Text> : <ActionButton name='plus' style={{ backgroundColor: colors.primary, borderRadius: 20, padding: 3 }} size={20} color={colors.white} onPress={() => addToCart(item, index)}></ActionButton>
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.coursecontent1}>
                                                <Text numberOfLines={2} style={styles.courseheading}>{item.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    }
                    <View style={{ height: 430 }}></View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "column",
        justifyContent: "flex-start",
    },

    topSection: {
        backgroundColor: colors.primary,
        paddingHorizontal: 15
    },

    bottomSection: {
        paddingHorizontal: 15
    },

    headercontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },

    headerleft: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    headerright: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },

    backlabel: {
        color: colors.white,
        letterSpacing: 1,
        fontSize: 25
    },

    searchcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 20,
    },

    searchbox: {
        width: "100%",
        borderRadius: 20,
        height: 50,
        backgroundColor: colors.primaryDark
    },

    promotionheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginVertical: 20,
    },

    courseheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
    },

    promotionheading: {
        fontWeight: "bold",
        fontSize: 15,
        color: colors.grey
    },

    productheading: {
        fontSize: 30,
        color: colors.black
    },

    courseimage: {
        width: 100,
        height: 100,
        alignSelf: "center",
        backgroundColor: colors.white
    },

    coursecontent1: {
        marginTop: 3,
        paddingLeft: 10,
        alignItems: 'flex-start'
    },

    coursecontent2: {
        alignItems: 'flex-end'
    },

    courseheading: {
        fontWeight: "bold",
        fontSize: 15,
    },

    actionheading: {
        alignItems: "center",
        paddingVertical: 30,
    },

})