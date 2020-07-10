import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

export default class IngredientsDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerTitleStyle: {
        fontSize: 16
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      ind_loading: true
    };


  }

  async componentDidMount() {
    const { navigation } = this.props;
    try {
      const ingredientsApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/ingredients');
      const ingredientsapi = await ingredientsApiCall.json();
      this.setState({ ingredients: ingredientsapi, ind_loading: false });
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

  getAllIngredients(idArray) {
    const ingredientsArray = [];
    idArray.map(index => {
      this.state.ingredients.map(data => {
        if (data.ingredientId == index[0]) {
          ingredientsArray.push([data, index[1]]);
        }
      });
    });
    return ingredientsArray;
  }



  onPressIngredient = item => {
    let name = this.getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  renderIngredient = ({ item }) => (
    <TouchableOpacity activeOpacity='0.5' onPress={() => this.onPressIngredient(item[0])}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: 'grey' }}>{item[1]}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('ingredients');
    const ingredientsArray = this.getAllIngredients(item);

    return (
      <>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={ingredientsArray}
            renderItem={this.renderIngredient}
            keyExtractor={item => `${item.recipeId}`}
          />
        </View>
      </>
    );
  }
}
