
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, ImageBackground } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as Facebook from 'expo-facebook';
import { render } from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      userData: {}
    }
    this.logIn = this.logIn.bind(this);
  }

  async logIn() {
    try {
      Facebook.initializeAsync('2753963464882148');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json()).then(data => {
            this.setState({
              isLoggedin: true,
              userData: data
            });
          })
      } else {
        setLoggedinStatus(false)
      }
    } catch ({ message }) {
      alert(`Oops! Something broke. Please Try Again!`);
    }
  }
  render() {
    if (!this.state.isLoggedin) {
      return (
        <>
          <ImageBackground source={require('./assets/logo.gif')} style={styles.image}>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-end", marginBottom: 50 }}>
              <Image source={require('./assets/icons/fb.png')} style={{ height: 40, width: 40 }} />
              <Button
                onPress={this.logIn}
                title="Login with Facebook"
              />
            </View>


          </ImageBackground>
        </>
      )
    }

    else {
      return (<AppContainer screenProps={{ user: this.state.userData }} />)
    }
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
})