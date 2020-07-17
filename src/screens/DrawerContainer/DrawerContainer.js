import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import { Avatar } from 'react-native-elements';

export default class DrawerContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  render() {
    const { navigation, data } = this.props;
    let uri_data = data.user.picture.data.url;
    return (
      <>
        <View style={styles.profile}>
          <SafeAreaView>
            <Avatar
              size={100}
              rounded
              title={data.user.name.split(' ')[0].charAt(0).concat(data.user.name.split(' ')[1].charAt(0))}
              onPress={() => console.log("Works!")}
              activeOpacity={0.5}
              containerStyle={{ marginLeft: 20, marginTop: 35 }}
              source={{
                uri: uri_data
              }}
            />
            <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 20 }}>Welcome, {data.user.name.split(' ')[0]}</Text>
          </SafeAreaView>
        </View>
        <View style={styles.content}>
          <View style={styles.container}>

            <MenuButton
              title="Recipe of the Day"
              source={require('../../../assets/icons/rotd.png')}
              onPress={() => {
                navigation.navigate('Cuisines');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="All Cuisines"
              source={require('../../../assets/icons/category.png')}
              onPress={() => {
                navigation.navigate('Cuisines');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="All Recipes"
              source={require('../../../assets/icons/recipe.png')}
              onPress={() => {
                navigation.navigate('AllRecipeScreen');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="Search Recipes"
              source={require('../../../assets/icons/search.png')}
              onPress={() => {
                navigation.navigate('Search');
                navigation.closeDrawer();
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
