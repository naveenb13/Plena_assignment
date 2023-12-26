import * as React from 'react';
import { Dimensions, Text, View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import colors from '../constants/colors';

function Carouselitem() {

    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('screen').width * 0.7
    const isCarousel = React.useRef(null)

    const promotionvalue = [
        {
            image: require("../../assets/carImage.jpg"),
            off: 50
        },
        {
            image: require("../../assets/CarImage2.jpg"),
            off: 60
        },
        {
            image: require("../../assets/carImage3.jpg"),
            off: 20
        },
    ]
    return (
        <Carousel
            loop
            ref={isCarousel}
            data={promotionvalue}
            activeSlideAlignment={'start'}
            renderItem={({ item }) => (
                <View
                    style={{
                        marginTop: 20,
                        width: ITEM_WIDTH,
                        borderRadius: 20,
                        marginHorizontal: 20
                    }}
                >
                    <View style={{
                        backgroundColor: colors.orange,
                        height: 120,
                        borderRadius: 20,
                        paddingStart: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flexBasis: "50%" }}>
                            <Image style={styles.courseimage} resizeMode='contain' source={item.image}></Image>
                        </View>
                        <View style={{ flexBasis: "50%" }}>
                            <Text style={{ color: colors.white }}>Get</Text>
                            <Text style={{ fontWeight: 'bold', color: colors.white, fontSize: 25 }}>{item.off}% OFF</Text>
                            <Text style={{ color: colors.white }}>on first 03 orders</Text>
                        </View>
                    </View>
                </View>
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
        />
    );
}

export default Carouselitem;

const styles = StyleSheet.create({
    carouselspec: {
        borderRadius: 20,
    },
    courseimage: {
        width: 100,
        height: 100,
    },
})