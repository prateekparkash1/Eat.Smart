import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
// import { getNumberOfRecipes } from '../../data/MockDataAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };



  constructor(props) {
    super(props);


  }

  state = {
    recipes: [],
    //Have a loading state where when data retrieve returns data. 
    loading: true
  }


  async componentDidMount() {
    try {

      const recipesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/recipes');
      const recipesapi = await recipesApiCall.json();
      this.setState({ recipes: recipesapi, loading: false });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.props.navigation.navigate('RecipesList', { category, title });
  };

  getNumberOfRecipes = categoryId => {
    let count = 0;
    this.state.recipes.map(data => {
      if (data.categoryId == categoryId) {
        count++;
      }
    });
    return count;
  }

  renderCategory = ({ item }) => (
    <TouchableOpacity activeOpacity='0.5' onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{this.getNumberOfRecipes(item.id)} recipes</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { recipes, loading } = this.state;
    if (!loading) {
      return (
        <View>
          <FlatList
            data={categories}
            renderItem={this.renderCategory}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      );
    }
    else {
      return <ActivityIndicator />
    }



  }
}
