import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image, TouchableOpacity
} from 'react-native';
import styles from './styles';


export default class IngredientScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      categories: [],
      cat_loading: true,
      ingredients: [],
      ind_loading: true
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    try {
      const recipesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/recipes');
      const recipesapi = await recipesApiCall.json();
      this.setState({ recipes: recipesapi, loading: false });
      const categoriesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/categories');
      const categoriesapi = await categoriesApiCall.json();
      this.setState({ categories: categoriesapi, cat_loading: false });
      const ingredientsApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/ingredients');
      const ingredientsapi = await ingredientsApiCall.json();
      this.setState({ ingredients: ingredientsapi, ind_loading: false });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  getIngredientUrl(ingredientID) {
    let url;
    this.state.ingredients.map(data => {
      if (data.ingredientId == ingredientID) {
        url = data.photo_url;
      }
    });
    return url;
  }

  getRecipesByIngredient(ingredientId) {
    const recipesArray = [];
    this.state.recipes.map(data => {
      data.ingredients.map(index => {
        if (index[0] == ingredientId) {
          recipesArray.push(data);
        }
      });
    });
    return recipesArray;
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


  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableOpacity activeOpacity='0.5' onPress={() => this.onPressRecipe(item)}>
      <TouchableOpacity activeOpacity='0.5' onPress={() => this.onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{this.getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  render() {
    const { navigation } = this.props;
    const ingredientId = navigation.getParam('ingredient');
    const ingredientUrl = this.getIngredientUrl(ingredientId);
    const ingredientName = navigation.getParam('name');
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoIngredient} source={{ uri: '' + ingredientUrl }} />
        </View>
        <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.getRecipesByIngredient(ingredientId)}
            renderItem={this.renderRecipes}
            keyExtractor={item => `${item.recipeId}`}
          />
        </View>
      </ScrollView>
    );
  }
}
