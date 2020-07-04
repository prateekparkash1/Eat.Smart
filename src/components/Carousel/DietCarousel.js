import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView, Image
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

export default class DietCarousel extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    title: "Item 1",
                    text: "Text 1",
                },
                {
                    title: "Item 2",
                    text: "Text 2",
                },
                {
                    title: "Item 3",
                    text: "Text 3",
                },

            ]
        }
    }

    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: '#bedb39',
                borderRadius: 5,
                height: 200,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>

        )
    }

    render() {
        return (
            <View style={{ paddingTop: 10 }}>
                <Carousel
                    layout={"stack"}
                    layoutCardOffset={`18`}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })} />
            </View>

        );
    }
}

