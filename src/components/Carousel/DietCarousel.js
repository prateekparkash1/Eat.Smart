import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Alert,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native';
import AllRecipeScreen from '../../screens/AllRecipeScreen/AllRecipeScreen';

const ENTRIES1 = [
    {
        title: 'Breakfast',
        illustration: require('../../../assets/breakfast.png'),
        navigate: ''
    },
    {
        title: 'Lunch',
        illustration: require('../../../assets/lunch.png'),
        navigate: ''
    },
    {
        title: 'Dinner',
        illustration: require('../../../assets/dinner.png'),
        navigate: ''
    },

];
const { width: screenWidth } = Dimensions.get('window');


const DietCarousel = (props, navigation) => {


    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => Alert.alert('Hi')}>
                <View style={styles.item}>
                    <ParallaxImage
                        source={item.illustration}
                        containerStyle={styles.imageContainer}
                        onPress={() => console.log("Cancel Pressed")}
                        style={styles.image}
                        parallaxFactor={0}
                        {...parallaxProps}
                    />
                </View >
            </TouchableOpacity>
        );
    };

    return (

        <View style={{ paddingTop: 10 }}>
            <Carousel
                onPress={goForward}
                layout={"default"}
                layoutCardOffset={18}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={100}
                itemWidth={screenWidth - 50}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>

    );
};

export default DietCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 200,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 10,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20
    }
});