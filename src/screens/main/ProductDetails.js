import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import routes from '../../constants/routes'
import Backbutton from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import Cartbutton from 'react-native-vector-icons/SimpleLineIcons';
import Wishbutton from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Button } from 'react-native-paper';
import { editProductsData, getAllProducts } from '../../store/slice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const carouselRef = useRef(null);

    const [singleData, setSingleData] = useState("")
    const [activeSlide, setActiveSlide] = useState(0);

    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('screen').width

    const singleProduct = async (item, datum) => {
        const res = await fetch(`https://dummyjson.com/products/${item}`)
        let response = await res.json()
        if (datum && datum.favourite && datum.count > 0) {
            response = { ...response, favourite: true, count: datum.count }
            setSingleData(response)
        } else if (datum && datum.count > 0) {
            response = { ...response, count: datum.count }
            setSingleData(response)
        } else if (datum && datum.favourite) {
            response = { ...response, favourite: true }
            setSingleData(response)
        } else {
            response = { ...response, favourite: false, count: 0 }
            setSingleData(response)
        }
    }

    useEffect(() => {
        if (route && route.params && route.params.itemId) {
            singleProduct(route.params.itemId, route.params.data)
        }
    }, [route && route.params && route.params.itemId])

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

    const removewish = (id) => {
        let data = [...products]
        const checkFav = data.find((item) => item.id === id)
        if (checkFav && checkFav.favourite) {
            const remove = { ...checkFav, favourite: false }
            data.splice(route.params.ind, 1, remove);
            setSingleData(remove)
            dispatch(editProductsData(data))
        } else {
            const add = { ...checkFav, favourite: true }
            data.splice(route.params.ind, 1, add);
            setSingleData(add)
            dispatch(editProductsData(data))
        }
    }

    const addToCart = (item, key) => {
        let data = [...products]
        const checkCart = data.find((i) => i.id === item.id)
        const index = data.findIndex((i) => i.id === item.id)
        if (checkCart && !checkCart.cart || checkCart && checkCart.count === 0) {
            const add = { ...checkCart, count: 1 }
            data.splice(index, 1, add);
            setSingleData(add)
            dispatch(editProductsData(data))
            if (key === "buy") {
                navigation.navigate(routes.cart)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <View style={styles.headerleft}>
                    <Backbutton style={styles.backbuttonimage} name='chevron-back' size={25} color={colors.primary} onPress={() => navigation.navigate(routes.dashboard)}></Backbutton>
                </View>
                <TouchableOpacity style={styles.headerright} onPress={() => navigation.navigate(routes.cart)}>
                    <Cartbutton name='handbag' size={25} color={colors.black}></Cartbutton>
                    <Text style={{ backgroundColor: colors.orange, color: colors.white, paddingHorizontal: 7, paddingVertical: products && products.filter((item) => item.count > 0).length >= 10 ? 5 : 2, position: 'absolute', bottom: 10, borderRadius: 20, left: products && products.filter((item) => item.count > 0).length >= 10 ? 5 : 10 }}>{products && products.filter((item) => item.count > 0).length}</Text>
                </TouchableOpacity>
            </View>
            {
                singleData && singleData !== "" && <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {
                        singleData && singleData !== "" && <View style={{ marginTop: 20 }}>
                            <View style={{ paddingHorizontal: 15 }}>
                                <Text style={{ fontSize: 50, color: colors.black }}>{singleData.title}</Text>
                            </View>

                            <Carousel
                                ref={carouselRef}
                                loop
                                data={singleData.images}
                                activeSlideAlignment={'start'}
                                renderItem={({ item }) => (
                                    <>
                                        <View style={{ position: 'absolute', right: 30, top: 20, zIndex: 1, backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                                            <Wishbutton onPress={() => removewish(singleData.id)} name={singleData.favourite === true ? "heart" : "heart-outline"} size={30} color={singleData.favourite === true ? colors.red : colors.black}></Wishbutton>
                                        </View>
                                        <Image resizeMode='contain' style={{ width: "100%", height: 200, marginVertical: 10, backgroundColor: colors.greySoft }} source={{ uri: item }}></Image>
                                        <Pagination
                                            renderDots={activeIndex => (
                                                singleData.images.map((item, i) => (
                                                    <TouchableOpacity
                                                        style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 4, position: 'relative', bottom: 70, right: 110 }}
                                                        key={i}
                                                        onPress={() => {
                                                            carouselRef.current.snapToItem(i);
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                backgroundColor: activeIndex === i ? colors.orange : colors.grey, width: 20,
                                                                height: 5,
                                                                borderRadius: 5,
                                                            }}
                                                        >
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            )}
                                            activeDotIndex={activeSlide} dotsLength={singleData && singleData.images && singleData.images.length} tappableDots={true} />
                                    </>
                                )}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.primary }}>${singleData.price}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Button style={styles.buttonsstyle} mode="outlined" textColor={colors.primary} disabled={singleData && singleData.count > 0} onPress={() => addToCart(singleData)}>{singleData && singleData.count > 0 ? "Added to Cart" : "Add To Cart"}</Button>
                                <Button style={styles.buttonsstyle} mode="contained" textColor={colors.white} buttonColor={colors.primary}
                                    onPress={singleData && singleData.count > 0 ? () => navigation.navigate(routes.cart) : () => addToCart(singleData, "buy")}
                                >Buy Now</Button>
                            </View>
                            <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                                <Text style={{ fontSize: 18, color: colors.black }}>Details</Text>
                            </View>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                <Text>{singleData.description}</Text>
                            </View>
                            <View style={{ height: 50 }}></View>
                        </View>
                    }
                </ScrollView>
            }
            {
                !singleData && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" style={{ marginTop: 20 }} color={colors.primary} /></View>
            }
        </View >
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    headercontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 15
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
        fontWeight: "bold",
    },

    backbuttonimage: {
        padding: 5,
        textAlign: "center",
        backgroundColor: colors.buttoncolors,
        borderRadius: 20,
    },
    buttonsstyle: {
        borderRadius: 15,
        borderColor: colors.primary,
        borderWidth: 1
    },
})