import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import SearchImage from '../../components/SearchImage/SearchImage';
import DietCarousel from '../../components/Carousel/DietCarousel';
import SwitchButton from '../../components/SwitchButton/SwitchButton'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();

      }}
    />,
    headerRight: () => <SearchImage
      onPress={() => {
        navigation.navigate('Search');
      }}
    />
  });


  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      categories: [],
      cat_loading: true,
      unit: false
    }
  }

  changerecipe(item) {
    this.setState({ unit: item })
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

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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
    </TouchableOpacity >
  );


  render() {
    const { recipes, loading } = this.state;

    if (!loading) {
      return (
        <>
          <DietCarousel navigation={this.props.navigation} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }}>
            <Text style={{
              fontSize: 25,
              paddingLeft: 20,
              paddingTop: 20,
              paddingBottom: 20
            }}>Trending Recipes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>Veg </Text>
              <SwitchButton data={{
                unit: this.state.unit, changerecipe: this.changerecipe.bind(this)
              }} />
            </View>
          </View>

          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.shuffle(this.state.recipes.filter(recipe => recipe.veg_filter === this.state.unit))}
            renderItem={this.renderRecipes}
            keyExtractor={item => `${item.recipeId}`}
          />
        </>
      );
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ margin: 15, fontSize: 17 }}> Firing up the kitchen! </Text>
          <ActivityIndicator hidesWhenStopped={true} />
        </View>
      )

    }

  }
}
