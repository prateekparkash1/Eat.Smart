import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './styles';

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      categories: [],
      cat_loading: true
    }

  }

  async componentDidMount() {
    try {

      const recipesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/recipes');
      const recipesapi = await recipesApiCall.json();
      this.setState({ recipes: recipesapi, loading: false });
      const categoriesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/categories');
      const categoriesapi = await categoriesApiCall.json();
      this.setState({ categories: categoriesapi, cat_loading: false });

    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }


  getRecipes(categoryId) {
    const recipesArray = [];
    this.state.recipes.map(data => {
      if (data.categoryId == categoryId) {
        recipesArray.push(data);
      }
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
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{this.getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const recipesArray = this.getRecipes(item.id);
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipesArray}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
