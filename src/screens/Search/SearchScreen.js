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

import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName
} from '../../data/MockDataAPI';




export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue
    });
  }

  handleSearch = text => {
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var recipeArray3 = getRecipesByIngredientName(text);
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
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
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
