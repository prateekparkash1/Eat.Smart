
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
        console.log(this.state.isLoggedin);
        console.log(this.state.userData);

      } else {
        setLoggedinStatus(false)
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  render() {
    if (!this.state.isLoggedin) {
      return (
        <>
          <SafeAreaView style={{ "backgroundColor": "#e3eee9" }}></SafeAreaView>
          <ImageBackground source={require('./assets/background.jpeg')} style={styles.image}>
            <View style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}>
              <Image source={require('./assets/logo.gif')} />
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "stretch" }}>
                <Image source={require('./assets/icons/fb.png')} style={{ height: 40, width: 40 }} />
                <Button
                  onPress={this.logIn}
                  title="Login with Facebook"
                />
              </View>
            </View>
          </ImageBackground>

        </>
      )
    }

    else {
      return (<AppContainer user={this.state.userData} />)
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