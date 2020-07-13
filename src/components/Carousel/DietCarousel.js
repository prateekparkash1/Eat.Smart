// import * as React from 'react';
// import {
//     Text,
//     View,
//     SafeAreaView, Image
// } from 'react-native';


// import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';

// export default class DietCarousel extends React.Component {


//     constructor(props) {
//         super(props);
//         this.state = {
//             activeIndex: 0,
//             carouselItems: [
//                 {
//                     title: "Item 1",
//                     text: "Text 1",
//                     url: "https://i.imgur.com/2nCt3Sbl.jpg",
//                 },
//                 {
//                     title: "Item 2",
//                     text: "Text 2",
//                     url: "https://i.imgur.com/2nCt3Sbl.jpg",
//                 },
//                 {
//                     title: "Item 3",
//                     text: "Text 3",
//                     url: "https://i.imgur.com/2nCt3Sbl.jpg",
//                 },

//             ]
//         }
//     }

//     _renderItem({ item, index }, parallaxProps) {
//         return (
// <View style={{

//     borderRadius: 5,
//     height: 200,
//     padding: 50,
//     marginLeft: 25,
//     marginRight: 25,
// }}>
//                 <ParallaxImage
//                     source={{ uri: item.url }}
//                     parallaxFactor={0.4}
//                     {...parallaxProps}
//                 />
//                 <Text style={{ fontSize: 30 }}>{item.title}</Text>
//                 <Text>{item.text}</Text>
//             </View>

//         )
//     }

//     render() {
//         return (
//             <View style={{ paddingTop: 10 }}>
//                 <Carousel
//                     layout={"stack"}
//                     activeSlideAlignment='start'
//                     layoutCardOffset={`18`}
//                     ref={ref => this.carousel = ref}
//                     data={this.state.carouselItems}
//                     hasParallaxImages={true}
//                     sliderWidth={400}
//                     itemWidth={400}
//                     renderItem={this._renderItem}
//                     onSnapToItem={index => this.setState({ activeIndex: index })} />

//             </View>

//         );
//     }
// }



import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';

const ENTRIES1 = [
    {
        title: 'Breakfast',
        illustration: require('../../../assets/breakfast.png'),
    },
    {
        title: 'Lunch',
        illustration: require('../../../assets/lunch.png'),
    },
    {
        title: 'Dinner',
        illustration: require('../../../assets/dinner.png'),
    },

];
const { width: screenWidth } = Dimensions.get('window');

const DietCarousel = props => {
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
            <View style={styles.item}>

                <ParallaxImage
                    source={item.illustration}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        );
    };

    return (
        <View style={{ paddingTop: 10 }}>

            <Carousel
                onPress={goForward}
                layout={"default"}
                layoutCardOffset={`18`}
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