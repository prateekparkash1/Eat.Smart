import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      recipes: [],
      loading: true,
      categories: [],
      cat_loading: true,
      ingredients: [],
      ind_loading: true
    };

  }


  async componentDidMount() {

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

  getCategoryName(categoryId) {
    let name;
    this.state.categories.map(data => {
      if (data.id == categoryId) {
        name = data.name;
      }
    });
    return name;
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

  getRecipesByIngredientName(ingredientName) {
    const nameUpper = ingredientName.toUpperCase();
    const recipesArray = [];
    this.state.ingredients.map(data => {
      if (data.name.toUpperCase().includes(nameUpper)) {
        const recipes = this.getRecipesByIngredient(data.ingredientId);
        const unique = [...new Set(recipes)];
        unique.map(item => {
          recipesArray.push(item);
        });
      }
    });
    const uniqueArray = [...new Set(recipesArray)];
    return uniqueArray;
  }

  getRecipesByRecipeName(recipeName) {
    const nameUpper = recipeName.toUpperCase();
    const recipesArray = [];
    this.state.recipes.map(data => {
      if (data.title.toUpperCase().includes(nameUpper)) {
        recipesArray.push(data);
      }
    });
    return recipesArray;
  }

  getRecipesByCategoryName(categoryName) {
    const nameUpper = categoryName.toUpperCase();
    const recipesArray = [];
    this.state.categories.map(data => {
      if (data.name.toUpperCase().includes(nameUpper)) {
        const recipes = this.getRecipes(data.id);
        recipes.map(item => {
          recipesArray.push(item);
        });
      }
    });
    return recipesArray;
  }


  getRecipesByRecipeName(recipeName) {
    const nameUpper = recipeName.toUpperCase();
    const recipesArray = [];
    this.state.recipes.map(data => {
      if (data.title.toUpperCase().includes(nameUpper)) {
        recipesArray.push(data);
      }
    });
    return recipesArray;
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



  handleSearch = text => {
    var recipeArray1 = this.getRecipesByRecipeName(text);
    var recipeArray2 = this.getRecipesByCategoryName(text);
    var recipeArray3 = this.getRecipesByIngredientName(text);
    var aux = recipeArray1.concat(recipeArray2).concat(recipeArray3);
    var recipeArray = [...new Set(aux)];
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data: recipeArray
      });
    }
  };

  getValue = () => {
    return this.state.value;
  };

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
    return (
      <>
        <View style={{ paddingBottom: 20 }}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={text => this.handleSearch(text)}
            value={this.state.data}
            placeholder="Search By Recipes, Ingredients..."
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              flex: 1
            }}
            inputContainerStyle={{
              backgroundColor: '#EDEDED'
            }}
            inputStyle={{
              backgroundColor: '#EDEDED',
              borderRadius: 10,
              color: 'black'
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
          vertical
        />


      </>
    );
  }
}
