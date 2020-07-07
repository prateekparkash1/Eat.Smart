import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';

import SearchImage from '../../components/SearchImage/SearchImage';
import { getCategoryName } from '../../data/MockDataAPI';
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
  }

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
    </TouchableOpacity >
  );

  render() {
    return (
      <>
        <DietCarousel />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }}>
          <Text style={{
            fontSize: 25,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20
          }}>Trending Recipes</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: '20px' }}>Veg </Text>
            <SwitchButton />
          </View>
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />

      </>
    );
  }
}
