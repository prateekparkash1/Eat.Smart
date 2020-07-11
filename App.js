
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import AppContainer from './src/navigations/AppNavigation';

// export default function App() {
//   return (
//     <AppContainer />
//   );
// }



import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as Facebook from 'expo-facebook';
import { render } from 'react-dom';

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);

  async function logIn() {
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

        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          });

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }




  if (!isLoggedin) {

    return (
      <>
        <SafeAreaView>
          <Button
            onPress={logIn} title="Learn More"
          />
        </SafeAreaView>
      </>
    )

  }

  else {
    return (<AppContainer />)
  }


}



