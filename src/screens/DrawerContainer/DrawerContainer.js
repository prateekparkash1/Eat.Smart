import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import { Avatar } from 'react-native-elements';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <>
        <View style={styles.profile}>
          <SafeAreaView>
            <Avatar
              size={100}
              rounded
              title="MD"
              onPress={() => console.log("Works!")}
              activeOpacity={0.5}
              containerStyle={{ marginLeft: 20, marginTop: 35 }}

              source={{
                uri:
                  'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1694402474031849&height=500&ext=1597045702&hash=AeQedtV3eXP_NTrs',
              }}
            />
            <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 20 }}>Welcome </Text>
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
                navigation.navigate('Cuisines');
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
