import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight, ActivityIndicator
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeSlide: 0,
      categories: [],
      cat_loading: true,
      ingredients: [],
      ind_loading: true
    };
  }


  async componentDidMount() {
    try {
      const categoriesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/categories');
      const categoriesapi = await categoriesApiCall.json();
      this.setState({ categories: categoriesapi, cat_loading: false });
      const ingredientsApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/ingredients');
      const ingredientsapi = await ingredientsApiCall.json();
      this.setState({ ingredients: ingredientsapi, ind_loading: false });
      this.setState({ loading: false });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }


  getIngredientName(ingredientID) {
    let name;
    this.state.ingredients.map(data => {
      if (data.ingredientId == ingredientID) {
        name = data.name;
      }
    });
    return name;
  }

  getCategoryName(categoryId) {
    let name;
    this.state.categories.map(data => {
      if (data.id == categoryId) {
        name = data.name;
      }
    });
    return name;
  }

  getCategoryById(categoryId) {
    let category;
    this.state.categories.map(data => {
      if (data.id == categoryId) {
        category = data;
      }
    });
    return category;
  }


  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = this.getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  render() {

    const { categories, ingredients, cat_loading, ind_loading, loading } = this.state;
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    console.log(categories);


    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ margin: 15, fontSize: 17 }}> Firing up the Oven! </Text>
          <ActivityIndicator hidesWhenStopped={true} />
        </View>
      )
    }
    else {
      const category = this.getCategoryById(item.categoryId);
      const title = this.getCategoryName(category.id);
      return (
        <ScrollView style={styles.container}>
          <View style={styles.carouselContainer}>
            <View style={styles.carousel}>
              <Carousel
                ref={c => {
                  this.slider1Ref = c;
                }}
                data={item.photosArray}
                renderItem={this.renderImage}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
                loop={false}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={2000}
                onSnapToItem={index => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={item.photosArray.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor="rgba(255, 255, 255, 0.92)"
                dotStyle={styles.paginationDot}
                inactiveDotColor="white"
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
                carouselRef={this.slider1Ref}
                tappableDots={!!this.slider1Ref}
              />
            </View>
          </View>
          <View style={styles.infoRecipeContainer}>
            <Text style={styles.infoRecipeName}>{item.title}</Text>
            <View style={styles.infoContainer}>
              <TouchableHighlight
                onPress={() => navigation.navigate('RecipesList', { category, title })}
              >
                <Text style={styles.category}>{this.getCategoryName(item.categoryId).toUpperCase()}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.infoContainer}>
              <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
              <Text style={styles.infoRecipe}>{item.time} minutes </Text>
            </View>

            <View style={styles.infoContainer}>
              <ViewIngredientsButton
                onPress={() => {
                  let ingredients = item.ingredients;
                  let title = 'Ingredients for ' + item.title;
                  navigation.navigate('IngredientsDetails', { ingredients, title });
                }}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
            </View>
          </View>
        </ScrollView>
      );
    }



  }

}
