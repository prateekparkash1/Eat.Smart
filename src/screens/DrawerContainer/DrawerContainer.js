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
              size={75}
              rounded
              title="MD"
              onPress={() => console.log("Works!")}
              activeOpacity={0.5}
              containerStyle={{ marginLeft: 20, marginTop: 10 }}

              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: '20px' }}>Welcome </Text>
          </SafeAreaView>
        </View>
        <View style={styles.content}>
          <View style={styles.container}>
            <MenuButton
              title="Cuisine"
              source={require('../../../assets/icons/category.png')}
              onPress={() => {
                navigation.navigate('Categories');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="All Recipes"
              source={require('../../../assets/icons/category.png')}
              onPress={() => {
                navigation.navigate('Categories');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="Easy Recipes"
              source={require('../../../assets/icons/category.png')}
              onPress={() => {
                navigation.navigate('Categories');
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
